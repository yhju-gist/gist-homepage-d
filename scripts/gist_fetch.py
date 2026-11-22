#!/usr/bin/env python3
"""현행 GIST 홈페이지(www.gist.ac.kr) 공개 게시판에서 공지·학사일정·GIST 소식 최근 목록을 읽어 data/live.json 에 저장한다.
- 공지: /kr/html/sub06/060101.html (상단 고정 글 제외, 최근 6건)
- 학사일정: /kr/html/sub05/0501.html (오늘 이후 일정 6건)
- GIST 소식: /kr/html/sub07/070103.html (최근 6건, 제목·날짜·주소만)
제목·날짜·주소만 가져온다(작성자 이름 같은 개인정보는 저장하지 않음).
가져오기가 실패한 항목은 지난번 값을 그대로 둔다(화면이 비지 않게). 표준 라이브러리만 쓴다."""
import html, json, os, re, urllib.request, datetime as dt

BASE = "https://www.gist.ac.kr"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "live.json")
KST = dt.timezone(dt.timedelta(hours=9))
NOW = dt.datetime.now(KST)
WD = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]


def get(path):
    req = urllib.request.Request(BASE + path, headers={"User-Agent": "Mozilla/5.0 (GIST homepage D-draft sync)"})
    with urllib.request.urlopen(req, timeout=25) as r:
        return r.read().decode("utf-8", "replace")


def clean(s):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", s))).strip()


def kind(t):
    if re.search(r"채용|초빙|공채", t): return "채용"
    if re.search(r"모집|신청|공모|입주", t): return "모집"
    if re.search(r"개최|강연|공연|세미나|행사|페스타|특강|설명회|콜로퀴움|Colloquium", t): return "행사"
    return "안내"


def notices():
    s = get("/kr/html/sub06/060101.html"); out = []
    for no, cls, row in re.findall(r"<tr id='BBSList(\d+)' class='([^']*)'>(.*?)</tr>", s, re.S):
        if "lstNtc" in cls: continue                       # 상단 고정 글은 빼고 최신 글만
        t = re.search(r"<td class=title>.*?<a [^>]*>(.*?)</a>", row, re.S)
        d = re.search(r"reg_date>\s*(\d{4})-(\d{2})-(\d{2})", row)
        if not (t and d): continue
        title = clean(t.group(1))
        out.append({"k": kind(title), "t": title, "d": f"{d.group(2)}.{d.group(3)}.",
                    "u": f"{BASE}/kr/html/sub06/060101.html?mode=V&no={no}"})
        if len(out) >= 6: break
    return out


def events():
    s = get("/kr/html/sub05/0501.html")
    ys = re.findall(r"fnlinkMonth\('kr', '0501', 'university', '(\d{4})', '\d{2}'\)", s)   # 달(月) 단추 12개가 가리키는 해 = 지금 보이는 해
    year = int(max(set(ys), key=ys.count)) if ys else NOW.year
    items = []
    for a, b, t in re.findall(r"<li><b>(\d{2}-\d{2})\([^)]*\)(?:\s*~\s*(\d{2}-\d{2})\([^)]*\))?</b><span>(.*?)</span></li>", s):
        m1, d1 = map(int, a.split("-")); title = clean(t)
        try: day = dt.date(year, m1, d1)
        except ValueError: continue
        end = day
        if b:
            m2, d2 = map(int, b.split("-"))
            try: end = dt.date(year + (1 if m2 < m1 else 0), m2, d2)
            except ValueError: pass
        items.append((day, end, title))
    today = NOW.date(); out, seen = [], set()
    for day, end, title in sorted(items):
        if end < today or (day, title) in seen: continue
        seen.add((day, title))
        out.append({"d": f"{day.month:02d}.{day.day:02d}", "w": WD[day.weekday()], "t": title,
                    **({"e": f"{end.month:02d}.{end.day:02d}"} if end != day else {})})
        if len(out) >= 6: break
    return out


def news():
    s = get("/kr/html/sub07/070103.html"); out, seen = [], set()
    for no, body in re.findall(r"<a href='\?mode=V&amp;no=(\d+)'>(.*?)</em>\s*</em>", s, re.S):
        if no in seen: continue
        t = re.search(r"<h2><span>(.*?)</span></h2>", body, re.S); d = re.search(r"class='bd_info'>(\d{4})-(\d{2})-(\d{2})", body)
        p = re.search(r"<p>(.*?)</p>", body, re.S)
        if not (t and d): continue
        seen.add(no)
        out.append({"t": clean(t.group(1)), "d": f"{d.group(1)}.{d.group(2)}.{d.group(3)}.", "s": clean(p.group(1))[:160] if p else "",
                    "u": f"{BASE}/kr/html/sub07/070103.html?mode=V&no={no}"})
        if len(out) >= 6: break
    return out


def en_news():
    """영문 홈페이지 News(/en/html/sub06/060202.html) 최근 6건 — 국문 소식과 같은 게시판 틀"""
    s = get("/en/html/sub06/060202.html"); out, seen = [], set()
    for no, body in re.findall(r"<a href='\?mode=V&amp;no=(\d+)'>(.*?)</em>\s*</em>", s, re.S):
        if no in seen: continue
        t = re.search(r"<h2><span>(.*?)</span></h2>", body, re.S); d = re.search(r"class='bd_info'>(\d{4})-(\d{2})-(\d{2})", body)
        if not (t and d): continue
        seen.add(no)
        out.append({"t": clean(t.group(1)), "d": f"{d.group(1)}.{d.group(2)}.{d.group(3)}.", "u": f"{BASE}/en/html/sub06/060202.html?mode=V&no={no}"})
        if len(out) >= 6: break
    return out


def main():
    try: old = json.load(open(OUT, encoding="utf-8"))
    except Exception: old = {}
    res = {"$description": "현행 GIST 홈페이지 공개 게시판의 최근 목록(제목·날짜·주소). scripts/gist_fetch.py 가 1시간마다 갱신. 화면은 이 파일이 있으면 공지·학사일정을 이것으로 바꿔 보여 줌.",
           "src": {"notices": BASE + "/kr/html/sub06/060101.html", "events": BASE + "/kr/html/sub05/0501.html", "news": BASE + "/kr/html/sub07/070103.html", "en_news": BASE + "/en/html/sub06/060202.html"}}
    ok = {}
    for k, f in (("notices", notices), ("events", events), ("news", news), ("en_news", en_news)):
        try:
            v = f(); ok[k] = bool(v)
            res[k] = v if v else old.get(k, [])
        except Exception as e:
            ok[k] = False; res[k] = old.get(k, []); print(k, "실패:", e)
    changed = any(res.get(k) != old.get(k) for k in ("notices", "events", "news", "en_news"))
    res["checked"] = NOW.isoformat(timespec="minutes") if (changed or not old.get("checked")) else old.get("checked")
    res["tried"] = NOW.isoformat(timespec="minutes")  # 마지막으로 가져와 본 때(바뀐 것이 없어도 갱신)
    res["ok"] = ok
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    json.dump(res, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("live.json", {k: len(res.get(k, [])) for k in ("notices", "events", "news")}, ok, "changed" if changed else "same")


if __name__ == "__main__":
    main()
