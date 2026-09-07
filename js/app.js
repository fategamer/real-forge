function $(id){return document.getElementById(id);}
function go(path){location.hash=path.startsWith('#')?path:'#'+path;}
function route(){const p=(location.hash||'#/create').replace('#','').split('/').filter(Boolean);return {name:p[0]||'create',id:p[1]};}
function toast(m){let w=document.querySelector('.toast-wrap');if(!w){w=document.createElement('div');w.className='toast-wrap';document.body.appendChild(w);}const t=document.createElement('div');t.className='toast';t.textContent=m;w.appendChild(t);setTimeout(()=>t.remove(),2500);}
const S={idea:'',enhanced:'',result:null,simple:true};
function render(){
  const r=route();
  $('app-root').innerHTML='<aside class="side"><a class="logo" href="index.html"><span class="logo-mark">R</span> REAL FORGE</a><nav>'+
    [['create','Create'],['library','Library'],['projects','Projects'],['studio','Studio'],['settings','Settings']].map(x=>'<a href="#/'+x[0]+'" class="'+(r.name===x[0]?'active':'')+'">'+x[1]+'</a>').join('')+
    '</nav></aside><div class="main"><div class="top"><div class="muted">'+r.name.toUpperCase()+'</div></div><div id="view"></div></div>';
  if(r.name==='library') return lib();
  if(r.name==='projects') return proj();
  if(r.name==='studio'){$('view').innerHTML='<div class="page"><p class="muted">Studio preview</p></div>';return;}
  if(r.name==='settings'){$('view').innerHTML='<div class="page"><h2>Settings</h2><p class="muted">Local profile</p></div>';return;}
  create();
}
function create(){
  $('view').innerHTML='<div class="create"><div class="canvas page"><h2>Create</h2><p class="muted">'+(S.result?'Saved result ready.':'Describe an idea, optimize, forge.')+'</p>'+(S.result?'<img src="'+S.result.url+'" style="max-width:100%;border-radius:12px;margin-top:12px">':'')+'</div><aside class="controls"><h4>Idea</h4><textarea id="idea">'+(S.idea||'')+'</textarea><button class="btn" id="eng" style="width:100%;margin-top:8px">Optimize with Reality Engine</button><textarea id="enh" style="margin-top:8px">'+(S.enhanced||'')+'</textarea><button class="btn btn-accent" id="forge" style="width:100%;margin-top:8px">Forge image</button></aside></div>';
  $('eng').onclick=async()=>{S.idea=$('idea').value;const o=await RealityEngine.enhancePrompt(S.idea,S);S.enhanced=o.enhancedPrompt;$('enh').value=S.enhanced;toast('Prompt optimized');};
  $('forge').onclick=async()=>{S.idea=$('idea').value;S.enhanced=$('enh').value||S.idea;const res=await GenerationService.generateImage({idea:S.idea});const item={id:'g'+Date.now(),kind:'image',url:res.url,idea:S.idea,prompt:S.enhanced,created:Date.now(),projectName:'Nairobi Night Campaign',favorite:false};Store.addItem(item);S.result=item;toast('Saved to Library');render();};
}
function lib(){
  const items=Store.search('', 'all', 'newest');
  $('view').innerHTML='<div class="page"><h2>Library</h2></div><div class="gallery">'+(items.map(it=>'<article class="card"><img src="'+it.url+'"><p class="muted">'+it.idea+'</p></article>').join('')||'<p class="muted page">Empty. Forge first.</p>')+'</div>';
}
function proj(){
  const d=Store.data();
  $('view').innerHTML='<div class="page"><h2>Projects</h2>'+d.projects.map(p=>'<div class="card"><h3>'+p.title+'</h3><p class="muted">'+p.description+'</p></div>').join('')+'</div>';
}
window.addEventListener('hashchange',render);
window.addEventListener('DOMContentLoaded',render);
