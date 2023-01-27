(()=>{var v=Object.defineProperty;var C=(o,e)=>{for(var t in e)v(o,t,{get:e[t],enumerable:!0})};var u=null;(function(){let o=function(n){let r=window[n.shift()];for(;r&&n.length;)r=r[n.shift()];return r},e=o(["chrome","webview","postMessage"]),t=o(["webkit","messageHandlers","external","postMessage"]);if(!e&&!t){console.error("Unsupported Platform");return}e&&(u=n=>window.chrome.webview.postMessage(n)),t&&(u=n=>window.webkit.messageHandlers.external.postMessage(n))})();function w(o,e){u(e&&e!==-1?"WINDOWID:"+e+":"+o:o)}var s={};function E(){let o=new Uint32Array(1);return window.crypto.getRandomValues(o)[0]}function O(){return Math.random()*9007199254740991}var f;window.crypto?f=E:f=O;function h(o,e,t){t==null&&(t=0);let n=window.wails.window.ID();return new Promise(function(r,i){let l;do l=o+"-"+f();while(s[l]);let a;t>0&&(a=setTimeout(function(){i(Error("Call to "+o+" timed out. Request ID: "+l))},t)),s[l]={timeoutHandle:a,reject:i,resolve:r};try{let m={name:o,args:e,callbackID:l,windowID:n};window.WailsInvoke("C"+JSON.stringify(m))}catch(m){console.error(m)}})}window.ObfuscatedCall=(o,e,t)=>(t==null&&(t=0),new Promise(function(n,r){let i;do i=o+"-"+f();while(s[i]);let l;t>0&&(l=setTimeout(function(){r(Error("Call to method "+o+" timed out. Request ID: "+i))},t)),s[i]={timeoutHandle:l,reject:r,resolve:n};try{let a={id:o,args:e,callbackID:i,windowID:window.wails.window.ID()};window.WailsInvoke("c"+JSON.stringify(a))}catch(a){console.error(a)}}));function x(o){let e;try{e=JSON.parse(o)}catch(r){let i=`Invalid JSON passed to callback: ${r.message}. Message: ${o}`;throw runtime.LogDebug(i),new Error(i)}let t=e.callbackid,n=s[t];if(!n){let r=`Callback '${t}' not registered!!!`;throw console.error(r),new Error(r)}clearTimeout(n.timeoutHandle),delete s[t],e.error?n.reject(e.error):n.resolve(e.result)}var c={};function I(o){let e=o.name;if(c[e]){let t=c[e].slice();for(let n=0;n<c[e].length;n+=1){let r=c[e][n],i=o.data;r.Callback(i)&&t.splice(n,1)}t.length===0?M(e):c[e]=t}}function S(o){let e;try{e=JSON.parse(o)}catch{let n="Invalid JSON passed to Notify: "+o;throw new Error(n)}I(e)}function M(o){delete c[o],window.WailsInvoke("EX"+o)}window.go={};function y(o){try{o=JSON.parse(o)}catch(e){console.error(e)}window.go=window.go||{},Object.keys(o).forEach(e=>{window.go[e]=window.go[e]||{},Object.keys(o[e]).forEach(t=>{window.go[e][t]=window.go[e][t]||{},Object.keys(o[e][t]).forEach(n=>{window.go[e][t][n]=function(){let r=0;function i(){let l=[].slice.call(arguments);return h([e,t,n].join("."),l,r)}return i.setTimeout=function(l){r=l},i.getTimeout=function(){return r},i}()})})})}var p={};C(p,{GetText:()=>H,SetText:()=>D});var T=window.location.origin+"/wails/runtime";function b(o,e){let t=new URL(T);if(t.searchParams.append("method",o),e)for(let n in e)t.searchParams.append(n,e[n]);return new Promise((n,r)=>{fetch(t).then(i=>{if(i.ok)return i.headers.get("content-type")&&i.headers.get("content-type").indexOf("application/json")!==-1?i.json():i.text();r(Error(i.statusText))}).then(i=>n(i)).catch(i=>r(i))})}function d(o,e){return!e||e===-1?function(t,n){return b(o+"."+t,n)}:function(t,n){return n=n||{},n.windowID=e,b(o+"."+t,n)}}var g=d("clipboard");function D(o){return g("SetText",{text:o})}function H(){return g("GetText")}function k(o){let e=d("window",o);return{Center:()=>e("Center"),SetTitle:t=>e("SetTitle",{title:t}),Fullscreen:()=>e("Fullscreen"),UnFullscreen:()=>e("UnFullscreen"),SetSize:(t,n)=>e("SetSize",{width:t,height:n}),Size:()=>e("Size"),SetMaxSize:(t,n)=>e("SetMaxSize",{width:t,height:n}),SetMinSize:(t,n)=>e("SetMinSize",{width:t,height:n}),SetAlwaysOnTop:t=>e("SetAlwaysOnTop",{alwaysOnTop:t}),SetPosition:(t,n)=>e("SetPosition",{x:t,y:n}),Position:()=>e("Position"),Hide:()=>e("Hide"),Maximise:()=>e("Maximise"),Show:()=>e("Show"),ToggleMaximise:()=>e("ToggleMaximise"),UnMaximise:()=>e("UnMaximise"),Minimise:()=>e("Minimise"),UnMinimise:()=>e("UnMinimise"),SetBackgroundColour:(t,n,r,i)=>e("SetBackgroundColour",{R,G,B,A})}}window.wails={Callback:x,callbacks:s,EventsNotify:S,eventListeners:c,SetBindings:y};function U(o){return{Clipboard:{...p},Window:k(o),Show:()=>w("S"),Hide:()=>w("H"),Quit:()=>w("Q")}}window.runtime=U(-1);console.log("Wails v3.0.0 Debug Mode Enabled");})();
