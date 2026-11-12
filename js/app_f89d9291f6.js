/* v146 화면 보기 방식 */
(function(){function set(m,save){document.documentElement.classList.toggle("calm",m==="calm");document.querySelectorAll("[data-vm]").forEach(b=>b.setAttribute("aria-pressed",String((b.dataset.vm||"")===(m||""))));if(save){try{localStorage.setItem("gistd-vm",m||"")}catch(e){}}}
var q=(location.search.match(/[?&]view=(calm|base)/)||[])[1];var m="";try{m=localStorage.getItem("gistd-vm")||""}catch(e){}if(q)m=q==="calm"?"calm":"";set(m,false);
document.addEventListener("click",function(e){var b=e.target.closest("[data-vm]");if(!b)return;set(b.dataset.vm,true);});})();
