const KEY="rf-pro-2";
const PAY={starter:"https://whop.com/checkout/plan_jvZOkaJWLQR63",pro:"https://whop.com/checkout/plan_Q1ecxzw2Enc8w",studio:"https://whop.com/checkout/plan_SItOBieJMy2m2"};
const PLANS={trial:{name:"Trial",credits:3,mark:true},starter:{name:"Starter",credits:80,mark:false},pro:{name:"Pro",credits:400,mark:false},studio:{name:"Studio",credits:1500,mark:false}};
const CASES=[{id:"hero",n:"Website hero",h:"wide cinematic hero, negative space left"},{id:"ad",n:"Product ad",h:"luxury product hero, studio light"},{id:"social",n:"Social post",h:"square social crop"},{id:"estate",n:"Real estate",h:"architecture twilight photo"},{id:"fashion",n:"Fashion",h:"editorial fashion dusk"}];
const MODES=["Text → Image","Image → Image","Text → Video","Image → Video"];
function db(){try{const r=localStorage.getItem(KEY);if(r)return JSON.parse(r);}catch(e){}
const s={plan:"trial",used:0,items:[],brand:{name:"Studio",tone:"cinematic",style:"photoreal",lock:true},pro:true};localStorage.setItem(KEY,JSON.stringify(s));return s;}
function put(d){localStorage.setItem(KEY,JSON.stringify(d));}
function plan(){return PLANS[db().plan]||PLANS.trial;}
function left(){return Math.max(0,plan().credits-db().used);}
function toast(m){const t=document.createElement("div");t.className="toast";t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),2400);}
function route(){return (location.hash||"#/create").replace("#/","").split("/")[0];}
function brief(idea,h,br){return (idea||"A creative walking a modern city at blue hour")+", "+h+", "+br.tone+", "+br.style+", realistic skin and materials, no text, no logo, no watermark";}
function src(p,w,h){return "https://image.pollinations.ai/prompt/"+encodeURIComponent(p)+"?width="+(w||1280)+"&height="+(h||720)+"&nologo=true&model=flux&seed="+Date.now();}
function quality(p){const issues=[];if(/text|logo|watermark/i.test(p)===false)issues.push("Prompt already blocks text.");if(p.length<40)issues.push("Direction is short — Reality Engine will expand it.");return issues;}
const S={idea:"",enhanced:"",use:CASES[0],mode:MODES[0],result:null,busy:false,pack:false};
function need(n){if(left()<n){location.hash="#/pricing";toast("Credits spent. Pay to continue.");return false;}return true;}
function render(){const root=document.getElementById("root");if(!root)return;const r=route(),d=db(),p=plan();
root.innerHTML=`<div class="shell"><aside class="side"><a class="brand" href="index.html"><i>R</i> REAL FORGE</a>
<a class="${r==="create"?"on":""}" href="#/create">Create</a>
<a class="${r==="library"?"on":""}" href="#/library">Library</a>
<a class="${r==="pricing"?"on":""}" href="#/pricing">Plans</a>
<p class="lead" style="padding:10px">${p.name}<br>${left()} credits<br>${d.pro?"PRO MODE":"SIMPLE"}</p></aside>
<div><div class="bar">${r.toUpperCase()} · ${S.mode}</div><div id="view"></div></div></div>`;
if(r==="library"){document.getElementById("view").innerHTML=`<div class="grid">${(d.items||[]).map(i=>`<article class="card"><img src="${i.url}" alt=""><p>${i.idea||""}</p></article>`).join("")||"<p class=lead style=padding:24px>Empty library.</p>"}</div>`;return;}
if(r==="pricing"){document.getElementById("view").innerHTML=`<div class="prices"><article><h2>Starter $12</h2><p>80 stills / month</p><a class="btn lime wide" href="${PAY.starter}" target="_blank" rel="noopener">Pay Starter</a></article><article><h2>Pro $29</h2><p>400 stills + Brand Lock + Forge Pack</p><a class="btn lime wide" href="${PAY.pro}" target="_blank" rel="noopener">Pay Pro</a></article><article><h2>Studio $79</h2><p>1,500 stills + priority</p><a class="btn lime wide" href="${PAY.studio}" target="_blank" rel="noopener">Pay Studio</a></article></div>`;return;}
create();}
function create(){
 document.getElementById("view").innerHTML=`<div class="work"><div class="stage"><div class="frame">${S.busy?"Forging…":S.result?`<img src="${S.result.url}" alt="">${plan().mark?"<div class=mark>TRIAL</div>":""}`:"Type one idea. Optimize. Forge."}</div>${S.result?`<p class="lead">Quality: ${quality(S.enhanced).join(" ")||"Ready to export."}</p>`:""}</div>
<aside class="panel">
<select id="md">${MODES.map(m=>`<option ${m===S.mode?"selected":""}>${m}</option>`).join("")}</select>
<select id="uc">${CASES.map(c=>`<option value="${c.id}">${c.n}</option>`).join("")}</select>
<textarea id="idea" placeholder="One sentence idea">${S.idea}</textarea>
<label class="lead"><input type="checkbox" id="pack" ${S.pack?"checked":""}> Forge Pack (3 crops · 2 credits)</label>
<button class="btn wide" id="eng">Reality Engine</button>
<textarea id="enh">${S.enhanced}</textarea>
<button class="btn lime wide" id="go">Forge</button>
</aside></div>`;
 document.getElementById("md").onchange=e=>{S.mode=e.target.value;if(/Video/.test(S.mode))toast("Video is Pro preview — stills generate now.");};
 document.getElementById("eng").onclick=()=>{S.idea=document.getElementById("idea").value.trim()||"A creative walking a modern city at blue hour";S.use=CASES.find(c=>c.id===document.getElementById("uc").value)||S.use;S.enhanced=brief(S.idea,S.use.h,db().brand);document.getElementById("enh").value=S.enhanced;toast("Direction locked.");};
 document.getElementById("go").onclick=forge;
}
function forge(){S.pack=document.getElementById("pack")&&document.getElementById("pack").checked;const cost=S.pack?2:1;if(!need(cost))return;S.idea=(document.getElementById("idea")&&document.getElementById("idea").value.trim())||S.idea||"A creative walking a modern city at blue hour";S.enhanced=(document.getElementById("enh")&&document.getElementById("enh").value.trim())||S.enhanced||brief(S.idea,S.use.h,db().brand);S.busy=true;render();
 const item={id:Date.now(),idea:S.idea,url:src(S.enhanced),mode:S.mode};
 setTimeout(()=>{const d=db();d.used+=cost;d.items.unshift(item);if(S.pack){d.items.unshift({id:Date.now()+1,idea:S.idea+" · 1:1",url:src(S.enhanced,1080,1080)});d.items.unshift({id:Date.now()+2,idea:S.idea+" · 9:16",url:src(S.enhanced,1080,1920)});}
 put(d);S.result=item;S.busy=false;toast(left()+" credits left");render();},400);}
window.addEventListener("hashchange",render);
window.addEventListener("DOMContentLoaded",render);
if(document.readyState!=="loading")render();
