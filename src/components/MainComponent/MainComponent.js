import React, {useEffect, useState} from 'react';
import styles from './MainComponent.module.css';
import RunningLogsList from "../RunningLogsList/RunningLogsList";
import VegaLiteChart from "../VegaLiteChart/VegaLiteChart";
import {parse} from "../../models/logFileParser";
import {/*fetchFileContentByKeysList,*/ fetchFileContent, fetchKeysList, deleteFilesFromS3} from "../../models/aws_api";

function MainComponent(props) {
    const [logDataArray, setLogDataArray] = useState([]);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    // const numInChunk = 8;

    // Fetch content of files from s3 bucket by given list of keys
    // const fetchDataByKeysList = async (keysList) => {
    //     let textArray = await fetchFileContentByKeysList(keysList);
    //     let dataArray = textArray.map( e => parse(e.text));
    //     dataArray.forEach( (data,i) => data.key = keysList[i] )
    //     dataArray.forEach( (data,i) => data.text = textArray[i].text )
    //     return dataArray;
    // }

    // Fetch content of one file from s3 bucket by given key
    const fetchData = async (localDataArray, key, index) => {
        return new Promise( async (resolve, reject) => {
            try {
                let text = await fetchFileContent(key);
                let data = parse(text.text);
                data.key = key;
                data.text = text.text;
                data.marked = false;

                localDataArray[index] = data;
                let newDataArray = logDataArray.concat(localDataArray);
                newDataArray.filter (data => data !== undefined)
                setLogDataArray(newDataArray);             // trigger rendering
                resolve(data);
            }
            catch (err) {
                reject(err.message)
            }
        })
    }

    const fetchMoreData = async (keysListToFetch) => {
        setLoading(true);

        let keysList = keysListToFetch || await fetchKeysList();
        let filteredKeysList = filterNewKeysList(keysList);
        // let chunkOfKeysList = filteredKeysList.slice(0,numInChunk);
        if (filteredKeysList.length > 0) {
            let localDataArray = new Array(filteredKeysList.length);
            let promises = filteredKeysList.map( (key, index) => fetchData(localDataArray, key, index));
            try {
                let fetchedDataArray = await Promise.all(promises);
                let newDataArray = logDataArray.concat(fetchedDataArray);
                newDataArray.sort(function(a,b){
                    return new Date(b.runningDate) - new Date(a.runningDate);
                });
                if (!newDataArray.some(data => data.marked)) {
                    newDataArray[0].marked = true;
                }
                setLogDataArray(newDataArray);             // trigger rendering
            } catch (err) {
                console.log(err.message)
            }
        }

        setLoading(false);
    }

    // Filter keysList: keep only new keys that do not exist in logDataArray
    const filterNewKeysList = (keysList) => {
        let filteredKeyList = keysList
            .filter( key => !logDataArray.some( data => data.key === key))
        return filteredKeyList;
    }

    const syncData = () => {
        fetchMoreData()
    }

    const fetchUploaded = (keysList) => {
        fetchMoreData(keysList)
    }

    // Callback to set new chart data and update selected index
    const logItemClicked = (clickedIndex) => {
        let newLogDataArray = logDataArray.slice();
        newLogDataArray.forEach( (data, i) => data.marked = (i === clickedIndex));
        setLogDataArray(newLogDataArray);             // trigger rendering
        setIndex(clickedIndex);                       // trigger rendering
    }

    const checkMarkClicked = (clickedIndex) => {
        if (clickedIndex === index) return;
        let newLogDataArray = logDataArray.slice();
        newLogDataArray.forEach( (data, i) =>
            i === clickedIndex ? data.marked = !data.marked : data.marked);
        setLogDataArray(newLogDataArray);             // trigger rendering
    }

    const deleteFile = async () => {
        let keysToDelete = logDataArray
            .filter( data => data.marked )
            .map( data => data.key);
        if (keysToDelete.length === 0) return;
        let keyStr = keysToDelete.join("\n");
        let message = keysToDelete.length === 1 ?
            `1 file will be deleted:\n ${keyStr}` :
            `${keysToDelete.length} files will be deleted:\n ${keyStr}`;
        let ok = window.confirm(message);
        if (ok) {
            let deletedKeys = await deleteFilesFromS3(keysToDelete);
            let firstDeletedInd = logDataArray.findIndex(data => deletedKeys.includes(data.key));
            let newIndex = Math.max(0, firstDeletedInd - 1);
            let newLogDataArray = logDataArray.filter(data => !deletedKeys.includes(data.key));
            setLogDataArray(newLogDataArray);             // trigger rendering
            setIndex(newIndex);
        }
    }

    // Effect to load all data from AWS s3 bucket after component mounted
    useEffect( () => {
        fetchMoreData();
    },[]);

    return (
        <main className={styles.MainComponent}>
            <RunningLogsList
                logDataArray={logDataArray}
                selectedIndex={index}
                loading={loading}
                logItemClicked={logItemClicked}
                checkMarkClicked={checkMarkClicked}
                onUploadSucceed={fetchUploaded}
                onDeleteButtonPressed={deleteFile}
                onRefreshButtonPressed={syncData}
            />
            <hr />
            <VegaLiteChart
                logDataArray={logDataArray}
                index={index}
            />
        </main>
    );
}

export default MainComponent;