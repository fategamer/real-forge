const KEY="rf-paid-1";
const PAY={starter:"https://whop.com/checkout/plan_jvZOkaJWLQR63",pro:"https://whop.com/checkout/plan_Q1ecxzw2Enc8w",studio:"https://whop.com/checkout/plan_SItOBieJMy2m2"};
const PLANS={trial:{name:"Trial",credits:3,mark:true},starter:{name:"Starter",credits:80,mark:false},pro:{name:"Pro",credits:400,mark:false},studio:{name:"Studio",credits:1500,mark:false}};
const CASES=[{id:"hero",n:"Website hero",h:"wide cinematic hero"},{id:"ad",n:"Product ad",h:"product hero"},{id:"social",n:"Social post",h:"square social"},{id:"estate",n:"Real estate",h:"architecture photo"}];
function db(){try{const r=localStorage.getItem(KEY);if(r)return JSON.parse(r);}catch(e){}
const s={plan:"trial",used:0,items:[],brand:{name:"Studio",tone:"cinematic",style:"photoreal"}};localStorage.setItem(KEY,JSON.stringify(s));return s;}
function put(d){localStorage.setItem(KEY,JSON.stringify(d));}
function plan(){return PLANS[db().plan]||PLANS.trial;}
function left(){return Math.max(0,plan().credits-db().used);}
function toast(m){const t=document.createElement("div");t.className="toast";t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),2200);}
function route(){return (location.hash||"#/create").replace("#/","").split("/")[0];}
function brief(idea,h,br){return (idea||"A creative walking a modern city at blue hour")+", "+h+", "+br.tone+", no text, no logo";}
function src(p){return "https://image.pollinations.ai/prompt/"+encodeURIComponent(p)+"?width=1280&height=720&nologo=true&model=flux";}
const S={idea:"",enhanced:"",use:CASES[0],result:null,busy:false};
function need(n){if(left()<n){location.hash="#/pricing";toast("Pay to continue");return false;}return true;}
function render(){
 const root=document.getElementById("root");
 if(!root)return;
 const r=route(),d=db(),p=plan();
 root.innerHTML=`<div class="shell"><aside class="side"><a class="brand" href="index.html"><i>R</i> REAL FORGE</a><a class="${r==="create"?"on":""}" href="#/create">Create</a><a class="${r==="library"?"on":""}" href="#/library">Library</a><a class="${r==="pricing"?"on":""}" href="#/pricing">Plans</a><p class="lead" style="padding:10px">${p.name}<br>${left()} credits</p></aside><div><div class="bar">${r.toUpperCase()}</div><div id="view"></div></div></div>`;
 if(r==="library"){document.getElementById("view").innerHTML=`<div class="grid">${(d.items||[]).map(i=>`<article class="card"><img src="${i.url}" alt=""></article>`).join("")||"<p class=lead style=padding:24px>Empty.</p>"}</div>`;return;}
 if(r==="pricing"){document.getElementById("view").innerHTML=`<div class="prices"><article><h2>Starter $12</h2><a class="btn lime wide" href="${PAY.starter}" target="_blank" rel="noopener">Pay Starter</a></article><article><h2>Pro $29</h2><a class="btn lime wide" href="${PAY.pro}" target="_blank" rel="noopener">Pay Pro</a></article><article><h2>Studio $79</h2><a class="btn lime wide" href="${PAY.studio}" target="_blank" rel="noopener">Pay Studio</a></article></div>`;return;}
 create();
}
function create(){
 document.getElementById("view").innerHTML=`<div class="work"><div class="stage"><div class="frame">${S.busy?"Forging…":S.result?`<img src="${S.result.url}" alt="">${plan().mark?"<div class=mark>TRIAL</div>":""}`:"Type an idea. Forge."}</div></div><aside class="panel"><select id="uc">${CASES.map(c=>`<option value="${c.id}">${c.n}</option>`).join("")}</select><textarea id="idea" placeholder="One sentence">${S.idea}</textarea><button class="btn wide" id="eng">Optimize</button><textarea id="enh">${S.enhanced}</textarea><button class="btn lime wide" id="go">Forge · 1 credit</button></aside></div>`;
 document.getElementById("eng").onclick=()=>{S.idea=document.getElementById("idea").value.trim()||"A creative walking a modern city at blue hour";S.use=CASES.find(c=>c.id===document.getElementById("uc").value)||S.use;S.enhanced=brief(S.idea,S.use.h,db().brand);const o=document.createElement("div");o.className="modal-bg";o.innerHTML=`<div class="modal"><textarea id="mE">${S.enhanced}</textarea><button class="btn lime" id="g">Generate</button></div>`;document.body.appendChild(o);document.getElementById("g").onclick=()=>{S.enhanced=document.getElementById("mE").value;o.remove();forge();};};
 document.getElementById("go").onclick=forge;
}
function forge(){if(!need(1))return;S.idea=(document.getElementById("idea")&&document.getElementById("idea").value.trim())||S.idea||"A creative walking a modern city at blue hour";if(!S.enhanced)S.enhanced=brief(S.idea,S.use.h,db().brand);S.busy=true;render();
 const item={id:Date.now(),idea:S.idea,url:src(S.enhanced)};
 setTimeout(()=>{const d=db();d.used+=1;d.items.unshift(item);put(d);S.result=item;S.busy=false;toast(left()+" credits left");render();},300);
}
window.addEventListener("hashchange",render);
window.addEventListener("DOMContentLoaded",render);
if(document.readyState!=="loading")render();
