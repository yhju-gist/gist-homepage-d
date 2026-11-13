# 사용법: 저장소 맨 위 폴더에서  python src/build_local.py
# src/index_source.html 의 {{IMG:파일이름}} 을 img/파일이름 으로 바꿔 index.html(바로보기)을 만듭니다.
# v181: 빨리 뜨게 하려고 (1) 화면 안에 넣어 둔 글꼴을 fonts/ 파일로 빼고 (2) img/에 같은 이름 .webp가 있으면 그것을 쓰고
#       (3) 검색 로봇·공유용 설명(meta)을 머리에 넣습니다. 원본(src/index_source.html)은 바꾸지 않습니다.
import re, io, os, base64, hashlib
s = io.open('src/index_source.html', encoding='utf-8').read()
# 1) 글꼴 빼기
os.makedirs('fonts', exist_ok=True)
keep = set()
def font(m):
    raw = base64.b64decode(m.group(1)); name = 'f_' + hashlib.md5(raw).hexdigest()[:10] + '.woff2'
    p = os.path.join('fonts', name); keep.add(name)
    if not os.path.exists(p): open(p, 'wb').write(raw)
    return 'url(fonts/' + name + ')'
s = re.sub(r'url\(data:font/woff2;base64,([A-Za-z0-9+/=]+)\)', font, s)
for f in os.listdir('fonts'):
    if f.startswith('f_') and f not in keep: os.remove(os.path.join('fonts', f))
s = re.sub(r'@font-face\{(?![^}]*font-display)', '@font-face{font-display:swap;', s)
# 1-2) 한글 글꼴: 이 홈페이지에 실제로 쓰인 글자만 담은 작은 파일을 먼저 쓰고(약 200KB), 그 밖의 글자가 나올 때만 전체 글꼴을 받습니다.
#      작은 파일은 fonts/pretendard-gist-sub.woff2, 담긴 글자 범위는 fonts/pretendard-gist-sub.range.txt (새 글자가 늘면 다시 만들면 되고, 안 만들어도 전체 글꼴로 보입니다)
if os.path.exists('fonts/pretendard-gist-sub.woff2') and os.path.exists('fonts/pretendard-gist-sub.range.txt'):
    rng = open('fonts/pretendard-gist-sub.range.txt').read().strip()
    def subf(m):
        full = m.group(0)
        small = re.sub(r'url\(fonts/f_[0-9a-f]+\.woff2\)', 'url(fonts/pretendard-gist-sub.woff2)', full)[:-1] + ';unicode-range:' + rng + '}'
        rest = 'fonts/pretendard-gist-rest.range.txt'
        if os.path.exists(rest):
            # v202: 전체 글꼴(나머지 글자용)은 CSS에 두지 않고, 화면이 다 뜬 뒤에 붙인다 — SNS 새 글의 드문 글자 하나 때문에 첫 화면에서 477KB를 받지 않도록
            global LATE_FONT
            u = re.search(r'url\((fonts/f_[0-9a-f]+\.woff2)\)', full).group(1)
            _ck = 'fonts/pretendard-gist-rest.chunks.json'
            if os.path.exists(_ck):
                # v212: 나머지 글자는 작은 조각(조각마다 글자 64자 안팎, 21KB 이하)으로 — 드문 글자 하나 때문에 477KB를 받지 않음
                import json as _j
                _cs = [[c['f'], c['r']] for c in _j.load(open(_ck))]
                LATE_FONT = ('<script>addEventListener("load",function(){setTimeout(function(){try{' + _j.dumps(_cs, separators=(',', ':')) +
                             '.forEach(function(c){document.fonts.add(new FontFace("Pretendard GIST","url(fonts/"+c[0]+") format(\\"woff2\\")",{weight:"45 920",style:"normal",display:"swap",unicodeRange:c[1]}))})}catch(e){}},2500)})</script>')
            else:
                LATE_FONT = '<script>addEventListener("load",function(){setTimeout(function(){try{document.fonts.add(new FontFace("Pretendard GIST","url(' + u + ') format(\\"woff2\\")",{weight:"45 920",style:"normal",display:"swap",unicodeRange:"' + open(rest).read().strip() + '"}))}catch(e){}},2500)})</script>'
            return small
        return full + small
    LATE_FONT = ''
    s, n = re.subn(r'@font-face\{[^}]*Pretendard GIST[^}]*\}', subf, s, count=1)
# 2) 사진: webp가 있으면 webp
webp = {f[:-5] for f in os.listdir('img') if f.endswith('.webp')}
def img(m):
    n = m.group(1); b = n.rsplit('.', 1)[0]
    return 'img/' + (b + '.webp' if b in webp and n.lower().endswith(('.jpg', '.jpeg', '.png')) else n)
s = re.sub(r'\{\{IMG:([^}"+]+)\}\}', img, s)
s = re.sub(r'\{\{IMG:([^}]+)\}\}', r'img/\1', s)   # 코드에서 이름을 이어 붙이는 자리
s = s.replace('const IMG=n=>"img/"+n+"";', 'const IMG=n=>{const W=' + repr(sorted(webp)).replace("'", '"') + ';const b=String(n).replace(/\\.(jpe?g|png)$/i,"");return "img/"+(W.indexOf(b)>=0?b+".webp":n)};')
# 2-2) 첫 화면에서 당장 안 보이는 큰 사진(둘째·셋째 넘김 사진, GIST 글자 사진)은 화면이 다 뜬 뒤에 받기
s = re.sub(r'(<span class="lt lt-[a-z]")\s*style="background-image:url\(([^)]+)\)"', r'\1 data-bg="\2"', s)
s = re.sub(r'<picture class="hxs">.*?</picture>', lambda m: m.group(0).replace('srcset=', 'data-srcset=').replace(' src=', ' data-src='), s, flags=re.S)
LATE = ('<script>addEventListener("load",function(){setTimeout(function(){document.querySelectorAll("[data-bg]").forEach(function(e){e.style.backgroundImage="url("+e.getAttribute("data-bg")+")"});'
        'document.querySelectorAll("source[data-srcset]").forEach(function(e){e.srcset=e.getAttribute("data-srcset")});document.querySelectorAll("img[data-src]").forEach(function(e){e.src=e.getAttribute("data-src")})},1200)});</script>')
# 2-2b) 문서 맨 뒤에 덧붙인 스타일(v180~)을 본문 앞으로 옮김 — 화면이 먼저 그려진 뒤 모양이 바뀌며 밀리는 일 방지(순서는 그대로)
_i = s.find('<script src=')
_j = s.find('<header')
if 0 < _j < _i:
    _tail = s[_i:]
    _blocks = re.findall(r'\n<style>/\* v\d.*?</style>', _tail, flags=re.S)
    _tail = re.sub(r'\n<style>/\* v\d.*?</style>', '', _tail, flags=re.S)
    _FW = '<script>(function(){var z=window.__fz,f=document.fonts;if(!z)return;try{Promise.all([f.load("800 32px Pretendard GIST","\\uc778\\ub958 GIST"),f.load("500 16px Inter Tight","Creating")]).then(z,z)}catch(e){z()}})();</script>\n'
    s = s[:_j] + ''.join(_blocks) + '\n' + _FW + s[_j:_i] + _tail
    print('뒤쪽 스타일 %d개를 앞으로 옮겼습니다' % len(_blocks))
# 2-3) 스크립트는 따로 파일로 빼서 화면 글·사진을 먼저 보여 준 뒤 순서대로 실행(defer)
i = s.find('<script src=')
if i > 0:
    os.makedirs('js', exist_ok=True)
    pre, post = s[:i], s[i:]
    post = re.sub(r'<script src="(https://cdn[^"]+)"></script>', r'<script defer src="\1"></script>', post)
    made = set()
    def ext(m):
        code = m.group(1); name = 'app_' + hashlib.md5(code.encode('utf-8')).hexdigest()[:10] + '.js'; made.add(name)
        io.open(os.path.join('js', name), 'w', encoding='utf-8').write(code)
        return '<script defer src="js/' + name + '"></script>'
    post = re.sub(r'<script>(.*?)</script>', ext, post, flags=re.S)
    for f in os.listdir('js'):
        if f.startswith('app_') and f not in made: os.remove(os.path.join('js', f))
    # v211: 스크립트는 첫 화면 큰 사진이 실제로 그려진 뒤에 실행(파일은 미리 받아 둠, 순서 그대로)
    import json as _json
    srcs = re.findall(r'<script defer src="([^"]+)"></script>', post)
    post = re.sub(r'<script defer src="[^"]+"></script>', '', post)
    PRELOAD_JS = ''.join('<link rel="preload" as="script" href="%s"%s>' % (u, ' crossorigin' if u.startswith('http') else '') for u in srcs)
    post += ('<script>(function(){var Q=' + _json.dumps(srcs) + ',d=0,im=document.getElementById("hxImg");'
             'function go(){if(d)return;d=1;Q.forEach(function(u){var s=document.createElement("script");s.src=u;s.async=false;if(u.indexOf("http")===0)s.crossOrigin="anonymous";document.head.appendChild(s)})}'
             'function af(){requestAnimationFrame(function(){setTimeout(go,60)})}'
             'var h=location.hash;if((h&&h!=="#home"&&h!=="#")||!im||!window.requestAnimationFrame){go();return}'
             'var ok=0;try{new PerformanceObserver(function(l){if(l.getEntries().some(function(e){return e.element===im})){af()}}).observe({type:"largest-contentful-paint",buffered:true});ok=1}catch(e){}'
             'function lf(){setTimeout(go,ok?450:80)}if(im.complete)lf();else{im.addEventListener("load",lf);im.addEventListener("error",go)}'
             'setTimeout(go,2500)})();</script>')
    s = pre + post
# 3) 머리
D = 'GIST(광주과학기술원) 대표 홈페이지 D안 시안 — 통합검색·AI 안내 지스트에 물어봐, 학사 길잡이 학사 한 장, 연구 연결 지도 연구 한 줄, 소식 지금, 지스트를 한곳에서.'
U = 'https://yhju-gist.github.io/gist-homepage-d/'
hero = 'hxm_t.webp' if 'hxm_t' in webp else 'hxm_t.jpg'
head = ('<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
        '<title>GIST 홈페이지 D안</title><meta name="description" content="' + D + '">'
        '<meta property="og:type" content="website"><meta property="og:title" content="GIST 홈페이지 D안 (시안)"><meta property="og:description" content="' + D + '">'
        '<meta property="og:url" content="' + U + '"><meta property="og:image" content="' + U + 'docs/화면_PC_첫화면.png"><meta name="twitter:card" content="summary_large_image">'
        '<link rel="canonical" href="' + U + '"><meta name="theme-color" content="#DC2715"><link rel="icon" href="img/favicon.png" type="image/png"><link rel="manifest" href="manifest.webmanifest"><link rel="alternate" type="application/rss+xml" title="지금, 지스트" href="feed.xml">'
        '<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin><link rel="preload" as="font" type="font/woff2" href="fonts/pretendard-gist-sub.woff2" crossorigin><link rel="preload" as="image" href="img/' + hero + '" media="(max-width:700px)" fetchpriority="high">'
        + '<style>[hidden]{display:none!important}html.fw .hx-copy,html.fw .hx-cr{visibility:hidden}</style></head><body>'
        '<script>(function(){var b=document.body,h=location.hash,p=true;try{p=localStorage.getItem("d_pres")!=="0"}catch(e){}if(/[?&]tools=1/.test(location.search))p=false;if(p)b.classList.add("pres");if(!h||h==="#home")b.classList.add("onhero");var r=document.documentElement,f=document.fonts;if(f&&f.load&&window.Promise){r.classList.add("fw");window.__fz=function(){r.classList.remove("fw")};setTimeout(window.__fz,1800)}})();</script>\n')
io.open('index.html', 'w', encoding='utf-8').write(head + s + '\n' + LATE + '\n' + globals().get('LATE_FONT','') + '\n</body></html>')
print('index.html 만들었습니다 (글꼴 %d개, webp %d장)' % (len(keep), len(webp)))

# 4-2) v196 10년 기준 부속 파일: 소식 구독(feed.xml), 디자인 값(tokens.json), 앱 정보(manifest), 없는 주소 안내(404.html)
try:
    import json as _j, html as _h, re as _r
    SRC = io.open('src/index_source.html', encoding='utf-8').read()
    U0 = 'https://yhju-gist.github.io/gist-homepage-d/'
    def _js(v): return _j.loads('"' + v + '"')
    def _sid(t, d, g):
        m = _r.search(r'[?&]no=(\d+)', g or '')
        if m: return m.group(1)
        h = 0
        for ch in t:
            c = ord(ch)
            if c > 0xFFFF: c = 0xD800 + ((c - 0x10000) >> 10)
            h = (h * 31 + c) & 0xFFFFFFFF
        digs = '0123456789abcdefghijklmnopqrstuvwxyz'; o = ''
        while True:
            o = digs[h % 36] + o; h //= 36
            if h == 0: break
        return _r.sub(r'\D', '', d)[:8] + '-' + o[:4]
    a = SRC.find('const STORIES=['); z = SRC.find('\n];', a)
    items = []; FULL = []
    for ln in SRC[a:z].split('\n'):
        if not ln.lstrip().startswith('{c:"'): continue
        f = lambda k: (_r.search(r'[{,]' + k + r':"((?:[^"\\]|\\.)*)"', ln) or [None, ''])[1]
        t, d, c, g, m = _js(f('t')), _js(f('d')), _js(f('c')), _js(f('g')), _js(f('m'))
        sm = _r.search(r'sum:\["((?:[^"\\]|\\.)*)"', ln)
        sa = _r.search(r'sum:\[(.*?)\]\s*[,}]', ln)
        sums = [_js(x) for x in _r.findall(r'"((?:[^"\\\\]|\\\\.)*)"', sa.group(1))] if sa else []
        FULL.append({'id': _sid(t, d or m, g), 'title': t, 'date': d or m, 'category': c, 'byline': _js(f('s')), 'summary': sums, 'source': _js(f('src')), 'source_url': _js(f('u')), 'gist_url': g})
        items.append((t, d or m, c, _sid(t, d or m, g), _js(sm.group(1)) if sm else ''))
    def _rfc(d):
        n = _r.sub(r'\D', '', d)
        if len(n) < 8: return ''
        import datetime as _d
        try: return _d.datetime(int(n[:4]), int(n[4:6]), int(n[6:8]), 9, 0).strftime('%a, %d %b %Y %H:%M:%S +0900')
        except Exception: return ''
    feed = ['<?xml version="1.0" encoding="UTF-8"?>', '<rss version="2.0"><channel><title>지금, 지스트 (D안 시안)</title><link>' + U0 + '#story</link><description>GIST 소식 — 보도자료·연구성과·사람·캠퍼스</description><language>ko</language>']
    for t, d, c, sid, sm in items[:40]:
        pd = _rfc(d)
        feed.append('<item><title>%s</title><link>%s#news/%s</link><guid isPermaLink="true">%s#news/%s</guid><category>%s</category>%s%s</item>' % (_h.escape(t), U0, sid, U0, sid, _h.escape(c), ('<pubDate>%s</pubDate>' % pd) if pd else '', ('<description>%s</description>' % _h.escape(sm)) if sm else ''))
    feed.append('</channel></rss>')
    io.open('feed.xml', 'w', encoding='utf-8').write('\n'.join(feed) + '\n')
    tok = {}
    for rt in _r.finditer(r':root\s*\{([^}]*)\}', SRC):
        if 'swiper' in rt.group(1): continue
        for k, v in _r.findall(r'--([a-zA-Z0-9-]+)\s*:\s*([^;}]+)', rt.group(1)):
            v = v.strip(); typ = 'color' if _r.match(r'^(#|rgb|hsl)', v) else ('dimension' if _r.match(r'^-?[\d.]+(px|rem|em|%)$', v) else ('fontFamily' if k.startswith('f-') else 'other'))
            tok[k] = {'$value': v, '$type': typ}
    io.open('tokens.json', 'w', encoding='utf-8').write(_j.dumps({'$description': 'GIST 홈페이지 D안 디자인 값(색·글꼴·간격). src/index_source.html 의 :root 에서 자동으로 뽑습니다. 어떤 제작 도구(CMS)로 옮겨도 이 파일만 읽으면 같은 모양이 됩니다.', 'gist': tok}, ensure_ascii=False, indent=1) + '\n')
    io.open('manifest.webmanifest', 'w', encoding='utf-8').write(_j.dumps({'name': 'GIST 광주과학기술원 (D안 시안)', 'short_name': 'GIST', 'lang': 'ko', 'start_url': './', 'display': 'standalone', 'background_color': '#FFFFFF', 'theme_color': '#DC2715', 'icons': [{'src': 'img/favicon.png', 'sizes': '192x192', 'type': 'image/png'}]}, ensure_ascii=False, indent=1) + '\n')
    io.open('404.html', 'w', encoding='utf-8').write('<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>찾는 화면이 없습니다 | GIST</title><meta name="robots" content="noindex"><link rel="icon" href="' + U0 + 'img/favicon.png"><style>body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:system-ui,-apple-system,"Malgun Gothic",sans-serif;background:#111418;color:#fff;text-align:center;padding:24px}b{display:block;font-size:clamp(64px,18vw,140px);line-height:1;color:#DC2715;letter-spacing:-.04em}h1{font-size:clamp(20px,5vw,30px);margin:18px 0 8px}p{color:#B9C0C6;margin:0 0 26px;line-height:1.7}a{display:inline-block;margin:4px;padding:13px 22px;border-radius:999px;background:#fff;color:#111418;font-weight:800;text-decoration:none}a+a{background:transparent;color:#fff;border:1px solid #5A636B}</style></head><body><main><b>404</b><h1>찾는 화면이 없습니다</h1><p>주소가 바뀌었거나 잘못 입력되었습니다.<br>첫 화면이나 통합검색에서 다시 찾아 주세요.</p><a href="' + U0 + '">GIST 첫 화면</a><a href="' + U0 + '#search">통합검색</a></main></body></html>\n')
    # 4-3) v198 소식 글마다 주소가 따로 있는 가벼운 글 화면(news/글번호.html)과, 내용만 담은 파일(data/content.json)
    os.makedirs('news', exist_ok=True); os.makedirs('data', exist_ok=True); NEWS_URLS = []
    for x in FULL:
        n = _r.sub(r'\D', '', x['date']); iso = (n[:4] + '-' + n[4:6] + '-' + n[6:8]) if len(n) >= 8 else ''
        desc = (x['summary'][0] if x['summary'] else x['byline'])[:150]
        ld = {'@context': 'https://schema.org', '@type': 'NewsArticle', 'headline': x['title'], 'articleSection': x['category'], 'url': U0 + 'news/' + x['id'] + '.html', 'publisher': {'@type': 'CollegeOrUniversity', 'name': '광주과학기술원'}}
        if iso: ld['datePublished'] = iso
        body = ''.join('<p>%s</p>' % _h.escape(s_) for s_ in x['summary'])
        links = ''.join('<a href="%s" rel="noopener">%s</a>' % (_h.escape(u_), _h.escape(l_)) for u_, l_ in ((x['gist_url'], 'GIST 원문'), (x['source_url'], x['source'] or '언론 원문')) if u_)
        page = ('<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>%s | 지금, 지스트</title><meta name="description" content="%s">'
                '<link rel="canonical" href="%snews/%s.html"><meta property="og:type" content="article"><meta property="og:title" content="%s"><meta property="og:description" content="%s"><meta property="og:image" content="%sdocs/화면_PC_첫화면.png"><link rel="icon" href="../img/favicon.png">'
                '<script type="application/ld+json">%s</script>'
                '<style>body{margin:0;font-family:system-ui,-apple-system,"Malgun Gothic",sans-serif;color:#111418;line-height:1.8}header{background:#111418;color:#fff;padding:18px 22px}header a{color:#fff;font-weight:900;text-decoration:none;letter-spacing:-.02em}main{max-width:760px;margin:0 auto;padding:36px 22px 80px}small{color:#C11D0E;font-weight:800}h1{font-size:clamp(24px,5vw,36px);line-height:1.35;letter-spacing:-.03em;margin:8px 0 6px}.by{color:#5A636B;margin:0 0 22px}p{font-size:17px}nav{display:flex;flex-wrap:wrap;gap:8px;margin-top:28px}nav a{padding:11px 18px;border-radius:999px;border:1px solid #E1E4E7;color:#111418;text-decoration:none;font-weight:700}nav a.go{background:#DC2715;border-color:#DC2715;color:#fff}</style></head>'
                '<body><header><a href="../">GIST 광주과학기술원</a></header><main><small>%s · %s</small><h1>%s</h1><p class="by">%s</p>%s<nav><a class="go" href="../#news/%s">사진·관련 연구실과 함께 보기</a>%s<a href="../#story">지금, 지스트 전체</a></nav></main></body></html>\n') % (
                _h.escape(x['title']), _h.escape(desc), U0, x['id'], _h.escape(x['title']), _h.escape(desc), U0, _j.dumps(ld, ensure_ascii=False), _h.escape(x['category']), _h.escape(x['date']), _h.escape(x['title']), _h.escape(x['byline']), body, x['id'], links)
        io.open('news/%s.html' % x['id'], 'w', encoding='utf-8').write(page); NEWS_URLS.append(U0 + 'news/%s.html' % x['id'])
    ps = _r.search(r'const PSLUG=(\{[^}]*\})', SRC)
    pages = [{'name': k, 'address': '#p/' + v} for k, v in _j.loads(ps.group(1)).items()] if ps else []
    try: depts = _j.load(io.open('src/dept.json', encoding='utf-8'))
    except Exception: depts = []
    io.open('data/content.json', 'w', encoding='utf-8').write(_j.dumps({'$description': 'GIST 홈페이지 D안의 내용만 모은 파일입니다(모양 없음). 어떤 제작 도구(CMS)로 옮기더라도 이 파일에서 소식·화면 이름·학과 정보를 그대로 읽어 갈 수 있습니다. src/index_source.html 과 src/dept.json 에서 자동으로 만듭니다.', 'stories': FULL, 'pages': pages, 'departments': depts}, ensure_ascii=False, indent=1) + '\n')
    print('news/ 글 화면 %d개, data/content.json 만들었습니다' % len(FULL))
    print('feed.xml %d건, tokens.json %d개, manifest, 404.html 만들었습니다' % (min(40, len(items)), len(tok)))
except Exception as e:
    print('부속 파일 건너뜀:', e)
# 5) 검색에 잘 잡히게(이사회 지적 2 ‘노출’): 학과 14곳을 주소가 따로 있는 가벼운 글 화면으로도 만들고 sitemap.xml·robots.txt를 둡니다.
#    (본 화면은 주소 끝 #d-코드 방식이라 검색 로봇이 학과별로 따로 읽지 못합니다. 구축 때는 서버가 화면마다 주소를 줍니다.)
import json, html, datetime
try:
    DEP = json.load(io.open('src/dept.json', encoding='utf-8'))
    os.makedirs('dept', exist_ok=True)
    e = html.escape; today = datetime.date.today().isoformat(); urls = [U]
    for name, d in DEP.items():
        code = d.get('code'); 
        if not code: continue
        intro = ' '.join(d.get('intro') or []) ; desc = (intro or name + ' 소개')[:150]
        areas = ''.join('<section><h3>%s%s</h3>%s%s</section>' % (e(a[0]), (' <small>%s</small>' % e(a[1])) if len(a) > 1 and a[1] else '', ('<p>%s</p>' % e(a[2])) if len(a) > 2 and a[2] else '', ('<ul>%s</ul>' % ''.join('<li>%s</li>' % e(x) for x in a[3])) if len(a) > 3 and a[3] else '') for a in (d.get('areas') or []))
        pts = ''.join('<li>%s</li>' % e(x) for x in (d.get('pts') or []))
        ld = json.dumps({"@context": "https://schema.org", "@type": "EducationalOrganization", "name": "GIST " + name, "alternateName": d.get('e', ''), "url": d.get('hp', ''), "email": d.get('mail', ''), "telephone": d.get('tel', ''), "parentOrganization": {"@type": "CollegeOrUniversity", "name": "광주과학기술원 (GIST)", "url": "https://www.gist.ac.kr/"}}, ensure_ascii=False)
        page = ('<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>%s | GIST 홈페이지 D안</title><meta name="description" content="%s">'
                '<link rel="canonical" href="%sdept/%s.html"><meta property="og:title" content="GIST %s"><meta property="og:description" content="%s"><meta property="og:image" content="%sdocs/화면_PC_첫화면.png"><link rel="icon" href="../img/favicon.png">'
                '<script type="application/ld+json">%s</script>'
                '<style>body{margin:0;font-family:system-ui,-apple-system,"Malgun Gothic",sans-serif;color:#111418;line-height:1.8;background:#F4F5F6}header{background:#111418;color:#fff;padding:28px 20px}header a{color:#fff;text-decoration:none;font-weight:800}main{max-width:820px;margin:0 auto;padding:28px 20px 60px}h1{font-size:34px;margin:8px 0 4px;letter-spacing:-.03em}h1 small{display:block;font-size:15px;font-weight:600;color:#5A636B}h2{font-size:21px;margin:34px 0 10px}section{background:#fff;border:1px solid #E1E4E7;border-radius:16px;padding:16px 20px;margin:10px 0}h3{margin:0 0 4px;font-size:17px}h3 small{font-weight:600;color:#C11D0E;font-size:13px}ul{margin:6px 0;padding-left:20px}.go{display:inline-block;margin:18px 8px 0 0;background:#DC2715;color:#fff;border-radius:999px;padding:13px 22px;font-weight:800;text-decoration:none}.go.g{background:#111418}footer{color:#5A636B;font-size:13px;margin-top:30px}</style></head><body>'
                '<header><a href="../">GIST 홈페이지 D안 (시안)</a></header><main><p style="margin:0;color:#C11D0E;font-weight:800">대학·학과</p><h1>%s<small>%s</small></h1>'
                '<a class="go" href="../#d-%s">이 학과 화면 열기 (연구실·소식·신청까지)</a><a class="go g" href="%s">학과 홈페이지</a>'
                '%s%s%s<h2>학과 사무실</h2><section><p>전화 %s%s · 이메일 %s</p></section>'
                '<footer>학과 소개·연구 분야·연락처는 현행 GIST 홈페이지 ‘대학·학과’ 원문을 옮겼습니다(2026.11.11. 확인). 이 화면은 검색에 학과가 따로 잡히도록 만든 글 화면이고, 본 화면은 위 빨간 단추로 엽니다.</footer></main></body></html>') % (
                e(name), e(desc), U, code, e(name), e(desc), U, ld, e(name), e(d.get('e', '')), code, e(d.get('hp', '')),
                ('<h2>학과 소개</h2><section><p>%s</p></section>' % e(intro)) if intro else '', ('<h2>특징</h2><section><ul>%s</ul></section>' % pts) if pts else '', ('<h2>연구 분야</h2>' + areas) if areas else '',
                e(d.get('tel', '')), (' · 팩스 ' + e(d['fax'])) if d.get('fax') else '', e(d.get('mail', '')))
        io.open('dept/%s.html' % code, 'w', encoding='utf-8').write(page); urls.append(U + 'dept/%s.html' % code)
    try: urls += NEWS_URLS
    except Exception: pass
    io.open('sitemap.xml', 'w', encoding='utf-8').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join('<url><loc>%s</loc><lastmod>%s</lastmod></url>\n' % (u, today) for u in urls) + '</urlset>\n')
    io.open('robots.txt', 'w', encoding='utf-8').write('User-agent: *\nAllow: /\nSitemap: ' + U + 'sitemap.xml\n')
    print('학과 글 화면 %d개, sitemap.xml, robots.txt 만들었습니다' % (len(urls) - 1))
except Exception as ex:
    print('학과 글 화면은 건너뜀:', ex)
