
(function(){
'use strict';
var KEY='pws-consent',VER=1;
function store(){try{var r=window.localStorage.getItem(KEY);return r?JSON.parse(r):null}catch(e){return null}}
function save(v){try{window.localStorage.setItem(KEY,JSON.stringify({value:v,ts:Date.now(),v:VER}))}catch(e){}}
var box=document.getElementById('consent'),opener=null;
if(box){
  var c=store();
  if(!c||c.v!==VER)box.hidden=false;
  var done=function(v){save(v);box.hidden=true;if(opener){opener.focus();opener=null}};
  document.getElementById('c-accept').addEventListener('click',function(){done('all')});
  document.getElementById('c-reject').addEventListener('click',function(){done('essential')});
  document.getElementById('c-manage').addEventListener('click',function(){var d=box.querySelector('details');d.open=!d.open});
  var open=document.querySelectorAll('[data-cookie-settings]');
  for(var i=0;i<open.length;i++){open[i].addEventListener('click',function(e){opener=e.currentTarget;box.hidden=false;box.querySelector('details').open=true;var h=document.getElementById('consent-h');h.setAttribute('tabindex','-1');h.focus()})}
}
/* nav */
var mb=document.getElementById('menubtn'),nav=document.getElementById('nav');
if(mb&&nav){
  mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o?'true':'false');mb.textContent=o?'Close':'Menu'});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');mb.setAttribute('aria-expanded','false');mb.textContent='Menu';mb.focus()}});
  document.addEventListener('click',function(e){if(nav.classList.contains('open')&&!nav.contains(e.target)&&e.target!==mb){nav.classList.remove('open');mb.setAttribute('aria-expanded','false');mb.textContent='Menu'}});
  nav.addEventListener('focusout',function(e){if(e.relatedTarget&&!nav.contains(e.relatedTarget)&&e.relatedTarget!==mb&&nav.classList.contains('open')){nav.classList.remove('open');mb.setAttribute('aria-expanded','false');mb.textContent='Menu'}});
}
/* dropdown (desktop) */
var dd=document.getElementById('ddbtn'),dm=document.getElementById('ddmenu');
if(dd&&dm){
  function setDD(o){dm.classList.toggle('open',o);dd.setAttribute('aria-expanded',o?'true':'false')}
  dd.addEventListener('click',function(){setDD(!dm.classList.contains('open'))});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&dm.classList.contains('open')){setDD(false);dd.focus()}});
  document.addEventListener('click',function(e){if(!dd.parentNode.contains(e.target))setDD(false)});
  dd.parentNode.addEventListener('focusout',function(e){if(e.relatedTarget&&!dd.parentNode.contains(e.relatedTarget))setDD(false)});
}
/* demo quote form */
var qf=document.getElementById('quote-form');
if(qf){
  var other=document.getElementById('f-other-wrap'),sel=document.getElementById('f-interest');
  if(sel&&other){sel.addEventListener('change',function(){other.hidden=sel.value!=='Other'})}
  qf.addEventListener('submit',function(e){e.preventDefault();var s=document.getElementById('quote-status');
    if(!qf.checkValidity()){s.className='status err';s.textContent='Please fill in the required fields.';qf.reportValidity();return}
    s.className='status';s.textContent='This is a working demo and is not connected yet, so nothing was sent.'})
}
/* report form */
var rf=document.getElementById('report-form');
if(rf){
  rf.addEventListener('submit',function(e){e.preventDefault();var s=document.getElementById('report-status');
    if(!rf.checkValidity()){s.className='status err';s.textContent='Please fill in the required fields.';rf.reportValidity();return}
    s.className='status';s.textContent='Sending...';
    fetch(rf.action,{method:'POST',body:new FormData(rf),headers:{'Accept':'application/json'}}).then(function(r){
      if(r.ok){s.className='status';s.textContent='Thank you. Your report was sent.';s.setAttribute('tabindex','-1');s.focus();rf.reset()}
      else{throw new Error('bad')}
    }).catch(function(){s.className='status err';s.textContent='Your report could not be sent from here. Please tell Preferred Web Solutions directly.'})
  })
}
/* new page: always start at the top unless back/forward or a hash */
try{var nt=performance.getEntriesByType('navigation')[0],keep=!!location.hash||(nt&&nt.type==='back_forward');
if(!keep){try{if('scrollRestoration' in history)history.scrollRestoration='manual'}catch(e){}
var top=function(){try{window.scrollTo(0,0);document.documentElement.scrollTop=0;document.body.scrollTop=0;document.documentElement.scrollIntoView({block:'start'})}catch(e){}};
top();document.addEventListener('DOMContentLoaded',top);window.addEventListener('load',function(){top();setTimeout(top,60);setTimeout(top,300)});window.addEventListener('pageshow',function(e){if(!e.persisted)top()});requestAnimationFrame(top)}}catch(e){}
})();

(function(){var p=document.getElementById('hero-p');if(!p)return;var im=p.querySelectorAll('img'),cap=document.getElementById('hero-cap'),b=document.getElementById('hero-pp');if(im.length<2)return;
var i=0,t=null,mq=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)'),paused=!!(mq&&mq.matches);
function show(n){im[i].classList.remove('on');i=(n+im.length)%im.length;im[i].classList.add('on');cap.textContent=im[i].getAttribute('data-cap')}
function run(){stop();t=setInterval(function(){show(i+1)},5000)}
function stop(){if(t){clearInterval(t);t=null}}
function set(pz){paused=pz;b.setAttribute('aria-pressed',pz?'true':'false');b.textContent=pz?'Play slideshow':'Pause slideshow';if(pz)stop();else run()}
b.addEventListener('click',function(){set(!paused)});
document.addEventListener('visibilitychange',function(){if(document.hidden)stop();else if(!paused)run()});
set(paused);
})();

(function(){var t=document.getElementById('rv-track');if(!t)return;var pv=document.getElementById('rv-prev'),nx=document.getElementById('rv-next');
var mq=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)');
function upd(){var max=t.scrollWidth-t.clientWidth-2;pv.setAttribute('aria-disabled',t.scrollLeft<=2?'true':'false');nx.setAttribute('aria-disabled',t.scrollLeft>=max?'true':'false')}
function go(d){t.scrollBy({left:d*t.clientWidth*0.9,behavior:(mq&&mq.matches)?'auto':'smooth'})}
pv.addEventListener('click',function(){go(-1)});nx.addEventListener('click',function(){go(1)});t.addEventListener('scroll',upd,{passive:true});window.addEventListener('resize',upd);upd();
})();
(function(){var links=document.querySelectorAll('.gchips a[href^="#"]');if(!links.length)return;
var mq=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)');
function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
function to(y){var y0=window.pageYOffset,dy=y-y0;if(!dy)return;if(mq&&mq.matches){window.scrollTo(0,y);return}
var dur=Math.min(1100,Math.max(550,Math.abs(dy)*0.55)),t0=null;
function step(ts){if(t0===null)t0=ts;var p=Math.min(1,(ts-t0)/dur);window.scrollTo(0,y0+dy*ease(p));if(p<1)requestAnimationFrame(step)}
requestAnimationFrame(step)}
links.forEach(function(a){a.addEventListener('click',function(ev){var id=a.getAttribute('href').slice(1),el=document.getElementById(id);if(!el)return;ev.preventDefault();
var off=parseFloat(getComputedStyle(el).scrollMarginTop)||0;var y=el.getBoundingClientRect().top+window.pageYOffset-off;
to(Math.max(0,y));try{history.replaceState(null,'','#'+id)}catch(e){}
var h=el.querySelector('h2');if(h){h.setAttribute('tabindex','-1');try{h.focus({preventScroll:true})}catch(e){}}})})})();
(function(){var bs=document.querySelectorAll('.gmore');if(!bs.length)return;
function vis(g){var c=parseInt(getComputedStyle(g).columnCount)||2;return c*3}
function sync(){bs.forEach(function(b){var g=document.getElementById(b.dataset.t);var n=+b.dataset.n;b.hidden=(g.classList.contains('open')?false:n<=vis(g))})}
bs.forEach(function(b){var g=document.getElementById(b.dataset.t),n=+b.dataset.n;
b.addEventListener('click',function(){var open=g.classList.toggle('open');b.setAttribute('aria-expanded',open?'true':'false');
if(open){var k=vis(g);Array.prototype.forEach.call(g.children,function(t,i){if(i>=k){t.classList.add('new');t.style.animationDelay=Math.min((i-k)%12,11)*40+'ms'}});b.textContent='Show fewer photos'}
else{b.textContent='Show all '+n+' photos';var h=g.parentElement;var y=h.getBoundingClientRect().top+window.pageYOffset-90;window.scrollTo(0,Math.max(0,y))}})});
sync();window.addEventListener('resize',sync)})();
(function(){var d=document.documentElement;var els=document.querySelectorAll('.ph-tile,.box,.svc,.fact,.tcard,.rvc,.sec h2,.gsec .gd,.band');
if(!('IntersectionObserver' in window)||(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)||!els.length)return;
d.classList.add('jsr');var h=innerHeight;
els.forEach(function(e,i){e.classList.add('rvl');var r=e.getBoundingClientRect();if(r.top<h&&r.bottom>0)e.classList.add('in')});
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){var e=x.target,sib=e.parentElement?Array.prototype.indexOf.call(e.parentElement.children,e):0;e.style.transitionDelay=Math.min(sib%3,2)*90+'ms';e.classList.add('in');io.unobserve(e)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
els.forEach(function(e){if(!e.classList.contains('in'))io.observe(e)});
setTimeout(function(){els.forEach(function(e){e.classList.add('in')})},8000);
})();
