export function parse(text) {
    const row_lines = text.split('\n');
    const arrayOfTimestamps = timestamps(row_lines);
    return {
        runningDate: runningDate(row_lines),
        runningTime: runningTime(row_lines),
        jobName: jobName(row_lines),
        batch: batch(arrayOfTimestamps),
        uploadTime: uploadTime(arrayOfTimestamps),
        splitterTime: splitterTime(arrayOfTimestamps),
        acpTime: acpTime(arrayOfTimestamps),
        mergerTime: mergerTime(arrayOfTimestamps),
        downloadTime: downloadTime(arrayOfTimestamps)
    }
}

function jobName(row_lines) {
    const job_line = row_lines.filter(line => line.match("Job:"))[0];
    const job_name = job_line.split(' ')[1];
    return job_name;
}

function runningDate(row_lines) {
    let arrayOfLines = row_lines.filter(line => line.match("time"));
    let splitArray = arrayOfLines[0].split(' ');
    let [day, month, year] = splitArray[1].split(':')[1].split('/');
    let [hour, min] = splitArray[2].split(':');
    return new Date(Date.UTC(year, month - 1, day, hour, min)).toUTCString();
}

function runningTime(row_lines) {
    let job_started_line = row_lines
        .filter(line => line.match("Ready for commands"))[0];
    let start_time = JSON.parse(job_started_line).time;
    let job_ended_line = row_lines
        .filter(line => line.match("Job is ready"));
    if (job_ended_line.length === 0)
        return null;

    let end_time = JSON.parse(job_ended_line).time;

    return secToHHMMSS(
        time_diff(start_time, end_time))
}

export function getChartData(data) {
    let stats = data.batch.map(action => {
        let timestamp = data.acpTime.find(
            a => a.Stage === action.Stage && a.Index === action.StageIndex
        );
        return {
            Object: "Acp",
            ActNum: action.ActNum,
            Name: action.AnalysisName,
            Layer: action.LayerName,
            Stage: action.Stage,
            Index: action.StageIndex,
            StartTime: timestamp ? timestamp.StartTime : "",
            CompleteTime: timestamp ? timestamp.CompleteTime : "",
            Time: time_diff(timestamp.StartTime, timestamp.CompleteTime),
            StartDate: new Date(`01/01/1970 ${timestamp.StartTime}`),
            EndDate: new Date(`01/01/1970 ${timestamp.CompleteTime}`)
        };
    });

    let splitterObj = {
        Object: "Splitter",
        Name: "Splitter",
        Index: 0,
        StartDate: new Date(`01/01/1970 ${data.splitterTime.StartTime}`),
        EndDate: new Date(`01/01/1970 ${data.splitterTime.CompleteTime}`)
    };

    let mergerObj = {
        Object: "Merger",
        Name: "Merger",
        Index: stats.length + 1,
        StartDate: new Date(`01/01/1970 ${data.mergerTime.StartTime}`),
        EndDate: new Date(`01/01/1970 ${data.mergerTime.CompleteTime}`)
    };

    let uploadObj = {
        Object: "Upload",
        Name: "Upload",
        Index: -1,
        StartDate: new Date(`01/01/1970 ${data.uploadTime.StartTime}`),
        EndDate: new Date(`01/01/1970 ${data.uploadTime.CompleteTime}`)
    };

    let downloadObj = {
        Object: "Download",
        Name: "Download",
        Index: stats.length + 2,
        StartDate: new Date(`01/01/1970 ${data.downloadTime.StartTime}`),
        EndDate: new Date(`01/01/1970 ${data.downloadTime.CompleteTime}`)
    };

    // stats = [uploadObj, splitterObj, ...stats, mergerObj, downloadTime];
    stats = [uploadObj, splitterObj, ...stats, mergerObj, downloadObj];
    return stats;
}

export function getListData(localData) {
    const actionsNum = localData?.batch[localData.batch.length - 1].ActNum;
    const layersNum = new Set(localData?.batch.map(action => action.LayerName)).size;
    return {
        runningDate: localData?.runningDate,
        jobName: localData?.jobName,
        actionsNum: actionsNum,
        layersNum: layersNum,
        runningTime: localData?.runningTime,
        batchJobsNum: localData?.batch.length,
        key: localData?.key,
    }
}

function batch(arrayOfTimestamps) {
    let batchObject = arrayOfTimestamps.filter(d => d.type === "Batch")[0]
    return JSON.parse(batchObject.message);
}

function uploadTime(arrayOfTimestamps) {
    let uploadTime = {
        StartTime: arrayOfTimestamps.find(
            d => d.object === "WebClient" && d.message === "Job was registered"
        ).time,
        CompleteTime: arrayOfTimestamps.find(
            d => d.object === "WebClient" && d.message === "After send"
        ).time
    };
    return uploadTime;
}

function splitterTime(arrayOfTimestamps) {
    let splitter = arrayOfTimestamps.filter(d => d.object === "Splitter")
    let s = {
        StartTime: toLocal(
            splitter.find(s => s.message === "Splitter started").time
        ),
        CompleteTime: toLocal(splitter.find(s => s.message === "End of Split").time)
    };
    return s;
}

function mergerTime(arrayOfTimestamps) {
    let merger = arrayOfTimestamps.filter(d => d.object === "Merger");
    if (!merger) return null

    let mergerStartedMessage = merger.find(s => s.message === "Preparing job for merge");
    let mergerCompleteMessage = merger.find(s => s.message === "Moving Job to S3");

    if (!mergerStartedMessage || !mergerCompleteMessage) return null;

    let s = {
        StartTime: toLocal(mergerStartedMessage.time),
        CompleteTime: toLocal(mergerCompleteMessage.time)
    };
    return s;
}

function downloadTime(arrayOfTimestamps) {
    let downloadStartMessage = arrayOfTimestamps.find(d => d.object === "WebClient" && d.message === "Download Data");
    let downloadCompleteMessage = arrayOfTimestamps.find(d => d.object === "WebClient" && d.message === "Job is ready");
    if (!downloadStartMessage || !downloadCompleteMessage) return null;

    let downloadTime = {
        StartTime: downloadStartMessage.time,
        CompleteTime: downloadCompleteMessage.time
    };
    return downloadTime;
}

function acpTime(arrayOfTimestamps) {
    let acp = arrayOfTimestamps.filter(d => d.type === "Progress");
    let acp_transformed = acp.map(action => {
        let message = action.message.split(' ');
        let localTime = toLocal(action.time);
        return {
            Time: localTime,
            Step: message[0],
            Stage: message[1].split(':')[1],
            Index: Number(message[2].split(':')[1])
        };
    });
    let acp_started = acp_transformed
        .filter(action => action.Step === "Starting")
        .map(action => {
            return {
                Stage: action.Stage,
                Index: action.Index,
                StartTime: action.Time
            };
        });
    let acp_completed = acp_transformed
        .filter(action => action.Step === "Completed")
        .map(action => {
            return {
                Stage: action.Stage,
                Index: action.Index,
                CompleteTime: action.Time
            };
        });
    let acp_timestamp = acp_started.map(action => {
        let completeTimeMessage = acp_completed.find(
            c => c.Stage === action.Stage && c.Index === action.Index
        );

        return completeTimeMessage ? {
            Stage: action.Stage,
            Index: action.Index,
            StartTime: action.StartTime,
            CompleteTime: completeTimeMessage.CompleteTime
        }  : null;
    });
    return acp_timestamp;
}

function timestamps(row_lines) {
    let arrayOfLines = row_lines.filter(line => line.match("time"));
    let tmpArrayOfLines = [...arrayOfLines];
    tmpArrayOfLines.splice(0, 1);
    return tmpArrayOfLines.map(line => JSON.parse(line));
}

function time_diff(start_time, complete_time) {
    let start = start_time.split(':').map(t => Number(t));
    let start_sec = start[0] * 3600 + start[1] * 60 + start[2];
    let complete = complete_time.split(':').map(t => Number(t));
    let complete_sec = complete[0] * 3600 + complete[1] * 60 + complete[2];
    let diff_sec = complete_sec - start_sec;
    return diff_sec;
}

function secToHHMMSS(time) {
    return new Date(time * 1000).toISOString().substr(11, 8);
}

function toLocal(hhmmss) {
    if (!hhmmss) return null;
    let [HH, MM, SS] = hhmmss.split(':');
    let local = [Number(HH) + 3, MM, SS].join(':');
    return local;
}
