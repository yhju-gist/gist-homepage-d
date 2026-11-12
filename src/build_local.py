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
        if os.path.exists(rest): full = full[:-1] + ';unicode-range:' + open(rest).read().strip() + '}'   # 전체 글꼴은 '나머지 글자'에만
        return full + small
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
    s = pre + post
# 3) 머리
D = 'GIST(광주과학기술원) 대표 홈페이지 D안 시안 — 통합검색·AI 안내 Ask GIST, 학사 길잡이 GIST Compass, 연구 연결 지도 GIST Nexus, 소식 GIST Insight를 한곳에서.'
U = 'https://yhju-gist.github.io/gist-homepage-d/'
hero = 'hxm_t.webp' if 'hxm_t' in webp else 'hxm_t.jpg'
head = ('<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
        '<title>GIST 홈페이지 D안</title><meta name="description" content="' + D + '">'
        '<meta property="og:type" content="website"><meta property="og:title" content="GIST 홈페이지 D안 (시안)"><meta property="og:description" content="' + D + '">'
        '<meta property="og:url" content="' + U + '"><meta property="og:image" content="' + U + 'docs/화면_PC_첫화면.png"><meta name="twitter:card" content="summary_large_image">'
        '<link rel="canonical" href="' + U + '"><meta name="theme-color" content="#DC2715"><link rel="icon" href="img/favicon.png" type="image/png">'
        '<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin><link rel="preload" as="font" type="font/woff2" href="fonts/pretendard-gist-sub.woff2" crossorigin><link rel="preload" as="image" href="img/' + hero + '" media="(max-width:700px)" fetchpriority="high">'
        '<style>[hidden]{display:none!important}</style></head><body>\n')
io.open('index.html', 'w', encoding='utf-8').write(head + s + '\n' + LATE + '\n</body></html>')
print('index.html 만들었습니다 (글꼴 %d개, webp %d장)' % (len(keep), len(webp)))
