# 보안 취약점 신고

이 저장소는 GIST 대표 홈페이지 통합 재구축을 위한 화면 시안(D안)입니다. 서버·로그인·개인정보 저장 기능은 없습니다.

## 신고 방법

- 취약점은 공개 이슈에 쓰지 말고 [비공개 취약점 신고](https://github.com/yhju-gist/gist-homepage-d/security/advisories/new)로 알려 주세요.
- 재현 방법, 영향 범위, 확인한 주소를 적어 주시면 확인 후 답변드립니다.

## 범위

- 대상: https://yhju-gist.github.io/gist-homepage-d/ 와 이 저장소
- 대상 아님: 현행 GIST 홈페이지(www.gist.ac.kr)와 다른 기관 시스템 — 해당 기관 창구로 신고해 주세요.
- 서비스 거부(DoS), 자동 대량 요청, 다른 이용자 정보에 접근하는 시험은 하지 말아 주세요.

## 적용한 보안 장치

- 콘텐츠 보안 정책(CSP): 화면 안 스크립트는 내용 지문(sha256)으로만 허용, 외부 라이브러리는 무결성 지문(SRI) 확인
- 리퍼러 정책, 외부 링크 noopener, 외부에서 받는 글은 글자로만 표시
- 저장소: 기본 브랜치 보호 규칙, 비밀 열쇠 감시·업로드 차단, 자동 작업은 GitHub 공식 부품을 커밋 지문으로 고정

## 자동으로 이어 받는 외부 글 (2026-11-17)
- `data/live.json`·`data/sites.json`의 제목은 화면에 넣기 전에 모두 글자로 바꿔(escape) 넣고, 주소는 `https://www.gist.ac.kr/…`(공지·일정)·`*.gist.ac.kr`(학과·연구소)만 받는다. 다른 주소의 글은 버린다.
- 가져오는 스크립트는 인증서 확인을 끄지 않는다(학교 서버 연결이 느린 곳은 30초씩 세 번까지 시도).
- 두 파일 모두 같은 저장소(같은 주소) 안 파일이라 보안 정책(CSP)은 바꾸지 않았다.

## 학교 서버로 옮길 때 (2026-11-17 시험)

GitHub Pages 는 서버 응답 안내문(보안 머리말)을 붙일 수 없어, 학교 서버에 올릴 때 넣을 설정을 `docs/server/` 에 두었습니다.

- `nginx_headers.conf`, `apache_headers.htaccess`: X-Content-Type-Options, X-Frame-Options, CSP(frame-ancestors·form-action·base-uri·object-src), Permissions-Policy, Referrer-Policy, COOP, CORP, HSTS(https 일 때만), HTML 캐시
- 같은 사이트를 시험 서버에서 켜고 끈 채 OWASP ZAP 기본 검사: 주의 8종 → 5종, 통과 60 → 63, 실패 0. 켠 뒤 화면 41개 오류·보안 정책 위반 0
- Cross-Origin-Embedder-Policy 는 켜지 않음 — credentialless 로 켜면 유튜브 영상 틀이 막힘(크롬 시험)
- 관리자 모드 입력 칸 171개에 숨은 명령 12종을 넣는 자동 시험: 실행 0. 링크 칸 3곳(띠 공지·공지 목록·팝업존)을 화면에 그릴 때도 https·사이트 안 경로만 쓰도록 고침
