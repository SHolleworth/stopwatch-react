var _=Object.defineProperty,h=Object.defineProperties;var N=Object.getOwnPropertyDescriptors;var y=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var b=(e,t,a)=>t in e?_(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,p=(e,t)=>{for(var a in t||(t={}))P.call(t,a)&&b(e,a,t[a]);if(y)for(var a of y(t))C.call(t,a)&&b(e,a,t[a]);return e},u=(e,t)=>h(e,N(t));import{r as M,R as n,a as k}from"./vendor.c90373eb.js";const B=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}};B();const S=({isRunning:e,timestamp:t})=>{const[a,r]=M.exports.useState(0);return M.exports.useEffect(()=>{if(e){const s=t-a,o=setInterval(()=>{r(Date.now()-s)},16);return()=>clearInterval(o)}else t===0&&r(0)},[e,t]),{elapsedTime:a}},A=e=>{const t=new Date(Math.max(e,0)),a=R(t.getMinutes()),r=R(t.getSeconds()),s=R(Math.floor(t.getMilliseconds()/10));return a+":"+r+"."+s},R=e=>e.toString().padStart(2,"0"),O=({timerProps:e})=>n.createElement("div",{className:"main-timer-box"},n.createElement(x,{timerProps:e})),x=({timerProps:e})=>{const t=S(e);return n.createElement(K,{timeInMilliseconds:t.elapsedTime})},K=({timeInMilliseconds:e})=>n.createElement("h1",null,A(e)),U=({started:e,running:t,startTimer:a,stopTimer:r,resetTimer:s,makeLap:o})=>{const T=t?n.createElement("button",{className:"start-stop-button button--stop-color",onClick:r},n.createElement("p",null,"Stop")):n.createElement("button",{className:"start-stop-button button--start-color",onClick:a},n.createElement("p",null,"Start")),f=n.createElement("button",{className:"reset-lap-button",onClick:s},n.createElement("p",null,"Reset")),E=n.createElement("button",{className:"reset-lap-button",onClick:o},n.createElement("p",null,"Lap")),I=n.createElement("button",{className:"reset-lap-button__disabled",disabled:!0,onClick:o},n.createElement("p",null,"Lap")),L=()=>e?t?E:f:I;return n.createElement("div",{className:"button-box"},L(),T)},j=({started:e,timerProps:t,lapData:a})=>{const{times:r,totalTime:s}=a,{slowInd:o,fastInd:i}=r.reduce((l,c,d)=>(c>l.slowLap&&(l.slowLap=c,l.slowInd=d),c<l.fastLap&&(l.fastLap=c,l.fastInd=d),l),{slowLap:-1/0,fastLap:1/0,slowInd:-1,fastInd:-1}),D=r.length>1?"lap--fast-color":"lap--mask-color",T=r.length>1?"lap--slow-color":"lap--mask-color",f=l=>l<0?"":i===l?D:o===l?T:"",E=Math.max(0,7-r.length-(e?1:0)),I=new Array(E).fill(0,0,E).map((l,c)=>n.createElement("div",{className:"lap",key:c})),L=r.map((l,c)=>{const d=r.length-c,w=f(c);return n.createElement(g,{colorClass:w,lapNumber:d,lapTime:l,key:d})});return n.createElement("div",{className:"laps-box"},e?n.createElement(q,{lapNumber:r.length+1,timerProps:t,totalLapTime:s}):null,L,I)},q=({lapNumber:e,timerProps:t,totalLapTime:a})=>{const r=S(t);return n.createElement(g,{colorClass:"",lapNumber:e,lapTime:r.elapsedTime-a})},g=({colorClass:e,lapNumber:t,lapTime:a})=>n.createElement("div",{className:"lap "+e,key:t},n.createElement("p",null,"Lap "+t),n.createElement("p",null,A(a))),m={START_TIMER:"START_TIMER",PAUSE_TIMER:"PAUSE_TIMER",RESET_TIMER:"RESET_TIMER",MAKE_LAP:"MAKE_LAP",SET_TIME:"SET_TIME"},v={isRunning:!1,mainData:{timestamp:0,savedTime:0},lapData:{timestamp:0,savedTime:0,times:[],totalTime:0}},F=(e,t)=>{switch(t.type){case m.START_TIMER:return u(p({},e),{isRunning:!0,mainData:u(p({},e.mainData),{timestamp:Date.now()}),lapData:u(p({},e.lapData),{timestamp:Date.now()})});case m.PAUSE_TIMER:return u(p({},e),{isRunning:!1,lapData:u(p({},e.lapData),{savedTime:Date.now()-e.lapData.timestamp+e.lapData.savedTime})});case m.RESET_TIMER:return v;case m.MAKE_LAP:const a=Date.now()-e.lapData.timestamp+e.lapData.savedTime;return u(p({},e),{lapData:{savedTime:0,timestamp:Date.now(),times:[a,...e.lapData.times],totalTime:e.lapData.totalTime+a}});default:throw new Error("Error: Action type not recognised.")}},$=()=>{const[{isRunning:e,mainData:t,lapData:a},r]=M.exports.useReducer(F,v),s={isRunning:e,timestamp:t.timestamp},o={isRunning:e,timestamp:a.timestamp},i=a.timestamp>0;return n.createElement("div",{className:"App"},n.createElement("div",{className:"background"},n.createElement(O,{timerProps:s}),n.createElement(U,{started:i,running:e,startTimer:()=>r({type:m.START_TIMER}),stopTimer:()=>r({type:m.PAUSE_TIMER}),resetTimer:()=>r({type:m.RESET_TIMER}),makeLap:()=>r({type:m.MAKE_LAP})}),n.createElement(j,{started:i,timerProps:o,lapData:a})))};k.render(n.createElement(n.StrictMode,null,n.createElement($,null)),document.getElementById("root"));