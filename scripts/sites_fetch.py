#!/usr/bin/env python3
"""학과·연구소·센터 홈페이지의 첫 화면(또는 공지 목록·RSS)에서 최근 글 제목·날짜·주소만 읽어 data/sites.json 에 저장한다.
- D안의 학과 화면·'홈페이지 연결 현황'·통합검색이 이 파일을 읽어 각 홈페이지 최신 글을 함께 보여 준다(대표 홈페이지 ↔ 개별 홈페이지 연결).
- 작성자 이름 같은 개인정보는 저장하지 않는다. 가져오기에 실패한 곳은 지난번 값을 그대로 두고 ok=false 로 표시한다.
- 표준 라이브러리만 쓴다. 학교 서버 인증서 연결이 느린 곳(전기전자컴퓨터공학과 등)이 있어 30초씩 세 번까지 시도한다."""
import json, os, re, ssl, sys, time, urllib.request, datetime as dt, html
from urllib.parse import urljoin
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "sites.json")
KST = dt.timezone(dt.timedelta(hours=9))
NOW = dt.datetime.now(KST)
# id, 이름, 묶음, 단과대학, 홈페이지, (읽을 주소, 종류) — 종류 html=화면에서 글 링크 찾기, rss=RSS
SITES = [
 ("ai","AI학과","학과","AI대학","https://ai.gist.ac.kr/",None),
 ("ax","AX학과","학과","AI대학","https://ax.gist.ac.kr/",None),
 ("eecs","전기전자컴퓨터공학과","학과","AI대학","https://eecs.gist.ac.kr/",None),
 ("semi","반도체공학과","학과","AI대학","https://semi.gist.ac.kr/",None),
 ("aix","AI정책전략대학원","학과","AI대학","https://aix.gist.ac.kr/",("https://aix.gist.ac.kr/wp-content/plugins/kboard/rss.php","rss")),
 ("physics","물리·광과학과","학과","자연과학대학","https://physics.gist.ac.kr/",("https://physics.gist.ac.kr/feed/","rss")),
 ("chem","화학과","학과","자연과학대학","https://chem.gist.ac.kr/",None),
 ("math","수리과학과","학과","자연과학대학","https://math.gist.ac.kr/",None),
 ("mse","신소재공학과","학과","공과대학","https://mse.gist.ac.kr/",None),
 ("me","기계로봇공학과","학과","공과대학","https://me.gist.ac.kr/",None),
 ("env1","환경·에너지공학과","학과","공과대학","https://env1.gist.ac.kr/",None),
 ("life","생명과학과","학과","생명·의과학융합대학","https://life.gist.ac.kr/",None),
 ("bmse","의생명공학과","학과","생명·의과학융합대학","https://bmse.gist.ac.kr/",None),
 ("intnscphys","융합신경생리학과","학과","생명·의과학융합대학","https://intnscphys.gist.ac.kr/",None),
 ("las","인문사회과학부","교육·지원","","https://las.gist.ac.kr/",None),
 ("language","언어교육원","교육·지원","","https://language.gist.ac.kr/",("https://language.gist.ac.kr/bbs/board.php?bo_table=eec0801","html")),
 ("giai","인공지능연구소","연구소·센터","","https://giai.gist.ac.kr/giai/",None),
 ("kct","한국문화기술연구소","연구소·센터","","https://kct.gist.ac.kr/kct/",None),
 ("ieri","국제환경연구소","연구소·센터","","https://ieri.gist.ac.kr/",None),
 ("iibr","생명의과학융합연구소","연구소·센터","","https://iibr.gist.ac.kr/iibr/",None),
 ("rise","차세대에너지연구소","연구소·센터","","https://rise.gist.ac.kr/",None),
 ("apri","고등광기술연구원","연구소·센터","","https://apri.gist.ac.kr/index.php",None),
 ("gaia","중앙기기연구소","연구소·센터","","https://gaia.gist.ac.kr/",("https://gaia.gist.ac.kr/hm/board/notice/list","html")),
 ("larc","실험동물자원센터","연구소·센터","","https://larc.gist.ac.kr/",("https://larc.gist.ac.kr/main.html","html")),
 ("angels","첨단AI반도체팹센터","연구소·센터","","https://angels.gist.ac.kr/angels/",None),
 ("gti","창업혁신진흥원(GTI)","연구소·센터","","https://gti.gist.ac.kr/",None),
]
CTX = ssl.create_default_context()


def get(u):
    last = None
    for _ in range(3):
        try:
            r = urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0 (GIST homepage D-draft sync)"}), timeout=30, context=CTX)
            return r.read().decode("utf-8", "replace"), r.geturl()
        except Exception as e:
            last = e; time.sleep(2)
    raise last

VIEW=re.compile(r"view\.do|/view/|board\.php\?[^\"']*(?:wr_id|idx)=\d|mode=V&(?:amp;)?no=\d|mode=view|data-value=|nttId=|articleNo=|bbs/view",re.I)
def clean(s): return re.sub(r"\s+"," ",html.unescape(re.sub(r"<[^>]+>"," ",s))).strip()
def pdate(t):
    m=re.search(r"(20\d\d)\s*[.\-/]\s*(\d{1,2})\s*[.\-/]\s*(\d{1,2})",t) or re.search(r"(20\d\d)\s*[.\-/]\s*(\d{1,2})\s+(\d{1,2})\b",t)
    if not m: return None
    try: return dt.date(int(m.group(1)),int(m.group(2)),int(m.group(3)))
    except ValueError: return None
def pre_row(s,i,j=None):
    pre=s[max(0,i-400):i]; k=max(pre.rfind("<li"),pre.rfind("<tr"))
    if k<0: return ""
    post=s[j:j+500] if j else ""; e=min([x for x in (post.find("</tr"),post.find("</li")) if x>=0] or [0])
    return pre[k:]+" "+post[:e]
def items(s,base):
    out=[];seen=set()
    for m in re.finditer(r"<a\b([^>]*)>(.*?)</a>",s,re.S|re.I):
        h=re.search(r"href\s*=\s*['\"]([^'\"]+)['\"]",m.group(1))
        if not h or not (VIEW.search(h.group(1)) or VIEW.search(m.group(1))): continue
        inner=m.group(2)
        t=re.search(r"<(strong|h\d|p|span|div)[^>]*class=['\"][^'\"]*(?:tit|subject|title)[^'\"]*['\"][^>]*>(.*?)</\1>",inner,re.S|re.I) or re.search(r"<(strong|b|h\d)\b[^>]*>(.*?)</\1>",inner,re.S|re.I)
        title=clean(t.group(2)) if t else clean(inner)
        title=re.sub(r"^(new|NEW|N)\s+","",title).strip()
        title=re.sub(r"^20\d\d[.\-]\d{1,2}\s+\d{1,2}\s+","",title)
        if len(title)<6 or re.search(r"더보기|more|목록",title,re.I): continue
        de=re.search(r"<[^>]+class=['\"][^'\"]*(?:date|day|time|reg)[^'\"]*['\"][^>]*>(.*?)</(?:span|div|p|em|time|dd|td|li)>",inner,re.S|re.I)
        rest=clean(inner).replace(title,"")
        d=(pdate(clean(de.group(1))) if de else None) or pdate(rest) or pdate(clean(pre_row(s,m.start(),m.end())))
        u=urljoin(base,html.unescape(h.group(1))) if h.group(1)!="#" else base
        if not u.startswith("https://") and not u.startswith("http://"): continue
        if title in seen: continue
        seen.add(title); out.append({"t":title[:120],"d":d.isoformat() if d else "","u":u})
    return out


def rss(s):
    out = []
    s = re.sub(r"<!\[CDATA\[(.*?)\]\]>", lambda m: html.escape(m.group(1), quote=False), s, flags=re.S)
    for it in re.findall(r"<item>(.*?)</item>", s, re.S)[:10]:
        t = re.search(r"<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?</title>", it, re.S); l = re.search(r"<link>(.*?)</link>", it, re.S); p = re.search(r"<pubDate>(.*?)</pubDate>", it, re.S)
        if not (t and l): continue
        d = ""
        if p:
            try: d = dt.datetime.strptime(p.group(1).strip()[:25], "%a, %d %b %Y %H:%M:%S").replace(tzinfo=dt.timezone.utc).astimezone(KST).date().isoformat()
            except ValueError: pass
        out.append({"t": clean(t.group(1))[:120], "d": d, "u": clean(l.group(1))})
    return out


def main():
    try: old = {x["id"]: x for x in json.load(open(OUT, encoding="utf-8")).get("sites", [])}
    except Exception: old = {}
    res = []
    for sid, name, grp, col, home, src in SITES:
        u, kind = src or (home, "html"); rec = {"id": sid, "n": name, "g": grp, "c": col, "h": home}
        try:
            s, fu = get(u)
            I = rss(s) if kind == "rss" else items(s, fu)
            I = [x for x in I if x["u"].startswith("https://") or x["u"].startswith("http://")]
            I.sort(key=lambda x: x["d"] or "0", reverse=True)
            rec.update(ok=True, items=I[:5], latest=max([x["d"] for x in I if x["d"]] or [""]), found=len(I))
        except Exception as e:
            o = old.get(sid, {}); rec.update(ok=False, items=o.get("items", []), latest=o.get("latest", ""), err=type(e).__name__)
        res.append(rec); print(sid, rec["ok"], rec.get("found", "-"), rec["latest"], flush=True)
    try: prev = json.load(open(OUT, encoding="utf-8"))
    except Exception: prev = {}
    same = [dict(x, found=None) for x in prev.get("sites", [])] == [dict(x, found=None) for x in res]
    data = {"$description": "학과·연구소·센터 홈페이지 최근 글(제목·날짜·주소). scripts/sites_fetch.py 가 gist.yml 작업으로 1시간마다 갱신.",
            "checked": prev.get("checked") if (same and prev.get("checked")) else NOW.isoformat(timespec="minutes"),
            "tried": NOW.isoformat(timespec="minutes"), "sites": res}
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    json.dump(data, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("sites.json", sum(1 for x in res if x["ok"]), "/", len(res), "ok")


if __name__ == "__main__":
    main()
