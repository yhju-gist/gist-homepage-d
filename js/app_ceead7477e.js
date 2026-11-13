/* v240 지오넷 A안에서 배운 움직임 */
(function(){
var RM=matchMedia("(prefers-reduced-motion: reduce)").matches, D=document, R=D.documentElement;
function calm(){return RM||R.classList.contains("calm")||D.body.classList.contains("editing");}
/* ① 제목 글자 올라오기: 글은 그대로 두고(읽어 주는 프로그램에는 원문 한 줄), 눈에 보이는 글만 낱말·글자로 나눈다. 제목 바로 아래 글 마디만 다루고 안쪽 요소(작은 글·표시)는 건드리지 않는다 */
function split(h){
  if(h.dataset.aSp||h.closest("[contenteditable]"))return; h.dataset.aSp="1"; var n=0;
  [].slice.call(h.childNodes).forEach(function(t){
    if(t.nodeType!==3||!t.nodeValue.trim())return;
    var txt=t.nodeValue, sr=D.createElement("span"); sr.className="sr"; sr.textContent=txt;
    var vis=D.createElement("span"); vis.setAttribute("aria-hidden","true");
    txt.split(/(\s+)/).forEach(function(w){
      if(!w)return; if(/^\s+$/.test(w)){vis.appendChild(D.createTextNode(" "));return;}
      var ws=D.createElement("span"); ws.className="a-w";
      Array.from(w).forEach(function(c){var s=D.createElement("span"); s.className="a-ch"; s.style.setProperty("--i",n++); s.textContent=c; ws.appendChild(s);});
      vis.appendChild(ws);
    });
    var f=D.createDocumentFragment(); f.appendChild(sr); f.appendChild(vis); h.replaceChild(f,t);
  });
}
function titles(){
  if(calm()||!("IntersectionObserver" in window))return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("a-in");io.unobserve(e.target);}});},{rootMargin:"0px 0px -12% 0px",threshold:.2});
  [].slice.call(D.querySelectorAll("#v-home h2.p-tit")).forEach(function(h){split(h);io.observe(h);});
}
/* ② 머리 메뉴: 첫 화면을 지난 뒤 내려 읽으면 위로 비켜 주고, 조금이라도 올리면 돌아온다. 메뉴가 펼쳐져 있거나 머리 안에 글쇠 초점이 있으면 비키지 않는다 */
function header(){
  var hd=D.querySelector("header.hd"); if(!hd)return; var last=window.scrollY, acc=0, tick=false;
  function busy(){var m=D.getElementById("mega");return hd.contains(D.activeElement)||(m&&(m.classList.contains("on")||m.classList.contains("open")))||D.body.classList.contains("mega-on")||D.querySelector('[aria-expanded="true"]');}
  function run(){tick=false; var y=window.scrollY, d=y-last; last=y;
    if(calm()||y<Math.max(520,innerHeight*.8)||busy()){hd.classList.remove("a-away");acc=0;return;}
    acc=(d>0)===(acc>0)?acc+d:d;
    if(acc>64)hd.classList.add("a-away"); else if(acc<-8)hd.classList.remove("a-away");}
  addEventListener("scroll",function(){if(!tick){tick=true;requestAnimationFrame(run);}},{passive:true});
  hd.addEventListener("focusin",function(){hd.classList.remove("a-away");});
  addEventListener("hashchange",function(){hd.classList.remove("a-away");acc=0;});
}
/* ④ 따라오는 둥근 단추: 안내 카드(.p-pc) 위에서만 보인다. 꾸밈이라 읽어 주는 프로그램·글쇠 사용에는 없는 것과 같다(카드 자체가 링크) */
function follow(){
  if(calm()||!matchMedia("(hover:hover) and (pointer:fine)").matches)return;
  var cards=D.querySelectorAll("#v-home .p-pc"); if(!cards.length)return;
  var fb=D.createElement("div"); fb.className="a-fb"; fb.setAttribute("aria-hidden","true");
  fb.innerHTML='<svg viewBox="0 0 112 112"><defs><path id="a-ring" d="M56 56m-46 0a46 46 0 1 1 92 0a46 46 0 1 1 -92 0"/></defs><g id="a-rot"><text><textPath href="#a-ring">GIST · VIEW MORE · GIST · VIEW MORE · </textPath></text></g></svg><i>→</i>';
  D.body.appendChild(fb); var rot=fb.querySelector("#a-rot"), x=-200,y=-200,tx=x,ty=y,ang=0,on=false,raf=0;
  function loop(){var dx=tx-x,dy=ty-y; x+=dx*.18; y+=dy*.18; ang+=.25+Math.min(9,Math.hypot(dx,dy)*.06);
    fb.style.transform="translate3d("+x+"px,"+y+"px,0) scale("+(on?1:.4)+")"; rot.setAttribute("transform","rotate("+ang+" 56 56)");
    raf=(on||Math.abs(dx)+Math.abs(dy)>.5)?requestAnimationFrame(loop):0;}
  [].forEach.call(cards,function(c){
    c.addEventListener("pointerenter",function(e){on=true;tx=e.clientX;ty=e.clientY;if(x<-100){x=tx;y=ty;}fb.classList.add("on");if(!raf)raf=requestAnimationFrame(loop);});
    c.addEventListener("pointermove",function(e){tx=e.clientX;ty=e.clientY;if(!on){on=true;if(x<-100){x=tx;y=ty;}fb.classList.add("on");}if(!raf)raf=requestAnimationFrame(loop);});
    c.addEventListener("pointerleave",function(){on=false;fb.classList.remove("on");});
  });
  addEventListener("scroll",function(){if(on){on=false;fb.classList.remove("on");}},{passive:true});
}
function go(){try{titles();}catch(e){}try{header();}catch(e){}try{follow();}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",go);else go();
})();
