/* v137 하위 화면 영문 큰 이름: 스탠퍼드처럼 대문자만 쓰지 않고 첫 글자만 대문자(약어는 그대로) */
(function(){var KEEP={GIST:1,AI:1,SNS:1,"Q&A":1,FAQ:1,ZEUS:1,"3D":1,AX:1};
function tc(t){return t.split(/(\s+)/).map(function(w){if(!w.trim()||KEEP[w])return w;return w.charAt(0)+w.slice(1).toLowerCase();}).join("");}
function fix(r){(r.querySelectorAll?r:document).querySelectorAll(".pv-en").forEach(function(e){if(e.dataset.tc)return;var t=e.textContent;if(t===t.toUpperCase()){e.textContent=tc(t);}e.dataset.tc=1;});}
fix(document);new MutationObserver(function(m){m.forEach(function(x){x.addedNodes.forEach(function(n){if(n.nodeType===1){if(n.classList&&n.classList.contains("pv-en")){n.parentNode&&fix(n.parentNode);}else fix(n);}});});}).observe(document.body,{childList:true,subtree:true});})();
