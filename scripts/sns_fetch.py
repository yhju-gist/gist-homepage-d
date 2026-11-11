#!/usr/bin/env python3
"""GIST 공식 SNS 최근 글을 공식 경로로 가져와 data/sns.json에 저장한다.
- 유튜브: 채널 공개 RSS(열쇠 필요 없음)
- 인스타그램: Instagram Graph API (GitHub 저장소 Secrets: IG_TOKEN, IG_USER_ID 가 있을 때만)
- 페이스북: Graph API 페이지 글 (Secrets: FB_TOKEN, FB_PAGE_ID 가 있을 때만)
가져오는 것: 제목/설명 첫 줄·썸네일·주소·날짜만. 댓글·팔로워 같은 개인정보는 가져오지 않는다.
실패하면 마지막으로 저장한 글을 그대로 둔다(화면이 비지 않게)."""
import json, os, urllib.request, urllib.parse, xml.etree.ElementTree as ET, datetime as dt
OUT = os.path.join(os.path.dirname(__file__), "..", "data", "sns.json")
YT_CH = "UCofabptftrET0tfdSQgnr_A"  # GIST 공식 유튜브(youtube.com/c/GIST_YOUTUBE)
KST = dt.timezone(dt.timedelta(hours=9))
def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (GIST homepage SNS sync)"})
    with urllib.request.urlopen(req, timeout=25) as r:
        return r.read()
def kd(s):
    try: return dt.datetime.fromisoformat(s.replace("Z", "+00:00")).astimezone(KST)
    except Exception: return None
def yt():
    ns = {"a": "http://www.w3.org/2005/Atom", "yt": "http://www.youtube.com/xml/schemas/2015", "m": "http://search.yahoo.com/mrss/"}
    last = None
    for u in ["https://www.youtube.com/feeds/videos.xml?channel_id=" + YT_CH, "https://www.youtube.com/feeds/videos.xml?playlist_id=UU" + YT_CH[2:]]:
        try:
            root = ET.fromstring(get(u)); out = []
            for e in root.findall("a:entry", ns)[:12]:
                vid = e.findtext("yt:videoId", "", ns); t = e.findtext("a:title", "", ns); d = kd(e.findtext("a:published", "", ns))
                out.append({"p": "yt", "id": vid, "t": t, "u": "https://www.youtube.com/watch?v=" + vid, "img": "https://i.ytimg.com/vi/%s/hqdefault.jpg" % vid, "at": d.isoformat() if d else ""})
            if out: return out
        except Exception as ex: last = ex
    raise RuntimeError(str(last))
def ig():
    tok, uid = os.environ.get("IG_TOKEN"), os.environ.get("IG_USER_ID")
    if not tok or not uid: return None
    q = urllib.parse.urlencode({"fields": "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp", "limit": 12, "access_token": tok})
    js = json.loads(get("https://graph.facebook.com/v21.0/%s/media?%s" % (uid, q)))
    out = []
    for m in js.get("data", []):
        cap = (m.get("caption") or "").strip().split("\n")[0][:120]; d = kd(m.get("timestamp", ""))
        out.append({"p": "ig", "id": m["id"], "t": cap or "GIST 인스타그램", "u": m.get("permalink", ""), "img": m.get("thumbnail_url") or (m.get("media_url") if m.get("media_type") != "VIDEO" else ""), "at": d.isoformat() if d else ""})
    return out
def fb():
    tok, pid = os.environ.get("FB_TOKEN"), os.environ.get("FB_PAGE_ID")
    if not tok or not pid: return None
    q = urllib.parse.urlencode({"fields": "id,message,permalink_url,created_time,full_picture", "limit": 10, "access_token": tok})
    js = json.loads(get("https://graph.facebook.com/v21.0/%s/posts?%s" % (pid, q)))
    out = []
    for m in js.get("data", []):
        msg = (m.get("message") or "").strip().split("\n")[0][:120]; d = kd(m.get("created_time", "").replace("+0000", "+00:00"))
        out.append({"p": "fb", "id": m["id"], "t": msg or "GIST 페이스북", "u": m.get("permalink_url", ""), "img": m.get("full_picture", ""), "at": d.isoformat() if d else ""})
    return out
def main():
    try: old = json.load(open(OUT, encoding="utf-8"))
    except Exception: old = {"items": [], "src": {}}
    now = dt.datetime.now(KST).isoformat(timespec="minutes")
    keep = {p: [x for x in old.get("items", []) if x.get("p") == p] for p in ("yt", "ig", "fb")}
    src = old.get("src", {})
    for p, fn in (("yt", yt), ("ig", ig), ("fb", fb)):
        try:
            r = fn()
            if r is None: src[p] = {"ok": False, "why": "열쇠(토큰) 미설정", "at": src.get(p, {}).get("at", "")}; continue
            if r: keep[p] = r; src[p] = {"ok": True, "at": now, "n": len(r)}
        except Exception as ex:
            src[p] = {"ok": False, "why": "가져오기 실패: " + str(ex)[:80], "at": src.get(p, {}).get("at", "")}
    items = sorted(keep["yt"] + keep["ig"] + keep["fb"], key=lambda x: x.get("at", ""), reverse=True)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    json.dump({"checked": now, "src": src, "items": items}, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(json.dumps(src, ensure_ascii=False))
if __name__ == "__main__": main()
