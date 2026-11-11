# 사용법: 저장소 맨 위 폴더에서  python src/build_local.py
# src/index_source.html 의 {{IMG:파일이름}} 을 img/파일이름 으로 바꿔 index.html(바로보기)을 만듭니다.
import re, io
s = io.open('src/index_source.html', encoding='utf-8').read()
s = re.sub(r'\{\{IMG:([^}]+)\}\}', r'img/\1', s)
io.open('index.html', 'w', encoding='utf-8').write('<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>[hidden]{display:none!important}</style></head><body>\n' + s + '\n</body></html>')
print('index.html 만들었습니다')
