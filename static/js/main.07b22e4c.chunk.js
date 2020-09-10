(this["webpackJsonpdfms-running-chart"]=this["webpackJsonpdfms-running-chart"]||[]).push([[0],{104:function(e,t,n){},141:function(e,t,n){},142:function(e,t,n){"use strict";n.r(t);var a=n(6),r=n.n(a),i=n(38),o=n.n(i),c=(n(104),n(9)),u=n.n(c),l=n(13),m=n(10),s=n(77),d=n.n(s),p=n(78),f=n.n(p),g=n(79),v=n(80),h=n.n(v),b=function(e){return r.a.createElement("button",{title:e.title,onClick:e.onClick,className:h.a.Button},r.a.createElement(g.a,{icon:e.icon,size:"2x",spin:e.spin}))},E=n(82),L=n(81),T=n.n(L);var S,C,w,I,N=function(e){return r.a.createElement("header",{className:T.a.RunningLogsListHeader},r.a.createElement("span",null,"Amazon s3 (",e.awsRegion,") >"),r.a.createElement("span",null,r.a.createElement("a",{href:"https://s3.console.aws.amazon.com/s3/buckets/acp-cloud-logs/?region=eu-central-1&tab=overview#",target:"_blank",rel:"noopener noreferrer"},"acp-cloud-logs")),r.a.createElement("span",null,r.a.createElement(b,{title:"Reload logs from S3 bucket",icon:E.a,spin:e.loading,onClick:e.onRefreshButtonPressed})))},x=n(83),D=n(84),k=n.n(D),_=n(24),R=n.n(_),j=n(85),y=n.n(j),O=function(e){var t=e.children,n=document.getElementById("modal-root"),r=document.createElement("div");return Object(a.useEffect)((function(){return n.appendChild(r),function(){return n.removeChild(r)}}),[r,n]),Object(i.createPortal)(t,r)},P=n(62),B=n.n(P),M=function(e){var t=function(t){"Escape"===t.code&&e.closePopup()},n=function(e){e=e||window.event,S=w-e.clientX,C=I-e.clientY,w=e.clientX,I=e.clientY;var t=e.target;t.style.top=t.offsetTop-C+"px",t.style.left=t.offsetLeft-S+"px"},i=function(e){e.target.onmouseup=null,e.target.onmousemove=null};return Object(a.useEffect)((function(){return document.addEventListener("keydown",t),function(){return document.removeEventListener("keydown",t)}})),e.showPopup?r.a.createElement(O,null,r.a.createElement("div",{id:"backDrop",className:B.a.BackDrop,onClick:function(t){"backDrop"===t.target.id&&e.closePopup()}},r.a.createElement("div",{className:B.a.ModalPopup,onMouseDown:function(e){e=e||window.event,w=e.clientX,I=e.clientY,e.target.onmouseup=i,e.target.onmousemove=n}},r.a.createElement("header",null,e.header),e.children))):null},F=function(e){var t=e.content.split("\n");return r.a.createElement(M,{showPopup:e.showFileContentPopup,closePopup:e.closeFileContentPopup,header:"Log File Content"},r.a.createElement("div",{className:y.a.FileContentPopup},t.map((function(e){return r.a.createElement("p",null,e)}))))};var A=function(e){var t=Object(a.useState)(!1),n=Object(m.a)(t,2),i=n[0],o=n[1],c=Object(a.useRef)();Object(a.useEffect)((function(){e.selected&&l()}));var u=e.selected?R.a.RunningLogListItemClicked:R.a.RunningLogListItem;u=e.batchFailed?"".concat(u," ").concat(R.a.RunningLogListItemFailed):u;var l=function(){var e=c.current.parentElement.parentElement.getBoundingClientRect(),t=c.current.getBoundingClientRect();t.bottom>e.bottom&&c.current.scrollIntoView(!1),t.top<e.top&&c.current.scrollIntoView(!0)};return r.a.createElement(r.a.Fragment,null,r.a.createElement("tr",{className:u,onClick:e.itemClicked,ref:c},r.a.createElement("td",null,e.data.runningDate),r.a.createElement("td",null,e.data.jobName),r.a.createElement("td",null,e.data.step),r.a.createElement("td",null,e.data.checklist),r.a.createElement("td",{className:R.a.RunningLogListItemNumeric},e.data.actionsNum),r.a.createElement("td",{className:R.a.RunningLogListItemNumeric},e.data.layersNum),r.a.createElement("td",{className:R.a.RunningLogListItemNumeric},e.data.batchJobsNum),r.a.createElement("td",null,e.data.runningTime||"Failed"),r.a.createElement("td",null,r.a.createElement("div",{onClick:function(e){o(!0)}},e.data.key))),i?r.a.createElement(F,{showFileContentPopup:i,closeFileContentPopup:function(){o(!1)},content:e.data.text}):null)};var J=function(e){var t,n;return Object(a.useEffect)((function(){var t=function(t){switch(t.code){case"ArrowDown":t.stopPropagation(),t.preventDefault(),e.selectedIndex<e.logsListData.length-1&&e.logItemClicked(e.selectedIndex+1);break;case"ArrowUp":t.stopPropagation(),t.preventDefault(),e.selectedIndex>0&&e.logItemClicked(e.selectedIndex-1)}};return document.addEventListener("keydown",t),function(){document.removeEventListener("keydown",t)}})),r.a.createElement("div",null,r.a.createElement(x.a,{dataLength:null===(t=e.logsListData)||void 0===t?void 0:t.length,next:function(){},hasMore:!1},r.a.createElement("table",{className:k.a.RunningLogsListTable},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Running date"),r.a.createElement("th",null,"Job Name"),r.a.createElement("th",null,"Step"),r.a.createElement("th",null,"Checklist"),r.a.createElement("th",null,"# Actions"),r.a.createElement("th",null,"# Layers"),r.a.createElement("th",null,"# ACPs"),r.a.createElement("th",null,"Running Time"),r.a.createElement("th",null,"S3 bucket key (filename)"))),r.a.createElement("tbody",null,null===(n=e.logsListData)||void 0===n?void 0:n.map((function(t,n){return r.a.createElement(A,{key:n,data:t,selected:e.selectedIndex===n,batchFailed:!!t.errorTime,itemClicked:function(){return e.logItemClicked(n)}})}))))))};var U=function(e){return r.a.createElement("div",{className:f.a.RunningLogsList},r.a.createElement(N,{awsRegion:e.awsRegion,loading:e.loading,onRefreshButtonPressed:e.onRefreshButtonPressed}),r.a.createElement(J,{logsListData:e.logsListData,selectedIndex:e.selectedIndex,logItemClicked:e.logItemClicked,fetchMoreData:e.onRefreshButtonPressed}))},z=n(148),H=n(86),W=n.n(H);var V=function(e){var t,n={$schema:"https://vega.github.io/schema/vega-lite/v4.json",title:null===(t=e.runData)||void 0===t?void 0:t.jobName,data:{values:e.data},mark:{type:"bar",tooltip:[]},encoding:{x:{type:"temporal",field:"StartDate",timeUnit:"hoursminutesseconds"},x2:{type:"temporal",field:"EndDate",timeUnit:"hoursminutesseconds"},y:{type:"nominal",field:"Index",sort:null},color:{field:"Object"}},width:800,autosize:"fit"};return r.a.createElement("div",{className:W.a.VegaLiteChart},e.data&&e.runData.runningTime?r.a.createElement(z.a,{spec:n,data:e.data}):null)},Y=n(2);function X(e){var t=null===e||void 0===e?void 0:e.batch[e.batch.length-1].ActNum,n=new Set(null===e||void 0===e?void 0:e.batch.map((function(e){return e.LayerName}))).size;return{runningDate:null===e||void 0===e?void 0:e.runningDate,jobName:null===e||void 0===e?void 0:e.jobName,step:null===e||void 0===e?void 0:e.batch[0].StepName,checklist:null===e||void 0===e?void 0:e.batch[0].ChecklistName,actionsNum:t,layersNum:n,runningTime:null===e||void 0===e?void 0:e.runningTime,batchJobsNum:null===e||void 0===e?void 0:e.batch.length,key:null===e||void 0===e?void 0:e.key,errorTime:null===e||void 0===e?void 0:e.errorTime,text:null===e||void 0===e?void 0:e.text}}function Q(e,t){var n=e.split(":").map((function(e){return Number(e)})),a=3600*n[0]+60*n[1]+n[2],r=t.split(":").map((function(e){return Number(e)}));return 3600*r[0]+60*r[1]+r[2]-a}function Z(e){var t=e.split("\n"),n=function(e){var t=e.filter((function(e){return e.match("time")})),n=Object(Y.a)(t);return n.splice(0,1),n.map((function(e){return JSON.parse(e)}))}(t),a=ie(t,n);return{runningDate:q(t),runningTime:G(t,a),jobName:$(t),batch:K(n),uploadTime:ee(n),splitterTime:te(n),acpTime:re(t,n),mergerTime:ne(n),downloadTime:ae(n),errorTime:a}}function $(e){return e.filter((function(e){return e.match("Job:")}))[0].split(" ")[1]}function q(e){var t=e.filter((function(e){return e.match("time")}))[0].split(" "),n=t[1].split(":")[1].split("/"),a=Object(m.a)(n,3),r=a[0],i=a[1],o=a[2];r.length>2&&(r=r.substr(1));var c=t[2].split(":"),u=Object(m.a)(c,2),l=u[0],s=u[1];return l.trim().length>2&&(l=l.substr(1)),s.trim().length>2&&(s=s.substr(1)),new Date(Date.UTC(o,i-1,r,l,s)).toUTCString()}function G(e,t){var n,a=e.filter((function(e){return e.match("Ready for commands")}))[0],r=JSON.parse(a).time,i=e.filter((function(e){return e.match("Job is ready")})),o=i.length>0?JSON.parse(i).time:t;return o?(n=function(e,t){var n=e.split(":").map((function(e){return Number(e)})),a=3600*n[0]+60*n[1]+n[2],r=t.split(":").map((function(e){return Number(e)}));return 3600*r[0]+60*r[1]+r[2]-a}(r,o),new Date(1e3*n).toISOString().substr(11,8)):""}function K(e){var t=e.filter((function(e){return"Batch"===e.type}))[0];return JSON.parse(t.message)}function ee(e){return{StartTime:e.find((function(e){return"WebClient"===e.object&&"Job was registered"===e.message})).time,CompleteTime:e.find((function(e){return"WebClient"===e.object&&"After send"===e.message})).time}}function te(e){var t=e.filter((function(e){return"Splitter"===e.object}));return{StartTime:oe(t.find((function(e){return"Splitter started"===e.message})).time),CompleteTime:oe(t.find((function(e){return"End of Split"===e.message})).time)}}function ne(e){var t=e.filter((function(e){return"Merger"===e.object})),n=t.find((function(e){return"Preparing job for merge"===e.message})),a=t.find((function(e){return"Moving Job to S3"===e.message}));return{StartTime:n?oe(n.time):null,CompleteTime:a?oe(a.time):null}}function ae(e){var t=e.find((function(e){return"WebClient"===e.object&&"Download Data"===e.message})),n=e.find((function(e){return"WebClient"===e.object&&"Job is ready"===e.message}));return{StartTime:t?t.time:null,CompleteTime:n?n.time:null}}function re(e,t){var n=ie(e,t),a=t.filter((function(e){return("Progress"===e.type||"Info"===e.type)&&"ACP"===e.object})).map((function(e){var t=e.message.split(" ");return{Time:oe(e.time),Step:t[0],Stage:t[1].split(":")[1],Index:Number(t[2].split(":")[1])+1}})),r=a.filter((function(e){return"Starting"===e.Step})).map((function(e){return{Stage:e.Stage,Index:e.Index,StartTime:e.Time}})),i=a.filter((function(e){return"Completing"===e.Step})).map((function(e){return{Stage:e.Stage,Index:e.Index,CompleteTime:e.Time}}));return r.map((function(e){var t=i.find((function(t){return t.Stage===e.Stage&&t.Index===e.Index}));return{Stage:e.Stage,Index:e.Index,StartTime:e.StartTime,CompleteTime:t?t.CompleteTime:n,Succeed:!!t}}))}function ie(e,t){var n=t.find((function(e){return"WebClient"===e.object&&"ERROR"===e.type})),a=null;return n&&(a=n.time),a}function oe(e){if(!e)return null;var t=e.split(":"),n=Object(m.a)(t,3),a=n[0],r=n[1],i=n[2];return[Number(a)+3,r,i].join(":")}var ce=function(e){var t=Object(a.useState)([]),n=Object(m.a)(t,2),i=n[0],o=n[1],c=Object(a.useState)(0),s=Object(m.a)(c,2),p=s[0],f=s[1],g=Object(a.useState)(!1),v=Object(m.a)(g,2),h=v[0],b=v[1],E=[],L=null,T=null,S="https://bah2tkltg6.execute-api.eu-central-1.amazonaws.com/test/list",C=function(){var e=Object(l.a)(u.a.mark((function e(){var t,n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(S);case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,a=JSON.parse(n.body).keys,e.abrupt("return",a);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=Object(l.a)(u.a.mark((function e(t){var n,a,r,i,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.map((function(e){return fetch("".concat(S,"/").concat(e))})),e.next=3,Promise.all(n);case 3:return a=e.sent,r=a.map((function(e){return e.json()})),e.next=7,Promise.all(r);case 7:return i=e.sent,(o=i.map((function(e){return Z(e.text)}))).forEach((function(e,n){return e.key=t[n]})),o.forEach((function(e,t){return e.text=i[t].text})),e.abrupt("return",o);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=function(){var e=Object(l.a)(u.a.mark((function e(){var t,n,a,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b(!0),e.next=3,C(S);case 3:return t=e.sent,N(t),n=t.slice(0,8),e.next=8,w(n);case 8:a=e.sent,(r=i.concat(a)).sort((function(e,t){return new Date(t.runningDate)-new Date(e.runningDate)})),r.length>0&&(b(!1),o(r));case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),N=function(e){return e.filter((function(e){return!i.some((function(t){return t.key===e}))}))};if(Object(a.useEffect)((function(){0===i.length&&I()})),i.length>0){E=i.map((function(e){return X(e)}));var x=i[p];try{L=function(e){var t,n,a=e.batch.map((function(t){var n=e.acpTime.find((function(e){return e.Stage===t.Stage&&e.Index===t.StageIndex}));return{Object:n.Succeed?"Acp":"Acp Failed",Stage:t.Stage,Index:t.Stage+"_"+t.StageIndex,ActNum:t.ActNum,Name:t.AnalysisName,Layer:t.LayerName,ActParam:t.ActParam,BeginNf:t.BeginNf,EndNf:t.EndNf,StartTime:n?n.StartTime:"",CompleteTime:n?n.CompleteTime:"",Time:Q(n.StartTime,n.CompleteTime),StartDate:new Date("01/01/1970 ".concat(n.StartTime)),EndDate:new Date("01/01/1970 ".concat(n.CompleteTime))}})),r={Object:"Upload",Name:"Upload",Index:-1,StartDate:new Date("01/01/1970 ".concat(e.uploadTime.StartTime)),EndDate:new Date("01/01/1970 ".concat(e.uploadTime.CompleteTime))},i={Object:"Splitter",Name:"Splitter",Index:0,StartDate:new Date("01/01/1970 ".concat(e.splitterTime.StartTime)),EndDate:new Date("01/01/1970 ".concat(e.splitterTime.CompleteTime))};return e.mergerTime.StartTime&&e.mergerTime.CompleteTime&&(t={Object:"Merger",Name:"Merger",Index:a.length+1,StartDate:new Date("01/01/1970 ".concat(e.mergerTime.StartTime)),EndDate:new Date("01/01/1970 ".concat(e.mergerTime.CompleteTime))}),e.downloadTime.StartTime&&e.downloadTime.CompleteTime&&(n={Object:"Download",Name:"Download",Index:a.length+2,StartDate:new Date("01/01/1970 ".concat(e.downloadTime.StartTime)),EndDate:new Date("01/01/1970 ".concat(e.downloadTime.CompleteTime))}),a=[r,i].concat(Object(Y.a)(a)),t&&(a=[].concat(Object(Y.a)(a),[t])),n&&(a=[].concat(Object(Y.a)(a),[n])),a}(x)}catch(D){L=null}T=X(x)}return r.a.createElement("main",{className:d.a.MainComponent},r.a.createElement(U,{awsRegion:"eu-central-1",logsListData:E,selectedIndex:p,loading:h,logItemClicked:function(e){f(e)},onRefreshButtonPressed:function(){I()}}),r.a.createElement(V,{data:L,runData:T}))};n(141);var ue=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"content"},r.a.createElement("h1",null,"DFM Cloud Monitor"),r.a.createElement("hr",null),r.a.createElement(ce,null),r.a.createElement("hr",null)),r.a.createElement("footer",{className:"footer"},r.a.createElement("p",{style:{fontSize:"12px"}},"Alex Bol 2020")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ue,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},24:function(e,t,n){e.exports={RunningLogListItem:"RunningLogListItem_RunningLogListItem__3ikvQ",RunningLogListItemClicked:"RunningLogListItem_RunningLogListItemClicked__2_f2Z",RunningLogListItemFailed:"RunningLogListItem_RunningLogListItemFailed__2UuwH",RunningLogListItemNumeric:"RunningLogListItem_RunningLogListItemNumeric__1cPYu"}},62:function(e,t,n){e.exports={BackDrop:"ModalPopup_BackDrop__1S7cD",ModalPopup:"ModalPopup_ModalPopup__2z3u1",fadeIn:"ModalPopup_fadeIn__wiwPv"}},77:function(e,t,n){e.exports={MainComponent:"MainComponent_MainComponent___86ZC"}},78:function(e,t,n){e.exports={RunningLogsList:"RunningLogsList_RunningLogsList__2_vp0"}},80:function(e,t,n){e.exports={Button:"Button_Button__1u8dQ",Icon:"Button_Icon__1mPII"}},81:function(e,t,n){e.exports={RunningLogsListHeader:"RunningLogsListHeader_RunningLogsListHeader__319DL"}},84:function(e,t,n){e.exports={RunningLogsListTable:"RunningLogsListTable_RunningLogsListTable__2Burd",fadeIn:"RunningLogsListTable_fadeIn__3o70U"}},85:function(e,t,n){e.exports={FileContentPopup:"FileContentPopup_FileContentPopup__-6CgH"}},86:function(e,t,n){e.exports={VegaLiteChart:"VegaLiteChart_VegaLiteChart__3wHRE"}},99:function(e,t,n){e.exports=n(142)}},[[99,1,2]]]);
//# sourceMappingURL=main.07b22e4c.chunk.js.map