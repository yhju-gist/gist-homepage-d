
(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- 데이터 ---------- */
const DURL={"전기전자컴퓨터공학과":"eecs","AI학과":"ai","AX학과":"ax","반도체공학과":"semi","AI정책전략대학원":"aix","물리·광과학과":"physics","화학과":"chem","수리과학과":"math","신소재공학과":"mse","기계로봇공학과":"me","환경·에너지공학과":"env1","생명과학과":"life","의생명공학과":"bmse","융합신경생리학과":"intnscphys"};
const dhref=d=>DURL[d]?'https://'+DURL[d]+'.gist.ac.kr/':'#colleges';
const EXT=' target="_blank" rel="noopener noreferrer"';
const COLLEGES=[
 {n:"AI대학",e:"College of AI",i:"AI·컴퓨팅·반도체와 AI 정책을 함께 배우는 대학",d:["AI학과","AX학과","전기전자컴퓨터공학과","반도체공학과","AI정책전략대학원"]},
 {n:"자연과학대학",e:"College of Natural Sciences",i:"물리·광과학, 화학, 수리과학의 기초를 다지는 대학",d:["물리·광과학과","화학과","수리과학과"]},
 {n:"공과대학",e:"College of Engineering",i:"소재·기계로봇·환경에너지로 산업 문제를 푸는 대학",d:["신소재공학과","기계로봇공학과","환경·에너지공학과"]},
 {n:"생명·의과학융합대학",e:"College of Life & Medical Sciences",i:"생명과학과 의생명공학, 신경생리를 잇는 대학",d:["생명과학과","의생명공학과","융합신경생리학과"]}
];
const NEED={
 ug:["대학 입학 전형","학과 둘러보기","장학 제도","생활관","캠퍼스 투어"],
 gr:["대학원 입학 전형","연구실 찾기","학과 홈페이지","장학·등록금","외국인 지원"],
 pa:["학과 둘러보기","장학 제도","생활관","학사일정","상담센터"],
 st:["학사일정","증명서 발급","수강신청","장학","상담센터"],
 fa:["학사 한 장","규정","포털·ZEUS","업무별 담당부서","오룡관 예약"],
 co:["공동연구 문의","기술이전","사람·업무 찾기","창업 지원","발전기금"]
};
const WHO={ug:"예비 학부생",gr:"대학원 지원자",pa:"학부모",st:"재학생",fa:"교직원",co:"기업·연구자"};
const STORIES=[
 {c:"연구성과",t:"GIST-성균관대, 심근경색 손상 심장에 약물 직접 전달하는 ‘붙이는 주사형 하이드로젤’ 개발",s:"의생명공학과 류동렬 교수 · 성균관대 공동연구",m:"2026-11",d:"2026.11.10.",cr:"그림 © GIST",body:"심근경색 하이드로젤 아이엔젤 iANgel 약물 전달",g:"https://www.gist.ac.kr/kr/html/sub07/070102.html?mode=V&no=224635",src:"뉴스핌",u:"https://www.newspim.com/news/view/20261110000071",sum:["주사형 하이드로젤 ‘아이엔젤’로 약물(NR)을 손상된 심장에 직접 전달해, 생쥐 실험에서 심장 기능이 회복되고 효과가 28일 이어지는 것을 확인했습니다.", "약효가 나는 원리(SIRT1)도 밝혔으며, 다음 단계로 대동물 실험을 추진합니다."]},
 {c:"연구성과",t:"“센서 하나로 빛 정보 초정밀 복원” 다차원 분광 입력·복원 기술 개발",s:"반도체공학과 윤훈한 교수 · GIST·DGIST·경북대 공동연구",m:"2026-11",d:"2026.11.04.",cr:"그림 © GIST",body:"분광기 광검출기 스마트폰 드론 자율주행",src:"전남일보",u:"https://www.jnilbo.com/news/articleView.html?idxno=90000079398",sum:["반도체공학과 윤훈한 교수 연구팀이 DGIST 에너지공학과 이종수 교수, 경북대 전자공학부 나현수 교수 연구팀과 함께 센서 하나로 여러 파장이 섞인 빛을 정밀하게 분석하는 기술을 개발했습니다.", "분광 복원 오차를 95.6% 줄였습니다."]},
 {c:"연구성과",t:"“양자컴퓨터 실용화의 열쇠, 소재·공정에서 찾다” 초전도 양자컴퓨터 핵심 소자 발전 방향 제시",s:"반도체공학과 윤훈한 교수 · 고려대·UC 버클리 등",m:"2026-11",d:"2026.11.03.",cr:"그림 © GIST",body:"양자컴퓨터 조셉슨 접합 큐비트",src:"뉴스핌",u:"https://www.newspim.com/news/view/20261103000310",sum:["고려대·UC버클리와 함께 초전도 양자컴퓨터의 핵심 소자인 조셉슨 접합의 소재·제조 기술을 종합 분석해, 균일성 등 실용화를 위한 5대 과제를 제시했습니다.", "연구 결과는 Advanced Science에 10월 28일 온라인 게재됐습니다."]},
 {c:"연구성과",t:"“신경을 다쳤을 뿐인데 통증은 왜 오래갈까?” 만성 통증 키우는 단백질 찾았다",s:"의생명공학과 정의헌 교수",m:"2026-11",d:"2026.11.02.",cr:"그림 © GIST",body:"만성 통증 IGFBPL1 신경병증",g:"https://www.gist.ac.kr/kr/html/sub07/070102.html?mode=V&no=224519",src:"뉴스핌",u:"https://www.newspim.com/news/view/20261102000023",sum:["신경이 다친 뒤 IGFBPL1 단백질이 늘어나 7일째 가장 많아지고, IGF1R·ERK·TRPV1 경로를 거쳐 통증을 키운다는 것을 밝혔습니다.", "이 단백질을 siRNA로 억제하자 6주 동안 통증이 줄어, 새 치료 표적을 제시했습니다."]},
 {c:"사람",t:"GIST, 풍력 연구 분야 국내 최초 ‘호라이즌 유럽’ 과제 선정",s:"기계로봇공학과 김태성 교수 연구팀",m:"2026-11",d:"2026.11.10.",cr:"자료 © GIST",body:"호라이즌 유럽 풍력 EU",g:"https://www.gist.ac.kr/kr/html/sub07/070103.html?mode=V&no=224617",src:"베타뉴스",u:"https://www.betanews.net/article/view/beta202611100105",sum:["기계로봇공학과 김태성 교수(차세대에너지연구소 풍력연구센터장) 연구팀이 EU의 세계 최대 연구혁신 프로그램 ‘호라이즌 유럽’ 풍력 분야 과제에 국내 처음으로 선정됐습니다.", "혹한기에 풍력발전기가 얼어붙는 문제를 푸는 과제로, 보도에 따르면 평가 15점 만점, 규모 78억 원입니다."]},
 {c:"연구성과",t:"“태양광·배터리, 과부하 없이 더 유연하게” 전력망 출력 조정 여력 계산 기술 개발",s:"전기전자컴퓨터공학과 김윤수 교수",m:"2026-10",d:"2026.10.30.",cr:"그림 © GIST",body:"태양광 ESS 분산에너지 전력망",src:"베리타스알파",u:"https://www.veritas-a.com/news/articleView.html?idxno=634289",sum:["태양광·에너지저장장치(ESS) 같은 분산에너지자원의 출력을 조정할 때 전력망이 감당할 수 있는 여력을 계산하는 기술입니다.", "제주 실제 전력망에서 3.72초 만에 계산해 입증했고, 전압 이상·선로 과부하 발생률을 6.7%에서 0%로 낮췄습니다."]},
 {c:"연구성과",t:"“학습하지 않은 약물도 반응 예측” 신약 후보물질 선별 돕는 AI 개발",s:"AI학과 이현주 교수",m:"2026-10",d:"2026.10.19.",cr:"자료 © GIST",body:"신약 AI 암세포 InFo-DRP",src:"인공지능신문",u:"https://www.aitimes.kr/news/articleView.html?idxno=42336",sum:["약물의 화학구조와 암세포 유전자 정보를 함께 분석해, 새로운 약물에 대한 암세포 반응을 예측하는 AI 모델 ‘인포-디알피(InFo-DRP)’를 개발했습니다.", "학습하지 않은 신약 후보물질이나 구조가 낯선 약물에서도 예측 성능을 높였습니다."]},
 {c:"사람",t:"GIST 환경에너지공학과, ‘AI+X’ 융합인재 5인 국내외 대학 교수로 잇따라 임용",s:"환경·에너지공학과",m:"2026-10",d:"2026.10.06.",cr:"자료 © GIST",body:"환경에너지공학과 교수 임용 AI+X",src:"AI포스트",u:"https://www.aipostkorea.com/news/articleView.html?idxno=12865",sum:["환경·에너지공학과의 인공지능(AI) 융합 연구·교육을 바탕으로 박사 졸업생들이 최근 1년 사이 국내·외 대학 교수로 잇따라 임용됐다는 소식입니다."]},
 {c:"사람",t:"GIST 성유경 학생, 이산화탄소 잡는 흡착제 오래 쓰는 원리 밝혀… 국제학회 우수상",s:"환경·에너지공학과",m:"2026-10",d:"2026.10.15.",cr:"자료 © GIST",body:"이산화탄소 흡착제 국제학회 수상",g:"https://www.gist.ac.kr/kr/html/sub07/070104.html?mode=V&no=224126",src:"GIST 미디어센터",u:"https://www.gist.ac.kr/kr/html/sub07/070104.html?mode=V&no=224126",sum:["환경·에너지공학과 탄소에너지시스템 연구실(CnESL, 지도교수 박영준)의 성유경 석박통합과정생이 제13회 한-일 분리기술학회(ICSST26)에서 우수 구두발표상을 받았습니다."]},
 {c:"보도자료",t:"[아시아경제] “반도체·이차전지 기술 고도화”… GIST, 첨단분석과학 심포지엄",s:"In The Media",m:"2026-11",d:"2026.11.05.",cr:"자료 © GIST",body:"반도체 이차전지 첨단분석과학 심포지엄 언론",src:"아시아경제",u:"https://view.asiae.co.kr/article/2026110516460288165",sum:["반도체·이차전지·바이오 등 첨단 전략기술 분야의 연구 경쟁력을 높이기 위한 GIST 첨단분석과학 심포지엄 소식입니다."]},
 {c:"보도자료",t:"[연합뉴스] 기아, 전남광주서 PBV 모빌리티 생태계 조성 (GIST-광주특별시-기아-전남대 MOU)",s:"In The Media",m:"2026-11",d:"2026.11.06.",cr:"자료 © GIST",body:"기아 PBV 모빌리티 MOU 언론",src:"연합뉴스",u:"https://www.yna.co.kr/view/AKR20261106070251003",sum:["기아가 6일 오토랜드 광주에서 전남광주통합특별시·전남대·GIST와 업무협약을 맺고, 전남광주를 중심으로 PBV(목적기반차량) 산업 생태계를 만든다는 보도입니다."]},
 {c:"영상",t:"자율주행 AI가 사람을 도로로 착각한다고? AI 허점 찾아내는 신기술 ‘LSAA’",s:"공식 유튜브 · AI학과 김승준 교수 연구팀",m:"2026-10",d:"2026.10.21.",cr:"영상 © GIST",body:"자율주행 AI LSAA 영상 IROS",src:"GIST 공식 유튜브",u:"https://www.youtube.com/watch?v=dz2TRiqef2k"},
 {c:"사람",t:"GIST 박원영 연구교수, 국제학술대회 우수 포스터상 수상",s:"의생명공학과 박원영 연구교수",m:"2026-11",d:"2026.11.04.",cr:"사진 © GIST · 자료 사진",src:"메디포뉴스",u:"https://www.medifonews.com/news/article.html?no=218420",sum:["의생명공학과 박원영 연구교수가 11월 1~4일 호주 시드니 국제컨벤션센터(ICC Sydney)에서 열린 ‘ESA–SRB–NZSE 2026 연례학술대회’에서 우수 포스터상을 받았습니다."],body:"박원영 연구교수 포스터상 시드니 ESA SRB NZSE 학술대회 수상"},
 {c:"보도자료",t:"[전자신문] 아이빔테크놀로지, 최진욱 GIST 교수 연구팀에 생체현미경 공급",s:"언론 보도 · 생명과학과",m:"2026-11",d:"2026.11.10.",cr:"사진 © GIST · 자료 사진",src:"전자신문",u:"https://www.etnews.com/20261110000365",sum:["생체이미징 기업 아이빔테크놀로지가 생명과학과 최진욱 교수 연구팀과 4억6000만원 규모의 생체현미경 ‘IVM-CMS3’ 공급 계약을 맺었다는 보도입니다."],body:"생체현미경 IVM-CMS3 아이빔테크놀로지 생명과학과 최진욱 언론"},
 {c:"보도자료",t:"[간호사신문] 항암제가 듣지 않는 폐암, 원인은 무엇일까…국내 연구진 단서 찾아",s:"언론 보도 · 화순전남대병원·GIST 공동연구",m:"2026-11",d:"2026.11.10.",cr:"사진 © GIST · 자료 사진",src:"간호사신문",u:"https://www.nursenews.co.kr/news/articleView.html?idxno=46438",sum:["화순전남대병원과 GIST 공동연구팀이 폐 편평상피세포암 환자 조직으로 오가노이드를 만들고, 항암제를 넣은 뒤 암세포가 어떻게 바뀌는지 관찰했다는 보도입니다."],body:"폐암 오가노이드 폐 편평상피세포암 항암제 내성 화순전남대병원 공동연구 언론"},
 {c:"연구성과",t:"출처까지 알려 주는 역사 AI ‘AI 윤태호’ 개발… 5·18 체험 콘텐츠로 공개",s:"한국문화기술연구소 김혜선 책임연구원 연구팀",m:"2026-10",d:"2026.10.27.",cr:"그림 © GIST",src:"뉴스핌",u:"https://www.newspim.com/news/view/20261027000191",sum:["한국문화기술연구소 김혜선 책임연구원 연구팀이 역사자료를 바탕으로 질문에 답하고, 답의 근거가 된 자료의 출처를 함께 보여 주는 대화시스템 ‘AI 윤태호’를 개발했습니다.","11월 민주주의역사누리터에 설치될 예정입니다."],body:"AI 윤태호 역사 AI 대화시스템 출처 5·18 민주주의역사누리터 한국문화기술연구소",g:"https://www.gist.ac.kr/kr/html/sub07/070102.html?mode=V&no=224433"},
 {c:"보도자료",t:"[더리더스] GIST, KETI·미국 라보로AI 맞손… 인간중심 피지컬 AI 개발",s:"언론 보도",m:"2026-10",d:"2026.10.14.",cr:"사진 © GIST · 자료 사진",src:"더리더스",u:"https://www.theleader.co.kr/news/articleView.html?idxno=9546",sum:["GIST가 한국전자기술연구원(KETI), 미국 로봇 AI 기업 라보로AI(Lavoro AI)와 손잡고 사람 중심의 피지컬 AI를 개발한다는 보도입니다."],body:"피지컬 AI KETI 라보로AI 로봇 협약 언론"},
 {c:"캠퍼스",t:"올해 1학기 GIST 학생 중 의·치대 진학 자퇴 ‘0명’",s:"학생 · 남도일보 보도",m:"2026-10",d:"2026.10.19.",cr:"사진 © GIST · 자료 사진",src:"남도일보",u:"https://www.namdonews.com/news/articleView.html?idxno=926606",sum:["올해 1학기 GIST에서 의·치대 진학을 이유로 자퇴한 학생이 한 명도 없었다는 보도입니다. 국회 황정아 의원이 4대 과학기술원 자료를 공개한 내용입니다."],body:"의대 치대 자퇴 0명 학생 이탈 과학기술원 언론"},
 {c:"캠퍼스",t:"공연·영화·AI 체험을 한데… ‘2026 GIST 과학기술문화 페스타’ 3주간 열려",s:"11.5.~11.26. · GIST 캠퍼스",m:"2026-11",d:"2026.10.28.",cr:"사진 © GIST · 자료 사진",src:"서울신문",u:"https://www.seoul.co.kr/news/society/2026/10/29/20261029500124",sum:["GIST가 11월 5일부터 26일까지 3주간 ‘2026 GIST 과학기술문화 페스타’를 엽니다. 올해로 7회째입니다.","AI·IoT 메이커톤, 시네마 콘서트, 명사 강연, 스타트업 나이트 등 공연·영화·AI 체험 프로그램을 시민과 함께합니다."],body:"과학기술문화 페스타 축제 메이커톤 시네마 콘서트 명사 강연 스타트업 나이트 시민"},
 {c:"캠퍼스",t:"한스 짐머 영화음악 라이브와 <인터스텔라> 야외 상영… ‘GIST 시네마 콘서트’",s:"11.7.(토) · 기계로봇공학동 앞 잔디밭",m:"2026-11",d:"2026.11.03.",cr:"사진 © GIST · 자료 사진",src:"GIST 공식 인스타그램",u:"https://www.instagram.com/p/DfQwkabE3TR/",sum:["2026 GIST 과학기술문화 페스타 프로그램으로, 11월 7일(토) 16:00~20:30 기계로봇공학동 앞 잔디밭에서 한스 짐머 영화음악을 피아노 5중주로 연주하고, 해가 질 무렵 영화 <인터스텔라>를 상영했습니다.","GIST 구성원과 시민 누구나 무료로 볼 수 있었고, 비가 오면 오룡관 2층 다산홀에서 진행하도록 안내했습니다."],body:"시네마 콘서트 영화음악 인터스텔라 야외 상영 잔디밭 과학기술문화 페스타 시민"},
 {c:"캠퍼스",t:"GIST 오룡아트홀 2026년 제4회 초대전 《아직 경험하지 못한 감각의 순간들》",s:"11.2.~12.30. · 오룡관 로비 1·2층",m:"2026-11",d:"2026.11.05.",cr:"사진 © GIST · 자료 사진",src:"GIST 공식 인스타그램",u:"https://www.instagram.com/p/DfVlmNFk5my/",sum:["회화와 미디어아트, AI와 데이터가 만나는 신도원 작가의 초대전이 11월 2일부터 12월 30일까지 오룡아트홀(오룡관 로비 1·2층)에서 열립니다.","관람 시간은 평일 09:00~18:00이며, 주말과 공휴일은 쉽니다."],body:"오룡아트홀 초대전 전시 미디어아트 AI 다감각 추상 신도원"},
 {c:"캠퍼스",t:"“나는 자연인… 아니, 자연대인이다!” 2026 자연대인의 밤",s:"자연과학대학",m:"2026-11",d:"2026.11.04.",cr:"사진 © GIST · 자료 사진",src:"GIST 공식 인스타그램",u:"https://www.instagram.com/p/DfUDsiyE9i_/",sum:["가을밤, 자연과학대학 구성원이 함께 모인 ‘2026 자연대인의 밤’ 소식입니다."],body:"자연대인의 밤 자연과학대학 행사 가을밤"},
 {c:"캠퍼스",t:"서로 존중하는 연구실 문화… ‘GIST 인권친화 연구실 공모전 성과공유회’",s:"11.12.(목) 12:00 · 도서관 1층 소극장 · 인권센터",m:"2026-11",d:"2026.10.27.",cr:"사진 © GIST · 자료 사진",src:"GIST 공식 인스타그램",u:"https://www.instagram.com/p/DfGPuHAk_xs/",sum:["GIST 인권센터가 11월 12일(목) 낮 12시~1시 도서관 1층 소극장에서 인권친화 연구실 공모전 성과공유회를 엽니다(장소가 오룡관 101호에서 바뀜).","대상은 GIST 연구실 구성원과 인권친화 연구실 문화에 관심 있는 누구나이며, 사전 신청은 11월 4일(수) 오후 6시까지였습니다."],body:"인권센터 인권친화 연구실 공모전 성과공유회 연구실 문화 대학원생"},
 {c:"사람",t:"“빛과 AI로 육류 신선도 판별” GIST 이영주 박사후연구원, 세계식육과학기술학회 ‘젊은 과학자상’ 수상",s:"GIST-InnoCORE 연구단",m:"2026-10",d:"2026.10.16.",cr:"사진 © GIST · 자료 사진",src:"GIST 미디어센터",u:"https://www.gist.ac.kr/kr/html/sub07/070104.html?mode=V&no=224200",g:"https://www.gist.ac.kr/kr/html/sub07/070104.html?mode=V&no=224200",sum:["지스트-이노코어(GIST-InnoCORE) 연구단 이영주 박사후연구원이 8월 9일부터 14일까지 대전에서 열린 ‘제72회 세계식육과학기술학회(ICoMST 2026)’에서 ‘젊은 과학자상(Meat Science Young Scientist Award)’을 받았습니다."],body:"이영주 박사후연구원 젊은 과학자상 세계식육과학기술학회 ICoMST 육류 신선도 빛 AI InnoCORE"},
 {c:"연구성과",t:"“눈으로는 구별하기 어려운 정보, 빛으로 새기고 읽는다” 빛의 회전 방향만으로 유기 소재 구조 제어… 정보 기록·판독 기술 개발",s:"화학과 임현섭 교수 연구팀",m:"2026-10",d:"2026.10.29.",cr:"그림 © GIST",src:"GIST 미디어센터",u:"https://www.gist.ac.kr/kr/html/sub07/070102.html?mode=V&no=224455",g:"https://www.gist.ac.kr/kr/html/sub07/070102.html?mode=V&no=224455",sum:["화학과 임현섭 교수 연구팀이 빛의 회전 방향에 따라 서로 반대되는 구조의 유기 소재를 골라 합성하고, 이를 이용해 하나의 필름에 눈으로는 구별하기 어려운 정보를 기록해 빛으로 읽어 내는 기술을 개발했습니다."],body:"빛 회전 원편광 유기 소재 COF 정보 기록 판독 화학과 임현섭"}
];
window.__RT=[2,2,3,3,3,4,4,4,0,2,2,0,1,2,3,2,2,1,2,0,0,0,0,0,0];/* 원문 기사 본문 글자 수(공백 제외)÷분당 500자, 반올림·최소 1분. 0=측정 안 됨(PDF·영상·인스타그램) 2026-11-11 측정 */

const TUTS=[
 {g:"처음 왔어요",t:"교직원 첫 출근 순서",p:"계정 발급부터 포털·그룹웨어 첫 로그인까지 순서대로.",dep:"총무팀",up:"2026-09-01",y:"2026",step:["포털 계정 받기","그룹웨어 로그인","소속·업무 등록"]},
 {g:"처음 왔어요",t:"신입생 입학 전 할 일",p:"생활관 신청, 수강신청, 학생증까지 날짜순으로.",dep:"학적팀",up:"2026-02-10",y:"2026",step:["생활관 신청","수강신청","학생증 발급"]},
 {g:"업무 안내",t:"국외출장 신청",p:"신청 시기, 필요한 서류, 여비 계산 방법을 한 장으로.",dep:"연구관리팀",up:"2026-07-15",y:"2026",step:["출장 신청서 작성","증빙 준비","귀국 후 정산"]},
 {g:"업무 안내",t:"연구비카드 사용",p:"쓸 수 있는 곳과 안 되는 곳, 증빙 올리는 법.",dep:"연구관리팀",up:"2025-11-20",y:"2025",step:["사용 기준 확인","전표 확인","증빙 올리기"]},
 {g:"학생 생활",t:"장학금 신청",p:"장학 종류와 신청 기간, 문의처.",dep:"학생팀",up:"2026-03-05",y:"2026",step:["종류 고르기","기간 확인","신청"]},
 {g:"학생 생활",t:"상담이 필요할 때",p:"상담센터 이용 방법과 예약.",dep:"상담센터",up:"2024-09-02",y:"2024",step:["예약","상담","후속 안내"]}
];
const IDX=[
 {s:"main",site:"대표 홈페이지",t:"장학 제도 안내",p:"학사·대학원 장학 종류와 신청 방법",k:"장학 장학금"},
 {s:"main",site:"대표 홈페이지",t:"증명서 발급",p:"재학·졸업·성적 증명서 인터넷 발급",k:"증명서 발급"},
 {s:"main",site:"대표 홈페이지",t:"공지 · 2026 대한민국 딥테크 사업화 페스티벌 개최 안내",p:"과학기술정보통신부 안내",k:"공지 딥테크"},
 {s:"main",site:"대표 홈페이지",t:"생활관 안내",p:"입사 신청, 생활 규칙",k:"생활관 기숙사"}
];


/* 초성·오타 검색 (hangul-js + Fuse.js) */
const CHO="ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
function cho(t){let o="";for(const ch of t){const c=ch.charCodeAt(0);o+=(c>=0xAC00&&c<=0xD7A3)?CHO[Math.floor((c-0xAC00)/588)]:ch;}return o.replace(/[\s·]/g,"");}
function jamo(t){return window.Hangul?Hangul.disassemble(t).join(""):t;}
const isCho=q=>/^[ㄱ-ㅎ\s]+$/.test(q);
const fuseCache=new Map();
function smart(list,q,keep){
  q=(q||"").trim();const base=list.filter(keep);if(!q)return base;
  if(isCho(q)){const qq=q.replace(/\s/g,"");return base.filter(r=>cho(r.t+" "+(r.site||"")).includes(qq)||cho(r.t).includes(qq));}
  const direct=base.filter(r=>(r.t+r.p+(r.k||"")+(r.site||"")).includes(q));
  const uniq=a=>{const m=new Map();a.forEach(r=>{const k=r.t+"|"+(r.site||"")+(r.s==="people"?"|"+r.p:"");if(!m.has(k))m.set(k,r);});return [...m.values()];};
  if(!window.Fuse||direct.length>=2)return uniq(direct);
  const key=list;let f=fuseCache.get(key);
  if(!f){f=new Fuse(list.map((r,i)=>({i,j:jamo(r.t+" "+(r.k||"")),jp:jamo(r.p+" "+(r.site||""))})),{keys:[{name:"j",weight:.7},{name:"jp",weight:.3}],threshold:.34,ignoreLocation:true,minMatchCharLength:2});fuseCache.set(key,f);}
  const fz=f.search(jamo(q)).map(x=>list[x.item.i]).filter(keep);
  return uniq([...direct,...fz]);
}

IDX.push(
 {s:"main",site:"대표 홈페이지 · 공지",t:"2026년도 제3차 광주과학기술원 전임교원 초빙 공고",p:"2026.10.28. 공지",k:"교원 초빙 채용 공고"},
 {s:"main",site:"대표 홈페이지 · 공지",t:"[첨단AI반도체팹센터] GIST-imec 글로벌 인턴십 연수생 모집 공고",p:"2026.10.30. 공지 · 모집 11/2~12/7",k:"인턴십 imec 반도체 모집"},
 {s:"main",site:"대표 홈페이지 · 공지",t:"[창업진흥센터] 2026-27 겨울학기 CUop 산학협력인턴십 참여 학생 모집",p:"2026.10.29. 공지",k:"인턴십 산학협력 창업 겨울학기"},
 {s:"main",site:"대표 홈페이지 · 공지",t:"2026 GIST 과학기술문화 페스타 개최 안내 (11.5.~26.)",p:"2026.10.28. 공지",k:"페스타 행사 문화 공연"},
 {s:"main",site:"대표 홈페이지 · 학사일정",t:"학사학위 및 석사학위 청구논문(심사용) 제출마감 — 2027년 2월 졸업예정자",p:"2026.11.30.",k:"학위논문 졸업 마감 석사 학사"},
 {s:"main",site:"대표 홈페이지 · 학사일정",t:"박사학위논문 결과보고서 제출마감 — 2027년 2월 졸업예정자",p:"2026.11.30.",k:"박사 학위논문 졸업 마감"},
 {s:"main",site:"대표 홈페이지 · GIST Excellence",t:"GIST-성균관대, 심근경색 손상 심장에 약물 직접 전달하는 ‘붙이는 주사형 하이드로젤’ 개발",p:"2026.11.10. · 의생명공학과",k:"연구 성과 하이드로젤 심근경색"},
 {s:"main",site:"대표 홈페이지 · GIST Excellence",t:"GIST, 풍력 연구 분야 국내 최초 ‘호라이즌 유럽’ 과제 선정",p:"2026.11.09. · 기계로봇공학과",k:"풍력 호라이즌 유럽 연구"}
);
const SCOPES=[["all","전체"],["main","대표"],["dept","학과 홈페이지"],["people","사람"],["rule","규정·안내"],["sns","SNS"]];
var REF=window.__REF=[
 ["①","첫 화면은 찾는 사람 기준으로 필요한 정보 먼저(매크로), 한 번 더 내리면 세부(마이크로)","주영현(단과대학)","1스크롤 = 사진 한 장·짧은 문구 → 바로 아래 큰 검색·방문자별 메뉴 / 2스크롤 = 주요 소식·연구성과·대학·학과 / 공지·행사·지금, 지스트","반영","home|.hx"],
 ["②","A안 검색창 위치가 어색함","참석자","검색창을 첫 화면 사진 바로 아래 흰 띠로 크게 분리(범위 선택·많이 찾는 검색어 포함)","반영","home|#hsearch"],
 ["③","지금, 지스트·공지·영상은 전체로 보면 부수적","주영현(단과대학)","주요 소식·지금, 지스트를 검색·방문자 메뉴 아래(둘째 스크롤)로 내림","반영","home|#p-h-main"],
 ["④","이사장님 주문 1순위: 대표 홈페이지에서 단과대학·학과로 끊김 없이","참석자 · 처장님","첫 화면에 4개 단과대학을 큰 글자로 두고 누르면 그 대학 학과 목록으로(13개 학과·AI정책전략대학원), 학과마다 홈페이지·대학원 입학 버튼","반영","home|#p-h-words"],
 ["⑤","'GIST Hub'는 이름만 보고 무엇인지 모름","처장님","'방문자별 안내' + '대학·학과 바로가기'로 나눠 이름 붙임(후보 아래 표)","반영","home|#aud"],
 ["⑥","튜토리얼: 개요·용어·Q&A·주의사항·체크리스트·담당부서 흐름, 최종 개정일, 모바일은 한 장씩","지오넷 · 처장님","7개 주제(수업·학점·전공제도·학위수여·휴학복학·등록금장학·증명서)를 한 화면에 6단계로 펼치고, 단계 번호를 누르면 그 자리로 이동. 방문자별 추천·한 해 학사 흐름·체크리스트 진행률. 카드 위 근거·수집일","반영","tutorial|#obs"],
 ["⑦","지금, 지스트: 기간 검색, PDF 대신 본문 글자로 올려 검색되게, 사진 저작권 표시","참석자들","분류(보도자료·연구성과·사람·캠퍼스·영상), 월 단위 기간 검색, 본문 검색, 사진마다 © 표시","반영","story|#scat"],
 ["⑧","학과 내용도 통합검색에서 찾을 수 있어야(예: 신소재공학과 졸업요건)","참석자 · 처장님","검색 범위에 '학과 홈페이지' 추가, 결과마다 '학과 홈페이지' 꼬리표와 학과 이름 표시, 누르면 그 학과 홈페이지로 이동 (학과 14곳 소개·연구 분야 색인)","반영","search|#scope"],
 ["⑨","AI 챗봇(RAG) 사업 범위 포함, 검색 범위는 정해야","지오넷 · 처장님","지스트에 물어봐 AI 안내: 통합검색 색인(대표·학과·튜토리얼·지금, 지스트·SNS)에서 찾은 공개 자료만 근거로 답하고 답마다 출처 번호 표시. 편집판에서는 Claude가 그 자료만 보고 답함(자료에 없으면 '확인되지 않음')","반영","search|#chat"],
 ["⑩","연구자 정보는 보안·개인정보 검토 필요, 업무+이메일 정도","지오넷 · 참석자","검색 범위 '사람·업무': 현행 GIST 홈페이지 '조직/직원안내 › 직원검색'의 부서·내선·담당업무 686건을 그대로 넣음(현행처럼 직원 이름은 없음). 교수님은 학과 홈페이지 교수진 안내의 이름·연구실·내선 180명(12개 학과·AI정책전략대학원)을 넣어 이름으로도 찾음(예: '박영준'→환경·에너지공학과 학과장, 내선 2836). 이메일·사진·휴대전화는 넣지 않음","반영","search|#res"],
 ["⑪","배너가 PC·모바일에서 깨지지 않게, 색감 통일·사선 모티프(X자) 피하기","참석자들","제목은 그림에 박지 않고 화면 글자로 올림(그림이 잘려도 글은 안 깨짐), 넘김 멈춤 버튼. GIST 빨강·회색만, 사선 없음","반영","home|#hxdots"],
 ["⑫","단과대학·학과 홈페이지는 이번 사업 대상 아님, 지금처럼 링크로 연결","지오넷 · 처장님","학과 버튼은 지금 학과 홈페이지로 연결, 단과대학 소개만 대표 홈페이지에","반영","colleges|#cp2list"],
 ["⑬","대표 의견 → PC·모바일 시안 보완 → 전 구성원 투표(교직원·학생 구분, 기타의견 한 줄)","처장님","모든 화면 휴대폰 대응 + 투표 화면 미리보기","반영","vote|"],
 ["⑭","튜토리얼은 별도 주소로 QR·홍보물에 넣어 어디서든 열기, 전체 목차와 검색","지오넷","주제별 주소 + QR 코드 + 주소 복사, 전체 목차, 튜토리얼 안 검색","반영","tutorial|#qr"],
 ["⑮","튜토리얼 문구를 바꿔 쓰면 학생이 캡처해 근거로 삼음 → 원문 그대로 볼 수 있게","처장님","카드마다 '원문 PDF'와 '규정 원문 그대로 보기', 쉬운 풀이와 원문을 구분","반영","tutorial|#obs"],
 ["⑯","3차 메뉴 120개, 같은 메뉴가 여러 곳(언어교육원) → 찾다 지쳐 전화로 물어봄","지오넷","큰 메뉴 6개로 묶고 중복 없앰(메뉴 구조도), 나만의 바로가기","반영","menu|"],
 ["⑰","인스타그램·유튜브 콘텐츠가 많은데 노출이 안 됨 → 최근 글 하나씩 보이고 눌러서 넘겨 보기, 가능하면 검색도 (지오넷: 크롤링·검색은 어렵다)","처장님 · 참석자 · 지오넷","공식 경로로 30분마다 자동 수집(유튜브 공개 RSS, 인스타그램·페이스북 Graph API) → 저장소 data/sns.json → 첫 화면·지금, 지스트 최근 글, 넘겨 보기, 통합검색 'SNS' 범위. 화면에 '자동 갱신 ○분 전' 표시. 인스타그램·페이스북은 대외홍보팀이 공식 계정 열쇠(토큰)를 넣으면 바로 켜짐","반영","story|#h-sns"]
];

/* ---------- 라우터 ---------- */
const VIEWS=["home","tutorial","story","search","colleges","reflect","vote","banner","menu","en"];
function route(){
  let h=(LH()||"#home").slice(1); if(!VIEWS.includes(h)) h="home";
  $$(".view").forEach(v=>v.classList.toggle("on",v.id==="v-"+h));
  $$(".demo a,.tabbar a,.gnb a").forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+h && !(a.closest('.gnb')&&h==="home")));
  window.scrollTo({top:0});
  if(h==="search") runSearch();
  if(window.lucide) lucide.createIcons();
  if(window.ScrollTrigger) setTimeout(()=>ScrollTrigger.refresh(),50);
}
addEventListener("hashchange",route);

/* ---------- 홈 ---------- */
function renderNeed(w){
  $("#need").innerHTML="<b>"+esc(WHO[w])+"께 필요한 것</b>"+NEED[w].map(x=>{
    const href=x.includes("튜토리얼")?"#tutorial":(x.includes("학과")||x.includes("연구실"))?"#colleges":"#search";
    return '<a class="chip" href="'+href+'" data-q="'+esc(x)+'">'+esc(x)+'</a>';}).join("");
}
$$(".who button").forEach(b=>b.addEventListener("click",()=>{$$(".who button").forEach(x=>x.setAttribute("aria-pressed",x===b));renderNeed(b.dataset.who)}));
renderNeed("ug");

$("#cols").innerHTML=COLLEGES.map((c,ci)=>'<div class="col"><span class="cn">0'+(ci+1)+'</span><h3>'+esc(c.n)+'<small>'+c.d.length+'개 학과</small></h3><div class="intro">'+esc(c.i)+'</div><ul>'+c.d.map(d=>'<li><a href="#d-'+DURL[d]+'">'+esc(d)+'<span>학과 소개 →</span></a></li>').join("")+'</ul></div>').join("");
$("#fdept").innerHTML='<option>학과 홈페이지 바로가기</option>'+COLLEGES.map(c=>'<optgroup label="'+esc(c.n)+'">'+c.d.map(d=>'<option>'+esc(d)+'</option>').join("")+'</optgroup>').join("");

function stH(s){const i=STORIES.indexOf(s);return i<0?"#story":"#st-"+i;}
function storyCard(s,big){
  return '<a class="card'+(big?' big':'')+'" href="#st-'+STORIES.indexOf(s)+'"><div class="thumb"><canvas data-seed="'+esc(s.t.length)+'"></canvas><span class="cr">'+esc(s.cr)+'</span></div><span class="cat">'+esc(s.c)+' · <span class="num">'+esc(s.d||s.m.replace("-","."))+'</span></span><h3>'+esc(s.t)+'</h3><p>'+esc(s.s)+'</p></a>';
}
$("#hstory").innerHTML=STORIES.map(s=>'<div class="swiper-slide">'+storyCard(s,false)+'</div>').join("");

/* 배너: 같은 그림 한 장이 PC·휴대폰 모두에서 잘리지 않게, 글자는 캡션으로 분리 */
const BN=[["GIST Excellence · 반도체공학과 윤훈한 교수","다차원 분광 입력·복원 기술 개발 — 센서 하나로 빛 정보 초정밀 복원 (Advanced Functional Materials)"],["GIST Excellence · 반도체공학과 윤훈한 교수","초전도 양자컴퓨터 핵심 소자 발전 방향 제시 (Advanced Science)"],["GIST Excellence · 의생명공학과 정의헌 교수","만성 통증 키우는 단백질 IGFBPL1 찾았다 (Journal of Neuroinflammation)"]];
let bi=0,bt=null;
function drawBanner(){
  const c=$("#bn"); if(!c) return; const r=c.getBoundingClientRect(); const d=Math.min(devicePixelRatio||1,2);
  c.width=r.width*d;c.height=r.height*d;const x=c.getContext("2d");x.scale(d,d);
  const W=r.width,H=r.height; x.fillStyle="#1A1E23";x.fillRect(0,0,W,H);
  const cx=W*.62,cy=H*.5,R=Math.min(W,H)*.42;
  for(let k=0;k<7;k++){x.beginPath();x.arc(cx,cy,R*(1-k*.13),0,Math.PI*2);x.strokeStyle=k===bi*2?"#DC2715":"rgba(255,255,255,"+(0.07+k*.02)+")";x.lineWidth=k===bi*2?3:1.2;x.stroke();}
  x.fillStyle="#DC2715";x.beginPath();x.arc(cx+R*.62*Math.cos(bi*2.1),cy+R*.62*Math.sin(bi*2.1),9,0,Math.PI*2);x.fill();
  x.fillStyle="rgba(255,255,255,.9)";x.font="800 "+Math.max(28,W*.07)+"px Inter Tight, sans-serif";x.fillText(["H₂","2027","11.17"][bi],24,H-30);
}
function setBanner(i){bi=i;$("#bn-k").textContent=BN[i][0];$("#bn-t").textContent=BN[i][1];$$("#bn-dots i").forEach((d,k)=>d.classList.toggle("on",k===i));drawBanner();}
function play(){bt=setInterval(()=>setBanner((bi+1)%3),5000)}
if(!matchMedia("(prefers-reduced-motion: reduce)").matches) play();
$("#bn-stop").addEventListener("click",e=>{const b=e.currentTarget;if(bt){clearInterval(bt);bt=null;b.textContent="재생";b.setAttribute("aria-pressed","true")}else{play();b.textContent="멈춤";b.setAttribute("aria-pressed","false")}});

function drawThumbs(){
  $$(".thumb canvas").forEach(c=>{const r=c.getBoundingClientRect();if(!r.width)return;const d=Math.min(devicePixelRatio||1,2);c.width=r.width*d;c.height=r.height*d;const x=c.getContext("2d");x.scale(d,d);const W=r.width,H=r.height,s=+c.dataset.seed||7;
    x.fillStyle=s%3===0?"#111418":s%3===1?"#4F5B54":"#2A2F35";x.fillRect(0,0,W,H);
    for(let i=0;i<5;i++){x.fillStyle="rgba(255,255,255,"+(0.05+i*.03)+")";x.fillRect(W*(0.08+i*0.17),H*(0.25+((s*i)%5)*0.1),W*0.1,H*0.6);}
    x.fillStyle="#DC2715";x.fillRect(W*0.08,H*0.18,W*0.18,4);});
}

/* ---------- 튜토리얼 (온보딩) ---------- */
const STEPS=["개요","용어","질문과 답변","주의사항","체크리스트","담당부서"];
const TOP=[
 {id:"class",n:"수업",d:"수강신청과 이수학점",ov:"학사과정은 매 학기 11학점 이상, 21학점 이내로 수강신청합니다.",ov2:["직전 학기 평점이 3.0/4.5 이상이면 지도교수와 소속 부서장 승인을 받아 24학점까지 신청할 수 있습니다.","수강신청 일정·세부 규칙은 학기마다 학사공지 ‘[학사] 수강신청 세부 안내문’으로 알립니다."],
  terms:[["수강신청","듣고 싶은 과목을 정해진 기간에 ZEUS에서 신청하는 일"],["최소 이수학점","한 학기에 꼭 채워야 하는 학점 — 학사과정 11학점"],["예체능 실기","예능·체육 실기 과목. 같은 학기에 같은 유형은 2과목 이상 들을 수 없음"]],
  qa:[["한 학기에 몇 학점까지 들을 수 있나요?","11학점 이상 21학점 이내입니다. 직전 학기 평점 3.0/4.5 이상이면 승인을 받아 24학점까지 됩니다.","홈페이지 ‘학기별 이수학점’"],["예체능 실기는 한 학기에 몇 과목 들을 수 있나요?","정규 재학학기(1~8학기)에는 같은 유형(예능+예능, 체육+체육)은 1과목, 다른 유형은 각 1과목씩 함께 들을 수 있습니다.","2026 가을학기 수강신청 세부 안내(학사공지 222414)"]],
  warn:["최소 이수학점만큼 신청해도 F 또는 U를 받은 과목은 0학점으로 처리됩니다.","정규학기 최소 이수학점을 못 채우면 다음 학기 6개월간 학자금(조교수당)·중식보조비 지급이 멈춥니다(연차초과자 제외)."],
  src:"GIST 홈페이지 ‘학기별 이수학점’ · 2026 가을학기 수강신청 세부 안내",srcu:"https://www.gist.ac.kr/kr/html/sub05/05020303.html",dep:"학적팀",depd:"학적·수강·졸업 담당 (내선 2053·2056·2057)"},
 {id:"credit",n:"학점",d:"성적·학사경고·재수강",ov:"성적은 A+(4.5)부터 F까지, 또는 S/U로 매깁니다. 학사과정은 졸업할 때 평점 2.0 이상이 필요합니다.",ov2:["직전 학기 평점이 2.0 미만이면 학사경고를 받고, 학사경고가 3회 쌓이면 제적됩니다.","이미 들은 과목을 다시 들으면 재수강료(학점당·시수당 50,000원)를 냅니다."],
  terms:[["평점평균(GPA)","성적을 4.5 만점 숫자로 바꾼 평균"],["학사경고","직전 학기 평점 2.0 미만일 때 받는 경고"],["재수강료","재수강 과목에 학점당·시수당 50,000원, 수강신청 변경기간 뒤 따로 고지"],["연차초과료","학사과정 9학기 이상 재학생이 내는 납입금"]],
  qa:[["학사경고는 언제 받나요?","직전 학기 평점 2.0 미만일 때입니다. 3회면 제적됩니다.","학칙 제52조"],["재수강료는 얼마이고 언제 내나요?","학점당·시수당 50,000원이며, 수강신청 변경기간이 끝난 뒤 따로 고지됩니다.","2026학년도 2학기 학사과정 납입금 납부 안내(학사공지 222366)"]],
  warn:["예체능 강좌는 필수 이수 학기를 넘겨 같은 과목을 들으면 재수강료 100,000원이 붙습니다.","9학기 이상 재학하면 신청 학점에 따라 연차초과료(0~3학점 605,000원 ~ 10학점 이상 3,635,000원)가 붙습니다."],
  src:"학칙 제44조의2·제52조 · 2026-2 학사과정 납입금 납부 안내",srcu:"https://www.gist.ac.kr/kr/html/sub05/050209.html?mode=V&no=222366",dep:"학적팀",depd:"학적·성적 담당 (내선 2053·2056·2057)"},
 {id:"major",n:"전공제도",d:"전공선언·복수전공·부전공",ov:"학사과정은 전공을 선언해 주전공을 정하고, 원하면 복수전공·부전공을 더할 수 있습니다.",ov2:["복수전공은 정규 2학기 이상, 평점 2.5 이상이면 신청할 수 있습니다. 공고는 2월·8월, 신청은 3월 15일·9월 15일까지 ZEUS에서 합니다.","부전공은 그 전공 과목을 15학점 이상 이수해야 합니다."],
  terms:[["전공선언","소속 전공을 정해 학교에 알리는 절차"],["복수전공","주전공과 함께 하나 더 마치는 전공"],["부전공","다른 전공 과목을 15학점 이상 이수하는 것"],["전과","전공을 바꾸는 일 — 전에 딴 학점은 모두 인정"]],
  qa:[["복수전공은 언제, 어디서 신청하나요?","2월·8월 공고를 보고 3월 15일·9월 15일까지 ZEUS에서 신청합니다(정규 2학기 이상·평점 2.5 이상).","학칙 제71조의2 · 학사공지 ‘전공과정’"],["전공을 바꾸면 들은 학점은 어떻게 되나요?","전과생이 이미 딴 학점은 모두 인정됩니다. ‘전공 변경 신청서’를 냅니다.","학생전과에 관한 지침(7차, 2026.10.28.)"]],
  warn:["전공 학점 인정 범위는 36~42학점(신소재공학 30학점부터)입니다. 내 전공 기준은 학과 교과과정에서 확인하세요.","공고 날짜는 해마다 바뀝니다. 그 학기 학사공지 ‘전공과정’ 글을 꼭 확인하세요."],
  src:"학칙 제71조의2 · 학생전과에 관한 지침(2026.10.28.)",srcu:"https://www.gist.ac.kr/kr/html/sub05/050209.html",dep:"학적팀",depd:"전공선언·복수전공 접수 (내선 2053·2056·2057)"},
 {id:"degree",n:"학위수여",d:"졸업 요건과 우등졸업",ov:"학사과정은 130학점 이상, 평점 2.0 이상을 채우면 학기말에 학위를 받습니다.",ov2:["수업연한은 4년이며, 휴학 기간을 빼고 최장 6년까지 재학할 수 있습니다.","졸업 전에 학사자료 게시판의 ‘졸업사정 시뮬레이션 매뉴얼’로 내 이수 현황을 미리 확인할 수 있습니다."],
  terms:[["졸업학점","학사과정 130학점 이상"],["최장재학","휴학 기간을 뺀 최장 6년"],["우등졸업","최우등 4.3 이상 · 준최우등 4.1~4.3 · 우등 3.9~4.1"],["학위수여예정증명서","마지막 학기 수강신청 뒤 지도교수 서명을 받아 신청"]],
  qa:[["졸업 요건은 무엇인가요?","130학점 이상, 평점 2.0 이상입니다. 학과별 필수 과목·전공 학점도 함께 채워야 합니다.","학칙 제60조"],["우등졸업 기준은요?","최우등 4.3 이상, 준최우등 4.1~4.3, 우등 3.9~4.1이며 재학 중 징계를 받은 학생은 제외됩니다.","학칙 제74조"]],
  warn:["학위는 학기말에 수여됩니다(학칙 제42조).","학과별 졸업 요건(필수 과목·전공 학점)은 학과 홈페이지와 교과과정에서 함께 확인하세요."],
  src:"학칙 제42·58·59·60·74조",srcu:"https://www.gist.ac.kr/kr/html/sub05/050210.html",dep:"학적팀",depd:"졸업사정·학위·증명서 (내선 2053·2056·2057)"},
 {id:"leave",n:"휴학·복학",d:"신청 시기와 처리",ov:"휴학과 복학은 ZEUS로 신청하고, 학적 변동은 학기 시작일(3월 1일·9월 1일)에 최종 처리됩니다.",ov2:["학사과정 일반휴학은 통산 4학기까지입니다. 질병·병역·임신·출산·육아·창업 휴학은 이 기간에 넣지 않습니다.","학사과정 신입생은 첫 학기에 일반휴학을 할 수 없습니다."],
  terms:[["일반휴학","개인 사정으로 하는 휴학 — 학사과정 통산 4학기"],["질병휴학","종합병원 4주 이상 진단서(최종진단)로 신청"],["창업휴학","창업을 위한 휴학 — 8학기까지, 심의를 거쳐 2학기씩 연장(2026.8.20. 개정)"],["복학","휴학을 마치고 돌아오는 일 — 수강신청 변경기간까지 신청"]],
  qa:[["휴학은 언제까지 신청하나요?","질병·병역·출산·육아 휴학은 기말고사 시작 전까지, 창업·일반 휴학은 수업 주수의 절반 안에 신청합니다. 홈페이지 안내 기준 일반휴학은 1학기 4월 중, 2학기 10월 중까지입니다.","학칙 제46조 · 홈페이지 휴학 안내"],["등록금을 내고 휴학하면 돌려받나요?","돌려받는 대신 복학하는 학기 등록금으로 넘어갑니다. 국가장학금은 전액 반환해야 합니다.","홈페이지 휴학 안내"],["휴·복학 신청 안내는 언제 나오나요?","1학기분은 12월 중, 2학기분은 6월 중에 재적생 메일과 홈페이지로 공지됩니다.","학사공지(해마다 날짜 확인)"]],
  warn:["학적 변동은 3월 1일·9월 1일에 최종 처리됩니다. ZEUS에서 승인 진행 상황을 꼭 확인하세요.","자녀 양육 휴학은 자녀가 12세 이하(초등 6학년 이하)일 때 자녀 1명당 4학기까지 휴학 기간에 넣지 않습니다(2026.6.25. 개정)."],
  src:"학칙 제46조 · 홈페이지 휴·복학 안내",srcu:"https://www.gist.ac.kr/kr/html/sub05/050209.html",dep:"학적팀",depd:"휴학·복학 접수 (내선 2053·2056·2057)"},
 {id:"money",n:"등록금·장학",d:"납부 시기와 장학 규칙",ov:"등록금은 1학기 2월 말, 2학기 8월 말에 ZEUS 고지서의 가상계좌로 냅니다. 내지 않으면 제적됩니다.",ov2:["학사과정은 기본장학을 받은 뒤 실제로 내는 수업료가 학기당 1,030,000원입니다(학사공지 「2026학년도 납입금 책정 내역 안내」 기준: 수업료 4,050,000원 − 면제 3,020,000원).","학적팀이 「학사과정 등록금제도 개편(안)」(실부담 0원, 2027학년도 1학기 시행 예정안)의 의견을 받고 있습니다. 확정 공지가 나오면 이 금액을 고칩니다.","교외 장학 공고는 학사공지에 ‘[학사]’ 머리말을 단 글로 올라옵니다."],
  terms:[["기본장학","국비 학생에게 주는 기본 장학"],["지스트총장장학금","평점 3.5를 유지해야 하며, 2회 못 채우면 잃습니다"],["학자금","학사·석사 장학생에게 매월 23일 지급(휴일이면 전날)"],["중복지급 금지","등록금 지원 장학은 교외 → 한국장학재단 → 교비 순서로 하나만 받습니다"]],
  qa:[["등록금은 언제, 어떻게 내나요?","1학기는 2월 말, 2학기는 8월 말에 ZEUS 고지서의 가상계좌로 냅니다.","홈페이지 등록 안내"],["자퇴하면 등록금을 돌려받나요?","학기 시작 전이면 전액, 30일까지 6분의 5, 60일까지 3분의 2, 90일까지 2분의 1을 돌려받고 그 뒤에는 없습니다.","홈페이지 등록 안내"],["장학금을 두 개 받을 수 있나요?","등록금 지원 장학은 겹쳐 받을 수 없습니다. 교외 → 한국장학재단 → 교비 순서로 먼저 정해집니다.","재학생장학금 지급지침"]],
  warn:["지스트총장장학금은 중간에 학업을 그만두면 받은 금액의 50%를 돌려내야 합니다.","금액은 해마다 바뀝니다. 그 학기 납입금 안내 공지를 확인하세요."],
  src:"재학생장학금 지급지침 · 학자금 및 조교수당 지급지침 · 홈페이지 등록 안내",srcu:"https://www.gist.ac.kr/kr/html/sub05/050209.html",dep:"학적팀 · 장학 담당",depd:"등록·장학 (장학 공고마다 담당자가 적혀 있습니다)"},
 {id:"cert",n:"증명서",d:"어디서, 어떻게 뽑나",ov:"증명서는 도서관 1층 무인발급기(24시간)나 홈페이지 인터넷 증명발급으로 뽑습니다.",ov2:["무인발급기는 블루팟 카페 옆에 있고 카드·페이로만 결제합니다(현금 불가).","인터넷 증명발급은 위조를 막는 타임스탬프가 찍힌 PDF 전자증명서로 나옵니다."],
  terms:[["전자증명서","인터넷으로 받는 PDF 증명서 — 타임스탬프로 진짜인지 확인"],["학위수여예정증명서","마지막 학기 수강신청 뒤, 지도교수 서명 신청서를 내면 발급이 열립니다"],["석차산출","대학원 진학·취업·다른 기관 제출일 때만 신청"],["수료증명서","부서장 확인을 받아 신청(학적팀 2057)"]],
  qa:[["증명서는 어디서 뽑나요?","도서관 1층 무인발급기(24시간, 카드·페이)나 홈페이지 인터넷 증명발급에서 뽑습니다.","홈페이지 증명서 발급 안내"],["졸업 전에 졸업예정 증명서가 필요해요.","마지막 학기 수강신청 뒤 지도교수 서명을 받은 신청서를 내면 학적팀이 발급 기능을 열어 줍니다.","학사업무 안내"],["석차는 아무 때나 받을 수 있나요?","대학원 진학·취업·다른 기관 제출일 때만 됩니다. 성적 산출 기간이나 수강신청 기간에는 안 됩니다.","석차산출 신청서"]],
  warn:["무인발급기는 현금을 받지 않습니다.","발급 문의는 학적팀(내선 2053)입니다."],
  src:"홈페이지 증명서 발급 안내 · 학사업무 서식",srcu:"https://www.gist.ac.kr/kr/html/sub05/050204.html",dep:"학적팀",depd:"증명서 발급 (내선 2053)"}
];
const CK={class:["이번 학기 수강신청 안내문(학사공지) 읽기","신청 학점이 11~21학점 안인지 확인","예체능 실기 과목 수 확인"],credit:["직전 학기 평점 2.0 이상인지 확인","재수강 과목·재수강료 확인","9학기 이상이면 연차초과료 확인"],major:["전공선언 여부 확인","복수전공 조건(2학기 이상·평점 2.5) 확인","2월·8월 공고와 신청 마감일 확인"],degree:["총 이수학점 130학점 확인","평점 2.0 이상 확인","졸업사정 시뮬레이션 매뉴얼로 학과 요건 확인"],leave:["휴학 종류(일반·질병·창업 등) 정하기","그 학기 신청 마감일 확인","등록금 이연·국가장학금 반환 여부 확인","ZEUS 승인 진행 상황 확인"],money:["ZEUS 고지서 금액 확인","납부 마감일 확인","받는 장학금이 겹치지 않는지 확인","총장장학금이면 평점 3.5 유지 확인"],cert:["필요한 증명서 종류 정하기","국문·영문 확인","제출처가 전자증명서를 받는지 확인"]};
let ot=0,ost=0,osw=null,ckState={};try{ckState=JSON.parse(localStorage.getItem("d5ck")||"{}")}catch(_){}
const FOOT=t=>'<div class="ft"><span>근거 <b>'+esc(TOP[t].src)+'</b> (2026.11.5. 수집)</span><span>담당 '+esc(TOP[t].dep)+'</span><a href="'+esc(TOP[t].srcu)+'" class="orig"'+EXT+'>원문 보기 ↗</a></div>';
function card(t,i){
  const T=TOP[t];let b="";
  if(i===0)b='<p style="font-size:18px;color:var(--ink);font-weight:600">'+esc(T.ov)+'</p>'+T.ov2.map(x=>'<p>'+esc(x)+'</p>').join("");
  if(i===1)b='<dl>'+T.terms.map(x=>'<dt>'+esc(x[0])+'</dt><dd>'+esc(x[1])+'</dd>').join("")+'</dl>';
  if(i===2)b=T.qa.map((x,k)=>'<details'+(k===0?' open':'')+'><summary>Q. '+esc(x[0])+'</summary><p>A. '+esc(x[1])+'</p><p class="ob-src">근거: '+esc(x[2])+'</p></details>').join("");
  if(i===3)b=T.warn.map(x=>'<p class="warn">'+esc(x)+'</p>').join("")+'<p>날짜와 금액은 해마다 바뀔 수 있습니다. 그 학기 학사공지를 함께 확인하세요.</p>';
  if(i===4){const L=CK[T.id];const st=ckState[T.id]||[];b='<div class="ckbar"><i id="ckbar-'+t+'" style="width:'+Math.round(st.filter(Boolean).length/L.length*100)+'%"></i></div>'+L.map((x,k)=>'<label class="ck"><input type="checkbox" data-t="'+t+'" data-k="'+k+'"'+(st[k]?' checked':'')+'>'+esc(x)+'</label>').join("");}
  if(i===5)b='<div class="dept-card"><span class="av">학</span><div><b>'+esc(T.dep)+'</b><br><span style="font-size:14px">'+esc(T.depd)+'</span></div></div><a class="icon-btn" href="#search" data-chat="1" style="align-self:flex-start">AI 안내에 묻기</a>';
  return '<div class="swiper-slide"><article class="obc"><span class="k">'+esc(T.n)+' · 0'+(i+1)+' '+esc(STEPS[i])+'</span><h3>'+esc(i===0?T.n+", 이렇게 흘러가요":i===1?"먼저 알아 둘 말":i===2?"자주 묻는 질문":i===3?"꼭 주의할 것":i===4?"하나씩 체크해요":"더 궁금하면 여기로")+'</h3><div class="body">'+b+'</div>'+FOOT(t)+'</article></div>';
}
function setQR(){const url=TOP[ot].srcu;$("#obu").value=url;
  if(window.qrcode){const q=qrcode(0,"M");q.addData(url);q.make();$("#qr").innerHTML=q.createSvgTag({cellSize:4,margin:0,scalable:true});const sv=$("#qr svg");if(sv){sv.querySelectorAll("path,rect").forEach(e=>{if(e.getAttribute("fill")==="#000000"||e.getAttribute("fill")==="black")e.setAttribute("fill","#111418")});}}
  else $("#qr").textContent="QR";}
const TGI={class:"book-open",credit:"chart-column",major:"git-branch",degree:"graduation-cap",leave:"calendar-off",money:"wallet",cert:"file-badge"};
const TGC={class:"#DC2715",credit:"#111418",major:"#4F5B54",degree:"#B3200F",leave:"#2A2F35",money:"#7A1E12",cert:"#3B4249"};
const WHOT=[["신입생",["class","credit","cert"]],["재학생",["major","credit","money"]],["졸업을 앞둔 학생",["degree","cert","credit"]],["쉬었다 돌아오는 학생",["leave","money","class"]],["장학·등록금이 궁금한 학생",["money","leave"]]];
const YEAR=[[1,"재학기간 연장 신청(학적팀 공문, 대학원)","leave"],[2,"1학기 등록금 납부(2월 말) · 복수전공 공고","money"],[3,"학적 변동 처리(3/1) · 복수전공 신청(~3/15)","major"],[4,"8월 졸업 학위청구논문 제출(4월 말) · 1학기 일반휴학 신청(4월 중)","degree"],[5,"교내 장학 공고(학사공지)","money"],[6,"2학기 휴·복학 신청 안내","leave"],[7,"재학기간 연장 신청(대학원) · 2학기 납입금 안내","money"],[8,"2학기 등록금 납부(8월 말) · 복수전공 공고","money"],[9,"학적 변동 처리(9/1) · 복수전공 신청(~9/15)","major"],[10,"2월 졸업 학위청구논문 제출(10월 말) · 2학기 일반휴학 신청(10월 중)","degree"],[11,"교내 장학 공고 · 개설교과목 편성","money"],[12,"1학기 휴·복학 신청 안내","leave"]];
let tgWho=-1;
function ckPct(t){const L=CK[TOP[t].id]||[];const st=ckState[TOP[t].id]||[];return L.length?Math.round(st.filter(Boolean).length/L.length*100):0;}
function tgArt(t){const T=TOP[t],c=TGC[T.id]||"#111418",k=t*37%100;return '<svg class="tg-art" viewBox="0 0 160 100" aria-hidden="true" preserveAspectRatio="xMidYMid slice"><rect width="160" height="100" fill="'+c+'"/><circle cx="'+(120+k%20)+'" cy="'+(20+k%30)+'" r="46" fill="rgba(255,255,255,.08)"/><circle cx="'+(30+k%25)+'" cy="96" r="34" fill="rgba(255,255,255,.06)"/><path d="M0 70 L160 '+(40+k%30)+' L160 100 L0 100Z" fill="rgba(0,0,0,.14)"/><text x="150" y="86" text-anchor="end" font-family="Anton,Impact,sans-serif" font-size="30" fill="rgba(255,255,255,.22)">0'+(t+1)+'</text></svg>';}
function renderTGTop(){
 $("#tgwho").innerHTML=WHOT.map((w,i)=>'<button type="button" data-w="'+i+'" aria-pressed="'+(i===tgWho)+'">'+esc(w[0])+'</button>').join("")+(tgWho>=0?'<button type="button" class="clr" data-w="-1">전체 보기</button>':'');
 const nowM=new Date().getMonth()+1;
 $("#tgyear").innerHTML=YEAR.map(y=>{const ti=TOP.findIndex(T=>T.id===y[2]);return '<li class="'+(y[0]===nowM?'now':'')+'"><button type="button" data-i="'+ti+'"><b class="num">'+y[0]+'월</b>'+(y[0]===nowM?'<em>이번 달</em>':'')+'<span>'+esc(y[1])+'</span><small>'+esc(TOP[ti].n)+' →</small></button></li>';}).join("");
 const rec=tgWho>=0?WHOT[tgWho][1]:null;
 $("#tggrid").innerHTML=TOP.map((T,t)=>{const p=ckPct(t);const on=t===ot;const hit=rec&&rec.includes(T.id);return '<button type="button" class="tg-card'+(on?' on':'')+(rec&&!hit?' dim':'')+(hit?' rec':'')+'" data-i="'+t+'" aria-pressed="'+on+'">'+tgArt(t)+'<i data-lucide="'+(TGI[T.id]||"book-open")+'" class="tg-ic"></i><span class="tg-ct"><b>'+esc(T.n)+'</b><small>'+esc(T.d)+'</small></span><span class="tg-pg" aria-label="체크리스트 '+p+'% 완료"><i style="width:'+p+'%"></i></span>'+(hit?'<em class="tg-rec">추천</em>':'')+'</button>';}).join("");
 $("#tgcount").textContent=TOP.length+"개 주제";
 {const y=$("#tgyear"),n=$("#tgyear li.now");if(y&&n)requestAnimationFrame(()=>{if(y.offsetParent&&!y.dataset.sc){y.dataset.sc=1;y.scrollLeft=Math.max(0,n.offsetLeft-8);}});}
 if(window.lucide)lucide.createIcons();
}
function secHTML(t,i){const T=TOP[t];let b="";
  if(i===0)b='<p class="tg-lead">'+esc(T.ov)+'</p>'+T.ov2.map(x=>'<p>'+esc(x)+'</p>').join("");
  if(i===1)b='<dl class="tg-terms">'+T.terms.map(x=>'<div><dt>'+esc(x[0])+'</dt><dd>'+esc(x[1])+'</dd></div>').join("")+'</dl>';
  if(i===2)b=T.qa.map((x,k)=>'<details'+(k===0?' open':'')+'><summary>Q. '+esc(x[0])+'</summary><p>A. '+esc(x[1])+'</p><p class="ob-src">근거: '+esc(x[2])+'</p></details>').join("");
  if(i===3)b=T.warn.map(x=>'<p class="warn">'+esc(x)+'</p>').join("")+'<p class="tg-note">날짜와 금액은 해마다 바뀔 수 있습니다. 그 학기 학사공지를 함께 확인하세요.</p>';
  if(i===4){const L=CK[T.id];const st=ckState[T.id]||[];b='<div class="ckbar"><i id="ckbar-'+t+'" style="width:'+ckPct(t)+'%"></i></div>'+L.map((x,k)=>'<label class="ck"><input type="checkbox" data-t="'+t+'" data-k="'+k+'"'+(st[k]?' checked':'')+'>'+esc(x)+'</label>').join("")+'<p class="tg-note">체크한 내용은 이 기기에만 저장됩니다.</p>';}
  if(i===5)b='<div class="dept-card"><span class="av">학</span><div><b>'+esc(T.dep)+'</b><br><span style="font-size:14px">'+esc(T.depd)+'</span></div></div><a class="icon-btn" href="#search" data-chat="1" style="align-self:flex-start">AI 안내에 묻기</a>';
  return '<section class="tg-sec obc" id="tgs-'+i+'" data-k="'+i+'" aria-labelledby="tgsh-'+i+'"><span class="k">0'+(i+1)+' '+esc(STEPS[i])+'</span><h3 id="tgsh-'+i+'">'+esc(i===0?T.n+", 이렇게 흘러가요":i===1?"먼저 알아 둘 말":i===2?"자주 묻는 질문":i===3?"꼭 주의할 것":i===4?"하나씩 체크해요":"더 궁금하면 여기로")+'</h3><div class="body">'+b+'</div></section>';}
function syncSteps(){$$("#obsteps a").forEach((b,k)=>{b.classList.toggle("on",k===ost);b.classList.toggle("done",k<ost);if(k===ost)b.setAttribute("aria-current","step");else b.removeAttribute("aria-current");});setQR();}
let tgIO=null;
function renderOB(scroll){
 renderTGTop();const T=TOP[ot];
 $("#tghead").innerHTML='<div class="tg-hd" style="--c:'+(TGC[T.id]||"#111418")+'">'+tgArt(ot)+'<i data-lucide="'+(TGI[T.id]||"book-open")+'" class="tg-ic"></i><div><span class="k">주제 '+(ot+1)+' / '+TOP.length+'</span><h2>'+esc(T.n)+'</h2><p>'+esc(T.d)+'</p></div></div>'+FOOT(ot);
 $("#obsteps").innerHTML=STEPS.map((x,k)=>'<a href="#tutorial" data-k="'+k+'"><i>'+(k+1)+'</i>'+esc(x)+'</a>').join("");
 $("#obw").innerHTML=STEPS.map((_,i)=>secHTML(ot,i)).join("");
 const nx=[1,2].map(d=>(ot+d)%TOP.length);
 $("#tgnext").innerHTML='<h3>이어서 보기</h3><div>'+nx.map(t=>'<button type="button" class="tg-nc" data-i="'+t+'"><i data-lucide="'+(TGI[TOP[t].id]||"book-open")+'"></i><span><b>'+esc(TOP[t].n)+'</b><small>'+esc(TOP[t].d)+'</small></span><em>→</em></button>').join("")+'<button type="button" class="tg-nc up" data-up="1"><i data-lucide="layout-grid"></i><span><b>주제 목록으로</b><small>'+TOP.length+'개 주제 전체</small></span><em>↑</em></button></div>';
 if(tgIO)tgIO.disconnect();
 if("IntersectionObserver" in window){tgIO=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){ost=+e.target.dataset.k;syncSteps();}});},{rootMargin:"-30% 0px -60% 0px"});$$("#obw .tg-sec").forEach(x=>tgIO.observe(x));}
 syncSteps();if(window.lucide)lucide.createIcons();
 if(scroll){const el=scroll===2?$("#tgs-"+ost):$("#tgdoc");if(el)el.scrollIntoView({behavior:RM?"auto":"smooth",block:"start"});}
}
function tgGo(i,k){ot=i;ost=k||0;renderOB(k?2:1);}
addEventListener("hashchange",()=>{if(LH()==="#tutorial")setTimeout(()=>{const y=$("#tgyear"),n=$("#tgyear li.now");if(y&&n&&!y.dataset.sc&&y.offsetParent){y.dataset.sc=1;y.scrollLeft=Math.max(0,n.offsetLeft-8);}},300);});
$("#tggrid").addEventListener("click",e=>{const b=e.target.closest("button[data-i]");if(b)tgGo(+b.dataset.i,0);});
$("#tgyear").addEventListener("click",e=>{const b=e.target.closest("button[data-i]");if(b&&+b.dataset.i>=0)tgGo(+b.dataset.i,0);});
$("#tgwho").addEventListener("click",e=>{const b=e.target.closest("button[data-w]");if(!b)return;tgWho=+b.dataset.w;renderTGTop();if(tgWho>=0){const f=TOP.findIndex(T=>T.id===WHOT[tgWho][1][0]);if(f>=0){ot=f;ost=0;renderOB(0);}$("#tggrid").scrollIntoView({behavior:RM?"auto":"smooth",block:"center"});}});
$("#tgnext").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;if(b.dataset.up){$("#tggrid").scrollIntoView({behavior:RM?"auto":"smooth",block:"start"});return;}tgGo(+b.dataset.i,0);});
$("#obsteps").addEventListener("click",e=>{const a=e.target.closest("a[data-k]");if(!a)return;e.preventDefault();ost=+a.dataset.k;syncSteps();const el=$("#tgs-"+ost);if(el){el.scrollIntoView({behavior:RM?"auto":"smooth",block:"start"});el.classList.remove("flash");void el.offsetWidth;el.classList.add("flash");}});
document.addEventListener("change",e=>{const c=e.target.closest("input[data-k][data-t]");if(!c)return;const t=+c.dataset.t,id=TOP[t].id;const st=ckState[id]||[];st[+c.dataset.k]=c.checked;ckState[id]=st;try{localStorage.setItem("d5ck",JSON.stringify(ckState))}catch(_){}const b=$("#ckbar-"+t);if(b)b.style.width=ckPct(t)+"%";renderTGTop();});
$("#obcopy").addEventListener("click",()=>{const v=$("#obu").value;const ok=()=>$("#copied").textContent="주소를 복사했습니다";if(navigator.clipboard)navigator.clipboard.writeText(v).then(ok,()=>{$("#obu").select();$("#copied").textContent="주소를 선택했습니다. 복사해서 쓰세요."});else{$("#obu").select();}});
$("#tocbtn").addEventListener("click",()=>{$("#toc2").classList.toggle("on")});
$("#toc2").innerHTML=TOP.map((T,i)=>'<div><b>'+esc(T.n)+'</b>'+STEPS.map((x,k)=>'<a href="#tutorial" data-i="'+i+'" data-k="'+k+'">'+(k+1)+'. '+esc(x)+'</a>').join("")+'</div>').join("");
function jump(i,k){ot=i;ost=k;renderOB(2);$("#toc2").classList.remove("on");$("#obq").value="";$("#obres").innerHTML="";}
$("#toc2").addEventListener("click",e=>{const a=e.target.closest("a");if(a)jump(+a.dataset.i,+a.dataset.k);});
const OBX=TOP.flatMap((T,i)=>[{t:T.n+" 개요",p:T.ov,k:T.d,i,s:0},...T.terms.map(x=>({t:x[0],p:x[1],k:T.n+" 용어",i,s:1})),...T.qa.map(x=>({t:x[0],p:T.n+" 질문과 답변",k:"",i,s:2})),...CK[T.id].map(x=>({t:x,p:T.n+" 체크리스트",k:"",i,s:4}))]);
$("#obq").addEventListener("input",()=>{const q=$("#obq").value.trim();if(!q){$("#obres").innerHTML="";return;}const R=smart(OBX,q,()=>true).slice(0,6);$("#obres").innerHTML=R.length?R.map(r=>'<a href="#tutorial" data-i="'+r.i+'" data-k="'+r.s+'"><b>'+hl(r.t,q)+'</b><small>'+esc(TOP[r.i].n)+' · '+esc(STEPS[r.s])+'</small></a>').join(""):'<a>찾는 내용이 없습니다. AI 안내에 물어보세요.</a>';});
$("#obres").addEventListener("click",e=>{const a=e.target.closest("a[data-i]");if(a)jump(+a.dataset.i,+a.dataset.k);});

/* ---------- 지금, 지스트 ---------- */
const CATS=["전체","보도자료","연구성과","사람","캠퍼스","영상"];let sc="전체";
function scatHTML(){$("#scat").innerHTML=CATS.map(c=>'<button type="button" data-c="'+c+'" aria-pressed="'+(c===sc)+'">'+c+' <small class="num">'+(c==="전체"?STORIES.length:STORIES.filter(s=>s.c===c).length)+'</small></button>').join("");}scatHTML();
$("#scat").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;sc=b.dataset.c;$$("#scat button").forEach(x=>x.setAttribute("aria-pressed",x===b));renderStory();});
function renderStory(){
  const q=$("#sq").value.trim(),f=$("#sfrom").value||"0000-00",t=$("#sto").value||"9999-99";
  const L=STORIES.filter(s=>(sc==="전체"||s.c===sc)&&(!window.__stp||window.__stp.test(s.t+" "+(s.s||"")+" "+(s.body||"")))&&s.m>=f&&s.m<=t&&(!q||(s.t+s.s+s.body).includes(q)));
  const dk=x=>(x.d||x.m||"").replace(/\D/g,"").padEnd(8,"0");L.sort((a,b)=>dk(b).localeCompare(dk(a)));
  $("#sgrid").innerHTML=L.length?L.map((s,i)=>storyCard(s,i===0&&!q&&L.length>2)).join(""):'<div class="empty">이 기간·분류에는 글이 없습니다.</div>';
  requestAnimationFrame(drawThumbs);
}
["#sq","#sfrom","#sto"].forEach(s=>$(s).addEventListener("input",renderStory));
renderStory();

/* ---------- 검색 ---------- */
let scope="all";
$("#scope").innerHTML=SCOPES.map(s=>'<button type="button" data-s="'+s[0]+'" aria-pressed="'+(s[0]==="all")+'">'+s[1]+'</button>').join("");
$("#scope").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;scope=b.dataset.s;$$("#scope button").forEach(x=>x.setAttribute("aria-pressed",x===b));runSearch();});
function hl(t,q){if(!q)return esc(t);return esc(t).split(esc(q)).join('<mark>'+esc(q)+'</mark>')}
function runSearch(){
  const q=$("#q").value.trim();
  const L=smart(IDX,q,r=>scope==="all"||r.s===scope);
  $("#rcount").textContent=(q?'"'+q+'" ':'')+"검색 결과 "+L.length+"건";
  let html=L.map(r=>'<li'+(r.h?' class="go"':'')+'>'+(r.h?'<a href="'+r.h+'">':'')+'<span class="src"><span class="'+(r.s==="dept"?"dept":"")+'">'+(r.s==="dept"?"학과 홈페이지":r.s==="people"?"사람":r.s==="rule"?"규정·안내":r.s==="sns"?"SNS":"대표")+'</span>'+esc(r.site)+'</span><b>'+hl(r.t,q)+'</b><p>'+hl(r.p,q)+'</p>'+(r.h?'</a>':'')+'</li>').join("");
  if(!q||"사람 담당 연구자 교수 직원".split(" ").some(w=>q.includes(w))){
    html+='<li><span class="src"><span>사람·부서</span>교직원 찾기</span><div class="person"><div class="av">학</div><div><b>학생팀 · 장학 업무</b><small>이메일 [업무 이메일] · 전화번호·사진은 표시하지 않음</small></div></div></li>';
  }
  $("#res").innerHTML=html||'<li><b>결과가 없습니다.</b><p>범위를 "전체"로 바꾸거나 AI 안내에 물어보세요.</p></li>';
}
$("#sform").addEventListener("submit",e=>{e.preventDefault();runSearch()});
$("#hsearch").addEventListener("submit",e=>{e.preventDefault();$("#q").value=$("#hq").value;scope=$("#hscope").value;$$("#scope button").forEach(x=>x.setAttribute("aria-pressed",x.dataset.s===scope));location.hash="search";runSearch();});
document.addEventListener("click",e=>{const a=e.target.closest("[data-q]");if(a&&a.getAttribute("href")==="#search"){$("#q").value=a.dataset.q;scope="all";$$("#scope button").forEach(x=>x.setAttribute("aria-pressed",x.dataset.s==="all"));}
  const c=e.target.closest("[data-chat]");if(c)setTimeout(()=>{$("#cq").focus({preventScroll:false})},60);});


/* AI 안내: 튜토리얼·학과 소개·지금, 지스트 글에서 문장 단위로 답 찾기 */
function aiKB(v){
 const L=[];
 try{TOP.forEach(T=>{T.qa.forEach(x=>L.push({t:x[0],a:x[1],src:"학사 한 장 · "+T.n+" (근거: "+x[2]+")",h:"#tutorial",k:x[1],w:1}));
  T.terms.forEach(x=>L.push({t:x[0],a:x[0]+" — "+x[1]+".",src:"학사 한 장 · "+T.n+" (근거: "+T.src+")",h:"#tutorial",k:x[1],w:0}));
  T.warn.forEach(x=>L.push({t:T.n+" 주의",a:x,src:"학사 한 장 · "+T.n+" (근거: "+T.src+")",h:"#tutorial",k:x,w:0}));
  L.push({t:T.n+" "+T.d,a:T.ov+" "+T.ov2.join(" "),src:"학사 한 장 · "+T.n+" (근거: "+T.src+")",h:"#tutorial",k:T.ov2.join(" "),w:0});});}catch(_){}
 try{Object.keys(DEPT).forEach(n=>{const D0=DEPT[n],sh=n.replace(/(학과|대학원)$/,"");
  if(D0.areas.length)L.push({t:n+" 연구 분야 연구실",a:n+"의 연구 분야는 "+D0.areas.map(a=>a[0]).join(", ")+"입니다. 분야마다 세부 내용은 학과 소개 화면에 있습니다.",src:"학과 소개 · "+n+" (현행 홈페이지 원문)",h:"#d-"+D0.code,k:sh,w:0,d:sh});
  L.push({t:n+" 연락처 사무실 전화번호 이메일",a:n+" 학과 사무실은 전화 "+(D0.tel||"[확인 필요]")+(D0.mail?", 이메일 "+D0.mail:"")+"입니다. 홈페이지는 "+D0.hp+" 입니다.",src:"학과 소개 · "+n,h:"#d-"+D0.code,k:sh,w:0,d:sh});
  L.push({t:n+" 소개 학과",a:((D0.intro&&D0.intro[0])||D0.slo||n+" 소개는 학과 홈페이지에서 확인해 주세요."),src:"학과 소개 · "+n+" (현행 홈페이지 원문)",h:"#d-"+D0.code,k:sh+" "+(D0.slo||""),w:0,d:sh});});}catch(_){}
 IDX.forEach(r=>{if(r.h&&/^#p-/.test(r.h))L.push({t:r.t,a:"‘"+r.t+"’ 화면에 안내가 있습니다. "+(r.p||""),src:"세부페이지 · "+r.t,h:r.h,k:(r.k||"").slice(0,400),w:1});});
 STORIES.forEach((x,i)=>{if(x.sum&&x.sum.length)L.push({t:x.t,a:x.sum.join(" "),src:"지금, 지스트 · "+x.c+(x.src?" ("+x.src+")":""),h:"#st-"+i,k:x.s+" "+x.body,w:0});});
 const ws=v.replace(/[?？.!,·‘’“”]/g," ").split(/\s+/).map(w=>w.replace(/(해주세요|해줘요|해줘|해주|이에요|인가요|에서는|에서|으로|이야|해요|하나요|줘요|은요|는요|은|는|이|가|을|를|에|의|와|과|도|로|요|야|해|줘)$/,"")).filter(w=>w.length>=2&&!/^(알려|알려줘|뭐야|어떻게|어디|어디서|언제|얼마|얼마야|기준|조건|궁금|싶어|있나|있어|하려면|방법|GIST|지스트)$/.test(w));
 if(!ws.length)return null;
 const dq=Object.keys(DEPT).map(n=>n.replace(/(학과|대학원)$/,"")).find(sh=>v.includes(sh)||v.includes(sh.replace(/·/g,"")));
 const GEN=/^(신청|안내|소개|학과|정보|일정|기간|문의|과제|연구)$/;let best=null,bs=0;L.forEach(e=>{let n=0;ws.forEach(w=>{if(e.t.includes(w))n+=GEN.test(w)?1:3;else if((e.a+" "+e.k).includes(w))n+=1;});if(e.d){if(dq&&e.d===dq)n+=4;else if(dq)n-=6;else n-=2;}n+=e.w;if(n>bs){bs=n;best=e;}});
 return bs>=3?best:null;}
/* ---------- AI 안내(시연용 답) ---------- */
const QA=[
 {q:"오늘 점심 메뉴 뭐야?",a:"오늘 식단은 GIST 홈페이지 '식단표'에 날마다 올라옵니다. 실제 서비스에서는 그날 식단표를 읽어 메뉴를 바로 답합니다. (시연은 식단표로 안내)",c:[["GIST 홈페이지 · 학사·생활 › 식단표","https://www.gist.ac.kr/kr/html/sub05/050601.html"]]},
 {q:"최근 1년 우수 연구성과 모아줘",a:"지금, 지스트에서 기간을 정하고(예: 2025.11 ~ 2026.11) 분류를 '연구성과'로 고르면 한 번에 모입니다. 국회·대정부 보고 자료를 만들 때 쓰기 좋습니다.",c:[["지금, 지스트 · 기간 검색","#story"]]},
 {q:"신소재공학과 졸업요건 알려줘",a:"학사과정 졸업은 130학점 이상·평점 2.0 이상이 기본이고(학칙 제60조), 신소재공학과 전공 학점 기준은 학과 교과과정에서 함께 확인해야 합니다. 학과 홈페이지는 mse.gist.ac.kr 입니다.",c:[["학과 소개 · 신소재공학과","#d-mse"],["학사 한 장 · 학위수여","#tutorial"]]},
 {q:"증명서는 어디서 떼요?",a:"세 가지 방법이 있습니다. ① 증명서 자동발급기(도서관 1층 로비·행정동 1층 검수실 앞, 24시간, 1통 500원) ② 인터넷 증명발급(1통 500원 + 대행 1,000원) ③ 우편 발송입니다.",c:[["세부페이지 · 증명서 발급","#p-4-0-2"]]},
 {q:"환경·에너지공학과 연구실 찾고 싶어",a:"환경·에너지공학과 연구 분야는 기후변화·대기, 지속가능 에너지, 물·생태 3개입니다. 연구실 목록은 학과 홈페이지(env1.gist.ac.kr)에서 볼 수 있습니다.",c:[["학과 소개 · 환경·에너지공학과","#d-env1"]]},
 {q:"○○ 교수님 전화번호 알려줘",a:"개인 연락처는 안내하지 않습니다. 소속 부서의 업무 이메일로 문의해 주세요.",c:["개인정보 보호 기준"]}
];
function addMsg(t,who,cites){const d=document.createElement("div");d.className="m "+who;d.innerHTML=esc(t)+(cites?'<div class="cite">'+cites.map(c=>Array.isArray(c)?'<a href="'+esc(c[1])+'"'+(/^https/.test(c[1])?EXT:'')+'>출처 · '+esc(c[0])+(/^https/.test(c[1])?' ↗':'')+'</a>':'<a href="#search">출처 · '+esc(c)+'</a>').join("")+'</div>':"");$("#msgs").appendChild(d);$("#msgs").scrollTop=1e6;}
addMsg("안녕하세요. 대표 홈페이지·학과 홈페이지·튜토리얼의 공개 자료(학칙·학사공지·학과 소개·지금, 지스트)에서 찾아 출처와 함께 답합니다.","a");
const ASK2=["재수강료 얼마야?","복수전공 조건이 뭐야?","신소재공학과 연구 분야 알려줘","과학기술문화 페스타 언제 해?"];
$("#qs").innerHTML=QA.map((x,i)=>(i===2||i===4)?'':'<button type="button" data-i="'+i+'">'+esc(x.q)+'</button>').join("")+ASK2.map(q=>'<button type="button" data-ask="'+esc(q)+'">'+esc(q)+'</button>').join("");
$("#qs").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;if(b.dataset.ask){$("#cq").value=b.dataset.ask;$("#cform").requestSubmit();return;}const x=QA[b.dataset.i];addMsg(x.q,"u");setTimeout(()=>addMsg(x.a,"a",x.c),350);});
$("#cform").addEventListener("submit",e=>{e.preventDefault();const v=$("#cq").value.trim();if(!v)return;addMsg(v,"u");$("#cq").value="";
  const exact=QA.find(x=>x.q===v);
  if(!exact){const kb=aiKB(v);if(kb){setTimeout(()=>addMsg(kb.a,"a",[[kb.src,kb.h]]),350);return;}}
  const hit=exact||(/점심|식단|메뉴|밥/.test(v)?QA[0]:/1년|우수|성과/.test(v)?QA[1]:QA.find(x=>x.q.split(" ").map(w=>w.replace(/[?]/g,"")).filter(w=>w.length>1&&!/^(어떻게|해|싶어|알려줘|뭐야|찾고|모아줘|오늘|신청은|최근|교수님)$/.test(w)).some(w=>v.includes(w))));
  if(!hit){const ws=v.replace(/[?？.!,]/g," ").split(/\s+/).map(w=>w.replace(/(은|는|이|가|을|를|에|에서|은요|요|해|줘|어디|어떻게|뭐야|알려|하나요|하나)$/,"")).filter(w=>w.length>=2&&!/^(신청|안내|소개|학과|정보|일정|기간|문의|방법|어떻게|알려줘)$/.test(w));
   const R=IDX.filter(r=>r.h&&/^#p-/.test(r.h)).map(r=>({r,n:ws.filter(w=>(r.t+" "+(r.k||"")).includes(w)).length+ws.filter(w=>r.t.includes(w)).length*2})).filter(x=>x.n>0).sort((a,b)=>b.n-a.n).slice(0,2);
   if(R.length){setTimeout(()=>addMsg("‘"+R[0].r.t+"’ 화면에 안내가 있습니다. "+(R[0].r.p||"")+(R[1]?" 함께 ‘"+R[1].r.t+"’ 화면도 보세요.":""),"a",R.map(x=>["세부페이지 · "+x.r.t,x.r.h])),350);return;}}
  setTimeout(()=>addMsg(hit?hit.a:"D안에 실린 공개 자료에서는 답을 찾지 못했습니다 — 통합검색이나 담당 부서에 문의해 주세요.","a",hit?hit.c:null),350);});

/* ---------- 대학·학과 화면 ---------- */
$("#colpage").innerHTML=COLLEGES.map(c=>'<section class="cblock"><div class="chd"><div><span class="eyebrow">'+esc(c.e)+'</span><h2 style="margin-top:4px">'+esc(c.n)+'</h2><p>'+esc(c.i)+' · 학과 '+c.d.length+'개</p></div><a class="icon-btn" href="#colleges">단과대학 소개 보기</a></div><div class="dgrid">'+c.d.map(d=>'<div class="dept"><b>'+esc(d)+'</b><div class="links"><a class="go" href="'+dhref(d)+'"'+EXT+'>학과 홈페이지 ↗</a><a href="https://www.gist.ac.kr/gadm/"'+EXT+'>대학원 입학</a><a href="https://www.gist.ac.kr/uadm/main.html"'+EXT+'>대학 입학</a><a href="#search" data-q="'+esc(d.replace("학과","").replace("대학원",""))+'">학과 안 검색</a></div></div>').join("")+'</div></section>').join("")+'<p class="note">학과 홈페이지는 이번 사업 대상이 아니어서 지금 학과 홈페이지(통합 웹빌더)로 연결됩니다. 단과대학 소개는 대표 홈페이지 안에 둡니다. 학과 홈페이지 주소는 현행 홈페이지(2026.11.10.) 기준이며, 단과대학 한 줄 소개는 현행 홈페이지에 없는 시안용 문구라 각 단과대학 확인이 필요합니다. 학과 순서는 현행 홈페이지 「대학·학과」 메뉴와 같고, 그 메뉴에 함께 있는 <a href="https://www.gist.ac.kr/kr/html/sub03/03010601.html"'+EXT+'>융합기술원 에너지융합대학원 ↗</a>은 단과대학 밖 기관이라 이 목록에 넣지 않았습니다.</p>';

/* ---------- 반영표 ---------- */
$("#rbody").innerHTML=REF.map((r,i)=>'<tr><td><span class="rp-no" aria-label="'+r[0]+'">'+(i+1)+'</span></td><td>'+esc(r[1])+'</td><td class="who">'+esc(r[2])+'</td><td>'+esc(r[3])+'</td><td><span class="pill'+(r[4]==="반영"?"":" w")+'">'+esc(r[4])+'</span></td><td><a class="rp-go" href="#'+r[5].split("|")[0]+'" data-go="'+esc(r[5])+'">그 화면으로 →</a></td></tr>').join("");
document.addEventListener("click",e=>{const t=e.target.closest(".tag");if(t){e.preventDefault();location.hash="reflect";}});

/* ---------- 반영 표시 ---------- */
let tagsOn=false;try{tagsOn=localStorage.getItem("d2tags")==="1"}catch(_){}
function setTags(v){tagsOn=v;document.documentElement.classList.toggle("show-tags",v);const b=$("#tagbtn");b.setAttribute("aria-pressed",v);b.textContent=v?"반영 표시 끄기":"반영 표시 켜기";try{localStorage.setItem("d2tags",v?"1":"0")}catch(_){}}
$("#tagbtn").addEventListener("click",()=>setTags(!tagsOn));setTags(tagsOn);

addEventListener("resize",()=>{drawBanner();drawThumbs();});
/* ===== v3 ===== */
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
/* 학과 띠 */
const ALLD=COLLEGES.flatMap(c=>c.d);
$("#mq").innerHTML=[...ALLD,...ALLD].map(d=>'<a href="#d-'+DURL[d]+'">'+esc(d)+'</a>').join("");
/* 메가메뉴 */
const MEGA=[
 ["About GIST","비전 2053부터 조직, 찾아오시는 길까지",[["GIST는",["총장 인사말","비전·연혁","GIST 상징"]],["조직",["조직도","부서별 업무·연락처","부속기관"]],["정보공개",["경영공시","규정","감사"]],["방문",["찾아오시는 길","3D 캠퍼스맵","오룡관 예약"]]]],
 ["교육","대학·학과 — 4개 단과대학, 13개 학과와 AI정책전략대학원",[["AI대학",COLLEGES[0].d],["자연과학대학",COLLEGES[1].d],["공과대학",COLLEGES[2].d],["생명·의과학융합대학",COLLEGES[3].d]]],
 ["입학","학사·대학원 입학 안내",[["대학",["입학 전형","모집 요강","입학 상담"]],["대학원",["전형 안내","연구실 찾기","외국인 입학"]],["장학",["장학 제도","등록금"]],["체험",["캠퍼스 투어","학과 둘러보기"]]]],
 ["연구","연구소·연구성과·산학협력",[["연구소",["부설 연구소","연구센터"]],["분야",["연구 분야","공동 연구장비"]],["산학협력",["기술이전","창업 지원","공동연구 문의"]]]],
 ["대학생활","학사일정부터 생활관까지",[["학사",["학사일정","수강신청","증명서 발급"]],["학생 생활",["생활관","상담센터","학생기구"]],["교직원",["학사 한 장","포털·ZEUS","업무별 담당부서"]],["안전",["안전 안내","통합경비"]]]],
 ["미디어센터","지금, 지스트 — 보도자료·행사·영상",[["지금, 지스트",["보도자료","연구성과","사람","캠퍼스","영상"]],["알림",["공지","행사"]],["홍보",["홍보 영상","브로슈어"]],["SNS",["유튜브","인스타그램"]]]]
];
let mt=null;
function openMega(i){const m=MEGA[i];$("#megaw").innerHTML='<div class="lead"><b>'+esc(m[0])+'</b><span>'+esc(m[1])+'</span></div>'+m[2].map(g=>'<div><h4>'+esc(g[0])+'</h4><ul>'+g[1].map(x=>'<li><a href="'+(i===1?(DURL[x]?'#d-'+DURL[x]:'#colleges'):x.includes('튜토리얼')?'#tutorial':MEGA[5][2][0][1].includes(x)?'#story':'#home')+'">'+esc(x)+'</a></li>').join("")+'</ul></div>').join("");$("#mega").classList.add("on");$$(".gnb a").forEach(a=>a.classList.toggle("open",a.dataset.m==i));}
function closeMega(){$("#mega").classList.remove("on");$$(".gnb a").forEach(a=>a.classList.remove("open"));}
$$(".gnb a").forEach(a=>{a.addEventListener("mouseenter",()=>{clearTimeout(mt);openMega(+a.dataset.m)});a.addEventListener("focus",()=>openMega(+a.dataset.m));});
$("header.hd").addEventListener("mouseleave",()=>{mt=setTimeout(closeMega,160)});
$("#mega").addEventListener("mouseenter",()=>clearTimeout(mt));
$("#mega").addEventListener("click",e=>{if(e.target.closest("a"))closeMega()});
/* 유리 머리 + 위로 */
addEventListener("scroll",()=>{const y=scrollY;$("header.hd").classList.toggle("glass",y>10);$("#toTop").classList.toggle("on",y>700);},{passive:true});
/* 삼성 인터넷: 스크롤하면 브라우저가 화면 아래 가운데에 위·아래 단추 두 개를 띄움 → 그동안 아래 탭을 그 위로 올림 */
if(/SamsungBrowser/i.test(navigator.userAgent)||/[?&]sb=1/.test(location.search)){const tb=$(".tabbar");let tt=0;if(tb)addEventListener("scroll",()=>{tb.classList.add("lift");clearTimeout(tt);tt=setTimeout(()=>tb.classList.remove("lift"),3200);},{passive:true});}
$("#toTop").addEventListener("click",()=>{lenis?lenis.scrollTo(0):scrollTo({top:0,behavior:"smooth"})});
/* 마우스 빛 */
document.addEventListener("pointermove",e=>{const c=e.target.closest&&e.target.closest(".col");if(!c)return;const r=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px");});

/* 빠른 검색 */
const CMDX=[...COLLEGES.map(c=>({s:"col",site:"단과대학",t:c.n,p:c.i,k:c.d.join(" "),h:"#colleges"})),...ALLD.map(d=>({s:"col",site:"학과",t:d,p:"학과 홈페이지 · 입학 · 교수진",k:"학과",h:"#colleges"})),...IDX.map(r=>({...r,h:"#search"}))];
const CS=[["all","전체"],["col","대학·학과"],["main","대표"],["dept","학과 홈페이지"],["rule","규정·안내"],["sns","SNS"]];let cs="all",csel=0,cl=[];
$("#cmds").innerHTML=CS.map(c=>'<button type="button" data-s="'+c[0]+'" aria-pressed="'+(c[0]==="all")+'">'+c[1]+'</button>').join("");
function cmdRender(){const q=$("#cmdq").value.trim();cl=smart(CMDX,q,r=>cs==="all"||r.s===cs).slice(0,9);csel=0;
 $("#cmdl").innerHTML=cl.length?cl.map((r,i)=>'<li><a href="'+r.h+'" data-i="'+i+'" class="'+(i===0?"sel":"")+'"><span class="t"><b>'+hl(r.t,q)+'</b><small>'+esc(r.site)+' · '+esc(r.p)+'</small></span><span class="s'+(r.s==="dept"?" d":"")+'">'+({col:"대학·학과",main:"대표",dept:"학과 홈페이지",rule:"규정·안내",sns:"SNS"}[r.s])+'</span></a></li>').join(""):'<li style="padding:18px;color:var(--mute)">결과가 없습니다. AI 안내에 물어보세요.</li>';}
function openCmd(){$("#cmd").hidden=false;$("#cmdq").value="";cmdRender();setTimeout(()=>$("#cmdq").focus(),20);lenis&&lenis.stop();}
function closeCmd(){$("#cmd").hidden=true;lenis&&lenis.start();}
$("#cmdbtn").addEventListener("click",openCmd);
$("#cmdq").addEventListener("input",cmdRender);
$("#cmds").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;cs=b.dataset.s;$$("#cmds button").forEach(x=>x.setAttribute("aria-pressed",x===b));cmdRender();});
$("#cmd").addEventListener("click",e=>{if(e.target.id==="cmd"||e.target.closest("#cmdl a")||e.target.id==="cmdall"){if(e.target.id==="cmdall"){$("#q").value=$("#cmdq").value;}closeCmd();}});
document.addEventListener("keydown",e=>{
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("#cmd").hidden?openCmd():closeCmd();}
 if($("#cmd").hidden)return;
 if(e.key==="Escape")closeCmd();
 if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();csel=(csel+(e.key==="ArrowDown"?1:-1)+cl.length)%Math.max(cl.length,1);$$("#cmdl a").forEach((a,i)=>a.classList.toggle("sel",i===csel));}
 if(e.key==="Enter"&&cl[csel]){location.hash=cl[csel].h.slice(1);closeCmd();}
});

/* 부드러운 스크롤 */
let lenis=null;
if(window.Lenis&&!RM&&matchMedia("(pointer:fine)").matches){lenis=new Lenis({lerp:.11});function raf(t){lenis.raf(t);requestAnimationFrame(raf)}requestAnimationFrame(raf);}

/* WebGL 배너 */
let GL=null;
function initGL(){
 if(!window.THREE||!document.getElementById("gl"))return;const cv=$("#gl");let R;try{R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true,preserveDrawingBuffer:true});}catch(_){return;}
 $("#bn").style.display="none";
 const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(42,1,.1,100);C.position.set(0,0,9);
 const N=2600,pos=new Float32Array(N*3),base=new Float32Array(N*3),col=new Float32Array(N*3);
 for(let i=0;i<N;i++){const t=Math.acos(1-2*(i+.5)/N),f=Math.PI*(1+Math.sqrt(5))*i;const x=Math.sin(t)*Math.cos(f),y=Math.sin(t)*Math.sin(f),z=Math.cos(t);base.set([x,y,z],i*3);pos.set([x*3,y*3,z*3],i*3);const r=Math.random();const c=r<.16?[.86,.15,.08]:[.85+r*.1,.87+r*.08,.9];col.set(c,i*3);}
 const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(pos,3));g.setAttribute("color",new THREE.BufferAttribute(col,3));
 const m=new THREE.PointsMaterial({size:.045,vertexColors:true,transparent:true,opacity:.95,depthWrite:false});
 const P=new THREE.Points(g,m);S.add(P);
 const ring=new THREE.Mesh(new THREE.TorusGeometry(3.9,.012,8,200),new THREE.MeshBasicMaterial({color:0xDC2715}));ring.rotation.x=1.25;S.add(ring);
 const ring2=new THREE.Mesh(new THREE.TorusGeometry(4.6,.006,8,200),new THREE.MeshBasicMaterial({color:0x4F5B54}));ring2.rotation.x=1.1;ring2.rotation.y=.4;S.add(ring2);
 let mx=0,my=0;cv.parentElement.addEventListener("pointermove",e=>{const r=cv.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5;my=(e.clientY-r.top)/r.height-.5;});
 function size(){const r=cv.getBoundingClientRect();if(!r.width)return;R.setPixelRatio(Math.min(devicePixelRatio||1,2));R.setSize(r.width,r.height,false);C.aspect=r.width/r.height;C.updateProjectionMatrix();P.position.x=r.width>520?1.3:0;ring.position.x=ring2.position.x=P.position.x;}
 let CP=null;
 if(THREE.EffectComposer&&THREE.UnrealBloomPass){try{CP=new THREE.EffectComposer(R);CP.addPass(new THREE.RenderPass(S,C));const r0=cv.getBoundingClientRect();CP.addPass(new THREE.UnrealBloomPass(new THREE.Vector2(r0.width||800,r0.height||500),.85,.5,.15));}catch(_){CP=null}}
 const _size=size;size=function(){_size();const r=cv.getBoundingClientRect();if(!r.width)return;if(CP){CP.setPixelRatio&&CP.setPixelRatio(Math.min(devicePixelRatio||1,2));CP.setSize(r.width,r.height);}};
 size();addEventListener("resize",size);if(window.ResizeObserver)new ResizeObserver(()=>size()).observe(cv);
 const shapes=[0,1,2];let target=0,mix=0,t0=performance.now();
 function frame(now){const t=(now-t0)/1000;mix+=(target-mix)*.04;const a=pos;
  for(let i=0;i<N;i++){const bx=base[i*3],by=base[i*3+1],bz=base[i*3+2];
   const w=Math.sin(bx*3+t*1.1)*Math.cos(by*3+t*.9)*.18;
   const r0=3+w, r1=3+Math.sin(bz*8+t*2)*.35, r2=2.2+Math.abs(Math.sin(Math.atan2(by,bx)*3+t*.6))*1.3;
   const s0=Math.max(0,1-Math.abs(mix-0)),s1=Math.max(0,1-Math.abs(mix-1)),s2=Math.max(0,1-Math.abs(mix-2));
   const rr=(r0*s0+r1*s1+r2*s2)/(s0+s1+s2||1);a[i*3]=bx*rr;a[i*3+1]=by*rr;a[i*3+2]=bz*rr;}
  g.attributes.position.needsUpdate=true;
  P.rotation.y=t*.12+mx*.6;P.rotation.x=.2+my*.4;ring.rotation.z=t*.2;ring2.rotation.z=-t*.12;
  (CP?CP.render():R.render(S,C));if(!RM)requestAnimationFrame(frame);}
 requestAnimationFrame(frame);
 GL={set:i=>{target=i;if(RM)requestAnimationFrame(frame);}};
}
initGL();
const BIG=["λ","Qubit","Pain"],META=["01 / 03 · Research","02 / 03 · Research","03 / 03 · Research"];
const _set=setBanner;setBanner=function(i){_set(i);$("#bn-big").textContent=BIG[i];$("#bn-meta").textContent=META[i];GL&&GL.set(i);
 if(window.gsap&&!RM){gsap.fromTo("#bn-bar",{width:"0%"},{width:"100%",duration:5,ease:"none"});gsap.fromTo(["#bn-t","#bn-big"],{y:14},{y:0,duration:.6,ease:"power3.out"});}};
setBanner(0);


/* ===== v4 ===== */
if(window.gsap&&window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
/* 가로 단과대학 패널 */
$("#hzt").insertAdjacentHTML("beforeend",COLLEGES.map((c,i)=>'<div class="panel"><canvas data-p="'+i+'"></canvas><span class="bgn">0'+(i+1)+'</span><div class="pc"><span class="pe">0'+(i+1)+' · '+esc(c.e)+'</span><h2>'+esc(c.n)+'</h2><p>'+esc(c.i)+'</p><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="icon-btn red magnet" href="#colleges">단과대학 소개</a><a class="icon-btn" href="https://www.gist.ac.kr/uadm/main.html"'+EXT+' style="background:transparent;color:#fff;border-color:#3A4047">입학 안내</a></div></div><div class="pd">'+c.d.map(d=>'<a href="#d-'+DURL[d]+'">'+esc(d)+'<span>학과 소개 →</span></a>').join("")+'</div></div>').join(""));
function drawPanels(){$$(".panel canvas").forEach(c=>{const r=c.getBoundingClientRect();if(!r.width)return;const d=Math.min(devicePixelRatio||1,2);c.width=r.width*d;c.height=r.height*d;const x=c.getContext("2d");x.scale(d,d);const W=r.width,H=r.height,k=+c.dataset.p;
  const g=x.createRadialGradient(W*.78,H*.3,0,W*.78,H*.3,Math.max(W,H)*.7);g.addColorStop(0,["rgba(220,39,21,.28)","rgba(79,91,84,.35)","rgba(220,39,21,.22)","rgba(120,40,60,.3)"][k]);g.addColorStop(1,"rgba(17,20,24,0)");x.fillStyle=g;x.fillRect(0,0,W,H);
  x.strokeStyle="rgba(255,255,255,.06)";x.lineWidth=1;for(let i=0;i<14;i++){x.beginPath();x.arc(W*.78,H*.3,40+i*46,0,Math.PI*2);x.stroke();}
  x.fillStyle="rgba(255,255,255,.5)";for(let i=0;i<80;i++){const a=i*2.399+k,rr=60+((i*37)%600);x.beginPath();x.arc(W*.78+Math.cos(a)*rr,H*.3+Math.sin(a)*rr*.6,1.2,0,Math.PI*2);x.fill();}
});}
drawPanels();addEventListener("resize",drawPanels);

/* 지금, 지스트 넘기기 */
let gsw=null;
if(window.Swiper){gsw=new Swiper("#gs",{slidesPerView:1.12,spaceBetween:16,grabCursor:true,keyboard:{enabled:true},a11y:{prevSlideMessage:"이전 이야기",nextSlideMessage:"다음 이야기"},navigation:{prevEl:"#gsp",nextEl:"#gsn"},pagination:{el:"#gspg",type:"progressbar"},breakpoints:{640:{slidesPerView:2.1,spaceBetween:20},1100:{slidesPerView:3,spaceBetween:24}},on:{init:()=>requestAnimationFrame(drawThumbs),resize:()=>requestAnimationFrame(drawThumbs)}});}
else{$("#hstory").style.cssText="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:22px";}
requestAnimationFrame(drawThumbs);

/* 검색창 글자 흘러 나오기 */
(function(){const ex=["신소재공학과 졸업요건","ㅎㄱㅇㄴㅈ (초성으로 학과 찾기)","장학금 신청 기간","환경에너지 연구실","국외출장 신청"];const el=$("#hq");if(!el||RM)return;let i=0,j=0,del=false;
 (function tick(){if(document.activeElement===el||el.value){setTimeout(tick,800);return;}const w=ex[i];j+=del?-1:1;el.placeholder="예) "+w.slice(0,j);if(!del&&j>=w.length){del=true;setTimeout(tick,1600);return;}if(del&&j<=0){del=false;i=(i+1)%ex.length;}setTimeout(tick,del?28:70);})();})();

/* 기울기 카드 */
if(window.VanillaTilt&&matchMedia("(pointer:fine)").matches&&!RM){VanillaTilt.init($$(".sp-grid .sp, #cols .col, .events .ev"),{max:5,speed:600,glare:true,"max-glare":.12,scale:1.01});}

/* 자석 버튼 */
if(window.gsap&&matchMedia("(pointer:fine)").matches&&!RM){$$(".icon-btn.red, .searchbar button, .magnet").forEach(b=>{const xt=gsap.quickTo(b,"x",{duration:.4,ease:"power3"}),yt=gsap.quickTo(b,"y",{duration:.4,ease:"power3"});b.addEventListener("pointermove",e=>{const r=b.getBoundingClientRect();xt((e.clientX-r.left-r.width/2)*.25);yt((e.clientY-r.top-r.height/2)*.35);});b.addEventListener("pointerleave",()=>{xt(0);yt(0);});});}

/* 스크롤 진행 막대 + 가로 넘기기 고정 */
if(window.gsap&&window.ScrollTrigger){
 gsap.to("#progress",{scaleX:1,ease:"none",scrollTrigger:{start:0,end:"max",scrub:.2}});
 ScrollTrigger.matchMedia({"(min-width:1101px)":function(){const tr=$("#hzt");const dist=()=>tr.scrollWidth-innerWidth;
   const tw=gsap.to(tr,{x:()=>-dist(),ease:"none",scrollTrigger:{trigger:"#hz",pin:true,scrub:RM?true:1,end:()=>"+="+dist(),invalidateOnRefresh:true,anticipatePin:1}});
   gsap.to("#hzbar",{scaleX:1,ease:"none",scrollTrigger:{trigger:"#hz",start:"top top",end:()=>"+="+dist(),scrub:true}});
   if(!RM)$$(".panel .pd a").forEach(a=>gsap.from(a,{x:60,ease:"power3.out",scrollTrigger:{trigger:a.closest(".panel"),containerAnimation:tw,start:"left 80%",end:"left 30%",scrub:true}}));
 }});
}

/* 화면 바뀔 때 부드럽게 */
addEventListener("hashchange",()=>{const v=$(".view.on");if(window.gsap&&v&&!RM)gsap.fromTo(v,{y:16},{y:0,duration:.5,ease:"power3.out"});if(window.ScrollTrigger)setTimeout(()=>{ScrollTrigger.refresh();drawPanels();},80);setTimeout(drawThumbs,120);});

/* 3D 배너 빛 번짐 */

/* ===== v5 ===== */
renderOB();
/* 투표 */
const OPTS=[["A안","스토리텔링형 · 큰 광고판 중심",0],["B안","피드형 · 소식이 바로 보임",1],["C안","혼합형 · A와 B 사이",2],["D안","공과대학 제안 · 찾는 정보 먼저 (참고)",3]];
let vsel=-1,vwho=0,tally={};try{tally=JSON.parse(localStorage.getItem("d5vote")||"{}")}catch(_){}
$("#vopts").innerHTML=OPTS.map((o,i)=>'<button type="button" class="vopt'+(i===3?' d':'')+'" aria-pressed="false" data-i="'+i+'"><span class="mini"><canvas data-v="'+i+'"></canvas></span><b>'+o[0]+'</b><span>'+esc(o[1])+'</span></button>').join("");
function drawMini(){$$(".vopt canvas").forEach(c=>{const r=c.getBoundingClientRect();if(!r.width)return;const d=Math.min(devicePixelRatio||1,2);c.width=r.width*d;c.height=r.height*d;const x=c.getContext("2d");x.scale(d,d);const W=r.width,H=r.height,v=+c.dataset.v;x.fillStyle="#F4F5F6";x.fillRect(0,0,W,H);x.fillStyle="#fff";x.fillRect(0,0,W,H*.1);x.fillStyle="#111418";x.fillRect(W*.05,H*.035,W*.12,H*.04);
 if(v===0){x.fillStyle="#2A2F35";x.fillRect(0,H*.1,W,H*.55);x.fillStyle="#fff";x.fillRect(W*.06,H*.42,W*.4,H*.05);x.fillStyle="#DC2715";x.fillRect(W*.06,H*.5,W*.15,H*.04);for(let i=0;i<3;i++){x.fillStyle="#DDE1E5";x.fillRect(W*(.05+i*.31),H*.7,W*.28,H*.25);}}
 if(v===1){for(let i=0;i<6;i++){x.fillStyle=i%2?"#DDE1E5":"#CDD2D6";x.fillRect(W*(.05+(i%3)*.31),H*(.15+Math.floor(i/3)*.42),W*.28,H*.38);}x.fillStyle="#DC2715";x.fillRect(W*.05,H*.15,W*.28,H*.05);}
 if(v===2){x.fillStyle="#2A2F35";x.fillRect(W*.05,H*.15,W*.55,H*.45);for(let i=0;i<2;i++){x.fillStyle="#DDE1E5";x.fillRect(W*.64,H*(.15+i*.235),W*.31,H*.21);}for(let i=0;i<4;i++){x.fillStyle="#CDD2D6";x.fillRect(W*(.05+i*.235),H*.66,W*.21,H*.28);}}
 if(v===3){x.fillStyle="#111418";x.fillRect(W*.05,H*.14,W*.42,H*.07);for(let i=0;i<6;i++){x.strokeStyle=i===0?"#111418":"#CDD2D6";x.lineWidth=1.5;x.strokeRect(W*(.05+(i%3)*.145),H*(.27+Math.floor(i/3)*.12),W*.13,H*.1);}x.fillStyle="#1A1E23";x.fillRect(W*.53,H*.14,W*.42,H*.4);x.strokeStyle="#DC2715";x.beginPath();x.arc(W*.74,H*.34,H*.13,0,7);x.stroke();x.strokeStyle="#111418";x.lineWidth=2;x.strokeRect(W*.05,H*.6,W*.9,H*.08);for(let i=0;i<4;i++){x.fillStyle="#fff";x.fillRect(W*(.05+i*.23),H*.74,W*.21,H*.2);}}
});}
$("#vopts").addEventListener("click",e=>{const b=e.target.closest(".vopt");if(!b)return;vsel=+b.dataset.i;$$(".vopt").forEach(x=>x.setAttribute("aria-pressed",x===b));});
$("#vwho").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;vwho=[...b.parentNode.children].indexOf(b);$$("#vwho button").forEach(x=>x.setAttribute("aria-pressed",x===b));});
function renderTally(){const tot=OPTS.reduce((a,o)=>a+((tally[o[0]]||0)),0);$("#vres").innerHTML=OPTS.map(o=>{const n=tally[o[0]]||0;return '<div class="bar"><b>'+o[0]+'</b><span><i style="width:'+(tot?Math.round(n/tot*100):0)+'%"></i></span><span class="num">'+n+'</span></div>';}).join("")+'<p class="num" style="margin:4px 0 0">합계 '+tot+'표 · 교직원 '+(tally._s||0)+' · 학생 '+(tally._u||0)+'</p>';}
$("#vform").addEventListener("submit",e=>{e.preventDefault();if(vsel<0){$("#vdone").innerHTML='<div class="done" style="background:var(--red-t);color:var(--red-d)">시안을 하나 골라 주세요.</div>';return;}const k=OPTS[vsel][0];tally[k]=(tally[k]||0)+1;if(vwho===0)tally._s=(tally._s||0)+1;else tally._u=(tally._u||0)+1;try{localStorage.setItem("d5vote",JSON.stringify(tally))}catch(_){}renderTally();$("#vdone").innerHTML='<div class="done">'+(vwho===0?"교직원":"학생")+' · '+k+' 에 투표했습니다(시연 · 이 화면에만 남음).</div>';$("#vtxt").value="";});
renderTally();

/* 배너 규격 */
const BF=[["PC","16/6"],["태블릿","4/3"],["휴대폰","4/5"]];let bsel=0;
$("#bframes").innerHTML=BF.map((f,i)=>'<div class="bf"><span>'+f[0]+'</span><div class="dev"><div class="scr" style="aspect-ratio:'+f[1]+'"><canvas data-b="'+i+'"></canvas><div class="safe"></div></div><div class="cap"><b id="bcap'+i+'">'+esc(BN[0][1])+'</b>'+esc(BN[0][0])+'</div></div></div>').join("");
function drawBF(){$$(".bf canvas").forEach(c=>{const r=c.getBoundingClientRect();if(!r.width)return;const d=Math.min(devicePixelRatio||1,2);c.width=r.width*d;c.height=r.height*d;const x=c.getContext("2d");x.scale(d,d);const W=r.width,H=r.height;
 const g=x.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.max(W,H)*.7);g.addColorStop(0,"#3A1317");g.addColorStop(1,"#0E1013");x.fillStyle=g;x.fillRect(0,0,W,H);
 const R=Math.min(W,H)*.32;for(let k=0;k<7;k++){x.beginPath();x.arc(W/2,H/2,R*(1-k*.12),0,7);x.strokeStyle=k===0?"#DC2715":"rgba(255,255,255,"+(0.08+k*.02)+")";x.lineWidth=k===0?2.5:1;x.stroke();}
 for(let i=0;i<160;i++){const a=i*2.399,rr=R*Math.sqrt((i+.5)/160);x.fillStyle=i%9===0?"#DC2715":"rgba(255,255,255,.75)";x.fillRect(W/2+Math.cos(a)*rr,H/2+Math.sin(a)*rr*.95,1.6,1.6);}
 x.fillStyle="rgba(255,255,255,.9)";x.font="800 "+Math.max(14,Math.min(W,H)*.14)+"px Inter Tight, sans-serif";x.textAlign="center";x.fillText(["λ","Qubit","Pain"][bsel],W/2,H/2+Math.min(W,H)*.05);
});}
$("#bsel").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;bsel=[...b.parentNode.children].indexOf(b);$$("#bsel button").forEach(x=>x.setAttribute("aria-pressed",x===b));BF.forEach((_,i)=>{$("#bcap"+i).textContent=BN[bsel][1];$("#bcap"+i).nextSibling.textContent=BN[bsel][0];});drawBF();});
addEventListener("resize",()=>{drawMini();drawBF();});

/* AI 답 타자 효과 */
const _add=addMsg;addMsg=function(t,who,cites){if(who!=="a"||RM){_add(t,who,cites);return;}const d=document.createElement("div");d.className="m a";$("#msgs").appendChild(d);let i=0;(function step(){i+=2;d.textContent=t.slice(0,i);$("#msgs").scrollTop=1e6;if(i<t.length)setTimeout(step,16);else if(cites){d.insertAdjacentHTML("beforeend",'<div class="cite">'+cites.map(c=>Array.isArray(c)?'<a href="'+esc(c[1])+'"'+(/^https/.test(c[1])?EXT:'')+'>출처 · '+esc(c[0])+(/^https/.test(c[1])?' ↗':'')+'</a>':'<a href="#search">출처 · '+esc(c)+'</a>').join("")+'</div>');}})();};

/* 반영 표시: 손으로 그린 표시 (rough-notation) */
let ann=[];
const ANN={"home":[["#hsearch","box"],[".who","box"],["#pwords","bracket"],["#pmsw","box"],["#need","underline"]],"tutorial":[["#obs","box"],["#qr","circle"]],"search":[["#scope","box"],["#chat","bracket"]],"colleges":[["#cp2list","bracket"]],"vote":[["#vwho","circle"],["#vtxt","underline"]],"banner":[["#bframes .safe","box"]]};
function drawAnn(){ann.forEach(a=>{try{a.remove()}catch(_){}});ann=[];if(!tagsOn||!window.RoughNotation)return;const h=(LH()||"#home").slice(1)||"home";(ANN[h]||[]).forEach(([sel,type])=>{const el=$(sel);if(!el||!el.offsetParent)return;const a=RoughNotation.annotate(el,{type,color:"#DC2715",padding:type==="underline"?2:8,strokeWidth:2.2,animationDuration:RM?0:700,iterations:2,brackets:["left","right"]});a.show();ann.push(a);});}
const _st=setTags;setTags=function(v){_st(v);setTimeout(drawAnn,60);};
addEventListener("hashchange",()=>setTimeout(()=>{drawAnn();drawMini();drawBF();},350));

/* 둘러보기 투어 (driver.js) */
$("#tourbtn").addEventListener("click",()=>{
 if(!(window.driver&&window.driver.js)){location.hash="reflect";return;}
 location.hash="home";setTimeout(()=>{lenis&&lenis.stop();
 const D=window.driver.js.driver({showProgress:true,progressText:"{{current}} / {{total}}",nextBtnText:"다음",prevBtnText:"이전",doneBtnText:"끝",overlayColor:"rgba(17,20,24,.6)",stagePadding:8,stageRadius:14,onDestroyed:()=>{lenis&&lenis.start()},
  steps:[
   {element:".hx2",popover:{title:"① 첫 화면: 사진 한 장 + 짧은 문구",description:"포스텍처럼 글자를 줄이고 사진이 말하게 했습니다. 사진·문구·버튼은 관리자 모드에서 직원이 바로 바꿉니다(업체 요청 없이)."}},
   {element:"#hsearch",popover:{title:"② ⑧ 큰 검색 + 학과 홈페이지까지",description:"첫 화면 바로 아래에 큰 검색. 범위에 '학과 홈페이지'·'SNS'가 있고, 초성(ㅎㄱㅇㄴㅈ)·오타도 찾습니다."}},
   {element:".who",popover:{title:"⑤ 방문자별 메뉴",description:"'GIST Hub' 대신 '예비 학부생·재학생·교직원…'을 고르면 그 사람에게 필요한 메뉴만 모입니다. 메뉴 목록도 관리자 모드에서 고칩니다."}},
   {element:"#myqbox",popover:{title:"⑯ 나만의 바로가기",description:"3차 메뉴 120개를 다 뒤지지 않도록, 자주 쓰는 것을 끌어서 순서를 바꾸고 더하거나 뺍니다(이 기기에만 저장)."}},
   {element:"#pmsw",popover:{title:"③ ⑪ 한눈에 보는 주요 소식",description:"제목은 그림 속에 박지 않고 화면 글자로 올려, 그림이 PC·휴대폰 크기에 맞춰 잘려도 글이 깨지지 않습니다. 넘김 멈춤 버튼도 있습니다."}},
   {element:"#pwords",popover:{title:"④ 이사장님 주문: 학과로 바로",description:"4개 단과대학을 누르면 그 대학 학과 목록으로 가고, 학과마다 지금 학과 홈페이지로 연결됩니다."}},
   {element:"#psns",popover:{title:"⑰ 유튜브·인스타그램 최근 글",description:"공식 유튜브는 실제 최근 영상입니다. 인스타그램은 비즈니스 계정 공식 API로 연결하면 같은 칸에 자동으로 채워집니다."}},
   {element:"#noticeList",popover:{title:"공지·학사일정도 직원이 직접",description:"관리자 모드에서 공지·학사일정·띠 공지·팝업존을 고치고 저장하면 모든 방문자 화면에 바로 반영됩니다."}},
   {element:"#cmdbtn",popover:{title:"빠른 검색 (Ctrl K)",description:"학과·메뉴·튜토리얼·학과 홈페이지 글을 한 번에 찾습니다."}},
   {element:".demo",popover:{title:"더 보기",description:"튜토리얼 온보딩, 투표 미리보기, 배너 규격, 회의 반영표를 이 막대에서 바로 열 수 있습니다."}}
  ]});D.drive();},450);
});

/* ===== v6 ===== */
/* 글자 크기 */
let fz=1;try{fz=+localStorage.getItem("d6fz")||1}catch(_){}if(fz<1){fz=1;try{localStorage.removeItem("d6fz")}catch(_){}}
function setFz(v){fz=Math.max(.9,Math.min(1.3,Math.round(v*10)/10));document.body.style.zoom=fz===1?"":fz;try{localStorage.setItem("d6fz",fz)}catch(_){}if(window.ScrollTrigger)setTimeout(()=>ScrollTrigger.refresh(),60);}
$("#fzm").addEventListener("click",()=>setFz(fz-.1));$("#fz0").addEventListener("click",()=>setFz(1));$("#fzp").addEventListener("click",()=>setFz(fz+.1));setFz(fz);

/* 나만의 바로가기 (SortableJS) */
const QPOOL=[["학사일정","calendar-days","#search"],["증명서 발급","file-badge","#search"],["포털","log-in","#home"],["ZEUS","wallet","#home"],["그룹웨어","messages-square","#home"],["웹메일","mail","#home"],["도서관","library","#home"],["생활관","bed-double","#search"],["장학 정보","award","#search"],["3D 캠퍼스맵","map","#home"],["학사 한 장","layout-grid","#tutorial"],["학과 홈페이지","graduation-cap","#colleges"],["오룡관 예약","building","#home"],["상담센터","heart-handshake","#home"]];
let myq=["학사일정","증명서 발급","포털","학과 홈페이지","학사 한 장","장학 정보"];try{const v=JSON.parse(localStorage.getItem("d6myq")||"null");if(Array.isArray(v)&&v.length)myq=v}catch(_){}
const qget=n=>QPOOL.find(q=>q[0]===n);
function qchip(q,pool){return '<a class="qi" href="'+q[2]+'" data-n="'+esc(q[0])+'"><i data-lucide="'+q[1]+'"></i>'+esc(q[0])+(pool?' +':'<button type="button" class="x" aria-label="'+esc(q[0])+' 빼기">×</button>')+'</a>';}
function renderMyq(){$("#myq").innerHTML=myq.map(qget).filter(Boolean).map(q=>qchip(q,false)).join("");$("#myqpool").innerHTML=QPOOL.filter(q=>!myq.includes(q[0])).map(q=>qchip(q,true)).join("")||'<span style="font-size:13px;color:var(--mute)">모두 담았습니다.</span>';if(window.lucide)lucide.createIcons();}
function saveMyq(){try{localStorage.setItem("d6myq",JSON.stringify(myq))}catch(_){}}
renderMyq();
if(window.Sortable)Sortable.create($("#myq"),{animation:180,ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",onEnd:()=>{myq=$$("#myq .qi").map(a=>a.dataset.n);saveMyq();}});
$("#myqedit").addEventListener("click",()=>{const box=$("#myqbox");const on=!box.classList.contains("editing");box.classList.toggle("editing",on);$("#myqpool").hidden=!on;$("#myqedit").textContent=on?"완료":"편집";});
$("#myqbox").addEventListener("click",e=>{const x=e.target.closest(".x");if(x){e.preventDefault();myq=myq.filter(n=>n!==x.closest(".qi").dataset.n);saveMyq();renderMyq();return;}const pa=e.target.closest("#myqpool .qi");if(pa){e.preventDefault();myq.push(pa.dataset.n);saveMyq();renderMyq();}if($("#myqbox").classList.contains("editing")&&e.target.closest("#myq .qi"))e.preventDefault();});

/* 메뉴 구조도 (ECharts) */
let mchart=null,dchart=null,ecP=null;
function loadEC(){if(window.echarts)return Promise.resolve();if(ecP)return ecP;ecP=new Promise((ok,no)=>{const sc=document.createElement("script");sc.src="https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js";sc.onload=ok;sc.onerror=no;document.head.appendChild(sc);});return ecP;}
const leafs=MEGA.flatMap(m=>m[2].flatMap(g=>g[1]));
$("#mcnt").textContent=leafs.length;
const seen={};leafs.forEach(x=>seen[x]=(seen[x]||0)+1);const dups=Object.keys(seen).filter(k=>seen[k]>1);$("#mdup").textContent=dups.length;
function drawMenu(){if(!window.echarts){if($("#mtree").offsetParent)loadEC().then(drawMenu).catch(()=>{});return;}const el=$("#mtree");if(!el.offsetParent)return;if(!mchart)mchart=echarts.init(el,null,{renderer:"canvas"});
 const data={name:"GIST",itemStyle:{color:"#DC2715",borderColor:"#DC2715"},children:MEGA.map(m=>({name:m[0],itemStyle:{color:"#111418",borderColor:"#111418"},children:m[2].map(g=>({name:g[0],itemStyle:{color:"#4F5B54",borderColor:"#4F5B54"},children:g[1].map(x=>({name:x,itemStyle:{color:"#fff",borderColor:"#CDD2D6"}}))}))}))};
 const narrow=el.clientWidth<700;
 mchart.setOption({tooltip:{trigger:"item",triggerOn:"mousemove",formatter:p=>esc(p.name)},series:[{type:"tree",data:[data],layout:"radial",symbol:"circle",symbolSize:(v,p)=>p.data.children?(p.data.name==="GIST"?22:12):7,initialTreeDepth:narrow?2:3,roam:true,animationDuration:700,animationDurationUpdate:500,expandAndCollapse:true,label:{fontFamily:"Noto Sans KR, sans-serif",fontSize:narrow?10:11.5,color:"#111418"},lineStyle:{color:"#CDD2D6",width:1.2,curveness:.5},emphasis:{focus:"descendant"}}]});
 mchart.resize();}
function drawDonut(){if(!window.echarts){if($("#donut").offsetParent)loadEC().then(drawDonut).catch(()=>{});return;}const el=$("#donut");if(!el.offsetParent)return;if(!dchart)dchart=echarts.init(el);
 const c={};REF.forEach(r=>{const k=r[4]==="반영"?"반영":"반영 · 협의·검토 중";c[k]=(c[k]||0)+1;});const tot=REF.length;
 const items=[{name:"반영",value:c["반영"]||0,itemStyle:{color:"#DC2715"}},{name:"반영 · 협의·검토 중",value:c["반영 · 협의·검토 중"]||0,itemStyle:{color:"#4F5B54"}}];
 dchart.setOption({series:[{type:"pie",radius:["58%","84%"],avoidLabelOverlap:true,label:{show:true,position:"center",formatter:()=>tot+"건",fontSize:28,fontWeight:800,fontFamily:"Inter Tight, sans-serif",color:"#111418"},labelLine:{show:false},data:items,animationDuration:900}]});dchart.resize();
 $("#dleg").innerHTML=items.map(i=>'<span><i style="background:'+i.itemStyle.color+'"></i>'+esc(i.name)+' <b class="num">'+i.value+'건</b></span>').join("")+'<span style="color:var(--mute);font-size:13px">협의·검토 중: 학과 검색 색인(지오넷), AI 검색 범위, 연구자 정보 공개 범위</span>';}
addEventListener("hashchange",()=>setTimeout(()=>{drawMenu();drawDonut();},380));
addEventListener("resize",()=>{mchart&&mchart.resize();dchart&&dchart.resize();});
setTimeout(()=>{drawMenu();drawDonut();},300);

/* 반영 번호표 말풍선 (Tippy) */
if(window.tippy){$$(".tag").forEach(t=>{const r=REF.find(x=>x[0]===t.querySelector("b")?.textContent);if(!r)return;tippy(t,{content:'<b>'+r[0]+' 회의에서</b><br>'+esc(r[1])+'<br><span style="color:#AEB5BC">— '+esc(r[2])+'</span><br><br><b>D안</b> '+esc(r[3]),allowHTML:true,theme:"gist",maxWidth:320,placement:"bottom-start",delay:[80,0]});});}

/* 투표하면 축하 */
$("#vform").addEventListener("submit",()=>{if(vsel>=0&&window.confetti&&!RM)confetti({particleCount:90,spread:70,origin:{y:.75},colors:["#DC2715","#111418","#4F5B54","#FFFFFF"],disableForReducedMotion:true});});

/* ===== SNS 연동 (시연: 예시 글, 실제 연결 없음) ===== */
const SNS=[
 {p:"yt",t:"어느 과학기술원 철학 교수의 치열했던 2026년 여름, in Paris",d:"11.2.",k:"철학 예술 파리 교수",u:"https://www.youtube.com/watch?v=NNe4xQmqt0c"},
 {p:"ig",t:"[GIST 사회공헌아카데미 강연] 「놀라움을 바라본다: 반복된 일상이 놀라움이 될 때」 11.10.(화) 19:00 오룡관 다산홀",d:"11.5.",k:"사회공헌아카데미 특별강연 과학기술문화 페스타 오룡관 다산홀",u:"https://www.instagram.com/p/DfV4dl1mW47/"},
 {p:"ig",t:"GIST 오룡아트홀 2026년 제4회 초대전 《아직 경험하지 못한 감각의 순간들》 11.2.~12.30.",d:"11.5.",k:"오룡아트홀 초대전 전시 미디어아트 AI아트",u:"https://www.instagram.com/p/DfVlmNFk5my/"},
 {p:"ig",t:"“나는 자연인… 아니, 자연대인이다!” 2026 자연대인의 밤",d:"11.4.",k:"자연대인의 밤 자연과학대학 행사",u:"https://www.instagram.com/p/DfUDsiyE9i_/"},
 {p:"yt",t:"11월 5일(목), 해리안·윤소안이 GIST에 찾아옵니다! (쇼츠)",d:"10.31.",k:"공연 과학기술문화 페스타 쇼츠",u:"https://www.youtube.com/shorts/-atqdlLQgJU"},
 {p:"yt",t:"가을이 살랑이는 자리, 잠시 머물다 | G금 이 순간",d:"10.30.",k:"가을 캠퍼스 핑크뮬리 풍경",u:"https://www.youtube.com/watch?v=Bnl29z7cpgo"},
 {p:"yt",t:"Here at GIST #2｜이곳, 지스트에서",d:"10.29.",k:"연구실 캠퍼스 일상",u:"https://www.youtube.com/watch?v=0nsRSqaYsuA"},
 {p:"yt",t:"“연구를 넘어, 더 큰 도전을 시작했어요” | 짙터뷰 EP.02",d:"10.23.",k:"창업 AI 스타트업 인터뷰",u:"https://www.youtube.com/shorts/WL1jr5hjHGc"},
 {p:"yt",t:"자율주행 AI가 사람을 도로로 착각한다고? AI 허점 찾아내는 신기술 ‘LSAA’",d:"10.21.",k:"자율주행 AI LSAA 연구",u:"https://www.youtube.com/watch?v=dz2TRiqef2k"},
 {p:"yt",t:"[GGUN-log] GIST 학생이 보스턴에 가면 생기는 일 | 보스턴 대학교 여름학기 브이로그",d:"10.13.",k:"해외 파견 보스턴 여름학기 학생",u:"https://www.youtube.com/watch?v=UzUFgumTbck"},
 {p:"yt",t:"GIST와 함께하는 ‘2026 찾아가는 과학캠프’｜해남산이중학교",d:"9.21.",k:"과학캠프 사회공헌 피움",u:"https://www.youtube.com/watch?v=CwaRSCpNWto"},
 {p:"ig",t:"알록달록 물든 단풍 아래 피어나는 소소한 여유 — 누구에게나 열려 있는 GIST의 가을길",d:"11.3.",k:"가을 단풍 캠퍼스 풍경 산책",u:"https://www.instagram.com/p/DfRMDNGE5dZ/"},
 {p:"ig",t:"[GIST 시네마 콘서트] 한스 짐머 영화음악 라이브 & 영화 <인터스텔라> 상영 — 11.7.(토) 기계로봇공학동 앞 잔디밭",d:"11.3.",k:"시네마 콘서트 영화음악 인터스텔라 과학기술문화 페스타",u:"https://www.instagram.com/p/DfQwkabE3TR/"},
 {p:"ig",t:"NOVEMBER CALENDAR — 2026년 11월 GIST 주요 일정",d:"10.31.",k:"11월 학사일정 설립기념일 청구논문 겨울학기",u:"https://www.instagram.com/p/DfI0daXD_MM/"}
];
const IGI='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>';
const YTI='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z" fill="currentColor"/></svg>';
function snsCard(x,i,tag){return '<'+(tag||'button type="button"')+' class="sc '+x.p+'" data-i="'+i+'"><span class="th">'+(x.img?'<img src="'+x.img+'" alt="" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">':'<canvas data-s="'+i+'"></canvas>')+'<span class="pf">'+(x.p==="ig"?IGI+"Instagram":x.p==="fb"?"Facebook":YTI+"YouTube")+'</span>'+(x.p==="yt"?'<span class="play"><span><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span></span>':'')+'</span><span class="bd"><b>'+esc(x.t)+'</b><small>'+esc(x.d)+(x.p==="yt"?' · 공식 유튜브':x.p==="fb"?' · 페이스북':' · 인스타그램')+'</small></span></'+(tag?tag.split(" ")[0]:'button')+'>';}
function drawSns(){$$(".sc canvas").forEach(c=>{const r=c.getBoundingClientRect();if(!r.width)return;const d=Math.min(devicePixelRatio||1,2);c.width=r.width*d;c.height=r.height*d;const x=c.getContext("2d");x.scale(d,d);const W=r.width,H=r.height,i=+c.dataset.s,s=SNS[i];
 const g=x.createLinearGradient(0,0,W,H);const pal=[["#2A1114","#DC2715"],["#111418","#4F5B54"],["#1A1E23","#7A2A22"],["#20262B","#3A4047"]][i%4];g.addColorStop(0,pal[0]);g.addColorStop(1,pal[1]);x.fillStyle=g;x.fillRect(0,0,W,H);
 x.globalAlpha=.18;x.fillStyle="#fff";for(let k=0;k<6;k++){x.beginPath();x.arc(W*(.2+((i*37+k*29)%60)/100),H*(.2+((i*53+k*17)%60)/100),Math.min(W,H)*(.08+k*.03),0,7);x.fill();}x.globalAlpha=1;
 x.fillStyle="rgba(255,255,255,.92)";x.font="800 "+Math.max(14,W*.09)+"px Inter Tight, sans-serif";x.fillText(s.p==="ig"?"#GIST":"GIST TV",14,H-16);});}
let snsF="전체",snsSw=null;
function renderSns(){const L=SNS.map((x,i)=>[x,i]).filter(([x])=>snsF==="전체"||(snsF==="인스타그램"?x.p==="ig":x.p==="yt"));$("#snsgrid").innerHTML=L.map(([x,i])=>snsCard(x,i)).join("");
 const ig=SNS.findIndex(x=>x.p==="ig"),yt=SNS.findIndex(x=>x.p==="yt");$("#snsmini").innerHTML=snsCard(SNS[ig],ig)+snsCard(SNS[yt],yt);requestAnimationFrame(drawSns);}
$("#snsf").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;snsF=b.textContent;$$("#snsf button").forEach(x=>x.setAttribute("aria-pressed",x===b));renderSns();});
function openSns(i){$("#snsw").innerHTML=SNS.map((x,k)=>'<div class="swiper-slide">'+snsCard(x,k,'div role="group"')+'</div>').join("");$("#snsv").hidden=false;lenis&&lenis.stop();
 if(snsSw){snsSw.destroy(true,true);snsSw=null;}if(window.Swiper){snsSw=new Swiper("#snssw",{initialSlide:i,keyboard:{enabled:true},on:{slideChange:w=>{$("#snscnt").textContent=(w.activeIndex+1)+" / "+SNS.length;$("#snsgo").href=SNS[w.activeIndex].u;}}});}
 $("#snscnt").textContent=(i+1)+" / "+SNS.length;$("#snsgo").href=SNS[i].u;requestAnimationFrame(drawSns);setTimeout(()=>$("#snsclose").focus(),30);}
function closeSns(){$("#snsv").hidden=true;lenis&&lenis.start();}
document.addEventListener("click",e=>{const c=e.target.closest(".sc");if(c&&!c.closest("#snsv")){e.preventDefault();openSns(+c.dataset.i);}});
$("#snsclose").addEventListener("click",closeSns);$("#snsv").addEventListener("click",e=>{if(e.target.id==="snsv")closeSns();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#snsv").hidden)closeSns();});
renderSns();addEventListener("resize",drawSns);addEventListener("hashchange",()=>setTimeout(drawSns,300));
/* 검색·빠른검색에 SNS 글 넣기 */
SNS.filter(x=>x.d!=="—").forEach(x=>{const r={s:"sns",site:x.p==="ig"?"인스타그램":"GIST 공식 유튜브",t:x.t,p:x.d+" 올림 · "+(x.p==="ig"?"GIST 공식 인스타그램 실제 글":"공식 채널 RSS에서 가져온 실제 영상"),k:x.k,u:x.u};IDX.push(r);CMDX.push({...r,h:"#story"});});
fuseCache.clear();

/* ===== v9 오른쪽 빠른 버튼 ===== */
$("#rl-search").addEventListener("click",()=>openCmd());
$("#smapg").innerHTML=MEGA.map((m,i)=>'<div><h3>'+esc(m[0])+'</h3>'+m[2].map(g=>'<h4>'+esc(g[0])+'</h4>'+g[1].map(x=>'<a href="'+(i===1&&DURL[x]?dhref(x):'#home')+'"'+(i===1&&DURL[x]?EXT:'')+'>'+esc(x)+'</a>').join("")).join("")+'</div>').join("");
function openSmap(){$("#smap").hidden=false;lenis&&lenis.stop();setTimeout(()=>$("#smapx").focus(),20);}
function closeSmap(){$("#smap").hidden=true;lenis&&lenis.start();}
$("#rl-menu").addEventListener("click",openSmap);$("#smapx").addEventListener("click",closeSmap);
$("#smap").addEventListener("click",e=>{if(e.target.closest("a"))closeSmap();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#smap").hidden)closeSmap();});
if(window.tippy)tippy(".rail [data-tip]",{content:r=>r.dataset.tip,placement:"left",theme:"gist"});
/* 아이콘 */
function icons(){window.lucide&&lucide.createIcons({attrs:{"stroke-width":2}});}
icons();

/* ===== v10: 포스텍·유니스트식 첫 화면 ===== */
const IMG=n=>{const W=["aerial", "ba_20261113c", "bikes", "campus_air", "campus_pano", "campus_plaza", "d_ai", "d_aix", "d_ax", "d_bmse", "d_chem", "d_eecs2", "d_env1", "d_intnscphys", "d_life", "d_math", "d_me", "d_mse", "d_physics", "d_semi", "g_223964", "g_224126", "g_224200", "g_224433", "g_224442", "g_224454", "g_224455", "g_224500", "g_224519", "g_224547", "g_224564", "g_224601", "g_224617", "g_224635", "gal_gate", "gal_night", "hall", "hero_autumn", "hv", "hv2", "hv3", "hv4", "hvm", "hx_a", "hx_b", "hx_c", "hxm_a", "hxm_b2", "hxm_b3", "hxm_c", "hxm_t", "interior", "lecture", "library", "lt_g", "lt_i", "lt_s", "lt_t", "mg_adm", "mg_campus", "mg_res", "p_aerial_day", "p_bldg", "p_curve", "p_gate", "p_night", "p_night2", "p_pano_night", "pv_search", "pv_story", "pv_tut", "r_pain", "r_quantum", "r_spectro", "street", "yt_-atqdlLQgJU", "yt_0nsRSqaYsuA", "yt_Bnl29z7cpgo", "yt_QPWfteRXGvY", "yt_UzUFgumTbck", "yt_dz2TRiqef2k"];const b=String(n).replace(/\.(jpe?g|png)$/i,"");return "img/"+(W.indexOf(b)>=0?b+".webp":n)};
const NOTICES=[
 {k:"채용",t:"2026년도 제3차 광주과학기술원 전임교원 초빙 공고",d:"10.28."},
 {k:"행사",t:"[과학기술문화페스타] 수리과학과 특별강연 「수학으로 먹고살기」",d:"11.05."},
 {k:"안내",t:"[과학기술정보통신부] 2026 대한민국 딥테크 사업화 페스티벌 개최 안내",d:"11.04."},
 {k:"모집",t:"[첨단AI반도체팹센터] GIST-imec 글로벌 인턴십 연수생 모집 (11/2~12/7)",d:"10.30."},
 {k:"모집",t:"[창업진흥센터] 2026-27 겨울학기 CUop 산학협력인턴십 참여 학생 모집",d:"10.29."}];
const EVENTS=[
 {d:"11.17",w:"TUE",t:"광주과학기술원 설립기념일"},
 {d:"11.27",w:"FRI",t:"겨울학기 개설교과목(안) 제출마감"},
 {d:"11.30",w:"MON",t:"학사학위 및 석사학위 청구논문(심사용) 제출마감 (2027년 2월 졸업예정자)"},
 {d:"12.04",w:"FRI",t:"2027학년도 봄학기 교과과정 편성(안) 제출마감"}];
const NURL="https://www.gist.ac.kr/kr/html/sub06/060101.html";
function renderNotices(){
 $("#noticeList").innerHTML=NOTICES.map(n=>'<li><span class="k">'+esc(n.k)+'</span><a href="'+esc(n.u||NURL)+'" target="_blank" rel="noopener noreferrer">'+esc(n.t)+'</a><time class="num">'+esc(n.d)+'</time></li>').join("");
 $("#eventList").innerHTML=EVENTS.map(e=>'<a class="ev" href="#"><span class="d num">'+esc(e.d)+'<small>'+esc(e.w)+'</small></span><b>'+esc(e.t)+'</b></a>').join("");
}
renderNotices();

/* 방문자 메뉴: 큰 타일 */
const NICON={"입학":"graduation-cap","학과":"building-2","장학":"award","생활관":"bed","캠퍼스":"map","연구실":"flask-conical","등록금":"wallet","외국인":"globe","학사일정":"calendar","상담":"heart-handshake","증명서":"file-text","수강":"book-open","튜토리얼":"layout-grid","규정":"scale","포털":"monitor","담당부서":"phone","오룡관":"calendar-check","공동연구":"handshake","기술이전":"lightbulb","연구자":"search","창업":"rocket","발전기금":"gift"};
function nic(x){for(const k in NICON)if(x.includes(k))return NICON[k];return "arrow-up-right";}
renderNeed=function(w){
 $("#audName").textContent=WHO[w];
 $("#need").innerHTML=NEED[w].map(x0=>{const pr=String(x0).split("|");const x=pr[0].trim(),u=(pr[1]||"").trim();const href=u&&/^(https:\/\/|#)/.test(u)?u:(typeof leafHref==="function"&&leafHref(x))||(x.includes("튜토리얼")?"#tutorial":(x.includes("학과")||x.includes("연구실"))?"#colleges":"#search");
  return '<a class="tile" href="'+esc(href)+'"'+(/^https/.test(href)?' target="_blank" rel="noopener noreferrer"':'')+(href==="#search"?' data-q="'+esc(x)+'"':'')+'><span class="ti"><i data-lucide="'+nic(x)+'"></i></span><span><b>'+esc(x)+'</b></span><span class="ar" aria-hidden="true">→</span></a>';}).join("");
 icons();
 if(window.gsap&&!RM)gsap.from("#need .tile",{y:16,duration:.45,ease:"power3.out",stagger:.04,clearProps:"transform"});
};
renderNeed("ug");

/* GIST TODAY: 두 줄 흐르는 소식 */
const CHC={"연구성과":"c1","사람":"c3","보도자료":"c2","영상":"c4","공지":"c5"};
const TIMG=["r_spectro.jpg","r_quantum.jpg","r_pain.jpg","p_spring.jpg","p_bldg.jpg","p_aerial_day.jpg","p_curve.jpg","p_snowroad.jpg","gal_gate.jpg","p_night2.jpg","gal_night.jpg","yt_dz2TRiqef2k.jpg"];
function tc(s,i){return '<a class="tc" href="'+stH(s)+'" tabindex="-1"><span class="tt"><span class="ch '+(CHC[s.c]||"c2")+'">'+esc(s.c)+'</span><b>'+esc(s.t)+'</b><time class="num">'+esc(s.d)+'</time></span><span class="im"><img src="'+IMG(TIMG[i%TIMG.length])+'" alt="" loading="lazy"></span></a>';}
function renderToday(){
 const A=STORIES.slice(0,6),B=STORIES.slice(6).concat(NOTICES.slice(0,2).map(n=>({c:"공지",t:n.t,d:"2026."+n.d})));
 const r1=A.map((s,i)=>tc(s,i)).join(""),r2=B.map((s,i)=>tc(s,i+6)).join("");
 $("#trow1").innerHTML=r1+r1;$("#trow2").innerHTML=r2+r2;
 [...$$("#trow1 .tc"),...$$("#trow2 .tc")].forEach((a,i,all)=>{const half=a.parentElement.children.length/2;const idx=[...a.parentElement.children].indexOf(a);if(idx>=half)a.setAttribute("aria-hidden","true");else a.removeAttribute("tabindex");});
}
renderToday();
$("#tpause").addEventListener("click",e=>{const t=e.currentTarget.closest(".today");const p=t.classList.toggle("paused");e.currentTarget.setAttribute("aria-pressed",p);e.currentTarget.textContent=p?"흐름 재생":"흐름 멈춤";});
if(RM)$(".today").classList.add("paused");

/* GIST EXCELLENCE: 실제 연구 그림 */
const EXI=["r_spectro.jpg","r_quantum.jpg","r_pain.jpg"];
const _setB=setBanner;setBanner=function(i){_setB(i);const im=$("#excImg");if(im){im.src=IMG(EXI[i]);if(window.gsap&&!RM)gsap.fromTo(im,{scale:1.08},{scale:1,duration:1.2,ease:"power3.out"});}
 const k=BN[i][0].split("·");$("#bn-k").textContent=(k[1]||k[0]).trim();$("#bn-t").textContent=BN[i][1];$("#bn-meta").textContent="0"+(i+1)+" / 03";};
setBanner(0);

/* 외곽선 흐르는 글자 */
$("#oltrack").innerHTML=("<span>DEEPER QUESTIONS BEGIN HERE</span><span>·</span><span>CREATING PATHWAYS FOR UNIVERSAL BENEFIT</span><span>·</span>").repeat(2);

/* 이야기 격자 */
const STI=["gal_gate.jpg","p_bldg.jpg","p_spring.jpg","p_aerial_day.jpg","p_curve.jpg","p_snowroad.jpg"];
function renderStGrid(){$("#stgrid").innerHTML=STORIES.filter(s=>s.c!=="보도자료").slice(0,6).map((s,i)=>'<a class="st s'+(i+1)+'" href="'+stH(s)+'"><img src="'+IMG(STI[i])+'" alt="" loading="lazy"><span class="cut">'+esc(s.c)+'</span><span class="sx"><b>'+esc(s.t)+'</b><small>'+esc(s.s)+' · '+esc(s.d)+'</small></span></a>').join("");}
renderStGrid();

/* SNS 격자: 실제 유튜브 썸네일 */
const YTH={"NNe4xQmqt0c":0,"-atqdlLQgJU":1,"Bnl29z7cpgo":1,"0nsRSqaYsuA":1,"dz2TRiqef2k":1,"UzUFgumTbck":1,"QPWfteRXGvY":1};
SNS.forEach(x=>{const m=x.u.match(/(?:v=|shorts\/)([\w-]{11})/);if(m&&YTH[m[1]])x.img=IMG("yt_"+m[1]+".jpg");});
const _snsCard=snsCard;snsCard=function(x,i,tag){let h=_snsCard(x,i,tag);if(x.img)h=h.replace(/<canvas data-s="\d+"><\/canvas>/,'<img src="'+x.img+'" alt="" loading="lazy">');return h;};
{const L=SNS.map((x,i)=>[x,i]).filter(([x])=>x.img||x.p==="ig").slice(0,8);$("#snsmini").innerHTML=L.map(([x,i])=>snsCard(x,i,'a href="'+esc(x.u)+'" target="_blank" rel="noopener noreferrer"')).join("");}

/* 투명 머리말 + 띠 공지 */
function heroState(){const hx=$("#hxpin")||$(".hx");const on=(LH()===""||LH()==="#home")&&hx&&scrollY<hx.offsetHeight-90;document.body.classList.toggle("onhero",!!on);}
addEventListener("scroll",heroState,{passive:true});addEventListener("hashchange",()=>setTimeout(heroState,30));heroState();
try{if(localStorage.getItem("tbx")===new Date().toDateString())$("#topbar").hidden=true;}catch(_){}
$("#topbarX").addEventListener("click",()=>{$("#topbar").hidden=true;try{localStorage.setItem("tbx",new Date().toDateString())}catch(_){};heroState();});

/* 보이면 아래에서 올라오기(위치만) — 가벼운 방식 */
const RVY=("IntersectionObserver" in window)?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const t=e.target;RVY.unobserve(t);t.classList.add("in");setTimeout(()=>{t.classList.remove("rvy","in");t.style.transitionDelay="";},1400);}}),{rootMargin:"0px 0px -8% 0px"}):null;
const rvy=(el,i,m)=>{if(!RVY)return;el.classList.add("rvy");el.style.transitionDelay=((i%m)*60)+"ms";RVY.observe(el);};
/* 스크롤하며 채워지는 큰 문장 */
if(window.gsap&&window.ScrollTrigger&&!RM&&$("#fillT")){gsap.registerPlugin(ScrollTrigger);
 gsap.to("#fillT",{backgroundPosition:"0% 0",ease:"none",scrollTrigger:{trigger:"#fillT",start:"top 85%",end:"bottom 40%",scrub:true}});
 gsap.utils.toArray(".st,.tile,.b-sm,.cl-item").filter(el=>!el.closest("#need")).forEach((el,i)=>rvy(el,i,3));
}else if($("#fillT"))$("#fillT").style.backgroundPosition="0% 0";
const _rn=renderNeed;renderNeed=function(w){_rn(w);};

/* 움직임: 투명도는 그대로 두고 위치만 */
if(window.gsap&&!RM){
 if(window.SplitType){const st=new SplitType("#h1 .ln>span",{types:"words,chars",tagName:"span"});gsap.from(st.chars,{yPercent:110,rotate:6,duration:.9,ease:"power4.out",stagger:.022});}else gsap.from("#h1 .ln>span",{yPercent:105,duration:1,ease:"power4.out",stagger:.12});
 gsap.from(".banner",{y:24,scale:.985,duration:1.1,ease:"power3.out",delay:.1});
 if(window.ScrollTrigger){gsap.registerPlugin(ScrollTrigger);
  if(lenis)lenis.on("scroll",ScrollTrigger.update);
  ["#cols .col","#hstory .card",".sp-grid .sp",".events .ev",".list li"].forEach(sel=>{
   gsap.utils.toArray(sel).forEach((el,i)=>rvy(el,i,4));});
  $$("[data-count]").forEach(el=>{const v=+el.dataset.count;const o={n:v<100?0:v-40};gsap.to(o,{n:v,duration:1.4,ease:"power2.out",scrollTrigger:{trigger:el,start:"top 90%",once:true},onUpdate:()=>el.textContent=Math.round(o.n)});});
 }
}


/* ===== v11: 관리자 모드(웹빌더) — 편집 권한자만 보임, 내용은 아티팩트 db, 사진은 assets ===== */
const DEF={
 hero:{img:"",t1:"인류의 더 나은 미래가치를 창출하는",t2:"과학기술 중추 연구기관, GIST",sub:"Creating limitless possibilities through research and education",ph:"GIST에 대해 무엇이든 물어보세요"},
 topbar:{on:true,t:$("#topbarT").textContent,u:$("#topbarL").getAttribute("href")},
 bn:BN.map((b,i)=>({k:b[0],t:b[1],img:"",big:BIG[i]})),
 notices:NOTICES.map(n=>({...n,u:n.u||NURL})),
 events:EVENTS.map(e=>({...e})),
 need:Object.fromEntries(Object.keys(NEED).map(k=>[k,NEED[k].join("\n")])),
 stories:STORIES.map(x=>({c:x.c,t:x.t,s:x.s,d:x.d,m:x.m,cr:x.cr,body:x.body||"",...(x.u?{u:x.u}:{}),...(x.g?{g:x.g}:{}),...(x.src?{src:x.src}:{}),...(x.sum?{sum:x.sum}:{})})),
 popup:{on:false,k:"POPUP",t:"",p:"",u:"",img:""},
 pages:{}
};
let PAGEOV={};
let SITE=JSON.parse(JSON.stringify(DEF)),SITE_AT=null;
const HERO0=$("#hxImg").getAttribute("src");
const BNIMG0=EXI.map(n=>IMG(n));
function setHeroImg(u){const s=u||HERO0;const im=$("#hxImg");if(im.getAttribute("src")!==s)im.src=s;}
function applySite(S){
 PAGEOV=S.pages||{};try{IDX.forEach(r=>{if(!r.h||!/^#p-/.test(r.h))return;if(r.k0==null)r.k0=r.k;const o=PAGEOV[r.t];r.k=r.k0+(o?" "+[o.lead,o.dept,o.body].filter(Boolean).join(" "):"");});if(typeof fuseCache!=="undefined"&&fuseCache.clear)fuseCache.clear();}catch(_){}try{if(typeof pageCtx==="function"&&pageCtx())renderPage(pageCtx());}catch(_){}
 const h=S.hero||DEF.hero;
 setHeroImg(h.img);
 $("#hxT1").textContent=h.t1||DEF.hero.t1;
 $("#hxT2").innerHTML=esc(h.t2||DEF.hero.t2).replace("GIST","<em>GIST</em>");
 $("#hxSub").textContent=h.sub||"";
 if(h.ph)$("#hq").setAttribute("placeholder",h.ph);
 const tb=S.topbar||DEF.topbar;
 let closed=false;try{closed=localStorage.getItem("tbx")===new Date().toDateString()}catch(_){}
 $("#topbar").hidden=!tb.on||!tb.t||closed;$("#topbarT").textContent=tb.t||"";if(tb.u){$("#topbarL").href=tb.u;$("#topbarL").hidden=false}else $("#topbarL").hidden=true;
 const bn=(S.bn&&S.bn.length?S.bn:DEF.bn).slice(0,3);
 bn.forEach((b,i)=>{BN[i]=[b.k||"",b.t||""];BIG[i]=b.big||"";BNIMG[i]=b.img||BNIMG0[i]||BNIMG0[0];});
 setBanner(bi||0);
 NOTICES.length=0;(S.notices||DEF.notices).forEach(n=>NOTICES.push(n));
 EVENTS.length=0;(S.events||DEF.events).forEach(e=>EVENTS.push(e));
 if(S.stories&&S.stories.length){STORIES.length=0;S.stories.forEach(x=>STORIES.push({...x,m:x.m||((x.d||"").slice(0,7).replace(".","-")),cr:x.cr||"자료 © GIST",body:x.body||""}));renderToday();renderStGrid();typeof renderStory==="function"&&renderStory();}
 if(S.need){Object.keys(NEED).forEach(k=>{if(typeof S.need[k]==="string"){const L=S.need[k].split("\n").map(t=>t.trim()).filter(Boolean).slice(0,10);if(L.length)NEED[k]=L;}});const cur=document.querySelector('.who button[aria-pressed="true"]');renderNeed(cur?cur.dataset.who:"ug");}
 renderNotices();
 renderPopup(S.popup||DEF.popup);
 heroState&&heroState();
}
const BNIMG=BNIMG0.slice();
{const _s=setBanner;setBanner=function(i){_s(i);const im=$("#excImg");if(im&&BNIMG[i])im.src=BNIMG[i];};}
function renderPopup(p){let el=$("#pz");
 let off=false;try{off=localStorage.getItem("pzx")===(p.t||"")+new Date().toDateString()}catch(_){}
 if(!p.on||!p.t||off){if(el)el.remove();return;}
 if(!el){el=document.createElement("aside");el.id="pz";el.className="pz";el.setAttribute("aria-label","팝업존");document.body.appendChild(el);}
 el.innerHTML=(p.img?'<img loading="lazy" src="'+esc(p.img)+'" alt="">':'')+'<div class="pz-b"><small>'+esc(p.k||"POPUP")+'</small><b>'+esc(p.t)+'</b>'+(p.p?'<p>'+esc(p.p)+'</p>':'')+'</div><div class="pz-f"><button type="button" data-pz="day">오늘 하루 닫기</button>'+(p.u?'<a href="'+esc(p.u)+'" target="_blank" rel="noopener noreferrer">자세히 →</a>':'')+'<button type="button" data-pz="x" aria-label="팝업 닫기">닫기 ×</button></div>';
 el.querySelectorAll("[data-pz]").forEach(b=>b.onclick=()=>{if(b.dataset.pz==="day"){try{localStorage.setItem("pzx",(p.t||"")+new Date().toDateString())}catch(_){}}el.remove();});
}
function okUrl(u){return !u||/^https:\/\//.test(u)||/^\/_blob\//.test(u)||/^#/.test(u);}

(async function admin(){
 if(!window.claude||!claude.use)return;
 const [db,user]=await Promise.all([claude.use("db"),claude.use("user")]);
 if(!db)return;
 const ref=db.doc("site/content");
 let EDIT=null,TAB="hero",dirty=false,PG=null;
 let first=true;const tm=setTimeout(()=>{first=false},10000);
 ref.onSnapshot(s=>{clearTimeout(tm);if(s.exists){const d=s.data()||{};SITE=Object.assign(JSON.parse(JSON.stringify(DEF)),d);SITE_AT=d.at||null;if(!EDIT)applySite(SITE);}first=false;},()=>{clearTimeout(tm);});
 const can=user?await user.canEdit():false;
 if(!can)return;
 const assets=await claude.use("assets");
 const fab=document.createElement("button");fab.type="button";fab.className="admfab";fab.innerHTML='<i aria-hidden="true"></i>관리자 모드 · 화면 편집';document.body.appendChild(fab);
 fab.onclick=()=>openAdm();
 function F(path,label,type,hint){const v=get(path);return '<label>'+esc(label)+(type==="area"?'<textarea data-p="'+path+'">'+esc(v||"")+'</textarea>':'<input type="'+(type||"text")+'" data-p="'+path+'" value="'+esc(v||"")+'">')+(hint?'<p class="hint">'+esc(hint)+'</p>':'')+'</label>';}
 function C(path,label){return '<label class="adm-chk"><input type="checkbox" data-p="'+path+'"'+(get(path)?' checked':'')+'> '+esc(label)+'</label>';}
 function I(path,label,fallback){const v=get(path)||fallback||"";return '<div><b style="font-size:13px">'+esc(label)+'</b><div class="adm-img" style="margin-top:6px"><img loading="lazy" src="'+esc(v)+'" alt=""><div class="btns">'+(assets?'<label class="abtn" style="flex-direction:row">사진 올리기<input type="file" accept="image/*" data-up="'+path+'" hidden></label>':'<span class="hint">사진 올리기 권한 없음</span>')+'<button type="button" class="abtn" data-clr="'+path+'">기본 사진으로</button></div></div></div>';}
 function get(p){return p.split(".").reduce((o,k)=>o==null?o:o[k],EDIT);}
 function put(p,v){const ks=p.split(".");let o=EDIT;ks.slice(0,-1).forEach(k=>o=o[k]);o[ks[ks.length-1]]=v;}
 function list(key,fields,label,max){const L=EDIT[key];return L.map((r,i)=>'<div class="adm-row"><div class="rh">'+esc(label)+' '+(i+1)+'<span><button type="button" class="abtn" data-mv="'+key+'.'+i+'.-1" aria-label="위로">↑</button><button type="button" class="abtn" data-mv="'+key+'.'+i+'.1" aria-label="아래로">↓</button>'+(key!=="bn"?'<button type="button" class="abtn" data-rm="'+key+'.'+i+'">빼기</button>':'')+'</span></div>'+fields.map(f=>f[2]==="img"?I(key+"."+i+"."+f[0],f[1],key==="bn"?BNIMG0[i]:""):F(key+"."+i+"."+f[0],f[1],f[2],f[3])).join("")+'</div>').join("")+(key!=="bn"&&L.length<(max||12)?'<button type="button" class="abtn" data-add="'+key+'">+ '+esc(label)+' 더하기</button>':'');}
 const TABS=[["hero","첫 화면"],["topbar","띠 공지"],["bn","연구 배너"],["notices","공지"],["events","학사일정"],["need","방문자 메뉴"],["stories","소식"], ["popup","팝업존"],["pages","세부페이지"]];
 function body(){
  if(TAB==="hero")return '<p class="hint">문구 후보 (D안 기본 + GIST 공식 문구 그대로) — 누르면 바로 바뀝니다</p><div class="hcand">'+HCAND.map((h,i)=>'<button type="button" class="abtn" data-hc="'+i+'"><small>'+esc(h[2])+'</small>'+esc(h[0]+" "+h[1])+'</button>').join("")+'</div>'+I("hero.img","첫 화면 사진 (가로 2000px 권장)",HERO0)+F("hero.t1","큰 제목 1줄")+F("hero.t2","큰 제목 2줄","text","'GIST' 글자는 빨간 상자로 강조됩니다")+F("hero.sub","작은 설명")+F("hero.ph","검색창 안내 문구");
  if(TAB==="topbar")return C("topbar.on","띠 공지 보이기")+F("topbar.t","띠 공지 문구")+F("topbar.u","‘자세히 보기’ 주소","url","https:// 로 시작하는 주소만 저장됩니다");
  if(TAB==="bn")return '<p class="hint">GIST Excellence 3칸. 5초마다 넘어갑니다.</p>'+list("bn",[["k","소속·이름"],["t","제목","area"],["big","사진 위 큰 글자"],["img","그림","img"]],"배너");
  if(TAB==="notices")return '<p class="hint">첫 화면 공지 목록(위에서부터 보임).</p>'+list("notices",[["k","분류(채용·행사·안내·모집)"],["t","제목"],["d","날짜 (예: 11.05.)"],["u","주소","url"]],"공지",8);
  if(TAB==="events")return list("events",[["d","날짜 (예: 11.17)"],["w","요일 (예: TUE)"],["t","내용"]],"일정",8);
  if(TAB==="need")return '<p class="hint">한 줄에 메뉴 하나. 주소를 붙이려면 「메뉴 이름 | https://주소」. 주소가 없으면 통합검색으로 연결됩니다. 최대 10개.</p>'+Object.keys(WHO).map(k=>F("need."+k,WHO[k],"area")).join("");
  if(TAB==="stories")return '<p class="hint">GIST TODAY 흐르는 소식·이야기 격자·지금, 지스트에 함께 쓰입니다. 분류: 연구성과 / 사람 / 보도자료 / 영상 / 캠퍼스</p>'+list("stories",[["c","분류"],["t","제목","area"],["s","부제 (학과·교수 등)"],["d","날짜 (예: 2026.11.10.)"]],"소식",40);
  if(TAB==="pages"){EDIT.pages=EDIT.pages||{};const names=[];MEGA.forEach((M,i)=>M[2].forEach((G,g)=>G[1].forEach((x,k)=>{if(i!==1&&!PSPECIAL[x])names.push([x,M[0]+" › "+G[0],i,g,k]);})));if(!PG||!names.some(n=>n[0]===PG))PG=names[0][0];EDIT.pages[PG]=EDIT.pages[PG]||{lead:"",dept:"",body:""};
   return '<p class="hint">메뉴 43개 세부페이지를 직접 고칩니다. 고르면 그 화면으로 이동해 바로 미리 보입니다.</p><label>고칠 화면<select id="admpg">'+names.map(n=>'<option value="'+esc(n[0])+'"'+(n[0]===PG?' selected':'')+'>'+esc(n[1]+" › "+n[0])+(EDIT.pages[n[0]]&&(EDIT.pages[n[0]].body||EDIT.pages[n[0]].lead||EDIT.pages[n[0]].dept)?" ✎":"")+'</option>').join("")+'</select></label>'+F("pages."+PG+".lead","첫 줄 설명 (비우면 기본 문구)")+F("pages."+PG+".dept","담당 부서 (예: 학적팀 T.2055)")+F("pages."+PG+".body","본문","area","## 제목 · - 목록 · 빈 줄로 문단 나누기 · [글자](https://주소) 로 링크");}
  if(TAB==="popup")return C("popup.on","팝업존 보이기 (화면을 가리지 않는 왼쪽 아래 카드)")+F("popup.k","작은 머리말")+F("popup.t","제목")+F("popup.p","설명","area")+F("popup.u","주소","url")+I("popup.img","사진");
 }
 function goPG(){let h=null;MEGA.forEach((M,i)=>M[2].forEach((G,g)=>G[1].forEach((x,k)=>{if(x===PG&&i!==1)h="#p-"+i+"-"+g+"-"+k;})));if(h&&LH()!==h)location.hash=h;}
 const HCAND=[["인류의 더 나은 미래가치를 창출하는","과학기술 중추 연구기관, GIST","GIST 비전 2053 (기본)"],["혁신,","길이 없으면 우리가 만든다!","총장 인사말 맺음말"],["보다 나은 미래를 만들기 위하여,","우리 함께 지스트","현행 홈페이지 소개 문구"]];
 function paint(){const p=$("#adm");
  p.querySelector(".adm-tabs").innerHTML=TABS.map(t=>'<button type="button" role="tab" aria-selected="'+(t[0]===TAB)+'" data-tab="'+t[0]+'">'+t[1]+'</button>').join("");
  p.querySelector(".adm-body").innerHTML=body();
  p.querySelector(".adm-st").textContent=dirty?"저장 안 된 변경이 있습니다":(SITE_AT?"마지막 저장 "+new Date(SITE_AT).toLocaleString("ko-KR"):"아직 저장한 적 없음(기본 내용)");}
 function openAdm(){
  EDIT=JSON.parse(JSON.stringify(SITE));dirty=false;location.hash="home";
  let p=$("#adm");if(!p){p=document.createElement("section");p.id="adm";p.className="adm";p.setAttribute("aria-label","관리자 편집");p.innerHTML='<div class="adm-h"><div><b>관리자 모드</b><small>바꾸면 화면에 바로 미리 보입니다 · 저장해야 모두에게 반영</small></div><button type="button" data-x="1">닫기</button></div><div class="adm-tabs" role="tablist"></div><div class="adm-body"></div><div class="adm-f"><span class="adm-st" role="status"></span><button type="button" class="abtn" data-reset="1">기본값으로</button><button type="button" class="abtn red" data-save="1">저장</button></div>';document.body.appendChild(p);
   p.addEventListener("input",e=>{const t=e.target;if(!t.dataset.p)return;put(t.dataset.p,t.type==="checkbox"?t.checked:t.value);dirty=true;applySite(EDIT);p.querySelector(".adm-st").textContent="저장 안 된 변경이 있습니다";});
   p.addEventListener("change",e=>{if(e.target.id!=="admpg")return;PG=e.target.value;goPG();paint();});
   p.addEventListener("change",async e=>{const t=e.target;if(!t.dataset.up||!t.files[0])return;const f=t.files[0];const st=p.querySelector(".adm-st");
    if(!/^image\//.test(f.type)){st.textContent="그림 파일만 올릴 수 있습니다";return;}
    if(f.size>8*1024*1024){st.textContent="8MB 이하 사진만 올려 주세요";return;}
    st.textContent="사진 올리는 중…";try{const r=await assets.upload(f);put(t.dataset.up,r.url);dirty=true;applySite(EDIT);paint();}catch(err){st.textContent="사진 올리기 실패: "+(err&&err.code||"오류");}});
   p.addEventListener("click",async e=>{const b=e.target.closest("button");if(!b)return;
    if(b.dataset.hc){const h=HCAND[+b.dataset.hc];put("hero.t1",h[0]);put("hero.t2",h[1]);dirty=true;applySite(EDIT);paint();return;}
    if(b.dataset.tab){TAB=b.dataset.tab;paint();if(TAB==="pages")goPG();return;}
    if(b.dataset.x){if(dirty&&!p.dataset.warn){p.dataset.warn=1;p.querySelector(".adm-st").textContent="저장하지 않은 변경이 있어요. 한 번 더 누르면 버리고 닫습니다";return;}delete p.dataset.warn;EDIT=null;applySite(SITE);p.hidden=true;fab.hidden=false;document.body.classList.remove("admon");return;}
    if(b.dataset.clr){put(b.dataset.clr,"");dirty=true;applySite(EDIT);paint();return;}
    if(b.dataset.add){const k=b.dataset.add;if(k==="stories")EDIT[k].unshift({c:"연구성과",t:"",s:"",d:""});else EDIT[k].push(k==="notices"?{k:"안내",t:"",d:"",u:NURL}:{d:"",w:"",t:""});dirty=true;paint();return;}
    if(b.dataset.rm){const [k,i]=b.dataset.rm.split(".");EDIT[k].splice(+i,1);dirty=true;applySite(EDIT);paint();return;}
    if(b.dataset.mv){const [k,i,d]=b.dataset.mv.split(".");const a=+i,c=a+(+d);const L=EDIT[k];if(c<0||c>=L.length)return;[L[a],L[c]]=[L[c],L[a]];dirty=true;applySite(EDIT);paint();return;}
    if(b.dataset.reset){EDIT=JSON.parse(JSON.stringify(DEF));dirty=true;applySite(EDIT);paint();p.querySelector(".adm-st").textContent="기본값을 불러왔습니다 · 저장해야 반영";return;}
    if(b.dataset.save){const st=p.querySelector(".adm-st");
     const urls=[EDIT.topbar.u,EDIT.popup.u,...EDIT.notices.map(n=>n.u)];if(urls.some(u=>!okUrl(u))){st.textContent="주소는 https:// 로 시작해야 합니다";return;}
     if(EDIT.pages)Object.keys(EDIT.pages).forEach(k=>{const v=EDIT.pages[k]||{};if(!(v.lead||"").trim()&&!(v.dept||"").trim()&&!(v.body||"").trim())delete EDIT.pages[k];});
     b.disabled=true;st.textContent="저장 중…";
     const at=new Date().toISOString();const me=user&&user.id?await user.id().catch(()=>null):null;
     const log=((SITE.log)||[]).concat([{at,by:me}]).slice(-10);
     try{await ref.set({...EDIT,at,log});SITE=JSON.parse(JSON.stringify({...EDIT,at,log}));SITE_AT=at;dirty=false;st.textContent="저장했습니다 · 모든 방문자 화면에 반영됩니다";}
     catch(err){st.textContent="저장 실패: "+(err&&err.code||"오류")+" — 다시 시도해 주세요";}
     b.disabled=false;}
   });
  }
  p.hidden=false;fab.hidden=true;document.body.classList.add("admon");paint();
 }
})();


$("#ftcols").innerHTML=COLLEGES.map(c=>'<div><h3>'+esc(c.n)+'</h3><ul>'+c.d.map(d=>'<li><a href="'+dhref(d)+'"'+EXT+'>'+esc(d)+'<small>'+(DURL[d]||"")+'.gist.ac.kr</small></a></li>').join("")+'</ul></div>').join("");

/* 하위 화면 머리: 캠퍼스 사진 + 영문 외곽선 (포스텍·유니스트 서브 비주얼) */
const PV={tutorial:["pv_tut.jpg","ACADEMICS","GIST Tutorial"],story:["pv_story.jpg","NEWS","News & Stories"],search:["pv_search.jpg","ASK","Search & AI"],colleges:["hx_c.jpg","COLLEGES","Colleges & Departments"]};
Object.entries(PV).forEach(([v,[im,en,eye]])=>{const h=document.querySelector("#v-"+v+" .page-h");if(!h)return;h.classList.add("pv");
 h.insertAdjacentHTML("afterbegin",'<div class="pv-bg" aria-hidden="true"><img src="'+IMG(im)+'" alt="" loading="lazy" decoding="async"></div><span class="pv-en" aria-hidden="true">'+en+'</span>');
 const c=h.querySelector(".crumb");if(c)c.insertAdjacentHTML("afterend",'<span class="pv-eye">'+eye+'</span>');});

/* 지금, 지스트 카드: 그림 대신 실제 사진 */
const SIMG={0:"g_224635.jpg",1:"g_224564.jpg",2:"g_224547.jpg",3:"g_224519.jpg",4:"gal_gate.jpg",5:"g_224500.jpg",6:"p_curve.jpg",7:"p_night2.jpg",8:"p_bldg.jpg",9:"p_spring.jpg",10:"gal_night.jpg",11:"yt_dz2TRiqef2k.jpg",12:"p_night2.jpg",13:"p_curve.jpg",14:"p_aerial_day.jpg",15:"g_224433.jpg",16:"p_spring.jpg",17:"p_snowroad.jpg",18:"gal_gate.jpg",19:"p_aerial_day.jpg",20:"p_curve.jpg",21:"p_bldg.jpg",22:"p_night2.jpg",23:"gal_gate.jpg",24:"g_224455.jpg"};
storyCard=function(s,big){const i=STORIES.indexOf(s);const im=IMG(SIMG[i]||"gal_gate.jpg");
 return '<a class="card'+(big?' big':'')+'" href="'+stH(s)+'"><div class="thumb"><img src="'+im+'" alt="" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"><span class="cr">'+esc(s.cr)+'</span></div><span class="cat"><span class="ch '+(CHC[s.c]||"c2")+'" style="color:#fff;padding:3px 9px;border-radius:999px;font-size:12px">'+esc(s.c)+'</span> <span class="num" style="color:var(--mute)">'+esc(s.d||s.m.replace("-","."))+'</span></span><h3>'+esc(s.t)+'</h3><p>'+esc(s.s)+'</p></a>';};
renderStory();

/* 휴대폰: 시안 설명 메뉴는 접어 두기 */
{const d=document.querySelector(".demo");if(d){const t=document.createElement("button");t.type="button";t.className="demo-tg";t.setAttribute("aria-expanded","false");t.textContent="시안 메뉴";t.onclick=()=>{const o=d.classList.toggle("open");t.setAttribute("aria-expanded",o);t.textContent=o?"접기 ×":"시안 메뉴";};d.prepend(t);}}

/* 메가메뉴: 왼쪽에 캠퍼스 사진 카드 (포스텍·유니스트 전체메뉴 방식) */
const MGI=[["hx_b.jpg","About GIST"],["gal_gate.jpg","Colleges"],["mg_adm.jpg","Admission"],["mg_res.jpg","Research"],["mg_campus.jpg","Campus Life"],["pv_story.jpg","News"]];
{const _om=openMega;openMega=function(i){_om(i);const l=$("#megaw .lead");if(l&&MGI[i]){l.classList.add("ph");l.insertAdjacentHTML("afterbegin",'<img loading="lazy" src="'+IMG(MGI[i][0])+'" alt="" decoding="async">');l.insertAdjacentHTML("afterbegin",'<i>'+MGI[i][1]+'</i>');}};}

/* ===== v15: 포스텍 문법 첫 화면 ===== */
const CEN={"연구성과":"Research","사람":"People","보도자료":"In the Media","영상":"Video","캠퍼스":"Campus","공지":"Notice"};
function cen(s){return /^언론 보도/.test(s.s||"")?"Press":CEN[s.c];}
const ICO_AR='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

/* v72 지금, 지스트 표지 그래픽: 실제 사진이 없는 글은 캠퍼스 자료 사진 대신 주제 그래픽 표지를 그림 */
const GTOP=[["AI","AI",/\bAI\b|인공지능|딥러닝|머신러닝|LLM|에이전트|알고리즘/i],["CHIP","반도체·양자",/반도체|양자|소자|칩|광검출|웨이퍼|분광|센서/],["ENERGY","에너지·환경",/에너지|풍력|배터리|탄소|기후|환경|태양|수소/],["BIO","생명·의료",/생명|의료|의생명|심장|통증|단백질|뇌|약물|하이드로젤|암|폐/],["PEOPLE","사람",/수상|선정|임명|교수|학생|동문|초청/],["CAMPUS","캠퍼스",/축제|페스타|행사|캠퍼스|개최|공연|문화|체험/]];
function gTopic(s){if(s.c==="캠퍼스")return GTOP[5];if(s.c==="사람")return GTOP[4];const t=s.t+" "+(s.s||"")+" "+(s.body||"");for(const g of GTOP)if(g[2].test(t))return g;return ["GIST","GIST",null];}
const GCOL={"연구성과":["#111418","#DC2715"],"사람":["#2E3A33","#5E7366"],"보도자료":["#1B1F24","#3B4249"],"캠퍼스":["#B3200F","#E8553F"],"영상":["#0B0D10","#7A1E12"]};
function gCover(s){const i=STORIES.indexOf(s);let r=(i+1)*9301%233280;const rnd=()=>(r=(r*9301+49297)%233280)/233280;const g=gTopic(s),c=GCOL[s.c]||["#111418","#DC2715"],W=800,H=500;let pt="";
 if(g[0]==="AI"){const P=[];for(let k=0;k<16;k++)P.push([60+rnd()*680,50+rnd()*400]);P.forEach((a,k)=>{const b=P[(k*5+3)%16];pt+='<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" stroke="rgba(255,255,255,.16)" stroke-width="1.5"/>';});P.forEach(a=>pt+='<circle cx="'+a[0]+'" cy="'+a[1]+'" r="'+(4+rnd()*8)+'" fill="rgba(255,255,255,.5)"/>');}
 else if(g[0]==="CHIP"){for(let k=0;k<14;k++){const y=40+k*32,x=rnd()*300;pt+='<path d="M'+x+' '+y+' H'+(x+180+rnd()*200)+' l26 26 H'+(x+520+rnd()*120)+'" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="2"/><circle cx="'+(x+700)+'" cy="'+(y+26)+'" r="5" fill="rgba(255,255,255,.35)"/>';}pt+='<rect x="520" y="150" width="200" height="200" rx="14" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="3"/><rect x="560" y="190" width="120" height="120" rx="8" fill="rgba(255,255,255,.12)"/>';}
 else if(g[0]==="ENERGY"){for(let k=0;k<9;k++){let d="M0 "+(120+k*34);for(let x=0;x<=W;x+=40)d+=" L"+x+" "+(120+k*34+Math.sin(x/90+k*.7)*(18+k*2)).toFixed(1);pt+='<path d="'+d+'" fill="none" stroke="rgba(255,255,255,'+(.08+k*.03).toFixed(2)+')" stroke-width="3"/>';}pt+='<circle cx="640" cy="120" r="70" fill="rgba(255,210,120,.35)"/>';}
 else if(g[0]==="BIO"){for(let k=0;k<22;k++){const x=40+rnd()*720,y=40+rnd()*420,rr=14+rnd()*40;let d="";for(let a=0;a<6;a++){const an=Math.PI/3*a;d+=(a?"L":"M")+(x+rr*Math.cos(an)).toFixed(1)+" "+(y+rr*Math.sin(an)).toFixed(1);}pt+='<path d="'+d+'Z" fill="rgba(255,255,255,'+(.04+rnd()*.1).toFixed(2)+')" stroke="rgba(255,255,255,.25)"/>';}}
 else if(g[0]==="PEOPLE"){for(let k=0;k<7;k++)pt+='<circle cx="'+(560+k*12)+'" cy="250" r="'+(40+k*28)+'" fill="none" stroke="rgba(255,255,255,'+(.3-k*.035).toFixed(2)+')" stroke-width="2"/>';pt+='<circle cx="560" cy="210" r="30" fill="rgba(255,255,255,.55)"/><path d="M505 300 q55 -70 110 0" fill="rgba(255,255,255,.55)"/>';}
 else {for(let k=0;k<12;k++)pt+='<rect x="'+(rnd()*760)+'" y="'+(rnd()*460)+'" width="'+(20+rnd()*120)+'" height="'+(6+rnd()*14)+'" rx="7" fill="rgba(255,255,255,'+(.06+rnd()*.14).toFixed(2)+')" transform="rotate(-24 400 250)"/>';}
 const big=g[0]==="GIST"?"NEWS":g[0];
 const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+c[0]+'"/><stop offset="1" stop-color="'+c[1]+'"/></linearGradient></defs><rect width="'+W+'" height="'+H+'" fill="url(#g)"/>'+pt+'<text x="400" y="'+(H-60)+'" text-anchor="middle" font-family="Impact,Haettenschweiler,Arial Black,sans-serif" font-weight="900" font-size="'+(big.length>6?96:big.length>4?120:150)+'" fill="rgba(255,255,255,.22)" letter-spacing="4">'+big+'</text><rect x="110" y="70" width="64" height="6" fill="#fff"/><path d="M'+(W-70)+' 0H'+W+'V70Z" fill="rgba(255,255,255,.9)"/></svg>';
 return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg);}
const CAMP=["p_spring.jpg","p_night.jpg","p_winter_air.jpg","p_bldg.jpg","p_night2.jpg","p_curve.jpg","p_snowroad.jpg","p_aerial_day.jpg","gal_gate.jpg"];
function sImg(s){const i=STORIES.indexOf(s);const n=SIMG[i]||"";if(/^(r_|yt_|g_)/.test(n))return {u:IMG(n),ex:false};if(s.c==="캠퍼스"||s.c==="영상"){const k=STORIES.slice(0,i).filter(x=>(x.c==="캠퍼스"||x.c==="영상")&&!/^(r_|yt_|g_)/.test(SIMG[STORIES.indexOf(x)]||"")).length;return {u:IMG(CAMP[k%CAMP.length]),ex:true};}if(typeof DURL==="object"){const tx=(s.s||"")+" "+s.t;const nm=Object.keys(DURL).sort((x,y)=>y.length-x.length).find(n=>tx.includes(n)||tx.includes(n.replace(/·/g,"")));if(nm){const c=DURL[nm];return {u:IMG("d_"+(c==="eecs"?"eecs2":c)+".jpg"),ex:true,tp:nm};}}const TPH={AI:["p_curve.jpg","p_night.jpg"],CHIP:["p_bldg.jpg","p_night2.jpg"],ENERGY:["p_aerial_day.jpg","p_winter_air.jpg"],BIO:["p_night2.jpg","p_curve.jpg"],PEOPLE:["gal_gate.jpg","p_bldg.jpg"],CAMPUS:["p_snowroad.jpg","p_night.jpg"],GIST:["gal_gate.jpg","p_bldg.jpg"]};const g=gTopic(s),L=TPH[g[0]]||TPH.GIST;return {u:IMG(L[i%2]),ex:true,tp:g[1]};}
window.__gCover=gCover;


/* v75 지스트에 물어봐: 아티팩트판에서는 Claude가 D안 공개 자료(통합검색 색인)만 근거로 답함. 안 되면 기존 규칙 답 */
{let SMP=null,aiOn=true;const tok=v=>v.replace(/[?？.!,·()"'‘’“”]/g," ").split(/\s+/).map(w=>w.replace(/(은요|는요|이요|에서|으로|까지|부터|이랑|하고|은|는|이|가|을|를|에|의|도|로|요|해|줘)$/,"")).filter(w=>w.length>=2&&!/^(알려|알려줘|뭐야|어떻게|어디|언제|무엇|궁금|있나|있어|하나|대해|관련|GIST|지스트)$/.test(w));
 function retrieve(v){const ws=tok(v);if(!ws.length)return [];return IDX.map(r=>{const T=(r.t||""),K=(r.k||"")+" "+(r.p||"")+" "+(r.site||"");let n=0;ws.forEach(w=>{if(T.includes(w))n+=3;if(K.includes(w))n+=1;});return {r,n};}).filter(x=>x.n>0).sort((a,b)=>b.n-a.n).slice(0,8).map(x=>x.r);}
 function link(r){if(r.h)return r.h;if(r.u)return r.u;return "#search";}
 (async()=>{try{if(!window.claude||!claude.use)return;SMP=await claude.use("sample");if(!SMP)return;
  const hd=$("#chat .ch");if(hd){const b=document.createElement("button");b.type="button";b.className="ai-tg";b.setAttribute("aria-pressed","true");b.textContent="Claude로 답하기 켬";b.addEventListener("click",()=>{aiOn=!aiOn;b.setAttribute("aria-pressed",aiOn);b.textContent=aiOn?"Claude로 답하기 켬":"Claude로 답하기 끔 (규칙 답)";});hd.appendChild(b);}
 }catch(_){SMP=null;}})();
 
 if(!window.GIST_AI_ENDPOINT&&/^https?:$/.test(location.protocol)){fetch("data/ai.json?t="+Date.now(),{cache:"no-store"}).then(r=>r.ok?r.json():null).then(j=>{if(j&&j.endpoint)window.GIST_AI_ENDPOINT=j.endpoint;}).catch(()=>{});}
 /* GitHub판(아티팩트 밖): 같은 색인에서 찾은 공개 자료의 문장을 골라 출처 번호와 함께 답을 엮음. 구축 때 window.GIST_AI_ENDPOINT(서버 열쇠를 숨긴 중계 주소)를 넣으면 실제 생성형 AI로 답함 */
 const sents=t=>String(t||"").replace(/\s+/g," ").split(/(?<=[.!?。]|다\.|요\.)\s+|\s*·\s*/).map(x=>x.trim()).filter(x=>x.length>=8);
 function localAnswer(v,R){const ws=tok(v);const pick=[];R.forEach((r,i)=>{const src=[r.a,r.p,(r.k||"").length<300?"":""].filter(Boolean).join(" ");sents(src).forEach(x=>{let n=0;ws.forEach(w=>{if(x.includes(w))n++;});if(n)pick.push({x,n:n+(i<2?0.5:0),i});});});
  pick.sort((a,b)=>b.n-a.n);const used=new Set(),out=[];for(const c of pick){if(out.length>=3)break;if(out.some(o=>o.x===c.x))continue;out.push(c);used.add(c.i);}
  if(!out.length)return null;return {txt:out.map(o=>o.x.replace(/[.。]?$/,".")+" ["+(o.i+1)+"]").join(" "),used:[...used].map(i=>i+1)};}
 document.addEventListener("submit",async e=>{if(e.target.id!=="cform"||SMP||!window.GIST_AI_ENDPOINT)return;const v=$("#cq").value.trim();if(!v)return;const R=retrieve(v);if(!R.length)return;
  e.preventDefault();e.stopImmediatePropagation();addMsg(v,"u");$("#cq").value="";const d=document.createElement("div");d.className="m a";d.textContent="자료를 찾아 답을 쓰는 중…";$("#msgs").appendChild(d);$("#msgs").scrollTop=1e6;
  let txt=null,used=[],by="";
  if(window.GIST_AI_ENDPOINT){try{const ctx=R.map((r,i)=>"["+(i+1)+"] "+(r.site||"")+" · "+(r.t||"")+" — "+String((r.p||"")+" "+(r.a||"")).slice(0,420)).join("\n");const res=await fetch(window.GIST_AI_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({q:v,ctx})});if(res.ok){const j=await res.json();txt=j.text;used=[...new Set([...String(txt).matchAll(/\[(\d+)\]/g)].map(m=>+m[1]))].filter(n=>n>=1&&n<=R.length);by="생성형 AI가 위 자료만 보고 쓴 답입니다.";}}catch(_){}}
  if(!txt){const L=localAnswer(v,R);if(L){txt=L.txt;used=L.used;by="공개 자료에서 질문과 맞는 문장을 골라 엮은 답입니다. 중요한 내용은 출처에서 꼭 확인하세요.";}}
  if(!txt){txt="D안에 실린 공개 자료에서 정확한 답을 찾지 못했습니다. 아래 관련 화면을 확인하거나 담당 부서에 문의해 주세요.";used=[1,2].filter(n=>n<=R.length);by="";}
  d.innerHTML=esc(txt)+'<div class="cite">'+(used.length?used:[1]).map(n=>{const r=R[n-1],u=link(r);return '<a href="'+esc(u)+'"'+(/^https/.test(u)?EXT:'')+'>['+n+'] '+esc(((r.site||"")+" · "+(r.t||"")).slice(0,60))+(/^https/.test(u)?' ↗':'')+'</a>';}).join("")+(by?'<span class="ai-by">'+by+'</span>':'')+'</div>';$("#msgs").scrollTop=1e6;},true);
 document.addEventListener("submit",async e=>{if(e.target.id!=="cform"||!SMP||!aiOn)return;e.preventDefault();e.stopImmediatePropagation();
  const v=$("#cq").value.trim();if(!v)return;addMsg(v,"u");$("#cq").value="";
  const R=retrieve(v);const d=document.createElement("div");d.className="m a";d.textContent="자료를 찾아 답을 쓰는 중…";$("#msgs").appendChild(d);$("#msgs").scrollTop=1e6;
  if(!R.length){d.textContent="D안에 실린 공개 자료에서는 관련 내용을 찾지 못했습니다. 통합검색이나 담당 부서에 문의해 주세요.";return;}
  const ctx=R.map((r,i)=>"["+(i+1)+"] "+(r.site||"")+" · "+(r.t||"")+" — "+String((r.p||"")+" "+(r.a||"")+" "+(r.k||"")).slice(0,420)).join("\n");
  const prompt="너는 광주과학기술원(GIST) 대표 홈페이지의 안내원 '지스트에 물어봐'다. 아래 [자료]에만 근거해 질문에 한국어로 답하라.\n규칙: 2~5문장, 쉬운 말. 자료에 있는 숫자·날짜·이름은 그대로 쓰고, 자료에 없는 것은 추측하지 말고 '자료에서 확인되지 않습니다'라고 말한 뒤 담당 부서 문의를 권하라. 각 문장 끝에 근거 자료 번호를 [1]처럼 붙여라.\n\n[자료]\n"+ctx+"\n\n[질문]\n"+v;
  try{const out=await SMP(prompt,{modelTier:"quick",cache:false,onText:({text})=>{d.textContent=text;$("#msgs").scrollTop=1e6;}});
   const txt=out.text||d.textContent;const used=[...new Set([...txt.matchAll(/\[(\d+)\]/g)].map(m=>+m[1]))].filter(n=>n>=1&&n<=R.length);
   d.innerHTML=esc(txt)+'<div class="cite">'+(used.length?used:[1]).map(n=>{const r=R[n-1],u=link(r);return '<a href="'+esc(u)+'"'+(/^https/.test(u)?EXT:'')+'>['+n+'] '+esc((r.site||"")+" · "+(r.t||"")).slice(0,60)+(/^https/.test(u)?' ↗':'')+'</a>';}).join("")+'<span class="ai-by">Claude가 위 자료만 보고 쓴 답입니다. 중요한 내용은 출처에서 꼭 확인하세요.</span></div>';
  }catch(err){if(err&&err.code==="not_granted"){aiOn=false;const t=$(".ai-tg");if(t){t.setAttribute("aria-pressed","false");t.textContent="Claude로 답하기 끔 (규칙 답)";}}
   d.remove();$("#cq").value=v;const last=$("#msgs").lastElementChild;if(last&&last.classList.contains("u"))last.remove();aiOn=false;$("#cform").requestSubmit();setTimeout(()=>{aiOn=!!SMP&&(!err||err.code!=="not_granted");},50);}
 },true);}

/* v87: 연구자 찾기 대신 사람·업무 찾기(아래 v87 블록) */
{ function goPeople(){scope="people";$("#q").value="";$("#q").placeholder="이름·부서·업무·내선으로 찾기 (예: 박영준, 장학, 2836)";history.replaceState(null,"","#search");route();setTimeout(()=>{$$("#scope button").forEach(x=>x.setAttribute("aria-pressed",x.dataset.s==="people"));runSearch();$("#q").focus({preventScroll:true});},40);}
 {const _r=route;route=function(){if(LH()==="#search-people"){goPeople();return;}_r();};}
 addEventListener("hashchange",()=>{if(LH()==="#search-people")goPeople();});if(LH()==="#search-people")setTimeout(goPeople,0);
 $("#scope").innerHTML=SCOPES.map(x=>'<button type="button" data-s="'+x[0]+'" aria-pressed="'+(x[0]===scope)+'">'+x[1]+'</button>').join("");}

/* v75 SNS 자동 연동: GitHub Actions가 30분마다 공식 경로(유튜브 RSS·인스타그램/페이스북 Graph API)로 가져와 data/sns.json에 저장 → 화면이 열 때와 10분마다 다시 읽음 */
{const ago=t=>{if(!t)return "";const m=Math.round((Date.now()-new Date(t).getTime())/60000);return m<1?"방금":m<60?m+"분 전":m<1440?Math.round(m/60)+"시간 전":Math.round(m/1440)+"일 전";};
 const md=t=>{const d=new Date(t);return isNaN(d)?"":(d.getMonth()+1)+"."+d.getDate()+".";};
 async function loadSNS(){if(!/^https?:$/.test(location.protocol))return;let js;try{const r=await fetch("data/sns.json?t="+Date.now(),{cache:"no-store"});if(!r.ok)return;js=await r.json();}catch(_){return;}
  if(!js||!Array.isArray(js.items)||!js.items.length)return;
  const L=js.items.slice(0,14).map(x=>({p:x.p,t:x.t,d:x.at?md(x.at):(x.d||""),k:x.t,u:x.u,img:x.img||""}));SNS.length=0;L.forEach(x=>SNS.push(x));
  for(let i=IDX.length-1;i>=0;i--)if(IDX[i].s==="sns")IDX.splice(i,1);
  SNS.forEach(x=>IDX.push({s:"sns",site:x.p==="ig"?"인스타그램":x.p==="fb"?"페이스북":"GIST 공식 유튜브",t:x.t,p:x.d+" 올림 · 공식 계정에서 자동으로 가져온 글",k:x.k,u:x.u}));
  try{renderSns();}catch(_){}try{renderPSns();}catch(_){}
  const S=js.src||{},lab={yt:"유튜브",ig:"인스타그램",fb:"페이스북"};const tx=Object.keys(lab).map(k=>{const v=S[k]||{};return lab[k]+": "+(v.ok?"자동 갱신 "+ago(v.at):/열쇠/.test(v.why||"")?"공식 계정 연결 전(대외홍보팀 토큰 필요)":"마지막으로 저장한 글 표시");}).join(" · ");
  const st=$("#synctx");if(st)st.textContent=tx+" (확인 "+ago(js.checked)+")";
  const ps=$("#p-h-sns");if(ps&&!$("#psync")){const sp=document.createElement("small");sp.id="psync";sp.className="psync";ps.appendChild(sp);}const pz=$("#psync");if(pz)pz.textContent="자동 갱신 "+ago((S.yt||{}).at||js.checked);}
 loadSNS();setInterval(loadSNS,600000);}

/* v87 사람·업무 찾기: ① 현행 GIST 홈페이지 '조직/직원안내 › 직원검색'의 부서·내선·담당업무 전체(686건, 2026.11.11. 수집, 이름 없음 — 현행과 같음) ② 학과 홈페이지 교수진 안내의 교수 이름·연구실·연구실 내선(180명, 12개 학과·1개 대학원, 2026.11.11. 수집). 이메일·사진·휴대전화는 넣지 않음 */
const ORGDIR=[["이사회","2010","사무국"],["이사회","2971","사무국"],["이사회","2972","사무국"],["이사회","2974","사무국"],["감사부","2007","감사부장 / 감사총괄, 청탁방지담당관, 행동강령책임관"],["감사부","2185","감사팀장 / 일반감사, 특별감사, 회계감사, 대ㆍ내외 감사현황보고"],["감사부","2008","일반감사, 특별감사, 회계감사, 대ㆍ내외 감사현황보고"],["감사부","2009","감사관련 대ㆍ내외 기관업무, 신문고 민원관리, 감사업무"],["감사","2006","감사"],["총장","2001","광주과학기술원 총장"],["미래전략실","3011","실장, 정책 보좌 및 경영 지원"],["미래전략실","3012","팀장, 정책 보좌 및 지원"],["미래전략실","2003","총장·부총장 일정관리 및 수행"],["미래전략실","2005","총장·부총장 일정관리"],["대학지원실","6651","실장, 업무총괄"],["대학지원실","6653","MOOC 개발 및 관리 / LMS 및 스튜디오 운영"],["대학지원실","6654","공통 교양교과 관리 및 운영, 교수법강좌, 저작권강좌 운영"],["AI대학","3226","교수/대학장"],["AI대학","6121","정보컴퓨팅대학 업무 총괄"],["AI대학","6122","전기전자컴퓨터공학과 교원 인사 및 학과 총괄"],["AI대학","6123","AI융합학과 교원 인사 및 학과 총괄"],["AI대학","6124","대학 학사(전기전자컴퓨터공학과)"],["AI대학","6125","대학 학사(AI융합학과)"],["AI대학","6126","대학 학사(반도체공학과)"],["AI학과","2219","교수/AI융합학과 학과장"],["AI학과","5334","부교수"],["AI학과","2260","부교수"],["AI학과","6400","조교수"],["AI학과","5345","교수"],["AI학과","6390","조교수"],["AI학과","6387","조교수"],["AI학과","5331","교수"],["AI학과","6384","부교수"],["AI학과","5341","부교수"],["AI학과","2261","조교수"],["AI학과","6393","조교수"],["AI학과","2661","교수"],["AI학과","5332","교수"],["AI학과","5333","교수"],["AI학과","2396","교수"],["AI학과","2213","교수"],["AI학과","2216","교수"],["AI학과","5343","부교수"],["AI학과","2389","명예교수"],["AI학과","5348","특별전임직(부교수)"],["AI학과","5346","특별전임직(부교수)"],["AI학과","5362","초빙석학교수"],["AI학과","6380","연구부교수"],["AI학과","4562","산학교수"],["AI학과","6915","연구원"],["AI학과","6362","연구원"],["AI학과","6363","연구원"],["AI학과","6921","연구원"],["AI학과","6396","연구원"],["AI학과","6358","연구과제 관리"],["AI학과","6351","대학원 학사업무"],["AI학과","6365","연구과제 관리"],["AI학과","6352","연구과제 관리"],["AI학과","6353","연구과제 관리"],["AI학과","6354","학사업무 지원"],["AI학과","6361","학사업무 지원"],["AI학과","6364","연구과제 관리"],["AI학과","6355","연구과제 관리"],["AI학과","6356","대학원 학사업무"],["전기전자컴퓨터공학과","3231","교수/학과장"],["전기전자컴퓨터공학과","3226","교수"],["전기전자컴퓨터공학과","5327","교수"],["전기전자컴퓨터공학과","5322","교수"],["전기전자컴퓨터공학과","2228","교수"],["전기전자컴퓨터공학과","2235","교수"],["전기전자컴퓨터공학과","3716","교수"],["전기전자컴퓨터공학과","2205","교수"],["전기전자컴퓨터공학과","2234","교수"],["전기전자컴퓨터공학과","2237","교수"],["전기전자컴퓨터공학과","5325","교수"],["전기전자컴퓨터공학과","2406","교수"],["전기전자컴퓨터공학과","2230","교수"],["전기전자컴퓨터공학과","2397","교수"],["전기전자컴퓨터공학과","3502","교수"],["전기전자컴퓨터공학과","3223","교수"],["전기전자컴퓨터공학과","2640","부교수"],["전기전자컴퓨터공학과","5326","부교수"],["전기전자컴퓨터공학과","2643","조교수"],["전기전자컴퓨터공학과","2642","조교수"],["전기전자컴퓨터공학과","2236","부교수"],["전기전자컴퓨터공학과","2267","조교수"],["전기전자컴퓨터공학과","2208","명예교수"],["전기전자컴퓨터공학과","2206","명예교수"],["전기전자컴퓨터공학과","3736","특별전임직(부교수)"],["전기전자컴퓨터공학과","3165","특별전임직(조교수)"],["전기전자컴퓨터공학과","3643","기초(전기전산) 실험교육강사"],["전기전자컴퓨터공학과","3644","기초(전기전산) 실험교육강사"],["전기전자컴퓨터공학과","2202","학사업무(대학원)"],["전기전자컴퓨터공학과","3162","연구비 관리"],["전기전자컴퓨터공학과","3173","학사업무(대학원)"],["전기전자컴퓨터공학과","2631","연구비 관리"],["반도체공학과","2638","부교수/반도체공학과 학과장"],["반도체공학과","2248","교수"],["반도체공학과","3761","부교수"],["반도체공학과","3764","조교수"],["반도체공학과","3767","조교수"],["반도체공학과","3752","학사업무(대학원)"],["반도체공학과","3753","연구비 관리"],["AI정책전략대학원","2934","조교수/AI정책전략대학원 대학원장"],["AI정책전략대학원","6590","교수"],["AI정책전략대학원","3626","교수"],["AI정책전략대학원","6600","조교수"],["AI정책전략대학원","6592","학사업무"],["AI정책전략대학원","6593","예산 및 창업"],["AI정책전략대학원","6606","연구관리"],["AI정책전략대학원","6607","연구관리"],["AI정책전략대학원","6605","연구관리"],["AI정책전략대학원","6604","연구관리"],["AI정책전략대학원","6608","연구관리"],["자연과학대학","3350","교수/대학장"],["자연과학대학","6141","자연과학대학 업무 총괄"],["자연과학대학","6145","수리과학과 교원인사 및 학과 총괄"],["자연과학대학","6143","물리광과학과 교원인사 및 학과 총괄"],["자연과학대학","6144","화학과 교원인사 및 학과 총괄"],["자연과학대학","6142","자연과학대학 학사업무"],["물리·광과학과","2879","교수/물리광과학과 학과장"],["물리·광과학과","2227","교수"],["물리·광과학과","2854","교수"],["물리·광과학과","3648","교수"],["물리·광과학과","4745","교수"],["물리·광과학과","5921","교수"],["물리·광과학과","2882","교수"],["물리·광과학과","3350","교수"],["물리·광과학과","2222","교수"],["물리·광과학과","2883","부교수"],["물리·광과학과","5925","부교수"],["물리·광과학과","3629","부교수"],["물리·광과학과","5937","조교수"],["물리·광과학과","5931","조교수"],["물리·광과학과","5930","특별전임직(교수)"],["물리·광과학과","5934","특별전임직(교수)"],["물리·광과학과","5940","초빙석좌교수"],["물리·광과학과","3347","겸무교수"],["물리·광과학과","4710","겸무교수"],["물리·광과학과","3645","실험교육강사"],["물리·광과학과","3611","실험교육강사"],["물리·광과학과","2225","학과실(연구비관리)"],["물리·광과학과","2884","학과실(학사/연구비)"],["물리·광과학과","5943","부교수"],["물리·광과학과","2226","학과실(연구비관리)"],["화학과","4770","교수"],["화학과","4622","교수"],["화학과","4640","부교수"],["화학과","4639","조교수"],["화학과","3630","교수"],["화학과","5324","교수"],["화학과","2871","교수"],["화학과","4644","조교수"],["화학과","4625","교수"],["화학과","4621","교수"],["화학과","3685","교수"],["화학과","2863","부교수"],["화학과","4634","교수"],["화학과","2847","교수"],["화학과","2848","교수"],["화학과","2346","교수"],["화학과","3202","특별전임직(교수)"],["화학과","4626","특별전임직(교수)"],["화학과","3655","특별전임직(부교수)"],["화학과","5323","연구위원(초빙석학교수)"],["화학과","3610","실험교육강사 (기초학부)"],["화학과","3684","실험교육강사 (화학전공)"],["화학과","2860","대학원 학사"],["화학과","2861","연구비 관리"],["화학과","2862","연구비 관리"],["화학과","2864","연구비 관리"],["화학과","2865","연구비 관리"],["화학과","4594","IRC/IBS 대형사업 관리"],["화학과","2867","IBS 지원업무"],["수리과학과","3666","부교수/수리과학과 학과장"],["수리과학과","3627","교수"],["수리과학과","3632","교수"],["수리과학과","3637","교수"],["수리과학과","3718","부교수"],["수리과학과","6011","조교수"],["수리과학과","6015","조교수"],["수리과학과","6014","특별전임직(조교수)"],["수리과학과","3693","초빙석학"],["수리과학과","3721","실험교육강사"],["수리과학과","3932","연구비 관리 및 학과 업무 지원"],["공과대학","2315","교수/공과대학장"],["공과대학","6161","공과대학 업무 총괄"],["공과대학","6162","기계로봇공학과 교원인사 및 학과 총괄"],["공과대학","6163","신소재공학과 교원인사 및 학과 총괄"],["공과대학","6164","환경·에너지공학과 교원인사 및 학과 총괄"],["공과대학","6165","공과대학 학사업무"],["신소재공학과","2322","교수/신소재공학과 학과장"],["신소재공학과","2319","교수"],["신소재공학과","2318","교수"],["신소재공학과","2305","교수"],["신소재공학과","2325","교수"],["신소재공학과","2324","교수"],["신소재공학과","2320","교수"],["신소재공학과","2312","교수"],["신소재공학과","2310","교수"],["신소재공학과","2358","교수"],["신소재공학과","2326","교수"],["신소재공학과","2341","교수"],["신소재공학과","2313","교수"],["신소재공학과","2730","교수"],["신소재공학과","2314","교수"],["신소재공학과","2339","부교수"],["신소재공학과","2732","조교수"],["신소재공학과","2738","조교수"],["신소재공학과","2307","조교수"],["신소재공학과","2741","조교수"],["신소재공학과","3176","연구과제관리"],["신소재공학과","2332","연구과제관리"],["신소재공학과","2301","연구과제관리"],["신소재공학과","2302","연구과제관리"],["신소재공학과","2303","대학원 학사업무"],["기계로봇공학과","2764","교수/기계로봇공학과 학과장"],["기계로봇공학과","2391","교수"],["기계로봇공학과","2393","교수"],["기계로봇공학과","3225","교수"],["기계로봇공학과","2407","교수"],["기계로봇공학과","2398","교수"],["기계로봇공학과","2779","교수"],["기계로봇공학과","2404","교수"],["기계로봇공학과","2408","부교수"],["기계로봇공학과","2773","교수/전공책임교수"],["기계로봇공학과","2771","부교수"],["기계로봇공학과","2774","부교수"],["기계로봇공학과","2787","부교수"],["기계로봇공학과","2772","부교수"],["기계로봇공학과","2805","조교수"],["기계로봇공학과","2413","조교수"],["기계로봇공학과","3246","특별전임직(부교수)"],["기계로봇공학과","2391","정년후교수(초빙석학)"],["기계로봇공학과","3719","실험교육강사"],["기계로봇공학과","2383","학사업무 및 행정지원 (대학원과정)"],["기계로봇공학과","2399","연구과제관리"],["기계로봇공학과","2382","연구과제관리"],["환경·에너지공학과","2836","교수/환경·에너지공학과 학과장"],["환경·에너지공학과","2441","교수"],["환경·에너지공학과","2437","교수"],["환경·에너지공학과","2445","교수"],["환경·에너지공학과","3276","교수"],["환경·에너지공학과","3278","교수"],["환경·에너지공학과","3279","교수"],["환경·에너지공학과","3277","교수"],["환경·에너지공학과","2440","교수"],["환경·에너지공학과","2834","교수"],["환경·에너지공학과","2438","교수"],["환경·에너지공학과","2468","교수"],["환경·에너지공학과","2464","교수"],["환경·에너지공학과","3691","특별전임직(교수)"],["환경·에너지공학과","3647","교수"],["환경·에너지공학과","2843","교수"],["환경·에너지공학과","3280","부교수"],["환경·에너지공학과","2465","교수"],["환경·에너지공학과","3650","부교수"],["환경·에너지공학과","2817","조교수"],["환경·에너지공학과","2814","조교수"],["환경·에너지공학과","2439","조교수"],["환경·에너지공학과","2435","초빙석학"],["환경·에너지공학과","3436","초빙석학"],["환경·에너지공학과","2822","연구과제관리"],["환경·에너지공학과","2433","연구과제관리"],["환경·에너지공학과","2826","연구과제관리"],["환경·에너지공학과","2432","대학원 학사업무"],["환경·에너지공학과","2820","연구과제관리"],["환경·에너지공학과","2466","연구과제관리"],["환경·에너지공학과","2467","연구과제관리"],["생명·의과학융합대학","6180","교수/대학장"],["생명·의과학융합대학","6181","팀장(총괄)"],["생명·의과학융합대학","6182","생명과학과 교원인사/기간제채용"],["생명·의과학융합대학","6183","의생명공학과 교원인사/기간제채용"],["생명·의과학융합대학","6184","대학 학사"],["생명과학과","2492","교수/생명과학과 학과장"],["생명과학과","2893","교수"],["생명과학과","3561","교수"],["생명과학과","2488","조교수"],["생명과학과","2502","교수"],["생명과학과","2509","교수"],["생명과학과","2890","교수"],["생명과학과","2491","명예교수"],["생명과학과","2496","교수"],["생명과학과","2503","교수"],["생명과학과","2489","교수"],["생명과학과","2508","교수"],["생명과학과","2507","교수"],["생명과학과","2493","교수"],["생명과학과","2510","교수"],["생명과학과","2506","교수"],["생명과학과","2495","조교수"],["생명과학과","3631","부교수/전공책임교수"],["생명과학과","2490","교수"],["생명과학과","3562","교수"],["생명과학과","2504","조교수"],["생명과학과","3688","특별전임직(부교수)"],["생명과학과","2487","명예교수"],["생명과학과","3612","생명기초 실험교육강사"],["생명과학과","3646","생명전공 실험교육강사"],["생명과학과","2499","연구비 관리"],["생명과학과","3560","연구비 관리"],["생명과학과","2483","연구비 관리"],["생명과학과","2481","대학원 학사업무 지원"],["의생명공학과","5363","교수/의생명공학과 학과장"],["의생명공학과","2220","교수"],["의생명공학과","2403","부교수"],["의생명공학과","3234","명예교수"],["의생명공학과","5374","부교수"],["의생명공학과","5361","명예교수"],["의생명공학과","5364","교수"],["의생명공학과","5377","교수"],["의생명공학과","3272","교수"],["의생명공학과","2753","교수"],["의생명공학과","5369","부교수"],["의생명공학과","5381","조교수"],["의생명공학과","5384","조교수"],["의생명공학과","5312","대학원 학사"],["의생명공학과","5313","연구과제관리"],["의생명공학과","5314","연구과제관리"],["의생명공학과","5315","연구과제관리"],["의생명공학과","5316","연구과제/행정지원"],["융합신경생리학과","3790","교수"],["융합신경생리학과","3794","조교수"],["융합신경생리학과","3781","대학원 학사"],["인문사회과학부","3717","교수/학부장"],["인문사회과학부","3657","교수/부학부장"],["인문사회과학부","3654","교수"],["인문사회과학부","3625","교수"],["인문사회과학부","3621","교수"],["인문사회과학부","3633","교수"],["인문사회과학부","3657","교수"],["인문사회과학부","3690","교수"],["인문사회과학부","3636","교수"],["인문사회과학부","3658","부교수"],["인문사회과학부","3659","부교수"],["인문사회과학부","3737","조교수"],["인문사회과학부","3635","조교수"],["인문사회과학부","3722","특별전임직(부교수)"],["인문사회과학부","3668","초빙석학교수"],["인문사회과학부","3941","팀장/교원인사"],["인문사회과학부","3942","학사/교과과정"],["인문사회과학부","3943","기간제인사/연구비"],["기술경영전문대학원","3638","기술경영전문대학원장"],["기술경영전문대학원","5322","기술경영전문대학원 전공책임교수"],["기술경영전문대학원","6600","기술경영전문대학원 조교수"],["기술경영전문대학원","4521","기술경영전문대학원 행정"],["기술경영전문대학원","4516","기술경영전문대학원 연구조교수"],["언어교육원","3621","언어교육원장"],["언어교육원","6652","언어교육원 행정"],["언어교육원","6655","언어교육원 행정"],["언어교육원","3652","(언어교육)영어강사"],["언어교육원","3707","(언어교육)영어강사"],["언어교육원","3706","(언어교육)영어강사"],["언어교육원","3708","(언어교육)영어강사"],["언어교육원","3696","(언어교육)영어강사"],["언어교육원","3653","(언어교육)영어강사"],["언어교육원","2921","(언어교육)영어강사"],["언어교육원","3651","(언어교육)영어강사"],["언어교육원","3709","(언어교육)영어강사"],["언어교육원","3697","(언어교육)한국어강사"],["교무처","2040","교무처장"],["교무팀","2041","팀장"],["교무팀","2048","교원인사(신규임용, 업적평가)"],["교무팀","2043","교무기획/교원 징계 및 포상/비전임인사"],["교무팀","2045","교수평의회/국외출장/외부강의,연구년,겸직,타업행위"],["교무팀","2042","교원인사(승진/재임용/정년보장)"],["학적팀","2051","업무총괄(팀장)"],["학적팀","2052","대학원 학적/학위수여/학적변동/수강관리/교학위/학력조회"],["학적팀","2057","대학 학적/전공운영/학위수여/성적관리"],["학적팀","2054","장학금/납입금"],["학적팀","2053","교과과정/학생지원경비/강의실배정/증명서 발급"],["기획처","2010","처장"],["기획조정실","2970","실장/ 업무 총괄"],["기획팀","2971","팀장"],["기획팀","2975","대정부/감사지원"],["기획팀","2974","이사회/기획위/평의원회/규정"],["기획팀","2976","공간/행정지원"],["기획팀","2972","국회/협력본부"],["예산팀","2011","팀장"],["예산팀","2012","실행예산"],["예산팀","2013","정부예산"],["예산팀","2014","GUP"],["예산팀","2015","정부예산"],["경영혁신팀","5051","팀장"],["경영혁신팀","5052","기관운영평가/사업기획"],["경영혁신팀","5053","세계대학평가/사업기획"],["경영혁신팀","5054","AI영재학교"],["경영혁신팀","5055","국내대학평가/공시/사업기획"],["입학학생처","3960","입학학생처장"],["학생팀","3601","팀장"],["학생팀","3603","대학 신입생캠프/학생 조식 지원(천원의 아침밥)/학생 포상"],["학생팀","3602","대학원 기숙사/기혼자아파트"],["학생팀","3606","대학 기숙사"],["학생팀","3604","기숙사 업무 지원/거주확인서 및 외국인 재정지원서 발급/전문연구요원 관리(병무)/학생 국외출장"],["학생팀","3605","학생행사/학생단체(동아리)/대학원 오리엔테이션/G-SURF"],["학생팀","3607","입학식/진로취업지원/취업통계"],["학생팀","3620","비교과프로그램(무한도전), 고교연계 프로그램(광주과학고, Pre-URP), SW관리"],["학생팀","3623","대학동 공동강의실 관리/자산관리"],["학생팀","3608","학생지원업무 기획, 학생소통 총괄, 학위수여식, 학생징계, 학생상벌위원회"],["입학팀","2951","팀장"],["입학팀","2953","대학 입시"],["입학팀","2954","대학 입시"],["입학팀","2956","대학 입시"],["입학팀","2958","대학 외국인 입시"],["입학팀","3951","대학원 외국인 입시"],["입학팀","3952","대학원 입시"],["입학팀","2952","대학 입시"],["입학팀","2955","대학 입시"],["상담센터","5363","센터장"],["상담센터","2981","상담(학업, 적응문제), 심리검사, 집단상담 운영, 상담 프로그램 기획"],["상담센터","2983","상담(성격, 대인관계), 심리검사, 실적관리, 또래상담자 운영, 프로그램 홍보"],["행정안전처","2100","행정안전처장"],["총무팀","2101","팀장/팀업무 총괄"],["총무팀","2103","청렴·반부패/개인정보보호"],["총무팀","2106","주거 복지(사택)/후생 복지/인력 관리"],["총무팀","2918","기관 공공사무(문서배부, 인장 관리 등)/부서(처,팀)자원 관리/기관의례 운영"],["총무팀","2104","주거 복지(YSB/국제관/내빈관), 후생복지"],["총무팀","2915","의전/업무용 차량 관리"],["총무팀","2112","행정지원(행정동 안내데스크/홍보물/근조기 관리/우편물 배부)"],["인사팀","5041","인사팀 업무 총괄"],["인사팀","5043","채용/교육"],["인사팀","5042","채용/직원 근태"],["인사팀","5044","비정규직 인사"],["인사팀","5045","급여/직책판공비/공제회/연말정산"],["인사팀","5046","4대보험/사학연금/퇴직금/복지카드"],["인사팀","5047","정규직 인사/위원회"],["재무팀","2121","재무팀장"],["재무팀","2123","출납/기타소득/국외출장"],["재무팀","2124","결산/통계자료/수입"],["재무팀","2127","자산/검수/자전거/법인카드/국내출장"],["재무팀","2137","검수"],["재무팀","2191",""],["계약팀","2131","팀장/팀업무총괄"],["계약팀","2133","용역/내자계약"],["계약팀","2132","공사/기술용역/외자계약"],["계약팀","2134","내자계약/기타계약"],["계약팀","2135","내자계약/직접구매"],["시설안전실","2141","실장"],["건설팀","2141","팀장/업무총괄"],["건설팀","2199","조경"],["건설팀","2146","건축/토목/석면"],["건설팀","2155","전기/전기소방/통신"],["건설팀","2157","기계/기계소방/가스"],["시설운영팀","2199","팀장"],["시설운영팀","2143","(안전)시설물 안전관리 총괄"],["시설운영팀","2145","(건축/영선) 행정 및 감독/시설영선 관리"],["시설운영팀","2142","(기계/소방) 기계설비 유지관리 및 감독"],["시설운영팀","2158","(기계/소방) 유지보수/도시가스 설비 유지관리"],["시설운영팀","2163","(전기/통신/방재) 행정 및 공사 감독/안전관리/공공요금"],["시설운영팀","2155","(전기/통신/방재) 유지보수/전기안전관리"],["시설운영팀","2156","(전기/통신/방재) 유지보수/전기안전관리"],["시설운영팀","2152","(조경/토목) 유지보수/창고·야적장·텃밭·자재 관리"],["시설운영팀","2160","(행정/음향/체육/공간) 행정/체육시설/음향/공간 및 강당관리/자산"],["시설운영팀","2167","(환경) 폐수설비/지정·의료폐기물/대연못수질 관리"],["시설운영팀","2294","(클린룸) 클린룸/고압가스 냉동제조 안전관리"],["안전팀","5501/2148","팀장/방사선안전"],["안전팀","5503","산업안전/재난안전"],["안전팀","5502","연구실안전/안전체험교육장"],["안전팀","5505","연구실안전/안전체험교육장"],["안전팀","5506","방사선안전"],["안전팀","5504","생물안전"],["안전팀","2107","보건/의무실/건강진단"],["안전팀","5508","보안/경비"],["안전팀","2105","예비군 대대장(예비군/민방위/비상계획)"],["안전팀","5510","예비군 대대 참모(예비군/민방위/비상계획)"],["학술정보처","2080","처장"],["학술정보팀","2081","팀장"],["학술정보팀","2085","전자정보원 수서/연구성과(RIMS)/Prominent GIST Academics"],["학술정보팀","2089","단행본 수서/도서검수/학위논문/기간제 인사"],["학술정보팀","2083, 6082","도서관 시스템·홈페이지/GIST Scholar 구축"],["학술정보팀","2086","전시문화/홍보/이용자교육"],["학술정보팀","2087","RIMS/ IR Data 구축"],["학술정보팀","2082","LAS 데이터 보완/이용자 서비스 지원"],["학술정보팀","2093","LG도서관 대출대/"],["학술정보팀","2084","LG도서관 대출대/상호대차/원문복사"],["학술정보팀","2094","중앙도서관 안내데스크/시설예약/도서관카드 발급"],["학술정보팀","2094","중앙도서관 안내데스크/시설예약"],["정보운영팀","2071","팀장/통합홈페이지/문서공유"],["정보운영팀","2075","E-mail/그룹웨어/기관라이센스"],["정보운영팀","2074","통합정보시스템/연계서버"],["정보운영팀","2073","통합정보시스템/포털/정보화전략"],["정보운영팀","2077","통합정보시스템/공공데이터"],["정보운영팀","2076","통합정보시스템/공용서버관리/백업"],["정보보안팀","5071","팀장"],["정보보안팀","5072","정보보안"],["정보보안팀","5073","정보보안"],["슈퍼컴퓨팅센터","2219","센터장"],["슈퍼컴퓨팅센터","5531","연구관리"],["슈퍼컴퓨팅센터","5532","연구원"],["슈퍼컴퓨팅센터","5536","연구원"],["슈퍼컴퓨팅센터","5534","연구원"],["법무실","6801","팀장, 업무총괄"],["법무실","6803","노무/법무(소송, 법률자문) 상담/사건처리"],["법무실","6802","법무(소송, 법률자문) 상담/사건처리"],["법무실","6804","법무(소송, 법률자문) 상담/사건처리"],["인권센터","6813","센터장"],["인권센터","6812","인권 침해 사건 상담/사건처리/교육"],["인권센터","6811","인권 침해 사건 상담/사건처리/교육"],["R&D혁신기획본부","5222","본부장"],["R&D혁신기획본부","5217","책임연구원"],["R&D혁신기획본부","5221","행정/연구관리"],["R&D혁신기획본부","5220","연구관리"],["R&D혁신기획본부","5219","연구 기획"],["R&D혁신기획본부","5218","연구과제관리"],["R&D혁신기획본부","5216","책임연구원"],["R&D혁신기획본부","5223","연구관리"],["R&D혁신기획본부","5224","책임연구원"],["연구처","2030","연구처장"],["연구관리팀","2031","팀장"],["연구관리팀","2032","과기부(개인-리더,핵심,세종과학펠로우십 등,집단연구,기반구축)/용역"],["연구관리팀","2033","연구관리제도/규정/전산화/연구비 결산/통계/연구비 감사/대내외요구자료/연구시설장비비 풀링"],["연구관리팀","2034","과기정통부(ICT)/교육부/문체부/연구비카드"],["연구관리팀","2035","국토부/해수부/국방부/식약처/공공수탁/학생인건비 풀링/e나라도움(보탬e)"],["연구관리팀","2036","과기부(개인-신진연구)/외부참여연구자 기관장 확인서/학생인건비풀링지원/수익금"],["연구관리팀","2037","과기부(미래유망원천,탄소중립기반구축,원자력진흥,국제협력,BP등)/기타부처/국외수탁/통합 Ezbaro"],["연구관리팀","2038","산업부/중기부/기후부/농식품부/고용노동부/행안부/복지부/통합RCMS"],["연구관리팀","2028","GIST연구개발사업/민간수탁(기술자문포함)/R&D Academy"],["연구지원팀","2931","연구지원팀 팀장"],["연구지원팀","2938","InnoCORE 사업 관리, GIST개발과제, 연구원 인사"],["연구지원팀","2932","연구원인사(채용/승진/재계약 등), IBS지원, 연구윤리, 위원회(인사/연구/진실성)"],["연구지원팀","2940","연구데이터 구축 운영, IBS 캠퍼스 연구단, 4대 과기원 연구처 협의회 운영, 기간제근로자 인사"],["연구지원팀","2933","GIST-MIT 공동연구, 연구지원체계평가, 연구보안, 생명윤리"],["연구지원팀","2937","InnoCORE 사업 지원, GIST개발과제"],["연구지원팀","2935","연구노트(전자연구노트), 연구센터 관리, 연구원인사(출장, 겸직, 타업 등), 부서 서무"],["실험동물자원센터","5254","센터장"],["실험동물자원센터","5591","전임수의사"],["실험동물자원센터","5597","시설관리/행정지원"],["실험동물자원센터","5593","연구행정지원"],["실험동물자원센터","5582","세포주의무검사 기술지원"],["실험동물자원센터","5595","조직병리/임상병리 기술지원"],["첨단AI반도체팹센터","3761","센터장"],["첨단AI반도체팹센터","4551","FAB 센터 구축 업무 총괄"],["첨단AI반도체팹센터","4552","FAB 센터 구축 업무 지원"],["첨단AI반도체팹센터","4553","FAB 센터 구축 업무 지원"],["창업혁신진흥원","3090","창업혁신진흥원 원장"],["창업혁신전략센터","6301","센터장"],["창업진흥센터","6300","창업진흥실장, 업무 총괄"],["창업진흥센터","6305","GIST 엑설러레이팅 프로그램, 공공기술기반 시장연계 창업탐색 지원사업 실무 책임, RISE 겸무"],["창업진흥센터","2597","창업보육 업무, 선도 대학프로그램"],["창업진흥센터","6303","학생 창업서포터즈 및 창업동아리, 창업미니스쿨, 장비 활용 교육 및 시제품 제작 멘토링, 복합창업공간(CSG) 관리, 스타트업나이트, 창업런치토크"],["창업진흥센터","6302","GIST 모의창업 프로그램(GSS), 집중창업캠프, 원포인트 창업 멘토링, GIST-호남권대학 창업아이디어 경진대회, 특성화대학 공동창업 아이디어 경진대회, AI&IoT 메이커톤 대회, 산학협력 인턴십, 행정업무"],["창업진흥센터","6304","창업 프로그램 기획.운영, 신규 창업지원 사업 기획.운영, 호남권 창업원 업무 수행(창업혁신전략실 겸무)"],["창업진흥센터","6308","공공기술기반 시장연계 창업탐색 지원사업"],["창업진흥센터","6306","-"],["창업진흥센터","6307","공공기술기반 시장연계 창업탐색 지원사업"],["창업진흥센터","6310","공공기술기반 시장연계 창업탐색 지원사업"],["기술사업화센터","3071","센터장"],["기술사업화센터","3074","출자기업/시스템관리/산학협력연구관"],["기술사업화센터","3077","기술이전(IT: 기계,정보,고등광,융합)/기술이전 관리/산업체 애로기술지도"],["기술사업화센터","3095","기술이전(NT: 신소재, 지구환경, 물리, 화학)/실용화사업"],["기술사업화센터","3479","특허관리/발명시스템 관리"],["기술사업화센터","3076","특허관리/특허교육 및 행정"],["기술사업화센터","3073","TLO 혁신 사업"],["기술사업화센터","3075","기술이전(IT 분야)/기술이전 관리/창업활성화 사업"],["기술사업화센터","3086","인사/행정/연구소기업"],["고등광기술연구원","3370","원장"],["연구소","5208","산학교수/GIST-안보과학기술 발전 및 대형 연구사업 확보"],["차세대에너지연구소","3461","소장"],["차세대에너지연구소","3483","부소장/책임연구원"],["차세대에너지연구소","3474","명예석좌교수"],["차세대에너지연구소","3533","연구부교수"],["차세대에너지연구소","3487","위촉연구원"],["차세대에너지연구소","3462","(행정지원팀) 행정"],["차세대에너지연구소","3463","(행정지원팀) 연구비 관리"],["차세대에너지연구소","3536","(행정지원팀) 시설 장비 및 대외협력"],["차세대에너지연구소","3458","(행정지원팀) 기관전략연구단"],["차세대에너지연구소","3459","(행정지원팀) 기관전략연구단"],["한국문화기술연구소","4901","소장"],["한국문화기술연구소","4933","전임연구원"],["한국문화기술연구소","4935","전임연구원"],["한국문화기술연구소","4923","위촉책임연구원"],["한국문화기술연구소","4922","위촉책임연구원"],["한국문화기술연구소","4928","위촉선임연구원"],["한국문화기술연구소","4906","위촉연구원"],["한국문화기술연구소","4937","위촉연구원"],["한국문화기술연구소","4941","위촉연구원"],["한국문화기술연구소","4925","위촉연구원(전문)"],["한국문화기술연구소","4932","위촉연구원"],["한국문화기술연구소","4931","위촉연구원"],["한국문화기술연구소","4326","박사후연구원(전문)"],["한국문화기술연구소","4924","박사후연구원"],["한국문화기술연구소","4902","행정"],["한국문화기술연구소","4903","행정"],["한국문화기술연구소","4938","연구관리"],["한국문화기술연구소","4927","연구관리"],["생명의과학융합연구소","2510","연구소장"],["생명의과학융합연구소","2524","위촉연구원"],["생명의과학융합연구소","2899","위촉연구원"],["생명의과학융합연구소","2531","연구소 행정"],["국제환경연구소","3391","소장"],["국제환경연구소","3393","국제협력"],["국제환경연구소","3395","연구 기획"],["국제환경연구소","2578","연구소 일반행정/인사"],["국제환경연구소","3366","KOICA 사업 지원/연구비 관리"],["인공지능연구소","6913","소장"],["인공지능연구소","6923","연구소 행정"],["인공지능연구소","6925","연구과제 기획"],["중앙기기연구소","5230","소장/연구소 운영 총괄"],["중앙기기연구소","5231","팀장/연구소 행정 총괄"],["첨단분석센터","5234","운영위원회, 지침, 기획/기관평가/국정감사, 인사"],["첨단분석센터","5238","시험분석료 정산(외부), 서무"],["첨단분석센터","5236","시험분석료 정산(내부), 홈페이지, 개인정보, 교육 및 세미나 운영"],["첨단분석센터","5256","전자현미경실 분석(TEM-300kV, Cs-TEM)"],["첨단분석센터","5244","전자현미경실 분석(FIB), 자산관리"],["첨단분석센터","5251","전자현미경실 분석(TEM-200kV)"],["첨단분석센터","5235","전자현미경실 분석(FE-SEM, E-SEM)"],["첨단분석센터","5248","바이오분광분석실 분석(Cryo-EM, 2Photon, RSS, HTM, MMR), 장비심의위원회, 장비관리"],["첨단분석센터","5249","이미지분석부 총괄, 바이오분광분석실 분석(LSFM, CLSM, SZM, C-Process, C-Phoresis, C-Stain)"],["첨단분석센터","5237","질량분석실 분석(LC/GC-QToF-MS, LC/TQ-MS, Orbitrap-MS)"],["첨단분석센터","5243","질량분석실 분석(ICP-OES, LC-ICP-MS/MS, ICP-MS, LC/ICP-MS, GC-IRMS)"],["첨단분석센터","5250","질량분석실 분석(Py-GCMS, HS-GCMS, MALDI-ToF)"],["첨단분석센터","5246","표면물성분석실 분석(XPS)"],["첨단분석센터","5241","물성분석부 총괄, 분석(Bio-AFM, AFM, 4PP, 5MC, EDM, CNC 선반, 3D Printer)"],["첨단분석센터","5242","표면물성분석실 분석(DSC, TGA, STA, LCM, EA-CHNS, 4PP, EA-CHNS/O)"],["첨단분석센터","5255","표면물성분석실 분석(Multi-purpose XRD, SC-XRD, Powder XRD)"],["첨단분석센터","5232","전자현미경실 분석(UHR-FE-SEM)"],["첨단분석센터","5245","바이오분광분석실 분석(600MHz/400MHz NMR, FT-IR, DLS)"],["대외협력처","2060","대외협력처장"],["글로벌협력실","6251","실장"],["글로벌협력실","6252","국외MoU/국제협력/국외인사의전"],["글로벌협력실","6254","교환학생(In)/GIP/Bilingula Campus/IPA홈페이지"],["글로벌협력실","6256","International Support/K-STAR 비자트랙"],["글로벌협력실","6257","교환학생(Out)/SAP/해외계절학기/해외연구인턴십"],["글로벌협력실","6258","해외사회공헌/버디프로그램/국외홍보/International Support"],["글로벌협력실","6255","Bilingual Campus Coordinator/영문홈페이지"],["대외홍보팀","2061","업무총괄 및 현안대응"],["대외홍보팀","2062","국내 언론홍보 / 언론사 광고"],["대외홍보팀","2063","온라인 홍보 / UI / 홈페이지"],["대외홍보팀","2064","사진·영상 촬영"],["대외홍보팀","2065","GIST Press / 홍보관 / 학생언론"],["대외홍보팀","2066","사회공헌 / 학생홍보대사 / 견학"],["대외홍보팀","2068","MOU / 대표행사 / 홍보물"],["발전기금팀","5021","팀장"],["발전기금팀","5023","모금기획"],["발전기금팀","5022","기금 회계 / 기부자예우"],["교학부총장실","3002","교학부총장"],["AI 순환경제 클러스터링 학제전공","2836","대학원장"],["AI 순환경제 클러스터링 학제전공","2439","부원장"],["AI 순환경제 클러스터링 학제전공","2467","담당"],["대외부총장실","3003","대외부총장"],["GIST아카데미","2621","사무국장"],["GIST아카데미","2611","오룡관 관리"],["GIST아카데미","2622","GTMBA 과정 운영"],["GIST아카데미","2624","GTMBA 과정 운영"],["GIST아카데미","2623","오룡아트홀, GTMBA 총동문회 관리"],["연구부총장실","5100","연구부총장"],["고등광기술연구원 미래우주국방융합연구본부","3386","수석연구원/ 광섬유 레이저 모듈 연구"],["고등광기술연구원 미래우주국방융합연구본부","3374","본부장(수석연구원)/ THz 광원 연구 개발"],["고등광기술연구원 광기반원천연구부","3430","수석연구원/광위상배열 안테나 기반초소형 IoT 모션센서 개발"],["고등광기술연구원 광기반원천연구부","3362","연구부장(수석연구원)/ 나노플라즈모닉 광특성 연구"],["고등광기술연구원 광기반원천연구부","3347","수석연구원/ 유-무기 반도체 소재를 이용한 고효율 광전 소자 개발"],["고등광기술연구원 광기반원천연구부","3363","수석연구원 / 초고감도 바이오센싱 플랫폼 개발 연구"],["고등광기술연구원 광기반원천연구부","3309","수석연구원 /극초단의 레이저 분광 기술 연구 개발"],["고등광기술연구원 광기반원천연구부","3450","책임연구원 / 광학및 반도체 나노소재 합성 연구"],["고등광기술연구원 광기반원천연구부","3452","선임연구원/ 초음파 유도 광 영상 및 치료 헬스케어 연구"],["고등광기술연구원 광응용시스템연구부","3426","수석연구원/광결정 메타물질 전산모사"],["고등광기술연구원 광응용시스템연구부","3323","수석연구원/단일광자를 이용한 양자기술 연구"],["고등광기술연구원 광응용시스템연구부","3376","수석연구원/ 광섬유 레이저 응용기술 연구 개발"],["고등광기술연구원 광응용시스템연구부","3427","수석연구원/ 광섬유 센서 시스템 연구"],["고등광기술연구원 광응용시스템연구부","3337","수석연구원/ 초미세 레이저 가공 및 광 정보처리연구"],["고등광기술연구원 광응용시스템연구부","3343","수석연구원/ 고성능 광섬유 레이저 연구 개발"],["고등광기술연구원 광응용시스템연구부","3373","수석연구원 / 레이저 대즐링 능동방어 기술 개발"],["고등광기술연구원 광응용시스템연구부","3425","수석연구원/다중 광특성 동시조절 광결정 광섬유 개발"],["고등광기술연구원 광응용시스템연구부","3451","선임연구원/ 초강력 레이저와 물질의 상호작용 연구"],["고등광기술연구원 광응용시스템연구부","3424","위촉연구원/레이저 응용연구"],["고등광기술연구원 초강력레이저연구부","3454","선임연구원 /레이저_고체 표적의 상호작용 연구"],["고등광기술연구원 초강력레이저연구부","3334","위촉연구원 / 광결정 기반 섬유 연구 및 플라즈마 데이터 분석"],["고등광기술연구원 초강력레이저연구부","3449","선임연구원 / 상대론적 고차조화파 발생 연구"],["고등광기술연구원 초강력레이저연구부","4709","책임연구원 / 초강력레이저-플라즈마 상호 작용 연구"],["고등광기술연구원 초강력레이저연구부","3336","수석연구원 / 고출력 펨토초 중적외선 레이저 개발 연구"],["고등광기술연구원 초강력레이저연구부","4710","수석연구원/ 초강력 레이저를 이용한 상대론적 영역의 레이저-물질 상호작용 연구"],["고등광기술연구원 초강력레이저연구부","3375","수석연구원/ 전자장비 무력화용 초강력레이저 및 플라즈마 개발"],["고등광기술연구원 초강력레이저연구부","4708","수석연구원 / 극초단광양자빔을 이용한 양성자빔 가속"],["고등광기술연구원 초강력레이저연구부","4716","연구부장(수석연구원)/ 극초단 광양자빔 레이저 기술 개발"],["고등광기술연구원 초강력레이저연구부","4715","부원장(수석연구원) /초강력레이저 연구 개발"],["고등광기술연구원 초강력레이저연구부","3455","선임연구원/ 고출력 고체레이저 및 스마트 레이저 연구"],["고등광기술연구원 경영지원실","3432","업무총괄/경영지원실장"],["고등광기술연구원 경영지원실","3416","연구원인사/기간제인사/기획/통계"],["고등광기술연구원 경영지원실","4743","시설물/자산/안전/공간"],["고등광기술연구원 경영지원실","4744","시설물/자산 관리"],["고등광기술연구원 경영지원실","4718","실행예산/행사/홍보"],["고등광기술연구원 경영지원실","3418","연구비관리"],["고등광기술연구원 경영지원실","3417","연구비관리"],["고등광기술연구원 경영지원실","3422","서무/실행예산/홈페이지"],["고등광기술연구원 초강력레이저연구부","3453","선임연구원/극초단 고출력 레이저 연구"],["고등광기술연구원 광응용시스템연구부","3456","선임연구원"]];
const PROFDIR=[["강성봉","환경·에너지공학과","2465","ECL 환경촉매 연구실"],["강창근","환경·에너지공학과","2834","SIEL 동위원소생태학 연구실"],["김상돈","환경·에너지공학과","2445","ETCL 환경독성화학 연구실"],["김은석","환경·에너지공학과","3650","EEL 진화생태학 연구실"],["김준하","환경·에너지공학과","3277","AI융합시스템공학연구실"],["김창우","환경·에너지공학과","2817","WSL 물 안보 연구실"],["김태영","환경·에너지공학과","3647","EMAL 환경질량분석화학 연구실"],["김형록","환경·에너지공학과","2439","Hydro AI 수문원격탐사 인공지능 연구실"],["민경은","환경·에너지공학과","3280","ATMOSLab 대기오염물질측정 연구실"],["박기홍","환경·에너지공학과","3279","ATML 에어로졸공학모니터링 연구실"],["박영준(학과장)","환경·에너지공학과","2836","CnESL 탄소에너지시스템 연구실"],["송철한","환경·에너지공학과","3276","AIR Lab 대기화학정보 연구실"],["윤진호","환경·에너지공학과","2464","CAM Lab 기후 분석 & 모델링 연구실"],["이윤호","환경·에너지공학과","2468","WQTL 수질 및 수처리 연구실"],["이재영","환경·에너지공학과","2440","ERTL 전기화학·촉매 연구실"],["장인섭","환경·에너지공학과","3278","EBL 에너지바이오텍 연구실"],["주종훈","환경·에너지공학과","2843","EEML 에너지/환경 소재 연구실"],["최희철","환경·에너지공학과","2441","ENL 환경나노 연구실"],["한승희","환경·에너지공학과","2438","TMBL 미량금속생지화학 연구실"],["허호길","환경·에너지공학과","2437","AEML 응용환경미생물 연구실"],["황희정","환경·에너지공학과","2814","EMSL 지구물질과학 연구실"],["Suthipong Sthiannopako","환경·에너지공학과","3691",""],["고흥조","신소재공학과","2310","플렉시블 전기전자 소자 연구실"],["권인찬","신소재공학과","2312","기능성 단백질 공학 연구실"],["김동유","신소재공학과","2319","광기능성 고분자 연구실"],["김봉중","신소재공학과","2341","실시간 나노-에너지 프로세싱 연구실"],["김현호","신소재공학과","2307","저차원나노소재 및 반도체 소자 연구실"],["김호범","신소재공학과","2741","광반도체 전자소자 연구실"],["박지웅","신소재공학과","2315","소프트 나노 에너지 소재 연구실"],["엄광섭","신소재공학과","2313","전기화학 에너지시스템 연구실"],["연한울","신소재공학과","2738","지능형 금속배선 연구실"],["유승준","신소재공학과","2339","유기전기화학·에너지 소재 연구실"],["윤명한","신소재공학과","2320","생체전자 소재 연구실"],["이상한","신소재공학과","2314","지속가능 에너지 / 전자 소재 및 소자 연구실"],["이은지","신소재공학과","2730","고분자 나노소재 나노스코피 연구실"],["이주형(학과장)","신소재공학과","2322","전산 재료 과학 연구실"],["이한얼","신소재공학과","2366","차세대 광전자 소재 및 소자 연구실"],["정건영","신소재공학과","2324","집적 시스템 공정 연구실"],["조지영","신소재공학과","2326","기능성 산화물 나노구조 연구실"],["태기융","신소재공학과","2305","생체 고분자공학 연구실"],["하민정","신소재공학과","2732","지능형 소재 및 소자 연구실"],["설재훈","기계로봇공학과","2764","나노에너지 및 열전달 연구실"],["지솔근","기계로봇공학과","2773","유체역학 연구실"],["고광희","기계로봇공학과","3225","모델링 및 시뮬레이션 연구실"],["김민경","기계로봇공학과","2772","나노포토닉스 연구실"],["김태성","기계로봇공학과","2404","공탄성 설계 및 구조 동역학 연구실"],["김표진","기계로봇공학과","2805","기계 인지 및 지능 연구실"],["배진현","기계로봇공학과","2413","친환경 연소 및 추진 연구실"],["안효성","기계로봇공학과","2398","분산제어 및 자동화시스템 연구실"],["양 성","기계로봇공학과","2407","바이오멤스 연구실"],["오현석","기계로봇공학과","2774","스마트 진단 및 설계 최적화 연구실"],["이승현","기계로봇공학과","2787","이상유동열관리 연구실"],["이재욱","기계로봇공학과","2779","전기동력 모빌리티 설계최적화 연구실"],["정성호","기계로봇공학과","2393","레이저마이크로/나노가공 연구실"],["최성임","기계로봇공학과","2771","데이터 기반 시뮬레이션 및 설계 연구실"],["허필원","기계로봇공학과","2408","Dynamics and Biomechatronics Laboratory"],["Arshad Afzal","기계로봇공학과","3246",""],["김민곤","화학과","3330","바이오센서 및 바이오포토닉스연구실"],["김상륜","화학과","5328","고체 화학 및 에너지 과학 연구실"],["김유수 (IBS 양자변환연구단 단장)","화학과","4770","IBS 양자변환 연구단"],["김정욱","화학과","4622","효소구조기능연구실"],["김현우","화학과","4640","양자화학 시뮬레이션 연구실"],["박정은","화학과","4639","빛-나노화학 연구실"],["박진주","화학과","3630","구조생화학연구실"],["박찬호","화학과","5323","에너지 촉매 및 디바이스 연구실"],["방윤수","화학과","2871","에너지 분광학 연구실"],["서다예","화학과","4644","전기화학 연구실"],["서준혁","화학과","4625","융합촉매연구실"],["서지원(학과장)","화학과","3628","펩타이드 신약개발 연구실"],["안진희","화학과","4621","의약화학연구실"],["이강택","화학과","3685","나노바이오 포토닉스 연구실"],["이호재","화학과","2863","광양자화학 연구실"],["임현섭","화학과","4634","나노표면화학 연구실"],["정원진","화학과","2847","유기합성 연구실"],["한민수","화학과","2848","생유기화학연구실"],["홍석원","화학과","2346","기능성 유기분자 합성 연구실"],["Jiaojie Li (강의전담)","화학과","3655",""],["최준호 (강의전담)","화학과","4626","계산화학 연구실"],["김희주 (산학연전임)","화학과","3202",""],["김형진 (연구위원·초빙석학교수)","화학과","5323",""],["조병익(학과장)","물리·광과학과","2879","고에너지밀도물리 연구실"],["고도경","물리·광과학과","2227","초고속 비선형 광학 연구실"],["김경택","물리·광과학과","2854","아토초과학 연구실"],["김근영","물리·광과학과","3648","양자 및 중력 이론 연구실"],["김동희","물리·광과학과","2883","계산물리 및 양자다체이론 연구실"],["남창희(명예교수)","물리·광과학과","5940","초강력 레이저과학 연구단"],["노도영","물리·광과학과","2311","X-선 나노현상 연구실"],["도용주","물리·광과학과","5921","양자 소자 연구실"],["문봉진","물리·광과학과","2882","광전자분광학 연구실"],["박태관","물리·광과학과","5946","초고속 분광학 연구실"],["방우석","물리·광과학과","5925","레이저 핵융합 연구실"],["석희용","물리·광과학과","3350","레이저-플라즈마 가속 연구실"],["신동빈","물리·광과학과","5937","응집물질물리 이론 연구실"],["유운종","물리·광과학과","3629","계산물리학 연구실"],["이상윤","물리·광과학과","5931","스핀 양자정보 연구실"],["최상준","물리·광과학과","5943","양자 결맞음·수송 이론 연구실"],["김철민(겸임)","물리·광과학과","4710","초강력 레이저 연구실"],["이창열(겸임)","물리·광과학과","3347","유기반도체소자연구실"],["권용훈","생명과학과","2488","바이오센서 및 분자진단 연구실"],["김영준(학과장)","생명과학과","2492","분자행동신경학 연구실"],["김용철","생명과학과","2502","신약개발 연구실"],["남정석","생명과학과","2893","암생물학 연구실"],["다런 윌리암스","생명과학과","2509","신약표적 연구실"],["박대호","생명과학과","2890","세포제거 연구실"],["박지용","생명과학과","2496","기능-의약단백질체 연구실"],["박지환","생명과학과","2503","기능 유전체학 실험실"],["박철승","생명과학과","2489","분자신경생물학 연구실"],["송미령","생명과학과","2508","신경 네트워크 및 전사체 연구실"],["심해홍","생명과학과","2507","RNA 유전체학 및 후성유전체학 연구실"],["엄수현","생명과학과","2493","단백질 구조-기능 연구실"],["전영수","생명과학과","2510","세포 및 바이러스 로지스틱스 연구실"],["전창덕","생명과학과","2506","면역 시냅스 세포치료 연구실"],["정강훈","생명과학과","2495","신경생물 지능 연구실"],["정현수","생명과학과","2505","계산유전체학·진화의학 연구실"],["조경래 (전공책임교수)","생명과학과","3631","종양대사 연구실"],["조정희","생명과학과","2490","생식생의학 및 유전자 발굴 연구실"],["진미선","생명과학과","3562","세포막 단백질 구조 및 기능 연구실"],["진석원","생명과학과","3561","신호전달 연구실"],["최진욱","생명과학과","2504","염증과 조직재생 실험실"],["권혁상","의생명공학과","2403","3차원 광의학 이미지 연구실"],["김재관","의생명공학과","2220","전자디지털 테라노스틱스 연구실"],["김태(학과장)","의생명공학과","5363","중개 뇌과학 연구실"],["류동렬","의생명공학과","5374","분자통합생물학연구실"],["박래길","의생명공학과","5361","퍼록시좀·지질대사 연구실"],["박한수","의생명공학과","5364","유전체 의학 연구실"],["오창명","의생명공학과","5377","노화 및 대사질환 연구실"],["유진희","의생명공학과","5384",""],["이보름","의생명공학과","3272","생체정보 및 신호 연구실"],["이상준","의생명공학과","5381","뇌-신체 상호작용 연구실"],["정의헌","의생명공학과","2753","뉴로포토닉스 연구실"],["조준","의생명공학과","5369","분자 의생물학 연구실"],["김민기(학과장)","수리과학과","3666",""],["황치옥","수리과학과","3627",""],["송정민","수리과학과","3632",""],["최정옥","수리과학과","3637",""],["강현석","수리과학과","3718",""],["황건호","수리과학과","6011",""],["박정례(강의전담)","수리과학과","6014",""],["오세욱","수리과학과","6015",""],["강지연","AI학과","5334","인공지능 기반 웨어러블 로보틱스 연구실"],["김강일","AI학과","2260","지능 표현 및 추론 연구실"],["김관영","AI학과","6400","실용 인공지능 최적화 연구실"],["김경중","AI학과","5345","인지 및 지능 연구실"],["김만수","AI학과","6390","의료인공지능 연구실"],["김선동","AI학과","6387","데이터 사이언스 연구실"],["김승준","AI학과","5331","인간중심 지능형 시스템 연구실"],["김의환","AI학과","6384","자율컴퓨팅시스템 연구실"],["김종원","AI학과","2219","네트워크기반 지능 연구실"],["문보창","AI학과","5341","컴퓨터 그래픽스 연구실"],["박건혁","AI학과","2261","햅틱 보조 미디어 연구실"],["안창욱","AI학과","2661","메타-진화기계지능 연구실"],["윤정원","AI학과","5332","지능형 의료로봇 연구실"],["이규빈","AI학과","5333","Artificial Intelligence Lab."],["이용구","AI학과","2396","자율주행 연구실"],["이현주","AI학과","2213","데이터마이닝 및 계산생물학 연구실"],["전성찬","AI학과","2216","바이오컴퓨팅 연구실"],["홍진혁","AI학과","5343","소프트 컴퓨팅 & 인터랙션 연구실"],["송은성(특별전임)","AI학과","5343","Art & Tech lab"],["이지현(특별전임)","AI학과","5346","Art & Tech lab"],["공득조","AI정책전략대학원","2934","IMPACT LAB"],["김기배","AI정책전략대학원","6600","AI-Eco Lab"],["박도현","AI정책전략대학원","6393","법정책 연구실"],["강동호","반도체공학과","2638","나노 전자 광전소자 연구실"],["권동석","반도체공학과","3767","미래 컴퓨팅 소자 연구실"],["김강욱","반도체공학과","3226","마이크로웨이브 센싱 및 이미지 연구실"],["김상진","반도체공학과","2267","SYMPLE 연구실"],["박동운","반도체공학과","3768",""],["신현진","반도체공학과","3761","혁신전자 소자 및 첨단나노소재 연구실"],["윤훈한","반도체공학과","3764","양자 물질 계면 및 나노 소자 연구실"],["이동선","반도체공학과","2248","반도체 발광소자 연구실"],["이민재","반도체공학과","2205","집적회로 및 시스템 연구실"],["이병하","반도체공학과","2234",""],["이일민","반도체공학과","2642","집적회로 설계 연구실"],["정현호","반도체공학과","2236","나노시스템 연구실"],["조영달","반도체공학과","2230","지능형 반도체 연구실"],["한상문","반도체공학과","","전자 광반도체 소재 연구실"],["홍성민","반도체공학과","2640","반도체소자 시뮬레이션 연구실"],["이현욱","AX학과","3840","컴퓨터 시스템 및 마이크로아키텍처 설계 연구실"],["서성배","융합신경생리학과","3790","마이크로바이옴-체-뇌-신경생리학 연구실"],["장진호","융합신경생리학과","3794","호흡 및 정서 신경회로 연구실"]];
{const DIRU="https://www.gist.ac.kr/kr/html/sub01/010602.html";const tel=x=>x?("내선 "+x+" (062-715-"+x.split(/[\/,]/)[0].trim()+")"):"내선 미기재";
 for(let i=IDX.length-1;i>=0;i--)if(IDX[i].s==="people")IDX.splice(i,1);
 PROFDIR.forEach(([n,d,e,lab])=>{const base=n.replace(/\s*[\(\[].*$/,"");const role=(n.match(/[\(\[]([^\)\]]+)[\)\]]/)||[])[1]||"";const hp=(typeof DURL==="object"&&DURL[d])?dhref(d):"";
  IDX.push({s:"people",site:"사람 · "+d,t:base+" 교수"+(role?" ("+role+")":""),p:d+(lab?" · "+lab:"")+" · "+tel(e),k:base+" "+n+" 교수 "+d+" "+lab+" "+e,u:hp,h:hp,w:3});});
 const SY=[[/차량/,"주차"],[/생활관/,"기숙사"],[/국외출장|국내출장|여비/,"출장 여비"],[/학적/,"휴학 복학 재학증명"],[/장학/,"장학금"],[/급여/,"월급 봉급"],[/채용/,"인사 채용"],[/보건|의무실/,"병원 아플때"],[/도서/,"도서관 책"]];
 {const GG=[],GM={};ORGDIR.forEach(([d,e,u])=>{const key=d+"|"+String(u||"").trim();if(!GM[key]){GM[key]={d,u,e:[]};GG.push(GM[key]);}GM[key].e.push(String(e));});GG.forEach(({d,u,e})=>{const x=SY.filter(z=>z[0].test(u)).map(z=>z[1]).join(" ");IDX.push({s:"people",site:"사람 · "+d,t:(u||"(업무 미기재)")+(e.length>1?" ("+e.length+"명)":""),p:d+" · "+(e.length>1?"내선 "+e.join(" · "):tel(e[0])),k:d+" "+u+" "+e.join(" ")+" "+x,u:DIRU,h:DIRU});});}
 window.__deptBlock=q=>{q=(q||"").replace(/\s/g,"");if(q.length<2)return "";const names=[...new Set(ORGDIR.map(r=>r[0]))];const hit=names.find(n=>n.replace(/\s|·/g,"")===q.replace(/·/g,""))||names.find(n=>n.replace(/\s|·/g,"").includes(q.replace(/·/g,""))&&q.length>=3);if(!hit)return "";const R=ORGDIR.filter(r=>r[0]===hit);
  return '<li class="rg"><h3>'+esc(hit)+' 업무분장 <span class="num">'+R.length+'</span></h3></li><li class="ri dtbl"><div class="tbl-w" tabindex="0" role="region" aria-label="'+esc(hit)+' 업무분장 표"><table class="tbl"><thead><tr><th scope="col">담당 업무</th><th scope="col">내선</th></tr></thead><tbody>'+R.map(r=>{const pf=/교수|석학|전임/.test(r[2]||"")&&PROFDIR.find(x=>x[2]&&x[2]===r[1]);return '<tr><td>'+esc(r[2]||"(업무 미기재)")+(pf?' · <b>'+esc(pf[0].replace(/\s*[\(\[].*$/,''))+'</b>':'')+'</td><td class="num">'+esc(r[1])+'</td></tr>'}).join("")+'</tbody></table></div><p class="dsrc">출처: 현행 GIST 홈페이지 ‘조직/직원안내 › 직원검색’(2026.11.11. 확인) · 전화는 062-715-내선 · 교수 이름은 학과 홈페이지 교수진 안내와 내선이 같은 경우만 붙임 · 이메일·사진은 싣지 않음 · <a href="'+DIRU+'"'+EXT+'>현행 직원검색 ↗</a></p></li>';};}

/* v85 English 첫 화면 */
setTimeout(()=>{const h=document.getElementById("encols");if(!h||typeof COLLEGES==="undefined")return;const EN={"AI정책전략대학원":"Graduate School of AI Policy & Strategy"};
 h.innerHTML=COLLEGES.map(c=>'<div class="en-c"><h3>'+esc(c.e||c.n)+'</h3><ul>'+c.d.map(d=>{const e=(typeof DEPT!=="undefined"&&DEPT[d]&&DEPT[d].e)||EN[d]||d;return '<li><a href="'+dhref(d)+'"'+EXT+'>'+esc(e)+'<span>'+(DURL[d]||"")+'.gist.ac.kr ↗</span></a></li>'}).join("")+'</ul></div>').join("");},0);

/* v86 영문 화면에서는 머리 메뉴도 영어로 */
(function(){const g=document.querySelector(".gnb");if(!g)return;const KO=g.innerHTML;const O="https://www.gist.ac.kr/en/main.html";
 const X='<span class="sr"> (official English site, new window)</span>',EX=' target="_blank" rel="noopener noreferrer" lang="en"';const EN='<a href="#en" lang="en">About</a><a href="#en-col" lang="en">Academics</a><a href="'+O+'"'+EX+'>Admissions'+X+'</a><a href="#en-col" lang="en">Research</a><a href="'+O+'"'+EX+'>Campus Life'+X+'</a><a href="'+O+'"'+EX+'>News'+X+'</a>';
 const eng=[...document.querySelectorAll('a[href="#en"]')].filter(a=>a.textContent.trim()==="ENG");
 function sync(){const h=LH();const on=h==="#en"||h==="#en-col";document.documentElement.lang=on?"en":"ko";document.body.classList.toggle("en-mode",on);
  if(on&&!g.dataset.en){g.innerHTML=EN;g.dataset.en="1";g.setAttribute("aria-label","Main menu");}
  else if(!on&&g.dataset.en){g.innerHTML=KO;delete g.dataset.en;g.setAttribute("aria-label","주 메뉴");}
  eng.forEach(a=>{a.textContent=on?"KOR":"ENG";a.setAttribute("href",on?"#home":"#en");a.setAttribute("lang",on?"ko":"en");});}
 addEventListener("hashchange",sync);sync();
 document.addEventListener("click",e=>{const a=e.target.closest('a[href="#en-col"]');if(!a)return;e.preventDefault();if(LH()!=="#en")location.hash="en";setTimeout(()=>{const t=document.getElementById("en-col");t&&t.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});},120);});
})();

/* v80 발표 모드 */
{let on=true;try{on=localStorage.getItem("d_pres")!=="0";}catch(_){ }if(/[?&]tools=1/.test(location.search))on=false;document.body.classList.toggle("pres",on);
 const b=document.createElement("button");b.type="button";b.className="pres-t";const lab=()=>{b.textContent=document.body.classList.contains("pres")?"시안 도구 보기":"시안 도구 숨기기";b.setAttribute("aria-pressed",String(!document.body.classList.contains("pres")));};lab();
 b.addEventListener("click",()=>{const v=!document.body.classList.contains("pres");document.body.classList.toggle("pres",v);try{localStorage.setItem("d_pres",v?"1":"0");}catch(_){ }lab();});document.body.appendChild(b);}

/* v73 첫 화면 스크롤 장면 */
{const pin=$("#hxpin"),hx=pin&&pin.querySelector(".hx"),bg=hx&&hx.querySelector(".hx-bg"),cp=hx&&hx.querySelector(".hx-in"),rise=$("#hxrise"),sc=$("#hxscroll");
 if(pin&&rise){const ci=rise.querySelector(".rise-ci"),k=rise.querySelector(".rise-k"),t=rise.querySelector(".rise-t");const cl=(v)=>Math.max(0,Math.min(1,v));const ease=v=>1-Math.pow(1-v,3);let raf=0;
  const RMx=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const run=()=>{raf=0;if(RMx){rise.style.opacity=1;return;}const r=pin.getBoundingClientRect();const span=Math.max(1,pin.offsetHeight-innerHeight);const p=cl(-r.top/span);
   const a=ease(cl(p/0.45));bg.style.opacity=(1-a).toFixed(3);bg.style.transform="scale("+(1+0.12*a).toFixed(4)+")";
   if(cp){cp.style.opacity=(1-cl(p/0.25)).toFixed(3);cp.style.transform="translateY("+(-60*cl(p/0.3)).toFixed(1)+"px)";}
   rise.style.opacity=cl((p-0.12)/0.25).toFixed(3);
   ci.querySelectorAll(".lt").forEach((l,j)=>{const v=ease(cl((p-0.2-j*0.06)/0.32));l.style.opacity=cl(v*1.4).toFixed(3);l.style.transform="translateY("+(40*(1-v)).toFixed(2)+"%) scale("+(1.18-0.18*v).toFixed(4)+")";l.style.backgroundPosition="50% "+(50+18*(1-v)).toFixed(1)+"%";});
   const kk=cl((p-0.5)/0.2);k.style.opacity=kk.toFixed(3);rise.querySelectorAll(".rise-v li").forEach((li,j)=>{const v=ease(cl((p-0.55-j*0.05)/0.2));li.style.opacity=v.toFixed(3);li.style.transform="translateY("+(14*(1-v)).toFixed(1)+"px)";});const tt=ease(cl((p-0.62)/0.25));t.style.opacity=tt.toFixed(3);t.style.transform="translateY("+(16*(1-tt)).toFixed(1)+"px)";
   if(sc)sc.style.opacity=(1-cl(p/0.1)).toFixed(2);document.body.classList.toggle("hxdone",p>0.3);};
  addEventListener("scroll",()=>{if(!raf)raf=requestAnimationFrame(run);},{passive:true});addEventListener("resize",run);addEventListener("hashchange",()=>setTimeout(run,60));run();}}

/* v72 지금, 지스트 주제 거르기 · 글 화면 읽기 진행 막대 · 주소 복사 */
{const TP=[["전체 주제",null],["AI",/\bAI\b|인공지능|딥러닝|머신러닝|LLM|에이전트|알고리즘/i],["반도체·양자",/반도체|양자|소자|칩|광검출|웨이퍼|분광|센서/],["에너지·환경",/에너지|풍력|배터리|탄소|기후|환경|태양|수소/],["생명·의료",/생명|의료|의생명|심장|통증|단백질|뇌|약물|하이드로젤|암|폐/]];
 const h=$("#stopic");if(h){h.innerHTML='<span class="stp-l">연구 주제</span>'+TP.map((t,i)=>{const n=t[1]?STORIES.filter(s=>t[1].test(s.t+" "+(s.s||"")+" "+(s.body||""))).length:STORIES.length;return '<button type="button" data-t="'+i+'" aria-pressed="'+(i===0)+'">'+esc(t[0])+' <small class="num">'+n+'</small></button>';}).join("");
 h.addEventListener("click",e=>{const b=e.target.closest("button[data-t]");if(!b)return;window.__stp=TP[+b.dataset.t][1];$$("#stopic button").forEach(x=>x.setAttribute("aria-pressed",x===b));renderStory();});}}
{const bar=document.createElement("div");bar.className="rdbar";bar.setAttribute("aria-hidden","true");bar.innerHTML="<i></i>";document.body.appendChild(bar);
 const upd=()=>{const on=/^#st-\d+$/.test(LH()||"");bar.style.display=on?"block":"none";if(!on)return;const a=$(".st-art");if(!a)return;const r=a.getBoundingClientRect();const t=Math.min(1,Math.max(0,(innerHeight*0.35-r.top)/Math.max(1,r.height-innerHeight*0.35)));bar.firstChild.style.width=(t*100).toFixed(1)+"%";};
 addEventListener("scroll",upd,{passive:true});addEventListener("hashchange",()=>setTimeout(upd,50));setTimeout(upd,300);}
document.addEventListener("click",e=>{const b=e.target.closest(".st-copy");if(!b)return;const u=location.href;const done=()=>{b.textContent="주소를 복사했습니다";setTimeout(()=>b.textContent="이 글 주소 복사",1800);};if(navigator.clipboard)navigator.clipboard.writeText(u).then(done,done);else done();});

function exTag(e){return e?'<span class="p-ex">캠퍼스 자료 사진</span>':'';}
/* A 주요 소식 */
let pmSw=null;
function renderMain(){
 const L=STORIES.slice().sort((a,b)=>sImg(a).ex-sImg(b).ex).slice(0,7);
 $("#pmain").innerHTML=L.map(s=>{const im=sImg(s);return '<div class="swiper-slide"><a class="mc" href="'+stH(s)+'"><img src="'+im.u+'" alt="" loading="lazy">'+exTag(im.ex)+'<span class="mc-tx"><span class="mc-k">'+esc(cen(s)||s.c)+'</span><b>'+esc(s.t)+'</b><small>'+esc(s.s)+'</small><time class="num">'+esc(s.d)+'</time></span><span class="notch" aria-hidden="true"><i>'+ICO_AR+'</i></span></a></div>';}).join("");
 $("#pmdots").innerHTML=L.map((_,i)=>'<button type="button" aria-label="'+(i+1)+'번째 소식" aria-current="'+(i===0)+'"></button>').join("");
 if(window.Swiper){if(pmSw)pmSw.destroy(true,true);
  pmSw=new Swiper("#pmsw",{slidesPerView:"auto",spaceBetween:18,grabCursor:true,keyboard:{enabled:true},a11y:{prevSlideMessage:"이전 소식",nextSlideMessage:"다음 소식"},autoplay:RM?false:{delay:5000,disableOnInteraction:false,pauseOnMouseEnter:true},
   on:{slideChange:w=>$$("#pmdots button").forEach((b,k)=>b.setAttribute("aria-current",k===w.activeIndex?"true":"false"))}});
  $$("#pmdots button").forEach((b,k)=>b.onclick=()=>pmSw.slideTo(k));}
}
$("#pmprev").addEventListener("click",()=>pmSw&&pmSw.slidePrev());
$("#pmnext").addEventListener("click",()=>pmSw&&pmSw.slideNext());
$("#pmstop").addEventListener("click",e=>{const b=e.currentTarget;if(!pmSw||!pmSw.autoplay)return;const on=b.getAttribute("aria-pressed")==="true";if(on){pmSw.autoplay.start();b.setAttribute("aria-pressed","false");b.setAttribute("aria-label","자동 넘김 멈춤");b.innerHTML='<i data-lucide="pause"></i>';}else{pmSw.autoplay.stop();b.setAttribute("aria-pressed","true");b.setAttribute("aria-label","자동 넘김 재생");b.innerHTML='<i data-lucide="play"></i>';}icons();});
/* B 소식 격자 */
let pnAll=false;
function renderNews(){
 const MS=new Set(STORIES.slice().sort((a,b)=>sImg(a).ex-sImg(b).ex).slice(0,7));
 const L=STORIES.slice().filter(x=>pnAll||!MS.has(x)).sort((a,b)=>(b.d||b.m).replace(/\D/g,"").padEnd(8,"0").localeCompare((a.d||a.m).replace(/\D/g,"").padEnd(8,"0"))).slice(0,pnAll?STORIES.length:8);
 $("#pnews").innerHTML=L.map(s=>{const im=sImg(s);return '<a class="nc2" href="'+stH(s)+'"><span class="ph"><img src="'+im.u+'" alt="" loading="lazy">'+exTag(im.ex)+'<span class="tabcut'+(s.c==="연구성과"?' r':'')+'">'+esc(cen(s)||s.c)+'</span></span><span class="bd"><b>'+esc(s.t)+'</b><time class="num">'+esc(s.d)+'</time></span></a>';}).join("");
 $("#pnews").classList.toggle("all",pnAll);
 const m=$("#pnmore");m.hidden=STORIES.length<=8&&innerWidth>760;m.setAttribute("aria-expanded",pnAll);m.setAttribute("aria-label",pnAll?"소식 접기":"소식 더 보기");m.innerHTML='<span>'+(pnAll?"소식 접기":"소식 더 보기")+'</span><i data-lucide="'+(pnAll?"minus":"plus")+'"></i>';icons();
}
$("#pnmore").addEventListener("click",()=>{pnAll=!pnAll;renderNews();});
/* E 단과대학 거대 글자 */
const CWE=["AI","Natural Sciences","Engineering","Life & Medical"],CIM=["p_curve.jpg","p_bldg.jpg","p_night2.jpg","r_pain.jpg"];
function renderWords(){
 $("#pwords").innerHTML=COLLEGES.map((c,i)=>{const g=c.d.filter(d=>/대학원$/.test(d)).length,dn=c.d.length-g;
  return '<a class="pw" href="#colleges" data-col="'+i+'">'+esc(CWE[i]||c.e)+'<span class="pl">'+esc(c.n)+' · '+dn+'개 학과'+(g?' · '+g+'개 대학원':'')+'</span><span class="pim" aria-hidden="true"><img loading="lazy" src="'+IMG(CIM[i])+'" alt=""></span></a>';}).join("");
}
/* F 이야기 */
function renderPStory(){
 const dk=x=>(x.d||x.m).replace(/\D/g,"").padEnd(8,"0");const MS=STORIES.slice().sort((a,b)=>sImg(a).ex-sImg(b).ex).slice(0,7);
 const SH=new Set(MS.concat(STORIES.filter(x=>!MS.includes(x)).sort((a,b)=>dk(b).localeCompare(dk(a))).slice(0,8)));
 const pool=STORIES.filter(x=>!SH.has(x));const pick=pool.filter(s=>s.c==="사람"||s.c==="영상"||s.c==="보도자료").slice(0,4);
 const L=pick.length>=4?pick:pick.concat(pool.filter(s=>!pick.includes(s))).concat(STORIES.filter(s=>SH.has(s))).slice(0,4);
 $("#pstory").innerHTML=L.map(s=>{const im=sImg(s);return '<a class="sc2" href="'+stH(s)+'"><span class="ph"><img src="'+im.u+'" alt="" loading="lazy">'+exTag(im.ex)+'<span class="tabcut">'+esc(cen(s)||s.c)+'</span></span><b>'+esc(s.t)+'</b><small>'+esc(s.s)+' · '+esc(s.d)+'</small></a>';}).join("");
}
/* H SNS */
function renderPSns(){
 $("#psns").innerHTML=SNS.slice().sort((a,b)=>(b.img?1:0)-(a.img?1:0)).map(x=>'<a class="yc '+x.p+'" href="'+esc(x.u)+'" target="_blank" rel="noopener noreferrer"><span class="ph">'+(x.img?'<img src="'+x.img+'" alt="" loading="lazy">':'<em>'+(x.p==="yt"?"GIST TV":"#GIST")+'</em>')+'<span class="pf" aria-hidden="true"><span>'+(x.p==="yt"?'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>':IGI)+'</span></span></span><b>'+esc(x.t)+'</b><small>'+esc(x.d)+(x.p==="yt"?' · 공식 유튜브':x.p==="fb"?' · 페이스북':' · 인스타그램')+'</small></a>').join("");
}
$("#poltrack").innerHTML=("<span>Creating limitless possibilities through research and education</span><span>·</span>").repeat(4);
renderMain();renderNews();renderWords();renderPStory();renderPSns();
/* 관리자 저장 → 새 구역도 다시 그림 */
{const _rt=renderToday;renderToday=function(){try{_rt()}catch(_){}renderMain();renderNews();renderPStory();};}
{const _ap=applySite;applySite=function(S){_ap(S);renderMain();renderNews();renderPStory();renderPSns();icons();};}

icons();

/* 첫 화면 사진 넘김 */
{const ims=[...document.querySelectorAll(".hx-bg img")],ds=[...document.querySelectorAll("#hxdots button:not(.hx-pz)")];let hi=0,ht=null;
 const go=i=>{hi=i;ims.forEach((m,k)=>m.classList.toggle("on",k===i));ds.forEach((d,k)=>d.setAttribute("aria-current",k===i?"true":"false"));};
 const run=()=>{ht=setInterval(()=>go((hi+1)%ims.length),6500)};
 ds.forEach((d,k)=>d.onclick=()=>go(k));
 if(!RM)run();else $("#hxpz").setAttribute("aria-pressed","true");
 $("#hxpz").onclick=e=>{const b=e.currentTarget;if(ht){clearInterval(ht);ht=null;b.setAttribute("aria-pressed","true");b.setAttribute("aria-label","사진 넘김 재생");b.innerHTML='<i data-lucide="play"></i>';}else{run();b.setAttribute("aria-pressed","false");b.setAttribute("aria-label","사진 넘김 멈춤");b.innerHTML='<i data-lucide="pause"></i>';}icons();};}

/* 휴대폰 전체 메뉴: 포스텍식 (왼쪽 1단 어두운 칸 + 오른쪽 펼침 목록) */
{const sm=$("#smap");const box=document.createElement("div");box.className="msm";
 box.innerHTML='<div class="msm-h"><img src="'+IMG("ci_gist.png")+'" alt="GIST"><button type="button" id="msmx" aria-label="전체 메뉴 닫기">×</button></div><div class="msm-tabs" role="tablist"><button type="button" role="tab" data-t="m" aria-selected="true">전체메뉴</button><button type="button" role="tab" data-t="s" aria-selected="false">검색</button><button type="button" role="tab" data-t="q" aria-selected="false">Quick Menu</button></div><div class="msm-c"></div>';
 sm.appendChild(box);let cur=0,tab="m";
 const href=(i,x)=>{const g=MEGA[i][2].findIndex(gg=>gg[1].includes(x));return g<0?"#search":pHref(i,g,MEGA[i][2][g][1].indexOf(x));};
 function paint(){const c=box.querySelector(".msm-c");box.querySelectorAll(".msm-tabs button").forEach(b=>b.setAttribute("aria-selected",b.dataset.t===tab));
  if(tab==="m"){const m=MEGA[cur];c.className="msm-c msm-b";c.innerHTML='<div class="msm-l" role="group" aria-label="1단 메뉴">'+MEGA.map((x,i)=>'<button type="button" aria-pressed="'+(i===cur)+'" data-i="'+i+'">'+esc(x[0])+'</button>').join("")+'<span class="msm-foot"><a href="https://portal.gist.ac.kr/" target="_blank" rel="noopener noreferrer">PORTAL</a><a href="https://zeus.gist.ac.kr/" target="_blank" rel="noopener noreferrer">ZEUS</a></span></div><div class="msm-r"><p class="lead">'+esc(m[1])+'</p>'+m[2].map((g,k)=>'<details'+(k===0?' open':'')+'><summary>'+esc(g[0])+'</summary><div>'+g[1].map(x=>'<a href="'+href(cur,x)+'"'+(cur===1&&DURL[x]?EXT:'')+(href(cur,x)==="#search"?' data-q="'+esc(x)+'"':'')+'>'+esc(x)+'</a>').join("")+'</div></details>').join("")+'</div>';}
  else if(tab==="s"){c.className="msm-c msm-s";c.innerHTML='<form id="msmf" role="search"><label for="msmq" class="sr">통합검색</label><input id="msmq" type="search" placeholder="GIST에 대해 무엇이든 물어보세요"><button type="submit">검색</button></form><div class="kw">'+["학과","장학금","증명서 발급","학사일정","연구실 찾기","생활관"].map(k=>'<a href="#search" data-q="'+esc(k)+'">'+esc(k)+'</a>').join("")+'</div>';
   c.querySelector("#msmf").onsubmit=e=>{e.preventDefault();$("#hq").value=$("#msmq").value;closeSmap();$("#hsearch").requestSubmit();};}
  else{c.className="msm-c msm-b";c.innerHTML='<div class="msm-l" role="group" aria-label="방문자 선택">'+Object.keys(WHO).map(k=>'<button type="button" data-w="'+k+'" aria-pressed="'+(k===qw)+'">'+esc(WHO[k])+'</button>').join("")+'</div><div class="msm-r"><p class="lead">'+esc(WHO[qw])+' 많이 찾는 메뉴</p>'+NEED[qw].map(x0=>{const x=String(x0).split("|")[0].trim();return '<a style="display:block;padding:14px 2px;border-bottom:1px solid var(--line);font-weight:700" href="'+(x.includes("튜토리얼")?"#tutorial":(x.includes("학과")||x.includes("연구실"))?"#colleges":"#search")+'" data-q="'+esc(x)+'">'+esc(x)+'</a>';}).join("")+'</div>';}
 }
 let qw="ug";
 box.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;if(b.id==="msmx"){closeSmap();return;}if(b.dataset.t){tab=b.dataset.t;paint();if(tab==="s")setTimeout(()=>$("#msmq").focus(),30);return;}if(b.dataset.i){cur=+b.dataset.i;paint();return;}if(b.dataset.w){qw=b.dataset.w;paint();}});
 const _o=openSmap;openSmap=function(){tab="m";paint();_o();if(innerWidth<=760)setTimeout(()=>$("#msmx").focus(),30);};
 $("#mmenu").addEventListener("click",()=>openSmap());
}

/* 하위 화면 경로 막대 (포스텍 방식: 집 아이콘 › 1단 › 현재 · 주소 복사 · 인쇄) */
Object.keys(PV).forEach(v=>{const h=document.querySelector("#v-"+v+" .page-h");if(!h)return;const c=h.querySelector(".crumb");const parts=c?c.textContent.split("›").map(t=>t.trim()).filter(t=>t&&t!=="홈"):[];
 h.insertAdjacentHTML("afterend",'<nav class="pbar" aria-label="현재 위치"><div class="wrap"><a class="home" href="#home" aria-label="홈으로"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M3 11 12 4l9 7v9h-6v-6H9v6H3z"/></svg></a><ol>'+parts.map((t,i)=>'<li'+(i===parts.length-1?' aria-current="page"':'')+'>'+esc(t)+'</li>').join("")+'</ol><span class="tools"><span class="pb-st" role="status"></span><button type="button" class="cp" aria-label="이 화면 주소 복사"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg></button><button type="button" class="pr" aria-label="이 화면 인쇄"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V3h12v6M6 18H4v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6h-2"/><rect x="6" y="14" width="12" height="7"/></svg></button></span></div></nav>');});
document.addEventListener("click",e=>{const b=e.target.closest(".pbar .tools button");if(!b)return;const st=b.parentElement.querySelector(".pb-st");
 if(b.classList.contains("pr")){print();return;}
 const u=location.href;(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(()=>{st.textContent="주소를 복사했습니다";},()=>{st.textContent="복사가 안 되면 주소창을 이용해 주세요";});setTimeout(()=>st.textContent="",2500);});


/* v17: 첫 화면 배경 움직임 멈춤/재생, 관리자 사진은 휴대폰에도 */
{const hx=$(".hx2"),b=$("#hxpz");if(RM){hx.classList.add("still");b.setAttribute("aria-pressed","true");}
 b.onclick=()=>{const st=hx.classList.toggle("still");b.setAttribute("aria-pressed",st);b.setAttribute("aria-label",st?"배경 움직임 재생":"배경 움직임 멈춤");b.innerHTML='<i data-lucide="'+(st?"play":"pause")+'"></i>';icons();};
 const HMOB=$(".hx-bg source").getAttribute("srcset");
 let hxCustom=false;setHeroImg=function(u){const s0=u||HERO0;hxCustom=!!u;{const im=$("#hxImg"),so=$(".hx-bg source");if(im.getAttribute("src")!==s0)im.src=s0;if(so.getAttribute("srcset")!==(u||HMOB))so.setAttribute("srcset",u||HMOB);}if(u)hxGo(0);};
 const HS=$$(".hx-bg picture.hxs"),HD=$$("#hxdots .hxd");let hxI=0,hxT=0;
 function hxGo(n){hxI=(n+HS.length)%HS.length;HS.forEach((x,k)=>x.classList.toggle("on",k===hxI));HD.forEach((x,k)=>x.setAttribute("aria-current",k===hxI));HD.forEach(x=>x.hidden=hxCustom);}
 function hxTick(){clearTimeout(hxT);hxT=setTimeout(()=>{if(!hx.classList.contains("still")&&!hxCustom&&!document.hidden&&!document.body.classList.contains("hxdone"))hxGo(hxI+1);hxTick();},7000);}
 HD.forEach((x,k)=>x.addEventListener("click",()=>{hxGo(k);hxTick();}));hxTick();}

/* 학과 상징 그림 (직접 그린 SVG) */
var DART=(function(){
 const W='rgba(255,255,255,', A='#FF8A7A';
 const L=(x1,y1,x2,y2,o,w)=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+W+(o||.5)+')" stroke-width="'+(w||1.6)+'" stroke-linecap="round"/>';
 const C=(x,y,r,f,o)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" '+(f?'fill="'+f+'"':'fill="none" stroke="'+W+(o||.6)+')" stroke-width="1.6"')+'/>';
 const P=(d,o,w,f)=>'<path d="'+d+'" fill="'+(f||'none')+'" stroke="'+W+(o||.6)+')" stroke-width="'+(w||1.8)+'" stroke-linecap="round" stroke-linejoin="round"/>';
 const M={
  eecs:()=>{let s='';[[30,60,120,60,120,110,200,110],[40,150,90,150,90,90,170,90,170,40,260,40],[200,170,240,170,240,130,295,130],[150,190,150,140,210,140,210,70,290,70]].forEach(p=>{s+=P('M'+p[0]+' '+p[1]+p.slice(2).reduce((a,v,i)=>a+(i%2?' '+v:' L'+v),''),.55,2.2);s+=C(p[p.length-2],p[p.length-1],5,A);s+=C(p[0],p[1],4,'#fff');});s+='<rect x="128" y="72" width="64" height="56" rx="8" fill="rgba(255,255,255,.12)" stroke="'+W+'.8)" stroke-width="2"/>';for(let i=0;i<4;i++){s+=L(140+i*13,62,140+i*13,72,.7,2)+L(140+i*13,128,140+i*13,138,.7,2);}return s;},
  ai:()=>{const lay=[[60,[50,100,150]],[140,[35,80,125,170]],[220,[55,100,145]],[285,[100]]];let s='';for(let a=0;a<lay.length-1;a++)lay[a][1].forEach(y1=>lay[a+1][1].forEach(y2=>s+=L(lay[a][0],y1,lay[a+1][0],y2,.22,1.2)));lay.forEach((l,i)=>l[1].forEach(y=>s+=C(l[0],y,i===3?11:8,i===3?A:'#fff')));return s;},
  ax:()=>{let s='';for(let x=40;x<=280;x+=30)for(let y=30;y<=170;y+=28)s+=C(x,y,1.8,'rgba(255,255,255,.35)');s+=P('M160 60 l10 0 l4 14 l12 6 l12-8 l8 8 l-8 12 l6 12 l14 4 l0 10 l-14 4 l-6 12 l8 12 l-8 8 l-12-8 l-12 6 l-4 14 l-10 0 l-4-14 l-12-6 l-12 8 l-8-8 l8-12 l-6-12 l-14-4 l0-10 l14-4 l6-12 l-8-12 l8-8 l12 8 l12-6z',.85,2);s+=C(165,105,16,A);s+=L(60,170,120,140,.5,2)+L(270,40,215,75,.5,2)+C(60,170,5,'#fff')+C(270,40,5,'#fff');return s;},
  semi:()=>{let s=C(160,100,78,null,.8);for(let x=95;x<=215;x+=20)for(let y=35;y<=165;y+=20){if((x+10-160)**2+(y+10-100)**2<70*70)s+='<rect x="'+x+'" y="'+y+'" width="16" height="16" rx="2" fill="'+((x*7+y*3)%9===0?A:'rgba(255,255,255,.22)')+'"/>';}s+=P('M135 178 L185 178',.8,3);return s;},
  aix:()=>{let s=C(160,100,62,null,.7)+P('M98 100 L222 100',.4)+P('M160 38 C130 70 130 130 160 162 C190 130 190 70 160 38',.5)+P('M110 66 C140 76 180 76 210 66 M110 134 C140 124 180 124 210 134',.4);s+=P('M40 160 L80 160 M60 160 L60 120 M44 120 L76 120 M44 120 L36 140 M76 120 L84 140',.75,2);s+=P('M30 140 Q36 148 42 140 M70 140 Q76 148 82 140',.75,2);s+=C(160,100,6,A);return s;},
  physics:()=>{let s='';for(let i=0;i<6;i++)s+=C(110,100,14+i*18,null,.5-i*.06);for(let i=0;i<6;i++)s+=C(210,100,14+i*18,null,.5-i*.06);s+=P('M20 100 Q40 70 60 100 T100 100 T140 100',.0);s+=P('M30 40 L130 90',.85,2.4)+'<path d="M130 70 L170 130 L90 130 Z" fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.85)" stroke-width="2"/>'+P('M150 100 L300 60',.8,2)+P('M150 104 L300 100',.6,2)+'<path d="M150 108 L300 140" stroke="'+A+'" stroke-width="2.4" fill="none"/>';return s;},
  chem:()=>{const hx=(cx,cy,r)=>{let d='';for(let i=0;i<6;i++){const a=Math.PI/3*i+Math.PI/6;d+=(i?'L':'M')+(cx+r*Math.cos(a)).toFixed(1)+' '+(cy+r*Math.sin(a)).toFixed(1);}return d+'Z';};let s=P(hx(120,100,34),.85,2.2)+P(hx(179,66,34),.7,2.2)+P(hx(179,134,34),.7,2.2);s+=P('M120 84 L120 116',.5)+L(208,49,250,30,.7,2)+L(208,151,250,170,.7,2)+L(91,83,55,62,.7,2);s+=C(250,30,8,A)+C(250,170,8,'#fff')+C(55,62,8,'#fff')+C(270,100,4,'rgba(255,255,255,.4)')+C(40,140,4,'rgba(255,255,255,.4)');return s;},
  math:()=>{let s='';for(let x=20;x<=300;x+=28)s+=L(x,20,x,180,.1,1);for(let y=20;y<=180;y+=28)s+=L(20,y,300,y,.1,1);s+=L(20,100,300,100,.5,1.6)+L(60,20,60,180,.5,1.6);let d='';for(let x=20;x<=300;x+=4){const y=100-55*Math.sin((x-60)/32)*Math.exp(-(x-60)/420);d+=(x===20?'M':'L')+x+' '+y.toFixed(1);}s+='<path d="'+d+'" fill="none" stroke="'+A+'" stroke-width="2.6"/>';let d2='';for(let x=20;x<=300;x+=4){const y=100-0.0018*(x-160)**2+40;d2+=(x===20?'M':'L')+x+' '+y.toFixed(1);}s+=P(d2,.7,2);s+='<text x="196" y="48" fill="rgba(255,255,255,.85)" font-family="Inter Tight,sans-serif" font-size="26" font-style="italic" font-weight="700">∫ f(x)dx</text>';return s;},
  mse:()=>{let s='';const p=(x,y,z)=>[110+x*50-z*26,140-y*50+z*-20];const pts=[];for(let x=0;x<3;x++)for(let y=0;y<3;y++)for(let z=0;z<2;z++)pts.push([x,y,z]);pts.forEach(a=>pts.forEach(b=>{const dd=Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1])+Math.abs(a[2]-b[2]);if(dd===1){const A1=p(...a),B1=p(...b);s+=L(A1[0],A1[1],B1[0],B1[1],.35,1.6);}}));pts.forEach(a=>{const q=p(...a);s+=C(q[0],q[1],a[2]?6:8,(a[0]+a[1]+a[2])%3===0?A:'#fff');});return s;},
  me:()=>{let s=P('M60 175 L130 175',.8,3)+'<rect x="78" y="150" width="34" height="25" rx="4" fill="rgba(255,255,255,.15)" stroke="rgba(255,255,255,.8)" stroke-width="2"/>';s+=P('M95 150 L130 85 L215 60',.9,9)+C(95,150,9,'#fff')+C(130,85,9,'#fff')+C(215,60,8,A);s+=P('M215 60 L245 48 M215 60 L238 82',.85,3);s+='<g opacity=".5">'+C(260,140,22,null,.7)+C(260,140,8,null,.7)+'</g>';for(let i=0;i<8;i++){const a=i*Math.PI/4;s+=L(260+22*Math.cos(a),140+22*Math.sin(a),260+30*Math.cos(a),140+30*Math.sin(a),.5,4);}return s;},
  env1:()=>{let s='<path d="M150 30 C150 30 105 90 105 118 a45 45 0 0 0 90 0 C195 90 150 30 150 30Z" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.85)" stroke-width="2.2"/>';s+=P('M130 120 a20 20 0 0 0 20 20',.7,2);s+='<path d="M215 140 C215 100 250 78 288 78 C288 118 262 145 225 145Z" fill="'+A+'" opacity=".9"/>'+P('M222 140 L270 95',.0);s+=P('M20 170 Q45 155 70 170 T120 170 T170 170 T220 170 T270 170 T320 170',.6,2)+P('M20 186 Q45 171 70 186 T120 186 T170 186 T220 186 T270 186 T320 186',.35,2);s+=C(60,60,16,null,.6);for(let i=0;i<8;i++){const a=i*Math.PI/4;s+=L(60+22*Math.cos(a),60+22*Math.sin(a),60+30*Math.cos(a),60+30*Math.sin(a),.6,2);}return s;},
  life:()=>{let s='',d1='',d2='';for(let x=30;x<=290;x+=4){const y1=100+40*Math.sin(x/24),y2=100-40*Math.sin(x/24);d1+=(x===30?'M':'L')+x+' '+y1.toFixed(1);d2+=(x===30?'M':'L')+x+' '+y2.toFixed(1);}for(let x=36;x<=290;x+=14){const y1=100+40*Math.sin(x/24),y2=100-40*Math.sin(x/24);s+=L(x,y1,x,y2,.3,2);}s+=P(d1,.85,3)+'<path d="'+d2+'" fill="none" stroke="'+A+'" stroke-width="3"/>';return s;},
  bmse:()=>{let s=C(110,95,52,null,.5)+C(110,95,22,'rgba(255,255,255,.18)')+C(118,88,8,'#fff');for(let i=0;i<6;i++){const a=i*1.05;s+=C(110+38*Math.cos(a),95+38*Math.sin(a),4,'rgba(255,255,255,.5)');}s+='<path d="M20 160 L120 160 L135 130 L150 185 L168 120 L182 160 L300 160" fill="none" stroke="'+A+'" stroke-width="3" stroke-linejoin="round"/>';s+=P('M230 60 l0 40 M210 80 l40 0',.85,6);return s;},
  intnscphys:()=>{let s='<circle cx="150" cy="100" r="20" fill="rgba(255,255,255,.2)" stroke="rgba(255,255,255,.9)" stroke-width="2"/>'+C(150,100,6,A);[[150,100,60,40,30,50],[150,100,70,140,40,170],[150,100,110,180,90,195],[150,100,200,40,240,25],[150,100,290,110,310,95],[150,100,230,165,260,185]].forEach(b=>{s+=P('M'+b[0]+' '+b[1]+' Q'+((b[0]+b[2])/2+10)+' '+((b[1]+b[3])/2-10)+' '+b[2]+' '+b[3]+' L'+b[4]+' '+b[5],.7,2.2)+C(b[4],b[5],3.5,'#fff');});s+=P('M290 110 L250 110',.0);for(let i=0;i<5;i++)s+=C(170+i*24,100+(i%2?-4:4),2.5,A);return s;}
 };
 const BG=[["#E2321F","#6E1309"],["#5A6760","#1C2320"],["#2A3036","#0B0D10"],["#9A2416","#2E0905"]];
 return function(code,ci){const g=BG[ci]||BG[2],id='dg'+code;return '<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+g[0]+'"/><stop offset="1" stop-color="'+g[1]+'"/></linearGradient></defs><rect width="320" height="200" fill="url(#'+id+')"/>'+((M[code]||M.ai)())+'</svg>';};
})();

var DPH={eecs:"d_eecs2.jpg",ai:"d_ai.jpg",ax:"d_ax.jpg",semi:"d_semi.jpg",aix:"d_aix.jpg",physics:"d_physics.jpg",chem:"d_chem.jpg",math:"d_math.jpg",mse:"d_mse.jpg",me:"d_me.jpg",env1:"d_env1.jpg",life:"d_life.jpg",bmse:"d_bmse.jpg",intnscphys:"d_intnscphys.jpg"};
var DPOS={eecs:"center 30%",ax:"right center",semi:"78% center",physics:"center 40%"};
var DWD={eecs:"Electrical & Computer",ai:"Artificial Intelligence",ax:"AI Transformation",semi:"Semiconductor",aix:"AI Policy & Strategy",physics:"Physics & Photon",chem:"Chemistry",math:"Mathematical Sciences",mse:"Materials",me:"Mechanical & Robotics",env1:"Environment & Energy",life:"Life Sciences",bmse:"Biomedical",intnscphys:"Neurophysiology"};
function dphoto(code,ci,cls){return '<span class="dph '+(cls||'')+' c'+ci+'"><img src="'+IMG(DPH[code]||"gal_gate.jpg")+'" alt="'+((typeof deptByCode==="function"&&deptByCode(code))?esc(deptByCode(code)+" 대표 사진"):"")+'" loading="lazy" decoding="async"'+(DPOS[code]?' style="object-position:'+DPOS[code]+'"':'')+'></span>';}
var DEPT={"전기전자컴퓨터공학과": {"code": "eecs", "pg": "03010101", "e": "Department of Electrical Engineering and Computer Science", "tel": "062)715-2202, 대학 6124~6125", "fax": "062)715-2204", "mail": "eecs@gist.ac.kr", "hp": "https://eecs.gist.ac.kr/", "slo": "", "intro": ["GIST 전기전자컴퓨터공학과는 미래사회에 대비하여 ICT 중심의 융합분야를 선도할 혁신 기술을 연구 및 창의적 글로벌 인재육성을 목표로 한다."], "areas": []}, "AI학과": {"code": "ai", "pg": "03010102", "e": "Department of AI", "tel": "062)715-6351, 대학 6121~6125", "fax": "062)715-6359", "mail": "ai@gist.ac.kr", "hp": "https://ai.gist.ac.kr", "slo": "", "intro": ["GIST AI학과는 AI 4대강국 도약을 위한 산업선도형 AI 실증인재 양성을 목표로 한다."], "pts": ["X+AI 기반 인공지능 핵심 기술을 선도하는 창의적인 융합 연구 및 실증 전문가 양성", "국내 교육기관 유일의 Top500 등재 슈퍼컴퓨터를 포함한 꿈꾸는아이(AI) 실증 테스트베드 환경 제공", "AI+경제/사회/환경 등 다양한 분야(X)에서 인간 중심의 AI로 더 나은 미래 사회 구현", "GIST의 축적된 AI 인프라 바탕으로 국내외 경제적, 사회적, 기술적 변화에 대응하는 혁신적 인재 양성", "국내 최초 TPO의 한계를 넘어서는 교육 체계 구축"], "areas": []}, "AX학과": {"code": "ax", "pg": "03010105", "e": "Department of AX", "tel": "062)715-6351", "fax": "062)715-6359", "mail": "ax@gist.ac.kr", "hp": "https://ax.gist.ac.kr", "slo": "", "intro": ["AI를 반도체·모빌리티·제조&로봇·바이오헬스케어·양자과학 등 실제 산업과 연구 현장에 적용하는 AX 융합 전문인력 양성"], "pts": ["공학·자연과학·생명과학·AI 분야의 전문성을 결합하여, 복잡한 현장 문제를 데이터와 AI로 분석하고 해결하는 교육·연구 수행", "이론 학습부터 데이터 분석, 모델 개발, 시뮬레이션, 디지털트윈, 실증 프로젝트까지 연결하는 문제해결형 교육과정 운영", "GIST의 AI 인프라와 첨단 연구시설을 기반으로 산업·연구 현장의 기술혁신을 주도할 석·박사급 AX 리더 양성"], "areas": [["AX 반도체/시스템", "AI X Semiconductor X Computing", "소재·소자·패키징부터 AI 가속 시스템까지 AI 기반 설계와 최적화", ["첨단 반도체 패키징 열관리·냉각설계 및 열·기계 신뢰성", "AI 기반 열유체 해석·설계 최적화", "메모리 중심 컴퓨팅·AI 가속 시스템", "반도체·광반도체 소재·소자 및 이종·3차원 집적"]], ["AX 모빌리티", "AI X Mobility X Autonomy", "설계·시뮬레이션과 자율지능을 연결하여 모빌리티 시스템을 지능화", ["모빌리티 설계최적화", "다중물리·구조·유체 해석", "항공우주 및 추진 시스템", "모빌리티AI 및 자율주행", "자율지능 및 AI 제어", "모빌리티 시스템 통합 최적화"]], ["AX 제조 & 로봇", "AI X Manufacturing X Robotics", "제조 데이터·디지털트윈·로봇 지능을 연결하여 자율제조를 구현", ["제조AI·예지보전", "CAD/CAM·디지털트윈 기반 디지털 엔지니어링", "첨단 나노제조·AI 광소자 설계", "로봇 지능제어·다개체 협조·Sim-to-Real", "3D 비전·검사·계측", "인간-로봇 협업·작업자 지원 및 제조 지식그래프"]], ["AX 양자", "AI X Quantum X Science", "복잡한 과학 문제의 예측·계산·실험과정을 AI로 혁신", ["AI 양자물질·계산화학", "AI 양자정보·기초물리", "AI 첨단계측·물질분석", "AI 계산물리·시뮬레이션", "AI 자율과학·수리모델링"]], ["AX 바이오/헬스케어", "AI X Life Science X Healthcare", "유전체·오믹스·의료 데이터를 AI와 연결하여 생명현상과 질병을 이해", ["계산유전체학 및 다중오믹스", "대사·구조 및 신약", "생체·의료영상 및 광계측", "NeuroAI 및 뇌공학", "융합신경생리 및 중개뇌과학", "화학·환경 기반 바이오센싱"]]]}, "반도체공학과": {"code": "semi", "pg": "03010103", "e": "Department of Semiconductor Engineering", "tel": "062)715-3751~3", "fax": "062)715-3759", "mail": "semi@gist.ac.kr", "hp": "https://semi.gist.ac.kr/", "slo": "", "intro": ["GIST 반도체공학과는 반도체 핵심 및 융합기술 경쟁력 확보로 국가 반도체 산업 초격차를 선도할 세계적 수준의 산업 밀착형 반도체 고급인재 양성을 목표로 합니다."], "areas": [["반도체 소자 및 공정", "", "", ["차세대 나노 전자/광전소자", "플렉서블 광전자", "혁신전자소자 및 첨단나노소재", "양자 물질 계면 및 나노 소자", "반도체 발광소자", "나노시스템", "열-조절 광전자 및 포논 공학", "반도체 소자 시뮬레이션"]], ["반도체시스템 및 집적회로", "", "", ["집적회로 및 시스템", "아날로그 및 혼성모드신호 집적회로", "응용광학", "차세대 집적회로 설계"]]]}, "AI정책전략대학원": {"code": "aix", "pg": "03010104", "e": "", "tel": "062)715-6592~3", "fax": "", "mail": "aix@gist.ac.kr", "hp": "https://aix.gist.ac.kr/", "slo": "", "intro": [], "areas": []}, "물리·광과학과": {"code": "physics", "pg": "03010201", "e": "Department of Physics and Photon Science", "tel": "062)715-2884, 2226, 2225", "fax": "062)715-2224", "mail": "phys@gist.ac.kr", "hp": "https://physics.gist.ac.kr/", "slo": "물리학과 광과학 분야의 최고의 전문가로 양성!", "intro": ["물리·광과학과는 물리학과 광과학 분야의 첨단 과학기술을 교육하고 최고의 연구여건을 제공함으로써 학생들을 자기 분야 최고의 전문가로 양성하고자 한다. 특히 우리학과는 세계 최고 출력의 레이저를 보유하고 있는 고등광기술연구소와 기초과학연구원 연구단과 협력하여 대학원생들한테 광과학 분야의 다양한 연구기회를 제공하고 있다."], "areas": [["광학", "", "", ["초고속 비선형 광학", "고출력 레이저 및 응용", "아토초 과학", "양자 집적 광학"]], ["플라즈마물리학", "", "", ["고출력 레이저와 물질/플라즈마 상호작용", "레이저-플라즈마를 이용한 입자가속 및 X-ray 발생", "고에너지밀도 물리", "레이저 핵융합"]], ["응집물질물리학", "", "", ["X-ray를 이용한 나노물리", "응집물리 광학", "X-ray를 이용한 표면물리", "나노 양자소자 물리", "전산양자물리"]], ["입자물리학", "", "", ["장론 및 끈이론", "장론과 중력이론의 쌍대성", "강상호 작용계의 중력이론적 이해"]]]}, "화학과": {"code": "chem", "pg": "03010202", "e": "Department of Chemistry", "tel": "062)715-2860, 2865", "fax": "062)715-2866", "mail": "chem@gist.ac.kr", "hp": "https://chem.gist.ac.kr/chem/", "slo": "", "intro": ["GIST 화학과에서는 생명과학(Biological Chemistry), 물리화학(Physical Chemistry), 유기화학(Organic Chemistry), 무기화학(Inorganic Chemistry), 분석화학(Analytical Chemistry) 5개 연구분야를 중심으로 고전적 화학의 경계를 넘어서는 새로운 화학과의 모델이 되고자 한다. 이를 위해 세계적 수준의 교수진을 구축하고, 전폭적인 연구지원을 통해 최첨단 연구시설을 갖추려고 한다."], "areas": [["물리화학", "Physical Chemistry", "", ["Chemical Imaging", "Nanobio Imaging", "Spin Chemistry", "Time-resolved Spectroscopy & Reaction Dynamics"]], ["유기화학", "Organic Chemistry", "", ["Medicinal Chemistry", "Natural Product Synthesis", "Peptides and Peptidomimetics", "Synthetic Methodology, Asymmetric Catalysis", "Supramolecular Chemistry, Chemosenser"]], ["무기화학", "Inorganic Chemistry", "", ["Artificial Photosynthesis", "Bioinorganic Chemistry", "Chemical Modification of Solid Surface", "Organometallic Catalysis"]], ["생명화학", "Biological Chemistry", "", ["Biosensors and Bio-Instruments", "Biomolecular NMR Spectroscopy", "Protein Crystallography", "Structural Biochemistry"]], ["분석화학", "Analytical Chemistry", "", ["Surface Analytical Chemistry", "Nanoscale Material Chemistry", "Biosensors and Bio-Instruments", "Electrochemistry"]]]}, "수리과학과": {"code": "math", "pg": "03010203", "e": "Department of Mathematical Sciences", "tel": "062)715-3931, 3627", "fax": "062)715-3939", "mail": "math@gist.ac.kr", "hp": "https://math.gist.ac.kr/", "slo": "수학의 본질을 탐구하고, 미래 과학기술을 선도!", "intro": ["GIST 수리과학과는 수학의 이론적 깊이와 실용적 응용을 아우르는 연구와 교육을 통해, 과학기술 혁신을 선도할 창의적 인재를 양성합니다. 인공지능, 데이터 과학, 계산과학 등 다양한 분야와의 융합을 통해 수학의 가치를 확장하고, 국내외 연구자들과의 활발한 협력 속에서 세계 수준의 학문 공동체를 지향합니다. GIST 수리과학과는 과학기술의 미래를 선도하는 수리과학의 중심이 되고자 합니다."], "areas": [["정수론", "", "", ["해석적 정수론(Analytic Number Theory)"]], ["기하학", "", "", ["미분기하 (Differential Geometry)", "기하해석 (Geometric Analysis)"]], ["이산수학 및 조합수학", "", "", ["그래프이론 (Graph Theory)", "복잡계 네트워크 (Complex Networks)", "극단적 조합수학 (Extremal Combinatorics)", "위상적 조합수학 (Topological Combinatorics)", "이산기하 (Discrete Geometry)"]], ["응용수학", "", "", ["수치해석 (Numerical Analysis)", "과학계산 (Scientific Computing)", "계산수학 (Computational Mathematics)", "통계 (Statistics)", "딥러닝 (Deep Learning)", "기호 계산(Symbolic Computing)"]]]}, "신소재공학과": {"code": "mse", "pg": "03010301", "e": "Department of Materials Science and Engineering", "tel": "062)715-2302~3", "fax": "062)715-2304", "mail": "mse@gist.ac.kr", "hp": "https://mse.gist.ac.kr/", "slo": "미래 산업을 선도하는 첨단소재 연구그룹!", "intro": ["산업의 발전에 따라 새로운 소재에 대한 관심과 수요는 빠른 속도로 증가하였으나, 최근의 신소재 개발속도는 수요를 충족시키지 못하고 있다. 따라서 나노과학기술 국제경쟁에서 뒤지지 않기 위해서는 신소재에 대한 더욱 깊은 연구가 있어야 한다. 광주과학기술원의 신소재공학과에서는 신소재분야의 주역을 담당할 인재를 양성하기 위하여 박사 및 석사과정을 운영하고 있다.", "모든 교수는 서로 협력하여 공동연구를 수행할 뿐만 아니라, 대학원생을 지도하여 우리나라 첨단산업을 선도할 연구 인력의 양성에 주력하고 있다. 신소재공학과는 석·박사과정의 대학원생들에게 풍부한 연구경험을 쌓게 하기 위하여 연구에 필요한 최첨단 실험 장비를 확보하고 연구에 전념할 수 있도록 하였다."], "areas": [["광·반도체소재", "", "NT/IT 분야에서 디스플레이와 차세대반도체 사업과 연계된 연구 수행", []], ["나노전자소재", "", "나노스케일의 소재 및 소자에서 일어나는 현상을 연구하고 이를 기반으로 신개념의 나노소재 및 소자 개발", []], ["유기정보소재", "", "NT/IT 분야에서 디스플레이사업과의 연계를 중점적으로 추진, 유기물 트랜지스터 및 발광소자 기술 등을 산업체와 연계하여 실용적 연구 수행", []], ["에너지소재", "", "인류가 당면한 에너지 문제를 해결하기 위하여 환경친화적인 수소전지, 연료전지 및 태양전지에 대한 연구 수행", []], ["생체의료용소재", "", "BT/NT 분야에서 고분자 생체재료, 생체적합성 재료, 초분자집적체, 생분해성 고분자 및 수화젤을 이용하여, 조직공학, 생체기능성 나노소재, 약전달 시스템, 단백질 및 유전자 전달 시스템 등, 의료기술과 관련된 분야에 응용하는 연구가 진행", []]]}, "기계로봇공학과": {"code": "me", "pg": "03010302", "e": "Department of Mechanical and Robotics Engineering", "tel": "062)715-2383", "fax": "062)715-2384", "mail": "sme@gist.ac.kr", "hp": "https://me.gist.ac.kr/me/", "slo": "미래 인간생활의 질적 향상을 주도할 지능화시스템 창출의 선도 연구그룹!", "intro": ["미래사회가 과학기술 발전에 의해 현재와는 크게 다를 것임이 예고 되고 있는 가운데, 기계로봇공학은 제품의 설계·공정기술을 혁신하여 미래 인간생활의 질 향상을 주도할 학문분야로써, 수많은 공학·과학분야의 융합에 의한 반복적 상승작용으로 부분의 합보다 훨씬 큰 성과(정밀, 자동, 복합기능 등 기기의 지능화)를 창출할 것이다.", "이에 따라, 본 학과에서는 다양한 배경(제어계측, 기계, 기계설계, 정밀기계, 산업 등)을 가진 학생들의 자유분방한 창의력을 Vision 있는 목표에 결집시키는 Team Approach를 통하여, 미래 핵심 원천 기술의 식별, 개발 및 이의 실용적 확산은 물론, 무한기술경쟁시대의 국가미래를 이끌어갈 과학기술 두뇌를 배출하고자 한다."], "areas": [["로봇 모빌리티", "", "", []], ["우주항공 방산", "", "우주 탐사를 위한 항법 및 로봇 원천기술, 재사용 발사체 시스템 설계제어기술, 재진입 열보호 기술, 그리고 항공기 구조 설계에 이르기까지 다양한 우주항공 기술을 연구", []], ["설계제조 지능화", "", "인공지능을 적극적으로 활용한 스마트 제조 기술을 통해 더 빠르고, 더 효율적이며, 더 지능적인 제조 기술을 연구하고 이를 실제 산업 현장에서 실현", []], ["열유체 에너지 시스템", "", "열 및 에너지 효율을 극대화하고 환경 영향을 최소화하는 지속 가능한 에너지 솔루션을 위한 관련 연구를 수행", []]]}, "환경·에너지공학과": {"code": "env1", "pg": "03010303", "e": "Department of Environment and Energy Engineering", "tel": "062)715-2431~3", "fax": "062)715-2434", "mail": "env@gist.ac.kr", "hp": "https://env1.gist.ac.kr", "slo": "", "intro": ["환경에너지공학과는 기후변화 대응과 지속 가능한 발전을 목표로 대기, 물, 에너지 분야에서 첨단 환경 기술과 인재 양성에 주력하고 있다.", "주요 연구 분야는 대기·생태·지구과학, 물과학 및 물공학, 지속 가능한 에너지로, 탄소중립 및 자원순환 기술 개발에 중점을 두고, 혁신적인 융합 연구를 통해 세계적 수준의 환경 전문가를 양성하며, 미래 환경 문제 해결에 기여하고자 한다."], "areas": [["기후변화·대기", "Climate change and Atmosphere", "", ["원격탐사 및 인공지능 기술을 활용한 지구 물순환 연구", "대기오염물질 측정 기술 개발 및 멀티-플랫폼 활용 거동 특성 파악", "에어로졸의 실시간 측정/분석을 통한 물리화학적 특성 규명", "모델링과 원격 관측 기반 대기질 통합 모델링 시스템 활용", "지구 기후 시스템의 변화양상이해 및 미래예측"]], ["지속가능 에너지", "Sustainable Energy", "", ["촉매화학공정 기반 가스 전환 및 친환경에너지 생산", "물질의 열역학적 특성 기반 열에너지 저장 및 친환경 에너지 생산", "촉매전기화학과 화학공정 기반 화학에너지의 생산/전환/활용", "전기화학 반응 및 생물공정 기반 바이오에너지 생산 전환/활용", "결정결함화학 및 전기화학 기반 에너지 환경소재 개발 및 공정연구"]], ["물·생태", "Water and Ecology", "", ["해양의 생물·자원·생태계에 대한 기후변화 영향 연구", "기후변화에 따른 토양 및 지하수 물리화학적 특성평가 및 정화 기술 연구", "환경유해물질의 형태변화/거동 및 영향 연구", "환경시스템에 대한 이해와 빅데이터 및 모델링 연구", "기후변화 외래/자생 식물 개체군의 생태환경 변화 연구", "첨단 수처리 기술 및 센서 개발과 수환경 오염물질 거동 이해", "질량분석 기반 환경유해인자 탐색 및 생체영향 평가", "먹는물 수질 분석, 오염물질 거동/변환, 고도 수처리 기술 개발", "환경나노기술 기반 환경오염 및 수자원 관련 기술 개발 및 활용", "기후변화 환경매체 내 미량 무기오염물질 생지화학적 거동 이해 및 제거", "미생물 활용 난분해성 유기물질 분해 및 나노물질 합성/활용", "극한환경조건의 물질의 물리·화학적 특성 변화 이해와 환경 응용"]]]}, "생명과학과": {"code": "life", "pg": "03010401", "e": "Department of Life Sciences", "tel": "062)715-2481~2", "fax": "062)715-2484", "mail": "life@gist.ac.kr", "hp": "https://life.gist.ac.kr", "slo": "", "intro": ["최첨단 연구기법과 기술개발을 통하여 생명현상의 이치를 탐구하고, 이를 통해 획득한 지식을 기반으로 각종 질병의 원인 규명, 차세대 의약품 개발, 유용한 생체재료 디자인 및 생산, 지속가능한 생물 및 환경자원 보존을 위한 원천기술 개발 수행"], "pts": ["생명과학의 학문적 영역 뿐만 아니라 융합학문의 창출 및 발전을 선도하는 신개념 연구중심 대학 구현"], "areas": [["세포/분자생물학", "", "", ["세포 다이나믹스 이미징, 로지스틱스", "세포 노화 및 제거 연구", "유전체학 및 후성유전체학", "종양 대사 및 억제 연구", "유전자 치료 및 신약 표적 연구", "연골 퇴행제어"]], ["생화학/생물리학", "", "", ["단백질구조 및 기능 연구", "기능의약 단백질체 연구", "단일분자 생물학 및 세포다이나믹스", "막단백질 조절제 및 신약 개발"]], ["신경/발생생물학", "", "", ["신경회로 활성 조절과 IT 제어", "생식세포 관찰 및 유전자 발굴", "뇌공학 및 뉴로디바이스", "혈관내피세포 관찰 및 마커 개발", "분자 뇌·신경생물학"]], ["면역학", "", "", ["면역 시냅스·세포치료 연구", "암, 자가면역질환 연구", "염증질환 제어 융합 연구", "면역시스템과 성체줄기세포 상호작용 연구", "조직 재생과 질병에 관한 연구"]]]}, "의생명공학과": {"code": "bmse", "pg": "03010402", "e": "Department of Biomedical Science and Engineering", "tel": "062)715-5312", "fax": "062)715-5309", "mail": "bmse@gist.ac.kr", "hp": "https://bmse.gist.ac.kr/", "slo": "", "intro": ["광주과학기술원(GIST) 의생명공학과(BMSE : Department of Biomedical Science and Engineering)는 세계의료사업을 선도할 superelite 석사 및 PhD(Dual Degree Program 추진중) 양성을 목표로 2008년 1월에 정부의 지원을 받아 설립되었습니다.", "BMSE는 의학계열(의학과, 치의학과, 한의학과 등)과 이공계열 학생을 대상으로 의료진단 및 치료기술 등과 관련하여 창의적으로 응용지향적인 융합교육을 시행합니다."], "areas": [["뇌신경과학 및 뇌공학", "", "", ["신경재활, 신경중재술", "뇌영상 및 커넥토믹스", "신경신호처리, 기계학습 (인공지능)", "계산신경과학 및 모델링", "뇌신경질환 (뇌졸중, 수면, 치매 등)"]], ["의광학 및 의공학", "", "", ["구조적 및 기능적 신경광자학 기술", "차세대 현미경 및 내시경 기술", "3차원 홀로그래피 기술", "비침습적 신경조절 및 신진대사율 측정 기술", "인공지능 기반 광영상 및 분광 빅 데이터 분석", "저출력 광원 치료 기술"]], ["면역학 및 대사학", "", "", ["마이크로바이옴 진단 및 치료제 개발", "암면역치료제 개발", "대사질환 연구", "정밀의료", "면역 관련 유전자 조절", "면역계 발달 및 활성 연구"]]]}, "융합신경생리학과": {"code": "intnscphys", "pg": "03010403", "e": "Department of Integrative Neuroscience & Physiology", "tel": "062)715-3781", "fax": "062)715-3789", "mail": "intnscphys@gist.ac.kr", "hp": "https://intnscphys.gist.ac.kr", "slo": "", "intro": [], "pts": ["뇌신경세포·신경회로 중심의 미시적 연구를 넘어, 뇌신경과학과 신체 생리를 통합적으로 연구하는 차별화된 학과", "신경과학과 생리학을 융합한 차세대 글로벌 과학자 양성", "뇌신경과 신체 생리에 특화된 통합적·개방적 교육 및 연구 수행"], "areas": [["신경과학", "", "", ["신경유전학", "신경생리학", "행동신경학"]], ["융합생리학", "", "", ["시스템 데이터 생리학", "AI 디지털 생리학", "뇌-장-미생물 축 생리학"]], ["신경생리 면역학", "", "", ["신경면역학", "장면역학", "미생물 면역학"]], ["신경생리 미생물학", "", "", ["신경미생물학", "장내미생물학", "디지털미생물학"]], ["시스템 생물학", "", "", ["AI기반 다중오믹스분석", "AI기반 빅데이터 분석", "AI기반 신약개발"]]]}};
/* v18 대학·학과 목록 */
{const host=$("#colpage");const note=host.querySelector(".note");const noteH=note?note.outerHTML:"";
 const MONO=d=>{const m=d.match(/^(AI|AX)/);if(m)return m[1];return d.replace(/[·\s]/g,"").slice(0,2);};
 let cf=-1,cq="";
 host.classList.remove("wrap");
 host.innerHTML='<div class="wrap cp2"><aside class="cp2-l" aria-label="단과대학"><h2>대학·학과</h2><ul>'+COLLEGES.map((c,i)=>'<li><button type="button" data-c="'+i+'" aria-pressed="false">'+esc(c.n)+'<small>'+c.d.length+'</small></button></li>').join("")+'</ul></aside><div class="cp2-r"><div class="cxo" role="group" aria-label="단과대학 한눈에">'+COLLEGES.map((c,i)=>{const nA=c.d.reduce((a,d)=>a+((typeof DEPT!=="undefined"&&DEPT[d]&&DEPT[d].areas.length)||0),0);return '<button type="button" class="cxoc c'+i+'" data-cc="'+i+'"><span class="cxoi" aria-hidden="true"><img loading="lazy" src="'+IMG(["d_ai.jpg","d_physics.jpg","d_me.jpg","d_life.jpg"][i])+'" alt=""></span><span class="cxoe">'+esc(["COLLEGE OF AI","NATURAL SCIENCES","ENGINEERING","LIFE & MEDICAL"][i])+'</span><b>'+esc(c.n)+'</b><span class="cxon"><span><em class="num">'+c.d.length+'</em>학과·대학원</span>'+(nA?'<span><em class="num">'+nA+'</em>연구 분야</span>':'')+'</span><span class="cxod">'+c.d.map(esc).join(" · ")+'</span></button>';}).join("")+'</div><section class="cp-st" aria-labelledby="cpstt"><h2 id="cpstt">4개 단과대학,<br>13개 학과와 1개 대학원</h2><p>인류의 더 나은 미래가치를 창출하는 과학기술 중추 연구기관, GIST. 단과대학마다 기초부터 융합까지 이어지는 학과가 모여 있습니다.</p><a class="cp-st-a" href="#cp2t">학과 모두 보기</a></section><figure class="cp-ph"><img src="'+IMG("p_aerial_day.jpg")+'" alt="GIST 캠퍼스 전경(낮, 하늘에서 본 모습)" loading="lazy"></figure><h3 id="cp2t">학과 소개</h3><div class="cp2-bar"><div class="cp2-f" role="group" aria-label="단과대학 거르기"><button type="button" data-c="-1" aria-pressed="true">전체</button>'+COLLEGES.map((c,i)=>'<button type="button" data-c="'+i+'" aria-pressed="false">'+esc(c.n)+'</button>').join("")+'</div><label class="cp2-s"><span class="sr">학과 이름 찾기</span><input id="cp2q" type="search" placeholder="학과 이름으로 찾기"><span aria-hidden="true">검색</span></label></div><ul class="cp2-list" id="cp2list" aria-live="polite"></ul>'+noteH+(function(){try{const R=STORIES.filter(x=>x.c!=="영상"&&sImg(x).tp).slice(0,3);if(!R.length)return "";return '<section class="rs-st dn-st" aria-labelledby="dnstt"><h2 id="dnstt">학과 소식</h2><p>최근 GIST 소식 가운데 학과 이름이 나오는 글입니다. 제목을 누르면 GIST 원문으로 갑니다.</p><div class="rs-g">'+R.map(x=>{const im=sImg(x);return '<a class="rs-c" href="'+(x.g||x.u)+'"'+EXT+'><span class="rs-i" style="background-image:url('+im.u+')"></span><span class="rs-b"><span class="eyebrow">'+esc(im.tp)+' · '+esc(x.d||"")+'</span><b>'+esc(x.t)+'</b><span class="rs-s">'+esc(x.s||"")+'</span></span></a>';}).join("")+'</div><a class="pill" href="#story">소식 더 보기 →</a></section>';}catch(e){return "";}})()+'</div></div>';
 host.addEventListener("click",e=>{const b=e.target.closest("[data-cc]");if(!b)return;const t=host.querySelector('.cp2-f [data-c="'+b.dataset.cc+'"]');t&&t.click();const L=document.getElementById("cp2t");L&&L.scrollIntoView({behavior:"smooth",block:"start"});});
 function paint(){const rows=[];COLLEGES.forEach((c,i)=>{if(cf>=0&&cf!==i)return;c.d.forEach(d=>{if(cq&&!d.includes(cq))return;rows.push([c,i,d]);});});
  $("#cp2t").textContent=cf<0?"학과 소개":COLLEGES[cf].n;
  $("#cp2list").innerHTML=rows.length?rows.map(([c,i,d])=>{const D0=(typeof DEPT!=="undefined"&&DEPT[d])||{areas:[]};const one=((D0.intro&&D0.intro[0])||D0.slo||"");return '<li><a class="dthumb" href="#d-'+DURL[d]+'" tabindex="-1" aria-hidden="true">'+dphoto(DURL[d],i)+'<span class="dtw">'+esc(DWD[DURL[d]]||"")+'</span></a><div><a class="dname" href="#d-'+DURL[d]+'"><b>'+esc(d)+'</b>'+(D0.e?'<em>'+esc(D0.e)+'</em>':'')+'</a><div class="meta"><span>'+esc(c.n)+'</span><span class="num">'+esc((DURL[d]||"")+".gist.ac.kr")+'</span>'+(D0.areas.length?'<span>연구 분야 '+D0.areas.length+'개</span>':'')+'</div>'+(one?'<p class="dsum">'+esc(one.length>92?one.slice(0,92)+"…":one)+'</p>':'')+(D0.areas.length?'<div class="dchips2">'+D0.areas.slice(0,5).map(a=>'<span>'+esc(a[0])+'</span>').join("")+'</div>':'')+'</div><div class="act"><a class="dgo" href="#d-'+DURL[d]+'">학과 소개 →</a><a class="hp" href="'+dhref(d)+'"'+EXT+'>홈페이지 바로가기 <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M3 11 12 4l9 7v9h-6v-6H9v6H3z"/></svg></span></a><a href="https://www.gist.ac.kr/gadm/"'+EXT+'>대학원 입학</a><a href="#search" data-q="'+esc(d.replace("학과","").replace("대학원",""))+'">학과 안 검색</a></div></li>';}).join(""):'<li class="cp2-empty" style="display:block">찾는 학과가 없습니다. 이름을 다시 확인해 주세요.</li>';
  host.querySelectorAll("[data-c]").forEach(b=>b.setAttribute("aria-pressed",+b.dataset.c===cf||(cf<0&&b.dataset.c==="-1"&&b.closest(".cp2-f"))?"true":"false"));}
 host.addEventListener("click",e=>{const b=e.target.closest("[data-c]");if(!b)return;cf=+b.dataset.c;paint();});
 host.addEventListener("input",e=>{if(e.target.id==="cp2q"){cq=e.target.value.trim();paint();}});
 document.addEventListener("click",e=>{const a=e.target.closest(".pw[data-col]");if(a){cf=+a.dataset.col;paint();}});
 paint();}

document.querySelectorAll(".page-h.pv").forEach(h=>{const en=h.querySelector(".pv-en"),w=h.querySelector(".wrap");if(en&&w)w.prepend(en);});

/* v19 지금, 지스트 목록 카드도 접힌 꼬리표 */
storyCard=function(s,big){const im=sImg(s);
 return '<a class="nc2 gcard'+(big?' big':'')+'" href="'+stH(s)+'"><span class="ph"><img src="'+im.u+'" alt="" loading="lazy">'+exTag(im.ex)+'<span class="tabcut'+(s.c==="연구성과"?' r':'')+'">'+esc(cen(s)||s.c)+'</span></span><span class="bd"><span class="gk">'+esc(s.c)+'</span><b>'+esc(s.t)+'</b>'+(big&&s.sum&&s.sum[0]?'<p class="gsum">'+esc(s.sum[0])+'</p>':'')+'<small>'+esc(s.s)+'</small><time class="num">'+esc(s.d)+((window.__RT||[])[STORIES.indexOf(s)]?' · 원문 약 '+window.__RT[STORIES.indexOf(s)]+'분':'')+'</time></span></a>';};
renderStory();
addEventListener("lazylibs",()=>{try{
 if(window.tippy)tippy(".rail [data-tip]",{content:r=>r.dataset.tip,placement:"left",theme:"gist"});
 if(window.VanillaTilt&&matchMedia("(pointer:fine)").matches&&!matchMedia("(prefers-reduced-motion: reduce)").matches)VanillaTilt.init($$(".sp-grid .sp, #cols .col, .events .ev"),{max:5,speed:600,glare:true,"max-glare":.12,scale:1.01});
 if(window.Sortable&&$("#myq"))Sortable.create($("#myq"),{animation:180,ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",onEnd:()=>{myq=$$("#myq .qi").map(a=>a.dataset.n);saveMyq();}});
 if(typeof setQR==="function")setQR();
}catch(e){console.warn(e)}});

/* ===== v70 벤치마킹 반영 ===== */
(function(){var $=function(q){return document.querySelector(q)},$$=function(q){return [].slice.call(document.querySelectorAll(q))};
 var sk=$(".skip");if(sk)sk.addEventListener("click",function(e){e.preventDefault();var m=document.getElementById("main-c");var v=document.querySelector(".view.on")||m;var t=v.querySelector("h1,h2")||m;t.setAttribute("tabindex","-1");t.focus();t.scrollIntoView({block:"start"});});
 /* 펼침 메뉴 '이런 분께' (스탠퍼드 Information for) */
 var AUD=[["ug","예비 학부생"],["gr","대학원 지원자"],["st","재학생"],["pa","학부모"],["fa","교직원"],["co","기업·연구자"]];
 if(typeof openMega==="function"){var _om=openMega;openMega=function(i){_om(i);var w=$("#megaw");if(w&&!w.querySelector(".m-aud"))w.insertAdjacentHTML("beforeend",'<div class="m-aud"><b>이런 분께</b>'+AUD.map(function(a){return '<a href="#home" data-aud="'+a[0]+'">'+a[1]+'</a>'}).join("")+'</div>');};}
 document.addEventListener("click",function(e){var a=e.target.closest("a[data-aud]");if(!a)return;e.preventDefault();var m=$("#mega");if(m)m.classList.remove("on");
  var go=function(){var b=$('.who button[data-who="'+a.dataset.aud+'"]');if(b)b.click();var t=$("#aud");if(t){t.style.scrollMarginTop="140px";t.scrollIntoView({block:"start"});}};
  if((LH()||"#home")!=="#home"){location.hash="home";setTimeout(go,750);}else go();},true);
 /* 바닥글 '바로 하기' (스탠퍼드 Action) */
 var ft=$("footer .ft-top");if(ft&&!$(".ft-act")){ft.insertAdjacentHTML("afterend",'<div class="wrap ft-act"><b>바로 하기</b><a href="#apply">온라인 신청 센터</a><a href="#nexus">연구 연결 지도</a><a href="https://www.gist.ac.kr/uadm/main.html" target="_blank" rel="noopener noreferrer">대학 입학 지원 ↗</a><a href="https://www.gist.ac.kr/gadm/" target="_blank" rel="noopener noreferrer">대학원 입학 지원 ↗</a><a href="https://www.gist.ac.kr/kr/html/sub01/010305.html" target="_blank" rel="noopener noreferrer">찾아오시는 길 ↗</a><a href="https://www.youtube.com/c/GIST_YOUTUBE" target="_blank" rel="noopener noreferrer">유튜브 ↗</a><a href="https://www.instagram.com/gist.ac.kr/" target="_blank" rel="noopener noreferrer">인스타그램 ↗</a></div>');}
})();


/* v20 통합검색: 범위별 묶음 + 결과마다 바로가기 (포스텍 통합검색 방식) */
const SGN={main:"대표 홈페이지",dept:"학과 홈페이지",people:"사람·업무",rule:"규정·안내",sns:"SNS"};
function sHref(r){if(r.h&&/^#([pd]-|st-\d|tutorial$)/.test(r.h))return [r.h,0];if(r.u)return [r.u,1];if(r.s==="dept"){const d=r.site.replace(/\s*홈페이지$/,"");return DURL[d]?[dhref(d),1]:["#colleges",0];}
 if(r.s==="sns"){const x=SNS.find(z=>r.t&&(z.t.includes(r.t)||r.t.includes(z.t.slice(0,12))));return x?[x.u,1]:["#story",0];}
 if(r.s==="rule")return ["#tutorial",0];return ["#story",0];}
runSearch=function(){
 const q=$("#q").value.trim();const L=smart(IDX,q,r=>scope==="all"||r.s===scope);
 $("#rcount").innerHTML=(q?'<b class="rq">“'+esc(q)+'”</b> ':'')+'검색 결과 <b class="num">'+L.length+'</b>건';
 const G={};L.forEach(r=>{(G[r.s]=G[r.s]||[]).push(r);});
 let html="";
 const DB=(window.__deptBlock&&(scope==="all"||scope==="people"))?window.__deptBlock(q):"";html+=DB;
 const PF=q&&G.people&&G.people.some(r=>r.w===3&&r.t.replace(/\s/g,"").includes(q.replace(/\s/g,"")));(PF?["people","main","dept","rule","sns"]:["main","dept","people","rule","sns"]).forEach(k=>{if(!G[k])return;html+='<li class="rg"><h3>'+SGN[k]+' <span class="num">'+G[k].length+'</span></h3></li>'+G[k].map(r=>{const [h,ext]=sHref(r);return '<li class="ri"><a href="'+esc(h)+'"'+(ext?EXT:'')+'><span class="src"><span class="'+(r.s==="dept"?"dept":r.s==="people"?"ppl":"")+'">'+SGN[r.s]+'</span>'+esc(r.site)+'</span><b>'+hl(r.t,q)+'</b><p>'+hl(r.p,q)+'</p><i class="go">'+(ext?'바로가기 ↗':'열기 →')+'</i></a></li>';}).join("");});
 const DL=[]&&q?DIR.filter(d=>q.split(/\s+/).some(w=>w.length>=2&&(d[0]+" "+d[1]).includes(w))):[];
 if(DL.length){html+='<li class="rg"><h3>업무별 담당부서 <span class="num">'+DL.length+'</span></h3></li>'+DL.slice(0,6).map(d=>'<li class="ri"><div class="person"><div class="av">'+esc(d[1].slice(0,1))+'</div><div><b>'+esc(d[1])+' · '+hl(d[0],q)+'</b><small>내선 <span class="num">'+esc(d[2])+'</span> (062-715-내선) · 개인 이름·사진은 표시하지 않음</small></div></div></li>').join("");}
 if(!q){$("#rcount").innerHTML='찾을 말을 넣어 주세요 · 지금 <b class="num">'+IDX.length+'</b>건의 화면·글이 검색됩니다';
  const POP=["장학","증명서","생활관","수강신청","재수강료","복수전공","통합경비","오룡관","기술이전","연구 분야"];
  const cnt=k=>IDX.filter(r=>r.s===k).length;
  html='<li class="sxe"><div class="sxe-b"><h2>많이 찾는 말</h2><div class="sxe-c">'+POP.map(w=>'<button type="button" data-sq="'+esc(w)+'">'+esc(w)+'</button>').join("")+'</div></div>'+
   '<div class="sxe-b"><h2>찾는 범위</h2><div class="sxe-g">'+[["main","대표 홈페이지","세부페이지·학과 소개·지금, 지스트"],["dept","학과 홈페이지","13개 학과·1개 대학원 홈페이지 바로가기"],["people","사람·업무","직원검색 "+new Set(ORGDIR.map(r=>r[0])).size+"개 부서 업무·내선 "+ORGDIR.length+"건 + 교수 "+PROFDIR.length+"명"],["rule","규정·안내","튜토리얼 7주제"],["sns","SNS","공식 유튜브·인스타그램 글"]].map(x=>'<div><b class="num">'+cnt(x[0])+'</b><span>'+x[1]+'</span><small>'+x[2]+'</small></div>').join("")+'</div></div>'+
   '<div class="sxe-b"><h2>최근 지금, 지스트</h2>'+STORIES.map((x,i)=>[x,i]).sort((a,b)=>(b[0].d||b[0].m).replace(/\D/g,"").padEnd(8,"0").localeCompare((a[0].d||a[0].m).replace(/\D/g,"").padEnd(8,"0"))).slice(0,4).map(([x,i])=>'<a class="sxe-n" href="#st-'+i+'"><span>'+esc(x.c)+' · <span class="num">'+esc(x.d||x.m)+'</span></span><b>'+esc(x.t)+'</b></a>').join("")+'</div></li>';}
 $("#res").innerHTML=html||'<li class="ri"><b>결과가 없습니다.</b><p>범위를 "전체"로 바꾸거나 오른쪽 AI 안내에 물어보세요.</p></li>';
};
if($("#q").value)runSearch();
$("#res").addEventListener("click",e=>{const b=e.target.closest("[data-sq]");if(!b)return;$("#q").value=b.dataset.sq;runSearch();$("#q").focus();});

/* QUICK MENU 판 */
{const b=$("#rl-quick"),q=$("#qpanel");const set=o=>{q.hidden=!o;b.setAttribute("aria-expanded",o);if(o){icons();q.querySelector("a").focus();}};
 b.addEventListener("click",()=>set(q.hidden));$("#qpx").onclick=()=>{set(false);b.focus();};
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!q.hidden){set(false);b.focus();}});
 document.addEventListener("click",e=>{if(!q.hidden&&!e.target.closest("#qpanel,#rl-quick"))set(false);});
 q.addEventListener("click",e=>{if(e.target.closest("a[href^='#']"))set(false);});}
/* 스크롤하며 나타남: 구역 제목·카드 */
if(!RM&&"IntersectionObserver" in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}}),{rootMargin:"0px 0px -8% 0px"});
 const tag=()=>document.querySelectorAll(".p-tit,.p-claim-in>div,.p-pc,.pw,.sc2,.nc2:not(.gcard),.p-find .hx-search").forEach((el,i)=>{if(el.classList.contains("rv"))return;el.classList.add("rv");el.style.transitionDelay=((i%4)*70)+"ms";io.observe(el);});
 tag();addEventListener("hashchange",()=>setTimeout(tag,80));
 const _rn2=renderNews;renderNews=function(){_rn2();tag();};}

/* 경로 막대: 단계마다 펼침 목록 (포스텍 방식) */
{const TOP=[["About GIST","https://www.gist.ac.kr/kr/html/sub01/0102.html"],["대학·학과","#colleges"],["입학","https://www.gist.ac.kr/uadm/main.html"],["연구","https://www.gist.ac.kr/kr/html/sub04/0406.html"],["대학생활","#tutorial"],["미디어센터","#story"],["통합검색","#search"]];
 const SUB={"학사 한 장":[["학사 한 장","#tutorial"],["학사일정","https://www.gist.ac.kr/kr/html/sub05/0501.html"],["증명서 발급","https://www.gist.ac.kr/kr/html/sub05/050204.html"],["식단표","https://www.gist.ac.kr/kr/html/sub05/050601.html"]],
  "지금, 지스트":[["지금, 지스트","#story"],["공지","https://www.gist.ac.kr/kr/html/sub06/060101.html"],["공식 유튜브","https://www.youtube.com/c/GIST_YOUTUBE"],["인스타그램","https://www.instagram.com/gist.ac.kr/"]]};
 const lk=([t,u],cur)=>'<li><a href="'+u+'"'+(/^https/.test(u)?EXT:'')+(t===cur?' aria-current="page"':'')+'>'+esc(t)+(/^https/.test(u)?' ↗':'')+'</a></li>';
 let n=0;document.querySelectorAll(".pbar ol li").forEach((li,i,all)=>{const t=li.textContent.trim();const first=li===li.parentElement.firstElementChild;const opts=first?TOP:SUB[t];if(!opts)return;const id="ddl"+(n++);
  li.innerHTML='<button type="button" class="dd" aria-expanded="false" aria-controls="'+id+'">'+esc(t)+'</button><ul class="ddl" id="'+id+'" hidden>'+opts.map(o=>lk(o,t)).join("")+'</ul>';});
 const closeAll=x=>document.querySelectorAll(".pbar .dd[aria-expanded='true']").forEach(b=>{if(b!==x){b.setAttribute("aria-expanded","false");document.getElementById(b.getAttribute("aria-controls")).hidden=true;}});
 document.addEventListener("click",e=>{const b=e.target.closest(".pbar .dd");if(b){closeAll(b);const o=b.getAttribute("aria-expanded")!=="true";b.setAttribute("aria-expanded",o);document.getElementById(b.getAttribute("aria-controls")).hidden=!o;return;}if(!e.target.closest(".ddl"))closeAll();else if(e.target.closest("a"))closeAll();});
 document.addEventListener("keydown",e=>{if(e.key==="Escape")closeAll();});}

icons();

/* 지금, 지스트 왼쪽 메뉴 */
{const host=document.querySelector("#v-story .page-h")?.parentElement.querySelector(":scope > .wrap");
 if(host){const w=document.createElement("div");w.className="lnbw";const main=document.createElement("div");main.className="lnb-main";while(host.firstChild)main.appendChild(host.firstChild);
  const cats=["전체","보도자료","연구성과","사람","캠퍼스","영상"];
  const aside=document.createElement("nav");aside.className="lnb";aside.setAttribute("aria-label","소식 메뉴");
  aside.innerHTML='<h2>미디어센터</h2><ul><li><a href="#story" aria-current="page">지금, 지스트</a><div class="sub" role="group" aria-label="지금, 지스트 분류">'+cats.map(c=>'<button type="button" data-c="'+c+'" aria-pressed="'+(c==="전체")+'">'+c+'</button>').join("")+'<button type="button" data-sns="1">인스타그램·유튜브</button></div></li><li><a href="https://www.gist.ac.kr/kr/html/sub06/060101.html"'+EXT+'>공지 ↗</a></li><li><a href="https://www.gist.ac.kr/kr/html/sub06/060103.html"'+EXT+'>채용 ↗</a></li><li><a href="https://www.youtube.com/c/GIST_YOUTUBE"'+EXT+'>공식 유튜브 ↗</a></li></ul>';
  w.appendChild(aside);w.appendChild(main);host.appendChild(w);
  aside.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;
   if(b.dataset.sns){const t=$("#h-sns");t&&scrollTo({top:t.getBoundingClientRect().top+scrollY-120,behavior:RM?"auto":"smooth"});return;}
   const tb=[...$$("#scat button")].find(x=>x.dataset.c===b.dataset.c);tb&&tb.click();
   aside.querySelectorAll("[data-c]").forEach(x=>x.setAttribute("aria-pressed",x===b));
   const g=$("#sgrid");g&&scrollTo({top:g.getBoundingClientRect().top+scrollY-140,behavior:RM?"auto":"smooth"});});
  $("#scat").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;aside.querySelectorAll("[data-c]").forEach(x=>x.setAttribute("aria-pressed",x.dataset.c===b.dataset.c));});}}
/* 주장문 숫자: 화면에 들어오면 0부터 올라감 */
{document.querySelectorAll(".p-giant").forEach(h=>h.setAttribute("aria-label",h.textContent.replace(/\s+/g," ").trim()));document.querySelectorAll(".p-giant span:first-child").forEach(sp=>{const t=sp.firstChild;if(!t||t.nodeType!==3)return;const m=t.textContent.match(/^(\d+)(.*)$/);if(!m)return;
  const c=document.createElement("span");c.className="cnt";c.textContent=m[1];c.dataset.to=m[1];sp.replaceChild(c,t);if(m[2])c.after(document.createTextNode(m[2]));});
 const cs=[...document.querySelectorAll(".p-giant .cnt")];
 if(!RM&&"IntersectionObserver" in window){cs.forEach(c=>c.textContent="0");
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);const el=e.target,to=+el.dataset.to,t0=performance.now(),D=1400;
   const f=n=>{const k=Math.min(1,(n-t0)/D),v=Math.round(to*(1-Math.pow(1-k,3)));el.textContent=v;if(k<1)requestAnimationFrame(f);};requestAnimationFrame(f);}),{threshold:.4});
  cs.forEach(c=>io.observe(c));}}

/* ===== v27: 모든 메뉴 세부 화면 (포스텍 서브페이지 문법) ===== */
const PEN=["ABOUT GIST","COLLEGES","ADMISSION","RESEARCH","CAMPUS LIFE","NEWS"];
const PIMG=["hx_b.jpg","gal_gate.jpg","mg_adm.jpg","mg_res.jpg","mg_campus.jpg","pv_story.jpg"];
const GS="https://www.gist.ac.kr/kr/html/";
/* 현행 GIST 홈페이지에서 확인한 실제 주소(2026.11.10.) */
const PURL={"창업 지원":"https://gti.gist.ac.kr/","홍보 영상":"https://www.gist.ac.kr/kr/html/sub01/010309.html","GIST 상징":"https://www.gist.ac.kr/kr/html/sub01/01030301.html","찾아오시는 길":GS+"sub01/010305.html","캠퍼스 투어":GS+"sub01/010503.html","오룡관 예약":GS+"sub05/050301.html","학사일정":GS+"sub05/0501.html","증명서 발급":GS+"sub05/050204.html","부설 연구소":GS+"sub04/0406.html","연구센터":GS+"sub04/0406.html","공지":GS+"sub06/060101.html","입학 전형":"https://www.gist.ac.kr/uadm/main.html","모집 요강":"https://www.gist.ac.kr/uadm/main.html","입학 상담":"https://www.gist.ac.kr/uadm/main.html","전형 안내":"https://www.gist.ac.kr/gadm/","외국인 입학":"https://www.gist.ac.kr/gadm/","포털·ZEUS":"https://portal.gist.ac.kr/","유튜브":"https://www.youtube.com/c/GIST_YOUTUBE","인스타그램":"https://www.instagram.com/gist.ac.kr/","비전·연혁":GS+"sub01/0102.html","총장 인사말":GS+"sub01/010401.html","학생기구":GS+"sub05/05040101.html","생활관":GS+"sub05/05030401.html","장학 제도":GS+"sub05/05020603.html","등록금":GS+"sub05/05020603.html","수강신청":GS+"sub05/050209.html","상담센터":"https://gccdc.gist.ac.kr/","조직도":GS+"sub01/010601.html","연구 분야":GS+"sub04/040301.html","기술이전":GS+"sub04/040301.html","업무별 담당부서":GS+"sub05/050502.html","공동 연구장비":"https://gaia.gist.ac.kr/"};
const PSPECIAL={"학사 한 장":"#tutorial","보도자료":"#story","연구성과":"#story","사람":"#story","캠퍼스":"#story","영상":"#story","사람·업무 찾기 (내선번호)":"#search-people","학과 둘러보기":"#colleges","연구실 찾기":"#colleges"};
function pHref(i,g,k){const x=MEGA[i][2][g][1][k];if(i===1&&DURL[x])return "#d-"+DURL[x];return PSPECIAL[x]||("#p-"+i+"-"+g+"-"+k);}
function pExt(i,g,k){return false;}
/* 메뉴 링크를 세부 화면으로 다시 연결 */
openMega=(function(_){return function(i){_(i);$$("#megaw div:not(.lead) ul").forEach((ul,g)=>ul.querySelectorAll("a").forEach((a,k)=>{a.setAttribute("href",pHref(i,g,k));if(pExt(i,g,k)){a.target="_blank";a.rel="noopener noreferrer";}else{a.removeAttribute("target");}}));};})(openMega);
$("#smapg").innerHTML=MEGA.map((m,i)=>'<div><h3>'+esc(m[0])+'</h3>'+m[2].map((g,gi)=>'<h4>'+esc(g[0])+'</h4>'+g[1].map((x,k)=>'<a href="'+pHref(i,gi,k)+'"'+(pExt(i,gi,k)?EXT:'')+'>'+esc(x)+'</a>').join("")).join("")+'</div>').join("");

/* 세부 화면 내용: 자료가 있는 것만 실제 내용, 나머지는 '옮겨 올 자리' */
const ACAL=[[11,17,11,17,"광주과학기술원 설립기념일"],[11,27,11,27,"겨울학기 개설교과목(안) 제출마감"],[11,30,11,30,"학사학위 및 석사학위 청구논문(심사용) 제출마감(2027년 2월 졸업예정자)"],[11,30,11,30,"박사학위논문 결과보고서 제출마감 (2027년 2월 졸업예정자)"],[12,4,12,4,"2027학년도 봄학기 교과과정 편성(안) 제출마감"],[12,10,12,10,"학사과정 전공 선언 및 변경 마감"],[12,14,12,18,"가을학기 기말고사 및 종강"],[12,15,12,15,"박사학위논문(제출용) 제출마감(2027년 2월 졸업예정자)"],[12,23,12,24,"겨울학기 수강신청"],[12,25,12,25,"성탄절"],[12,28,12,28,"겨울학기 개강"],[12,28,12,31,"겨울학기 수강신청 변경"],[12,31,12,31,"학사학위논문 및 석사학위논문 결과보고서 제출마감(2027년 2월 졸업예정자)"],[12,31,12,31,"학사학위논문(제출용) 제출마감(2027년 2월 졸업예정자)"],[12,31,12,31,"가을학기 성적 제출 마감"],[12,31,12,31,"겨울학기 개설교과목 변경(안) 제출마감"]];
function calHTML(){const Y=2026;const W="일월화수목금토";const T=new Date();T.setHours(0,0,0,0);
 const on=(m,d)=>ACAL.filter(a=>{const x=m*100+d;return x>=a[0]*100+a[1]&&x<=a[2]*100+a[3];});
 const one=m=>{const first=new Date(Y,m-1,1).getDay(),days=new Date(Y,m,0).getDate();let c='';for(let i=0;i<first;i++)c+='<span class="cd e"></span>';
  for(let d=1;d<=days;d++){const es=on(m,d);const wd=(first+d-1)%7;const td=new Date(Y,m-1,d).getTime()===T.getTime();c+='<span class="cd'+(wd===0||es.some(x=>x[4]==="성탄절")?' su':wd===6?' sa':'')+(es.length?' has':'')+(td?' today':'')+'"><b>'+d+'</b>'+es.slice(0,2).map(x=>(x[0]*100+x[1]===m*100+d||d===1||wd===0)?'<i>'+esc(x[4].replace(/\s*\(?\s*2027년 2월 졸업예정자\)?/,""))+'</i>':'<i class="cont" aria-hidden="true">'+esc(x[4].split(" ")[0])+' 계속</i>').join("")+(es.length>2?'<i>+'+(es.length-2)+'건</i>':'')+'</span>';}
  return '<div class="cal"><h3>'+Y+'년 '+m+'월</h3><div class="cw">'+W.split("").map(x=>'<span>'+x+'</span>').join("")+'</div><div class="cg">'+c+'</div></div>';};
 const fd=(m,d)=>m+'.'+(d<10?"0":"")+d+'.('+W[new Date(Y,m-1,d).getDay()]+')';
 const dd=a=>{const s=new Date(Y,a[0]-1,a[1]),e=new Date(Y,a[2]-1,a[3]);if(T>e)return '<em class="cl-p">지남</em>';if(T>=s)return '<em class="cl-n">진행 중</em>';const n=Math.round((s-T)/864e5);return '<em class="cl-d num"><span aria-hidden="true">D-'+n+'</span><span class="sr">'+n+'일 남음</span></em>';};
 const li=a=>'<li><span class="num">'+fd(a[0],a[1])+(a[2]*100+a[3]!==a[0]*100+a[1]?' ~ '+fd(a[2],a[3]):'')+'</span><b>'+esc(a[4])+'</b>'+dd(a)+'</li>';
 return '<div class="calw cal2">'+one(11)+one(12)+'</div><div class="cal-all"><h3>2026년 11~12월 학사일정 <small class="num">'+ACAL.length+'건</small></h3><ul>'+ACAL.map(li).join("")+'</ul><p class="note">출처: 현행 GIST 홈페이지 대학생활 › 학사일정 「2026 학년도 학사일정」 11월·12월 상세일정 원문 그대로 (2026.11.11. 확인). 1~10월·2027학년도 일정은 <a href="https://www.gist.ac.kr/kr/html/sub05/0501.html"'+EXT+'>현행 학사일정 ↗</a></p></div>';}
/* 담당 부서 기본값: 현행 홈페이지·학사 안내에 적힌 부서만 (관리자가 바꾸면 그 값이 우선) */
var PDEPD={"통합경비":"안전팀","증명서 발급":"학적팀","생활관":"학생팀","학생기구":"학생팀","상담센터":"학생상담경력개발센터","캠퍼스 투어":"대외협력팀 · 입학사정관팀(고교 단체)","입학 전형":"입학팀","모집 요강":"입학팀","보도자료":"대외홍보팀","연구성과":"대외홍보팀","사람":"대외홍보팀","홍보 영상":"대외홍보팀","브로슈어":"대외홍보팀"};
const PBODY={
 "학사일정":()=>'<p class="p-lead">주요 학사일정을 한눈에 보고 계획을 세우세요.</p>'+calHTML(),
 "GIST 상징":()=>'<p class="p-lead">GIST를 나타내는 심볼마크와 전용 색상입니다.</p><div class="sym"><div class="sym-l"><img src="'+IMG("ci_gist.png")+'" alt="GIST 심볼마크와 로고타입"></div><div class="sym-r"><h3>심볼마크</h3><p>직사각형 4개의 기둥은 세계화(Global)를 지향하며 혁신적(Innovative) 사고를 가지고 과학적(Scientific) 연구를 통한 과학기술(Technological)의 선도를 의미합니다. ‘G’의 Red 칼라는 역동성과 열정, 강인함과 진취성을, Gray 칼라는 ‘자율’을 의미합니다.</p><div class="sw"><span style="background:#DC2715">GIST Red<br><b>#DC2715</b></span><span style="background:#4F5B54">GIST Gray<br><b>#4F5B54</b></span></div><p class="note">출처: 현행 GIST 홈페이지 ‘GIST 상징’, GIST 브랜드 가이드(2024)</p></div></div><div class="sym4"><figure class="sym4-f"><img src="'+IMG("hxm_t.jpg")+'" alt="캠퍼스의 GIST 기둥 조형물을 올려다본 모습" loading="lazy"><figcaption>캠퍼스의 GIST 기둥 조형물 · GIST 미디어센터 사진</figcaption></figure><div class="sym4-g"><h3>네 기둥의 뜻</h3><ol>'+[["G","Global","세계화를 지향"],["I","Innovative","혁신적 사고"],["S","Scientific","과학적 연구"],["T","Technological","과학기술의 선도"]].map(x=>'<li><b class="sym4-k">'+x[0]+'</b><span><b>'+x[1]+'</b>'+x[2]+'</span></li>').join("")+'</ol><p class="note">위 ‘심볼마크’ 설명(현행 홈페이지 원문)을 네 글자로 나눠 보인 것입니다.</p></div></div>',
 "찾아오시는 길":()=>'<p class="p-lead">GIST 오룡동 캠퍼스로 오시는 길입니다.</p><div class="way"><div class="way-c"><span class="eyebrow">Address</span><b>(우)61005 전남광주통합특별시 북구 첨단과기로 123 (오룡동)</b><span>대표전화 <b class="num">062-715-2114</b> · 팩스 <b class="num">062-715-2300</b></span></div><div class="way-c"><span class="eyebrow">Map</span><b>지도·교통편은 현행 ‘오시는 길’ 화면에서</b><a class="p-pill dark" href="'+PURL["찾아오시는 길"]+'"'+EXT+'>오시는 길 보기 <i data-lucide="arrow-up-right"></i></a></div></div>'
};

/* 현행 홈페이지에서 옮긴 실제 내용(2026.11.10. 확인) */
const LABS=[["차세대에너지연구소","https://rise.gist.ac.kr/","flask-conical"],["한국문화기술연구소","https://kct.gist.ac.kr/kct/","clapperboard"],["생명의과학융합연구소","https://iibr.gist.ac.kr/iibr/","heart-handshake"],["국제환경연구소","https://ieri.gist.ac.kr/","globe"],["인공지능연구소","https://giai.gist.ac.kr/giai/","sparkles"],["중앙기기연구소","https://gaia.gist.ac.kr/","monitor"],["실험동물자원센터","https://larc.gist.ac.kr/","building-2"],["첨단AI반도체팹센터","https://angels.gist.ac.kr/angels/","box"]];
function labsHTML(only){const L=only?LABS.filter(x=>only.test(x[0])):LABS;return '<div class="labs">'+L.map((x,i)=>'<a class="lab" href="'+x[1]+'"'+EXT+'><span class="lab-n num">'+String(LABS.indexOf(x)+1).padStart(2,"0")+'</span><i data-lucide="'+x[2]+'"></i><b>'+esc(x[0])+'</b><span class="lab-u">'+esc(x[1].replace(/^https:\/\//,"").replace(/\/$/,""))+'</span><span class="lab-go">홈페이지 <i data-lucide="arrow-up-right"></i></span></a>').join("")+'</div>'+(typeof ORGDIR!=="undefined"?'<h3 class="p-h3">연구소·센터 담당 연락처 <small>현행 직원검색</small></h3><div class="sk-cards">'+L.map(x=>{const R=ORGDIR.filter(r=>r[0]===x[0]);if(!R.length)return "";const h=R.find(r=>/(소장|센터장|원장)/.test(r[2]))||R[0];return '<button type="button" class="sk-card" data-od="'+esc(x[0])+'"><span class="sk-k">업무 '+R.length+'건</span><b>'+esc(x[0])+'</b><p>'+esc(h[2])+' · T.'+esc(h[1])+'</p><span class="sk-go">업무·내선 모두 보기 →</span></button>';}).join("")+'</div>':'')+'<p class="note">출처: 현행 GIST 홈페이지 ‘연구소·센터’ 8곳 (2026.11.10. 확인) · 연락처는 직원검색 (2026.11.11. 확인)</p>';}

const HIST=[["2025", [["02.21", "2024학년도 학위수여식 (박사 2,023명, 석사 5,195명, 학사 1,439명 배출(누적))"], ["05.08", "환경에너지공학과 AI 순환경제 특성화대학원 선정"], ["05.09", "고등광기술연구원(APRI) 공식 승격 개원식 및 비전선포식"], ["08.14", "2025년 하반기 학위수여식 (박사 2,095명, 석사 5,271명, 학사 1,492명 배출(누적))"], ["11.01", "뇌질환 조기진단을 위한 AI+나노융합 AI-ACE InnoCORE 연구단 개소"], ["11.13", "고정주 커뮤니티라운지 개관"], ["11.14", "설립 제32주년 기념식 및 정문 여의문(如意門) 준공"], ["12.01", "IBS 마이크로바이옴-체-뇌 생리학 연구단 출범"]]], ["2024", [["02.16", "2023학년도 학위수여식 (박사 1,891명, 석사 5,023명, 학사 1,264명 배출(누적))"], ["04.24", "대외협력(나눔) 비전 선포식"], ["06.05", "‘교수 1인당 논문 피인용수’ 세계 4위 (QS세계대학평가, 17년 연속 국내 1위)"], ["07.12", "AI정책전략대학원 개원식"], ["09.01", "IBS 양자변환 연구단 출범"], ["09.26", "IRC AI 기반 중대분자 연구센터 개소"], ["12.16", "IBS 상대론적 레이저과학 연구단 출범"]]], ["2023", [["01.30", "자연과학동 준공"], ["02.17", "2022학년도 학위수여식 [졸업생 누계: 7,724명(학사 1,126명, 석사 4,819명, 박사 1,779명)]"], ["07.07", "제9대 총장 취임"], ["11.16", "설립 제30주년 기념식 및 비전선포식"], ["12.18", "매일경제 2023 대한민국 창업우수대학 창업성과 부문 1위"]]], ["2022", [["02.18", "2021학년도 학위수여식 [졸업생 누계: 7,284명(학사 987명, 석사 4,645명, 박사 1,652명)]"], ["10.26", "HPC-AI 공용인프라 데이터센터 개소"], ["12.21", "오룡아트홀 개관"]]], ["2021", [["02.19", "2020학년도 학위수여식 [졸업생 누계: 총 6,813명(학사 820명, 석사 4,462명, 박사 1,531명)]"], ["04.16", "사회공헌단 피움(PIUM) 발족"], ["08.20", "GIST-MIT AI국제협력연구 시작"]]], ["2020", [["03.27", "연구부총장 신설"], ["06.10", "‘교수 1인당 논문 피인용수’ 세계 4위 (QS세계대학평가)"], ["07.07", "교육혁신센터 설립"], ["07.10", "산학협력연구관 준공"], ["09.29", "FLEX 에너지 융합대학원 설립"]]], ["2019", [["02.15", "2018학년도 학위수여식 [졸업생 누계: 총 5,903명(학사 523명, 석사 4,085명, 박사 1,295명)]"], ["03.06", "제8대 총장 취임"], ["06.16", "한국경제 이공계대학평가 ‘교수 1인당 기술이전수입’ 4년 연속 국내 1위"], ["10.11", "AI대학원 설치"]]], ["2018", [["06.07", "‘교수 1인당 논문 피인용수’ 세계 3위 (QS세계대학평가): 4년 연속 세계 Top3, 11년 연속 국내 1위"]]], ["2016", [["02.25", "2015학년도 학위수여식(1000호 박사 배출)"], ["06.30", "GIST 발전재단 설립"]]], ["2015", [["02.25", "제7대 총장 취임"], ["04.06", "중앙도서관 개관"], ["09.14", "‘교수 1인당 논문 피인용 수’ 세계 2위(QS 세계대학평가)"], ["10.29", "융합기술원 설립"]]], ["2014", [["02.25", "2013학년도 학위수여식(제1회 학사 졸업생 54명 배출)"]]], ["2013", [["06.10", "한국문화기술연구소 개소"], ["11.15", "설립 20주년 기념식"]]], ["2012", [["06.04", "제6대 총장 취임"], ["12.01", "IBS 초강력레이저과학연구단 운영"]]], ["2011", [["05.16", "국제과학비즈니스벨트 연구단 광주 유치(GIST 캠퍼스)"]]], ["2010", [["03.02", "2010학년도 입학식(제1회 학사과정 100명 입학)"]]], ["2009", [["02.25", "솔라에너지연구소(現 차세대에너지연구소) 개소"]]], ["2008", [["06.04", "제5대 총장 취임"], ["06.13", "학사과정 설립 인가(법률 제9107호)"]]], ["2007", [["12.14", "오룡관 준공"]]], ["2006", [["02.16", "제4대 원장 취임"]]], ["2005", [["03.30", "광주·전남 산업기술지원단 창단"], ["04.11", "과학기술응용연구소 개소"]]], ["2004", [["03.26", "기관 영문명 변경(K-JIST → GIST)"]]], ["2003", [["11.14", "설립 10주년 기념식"]]], ["2002", [["02.16", "제3대 원장 취임"]]], ["2001", [["05.09", "고등광기술연구소 개소"]]], ["2000", [["05.17", "유엔대학과 학술교류 협정 체결"], ["08.22", "2000년 하반기 학위수여식(제1호 박사 배출)"], ["12.14", "창업보육센터 개소"]]], ["1998", [["01.22", "제2대 원장 취임"]]], ["1997", [["02.27", "1996학년도 학위수여식(제1회, 석사 92명)"], ["03.04", "제1회 박사과정 입학식"], ["06.12", "LG과학도서관 준공"]]], ["1995", [["03.09", "개원식 및 1995학년도 입학식(제1회, 석사과정 113명)"]]], ["1993", [["08.05", "광주과학기술원법 제정·공포(법률 제4580호)"], ["10.06", "광주과학기술원법 시행령 제정·공포(대통령령 제13988호)"], ["10.11", "초대원장 취임 및 기공식 거행"], ["11.17", "광주과학기술원 법인설립 등기(설립기념일)"]]], ["1992", [["03.26", "광주과학기술원 설립추진단 구성"]]], ["1991", [["10.17", "광주과학기술원 설립추진위원회 구성"]]]];
function histHTML(){const eras=[["2020","2020년대"],["2010","2010년대"],["2000","2000년대"],["1990","1990년대"]];
 return '<div class="hist"><div class="hist-tabs" role="tablist" aria-label="연대">'+eras.map((e,i)=>'<button type="button" role="tab" id="ht'+e[0]+'" aria-controls="hp'+e[0]+'" aria-selected="'+(i?'false':'true')+'" tabindex="'+(i?'-1':'0')+'" data-era="'+e[0]+'"><b class="num">'+e[0]+'s</b><span>'+e[1]+'</span></button>').join("")+'</div>'+eras.map((e,i)=>'<div class="hist-p" role="tabpanel" id="hp'+e[0]+'" aria-labelledby="ht'+e[0]+'"'+(i?' hidden':'')+'>'+HIST.filter(h=>h[0].slice(0,3)===e[0].slice(0,3)).map(h=>'<div class="hy"><b class="hy-y num">'+h[0]+'</b><ul>'+h[1].map(x=>'<li><span class="num">'+x[0]+'</span><p>'+esc(x[1])+'</p></li>').join("")+'</ul></div>').join("")+'</div>').join("")+'</div><p class="note">출처: 현행 GIST 홈페이지 ‘연혁’ (2026.11.10. 확인). 시안에서는 인물 이름을 빼고 직위만 적었습니다.</p>';}
document.addEventListener("click",e=>{const b=e.target.closest(".hist-tabs button");if(!b)return;$$(".hist-tabs button").forEach(x=>{const on=x===b;x.setAttribute("aria-selected",on);x.tabIndex=on?0:-1;document.getElementById("hp"+x.dataset.era).hidden=!on;});});
document.addEventListener("keydown",e=>{const b=e.target.closest&&e.target.closest(".hist-tabs button");if(!b||!["ArrowLeft","ArrowRight"].includes(e.key))return;const all=$$(".hist-tabs button");let i=all.indexOf(b)+(e.key==="ArrowRight"?1:-1);i=(i+all.length)%all.length;all[i].focus();all[i].click();e.preventDefault();});
PBODY["캠퍼스 투어"]=()=>'<p class="p-lead">중·고교 과학동아리와 기관·단체를 위한 GIST 견학 프로그램입니다.</p><div class="tour-s">'+[["견학신청서 접수","이메일, 홈페이지"],["담당부서 협의","견학 가능 여부, 일정, 설명자"],["확정 통보","가능 여부 회신 및 일정 확정"],["견학 실시","기관 소개 · 홍보영상 · 캠퍼스 투어"]].map((x,i)=>'<div class="ts"><span class="num">STEP 0'+(i+1)+'</span><b>'+x[0]+'</b><p>'+x[1]+'</p></div>').join("")+'</div><h3 class="p-h3">견학 인원 안내</h3><div class="tbl-w" tabindex="0" role="region" aria-label="견학 인원 표"><table class="tbl"><thead><tr><th scope="col">대상</th><th scope="col">담당부서</th><th scope="col">인원</th><th scope="col">운영</th></tr></thead><tbody><tr><th scope="row">초·중·일반인</th><td>대외협력팀</td><td>15인 이상 40인 미만</td><td>금요일 1회 (오후 1시)</td></tr><tr><th scope="row">고등학생 단체</th><td>입학사정관팀</td><td>10인 이상 100인 미만<br>(입학설명회 신청 시에 한함)</td><td>평일 중 신청 시 (수시·정시전형 기간 제외)</td></tr></tbody></table></div><h3 class="p-h3">견학 일정</h3><div class="tbl-w" tabindex="0" role="region" aria-label="견학 일정 표"><table class="tbl"><thead><tr><th scope="col">순서</th><th scope="col">초·중·일반인</th><th scope="col">고등학생</th></tr></thead><tbody><tr><th scope="row">기관 소개 (고등학생은 입시설명회)</th><td>20분 · GIST홍보관</td><td>20분 · GIST대학</td></tr><tr><th scope="row">홍보동영상·방송매체 홍보자료 시청</th><td>10분</td><td>20분</td></tr><tr><th scope="row">원내 견학</th><td>30분 · 연구시설</td><td>40~60분 · 대학시설, 연구시설</td></tr></tbody></table></div><p class="note">방문시설은 변경될 수 있음 · 연구시설: 고등광기술연구소, 차세대에너지연구소 홍보관 · 대학시설: 중앙도서관, 제2학생회관, 기숙사</p><div class="way" style="margin-top:16px"><div class="way-c"><span class="eyebrow">초·중·일반인</span><b>대외협력팀</b><span>Tel <b class="num">062-715-2023</b> · Fax <b class="num">062-715-2029</b></span></div><div class="way-c"><span class="eyebrow">고등학생</span><b>입학사정관팀</b><span>Tel <b class="num">062-715-2957</b> · 입학 홈페이지 ‘Open GIST College’에서 신청</span><a class="p-pill dark" href="https://www.gist.ac.kr/uadm/html/sub04/0404.html"'+EXT+'>신청하러 가기 <i data-lucide="arrow-up-right"></i></a></div></div><p class="note">출처: 현행 GIST 홈페이지 ‘견학신청 및 안내’ (2026.11.10. 확인)</p>';
const ORY=[["1층","네트워크 강의실 (101)","109석"],["1층","강의실-A (103)","62석"],["1층","다목적홀 (112)","180석"],["1·2층","대강당 (112+208)","715석"],["2층","다산홀 (208)","535석"],["2층","회의실-A (203)","14석"],["2층","강의실 B+C (201+202)","112석"],["3층","강의실-H (303)","274석"],["옥외","노천극장","198석"]];
PBODY["오룡관 예약"]=()=>'<p class="p-lead">학술행사·공식행사·학생 행사를 위한 문화예술과 학술의 공간입니다.</p><div class="ory"><div class="ory-n"><span class="eyebrow">최대</span><b class="num">715</b><span>석 · 대강당</span></div><div class="ory-n"><span class="eyebrow">기본 시설</span><b class="num">'+ORY.length+'</b><span>곳 (주요 공간)</span></div><div class="ory-n go"><span class="eyebrow">예약</span><b>오룡관 예약시스템</b><a class="p-pill" href="https://oryong.gist.ac.kr/"'+EXT+'>예약하기 <i data-lucide="arrow-up-right"></i></a></div></div><h3 class="p-h3">주요 시설</h3><div class="tbl-w" tabindex="0" role="region" aria-label="오룡관 시설 표"><table class="tbl"><thead><tr><th scope="col">층</th><th scope="col">실 명 (호수)</th><th scope="col">좌석</th></tr></thead><tbody>'+ORY.map(r=>'<tr><td>'+r[0]+'</td><th scope="row">'+r[1]+'</th><td class="num">'+r[2]+'</td></tr>').join("")+'</tbody></table></div><h3 class="p-h3">내부 구성원 할인</h3><div class="disc">'+[["100%","입학식, 졸업식 등 기관 공식 행사"],["40%","학과·연구소·센터가 외부단체와 공동주최"],["30%","내부 구성원 개인이 학회 등 행사 유치"],["50%","내부 구성원의 결혼식"]].map(x=>'<div><b class="num">'+x[0]+'</b><span>'+x[1]+'</span></div>').join("")+'</div><p class="note">임대 기준 시간 09:00~21:00 · 시간대별 임대료·장비 사용료는 현행 화면에서 확인 · 출처: 현행 GIST 홈페이지 ‘행사시설(오룡관)’ (2026.11.10. 확인)</p>';

const GIST4=[["G","Global Asset","글로벌 지식자산 창출","인류의 난제를 푸는 연구개발, 울림과 감동이 있는 연구개발 활동"],["I","Insight for Innovation","통찰이 담긴 기술혁신","자연과학과 인문사회과학의 학제적·융합적 사고를 접목해 창의와 혁신의 동력 배양"],["S","Solution 4 Securities","국가적 위기 극복의 해결책","기후·환경(Ecology), 경제(Economy), 보건의료(Emergency), 에너지(Energy) 안보 실현에 기여"],["T","Tolerance for Trust","배려와 신뢰의 조직문화","창업에 힘쓰고 혁신 생태계에 연구성과를 공급해 지역사회 경제에 이바지"]];
function gist4HTML(){return '<div class="g4">'+GIST4.map(x=>'<div class="g4c"><b class="g4l" aria-hidden="true">'+x[0]+'</b><span class="eyebrow">'+x[1]+'</span><h4>'+x[2]+'</h4><p>'+x[3]+'</p></div>').join("")+'</div>';}
PBODY["총장 인사말"]=()=>'<div class="greet"><p class="greet-q">혁신,<br><b>길이 없으면 우리가 만든다!</b></p><div class="greet-t"><p>과학 기술 입국의 국가적 목표, 그리고 지역민의 기대와 희망에 힘입어 GIST가 닻을 올린 후 어느덧 30주년을 앞두고 있습니다. 이 땅에 뿌리를 내린 후 서른 해가 되었다는 것은 그 감회가 남다릅니다. 다시 한 세대가 시작된다는 숭엄한 의미가 담겨있기 때문입니다.</p><p>이러한 의미에서 GIST가 지향할 가치와 목표를 다시 새겨 봅니다. GIST는 국가의 부름과 여망에 부응하는 연구중심 대학으로서 책임있는 연구와 혁신을 지향하며, 과학기술·경제·사회 발전에 적극 기여하는 책무를 구현하겠습니다.</p></div></div><h3 class="p-h3">GIST의 4대 책무</h3>'+gist4HTML()+'<div class="greet-e"><p>이러한 4대 책무의 실행을 엄중히 약속드리면서 저희는 접었던 날개를 다시 한번 힘차게 저어 비상하겠습니다. 감사합니다.</p><b>GIST 총장</b></div><div class="slot sm"><b>총장 사진·서명</b><p>인물 사진은 시안에 넣지 않았습니다. 실제 구축 때 대외협력처 원본을 씁니다.</p></div><p class="note">출처: 현행 GIST 홈페이지 ‘인사말’ (2026.11.10. 확인)</p>';
PBODY["학생기구"]=()=>'<p class="p-lead">자치활동과 동아리 활동으로 협동정신과 지도자의 소양을 기르도록 지원합니다.</p><div class="org3">'+[["대학원총학생회","users","대학원생(석사·박사·통합)의 권익향상을 위한 자치회. 학칙에 의거해 설립된 공식 조직으로 대학원과정 학생 전체를 대표합니다.","총 23명 · 총학생회장 1, 부총학생회장 1, 학과별 대표·부대표"],["생활관운영 자치위원회","bed-double","생활관 학생들의 복지와 편의를 위해 활동하며, 학생들의 이해와 요구를 대변합니다.","총 12명 · 위원장 1, 학과별 1명 이상"],["기혼자아파트운영 자치위원회","home","기혼자아파트 입주민(학생, 기타 연구원 외)의 복지와 편의를 위해 활동합니다.","총 5명 · 위원장 1 포함 학과별 1명"]].map(x=>'<div class="oc"><i data-lucide="'+x[1]+'"></i><b>'+x[0]+'</b><p>'+x[2]+'</p><span>'+x[3]+'</span></div>').join("")+'</div><p class="note">석·박사·통합 과정 자치기구 기준. 학사과정 자치기구는 <a href="'+GS+'sub05/05040102.html"'+EXT+'>현행 화면</a>에서 볼 수 있습니다. 출처: 현행 GIST 홈페이지 ‘자치기구’ (2026.11.10. 확인)</p>';

PBODY["생활관"]=()=>'<p class="p-lead">전문지식·창의력과 함께 사는 공동체 의식을 기르는 생활관입니다.</p><nav class="subtab" aria-label="생활관 종류"><a href="'+GS+'sub05/05030403.html"'+EXT+'>대학생활관</a><a href="'+GS+'sub05/05030404.html"'+EXT+'>영사이언티스트빌딩(YSB)</a><span aria-current="page">대학원생활관</span><a href="'+GS+'sub05/05030402.html"'+EXT+'>기혼자아파트</a></nav><div class="ory"><div class="ory-n"><span class="eyebrow">대학원생활관</span><b class="num">9</b><span>개 동</span></div><div class="ory-n"><span class="eyebrow">수용 가능 인원</span><b class="num">1,162</b><span>명 (2025.09.01. 기준)</span></div><div class="ory-n go"><span class="eyebrow">둘러보기</span><b>대학원 기숙사 360° 보기</b><a class="p-pill" href="https://www.gist.ac.kr/cyber/index.html?param=W7"'+EXT+'>살펴보기 <i data-lucide="arrow-up-right"></i></a></div></div><h3 class="p-h3">시설과 지급품</h3><div class="dorm"><div class="dc"><b>시설</b><ul><li><span>관리실</span>2실 (1동·9동 1층)</li><li><span>공부방</span>1실 (8동 6층)</li><li><span>세면장·샤워실</span>1~7동 각층 / 8~9동 호실 내</li><li><span>세탁실</span>셀프 4실 · 유료 1실</li></ul></div><div class="dc"><b>개인별 지급품</b><div class="dchips">'+["책상·의자","책꽂이","침대","옷장","신발장(1실 1개)","매트리스","번호키","에어컨(1실 1개)"].map(x=>'<span>'+x+'</span>').join("")+'</div></div></div><h3 class="p-h3">입사 원칙과 절차</h3><div class="dorm"><div class="dc"><b>입사 원칙</b><p>국비재학생으로 석사과정은 2년차, 박사과정은 4년차까지 입사를 원칙으로 합니다. 수용능력에 따라 입사를 제한할 수 있고, 연차 초과자·일반장학생도 추가로 입사할 수 있습니다.</p></div><div class="dc"><b>절차</b><small class="fl-l">입사</small><ol class="flow"><li>입사원서 제출</li><li>심사 및 실 배정</li><li>입사</li></ol><small class="fl-l">퇴사</small><ol class="flow"><li>퇴사원서 제출</li><li>지급·대출 물품 반납 확인</li><li>퇴사 허가</li></ol></div></div><h3 class="p-h3">사용할 수 없는 제품</h3><div class="ban">'+[["난방기기","전기담요, 전기장판, 팬히터"],["취사기기","버너, 쿠커, 커피포트, 토스터, 프라이팬, 전자레인지, 에어프라이어"]].map(x=>'<div><i data-lucide="minus"></i><b>'+x[0]+'</b><span>'+x[1]+'</span></div>').join("")+'</div><p class="note">음향·조명기기, 선풍기·헤어드라이어·컴퓨터·냉장고(100ℓ 이하 1실 1개)는 사용 가능 · 전기코드는 형식승인품만 · 문의: 학생팀 T.3602, 관리실 T.2800 · 출처: 현행 GIST 홈페이지 ‘대학원생활관’ (2026.11.10. 확인)</p>';

/* 바로가기 모음: 현행 홈페이지 메뉴에 실제로 걸린 주소만(2026.11.10. 확인) */
const PLINK={
"경영공시":["공공기관 경영정보와 대학 정보를 공개하는 곳으로 바로 갑니다.",[["ALIO 경영정보 공개","공공기관 경영정보 공개시스템의 GIST 화면","https://alio.go.kr/organ/organDisclosureDtl.do?apbaId=C0018","landmark"],["대학알리미","대학 정보공시 GIST 화면","https://www.academyinfo.go.kr/popup/pubinfo1690/list.do?schlId=0000381","graduation-cap"],["정보공개 청구","정보공개포털","http://www.open.go.kr/com/login/memberLogin.do","file-text"],["정보공개 안내","현행 GIST 홈페이지 정보공개 메뉴","https://www.gist.ac.kr/kr/html/sub08/080101.html","info"]]],
"규정":["GIST의 규정·규칙·지침은 원규 시스템에서 찾습니다.",[["GIST 원규 시스템","규정·규칙·지침 전문과 개정 이력","https://law.gist.ac.kr/lmxsrv/main/main.do","scale"]]],
"3D 캠퍼스맵":["캠퍼스 건물과 시설을 화면으로 둘러봅니다.",[["사이버 캠퍼스 투어","현행 홈페이지 ‘Campus Tour’","https://www.gist.ac.kr/cyber/","map"],["찾아오시는 길","주소·대표전화와 교통편","https://www.gist.ac.kr/kr/html/sub01/010305.html","map-pin"]]],
"포털·ZEUS":["교직원·학생이 매일 쓰는 업무 시스템입니다.",[["GIST 포털","통합 로그인","https://portal.gist.ac.kr/","log-in"],["ZEUS","연구·행정 업무 시스템","https://zeus.gist.ac.kr/sys/main/login.do","layout-grid"],["그룹웨어","전자결재·게시판","https://ngw.gist.ac.kr/","messages-square"],["웹메일","GIST 메일","https://mail.gist.ac.kr/","mail"]]],
"입학 전형":["학사과정(대학) 입학은 입학 홈페이지에서 안내합니다.",[["GIST 대학 입학","전형·모집요강·입학상담","https://www.gist.ac.kr/uadm/main.html","graduation-cap"],["Open GIST College","고등학생 단체 견학·입학설명회 신청","https://www.gist.ac.kr/uadm/html/sub04/0404.html","users"]]],
"전형 안내":["대학원(석사·박사·통합) 입학은 대학원 입학 홈페이지에서 안내합니다.",[["GIST 대학원 입학","전형 일정·모집요강·외국인 입학","https://www.gist.ac.kr/gadm/","graduation-cap"]]],
"창업 지원":["기술사업화와 창업을 돕는 곳입니다.",[["GIST홀딩스","GIST 기술지주회사","https://gistholdings.com/","rocket"]]],
"유튜브":["GIST 공식 유튜브 채널입니다.",[["GIST YouTube","공식 채널","https://www.youtube.com/c/GIST_YOUTUBE","youtube"]]],
"인스타그램":["GIST 공식 인스타그램입니다.",[["@gist.ac.kr","공식 계정","https://www.instagram.com/gist.ac.kr/","instagram"]]],
"안전 안내":["연구실·캠퍼스 안전 관련 시스템입니다.",[["GIST 안전 사이트","현행 홈페이지 하단 ‘안전’ 바로가기","http://safety.gist.ac.kr/ushm/main/home.do","info"]]]
};
PLINK["모집 요강"]=PLINK["입학 상담"]=PLINK["입학 전형"];PLINK["외국인 입학"]=PLINK["전형 안내"];
function hubHTML(n){const h=PLINK[n];return '<p class="p-lead">'+esc(h[0])+'</p><div class="hub">'+h[1].map(x=>'<a class="hb" href="'+x[2]+'"'+(/^https?:/.test(x[2])?EXT:'')+'><i data-lucide="'+x[3]+'"></i><b>'+esc(x[0])+'</b><span>'+esc(x[1])+'</span><em>'+esc(/^#/.test(x[2])?"D안 안에서 이동":/^tel:/.test(x[2])?"전화 걸기":x[2].replace(/^https?:\/\//,"").split("/")[0])+' <i data-lucide="arrow-up-right"></i></em></a>').join("")+'</div><p class="note">현행 GIST 홈페이지에 걸려 있는 주소만 모았습니다 (2026.11.10. 확인). 실제 구축 때 담당 부서 확인 후 확정합니다.</p>';}
Object.keys(PLINK).forEach(n=>{if(!PBODY[n])PBODY[n]=()=>hubHTML(n);});

function vidHTML(lead,noShorts){const V=SNS.filter(x=>x.p==="yt"&&!(noShorts&&/shorts/.test(x.u)));const bi=Math.max(0,V.findIndex(x=>x.img&&!/shorts/.test(x.u)));return '<p class="p-lead">'+lead+'</p><div class="vg">'+V.map((x,i)=>'<a class="vc'+(i===bi?' big':'')+'" href="'+x.u+'"'+EXT+'><span class="vt'+(x.img?'':' noimg')+'"'+(x.img?' style="background-image:url('+x.img+')"':'')+'>'+(x.img?'':'<span class="vn" aria-hidden="true">GIST<small>YouTube</small></span>')+'<span class="vp" aria-hidden="true">'+YTI+'</span>'+(/shorts/.test(x.u)?'<span class="vs">Shorts</span>':'')+'</span><b>'+esc(x.t)+'</b><span class="vd num">2026.'+esc(x.d)+'</span></a>').join("")+'</div><div class="vbar"><span>더 많은 영상은 공식 채널에서</span><a class="p-pill dark" href="https://www.youtube.com/c/GIST_YOUTUBE"'+EXT+'>GIST YouTube <i data-lucide="arrow-up-right"></i></a></div><p class="note">GIST 공식 유튜브 최근 영상 '+V.length+'편'+(noShorts?' (Shorts 제외)':'')+' (2026.11.10. 확인) · 관리자 모드의 소식 목록과 같은 자료를 씁니다.</p>';}
PBODY["홍보 영상"]=()=>vidHTML("GIST의 연구·사람·캠퍼스를 담은 긴 영상입니다. 짧은 영상(Shorts)은 「유튜브」에서 볼 수 있습니다.",true);
PBODY["유튜브"]=()=>vidHTML("GIST 공식 유튜브 채널의 최근 영상입니다. 짧은 영상(Shorts)까지 모두 보입니다.");

const ORG=[["교학부총장",[["대학지원실"],["AI대학",["AI학과","AX학과","전기전자컴퓨터공학과","반도체공학과","AI정책전략대학원"]],["자연과학대학",["물리·광과학과","화학과","수리과학과"]],["공과대학",["신소재공학과","기계로봇공학과","환경·에너지공학과"]],["생명·의과학융합대학",["생명과학과","의생명공학과","융합신경생리학과"]],["인문사회과학부",["도전탐색과정"]],["융합기술원",["에너지융합대학원"]],["기술경영전문대학원"],["반도체융합기술원",["반도체특성화대학원","반도체설계아카데미"]],["언어교육원"],["교무처",["교무팀","학적팀"]],["기획처",["기획조정실 (기획팀·예산팀·경영혁신팀)"]],["입학학생처",["학생팀","입학팀","상담센터"]],["행정안전처",["총무팀","인사팀","재무팀","계약팀","시설안전실 (건설팀·시설운영팀·안전팀)"]],["학술정보처",["학술정보팀","정보운영팀","정보보안팀","슈퍼컴퓨팅센터"]],["법무실"],["인권센터"]]],
["연구부총장",[["R&D혁신기획본부"],["연구처",["연구관리팀","연구지원팀","실험동물자원센터"]],["창업혁신진흥원",["창업혁신전략센터","창업진흥센터","기술사업화센터"]],["고등광기술연구원",["미래우주국방융합연구본부","광기반원천연구부","광응용시스템연구부","초강력레이저연구부","경영지원실"]],["연구소",["차세대에너지연구소","한국문화기술연구소","생명의과학융합연구소","국제환경연구소","인공지능연구소","중앙기기연구소 (첨단분석센터·첨단AI반도체팹센터)"]],["노벨연구센터"]]],
["대외부총장",[["GIST 아카데미"],["대외협력처",["글로벌협력실","대외홍보팀","발전기금팀"]]]]];
PBODY["조직도"]=()=>'<p class="p-lead">이사회와 총장 아래 3개 부총장 체계로 운영합니다.</p><div class="orgt"><div class="ot-top"><span class="ot-n">이사회</span><span class="ot-n">감사 · 감사부</span></div><div class="ot-pres"><b>총장</b><span>미래전략실</span></div><div class="ot-vp">'+ORG.map((v,vi)=>'<section class="ot-c"><h4>'+v[0]+'</h4><ul>'+v[1].map(u=>'<li>'+(u[1]?'<details'+(vi===0&&u[0]==="공과대학"?' open':'')+'><summary>'+esc(u[0])+'<em class="num">'+u[1].length+'</em></summary><ul>'+u[1].map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul></details>':'<span>'+esc(u[0])+'</span>')+'</li>').join("")+'</ul></section>').join("")+'</div></div><p class="note">항목을 누르면 아래 조직이 펼쳐집니다 · 출처: 현행 GIST 홈페이지 ‘조직도’ (2026.11.10. 확인)</p>';
const DIR=[["증명서 자동발급기 오류","학적팀","2055"],["생활관(대학원) 입사·생활","학생팀","3602"],["생활관 관리실(대학원)","관리실","2800"],["학생활동 홍보물 게시 승인","학생팀","3605"],["행정부서·외부단체 홍보물 게시 승인","총무팀","2918"],["초·중·일반인 견학","대외협력팀","2023"],["고등학생 단체 견학","입학사정관팀","2957"],["연구수탁 현황","연구관리팀","2033"],["교수 SCI 논문 현황","교무팀","2043"],["지식재산권 출원·등록","GTI","3477"],["건축공사","시설운영팀","2146"],["출입문·천정·바닥 보수, 도장 (영선)","시설운영팀","2145"],["조경·청소","시설운영팀","2199"],["체육시설 이용","시설운영팀","2169"],["냉난방·급수·소방·가스 (기계설비)","시설운영팀","2157 / 2158"],["형광등·전등·콘센트 (전기설비)","시설운영팀","2155 / 2156"],["전화 설치·보수","시설운영팀","2076"],["회의실 음향시설","시설운영팀","2160"]];
PBODY["업무별 담당부서"]=()=>{const depts=[...new Set(ORGDIR.map(r=>r[0]))];const CH=["증명서","생활관","홍보물","견학","연구과제","SCI","지식재산","시설","전기","냉난방","체육시설","장학금","법인카드","출장"];
 return '<p class="p-lead">현행 GIST 홈페이지 ‘조직/직원안내 › 직원검색’에 있는 부서·담당 업무·내선번호 <b class="num">'+ORGDIR.length+'</b>건을 그대로 옮겼습니다. 업무나 부서 이름, 내선번호로 찾으세요.</p><form class="dir-s" role="search" onsubmit="return false"><label class="sr" for="dirq">업무·부서·내선 찾기</label><i data-lucide="search"></i><input id="dirq" type="search" placeholder="예: 증명서, 재무팀, 2836"><label class="sr" for="dird">부서 고르기</label><select id="dird"><option value="">전체 부서 ('+depts.length+')</option>'+depts.map(d=>'<option>'+esc(d)+'</option>').join("")+'</select><span class="num" id="dirn"></span></form><div class="dir-ch" aria-label="자주 찾는 업무">'+CH.map(c=>'<button type="button" class="chip" data-dq="'+esc(c)+'">'+esc(c)+'</button>').join("")+'</div><ul class="dir" id="dirl"></ul><p class="bd-none" id="dirx" hidden>맞는 업무가 없습니다. 대표전화 062-715-2114로 문의해 주세요.</p><p class="note">출처: 현행 GIST 홈페이지 ‘조직/직원안내 › 직원검색’ (2026.11.11. 확인). 현행과 같이 직원 이름은 싣지 않고, 전화는 062-715-내선으로 겁니다. <a href="https://www.gist.ac.kr/kr/html/sub01/010602.html"'+EXT+'>현행 직원검색 ↗</a></p>';};
function dirRender(){const L=$("#dirl");if(!L)return;const q=($("#dirq").value||"").trim().replace(/\s+/g,"");const d=$("#dird").value;let R=ORGDIR.filter(r=>(!d||r[0]===d)&&(!q||(r[0]+r[2]+r[1]).replace(/\s+/g,"").includes(q)));const total=R.length;const show=(q||d)?R:R.slice(0,30);
 L.innerHTML=show.map(r=>'<li><b>'+esc(r[2]||"(업무 미기재)")+'</b><span>'+esc(r[0])+'</span><a class="num" href="tel:062715'+String(r[1]).split(/[\/, ]/)[0]+'">T.'+esc(r[1])+'</a></li>').join("");
 $("#dirn").textContent=(q||d)?total+"건":"전체 "+ORGDIR.length+"건 중 30건";$("#dirx").hidden=total>0;}
document.addEventListener("input",e=>{if(e.target.id==="dirq")dirRender();});
document.addEventListener("change",e=>{if(e.target.id==="dird")dirRender();});
document.addEventListener("click",e=>{const c=e.target.closest("[data-dq]");if(!c)return;const i=$("#dirq");if(i){i.value=c.dataset.dq;dirRender();}});
new MutationObserver(()=>{const L=$("#dirl");if(L&&!L.dataset.r){L.dataset.r=1;dirRender();}}).observe(document.body,{childList:true,subtree:true});
const RS={fund:[["2021",625,130685],["2022",611,131880],["2023",624,109156],["2024",622,111223],["2025",643,122440]],sci:[["2021",203,795,3.92],["2022",205,786,3.83],["2023",206,693,3.36],["2024",210,735,3.50],["2025",204,793,3.89]],t6:[["IT","정보기술",26.6],["NT","나노기술",23.9],["BT","생명공학기술",16.7],["ET","환경기술",10.8],["CT","문화기술",7],["ST","우주항공기술",2.1],["기타","",12.9]],ip:[["2021",257,151],["2022",281,154],["2023",280,133],["2024",258,130],["2025",260,179]]};
function barsHTML(rows,vi,fmt,unit){const mx=Math.max(...rows.map(r=>r[vi]));return '<div class="cbars">'+rows.map((r,i)=>'<div class="cbar'+(i===rows.length-1?' on':'')+'"><span class="cbt"><span class="cbv num">'+fmt(r[vi])+'</span><span class="cbf" style="height:'+(r[vi]/mx*82).toFixed(1)+'%"></span></span><span class="cbl num">'+r[0]+'</span></div>').join("")+'</div>'+(unit?'<p class="cbu">'+unit+'</p>':'');}
const f0=n=>n.toLocaleString("ko-KR");
PBODY["연구 분야"]=()=>{const L=RS.fund[4],S=RS.sci[4];return '<p class="p-lead">숫자로 보는 GIST 연구입니다.</p><div class="kpi"><div><span class="eyebrow">2025 연구수탁</span><b class="num">'+f0(L[2])+'</b><span>백만원 · '+f0(L[1])+'건</span></div><div><span class="eyebrow">2025 SCI 논문</span><b class="num">'+f0(S[2])+'</b><span>편 · 교수 '+S[1]+'명</span></div><div><span class="eyebrow">교수 1인당 SCI</span><b class="num">'+S[3].toFixed(2)+'</b><span>편 (2025)</span></div><div><span class="eyebrow">지식재산권 등록</span><b class="num">'+RS.ip[4][2]+'</b><span>건 (2025, 국내+해외)</span></div></div><div class="rch"><section><h3>연구수탁 금액 <small>최근 5년, 정부+일반</small></h3>'+barsHTML(RS.fund,2,f0,"단위: 백만원 · 담당 연구관리팀(T.2033)")+'</section><section><h3>교수 1인당 SCI 논문 <small>최근 5년</small></h3>'+barsHTML(RS.sci,3,v=>v.toFixed(2),"단위: 편 · JCR 기준, 2020년부터 SCIE 포함 · 담당 교무팀(T.2043)")+'</section></div><h3 class="p-h3">6T 분야별 구성비율</h3><div class="t6">'+RS.t6.map(t=>'<span style="flex:'+t[2]+'" title="'+t[0]+' '+t[2]+'%"></span>').join("")+'</div><ul class="t6l">'+RS.t6.map(t=>'<li><i></i><b>'+t[0]+'</b>'+(t[1]?'<span>'+t[1]+'</span>':'')+'<em class="num">'+t[2]+'%</em></li>').join("")+'</ul><p class="note">출처: 현행 GIST 홈페이지 ‘연구수탁 및 실적’ (2026.11.10. 확인) · 중장기 대형과제 24건 목록은 현행 화면에서 볼 수 있습니다.</p>'+rsStories();};
function rsStories(){const L=STORIES.filter(x=>x.c==="연구성과");const R=L.filter(x=>/^r_/.test(SIMG[STORIES.indexOf(x)]||"")).concat(L).filter((x,i,a)=>a.indexOf(x)===i).slice(0,4);if(!R.length)return "";return '<section class="rs-st" aria-labelledby="rsstt"><h2 id="rsstt">실험실에서 시작한 연구 이야기</h2><p>최근 GIST 연구성과 보도자료입니다. 제목을 누르면 GIST 원문으로 갑니다.</p><div class="rs-g">'+R.map((x,i)=>{const im=sImg(x);return '<a class="rs-c'+(i===0?' big':'')+'" href="'+(x.g||x.u)+'"'+EXT+'><span class="rs-i" style="background-image:url('+im.u+')"></span><span class="rs-b"><span class="eyebrow">연구성과 · '+esc(x.d||'')+'</span><b>'+esc(x.t)+'</b><span class="rs-s">'+esc(x.s||'')+'</span></span></a>';}).join('')+'</div><a class="pill" href="#story">연구성과 더 보기 →</a></section>';}
PBODY["기술이전"]=()=>'<p class="p-lead">연구성과를 지식재산으로 지키고 산업으로 잇습니다.</p><div class="rch one"><section><h3>지식재산권 등록 <small>국내+해외, 최근 5년</small></h3>'+barsHTML(RS.ip,2,f0,"단위: 건")+'</section><section><h3>지식재산권 출원 <small>국내+해외, 최근 5년</small></h3>'+barsHTML(RS.ip,1,f0,"단위: 건 · 담당 GTI(T.3477)")+'</section></div><div class="hub" style="margin-top:20px"><a class="hb" href="https://gti.gist.ac.kr/"'+EXT+'><i data-lucide="lightbulb"></i><b>GTI</b><span>지식재산권 담당 (현행 홈페이지 표기)</span><em>gti.gist.ac.kr <i data-lucide="arrow-up-right"></i></em></a><a class="hb" href="https://gistholdings.com/"'+EXT+'><i data-lucide="rocket"></i><b>GIST홀딩스</b><span>GIST 기술지주회사</span><em>gistholdings.com <i data-lucide="arrow-up-right"></i></em></a></div><h3 class="p-h3">기술이전·기술료 <small>누계, 2026년 3월 기준</small></h3><div class="kpi k3"><div><span class="eyebrow">누적 기술이전 계약</span><b class="num">436</b><span>건</span></div><div><span class="eyebrow">그중 광주·전남·전북</span><b class="num">219</b><span>건 (50.2%)</span></div><div><span class="eyebrow">출자기업</span><b class="num">35</b><span>사 (기술지주 포함)</span></div></div><h3 class="p-h3">연도별 기술이전 수입 <small>단위: 백만 원 · 아래는 건수</small></h3><div class="tt-g" role="img" aria-label="연도별 기술이전 수입: 2021년 925백만 원 15건, 2022년 952백만 원 18건, 2023년 1,356백만 원 24건, 2024년 676백만 원 17건, 2025년 1,761백만 원 16건"><div class="tt-b"><span class="tt-v num">925</span><i style="height:79px"></i><b>2021</b><em>15건</em></div><div class="tt-b"><span class="tt-v num">952</span><i style="height:81px"></i><b>2022</b><em>18건</em></div><div class="tt-b"><span class="tt-v num">1,356</span><i style="height:116px"></i><b>2023</b><em>24건</em></div><div class="tt-b"><span class="tt-v num">676</span><i style="height:58px"></i><b>2024</b><em>17건</em></div><div class="tt-b"><span class="tt-v num">1,761</span><i style="height:150px"></i><b>2025</b><em>16건</em></div></div><p class="note">출처: 「2027학년도 GIST 학사과정 입학전형 안내」 ‘숫자로 보는 GIST’(기술사업화 실적 2026년 3월 기준, 특허 및 기술료 수입 현황) · 2025년 기술이전 수입액 17억 6천만 원과 같음. 첫 화면 ‘누적 기술이전 계약액 621억 원’은 현행 홈페이지 인포그래픽·2024.4. GIST 발표값이고, 이 화면 숫자는 2026.3. 기준 입학전형 안내 값이라 기준 시점이 다름 — 실제 구축 때는 담당 부서가 관리자 모드에서 최신값 하나로 고침 · 지식재산권 그래프 출처: 현행 GIST 홈페이지 ‘연구수탁 및 실적’ (2026.11.10. 확인)</p>';

const SCH1=[["기본장학금 (국비장학)","신입생·재학생 전원","수업료 일부 · 학기 초 자동 면제","수업연한(8학기) 내"],["지스트총장장학금","신입생 중 성적우수자","수업료 전액·기숙사비 면제 + 자기계발비 2,000,000원/학기","유지조건: 직전학기 평점 3.5/4.5 이상 등"],["특별전형장학금","고른기회 전형 입학생","수업료 전액·기숙사비 면제","수업연한(8학기) 내"],["법정장학금","국가유공자 또는 그 자녀 등 법정장학대상자, 북한이탈주민 또는 그 자녀","실 납부 수업료 전액","관련 서류 확인 후"],["생활지원장학금","가계곤란자 중 내부 기준 선발","실 납부 수업료의 70% (721,000원/학기)","선발 전 학사공지"],["성적우수장학금","타 장학금 비수혜 성적우수자 중 내부 기준 선발","실 납부 수업료의 70% (721,000원/학기)","선발 전 학사공지"],["외국인학생장학금","외국인 학부생","수업료 전액","수업연한(8학기) 내"]];
const SCH2=[["교내근로장학금","재학생 중 내부기준 선발","국가근로장학금 기준"],["정착지원금","외국인 학부생","200,000원 (입학 시 1회)"],["기숙사비","총학생회·하우스 자치위원·동아리 연합회장 등","기숙사비 90,000원/월"],["G-SURF 장학금","여름학기 연구과정 선발학생","최소 600,000원/1인"]];
const SCHT='<nav class="subtab" aria-label="장학 종류"><a href="'+GS+'sub05/05020602.html"'+EXT+'>장학안내</a><span aria-current="page">학사과정 교내장학금</span><a href="'+GS+'sub05/05020604.html"'+EXT+'>국가장학금</a><a href="'+GS+'sub05/05020605.html"'+EXT+'>대학원 교내장학금</a><a href="'+GS+'sub05/05020606.html"'+EXT+'>학생지원경비·Stipend</a></nav>';
PBODY["장학 제도"]=()=>'<p class="p-lead">학사과정 학생 전원이 기본장학금을 받고, 성적·형편·전형에 따라 더 받을 수 있습니다.</p>'+SCHT+'<div class="kpi k3"><div><span class="eyebrow">학생 실부담 수업료</span><b class="num">1,030,000</b><span>원/학기 (기본장학금 적용 시)</span></div><div><span class="eyebrow">총장장학생 자기계발비</span><b class="num">2,000,000</b><span>원/학기</span></div><div><span class="eyebrow">지원 기간</span><b class="num">8</b><span>학기 (수업연한)</span></div></div><h3 class="p-h3">등록금 지원 장학</h3><div class="tbl-w" tabindex="0" role="region" aria-label="등록금 지원 장학 표"><table class="tbl"><thead><tr><th scope="col">장학명</th><th scope="col">대상</th><th scope="col">지원</th><th scope="col">비고</th></tr></thead><tbody>'+SCH1.map(r=>'<tr><th scope="row">'+esc(r[0])+'</th><td>'+esc(r[1])+'</td><td>'+esc(r[2])+'</td><td>'+esc(r[3])+'</td></tr>').join("")+'</tbody></table></div><h3 class="p-h3">학업 지원 장학</h3><div class="org3 o4">'+SCH2.map(x=>'<div class="oc"><b>'+esc(x[0])+'</b><p>'+esc(x[1])+'</p><span>'+esc(x[2])+'</span></div>').join("")+'</div><h3 class="p-h3">해외연수·연구 지원</h3><div class="dchips big">'+["UC Berkeley 여름학기 (8주)","Boston University 여름학기 (6주)","University of Cambridge 여름학기 (3-5주)","IIT 테크니온공대 여름학기 (4주)","Study Abroad Program","모빌리티 프로그램 (교환학생)"].map(x=>'<span>'+x+'</span>').join("")+'</div><p class="note">해외 프로그램 담당: 국제교류팀 · 출처: 현행 GIST 홈페이지 ‘(학사과정)교내장학금’ (2026.11.10. 확인). 세부 조건은 반드시 현행 화면과 학사공지를 확인하세요.</p>';
PBODY["등록금"]=()=>'<p class="p-lead">학사과정은 기본장학금(국비장학)으로 수업료 일부가 학기 초에 자동 면제됩니다.</p><div class="kpi k3"><div><span class="eyebrow">학생 실부담 수업료</span><b class="num">1,030,000</b><span>원/학기 · 학사과정</span></div><div><span class="eyebrow">생활지원·성적우수 장학</span><b class="num">70</b><span>% 추가 지원 (721,000원/학기)</span></div><div><span class="eyebrow">재수강료</span><b class="num">50,000</b><span>원 / 신청학점당</span></div></div><h3 class="p-h3">대학원 등록금 <small>2026학년도</small></h3><div class="kpi k3"><div><span class="eyebrow">대학원 입학금</span><b class="num">680,000</b><span>원 · 입학 시</span></div><div><span class="eyebrow">대학원 수업료</span><b class="num">3,805,000</b><span>원/학기 · 국비장학생은 전액 장학금으로 면제</span></div><div><span class="eyebrow">재수강료</span><b class="num">50,000</b><span>원 / 학점당</span></div></div><div class="tbl-w tbl-fitw" tabindex="0" role="region" aria-label="대학원 연차초과료"><table class="tbl tbl-fit"><caption class="sr">대학원 연차초과료</caption><thead><tr><th scope="col">과정(수업연한)</th><th scope="col">연차초과 기간</th><th scope="col">금액</th></tr></thead><tbody><tr><td rowspan="2">석사 (4학기)</td><td>1~2학기</td><td class="num">341,000원</td></tr><tr><td>3학기 이상</td><td class="num">512,000원</td></tr><tr><td rowspan="3">박사 (8학기)</td><td>1~2학기</td><td class="num">170,000원</td></tr><tr><td>3~4학기</td><td class="num">341,000원</td></tr><tr><td>5학기 이상</td><td class="num">512,000원</td></tr><tr><td rowspan="3">통합 (12학기)</td><td>1~2학기</td><td class="num">170,000원</td></tr><tr><td>3~4학기</td><td class="num">341,000원</td></tr><tr><td>5학기 이상</td><td class="num">512,000원</td></tr></tbody></table></div><p class="note">과기원·일반장학생은 수업료를 전액 냅니다. 납부는 ZEUS › 등록에서 고지서를 출력해 개인 가상계좌로 하며, 2026년 1학기 수업료 납부 기간은 2.23.(월)~3.5.(목)이었습니다. 출처: 학사공지 「[공통] 2026학년도 납입금 책정 내역 안내」(2026.1.21.), 「[대학원] 2026년 1학기 납입금 안내」(2026.2.5.). 문의: 학적팀 T.2054</p><p class="note">출처: 현행 GIST 홈페이지 ‘(학사과정)교내장학금’, 학사공지 ‘2026 가을학기 수강신청 안내’ (2026.11.10. 확인)</p>';
PBODY["수강신청"]=()=>'<p class="p-lead">수강신청은 ZEUS 수강신청 사이트에서 합니다. 아래는 가장 최근 공고(2026 가을학기) 기준입니다.</p><div class="vbar" style="margin:0 0 24px"><span>모의 수강신청 → 일반 수강신청 → 수강변경 → 수강신청 취소</span><a class="p-pill dark" href="https://zeus.gist.ac.kr/sys/lecture/lecture_main.do"'+EXT+'>수강신청 사이트 <i data-lucide="arrow-up-right"></i></a></div><div class="tl">'+[["모의 수강신청","8.4.(화) ~ 6.(목)","전체 재학생 · 입력 내용은 종료 후 삭제"],["일반 수강신청","8.11.(화) ~ 15.(토)","전체 재학생 · 첫날 14:00 ~ 마지막 날 23:59"],["우선 수강신청","8.11.(화) 14:00~15:59","대학원 영어 과목, 학사과정 세미나 콜로퀴움"],["신입생","8.24.(월) ~ 26.(수)","대학원 8.24.~25. · 학사과정 8.25.~26."],["수강변경","8.31.(월) ~ 9.9.(수)","첫날 10:00 ~ 마지막 날 23:59"],["수강신청 취소","9.14.(월) ~ 10.12.(월)","마지막 날 18:00까지 · 성적표에 W 표시"]].map((x,i)=>'<div class="tlc'+(i===1?' on':'')+'"><span class="num">'+x[1]+'</span><b>'+x[0]+'</b><p>'+x[2]+'</p></div>').join("")+'</div><h3 class="p-h3">꼭 알아둘 규칙</h3><div class="dorm"><div class="dc"><b>최소 취득학점</b><p>학사과정 <b class="num">11</b>학점 · 대학원과정 <b class="num">9</b>학점. 못 채우면 다음 학기 학자금(조교수당)·급식보조비가 지급되지 않습니다(졸업 직전학기 제외).</p></div><div class="dc"><b>재수강</b><p>C0 이하 과목만 가능, 필수과목 F는 반드시 재수강. 신청학점당 <b class="num">50,000</b>원. 기존 성적표기 방식 그대로.</p></div><div class="dc"><b>폐강</b><p>수강변경 기간 직후 수강인원 3인(학사과정 예·체능 6인) 미만이면 즉시 폐강됩니다. 연구과목은 해당 없음.</p></div><div class="dc"><b>금지 행위</b><p>수강 거래·매매, 매크로 사용은 전과목 수강취소·IP 차단, 2회 이상 적발 시 징계 대상입니다.</p></div></div><h3 class="p-h3">문의</h3><div class="tbl-w" tabindex="0" role="region" aria-label="수강신청 문의 표"><table class="tbl"><thead><tr><th scope="col">내용</th><th scope="col">담당</th><th scope="col">연락처</th></tr></thead><tbody><tr><th scope="row">개설강좌·강의계획서·선수과목·정원</th><td>개설 학부(과)</td><td>해당 단과대학 교학팀</td></tr><tr><th scope="row">언어 교과(영어·한국어)</th><td>언어교육원</td><td class="num">T.6655</td></tr><tr><th scope="row">수강신청 등록·취소</th><td>학적팀</td><td class="num">T.2052</td></tr><tr><th scope="row">시스템 오류·접속</th><td>정보운영팀</td><td class="num">T.2073, 2077</td></tr></tbody></table></div><p class="note">학기마다 일정이 바뀝니다. 다음 학기 일정은 학사공지 게시판 공고를 따르세요 · 출처: 학사공지 ‘2026 가을학기 수강신청 안내’(2026.7.8. 등록, 2026.11.10. 확인)</p>';
PBODY["상담센터"]=()=>'<p class="p-lead">GIST 학생의 마음 건강과 성장을 돕는 상담센터입니다.</p><div class="hub">'+[["상담","messages-square","https://gccdc.gist.ac.kr/gccdc/sub02_01.do","개인 상담 신청"],["심리검사","file-text","https://gccdc.gist.ac.kr/gccdc/sub02_02.do","성격검사 등 심리검사"],["또래상담자","users","https://gccdc.gist.ac.kr/gccdc/sub04_01.do","학생 또래상담"],["프로그램 신청","calendar-check","https://gccdc.gist.ac.kr/gccdc/sub01_03.do","집단상담·원데이클래스"]].map(x=>'<a class="hb" href="'+x[2]+'"'+EXT+'><i data-lucide="'+x[1]+'"></i><b>'+x[0]+'</b><span>'+x[3]+'</span><em>gccdc.gist.ac.kr <i data-lucide="arrow-up-right"></i></em></a>').join("")+'</div><div class="way" style="margin-top:16px"><div class="way-c"><span class="eyebrow">상담센터</span><b>N2 (중앙도서관 뒤편)</b><span>전화 <b class="num">062-715-2983</b></span></div><div class="way-c"><span class="eyebrow">또래상담실</span><b>대학C동 208호 · 예약 없이 방문</b><span>월~목 20~23시 (공휴일·시험기간·방학 제외)</span></div></div><h3 class="p-h3">학교 밖 도움 기관 <small>상담센터 홈페이지 안내</small></h3><div class="dchips big"><a href="http://gmhc.kr/"'+EXT+'>광주광역정신건강복지센터</a><a href="http://www.spckorea.or.kr/index.php"'+EXT+'>중앙자살예방센터</a><a href="https://www.iapc.or.kr/"'+EXT+'>스마트쉼센터</a></div><p class="note">출처: GIST 상담센터 홈페이지 (2026.11.10. 확인)</p>';

Object.assign(PLINK,{
"감사":["감사는 이사회 소속으로, 감사부가 실무를 맡습니다.",[["감사·감사부","현행 홈페이지 조직 안내 화면","https://www.gist.ac.kr/kr/html/sub01/010602.html?post_dvs_cd=0202","scale"],["ALIO 경영정보 공개","공공기관 경영정보 공개시스템의 GIST 화면","https://alio.go.kr/organ/organDisclosureDtl.do?apbaId=C0018","landmark"]]],
"부서별 업무·연락처":["부서를 고르면 현행 홈페이지의 부서별 업무·직원 안내로 이동합니다.",[["교학부총장 소속","교무처·기획처·입학학생처·행정안전처·학술정보처 등","https://www.gist.ac.kr/kr/html/sub01/010602.html?post_dvs_cd=04","building-2"],["연구부총장 소속","연구처·창업혁신진흥원·고등광기술연구원·연구소","https://www.gist.ac.kr/kr/html/sub01/010602.html?post_dvs_cd=06","flask-conical"],["대외부총장 소속","대외협력처·GIST 아카데미","https://www.gist.ac.kr/kr/html/sub01/010602.html?post_dvs_cd=05","globe"],["업무별 담당부서","하고 싶은 일로 찾기 (D안 새 기능)","#p-4-2-2","search"]]],
"부속기관":["현행 홈페이지에 연결된 기관 사이트입니다.",[["고등광기술연구원","APRI","https://apri.gist.ac.kr/index.php","sparkles"],["중앙도서관","GIST Library","https://library.gist.ac.kr/","library"],["언어교육원","영어·한국어 교과","https://language.gist.ac.kr/","messages-square"],["기술경영전문대학원","GTMBA","https://gtmba.gist.ac.kr/","briefcase"],["GIST 상담센터","상담·심리검사·또래상담","https://gccdc.gist.ac.kr/","heart-handshake"],["연구소·센터 8곳","부설 연구소 화면에서 보기","#p-3-0-0","building"]]],
"공동연구 문의":["공동연구·연구수탁은 연구관리팀, 장비 공동활용은 중앙기기연구소에 문의합니다.",[["연구관리팀","연구수탁 담당 · T.2033","tel:0627152033","phone"],["중앙기기연구소","공동 연구장비 예약·이용","https://gaia.gist.ac.kr/","monitor"],["창업혁신진흥원","창업혁신전략센터·창업진흥센터·기술사업화센터","https://www.gist.ac.kr/kr/html/sub01/010602.html?post_dvs_cd=0603","rocket"]]]
});
["감사","부서별 업무·연락처","부속기관","공동연구 문의"].forEach(n=>{PBODY[n]=()=>hubHTML(n);});
/* v99 부서별 업무·연락처 (소속 구분 없이 부서 87곳 · 담당 업무 686건, 현행 직원검색 자료) */
(function(){
 const OD_T=[["all","전체"],["head","이사회·총장·부총장실"],["adm","행정 부서"],["col","대학·학과·교육"],["res","연구소·센터"]];
 const odType=n=>/^(이사회|감사|총장|.+부총장실)$/.test(n)?"head":/(대학|학과|학부|대학원|학제전공|언어교육원)$/.test(n)?"col":/(연구소|연구원|센터|진흥원|본부)$/.test(n)?"res":"adm";
 const DEPTS=[];const IDXD={};ORGDIR.forEach(r=>{let d=IDXD[r[0]];if(!d){d=IDXD[r[0]]={n:r[0],t:odType(r[0]),rows:[]};DEPTS.push(d);}d.rows.push(r);});
 const STOP=/^(및|등|업무|관리|운영|지원|담당|총괄|관련|기타|대한|위한|각종|외|ㆍ|·)$/;
 DEPTS.forEach(d=>{const c={};d.rows.forEach(r=>String(r[2]||"").split(/[\s,\/·ㆍ()\[\]]+/).forEach(w=>{w=w.replace(/(의|및)$/,"");if(w.length<2||STOP.test(w)||/장$|교수|직원|선생/.test(w))return;c[w]=(c[w]||0)+1;}));d.kw=Object.entries(c).sort((a,b)=>b[1]-a[1]).slice(0,3).map(x=>x[0]);d.ext=String(d.rows[0][1]).split(/[\/, ]/)[0];});
 const tel=e=>"062-715-"+String(e).split(/[\/, ]/)[0];
 const split=t=>{t=String(t||"");let m=t.match(/^([^\/,]{1,12}?(?:장|관|원장|교수|팀장|부장|실장|센터장|대학장|학과장|원장|처장))\s*[\/,]\s*(.+)$/);if(m)return [m[1],m[2]];m=t.match(/^((?:교수|.{1,8}장))\/(.+)$/);if(m)return [m[1],m[2]];return ["",t];};
 const hl=(t,q)=>{t=esc(t);if(!q)return t;const re=new RegExp("("+q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&").split("").join("\\s*")+")","gi");return t.replace(re,"<mark>$1</mark>");};
 window.__od={DEPTS,type:"all",scope:"all"};
 const cnt=t=>t==="all"?DEPTS.length:DEPTS.filter(d=>d.t===t).length;
 const TK=[["출장·여비","국외출장","M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z",/국외출장|국내출장|여비/],["법인·연구비카드","카드","M2 7h20v12H2zM2 11h20",/법인카드|연구비카드/],["증명서 발급","증명서","M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h6",/증명서/],["장학금·납입금","장학금","M22 10 12 5 2 10l10 5 10-5zM6 12v5c3 2 9 2 12 0v-5",/장학|납입금/],["기숙사","기숙사","M3 20V8l9-5 9 5v12M3 14h18M9 20v-6h6v6",/기숙사|기혼자아파트/],["휴학·복학·학적","학적","M4 4h16v16H4zM8 8h8M8 12h8M8 16h5",/학적|휴학|복학/],["급여·연말정산","급여","M3 6h18v12H3zM12 9v6M9.5 10.5c0-1 1-1.5 2.5-1.5s2.5.6 2.5 1.5-1 1.3-2.5 1.5-2.5.5-2.5 1.5 1 1.5 2.5 1.5 2.5-.5 2.5-1.5",/급여|연말정산/],["채용","채용","M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M19 8v6M22 11h-6",/채용/],["계약·구매","계약","M4 4h11l5 5v11H4zM8 13h8M8 17h5",/(?<!재)계약|구매/],["학생인건비","인건비","M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",/인건비/],["시설·공사","시설","M14.7 6.3a4 4 0 0 0 5 5L22 14l-8 8-2.3-2.3a4 4 0 0 0-5-5L2 10l8-8z",/시설|영선|건축|설비/],["보안·출입","보안","M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z",/보안|출입/]];
 function taskHTML(){return '<section class="od-task" aria-labelledby="odtk"><h3 id="odtk">무엇을 하러 오셨나요?</h3><p>자주 찾는 일 12가지입니다. 맡은 곳과 내선이 바로 보이고, 전화 버튼을 누르면 휴대폰에서 바로 걸립니다.</p><div class="od-tg">'+TK.map(([n,q,ic,re])=>{const R=ORGDIR.filter(r=>re.test(String(r[2]||""))).sort((x,y)=>((IDXD[x[0]]||{}).t==="adm"?0:1)-((IDXD[y[0]]||{}).t==="adm"?0:1));const seen={};const top=R.filter(r=>seen[r[0]]?false:(seen[r[0]]=1)).slice(0,2);return '<article class="od-t"><header><span class="od-ti2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+ic+'"/></svg></span><b>'+esc(n)+'</b><button type="button" class="od-tm" data-odq="'+esc(q)+'">'+R.length+'건 모두 ›</button></header><ul>'+top.map(r=>'<li><button type="button" class="od-tdp" data-od="'+esc(r[0])+'">'+esc(r[0])+'</button><span>'+(function(){const pm=parts(r[2]).filter(x=>re.test(x));const t=pm.length?pm.join(' · '):String(r[2]||'');return esc(t.length>40?t.slice(0,40)+'…':t);})()+'</span><a class="od-tel num" href="tel:'+tel(r[1])+'" aria-label="'+esc(r[0])+' '+esc(n)+' 담당 내선 '+esc(r[1])+' 전화 걸기">'+PH_SVG+'T.'+esc(String(r[1]))+'</a></li>').join("")+'</ul></article>';}).join("")+'</div></section>';}
 window.odHTML=function(mode){const CH=["연구비","연구과제","인사","교원","입학","창업","안전","시설","예산","채용","출장","홍보","국제","기술이전","도서","기숙사","증명서"];
  return '<div class="od" data-mode="'+(mode||"dept")+'"><div class="od-top"><div class="od-kpi"><div><b class="num">'+DEPTS.length+'</b><span>부서</span></div><div><b class="num">'+ORGDIR.length+'</b><span>담당 업무</span></div><a class="od-rep" href="tel:062-715-2114"><span>대표전화</span><b class="num">062-715-2114</b></a></div>'+
  '<form class="od-s" role="search" onsubmit="return false"><div class="od-sc" role="group" aria-label="찾는 범위">'+[["all","전체"],["duty","담당 업무"],["dept","부서 이름"],["ext","내선번호"]].map((x,i)=>'<button type="button" data-osc="'+x[0]+'" aria-pressed="'+(i===0)+'">'+x[1]+'</button>').join("")+'</div><label class="sr" for="odq">부서·업무·내선 찾기</label><div class="od-in"><i data-lucide="search"></i><input id="odq" type="search" autocomplete="off" placeholder="'+(mode==="duty"?"하고 싶은 일로 찾기 — 예: 증명서, 출장, 장학금":"부서·업무·내선으로 찾기 — 예: 학적팀, 증명서, 2836")+'"><span class="num" id="odn" role="status"></span></div></form>'+
  '<div class="od-ch" aria-label="자주 찾는 업무"><span>자주 찾는 업무</span>'+CH.map(c=>'<button type="button" class="chip" data-odq="'+esc(c)+'">'+esc(c)+'</button>').join("")+'</div></div>'+
  (mode==="duty"?taskHTML():"")+'<div class="od-tabs" role="group" aria-label="부서 종류">'+OD_T.map((x,i)=>'<button type="button" data-ot="'+x[0]+'" aria-pressed="'+(i===0)+'">'+x[1]+' <small class="num">'+cnt(x[0])+'</small></button>').join("")+'</div>'+
  '<div id="odb" class="od-b"></div>'+
  '<p class="note">출처: 현행 GIST 홈페이지 ‘조직/직원안내 › 직원검색’ 부서·내선·담당업무 '+ORGDIR.length+'건 (2026.11.11. 확인). 현행처럼 직원 이름은 싣지 않습니다. 부서 종류는 부서 이름으로 나눈 것이며, 구축 때 담당 부서가 관리자 모드에서 고칩니다. <a href="https://www.gist.ac.kr/kr/html/sub01/010602.html"'+EXT+'>현행 직원검색 ↗</a></p></div>';};
 function card(d){return '<button type="button" class="od-c" data-od="'+esc(d.n)+'"><span class="od-ct">'+esc(OD_T.find(x=>x[0]===d.t)[1])+'</span><b>'+esc(d.n)+'</b><span class="od-kw">'+d.kw.map(esc).join(" · ")+'</span><span class="od-cf"><span class="num">T.'+esc(d.ext)+'</span><span>업무 <b class="num">'+d.rows.length+'</b>건 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg></span></span></button>';}
 const CP_SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>';
 const PH_SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>';
 const parts=t=>{const o=[];let cur="",dp=0;for(const ch of String(t||"")){if(ch==="("||ch==="[")dp++;if(ch===")"||ch==="]")dp=Math.max(0,dp-1);if(!dp&&(ch==="/"||ch===","||ch==="ㆍ")){if(cur.trim())o.push(cur.trim());cur="";}else cur+=ch;}if(cur.trim())o.push(cur.trim());return o;};
 const GEN=/^(업무|업무총괄|총괄|행정|행정지원|지원|관리|운영|서무|사무|기타|기타업무|팀원|업무지원|학과 총괄|학과총괄)$/;
 const kq=c=>{let k=c.replace(/\s*[\(\[].*$/,"").trim();const k2=k.replace(/\s*(관련|업무)$/,"").trim();if(k2.length>=2&&!GEN.test(k2))k=k2;return k||c;};
 const chips=(du,q)=>parts(du).map(c=>{const k=kq(c);return GEN.test(k)||k.length<2?'<span class="od-k od-kg">'+hl(c,q)+'</span>':'<button type="button" class="od-k" data-odk="'+esc(k)+'" title="‘'+esc(k)+'’ 맡은 곳 모두 찾기">'+hl(c,q)+'</button>';}).join("");
 const split2=t=>{let [a,b]=split(t);if(!a&&/^[^\/,]{1,10}(장|관|교수)$/.test(String(b).trim())){a=String(b).trim();b='';}return [a,b];};
 function rowHTML(r,q,showDept){const [ti,du]=split2(r[2]);return '<li class="od-r2"><div class="od-rd">'+(ti?'<span class="od-ti">'+hl(ti,q)+'</span>':'')+'<div class="od-ks">'+(du?chips(du,q):(ti?'':'<span class="od-k0">(업무 미기재)</span>'))+'</div>'+(showDept?'<button type="button" class="od-rdep" data-od="'+esc(r[0])+'">'+hl(r[0],q)+' ›</button>':'')+'</div><div class="od-act"><a class="od-tel num" href="tel:'+tel(r[1])+'" aria-label="'+esc(r[0])+' 내선 '+esc(r[1])+' 전화 걸기">'+PH_SVG+'T.'+hl(String(r[1]),q)+'</a><button type="button" class="od-cp" data-cp="'+tel(r[1])+'" aria-label="'+tel(r[1])+' 번호 복사">'+CP_SVG+'</button></div></li>';}
 window.odRender=function(){const B=$("#odb");if(!B)return;const S=window.__od;const q=($("#odq").value||"").trim();const qn=q.replace(/\s+/g,"");const inT=d=>S.type==="all"||d.t===S.type;
  if(!qn){B.innerHTML='<div class="od-g">'+DEPTS.filter(inT).map(card).join("")+'</div>';$("#odn").textContent=DEPTS.filter(inT).length+"곳";icons();return;}
  const m=r=>{const s=S.scope;const D=r[0].replace(/\s+/g,""),U=String(r[2]||"").replace(/\s+/g,""),E=String(r[1]);return (s==="all"&&(D+U+E).includes(qn))||(s==="duty"&&U.includes(qn))||(s==="dept"&&D.includes(qn))||(s==="ext"&&E.includes(qn));};
  const G=DEPTS.filter(inT).map(d=>[d,d.rows.filter(m)]).filter(x=>x[1].length);const tot=G.reduce((a,x)=>a+x[1].length,0);
  $("#odn").textContent=tot+"건 · "+G.length+"개 부서";
  B.innerHTML=tot?'<div class="od-res">'+G.map(([d,R])=>'<section class="od-grp"><header><button type="button" data-od="'+esc(d.n)+'"><b>'+hl(d.n,qn)+'</b><span>'+esc(OD_T.find(x=>x[0]===d.t)[1])+' · 업무 '+d.rows.length+'건 모두 보기 ›</span></button></header><ul class="od-rows">'+R.slice(0,12).map(r=>rowHTML(r,qn,false)).join("")+'</ul></section>').join("")+'</div>':'<div class="od-none"><b>맞는 업무가 없습니다.</b><p>다른 낱말로 찾거나, 대표전화 <a class="num" href="tel:062-715-2114">062-715-2114</a>로 문의해 주세요.</p></div>';icons();};
 function grpHTML(rows){const G=[],M={};rows.forEach(r=>{const k=String(r[2]||"").trim();if(!M[k]){M[k]=[];G.push(M[k]);}M[k].push(r);});
  return G.map(g=>{if(g.length===1)return rowHTML(g[0],"",false);const [ti,du]=split2(g[0][2]);return '<li class="od-grpr od-r2"><div class="od-rd">'+(ti?'<span class="od-ti">'+esc(ti)+'</span>':'')+'<div class="od-ks">'+(du?chips(du,""):'<span class="od-k0">(업무 미기재)</span>')+'<small class="dof-n">'+g.length+'명</small></div></div><span class="dof-t od-act">'+g.map(r=>'<a class="od-tel num" href="tel:'+tel(r[1])+'" aria-label="'+esc(r[0])+' 내선 '+esc(r[1])+' 전화 걸기">T.'+esc(String(r[1]))+'</a>').join("")+'</span></li>';}).join("");}
 let lastF=null;
 window.odOpen=function(n){const d=IDXD[n];if(!d)return;let dl=$("#oddl");if(!dl){dl=document.createElement("div");dl.id="oddl";dl.className="od-dl";dl.innerHTML='<div class="od-dim" data-odx="1"></div><section class="od-pn" role="dialog" aria-modal="true" aria-labelledby="odpt" tabindex="-1"></section>';document.body.appendChild(dl);}
  lastF=document.activeElement;const P=dl.querySelector(".od-pn");
  P.innerHTML='<header class="od-ph"><div><span class="od-ct">'+esc(OD_T.find(x=>x[0]===d.t)[1])+'</span><h2 id="odpt">'+esc(d.n)+'</h2><p>담당 업무 <b class="num">'+d.rows.length+'</b>건'+(function(){const sub=DEPTS.filter(x=>x.n.indexOf(d.n+" ")===0);return sub.length?' (아래 부서 포함 <b class="num">'+(d.rows.length+sub.reduce((a,x)=>a+x.rows.length,0))+'</b>건)':''})()+' · 대표 내선 <b class="num">'+esc(d.ext)+'</b></p></div><button type="button" class="od-x" data-odx="1" aria-label="닫기"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></header><div class="od-pa"><a class="pill red" href="tel:'+tel(d.ext)+'"><i data-lucide="phone"></i>'+tel(d.ext)+' 전화</a><button type="button" class="pill" data-cp="'+tel(d.ext)+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>번호 복사</button></div><div class="od-pf"><label class="sr" for="odfq">이 부서 업무 안에서 찾기</label><div class="od-in sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="odfq" type="search" autocomplete="off" placeholder="이 부서 업무 안에서 찾기"><span class="num" id="odfn" role="status"></span></div><div class="od-pk" aria-label="이 부서 주요 업무">'+d.kw.filter(k=>!GEN.test(k)).concat(Object.keys((function(){const c={};d.rows.forEach(r=>parts(split(r[2])[1]).forEach(p=>{p=kq(p);if(p.length>=2&&p.length<=10&&!/(장|관|교수)$/.test(p)&&!GEN.test(p))c[p]=(c[p]||0)+1;}));return c;})()).filter(k=>d.kw.indexOf(k)<0).slice(0,7)).slice(0,8).map(k=>'<button type="button" data-odf="'+esc(k)+'">#'+esc(k)+'</button>').join("")+'</div><p class="od-tip">업무 낱말을 누르면 그 일을 맡은 곳을 GIST 전체에서 찾아 줍니다.</p></div><ul class="od-rows od-all">'+grpHTML(d.rows)+'</ul>'+(function(){const sub=DEPTS.filter(x=>x.n.indexOf(d.n+" ")===0);if(!sub.length)return "";return '<h3 class="od-subh">아래 부서 <b class="num">'+sub.length+'</b>곳 · 업무 <b class="num">'+sub.reduce((a,x)=>a+x.rows.length,0)+'</b>건</h3>'+sub.map(x=>'<section class="od-sub"><button type="button" class="od-subn" data-od="'+esc(x.n)+'" aria-label="'+esc(x.n)+' 창 열기, 대표 내선 '+esc(x.ext)+', 업무 '+x.rows.length+'건">'+esc(x.n.slice(d.n.length+1))+' <small class="num">T.'+esc(x.ext)+' · '+x.rows.length+'건 ›</small></button><ul class="od-rows">'+grpHTML(x.rows)+'</ul></section>').join("");})()+'<p class="note">출처: 현행 GIST 홈페이지 직원검색 (2026.11.11. 확인)</p>';
  dl.classList.add("on");document.documentElement.classList.add("od-lock");icons();setTimeout(()=>P.focus(),30);};
 window.odClose=function(){const dl=$("#oddl");if(!dl)return;dl.classList.remove("on");document.documentElement.classList.remove("od-lock");if(lastF&&lastF.focus)lastF.focus();};
 document.addEventListener("click",e=>{let t;
  if((t=e.target.closest("[data-odk]"))){const k=t.dataset.odk;const go=()=>{const i=$("#odq");if(!i)return false;i.value=k;window.__od.scope="all";$$("[data-osc]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.osc==="all"));odRender();const B=$("#odb");if(B)B.scrollIntoView({behavior:"smooth",block:"start"});return true;};odClose();if(!go()){location.hash="p-4-2-2";setTimeout(go,700);}return;}
  if((t=e.target.closest("[data-odf]"))){const i=$("#odfq");if(i){i.value=i.value===t.dataset.odf?"":t.dataset.odf;odFilter();}return;}
  if((t=e.target.closest("[data-odx]"))){odClose();return;}
  if((t=e.target.closest("[data-od]"))){odOpen(t.dataset.od);return;}
  if((t=e.target.closest("[data-ot]"))){window.__od.type=t.dataset.ot;$$("[data-ot]").forEach(b=>b.setAttribute("aria-pressed",b===t));odRender();return;}
  if((t=e.target.closest("[data-osc]"))){window.__od.scope=t.dataset.osc;$$("[data-osc]").forEach(b=>b.setAttribute("aria-pressed",b===t));odRender();return;}
  if((t=e.target.closest("[data-odq]"))){const i=$("#odq");if(i){i.value=t.dataset.odq;window.__od.scope="all";$$("[data-osc]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.osc==="all"));odRender();}return;}
  if((t=e.target.closest("[data-cp]"))){const v=t.dataset.cp;try{navigator.clipboard.writeText(v);}catch(_){}const o=t.getAttribute("aria-label");t.classList.add("ok");t.setAttribute("aria-label","복사됨: "+v);setTimeout(()=>{t.classList.remove("ok");t.setAttribute("aria-label",o||"");},1400);return;}
 });
 document.addEventListener("keydown",e=>{const dl=$("#oddl");if(!dl||!dl.classList.contains("on"))return;if(e.key==="Escape"){odClose();return;}if(e.key==="Tab"){const f=[...dl.querySelectorAll("a,button")];if(!f.length)return;const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus();}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus();}}});
 window.odFilter=function(){const i=$("#odfq");const P=$("#oddl .od-pn");if(!i||!P)return;const q=i.value.replace(/\s+/g,"");let n=0,all=0;P.querySelectorAll(".od-rows>li").forEach(li=>{all++;const ok=!q||li.textContent.replace(/\s+/g,"").includes(q);li.hidden=!ok;if(ok)n++;});P.querySelectorAll(".od-sub").forEach(sb=>{sb.hidden=q&&![...sb.querySelectorAll(".od-rows>li")].some(l=>!l.hidden);});P.querySelectorAll("[data-odf]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.odf===i.value)));const c=$("#odfn");if(c)c.textContent=q?n+"/"+all+"건":"";};
 document.addEventListener("input",e=>{if(e.target.id==="odq")odRender();if(e.target.id==="odfq")odFilter();});
 addEventListener("hashchange",()=>odClose());
 new MutationObserver(()=>{const B=$("#odb");if(B&&!B.dataset.r){B.dataset.r=1;window.__od.type="all";window.__od.scope="all";odRender();}}).observe(document.body,{childList:true,subtree:true});
 PBODY["부서별 업무·연락처"]=()=>odHTML("dept");PBODY["업무별 담당부서"]=()=>odHTML("duty");
})();

PBODY["행사"]=()=>{const ev=NOTICES.filter(n=>n.k==="행사");return '<p class="p-lead">캠퍼스 행사와 주요 학사일정을 한곳에서 봅니다.</p><div class="calist ev2"><h3>다가오는 학사일정</h3><ul>'+EVENTS.map(e=>'<li><b>'+esc(e.t)+'</b><span class="num">2026.'+esc(e.d)+'. '+esc(e.w)+'</span></li>').join("")+'</ul></div><h3 class="p-h3">행사 공지</h3><ul class="nbd">'+(ev.length?ev.map(n=>'<li><a href="'+(n.u||NURL)+'"'+EXT+'><span class="bd-k">'+esc(n.k)+'</span><b>'+esc(n.t)+'</b><span class="bd-d num">2026.'+esc(n.d)+'</span><i data-lucide="arrow-up-right"></i></a></li>').join(""):'<li class="bd-none">등록된 행사 공지가 없습니다.</li>')+'</ul><p class="note">첫 화면 공지·학사일정과 같은 자료를 씁니다. 관리자 모드에서 고치면 여기에도 바로 반영됩니다.</p>';};

const BRO="https://www.gist.ac.kr/_prog/download/?site_dvs_cd=kr&func_gbn_cd=SMedia&d_type=1&filename=";
const PUBS=[["Korean Brochure","국문 브로슈어","20261106175350_00evhuifvniswphdf09qr4qm4ez0ax.pdf"],["Korean Leaflet","국문 리플릿","20261106175503_00ry2i9ynzazdfl0z6b01nvumda7pw.pdf"],["English Brochure","영문 브로슈어","20261106175759_003z82qiger1s8v0ksdemjq98pucxl.pdf"],["English Leaflet","영문 리플릿","20261106180241_00dz7sf2nak41q1sirq1fi5hepn7k4.pdf"]];
PBODY["브로슈어"]=()=>'<p class="p-lead">GIST를 한 권에 담은 2026 발간물입니다. PDF로 내려받거나 e-book으로 볼 수 있습니다.</p><div class="pubs">'+PUBS.map((x,i)=>'<a class="pub'+(i%2?' lf':'')+(i>1?' en':'')+'" href="'+BRO+x[2]+'"'+EXT+'><span class="cov" aria-hidden="true"><img src="'+IMG("ci_gist_aw.png")+'" alt=""><em class="num">2026</em><b>'+x[0]+'</b></span><b>'+x[1]+' 2026</b><span>PDF 내려받기 <i data-lucide="arrow-up-right"></i></span></a>').join("")+'</div><div class="vbar"><span>2024·2025 발간물과 e-book 보기</span><a class="p-pill dark" href="'+GS+'sub07/070303.html"'+EXT+'>발간물 전체 <i data-lucide="arrow-up-right"></i></a></div><p class="note">발행: 대외협력처(Section of International and Public Affairs) · 표지는 시안용 그림이며 실제 표지 이미지는 구축 때 원본을 씁니다 · 출처: 현행 GIST 홈페이지 ‘발간물’ (2026.11.11. 확인)</p>';
PURL["브로슈어"]=GS+"sub07/070303.html";
const CERT_TYPES=[["재학증명서","각 과정에 재학 중인 자(대상: 재학생)"],["재적증명서","각 과정에 재적 중인 자(대상: 재학생, 휴학생)"],["성적증명서","각 과정에서 이수한 학기별 성적 증명"],["학위증명서","각 과정의 학위를 취득한 자"],["학위수여예정확인서","마지막 학기 — 졸업논문 심사일정 확정 후, 지도교수 서명을 받은 발급신청서를 학적팀에 제출"]];
PBODY["비전·연혁"]=()=>'<p class="p-lead">GIST가 세운 목적과 2053년을 향한 비전, 그리고 1991년부터의 발자취입니다.</p><figure class="ab-ph"><img src="'+IMG("p_spring.jpg")+'" alt="봄 GIST 캠퍼스 벚꽃길" loading="lazy"></figure><div class="ab-rows"><section class="ab-r"><div class="ab-rh"><span class="eyebrow">교육</span><h3>한 캠퍼스, 4개 단과대학</h3><a class="ab-ra" href="#colleges">대학·학과 보기 →</a></div><div class="ab-rb"><p>4개 단과대학 13개 학과와 1개 대학원이 한 캠퍼스에 모여 있습니다.</p><img src="'+IMG("lecture.jpg")+'" alt="강의실 칠판 앞에서 수업하는 모습" loading="lazy"></div></section><section class="ab-r"><div class="ab-rh"><span class="eyebrow">연구</span><h3>세계 상위 2% 연구자 30명</h3><a class="ab-ra" href="#p-3-1-0">연구 분야 보기 →</a></div><div class="ab-rb"><p>세계 상위 2% 연구자 30명, 전임교원의 16%입니다(Stanford/Elsevier).</p><img src="'+IMG("r_spectro.jpg")+'" alt="GIST 연구성과 그림(다차원 분광 입력·복원 기술)" loading="lazy"></div></section><section class="ab-r"><div class="ab-rh"><span class="eyebrow">산학·창업</span><h3>실험실에서 산업으로</h3><a class="ab-ra" href="#p-3-2-0">기술이전 보기 →</a></div><div class="ab-rb"><p>누적 기술이전 계약액 621억 원, 2023 대한민국 창업우수대학 창업성과 부문 1위(매일경제·한국창업보육협회)입니다.</p><img src="'+IMG("p_bldg.jpg")+'" alt="GIST 캠퍼스 건물" loading="lazy"></div></section><p class="note">숫자 출처: 현행 GIST 홈페이지 ‘숫자로 보는 GIST’ 인포그래픽 (2026.11.10. 확인) — 첫 화면 숫자와 같음</p></div><div class="vis"><div class="vis-h"><span class="eyebrow">VISION 2053</span><h3>인류의 더 나은 미래가치를 창출하는<br>과학기술 중추 연구기관</h3><p>경영목표 · 지역과 함께 혁신경제의 미래를 선도하는 실사구시형 과학기술 중추 연구기관</p></div><div class="vis-g"><div class="vis-c"><span class="eyebrow">설립 목적</span><ol><li>고급 과학기술 인재양성</li><li>산업계와의 협동연구 및 외국과의 교육연구 교류 촉진</li><li>기술이전 사업화 촉진, 창업지원</li><li>국가과학기술 및 지역 균형발전 이바지</li></ol></div><div class="vis-c red"><span class="eyebrow">목표</span><b class="big">세계대학평가 TOP 50</b><ul><li><em>교육</em>글로벌 과학기술 인재 3만명 양성</li><li><em>연구</em>글로벌석학 30명 배출 · 임무중심형 R&amp;D 수행 및 연구 질 제고</li><li><em>성과확산</em>유니콘급 기업 30개 배출 · 고부가가치형 성과확산 및 가치창출</li></ul></div></div><h3 class="p-h3" style="margin-top:32px">핵심가치 <small>G·I·S·T</small></h3>'+gist4HTML()+'<h3 class="p-h3">추진전략과 성과목표</h3><div class="dar"><article class="dac"><span class="dac-n num" aria-hidden="true">ST</span><h4>추진전략</h4><ul><li>다학제적 통합을 통한 역량강화</li><li>공감과 포용을 통한 공동체 화합</li><li>네트워킹 기반의 가치 제고</li></ul></article><article class="dac"><span class="dac-n num" aria-hidden="true">KPI</span><h4>성과목표</h4><ul><li>혁신선도형 고급과학기술인재 양성</li><li>지속가능발전을 위한 조직건전성 제고</li><li>고부가가치 창출형 기술사업화 및 창업선도</li></ul></article></div><p class="note">경영목표·추진전략·성과목표는 현행 GIST 홈페이지 ‘About GIST › VISION’ 원문 (2026.11.11. 확인) · 핵심가치 문구는 현행 ‘인사말’의 4대 책무에서 옮김 · <a href="https://www.gist.ac.kr/kr/html/sub01/0102.html"'+EXT+'>원문 보기 ↗</a></p></div><h3 class="p-h3" id="history">연혁 <small>GIST의 발자취</small></h3>'+histHTML();
PBODY["부설 연구소"]=()=>'<p class="p-lead">GIST의 연구소와 센터를 바로 찾아가세요.</p>'+labsHTML();
PBODY["연구센터"]=()=>'<p class="p-lead">공동 장비와 실험 지원을 맡는 센터입니다.</p>'+labsHTML(/센터|중앙기기/);
PBODY["공동 연구장비"]=()=>'<p class="p-lead">공동 연구장비는 중앙기기연구소에서 예약·이용합니다.</p>'+labsHTML(/중앙기기/);
PBODY["통합경비"]=()=>'<p class="p-lead">캠퍼스 건물 출입카드·출입 권한·출입차량 등록은 통합경비상황실에서 처리합니다.</p>'+
'<div class="cert3"><div class="ct"><span class="ct-n num" aria-hidden="true">01</span><i data-lucide="building"></i><b>ID카드 · 학생증</b><p>대상: 교직원, 재학생</p><small>우리은행 GIST 출장소(학생회관 지하 1층)에서 발급 → 통합경비상황실 등록 · 발급까지 약 3주</small></div>'+
'<div class="ct"><span class="ct-n num" aria-hidden="true">02</span><i data-lucide="file-badge"></i><b>임시카드</b><p>대상: 구성원 가족, 휴학생, 휴직자, 외부인 등</p><small>통합경비상황실 방문 또는 ZEUS ‘출입통제’에서 신청 · 보증금 없음 · 사용이 끝나면 1주 안에 반납</small></div>'+
'<div class="ct"><span class="ct-n num" aria-hidden="true">03</span><i data-lucide="phone"></i><b>모바일출입카드</b><p>대상: 재직자, 재학생</p><small>ZEUS → MyService → 출입통제 → 모바일 출입카드 신청 · 추가 출입 권한은 따로 신청</small></div></div>'+
'<h3 class="p-h3">신청 안내</h3><div class="tbl-w" tabindex="0" role="region" aria-label="통합경비 신청 안내 표"><table class="tbl"><thead><tr><th scope="col">구분</th><th scope="col">방법</th><th scope="col">알아 둘 것</th></tr></thead><tbody>'+
'<tr><th scope="row">ID카드 신청</th><td>우리은행 GIST 출장소 방문(평일 9:00~15:30)</td><td>우리은행 계좌 개설이 필요하므로 신분증과 증명사진(또는 jpg 파일) 지참 · 기존 우리은행 계좌가 있으면 연결 가능</td></tr>'+
'<tr><th scope="row">출입 권한 신청</th><td>ZEUS → MyService → 출입통제 → 출입권한신청</td><td>건물 안 호실 출입은 권한을 미리 받아야 함 · ZEUS 양식으로 신청서 첨부</td></tr>'+
'<tr><th scope="row">출입차량 등록</th><td>ZEUS → MyService → 차량등록 신청, 또는 LG도서관 A동 1층 통합경비상황실 방문</td><td>소속·성명·차종/번호·전화번호 등 · ZEUS 양식으로 신청서 첨부</td></tr></tbody></table></div>'+
'<h3 class="p-h3">처리 순서</h3><ol class="pflow"><li><b>신청</b><span>구성원</span></li><li><b>승인</b><span>안전팀 (반려될 수 있음)</span></li><li><b>반영</b><span>통합경비상황실</span></li><li><b>완료 메일</b><span>신청자 GIST 메일로 발송</span></li></ol>'+
'<p class="note">반려되는 경우: 구성원 본인의 임시카드 신청, 다른 부서 업무, 신청서 오류 등 · 내부 구성원 임시카드는 해외 계정·해외 제조사 휴대폰 등 모바일출입카드를 쓸 수 없는 경우에만 예외 발급</p>'+
'<div class="dcon" style="margin-top:22px"><div><span>통합경비상황실</span><b class="num">062-715-2110</b></div><div><span>위치</span><b>LG도서관 A동 1층</b></div><div><span>담당 부서</span><b>안전팀</b></div></div>'+
'<p class="note">현행 GIST 홈페이지 ‘대학생활 › 행정지원 › 통합경비(학생증 외)’ 원문을 옮겼습니다 (2026.11.11. 확인) · <a href="https://www.gist.ac.kr/kr/html/sub05/050503.html"'+EXT+'>원문 보기 ↗</a></p>';
PBODY["증명서 발급"]=()=>'<p class="p-lead">자동발급기·인터넷·우편, 세 가지 방법으로 받을 수 있습니다.</p><div class="cert3"><div class="ct"><span class="ct-n num" aria-hidden="true">01</span><i data-lucide="file-badge"></i><b>증명서 자동발급기</b><p>도서관 1층 로비, 행정동 1층 검수실 앞 · 24시간</p><small>학적정보 입력 → 증명서 선택 → 수수료 납부 → 출력</small><span class="fee">1통 <b class="num">500</b>원</span></div><div class="ct"><span class="ct-n num" aria-hidden="true">02</span><i data-lucide="monitor"></i><b>인터넷 증명발급</b><p>로그인 → 신청 → 학적정보 확인 → 수수료 납부 → 출력 또는 PDF 저장</p><small>고객센터 1644-2378</small><span class="fee">1통 <b class="num">500</b>원 + 대행 <b class="num">1,000</b>원</span><a class="p-pill dark" href="https://uni.webminwon.com/servlet/WMINDEX?COMMAND=ACTIVEX&amp;GIWANNO=022915"'+EXT+'>인터넷증명발급센터 <i data-lucide="arrow-up-right"></i></a></div><div class="ct"><span class="ct-n num" aria-hidden="true">03</span><i data-lucide="mail"></i><b>우편발송</b><p>국내: 인터넷증명발급센터 ‘증명서우편신청’(배송수수료 발생)</p><small>해외: 학적팀 GIST 우편봉투로 본인이 직접 우송 · 국제학력인증센터 발송은 학적팀에 사전 문의</small></div></div><h3 class="p-h3">증명서 종류</h3><div class="tbl-w" tabindex="0" role="region" aria-label="증명서 종류 표"><table class="tbl"><thead><tr><th scope="col">종류</th><th scope="col">국문</th><th scope="col">영문</th><th scope="col">비고</th></tr></thead><tbody>'+CERT_TYPES.map(r=>'<tr><th scope="row">'+r[0]+'</th><td>O</td><td>O</td><td>'+esc(r[1])+'</td></tr>').join("")+'</tbody></table></div><p class="note">자동발급기 오류 문의 학적팀(T.2055) · 출처: 현행 GIST 홈페이지 ‘증명서 발급’ (2026.11.10. 확인)</p>';
PBODY["공지"]=()=>{const ks=["전체",...new Set(NOTICES.map(n=>n.k))];return '<p class="p-lead">GIST의 새 소식과 모집·행사 안내입니다.</p><div class="bd-top"><div class="bd-chips" role="group" aria-label="분류">'+ks.map((k,i)=>'<button type="button" class="chip'+(i?'':' on')+'" aria-pressed="'+(i?'false':'true')+'" data-k="'+esc(k)+'">'+esc(k)+'</button>').join("")+'</div><form class="bd-s" role="search" onsubmit="return false"><label class="sr" for="bdq">공지 검색</label><input id="bdq" type="search" placeholder="제목으로 찾기"><i data-lucide="search"></i></form></div><ul class="nbd" id="bdl">'+NOTICES.map((n,i)=>'<li data-k="'+esc(n.k)+'"><a href="'+(n.u||NURL)+'"'+EXT+'><span class="bd-k">'+esc(n.k)+'</span><b>'+esc(n.t)+'</b><span class="bd-d num">2026.'+esc(n.d)+'</span><i data-lucide="arrow-up-right"></i></a></li>').join("")+'</ul><p class="bd-none" id="bdn" hidden>맞는 공지가 없습니다.</p><p class="note">시안은 현행 홈페이지 첫 화면 공지 '+NOTICES.length+'건만 옮겼습니다. 전체 목록은 <a href="'+NURL+'"'+EXT+'>현행 공지 게시판</a>에서 볼 수 있고, 관리자 모드에서 공지를 고치면 이 목록도 함께 바뀝니다.</p>';};
document.addEventListener("click",e=>{const c=e.target.closest(".bd-chips .chip");if(!c)return;$$(".bd-chips .chip").forEach(x=>{x.classList.toggle("on",x===c);x.setAttribute("aria-pressed",x===c)});bdF();});
document.addEventListener("input",e=>{if(e.target.id==="bdq")bdF();});
function bdF(){const k=($(".bd-chips .chip.on")||{}).dataset?.k||"전체",q=($("#bdq")||{}).value?.trim()||"";let n=0;$$("#bdl li").forEach(li=>{const ok=(k==="전체"||li.dataset.k===k)&&(!q||li.textContent.includes(q));li.hidden=!ok;if(ok)n++;});$("#bdn").hidden=n>0;}

/* 세부페이지도 통합검색·명령창에서 찾히게 */
(function(){const tp=document.createElement("template");MEGA.forEach((M,i)=>M[2].forEach((G,g)=>G[1].forEach((x,k)=>{if(i===1||PSPECIAL[x])return;let t="";try{tp.innerHTML=(PBODY[x]?PBODY[x]():M[0]+" "+G[0]+" "+x).replace(/></g,"> <");t=tp.content.textContent.replace(/\s+/g," ").trim();}catch(_){}const r={s:"main",site:"세부페이지 · "+M[0]+" › "+G[0],t:x,p:(t.length>88?t.slice(0,88)+"…":t),k:t.slice(0,800),h:"#p-"+i+"-"+g+"-"+k};IDX.push(r);CMDX.push(r);})));tp.innerHTML="";})();

/* 모바일: 표가 넘치면 '옆으로 밀어 보기' 안내 */
function markScroll(){$$("#v-page .tbl-w").forEach(w=>{const o=w.scrollWidth>w.clientWidth+4;w.classList.toggle("scr",o);if(o&&!w.previousElementSibling?.classList?.contains("swipe")){w.insertAdjacentHTML("beforebegin",'<p class="swipe" aria-hidden="true">표를 옆으로 밀어 보세요 →</p>');}});}
addEventListener("hashchange",()=>setTimeout(markScroll,120));addEventListener("resize",()=>{clearTimeout(window.__ms);window.__ms=setTimeout(markScroll,200);});setTimeout(markScroll,400);

/* 관리자가 쓴 글을 안전한 HTML로: ## 제목, - 목록, 빈 줄 = 문단, [글자](https://주소) */
function mdHTML(t){const lk=x=>esc(x).replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g,(m,a,u)=>'<a href="'+u+'" target="_blank" rel="noopener noreferrer">'+a+'</a>');
 return t.replace(/\r/g,"").split(/\n{2,}/).map(b=>{b=b.trim();if(!b)return"";if(/^##\s/.test(b))return '<h3 class="p-h3">'+lk(b.replace(/^##\s+/,""))+'</h3>';const L=b.split("\n");if(L.every(l=>/^-\s/.test(l)))return '<ul class="pov-ul">'+L.map(l=>'<li>'+lk(l.replace(/^-\s+/,""))+'</li>').join("")+'</ul>';return '<p>'+L.map(lk).join("<br>")+'</p>';}).join("");}

document.addEventListener("click",e=>{const b=e.target.closest(".psat [data-sat]");if(!b)return;$$(".psat [data-sat]").forEach(x=>x.setAttribute("aria-pressed",x===b));const m=$(".psat-m");if(m)m.textContent="‘"+b.dataset.sat+"’ 의견 고맙습니다. (시안이라 저장하지 않습니다 — 구축 때 담당 부서 집계로 연결)";});

/* 방문자 메뉴 타일 → 같은 이름의 세부페이지로 */
var LEAFAL={"대학 입학 전형":"입학 전형","장학 정보":"장학 제도","대학원 입학":"전형 안내","공동연구":"공동연구 문의","대학원 입학 전형":"전형 안내","장학·등록금":"장학 제도","외국인 지원":"외국인 입학","장학":"장학 제도"};
function leafHref(x){if(typeof MEGA==="undefined"||!LEAFAL)return null;const n=LEAFAL[x]||x;let h=null;MEGA.forEach((M,i)=>M[2].forEach((G,g)=>G[1].forEach((y,k)=>{if(!h&&y===n&&i!==1)h=pHref(i,g,k);})));return h;}
setTimeout(()=>{const cur=document.querySelector('.who button[aria-pressed="true"]');renderNeed(cur?cur.dataset.who:"ug");},0);


/* 지금, 지스트 글 화면 (#st-번호) */
function renderStoryDetail(n){const S0=STORIES[n];const host=$("#v-page");if(!S0){location.hash="story";return;}
 const same=STORIES.map((x,i)=>[x,i]).filter(([x,i])=>i!==n&&x.c===S0.c).slice(0,3);const more=same.length<3?STORIES.map((x,i)=>[x,i]).filter(([x,i])=>i!==n&&x.c!==S0.c).slice(0,3-same.length):[];
 const prev=n>0?n-1:null,next=n<STORIES.length-1?n+1:null;
 const sum=(S0.sum&&S0.sum.length)?S0.sum.map(t=>'<p>'+esc(t)+'</p>').join(""):'<div class="slot sm"><b>본문</b><p>[시안] 이 글의 본문은 구축 때 원문(보도자료 전문)을 글자로 올립니다. 지금은 제목·부제·날짜만 실었습니다.</p></div>';
 host.innerHTML='<div class="page-h stpv"><div class="wrap"><span class="crumb"><a href="#home">홈</a> › <a href="#story">지금, 지스트</a> › '+esc(S0.c)+'</span><span class="st-cat c'+((({"연구성과":1,"사람":3,"보도자료":2,"영상":4,"캠퍼스":5})[S0.c])||1)+'">'+esc(S0.c)+' <em>'+esc(cen(S0)||"")+'</em></span><h1 class="st-h1">'+esc(S0.t)+'</h1><p class="st-sub">'+esc(S0.s)+'</p><div class="st-meta"><span class="num">'+esc(S0.d||S0.m)+'</span>'+(S0.src?'<span>출처 '+esc(S0.src)+'</span>':'')+(sImg(S0).gen?'':'<span>'+esc(S0.cr)+'</span>')+(window.__RT[n]?'<span title="원문 기사 본문 글자 수(공백 제외) ÷ 분당 500자">원문 기사 약 '+window.__RT[n]+'분 읽기</span>':'')+(typeof gTopic==="function"&&gTopic(S0)[2]?'<span class="st-tp">#'+esc(gTopic(S0)[1])+'</span>':'')+'<button type="button" class="st-copy">이 글 주소 복사</button></div></div></div>'+
 '<div class="wrap st-wrap"><article class="st-art"><div class="st-thumb thumb"><img loading="lazy" src="'+(typeof sImg==="function"?sImg(S0).u:"")+'" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"><span class="cr">'+(sImg(S0).gen?'표지 그래픽 · 이 글에 맞는 사진은 구축 때 담당 부서가 올림':esc(S0.cr))+'</span></div><div class="st-body">'+sum+'</div>'+nxStoryRel(S0)+nxShare(S0.t)+
 (S0.g?'<a class="st-src" href="'+esc(S0.g)+'"'+EXT+'><span><small>GIST 미디어센터 원문</small><b>현행 GIST 홈페이지에서 보도자료 전문 읽기</b></span><i data-lucide="arrow-up-right"></i></a>':'')+(S0.u&&S0.u!==S0.g?'<a class="st-src alt" href="'+esc(S0.u)+'"'+EXT+'><span><small>관련 기사</small><b>'+esc(S0.src||"원문")+'에서 기사 읽기</b></span><i data-lucide="arrow-up-right"></i></a>':'')+
 '<p class="note">'+(S0.g&&S0.u===S0.g?'요약은 GIST 미디어센터 원문을 옮겼습니다.':S0.g?'요약은 GIST 미디어센터 원문과 연결한 기사 내용을 옮겼습니다. 기사 전문 저작권은 해당 언론사에 있습니다.':S0.u&&/인스타그램/.test(S0.src||'')?'요약은 GIST 공식 인스타그램 게시글을 옮겼습니다.':S0.u?'요약은 연결한 기사 내용을 옮겼습니다. 기사 전문 저작권은 해당 언론사에 있습니다.':'D안 시안 — 제목·부제·날짜는 GIST 보도자료·공식 채널 기준입니다.')+' 구축 때는 담당 부서가 관리자 화면에서 본문·사진을 직접 올립니다.</p>'+
 '<nav class="st-pn" aria-label="이전·다음 글">'+(prev!==null?'<a href="#st-'+prev+'"><small>이전 글</small><b>'+esc(STORIES[prev].t)+'</b></a>':'<span></span>')+(next!==null?'<a class="nx" href="#st-'+next+'"><small>다음 글</small><b>'+esc(STORIES[next].t)+'</b></a>':'<span></span>')+'</nav>'+
 '<a class="st-back" href="#story">← 지금, 지스트 목록으로</a></article>'+
 '<aside class="st-rel" aria-label="관련 글"><h2>'+(same.length?esc(S0.c)+' 다른 글':'다른 글')+'</h2>'+same.concat(more).map(([x,i])=>'<a href="#st-'+i+'"><span class="cat">'+esc(x.c)+' · <span class="num">'+esc(x.d||x.m)+'</span></span><b>'+esc(x.t)+'</b></a>').join("")+'</aside></div>';
 document.title=S0.t+" | 지금, 지스트 | GIST 홈페이지 D안";icons();requestAnimationFrame(drawThumbs);}
{const _r3=route;route=function(){const m=(LH()||"").match(/^#st-(\d+)$/);if(m){$$(".view").forEach(v=>v.classList.toggle("on",v.id==="v-page"));$$(".gnb a").forEach(a=>a.classList.toggle("on",+a.dataset.m===5));renderStoryDetail(+m[1]);scrollTo({top:0});heroState&&heroState();return;}_r3();};}
addEventListener("hashchange",()=>{if(/^#st-/.test(LH()||""))route();});
if(/^#st-/.test(LH()||""))setTimeout(route,0);

/* 검색에 지금, 지스트 글·튜토리얼 카드 넣기 */
STORIES.forEach((x,i)=>{const r={s:"main",site:"지금, 지스트 · "+x.c,t:x.t,p:(x.sum&&x.sum[0])||x.s,k:[x.s,x.body,...(x.sum||[])].join(" "),h:"#st-"+i};IDX.push(r);CMDX.push(r);});
TOP.forEach(T=>{const r={s:"rule",site:"학사 한 장 · "+T.n,t:T.n+" — "+T.d,p:T.ov,k:[T.ov,...T.ov2,...T.terms.map(x=>x.join(" ")),...T.qa.map(x=>x.join(" ")),...T.warn].join(" "),h:"#tutorial"};IDX.push(r);CMDX.push(r);});
if(typeof fuseCache!=="undefined")fuseCache.clear();

/* ===== 디자인 규칙 (#guide) — 구축 업체가 그대로 따라 만들 수 있게 ===== */
function renderGuide(){const host=$("#v-page");
 const C=[["--red","#DC2715","GIST 레드 · 주요 버튼·강조·선택 상태"],["--red-d","#B51F10","레드 눌림·진한 상태"],["--red-tx","#C11D0E","흰 바탕 위 빨간 글자(대비 4.5:1 이상)"],["--red-t","#FDECEA","빨간 연한 바탕"],["--ink","#111418","본문 글자·검정 버튼·바닥글"],["--gray","#4F5B54","GIST 그레이 · 보조 강조"],["--mute","#5A636B","설명 글자"],["--line","#E1E4E7","구분선·카드 테두리"],["--soft","#F4F5F6","연한 면(카드·안내 상자)"],["--paper","#FFFFFF","기본 바탕"]];
 const T=[["화면 큰 제목(영문)","Anton","clamp(56px, 8vw, 120px)","GIST TUTORIAL · COLLEGE OF AI"],["화면 제목","Pretendard GIST 800","32~44px","비전·연혁"],["구역 제목","Pretendard GIST 800","22px","연구 분야"],["카드 제목","Pretendard GIST 800","15.5~20px","AX 반도체/시스템"],["본문","Pretendard GIST 400","16~17.5px / 줄간격 1.8~1.95","학사과정은 매 학기 11학점 이상…"],["설명·출처","Pretendard GIST 600","12.5~14px","현행 홈페이지 원문 (2026.11.11. 확인)"],["숫자","Inter Tight 800","크기는 쓰는 곳에 맞춤","062-715-2114 · 2026.11.10."]];
 const R=[["큰 카드·사진","24px"],["보통 카드·표 상자","20px"],["작은 안내 상자","12px"],["버튼·꼬리표(알약 모양)","999px"],["GIST 모서리(사진 카드 오른쪽 위를 비스듬히 자름)","22~26px"]];
 const P=[["사진 머리","영문 큰 글자 + 한글 화면 이름 + 한 줄 설명, 대학·메뉴별 사진"],["위치 표시줄","홈 › 대분류 › 화면 (각 단계가 펼침 메뉴) · 주소 복사 · 인쇄"],["왼쪽 메뉴","같은 대분류 안 화면 목록, 지금 화면은 빨간 칸 (휴대폰에서는 숨김)"],["제목과 첫 줄 설명","화면 제목 + 이 화면에서 무엇을 하는지 한 문장"],["본문","카드 → 표 → 순서도 순으로, 표는 휴대폰에서 옆으로 밀어 봄"],["화면 정보","담당 부서 · 최종 수정일 · 현행 홈페이지 원문 링크"],["만족도","4단계 (매우 만족~불만족)"],["관련 화면","같은 묶음의 다른 화면 바로가기"]];
 const sw=C.map(c=>'<div class="gsw"><span style="background:'+c[1]+(c[1]==="#FFFFFF"?';box-shadow:inset 0 0 0 1.5px var(--line)':'')+'"></span><b>'+c[0]+'</b><code>'+c[1]+'</code><small>'+esc(c[2])+'</small></div>').join("");
 const ty='<div class="tbl-w" tabindex="0" role="region" aria-label="글자 규칙 표"><table class="tbl"><thead><tr><th scope="col">쓰는 곳</th><th scope="col">글꼴</th><th scope="col">크기</th><th scope="col">보기</th></tr></thead><tbody>'+T.map(t=>'<tr><th scope="row">'+esc(t[0])+'</th><td>'+esc(t[1])+'</td><td class="num">'+esc(t[2])+'</td><td>'+esc(t[3])+'</td></tr>').join("")+'</tbody></table></div>';
 const comp='<div class="gcomp"><div><span class="gl">버튼 — 검정</span><a class="p-pill dark" href="#guide">학과 소개 보기 <i data-lucide="arrow-right"></i></a></div><div><span class="gl">버튼 — 빨강</span><a class="p-pill red" href="#guide" style="background:var(--red);color:#fff">GIST 소개 <i data-lucide="arrow-right"></i></a></div><div><span class="gl">큰 바로가기 버튼</span><a class="dbtn pri" href="#guide"><i data-lucide="house"></i><span><b>학과 홈페이지</b><small>env1.gist.ac.kr</small></span></a></div><div><span class="gl">꼬리표</span><div class="dchips2" style="margin:0"><span>기후변화·대기</span><span>지속가능 에너지</span><span>물·생태</span></div></div></div>'+
  '<div class="dar" style="margin-top:12px"><article class="dac"><span class="dac-n num" aria-hidden="true">01</span><h4>번호 카드</h4><span class="dac-en">Numbered Card</span><p>연구 분야·추진전략처럼 같은 무게의 항목을 나란히 보여 줄 때. 오른쪽 위 번호, 빨간 점 목록.</p></article><article class="dac"><span class="dac-n num" aria-hidden="true">02</span><h4>표</h4><span class="dac-en">Table</span><p>머리줄은 위아래 진한 선, 칸은 연한 선. 휴대폰에서는 표만 옆으로 밀림.</p></article></div>';
 const tpl='<ol class="pflow" style="grid-template-columns:repeat(4,minmax(0,1fr))">'+P.map(x=>'<li><b>'+esc(x[0])+'</b><span>'+esc(x[1])+'</span></li>').join("")+'</ol>';
 const scr=[["첫 화면","#home"],["대학·학과","#colleges"],["학과 소개 (14개)","#d-env1"],["통합검색·AI 안내","#search"],["학사 한 장","#tutorial"],["지금, 지스트 목록","#story"],["지금, 지스트 글","#st-0"],["세부페이지 (43개)","#p-0-0-0"],["메뉴 구조도","#menu"],["배너 규격","#banner"],["벤치마킹 100","#bench"]];
 host.innerHTML='<div class="page-h pv"><div class="pv-bg" aria-hidden="true"><img loading="lazy" src="'+IMG("p_curve.jpg")+'" alt="" decoding="async"></div><div class="wrap"><span class="pv-en" aria-hidden="true">DESIGN GUIDE</span><h1>디자인 규칙</h1><p>구축 업체가 D안을 그대로 따라 만들 수 있도록 색·글자·부품·화면 틀을 한 장에 모았습니다.</p></div></div>'+
 '<div class="wrap" style="padding-block:48px 90px;max-width:1200px"><div class="pg-main"><h2 class="pg-t">디자인 규칙</h2><p class="p-lead">모든 값은 이 시안 화면에 실제로 쓰인 값입니다. 색은 GIST 브랜드 가이드(2024)의 레드·그레이를 기준으로 했습니다.</p>'+
 '<h3 class="p-h3">1. 색</h3><div class="gsws">'+sw+'</div>'+
 '<h3 class="p-h3">2. 글자</h3>'+ty+
 '<h3 class="p-h3">3. 모서리·폭</h3><div class="dcon">'+R.map(r=>'<div><span>'+esc(r[0])+'</span><b class="num">'+esc(r[1])+'</b></div>').join("")+'<div><span>화면 최대 폭</span><b class="num">1280px (양옆 40px)</b></div><div><span>화면 나눔</span><b class="num">1100px · 760px</b></div></div>'+
 '<h3 class="p-h3">4. 부품 견본</h3>'+comp+
 '<h3 class="p-h3">5. 세부페이지 틀 (위에서 아래 순서)</h3>'+tpl+
 '<h3 class="p-h3">4-1. 첫 화면 편집 규칙 (v80~v82, 스탠퍼드·POSTECH 비교)</h3><div class="tbl-w" tabindex="0" role="region" aria-label="첫 화면 편집 규칙 표"><table class="tbl"><thead><tr><th scope="col">항목</th><th scope="col">규칙</th><th scope="col">참고한 곳</th></tr></thead><tbody>'+
 [["구역 제목","영문 이름은 세리프 글꼴(Source Serif 4, 굵게), 바로 아래 한글 설명 한 줄, 빨간 짧은 줄 40px","스탠퍼드 구역 제목"],
  ["한 화면 한 이야기","구역마다 카드 4개 이하로 보이고 나머지는 ‘더보기’로","스탠퍼드 첫 화면"],
  ["사진","실제 학교 사진만 씀(2026.11.11. 사용 허락). 사진 없는 글은 주제에 맞는 캠퍼스 사진에 같은 어두운 색조를 얹어 통일. 얼굴이 크게 나온 사진은 쓰지 않음","스탠퍼드 뉴스 카드"],
  ["도표 그림","보도자료 도표·인포그래픽은 자르지 않고 흰 바탕 위에 통째로","—"],
  ["첫 사진","글자 뒤 사진에 잘린 글자(표지판 등)가 없게 자른 판을 씀","POSTECH 첫 화면"],
  ["떠 있는 버튼","오른쪽 빠른 메뉴는 44px로 작게, 본문을 가리지 않게","—"],
  ["시안 도구","반영 번호표·시안 막대는 발표 때 숨기고 ‘시안 도구 보기’로만 켬","—"]].map(r=>'<tr><th scope="row">'+r[0]+'</th><td>'+r[1]+'</td><td>'+r[2]+'</td></tr>').join("")+'</tbody></table></div>'+
 '<h3 class="p-h3">5-0. 서비스 이름 체계 (브랜드 구조)</h3><p class="p-lead" style="margin-top:0">대표 홈페이지 안의 특화 서비스 4개는 <b>눌러 보기 전에 무엇이 나올지 아는 한글 이름</b>으로 짓습니다. ‘지금’과 ‘물어봐’는 지스트를 부르는 말, ‘한 장’과 ‘한 줄’은 복잡한 것을 줄여 준다는 약속입니다.</p><div class="tbl-w" tabindex="0" role="region" aria-label="서비스 이름 표"><table class="tbl"><thead><tr><th scope="col">이름</th><th scope="col">하는 일</th><th scope="col">이름 뜻</th><th scope="col">이전 시안 이름</th></tr></thead><tbody><tr><th scope="row"><span class="bl"><span>지금,</span><b>지스트</b></span></th><td>소식 매거진 (보도자료·연구성과·사람·캠퍼스·영상)</td><td>오늘 지스트에서 벌어지는 일</td><td>GIST Insight · G-Story</td></tr><tr><th scope="row"><span class="bl"><b>학사</b><span>한 장</span></span></th><td>학사 길잡이 (튜토리얼 7개 주제)</td><td>복잡한 학사를 한 장씩 넘겨 끝냄</td><td>GIST Compass · G-Guide</td></tr><tr><th scope="row"><span class="bl nd"><b>지스트</b><span>에 물어봐</span></span></th><td>통합검색 · AI 안내</td><td>찾는 것이 아니라 물으면 답이 옴</td><td>Ask GIST · G-Ask</td></tr><tr><th scope="row"><span class="bl"><b>연구</b><span>한 줄</span></span></th><td>연구 연결 지도</td><td>소식 → 주제 → 학과 → 연구실이 한 줄로 이어짐</td><td>GIST Nexus</td></tr></tbody></table></div><p class="note">표기 규칙: 앞말과 뒷말의 굵기를 다르게(900·300) 쓰고 사이에 빨간 점 하나. 휴대폰 아래 탭처럼 자리가 좁으면 짧게(물어봐 · 학사 한 장 · 지금).</p>'+ '<h3 class="p-h3">5-0-1. 새 부품 규격 (v204~v207)</h3><p class="p-lead" style="margin-top:0">검색 콘솔·알약 단추·휴대폰 아래 탭은 아래 값 그대로 만듭니다. 근거는 2026.11.13. 스탠퍼드·POSTECH 화면을 390px·1440px 폭으로 열어 잰 값입니다.</p><div class="tbl-w" tabindex="0" role="region" aria-label="새 부품 규격 표"><table class="tbl"><thead><tr><th scope="col">부품</th><th scope="col">규격</th><th scope="col">두 학교 실측</th></tr></thead><tbody><tr><th scope="row">검색 콘솔</th><td>어두운 카드 모서리 32px(휴대폰 26px) · 제목 28~46px(가늘게 300 + 굵게 900) · 검색창 알약 높이 68px(휴대폰 58px), 글자 22px(휴대폰 20px) 굵게 · 검색 단추 빨강 알약 높이 50px(휴대폰 44px) · 범위 단추는 흰 테두리 1.5px 알약, 고른 것은 흰 바탕</td><td>스탠퍼드: 글자 20px, 상자 없이 아래 줄만 · POSTECH: 글자 20px(휴대폰)·40px(PC) 굵게, 어두운 바탕</td></tr><tr><th scope="row">알약 거르기 단추</th><td>높이 44px 이상 · 모서리 999px · 테두리 1.5px #D5D9DD · 글자 15px(휴대폰 14.5px) 굵게 · 고른 것은 검정 바탕 흰 글자 · 사이 8px</td><td>POSTECH: 높이 33px(휴대폰)·50px(PC), 글자 12.5px·16px · 스탠퍼드: 둥근 단추 37px</td></tr><tr><th scope="row">휴대폰 아래 탭</th><td>좌우 10px·아래 8px 띄운 섬 · 모서리 24px · 흰 바탕 88% + 흐림 18px · 5칸 · 글자 13px · 지금 탭은 검정 알약(모서리 18px) · 전체 높이 72px</td><td>두 학교 모두 휴대폰 아래 고정 메뉴 없음 (D안에만 있음)</td></tr><tr><th scope=\"row\">소식 카드</th><td>제목 20px 굵게(줄 간격 1.4) · 큰 카드 제목 24px(휴대폰)·30px(PC) · 날짜 13px(휴대폰)·15px(PC) · 사진 모서리 20px · 카드 모서리 24px</td><td>POSTECH: 제목 20.8px(휴대폰)·30px(PC) 굵게, 날짜 11.4px·14px · 스탠퍼드: 큰 기사 제목 31.6px·54.6px</td></tr><tr><th scope=\"row\">더 보기 단추</th><td>글자 + 기호(+·−) · 알약 높이 52px(휴대폰 44px) · 테두리 1.5px #D5D9DD · 글자 15px(휴대폰 14.5px) 굵게 · 그림만 있는 단추 금지</td><td>POSTECH: 글자 알약 높이 42px(휴대폰)·50px(PC), 글자 13.5px·16px 굵게 · 스탠퍼드: 글자 아래 줄 고리 14px</td></tr></tbody></table></div>'+ '<h3 class="p-h3">5-1. 학과·단과대학 홈페이지 공통 띠</h3><p class="p-lead" style="margin-top:0">스탠퍼드는 모든 학교·학과 사이트 맨 위에 같은 \'Stanford University\' 붉은 띠를 둡니다. 학과 홈페이지는 이번 사업 대상이 아니므로, 학과가 각자 사이트를 고칠 때 맨 위에 붙일 띠 한 줄만 정해 둡니다(높이 40px, GIST 레드 진한 색, 누르면 대표 홈페이지).</p><div class="gidmock"><div class="gidbar">GIST 광주과학기술원 <span>대표 홈페이지 · 대학·학과 · 입학</span></div><div class="gm2"><b>환경·에너지공학과</b><small>학과 홈페이지 머리 (보기)</small></div></div>'+
 '<h3 class="p-h3">6. 휴대폰</h3><div class="dar"><article class="dac"><span class="dac-n num" aria-hidden="true">M1</span><h4>아래 탭 5개</h4><p>홈 · 대학·학과 · 검색·AI · 튜토리얼 · 지금, 지스트. 엄지가 닿는 자리에 둡니다.</p></article><article class="dac"><span class="dac-n num" aria-hidden="true">M2</span><h4>한 줄 한 칸</h4><p>카드·버튼은 한 줄에 하나(분류 칸만 3×2). 글자는 16px 아래로 줄이지 않습니다.</p></article></div>'+
 '<h3 class="p-h3">7. 지킬 기준</h3><div class="dar"><article class="dac"><span class="dac-n num" aria-hidden="true">A11Y</span><h4>웹 접근성</h4><p>WCAG 2.1 AA. 이 시안은 세부페이지 43개·학과 소개 14곳(13개 학과·1개 대학원)·소식 25건을 PC·휴대폰에서 자동 점검(axe)해 오류 0건입니다.</p></article><article class="dac"><span class="dac-n num" aria-hidden="true">SRC</span><h4>내용 출처</h4><p>모든 화면 아래에 현행 홈페이지 원문 링크와 확인한 날짜를 붙입니다. 자료에 없는 숫자는 쓰지 않습니다.</p></article></div>'+
 '<h3 class="p-h3">8. 화면 목록</h3><div class="prel-g" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px">'+scr.map(x=>'<a href="'+x[1]+'"><b>'+esc(x[0])+'</b><i data-lucide="arrow-up-right"></i></a>').join("")+'</div></div></div>';
 document.title="디자인 규칙 | GIST 홈페이지 D안";icons();}
{const _r4=route;route=function(){if((LH()||"")==="#guide"){$$(".view").forEach(v=>v.classList.toggle("on",v.id==="v-page"));renderGuide();scrollTo({top:0});heroState&&heroState();return;}_r4();};}
addEventListener("hashchange",()=>{if(LH()==="#guide")route();});

/* ===== v70 벤치마킹 100항목 (#bench) ===== */
var BENCH=[["첫 화면", "전체 길이(화면 높이 몇 배)", "21.8배 — 길게 내려 읽는 이야기형", "1.0배 — 한 화면씩 넘기는 방식", "13.7배 (PC 1440×900, v82)", "이번에 고침", "카드 수를 줄여 15.4배→13.7배로 짧게", ""], ["첫 화면", "첫 장면", "연구 뉴스 영상 + 기사 제목", "전체 화면 영상으로 시작 → 슬로건 2줄과 영상 위 POSTECH 글자 장면으로 이어짐", "가을 캠퍼스 사진 + 슬로건 → 스크롤하면 사진이 사라지고 GIST 글자(야경 사진을 담은 글자)가 올라옴", "이번에 고침", "POSTECH 첫 화면 순서를 따름. 영상은 구축 때 대외홍보팀 영상으로 바꿀 수 있음", "home|.hx"], ["첫 화면", "첫 장면 멈춤 단추", "영상마다 재생·멈춤", "재생·멈춤", "넘김 멈춤 단추", "이미 갖춤", "", "home|#hxdots"], ["첫 화면", "큰 문장 크기·줄간격", "64px · 줄간격 1.10", "30px", "64px · 줄간격 1.2", "이번에 고침", "줄간격 1.36 → 1.2로 조임", "home|.hx"], ["첫 화면", "맨 위 알림 띠", "'OUR IMPACT' 주제 띠", "개교 40주년 띠", "행사 알림 띠 + 닫기", "이미 갖춤", "", "home|.topbar"], ["첫 화면", "대표 주제 모음", "Our Impact(시민성·암·AI)", "Our Difference", "주제 4개 카드(AI · 반도체·양자 · 에너지·환경 · 생명·의료) + 관련 소식 수", "이번에 고침", "카드를 누르면 그 주제 소식을 찾아 줌", "home|#ptopics"], ["첫 화면", "숫자 지표", "투자·일자리·창업·발명 4개 + 설명", "없음", "TOP 2%·기술이전 621억 2개", "이미 갖춤", "숫자마다 출처 표시 유지", "home|#p-h-c1"], ["첫 화면", "연구소 지도", "연구소 12곳 지도 카드", "없음", "부설 연구소 8곳 카드 모음", "이번에 고침", "첫 화면에 연구소 카드 추가", "home|#plabs"], ["첫 화면", "SNS 구역", "인스타그램 릴스", "SNS 구역", "공식 인스타 최근 6건 + 유튜브", "이미 갖춤", "", "home|#p-h-sns"], ["첫 화면", "학교·학과 바로가기", "7개 학교(바닥글·학술 화면)", "학과 목록 화면", "4개 단과대학·13개 학과·1개 대학원", "이미 갖춤", "", "home|#p-h-words"], ["첫 화면", "방문자별 안내", "펼침 메뉴마다 'Information for' 4종", "빠른 메뉴", "첫 화면 6종 + 펼침 메뉴 '이런 분께' 6종", "이번에 고침", "펼침 메뉴에도 방문자별 줄 추가", "home|#aud"], ["첫 화면", "구역 제목 크기", "80px 세리프", "26px", "45px(1.4배 확대 화면)", "이미 갖춤", "", ""], ["메뉴·머리", "머리 높이", "119px(띠 52 + 메뉴 67)", "183px(첫 화면), 하위 102px", "151px(1.4배 확대 화면)", "이미 갖춤", "", ""], ["메뉴·머리", "큰 메뉴 수", "7개", "7개 + Our Difference", "6개", "이미 갖춤", "", ""], ["메뉴·머리", "메뉴 글자", "16px · 보통 굵기", "20px · 굵게(하위 17px)", "25px · 굵게(확대 화면)", "이미 갖춤", "v68에서 키움", ""], ["메뉴·머리", "펼침 메뉴 구성", "소개 한 문장 + 링크 4개 + 방문자별", "3단 전체 메뉴", "사진 + 소개 + 묶음별 링크 + '이런 분께'", "이번에 고침", "'이런 분께' 줄 추가", ""], ["메뉴·머리", "검색 위치", "맨 위 띠에 'How can we help?' 늘 보임", "머리 오른쪽 단추", "머리 '검색 Ctrl K' + 첫 화면 큰 검색 띠", "이미 갖춤", "", "home|#hsearch"], ["메뉴·머리", "언어 전환", "없음(영문만)", "KOR · ENG", "ENG", "이미 갖춤", "", ""], ["메뉴·머리", "내부 시스템 바로가기", "없음", "PORTAL · 발전기금", "포털 · ZEUS · 그룹웨어 · 웹메일", "이미 갖춤", "", ""], ["메뉴·머리", "오른쪽 빠른 버튼", "없음", "전체메뉴 · 검색 · QUICK MENU 원 버튼", "같은 구성", "이미 갖춤", "", ""], ["메뉴·머리", "'본문 바로가기' 링크", "있음", "있음", "있음 (키보드 첫 Tab)", "이번에 고침", "'본문 바로가기' 추가", ""], ["메뉴·머리", "고정 머리", "있음", "있음", "있음", "이미 갖춤", "", ""], ["메뉴·머리", "학교·학과 사이트 공통 띠", "모든 학교 사이트 맨 위 같은 'Stanford University' 띠", "없음", "디자인 규칙에 '학과 홈페이지 공통 띠' 부품", "이번에 고침", "공통 띠 부품을 만들어 디자인 규칙에 넣음", "guide|"], ["메뉴·머리", "대학 이름 표시", "글자 로고 30px", "POSTECH 로고", "GIST 공식 로고(CI)", "이미 갖춤", "", ""], ["메뉴·머리", "단축키(Ctrl+K)로 빠른 찾기", "없음", "없음", "있음", "이미 갖춤", "D안만 있음", ""], ["글자", "본문 글꼴", "Source Sans 3 (89%)", "Pretendard (93%)", "Pretendard GIST (85%)", "이미 갖춤", "", ""], ["글자", "제목 글꼴", "세리프 Edict (10%)", "아주 좁은 고딕 Field Gothic (7%)", "Anton (7%)", "이미 갖춤", "", ""], ["글자", "숫자 글꼴", "본문과 같음", "Roboto", "Inter Tight", "이미 갖춤", "", ""], ["글자", "본문 크기 분포(첫 화면)", "20px 37% · 16px 35%", "16px 30% · 20px 30%", "21~23px(확대 화면)", "이미 갖춤", "", ""], ["글자", "아주 작은 글자(14px 미만) 비율", "0%", "2%", "0%", "이미 갖춤", "", ""], ["글자", "큰 제목 줄간격", "1.10", "1.40(46px 제목)", "큰 제목 1.2 · 구역 제목 1.32", "이번에 고침", "1.36~1.60 → 조임", ""], ["글자", "하위 화면 큰 영문 제목", "'Academics' 171px", "'ACADEMICS' 115px · 줄간격 0.78", "Anton 큰 영문", "이미 갖춤", "", "p-4-3-1|"], ["글자", "하위 화면 한글 제목", "없음", "46px 굵게", "32~44px 굵게", "이미 갖춤", "", ""], ["글자", "카드 제목", "20px · 보통 굵기", "—", "15.5~20px · 굵게", "이미 갖춤", "", ""], ["글자", "뉴스 사이트 제목", "24px 세리프 굵게, 대표 43px", "24px", "지금, 지스트 큰 카드 제목", "이미 갖춤", "", "story|#sgrid"], ["글자", "본문 글자 색", "#111 45% · 회색 18%", "흰 글자 49%(검정 바탕)", "#111418 38% · 회색 12%", "이미 갖춤", "", ""], ["글자", "강조색 글자 비율", "2%", "7%", "5%", "이미 갖춤", "", ""], ["글자", "메뉴 굵기", "보통", "굵게", "굵게", "이미 갖춤", "", ""], ["글자", "영문 + 한글 함께 쓰기", "영문만", "영문 큰 글자 + 한글 제목", "영문 큰 글자 + 한글 제목", "이미 갖춤", "", ""], ["글자", "휴대폰 최소 글자", "12px까지 씀(390 실측, 본문 18px·구역 제목 40~56px)", "본문 14px·구역 제목 25px(390 실측)", "13px 아래로 줄이지 않음 · 본문 17px · 구역 제목 38px", "고침", "2026.11.12. PC 크롬을 390 폭으로 띄워 두 학교 첫 화면 실측 · D안은 v129·v135·v141에서 고침", ""], ["색·면", "대표색", "Cardinal #8C1515", "#C8005F", "GIST 레드 #DC2715", "이미 갖춤", "", ""], ["색·면", "맨 위 띠 색", "진한 빨강 #7A0000 + 빨강 메뉴 바", "검정", "빨강 띠 + 검정 줄", "이미 갖춤", "", ""], ["색·면", "연한 면", "#EAEAEA 넓게", "흰색 위주", "#F4F5F6", "이미 갖춤", "", ""], ["색·면", "어두운 면", "#111", "검정 첫 화면", "#111418 바닥글·숫자 구역", "이미 갖춤", "", ""], ["색·면", "쓰는 색 수", "대표색 1 + 회색", "대표색 1 + 회색", "레드 1 + 회색", "이미 갖춤", "", ""], ["색·면", "주 버튼", "빨강 알약 모양", "빨강 알약", "검정·빨강 알약", "이미 갖춤", "", ""], ["색·면", "사진 위 글자 가림막", "있음", "있음", "있음", "이미 갖춤", "", ""], ["색·면", "어두운 화면 모드", "없음", "없음", "없음", "해당 없음", "요청대로 만들지 않음", ""], ["간격·틀", "본문 폭 (아주 넓은 모니터 · 창 폭 2560px)", "약 1,500px (59%)", "1,600px (62%)", "약 1,600px (62%)", "이번에 고침", "큰 모니터에서 본문이 너무 넓게 퍼지지 않도록 폭 상한을 둠 (이전 약 1,900px · 67%)", ""], ["간격·틀", "구역 위아래 여백", "61 · 128px", "—", "98 ~ 168px", "이미 갖춤", "", ""], ["간격·틀", "카드 모서리", "12px 위주", "10 · 20 · 25px", "4종: 12 · 20 · 24px · 알약형", "이번에 고침", "5종(999·28·18·12·14px) → 4종으로 묶음", ""], ["간격·틀", "대학 상징 모양", "사진 위만 둥근 아치(220px)", "한 모서리만 둥근 카드", "'GIST 모서리' — 카드 사진의 오른쪽 위 한 귀퉁이를 비스듬히 깎음", "이번에 고침", "소식·학과 카드 사진에 적용, 디자인 규칙에 등록", "home|#p-h-news"], ["간격·틀", "카드 격자", "4열", "4열", "4열", "이미 갖춤", "", ""], ["간격·틀", "하위 화면 틀", "—", "사진 머리 + 왼쪽 메뉴 + 위치줄", "같은 틀", "이미 갖춤", "", "p-4-3-1|"], ["간격·틀", "위치 표시줄", "—", "홈 › 대분류 › 화면 (펼침)", "같음", "이미 갖춤", "", "p-4-3-1|"], ["간격·틀", "주소 복사·인쇄", "—", "있음", "있음", "이미 갖춤", "", ""], ["간격·틀", "세부 화면 담당 부서·수정일", "—", "있음(일부)", "모든 세부 화면 아래", "이미 갖춤", "", "p-4-3-1|"], ["간격·틀", "만족도 묻기", "—", "있음", "있음(4단계)", "이미 갖춤", "", ""], ["사진·영상", "첫 화면 사진 수", "22장", "70장", "33장", "이미 갖춤", "", ""], ["사진·영상", "큰 사진(화면 폭 30% 넘는 것)", "4장", "6장", "넘김 사진·학과 사진", "이미 갖춤", "", ""], ["사진·영상", "사진 비율", "3:2 · 정사각(지도 카드)", "여러 비율", "3:2 · 4:3", "이미 갖춤", "", ""], ["사진·영상", "사진 설명 글 (alt — 눈이 불편한 분께 읽어 주는 글)", "모든 사진에 장면 설명", "있음", "학과 대표 사진은 '○○학과 대표 사진', 장식 사진은 빈 설명", "이번에 고침", "학과 대표 사진에 설명 추가", "d-chem|"], ["사진·영상", "영상 자막", "모든 영상 자막 단추", "—", "유튜브 영상을 누르면 이 화면에서 자막을 켠 채로 재생", "이번에 고침", "자막이 있는 영상은 한국어 자막이 켜진 채로 열림 (GitHub판)", ""], ["사진·영상", "사진 저작권 표시", "없음", "없음", "사진마다 ©", "이미 갖춤", "D안이 더 엄격", ""], ["사진·영상", "인물 사진", "많이 씀", "많이 씀", "얼굴 사진 쓰지 않음", "이미 갖춤", "학교 사진 사용 허락(2026.11.11.)", ""], ["사진·영상", "사진 가볍게", "800px · 화질 60으로 줄여 보냄", "원본에 가까움", "jpg · 늦게 불러오기", "이미 갖춤", "", ""], ["소식", "뉴스 카드 구성", "분류 2단 + 제목 + 요약 + 읽는 시간 + 날짜", "제목 + 요약 + 날짜", "분류 + 제목 + 요약 + 날짜", "이미 갖춤", "", ""], ["소식", "읽는 시간 표시", "'6 min read'", "없음", "'원문 기사 약 N분 읽기' (25건 중 17건)", "이번에 고침", "원문 기사 글자 수 ÷ 1분에 500자로 계산. PDF·영상·인스타그램 8건은 표시 안 함", "story|"], ["소식", "대표 기사 배치", "큰 기사 1 + 옆 목록", "목록형", "큰 카드 + 격자", "이미 갖춤", "", "story|#sgrid"], ["소식", "분류 표시", "빨강 작은 글자", "칩", "꼬리표", "이미 갖춤", "", ""], ["소식", "뉴스 전용 공간", "Stanford Report 별도 사이트", "뉴스센터", "지금, 지스트", "이미 갖춤", "", "story|#scat"], ["소식", "기간 찾기", "—", "기간 검색", "월 단위 기간 검색", "이미 갖춤", "", "story|#scat"], ["소식", "분류 단추 (알약)", "둥근 화살표 단추 37px (Stanford Report 휴대폰)", "알약 단추 높이 33px(휴대폰)·50px(PC) · 글자 12.5px·16px", "알약 단추 높이 44px · 글자 14.5px(휴대폰)·15px(PC) · 분류 6종", "이번에 고침", "2026.11.13. 실측 · 표처럼 붙어 있던 칸을 알약으로 통일(v205)", "story|#scat"], ["소식", "더 보기 단추", "글자 있는 아래 줄 고리 ‘See all …’ 14px", "글자 있는 알약 ‘○○ 바로가기’ 높이 42px(휴대폰)·50px(PC) · 글자 13.5px·16px 굵게", "글자 있는 알약 ‘소식 더 보기 +’ 높이 44px(휴대폰)·52px(PC) · 글자 14.5px·15px 굵게", "이번에 고침", "2026.11.13. 두 학교 첫 화면 실측 · 두 곳 모두 그림만 있는 단추는 쓰지 않음 → ‘+’만 있던 단추에 글자를 붙임(v210)", "home|#pnmore"], ["소식", "소식 카드 제목 크기", "큰 기사 제목 31.6px(휴대폰)·54.6px(PC) · 가늘게(400) · 사진 3:2 · 모서리 0", "카드 제목 20.8px(휴대폰)·30px(PC) 굵게 · 날짜 11.4px·14px · 세로 사진 · 모서리 20px(한쪽 80px)", "카드 제목 20px(휴대폰·PC) 굵게 · 큰 카드 24px(휴대폰)·30px(PC) · 날짜 13px·15px · 모서리 24px", "이번에 고침", "2026.11.13. 두 학교 첫 화면 실측(Stanford Report는 자동 접속 차단 403으로 못 잼) · D안 휴대폰 카드 제목 17px→20px, 큰 카드 22px→24px, PC 18px→20px(v218)", "story|#sgrid"], ["소식", "소식 받기(구독)", "뉴스레터", "—", "RSS로 새 글 받기 + 유튜브·인스타그램·페이스북·블로그·링크드인 구독", "이번에 고침", "첫 화면 '새 소식 받기' 상자 추가", "home|.subs"], ["소식", "관련 글", "있음", "—", "있음", "이미 갖춤", "", "st-0|"], ["소식", "원문 기사 연결", "—", "—", "미디어센터 원문 링크", "이미 갖춤", "", "st-0|"], ["학과", "학교·학과 목록 화면", "7개 학교 소개", "학과 표(로고·전화·이메일·홈페이지)", "단과대학 카드 + 학과 목록", "이미 갖춤", "", "colleges|#cp2list"], ["학과", "학과 목록 한 줄 구성", "—", "로고 · 전화 · 이메일 · 홈페이지", "사진 · 소개 · 홈페이지 · 대학원 입학 · 학과 안 검색", "이미 갖춤", "", "colleges|#cp2list"], ["학과", "학과 사이트 연결", "학교별 별도 사이트", "학과별 별도 사이트", "학과 홈페이지로 연결", "이미 갖춤", "", ""], ["학과", "학과 소개 화면", "학교 사이트에서", "없음(외부 사이트)", "14곳 대표 홈페이지 안에", "이미 갖춤", "D안만 있음", "d-env1|"], ["학과", "학과 대표 사진", "학교 사이트 첫 화면", "로고", "각 학과 홈페이지 실사진 14곳", "이미 갖춤", "", "d-env1|"], ["학과", "단과대학 사이트 머리", "'Stanford ENGINEERING' + 공통 띠", "—", "공통 띠 규칙 (23번과 같음)", "이번에 고침", "23번과 같음", "guide|"], ["학과", "단과대학 첫 문장", "소개 문단 가운데 + 연구 버튼", "—", "단과대학 카드 소개", "이미 갖춤", "", ""], ["검색·AI", "검색 화면 검색창 (글자·모양)", "글자 20px · 상자 없이 아래 줄만 · 'How can we help?'", "글자 20px(휴대폰)·40px(PC) 굵게 · 어두운 바탕", "글자 20px(휴대폰)·22px(PC) 굵게 · 알약 모양 높이 58px·68px · 어두운 카드 ‘무엇이든, 물어봐.’", "이번에 고침", "2026.11.13. 두 학교 검색 화면을 390·1440 폭으로 열어 실측 · D안은 v204·v207에서 고침", "search|#sform"], ["검색·AI", "많이 찾는 말", "—", "입학·학사일정·증명서·장학금·학과", "많이 찾는 말", "이미 갖춤", "", "search|#res"], ["검색·AI", "연구자 찾기", "Stanford Profiles", "연구자 검색 메뉴", "사람 검색(업무·이메일만)", "이미 갖춤", "", "search|#scope"], ["검색·AI", "AI 안내", "없음", "없음", "출처 붙인 AI 안내", "이미 갖춤", "D안만 있음", "search|#chat"], ["검색·AI", "학과 홈페이지 내용 검색", "—", "—", "찾는 범위에 '학과 홈페이지'", "이미 갖춤", "지오넷 검토 중", "search|#scope"], ["바닥글", "바닥글 크기", "872px · 링크 53", "366px · 링크 17", "링크 33", "이미 갖춤", "", ""], ["바닥글", "바로 하기 줄", "Apply · Visit · Give · Reconnect", "—", "'바로 하기' 줄 (입학 지원·찾아오시는 길·유튜브·인스타그램)", "이번에 고침", "바닥글에 추가", "home|.ft-act"], ["바닥글", "채용 링크", "Work at Stanford", "—", "'채용공고' 링크 (현행 GIST 채용공고 화면)", "이번에 고침", "바닥글에 추가", "home|.fl"], ["바닥글", "비상·안전 정보", "Emergency Info", "—", "'안전관리' 링크 (GIST 안전관리 시스템)", "이번에 고침", "바닥글에 추가", "home|.fl"], ["바닥글", "접근성 문제 신고", "Accessibility 신고 링크", "—", "'화면 문제 알리기' 단추", "이번에 고침", "누르면 불편한 점을 적어 보내는 창이 열림", "home|#flRep"], ["바닥글", "이용약관·개인정보", "있음", "있음", "개인정보처리방침 · 이메일무단수집거부 (현행 GIST 문서 연결)", "이번에 고침", "바닥글 링크를 실제 문서로 연결", "home|.fl"], ["접근성·속도", "사진 설명 글이 빠진 사진 수", "0", "0", "0", "이미 갖춤", "", ""], ["접근성·속도", "화면 읽기 프로그램이 이름을 못 읽는 단추 수", "0", "8", "0", "이미 갖춤", "", ""], ["접근성·속도", "'움직임 줄이기' 설정을 켠 분께 화면 움직임 멈추기", "따름", "따르지 않음", "따름", "이미 갖춤", "", ""], ["접근성·속도", "화면 구역 이름표 (머리·메뉴·본문·바닥)", "모두", "본문 구역 표시 없음", "모두", "이미 갖춤", "", ""], ["접근성·속도", "첫 화면을 열 때 내려받는 양 (용량 · 파일 수)", "1.1MB · 81개", "56.8MB · 122개(영상)", "1.8MB · 13개", "이번에 고침", "바로 보이지 않는 사진은 화면에 가까워질 때 불러오도록 바꿈(이전 3.3MB · 39개). 남은 양의 대부분은 본문 글꼴", ""], ["접근성·속도", "첫 화면이 다 뜨는 데 걸린 시간", "0.46초", "0.67초", "0.45초", "이번에 고침", "첫 화면 구성이 끝난 시각(DOMContentLoaded). 같은 날 같은 방법으로 다시 잰 스탠퍼드 0.59초 (이전 D안 0.79초)", ""]];
function renderBench(){const host=$("#v-page");const ST=["이번에 고침","이미 갖춤","검토","해당 없음"];const cnt={};BENCH.forEach(b=>cnt[b[5]]=(cnt[b[5]]||0)+1);
 const cats=[...new Set(BENCH.map(b=>b[0]))];
 const kpi='<div class="rp-kpi" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">'+[["비교한 항목",BENCH.length,1]].concat(ST.filter(k=>cnt[k]).map(k=>[k,cnt[k],0])).slice(0,5).map(x=>'<div'+(x[2]?' class="r"':'')+'><b class="num">'+x[1]+'</b><span>'+esc(x[0])+'</span></div>').join("")+'</div>';
 const chips='<div class="seg bn-f" role="group" aria-label="상태로 거르기"><button type="button" aria-pressed="true" data-f="">전체 '+BENCH.length+'</button>'+ST.filter(k=>cnt[k]).map(k=>'<button type="button" aria-pressed="false" data-f="'+k+'">'+k+' '+cnt[k]+'</button>').join("")+'</div>';
 const rows=BENCH.map((b,i)=>'<tr data-st="'+esc(b[5])+'"><td class="num">'+(i+1)+'</td><td>'+esc(b[0])+'</td><th scope="row">'+esc(b[1])+'</th><td>'+esc(b[2])+'</td><td>'+esc(b[3])+'</td><td>'+esc(b[4])+'</td><td><span class="bn-st bn-'+["이번에 고침","이미 갖춤","검토","해당 없음"].indexOf(b[5])+'">'+esc(b[5])+'</span>'+(b[6]?'<small>'+esc(b[6])+'</small>':'')+'</td><td>'+(b[7]?'<a class="rp-go" href="#'+esc(b[7].split("|")[0])+'" data-go="'+esc(b[7])+'">보기 →</a>':'')+'</td></tr>').join("");
 host.innerHTML='<div class="page-h pv"><div class="pv-bg" aria-hidden="true"><img loading="lazy" src="'+IMG("p_night.jpg")+'" alt="" decoding="async"></div><div class="wrap"><span class="pv-en" aria-hidden="true">BENCHMARK 100</span><h1>스탠퍼드 · POSTECH 벤치마킹 100</h1><p>두 대학 홈페이지를 직접 열어 글자·색·간격·사진·속도까지 재고, D안과 100개 항목을 한 줄씩 나란히 놓고 비교한 결과입니다.</p></div></div>'+
 '<div class="wrap" style="padding-block:44px 90px"><div class="pg-main" style="max-width:none"><h2 class="pg-t">한눈에 보기</h2>'+kpi+
 '<h3 class="bn-h3">어떻게 비교했나요?</h3><ol class="bn-how"><li>2026년 11월 11일, 같은 컴퓨터의 크롬 브라우저로 <b>스탠퍼드대</b> 홈페이지 4개 화면(첫 화면·학업 안내·뉴스·공과대학)과 <b>POSTECH</b> 홈페이지 3개 화면(첫 화면·학과 소개·보도자료)을 열었습니다.</li><li>화면에 보이는 글자의 크기·굵기·색·글꼴, 메뉴와 카드의 크기·모서리 모양, 사진 수, 내려받는 양을 프로그램으로 하나하나 세었습니다.</li><li>D안도 같은 방법으로 재고, 100개 항목을 한 줄씩 나란히 놓았습니다.</li><li>두 대학보다 못한 항목은 D안을 바로 고쳤습니다.</li></ol><p class="note">알아 둘 점: D안은 큰 모니터에서 글자가 작아 보이지 않도록 화면을 1.4배 키워 보여 줍니다. 표의 D안 숫자는 이렇게 키운 화면 기준입니다. 두 대학의 휴대폰 화면은 재지 못했습니다.</p>'+
 '<details class="bn-gl"><summary>표에 나오는 말 풀이</summary><dl><dt>px (픽셀)</dt><dd>화면에서 글자·간격 크기를 세는 단위입니다. 보통 본문 글자는 16px 안팎입니다.</dd><dt>줄간격</dt><dd>글자 크기에 견준 줄과 줄 사이 높이입니다. 1.2는 글자 크기의 1.2배라는 뜻입니다.</dd><dt>세리프 글꼴</dt><dd>글자 끝에 작은 삐침이 있는 글꼴입니다(명조체 느낌).</dd><dt>알약형</dt><dd>양 끝이 완전히 둥근 단추·꼬리표 모양입니다.</dd><dt>alt (사진 설명 글)</dt><dd>화면을 소리로 읽어 주는 프로그램이 사진 대신 읽어 주는 글입니다.</dd><dt>RSS</dt><dd>새 글이 올라오면 구독 앱으로 자동으로 받아 보는 주소입니다.</dd><dt>MB (메가바이트)</dt><dd>화면을 열 때 내려받는 데이터 크기입니다. 작을수록 빨리 뜹니다.</dd><dt>접근성</dt><dd>장애가 있거나 나이가 많은 분도 불편 없이 쓸 수 있는 정도입니다.</dd></dl></details>'+
 '<div class="bn-leg"><span class="bn-st bn-0">이번에 고침</span> 비교해 보고 D안에서 고친 것(v70~v73) <span class="bn-st bn-1">이미 갖춤</span> 처음부터 두 대학과 같거나 더 나은 것 <span class="bn-st bn-3">해당 없음</span> 위원회 요청으로 만들지 않기로 한 것</div>'+chips+
 '<div class="tbl-w" tabindex="0" role="region" aria-label="벤치마킹 100항목 표"><table class="tbl bn-t"><thead><tr><th scope="col">번호</th><th scope="col">분야</th><th scope="col">비교한 것</th><th scope="col">스탠퍼드대</th><th scope="col">POSTECH</th><th scope="col">D안 (지금)</th><th scope="col">결과 · 한 일</th><th scope="col">화면 보기</th></tr></thead><tbody>'+rows+'</tbody></table></div>'+
 '<p class="note" style="margin-top:18px">분야: '+cats.map(c=>esc(c)+' '+BENCH.filter(b=>b[0]===c).length).join(" · ")+'. 두 대학 값은 2026.11.11. 화면 기준이며, 그 뒤 두 대학이 홈페이지를 바꾸면 달라질 수 있습니다.</p></div></div>';
 document.title="벤치마킹 100 | GIST 홈페이지 D안";if(typeof icons==="function")icons();}
document.addEventListener("click",e=>{const b=e.target.closest(".bn-f button");if(!b)return;$$(".bn-f button").forEach(x=>x.setAttribute("aria-pressed",x===b));const f=b.dataset.f;$$(".bn-t tbody tr").forEach(tr=>{tr.hidden=!!f&&tr.dataset.st!==f;});});
{const _r5=route;route=function(){if((LH()||"")==="#bench"){$$(".view").forEach(v=>v.classList.toggle("on",v.id==="v-page"));renderBench();scrollTo({top:0});typeof heroState==="function"&&heroState();return;}_r5();};}
addEventListener("hashchange",()=>{if(LH()==="#bench")route();});
if(LH()==="#bench")setTimeout(route,0);
/* ===== v71 갖춤 올리기 ===== */
window.__STORIES=STORIES;
const TOPICS=[["AI","인공지능",/AI|인공지능|딥러닝|머신러닝|LLM|에이전트/i,"d_ai.jpg"],["CHIP","반도체·양자",/반도체|양자|소자|칩|광검출|웨이퍼/,"r_quantum.jpg"],["ENERGY","에너지·환경",/에너지|풍력|배터리|탄소|기후|환경|태양/,"d_env1.jpg"],["BIO","생명·의료",/생명|의료|의생명|심장|통증|단백질|뇌|약물|하이드로젤|암/,"d_bmse.jpg"]];
function renderTopics(){const h=$("#ptopics");if(!h)return;h.innerHTML=TOPICS.map(t=>{const L=STORIES.filter(s=>t[2].test(s.t+" "+(s.body||"")));const last=L[0];
 return '<a href="#search" data-q="'+esc(t[1].split("·")[0])+'"><img src="'+IMG(t[3])+'" alt="" loading="lazy"><span class="k">'+t[0]+'</span><b>'+esc(t[1])+'</b><span class="n">관련 소식 '+L.length+'건</span><em>'+(last?'최근: '+esc(last.t):'')+'</em></a>'}).join("");
 const lb=$("#plabs");if(lb&&typeof labsHTML==="function")lb.innerHTML=labsHTML();icons&&icons();}
renderTopics();
document.addEventListener("click",e=>{const a=e.target.closest("#ptopics a[data-q]");if(!a)return;e.preventDefault();const q=$("#q");if(q)q.value=a.dataset.q;location.hash="search";setTimeout(()=>{if(q)q.value=a.dataset.q;typeof runSearch==="function"&&runSearch();},120);});
/* 유튜브: 누르면 자막 켠 채로 이 화면에서 재생 (GitHub판), 아티팩트판은 새 창 */
const YTOK=/github\.io$/.test(location.hostname)||location.protocol==="file:";
function ytId(u){const m=String(u).match(/(?:youtu\.be\/|v=|\/shorts\/|\/embed\/)([A-Za-z0-9_-]{11})/);return m?m[1]:null;}
document.addEventListener("click",e=>{const a=e.target.closest("a[href]");if(!a||!YTOK)return;const id=ytId(a.getAttribute("href"));if(!id)return;e.preventDefault();
 const d=document.createElement("div");d.className="ytm";d.setAttribute("role","dialog");d.setAttribute("aria-modal","true");d.setAttribute("aria-label","유튜브 영상");
 d.innerHTML='<div class="ytm-in"><iframe src="https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&cc_load_policy=1&cc_lang_pref=ko&hl=ko&rel=0" title="GIST 유튜브 영상 (자막 켬)" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe><div class="ytm-bar"><span>자막이 켜진 채로 재생됩니다 · <a href="https://www.youtube.com/watch?v='+id+'" target="_blank" rel="noopener noreferrer">유튜브에서 보기 ↗</a></span><button type="button">닫기</button></div></div>';
 const close=()=>{d.remove();a.focus();};d.addEventListener("click",x=>{if(x.target===d||x.target.tagName==="BUTTON")close();});d.addEventListener("keydown",x=>{if(x.key==="Escape")close();});document.body.appendChild(d);d.querySelector("button").focus();},true);
/* 화면 문제 알리기 */
document.addEventListener("click",e=>{if(!e.target.closest("#flRep"))return;const d=document.createElement("div");d.className="repd";d.setAttribute("role","dialog");d.setAttribute("aria-modal","true");
 d.innerHTML='<form><h3>이 화면의 문제 알리기</h3><p class="msg">글자가 안 보이거나, 키보드로 누를 수 없거나, 내용이 틀린 곳을 적어 주세요. 지금 보던 화면 주소가 함께 담깁니다.</p><label for="repT" class="msg">무엇이 불편했나요?</label><textarea id="repT" required></textarea><p class="msg" id="repM" role="status"></p><div class="row"><button type="button" data-x="1">닫기</button><button type="submit" class="pri">보내기</button></div></form>';
 const close=()=>d.remove();d.addEventListener("click",x=>{if(x.target===d||x.target.dataset.x)close();});
 d.querySelector("form").addEventListener("submit",async x=>{x.preventDefault();const t=d.querySelector("#repT").value.trim();if(!t)return;const m=d.querySelector("#repM");const rec={t:t.slice(0,1000),page:LH()||"#home",at:new Date().toISOString(),ua:navigator.userAgent.slice(0,120)};
  let ok=false;try{if(window.claude&&claude.use){const db=await claude.use("db");if(db){await db.collection("reports").doc(String(Date.now())).set(rec);ok=true;}}}catch(_){}
  if(ok){m.textContent="보냈습니다. 고맙습니다! 담당자가 확인합니다.";setTimeout(close,1600);}
  else{try{await navigator.clipboard.writeText("[GIST 홈페이지 화면 문제] "+rec.page+"\n"+rec.t);}catch(_){}m.innerHTML="적은 내용을 복사해 두었습니다. <a href=\"https://github.com/yhju-gist/gist-homepage-d/issues/new\" target=\"_blank\" rel=\"noopener noreferrer\">시안 저장소 의견 남기기 ↗</a>에 붙여 넣어 주시거나 대표전화 062-715-2114로 알려 주세요.";}});
 document.body.appendChild(d);d.querySelector("textarea").focus();});
/* RSS 주소: 아티팩트판에서는 주소를 복사 */
document.addEventListener("click",e=>{const a=e.target.closest("a[data-rss]");if(!a)return;if(/github\.io$/.test(location.hostname))return;e.preventDefault();const u="https://yhju-gist.github.io/gist-homepage-d/feed.xml";try{navigator.clipboard.writeText(u)}catch(_){}a.innerHTML='<i data-lucide="check"></i>RSS 주소 복사됨';icons&&icons();});

if(LH()==="#guide")setTimeout(route,0);
/* ===== 학과 소개(현행 GIST 홈페이지 ‘대학·학과’ 원문, 2026.11.11. 확인) ===== */
var CIMG=["p_aerial_day.jpg","r_quantum.jpg","p_curve.jpg","r_pain.jpg"];
var CEN2=["COLLEGE OF AI","COLLEGE OF NATURAL SCIENCES","COLLEGE OF ENGINEERING","COLLEGE OF LIFE & MEDICAL SCIENCES"];
function deptByCode(code){for(const n in DEPT)if(DEPT[n].code===code)return n;return null;}
function deptCol(n){return COLLEGES.findIndex(c=>c.d.includes(n));}
function dnews(n){const k1=n,k2=n.replace(/·/g,"");const L=STORIES.map((x,i)=>[x,i]).filter(([x])=>{const t=x.s+" "+x.t;return t.includes(k1)||t.includes(k2);}).slice(0,3);
 if(!L.length)return "";return '<h3 class="p-h3">학과 소식 <small>지금, 지스트에서 '+L.length+'건</small></h3><div class="dnw">'+L.map(([x,i])=>'<a href="#st-'+i+'"><span class="gk">'+esc(x.c)+' · <span class="num">'+esc(x.d||x.m)+'</span></span><b>'+esc(x.t)+'</b>'+(x.sum&&x.sum[0]?'<p>'+esc(x.sum[0].length>80?x.sum[0].slice(0,80)+"…":x.sum[0])+'</p>':'')+'</a>').join("")+'</div>';}
function renderDept(n){const D0=DEPT[n],ci=deptCol(n),C=COLLEGES[ci];const host=$("#v-page");
 const dd=(id,label,items)=>'<li><button type="button" class="dd" aria-expanded="false" aria-controls="'+id+'">'+esc(label)+'</button><ul class="ddl" id="'+id+'" hidden>'+items+'</ul></li>';
 const colItems=COLLEGES.map((c,i)=>'<li><a href="#d-'+DEPT[c.d[0]].code+'"'+(i===ci?' aria-current="page"':'')+'>'+esc(c.n)+'</a></li>').join("");
 const sibItems=C.d.map(x=>'<li><a href="#d-'+DEPT[x].code+'"'+(x===n?' aria-current="page"':'')+'>'+esc(x)+'</a></li>').join("");
 const lnb='<nav class="lnb" aria-label="'+esc(C.n)+' 학과"><h2>'+esc(C.n)+'</h2><ul>'+COLLEGES.map((c,i)=>'<li><a href="#d-'+DEPT[c.d[0]].code+'"'+(i===ci?' aria-current="page"':'')+'>'+esc(c.n)+'</a>'+(i===ci?'<div class="sub">'+c.d.map(x=>'<a href="#d-'+DEPT[x].code+'"'+(x===n?' class="cur" aria-current="page"':'')+'>'+esc(x)+'</a>').join("")+'</div>':'')+'</li>').join("")+'</ul><a class="lnb-all" href="#colleges">전체 학과 보기 →</a></nav>';
 const nA=D0.areas.length,nI=D0.areas.reduce((a,x)=>a+(x[3]||[]).length,0);
 const intro=(D0.intro||[]).map(t=>'<p>'+esc(t)+'</p>').join("")+((D0.pts&&D0.pts.length)?'<ul class="dpts">'+D0.pts.map(t=>'<li>'+esc(t)+'</li>').join("")+'</ul>':'');
 const areas=nA?'<h3 class="p-h3">연구 분야 <small>'+nA+'개 분야'+(nI?' · 세부 '+nI+'개':'')+'</small></h3><div class="dar">'+D0.areas.map((a,k)=>'<article class="dac"><span class="dac-n num" aria-hidden="true">'+String(k+1).padStart(2,"0")+'</span><h4>'+esc(a[0])+'</h4>'+(a[1]?'<span class="dac-en">'+esc(a[1])+'</span>':'')+(a[2]?'<p>'+esc(a[2])+'</p>':'')+((a[3]&&a[3].length)?'<ul>'+a[3].map(t=>'<li>'+esc(t)+'</li>').join("")+'</ul>':'')+(!a[2]&&!(a[3]&&a[3].length)?'<p class="dac-x">세부 내용은 학과 홈페이지에서 확인</p>':'')+'</article>').join("")+'</div>':'<div class="slot sm" style="margin-top:28px"><b>연구 분야</b><p>현행 GIST 홈페이지 학과 소개에 연구 분야가 적혀 있지 않아 비워 두었습니다. 학과 홈페이지에서 확인해 주세요.</p></div>';
 const act='<div class="dact"><a class="dbtn pri" href="'+esc(D0.hp)+'"'+EXT+'><i data-lucide="house"></i><span><b>학과 홈페이지</b><small>'+esc(D0.hp.replace(/^https:\/\//,"").replace(/\/$/,""))+'</small></span></a><a class="dbtn" href="https://www.gist.ac.kr/gadm/"'+EXT+'><i data-lucide="graduation-cap"></i><span><b>대학원 입학</b><small>석사·박사·통합</small></span></a><a class="dbtn" href="#p-4-0-0"><i data-lucide="calendar"></i><span><b>학사일정</b><small>D안 세부페이지</small></span></a><a class="dbtn" href="#search" data-q="'+esc(n.replace(/학과$/,"").replace("대학원",""))+'"><i data-lucide="search"></i><span><b>학과 안 검색</b><small>통합검색 ‘학과 홈페이지’</small></span></a></div>';
 const contact='<h3 class="p-h3">학과 사무실</h3><div class="dcon"><div><span>전화</span><b class="num">'+esc(D0.tel||"[확인 필요]")+'</b></div>'+(D0.fax?'<div><span>팩스</span><b class="num">'+esc(D0.fax)+'</b></div>':'')+'<div><span>이메일</span><b>'+esc(D0.mail||"[확인 필요]")+'</b></div><div><span>홈페이지</span><a href="'+esc(D0.hp)+'"'+EXT+'>'+esc(D0.hp.replace(/^https:\/\//,"").replace(/\/$/,""))+' ↗</a></div></div>';
 const ODR=(typeof ORGDIR!=="undefined"?ORGDIR:[]).filter(r=>r[0]===n);const odStaff=ODR.filter(r=>!/^(교수|조교수|부교수|석좌교수|명예교수|교수\/.*|.*교수)$/.test(String(r[2]).trim()));const odProf=ODR.length-odStaff.length;
 const offc=ODR.length?'<h3 class="p-h3">학과 업무·내선 <small>현행 직원검색 '+ODR.length+'건</small></h3><ul class="od-rows dof">'+(function(){const G=[],M={};odStaff.forEach(r=>{const k=String(r[2]||"(업무 미기재)").trim();if(!M[k]){M[k]={k,e:[]};G.push(M[k]);}M[k].e.push(String(r[1]));});return G.slice(0,10).map(g=>'<li><div class="od-rd"><span>'+esc(g.k)+(g.e.length>1?' <small class="dof-n">'+g.e.length+'명</small>':'')+'</span></div><span class="dof-t">'+g.e.map(e=>'<a class="od-tel num" href="tel:062-715-'+e.split(/[\/, ]/)[0]+'">T.'+esc(e)+'</a>').join("")+'</span></li>').join("");})()+'</ul><button type="button" class="pill dof-all" data-od="'+esc(n)+'">'+(odProf?'교수 '+odProf+'명 내선 포함 ':'')+'전체 '+ODR.length+'건 보기 →</button>':'';
 const sibs='<section class="prel"><h3>'+esc(C.n)+'의 다른 학과</h3><div class="prel-g">'+C.d.filter(x=>x!==n).map(x=>'<a href="#d-'+DEPT[x].code+'"><b>'+esc(x)+'</b><i data-lucide="arrow-up-right"></i></a>').join("")+'</div></section>';
 const src='<p class="note">학과 소개·연구 분야·연락처는 현행 GIST 홈페이지 ‘대학·학과 › '+esc(n)+'’ 원문을 그대로 옮겼습니다 (2026.11.11. 확인) · <a href="https://www.gist.ac.kr/kr/html/sub03/'+D0.pg+'.html"'+EXT+'>원문 보기 ↗</a></p>';
 const sat='<section class="psat" aria-label="페이지 만족도"><b>이 화면의 정보가 도움이 되었나요?</b><div class="psat-b" role="group" aria-label="만족도 고르기">'+["매우 만족","만족","보통","불만족"].map(v=>'<button type="button" data-sat="'+v+'">'+v+'</button>').join("")+'</div><p class="psat-m" role="status">[시안] 고른 결과는 저장하지 않습니다. 구축 때 담당 부서 집계로 연결합니다.</p></section>';
 host.innerHTML='<div class="page-h dhero2 c'+ci+'">'+dphoto(D0.code,ci,'dh2-bg')+'<div class="wrap dh2-in"><span class="dh2-col">'+esc(CEN2[ci])+'</span><span class="dh2-w" aria-hidden="true">'+esc(DWD[D0.code]||"")+'</span><h1>'+esc(n)+'</h1><p class="dh2-e">'+esc(D0.e||C.n)+'</p>'+(D0.slo?'<p class="dh2-s">'+esc(D0.slo)+'</p>':'')+(D0.areas.length?'<div class="dh2-ch">'+D0.areas.slice(0,5).map(x=>'<span>'+esc(x[0])+'</span>').join("")+'</div>':'')+'</div><span class="dh2-cr">'+(/^d_/.test(DPH[D0.code]||'')?'사진 © '+esc(n)+' 홈페이지':'사진 © GIST')+'</span></div>'+
  '<nav class="pbar" aria-label="현재 위치"><div class="wrap"><a class="home" href="#home" aria-label="홈으로"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M3 11 12 4l9 7v9h-6v-6H9v6H3z"/></svg></a><ol><li><a class="dd" style="padding:8px 6px" href="#colleges">대학·학과</a></li>'+dd("pdc",C.n,colItems)+dd("pdd",n,sibItems)+'</ol><span class="tools"><span class="pb-st" role="status"></span><button type="button" class="cp" aria-label="이 화면 주소 복사"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg></button><button type="button" class="pr" aria-label="이 화면 인쇄"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V3h12v6M6 18H4v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6h-2"/><rect x="6" y="14" width="12" height="7"/></svg></button></span></div></nav>'+
  '<div class="wrap"><div class="lnbw">'+lnb+'<div class="lnb-main pg-main"><div class="dhd"><div><span class="eyebrow">'+esc(C.n)+'</span><h2 class="pg-t" style="margin:4px 0 0">'+esc(n)+'</h2>'+(D0.e?'<p class="den">'+esc(D0.e)+'</p>':'')+'</div></div>'+(D0.slo?'<p class="dslo">'+esc(D0.slo)+'</p>':'')+(intro?'<div class="dint">'+intro+'</div>':'<div class="slot sm"><b>학과 소개</b><p>현행 GIST 홈페이지 학과 소개 화면에 소개글이 없어 비워 두었습니다. 학과 홈페이지에서 확인해 주세요.</p></div>')+act+areas+nxDept(n)+apDeptBtns(n)+deptWays(n)+dnews(n)+contact+offc+src+sat+sibs+'</div></div></div>';
 document.title=n+" | GIST 홈페이지 D안";icons();}
{const _r2=route;route=function(){const m=(LH()||"").match(/^#d-([a-z0-9]+)$/);const n=m&&deptByCode(m[1]);if(n){$$(".view").forEach(v=>v.classList.toggle("on",v.id==="v-page"));$$(".gnb a").forEach(a=>a.classList.toggle("on",+a.dataset.m===1));renderDept(n);scrollTo({top:0});heroState&&heroState();return;}_r2();};}
addEventListener("hashchange",()=>{if(/^#d-/.test(LH()||""))route();});
if(/^#d-/.test(LH()||""))setTimeout(route,0);

/* v100 GIST NOW 행사·사업 (현행 미디어센터 Events, 2026.11.11. 확인) + 화면별 담당·확인일 띠 */
{const EV=[
 {k:"행사",t:"GIST 한국문화기술연구소, AI·문화기술 융합 포럼",d0:"2026-12-02",d1:"2026-12-02",w:"12.2.(수) 10:20~17:30 · 서울",o:"한국문화기술연구소",no:224645,p:"2026.11.11."},
 {k:"전시",t:"GIST 오룡아트홀 신도원 작가 초대전 《아직 경험하지 못한 감각의 순간들》",d0:"2026-11-02",d1:"2026-12-30",w:"11.2.(월)~12.30. · 오룡아트홀",o:"GIST 오룡아트홀",no:224546,p:"2026.11.03."},
 {k:"축제",t:"시민과 함께하는 ‘2026 과학기술문화 페스타’",d0:"2026-11-05",d1:"2026-11-26",w:"11.5.(목)~11.26.(목) · GIST 캠퍼스",o:"GIST",no:224454,p:"2026.10.28."},
 {k:"사업",t:"‘빅스포(BIXPO) 2026’서 ‘전남광주 에너지 이노베이션 컨퍼런스’ 개최",d0:"2026-11-05",d1:"2026-11-05",w:"11.5.(목) · 김대중컨벤션센터",o:"GIST",no:224601,p:"2026.11.06."},
 {k:"행사",t:"‘첨단분석과학 심포지엄’ — 차세대 배터리·소재 분석기술 교류",d0:"2026-11-04",d1:"2026-11-04",w:"11.4.(수) · 중앙기기연구소 208호",o:"중앙기기연구소",no:224582,p:"2026.11.05."},
 {k:"협력",t:"고등광기술연구원, 스위스 베른대에 공동연구사무소 개소",d0:"2026-10-23",d1:"2026-10-23",w:"10.23.(금, 현지) · 스위스 베른대",o:"고등광기술연구원",no:224442,p:"2026.10.28."},
 {k:"행사",t:"제65회 GIST아카데미 조찬포럼",d0:"2026-10-26",d1:"2026-10-26",w:"10.26.(월)",o:"GIST아카데미",no:224441,p:"2026.10.28."}];
 const g=$("#gnowg");if(g){const T=new Date();T.setHours(0,0,0,0);const dd=x=>new Date(x+"T00:00:00");
  const st=e=>{const a=dd(e.d0),b=dd(e.d1);if(T<a)return ["up",Math.round((a-T)/864e5)];if(T<=b)return ["on",0];return ["past",0];};
  const L=EV.map(e=>({e,s:st(e)})).sort((x,y)=>{const o={on:0,up:1,past:2};return o[x.s[0]]-o[y.s[0]]||(x.s[0]==="past"?dd(y.e.d1)-dd(x.e.d1):dd(x.e.d0)-dd(y.e.d0));});
  const lab=s=>s[0]==="up"?'<span class="gn-st up">D-'+s[1]+'</span>':s[0]==="on"?'<span class="gn-st on">진행 중</span>':'<span class="gn-st past">지난 소식</span>';
  const cardH=({e,s},i)=>'<a class="gn-c'+(i===0?' big':'')+(s[0]==="past"?' is-past':'')+'" href="https://www.gist.ac.kr/kr/html/sub07/070103.html?mode=V&no='+e.no+'"'+EXT+'><span class="gn-top"><span class="gn-k">'+esc(e.k)+'</span>'+lab(s)+'</span><b>'+esc(e.t)+'</b><span class="gn-w"><i aria-hidden="true">'+'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>'+'</i>'+esc(e.w)+'</span><span class="gn-o">'+esc(e.o)+' · 게시 '+esc(e.p)+' ↗</span></a>';
  g.innerHTML=L.slice(0,5).map(cardH).join("")+(L.length>5?'<ul class="gn-more">'+L.slice(5).map(({e,s})=>'<li><a href="https://www.gist.ac.kr/kr/html/sub07/070103.html?mode=V&no='+e.no+'"'+EXT+'>'+lab(s)+'<span class="gn-mk">'+esc(e.k)+'</span><b>'+esc(e.t)+'</b><span class="gn-mw">'+esc(e.w)+'</span></a></li>').join("")+'</ul>':'');}}
function vsDue(t){const m=/(\d{4})\.(\d{1,2})\.(\d{1,2})\./.exec(t||"");if(!m)return "";const d=new Date(+m[1],+m[2]-1+6,1),n=new Date();const late=n>=new Date(d.getFullYear(),d.getMonth()+1,1);return '<span class="vs-t vs-due'+(late?' late':'')+'">'+(late?'점검할 때가 지났습니다 · ':'')+'다음 점검 '+d.getFullYear()+'.'+(d.getMonth()+1)+'.</span>';}
{const VS={
 tutorial:[["학적팀",[["교과과정·증명서","2053"],["대학 학적","2057"],["대학원 학적","2052"]]],"GIST 학사공지 원문 (2026.11.5. 수집)"],
 story:[["대외홍보팀",[["국내 언론홍보","2062"],["온라인 홍보·홈페이지","2063"]]],"GIST 미디어센터 게시판·언론 보도 원문 (2026.11.11. 확인)"],
 search:[["정보운영팀",[["통합홈페이지","2071"]]],"현행 홈페이지 직원검색 686건·학과 홈페이지 교수진 (2026.11.11. 확인)"],
 colleges:[["각 학과 사무실",[]],"현행 홈페이지 ‘대학·학과’ 원문 (2026.11.11. 확인)"]};
 Object.keys(VS).forEach(v=>{const host=$("#v-"+v);if(!host||host.querySelector(".vstrip"))return;const [d,tels]=VS[v][0];const el=document.createElement("div");el.className="wrap vstrip";el.setAttribute("role","note");el.setAttribute("aria-label","이 화면 정보");
  el.innerHTML='<div><span>담당 부서</span><b>'+esc(d)+'</b>'+(tels.length?'<span class="vs-t">'+tels.map(t=>'<a class="num" href="tel:062-715-'+t[1]+'">'+esc(t[0])+' T.'+t[1]+'</a>').join("")+'</span>':'<span class="vs-t"><a href="#colleges">학과 화면마다 전화번호</a></span>')+'</div><div><span>자료·확인일</span><b>'+esc(VS[v][1])+'</b>'+vsDue(VS[v][1])+'</div><div><span>정보가 틀렸다면</span><b>담당 부서로 알려 주세요</b><span class="vs-t">구축 때는 관리자 모드에서 바로 고칩니다</span></div>';host.appendChild(el);});}
/* v103 세부 화면 고도화 (스탠퍼드식: 첫 문장 → 한눈에 → 단계·카드 → 담당 연락처 → 더 보기) · 내용은 현행 GIST 홈페이지 원문(2026.11.11. 확인) */
(function(){
 const tl=e=>"062-715-"+String(e).split(/[\/, ]/)[0];
 window.skContact=function(dept,re,title){const R=ORGDIR.filter(r=>r[0]===dept&&(!re||re.test(r[2])));if(!R.length)return "";const all=ORGDIR.filter(r=>r[0]===dept).length;
  return '<section class="sk-con" aria-label="'+esc(title||dept)+' 연락처"><div class="sk-con-h"><span class="eyebrow">CONTACT</span><h3>'+esc(title||dept)+'</h3></div><ul>'+R.slice(0,6).map(r=>'<li><span>'+esc(r[2])+'</span><a class="num" href="tel:'+tl(r[1])+'">T.'+esc(r[1])+'</a></li>').join("")+'</ul><button type="button" class="pill" data-od="'+esc(dept)+'">'+esc(dept)+' 업무 '+all+'건 모두 보기 →</button></section>';};
 const step=(a)=>'<ol class="sk-steps">'+a.map((x,i)=>'<li><span class="num">'+String(i+1).padStart(2,"0")+'</span><b>'+esc(x[0])+'</b>'+(x[1]?'<p>'+esc(x[1])+'</p>':'')+'</li>').join("")+'</ol>';
 const cards=(a)=>'<div class="sk-cards">'+a.map(x=>'<a class="sk-card" href="'+esc(x[2])+'"'+(/^http/.test(x[2])?EXT:'')+'><span class="sk-k">'+esc(x[3]||"")+'</span><b>'+esc(x[0])+'</b><p>'+esc(x[1])+'</p><span class="sk-go">'+(/^http/.test(x[2])?'바로가기 ↗':'보기 →')+'</span></a>').join("")+'</div>';
 const src=t=>'<p class="note">출처: '+t+' (2026.11.11. 확인)</p>';
 /* 찾아오시는 길 */
 const WAY=[["자가운전","호남고속도로",[["하행선 · 광주요금소","광주요금소를 지나 4km 지점에서 광산 IC(하남, 첨단단지)로 우회전 → 첨단단지 방향으로 다시 우회전 → 지하도를 지나 1km 직진하면 왼쪽에 GIST","약 10분"],["상행선 · 동광주요금소","동광주요금소를 지나 광산 IC(하남, 첨단단지)로 우회전 → 첨단단지 방향으로 다시 우회전 → 지하도를 지나 1km 직진하면 왼쪽에 GIST","약 20분"]]],
  ["항공","광주공항",[["택시","도착 후 출구 앞에서 택시 탑승 (짧게 가는 버스 노선이 없어 택시 추천)","약 20분"]]],
  ["KTX·SRT","광주송정역",[["택시","하차 후 택시 승강장에서 탑승 (택시 추천)","약 20분"],["버스","송정33(지선) 과기원 정류장 하차 · 마을720 첨단사거리 정류장 하차 · 마을700 쌍암공원 정류장 하차","약 60~80분"]]],
  ["고속버스","비아임시하차장 · 광주종합버스터미널(유스퀘어)",[["비아임시하차장 → 택시","탑승 때 비아임시하차장 하차 가능 여부 확인 필요","약 10분"],["유스퀘어 → 택시","하차 후 택시 승강장에서 탑승 (택시 추천)","약 30분"],["유스퀘어 → 버스","첨단09(급행) 쌍암공원 정류장 · 매월16(간선) 과기원 정류장 · 첨단30(간선) 과기원 정류장 하차","약 60~90분"]]]];
 PBODY["찾아오시는 길"]=()=>'<p class="p-lead">광주 북구 첨단과학산업단지 안, 호남고속도로 광산 IC에서 가깝습니다. 기차·비행기로 오시면 택시가 가장 빠릅니다.</p>'+
  '<div class="sk-addr"><div><span class="eyebrow">ADDRESS</span><b>(61005) 전남광주통합특별시 북구 첨단과기로 123 (오룡동)</b><span>대표전화 <a class="num" href="tel:062-715-2114">062-715-2114</a> · 팩스 <span class="num">062-715-2300</span></span></div><div class="sk-addr-b"><a class="pill red" href="https://map.naver.com/p/search/%EA%B4%91%EC%A3%BC%EA%B3%BC%ED%95%99%EA%B8%B0%EC%88%A0%EC%9B%90"'+EXT+'>네이버 지도 ↗</a><a class="pill" href="https://map.kakao.com/?q=%EA%B4%91%EC%A3%BC%EA%B3%BC%ED%95%99%EA%B8%B0%EC%88%A0%EC%9B%90"'+EXT+'>카카오맵 ↗</a><button type="button" class="pill" data-cp="전남광주통합특별시 북구 첨단과기로 123">주소 복사</button></div></div>'+
  '<div class="kpi k3 sk-k3"><div><span class="eyebrow">광산 IC에서</span><b class="num">10</b><span>분 안팎 · 자가운전</span></div><div><span class="eyebrow">광주송정역 KTX·SRT</span><b class="num">20</b><span>분 안팎 · 택시</span></div><div><span class="eyebrow">광주공항</span><b class="num">20</b><span>분 안팎 · 택시</span></div></div>'+
  '<div class="sk-tabs" role="tablist" aria-label="오는 방법">'+WAY.map((w,i)=>'<button type="button" role="tab" id="skw-t'+i+'" aria-controls="skw-p'+i+'" aria-selected="'+(i===0)+'" data-skw="'+i+'">'+esc(w[0])+'</button>').join("")+'</div>'+
  WAY.map((w,i)=>'<div class="sk-panel" role="tabpanel" id="skw-p'+i+'" aria-labelledby="skw-t'+i+'"'+(i?' hidden':'')+'><p class="sk-from">'+esc(w[1])+'에서</p><ul class="sk-route">'+w[2].map(r=>'<li><b>'+esc(r[0])+'</b><p>'+esc(r[1])+'</p><span class="num">'+esc(r[2])+'</span></li>').join("")+'</ul></div>').join("")+
  '<h3 class="p-h3">캠퍼스에 오시면</h3>'+cards([["3D 캠퍼스맵","건물 위치를 미리 확인하세요.","#p-0-3-1","CAMPUS"],["캠퍼스 투어","단체 견학은 미리 신청합니다.","#p-2-3-0","TOUR"],["오룡관 예약","회의·숙박 시설 예약 안내","#p-0-3-2","FACILITY"]])+
  src("현행 GIST 홈페이지 ‘About GIST › 소개 › 찾아오시는길’");
 document.addEventListener("click",e=>{const t=e.target.closest("[data-skw]");if(!t)return;const i=t.dataset.skw;t.parentElement.querySelectorAll("[data-skw]").forEach(b=>b.setAttribute("aria-selected",b===t));document.querySelectorAll(".sk-panel").forEach(p=>p.hidden=p.id!=="skw-p"+i);});
 /* 조직도 */
 const T=[["이사회",[["감사부"],["감사"]]],["총장",[["미래전략실"],["교학부총장",[["대학지원실"],["AI대학",[["AI학과"],["AX학과"],["전기전자컴퓨터공학과"],["반도체공학과"],["AI정책전략대학원"]]],["자연과학대학",[["물리·광과학과"],["화학과"],["수리과학과"]]],["공과대학",[["신소재공학과"],["기계로봇공학과"],["환경·에너지공학과",[["AI 순환경제 클러스터링 학제전공"]]]]],["생명·의과학융합대학",[["생명과학과"],["의생명공학과"],["융합신경생리학과"]]],["인문사회과학부",[["도전탐색과정"]]],["융합기술원",[["에너지융합대학원"]]],["기술경영전문대학원"],["반도체융합기술원",[["반도체특성화대학원"],["반도체설계아카데미"]]],["언어교육원"],["교무처",[["교무팀"],["학적팀"]]],["기획처",[["기획조정실",[["기획팀"],["예산팀"],["경영혁신팀"]]]]],["입학학생처",[["학생팀"],["입학팀"],["상담센터"]]],["행정안전처",[["총무팀"],["인사팀"],["재무팀"],["계약팀"],["시설안전실",[["건설팀"],["시설운영팀"],["안전팀"]]]]],["학술정보처",[["학술정보팀"],["정보운영팀"],["정보보안팀"],["슈퍼컴퓨팅센터"]]],["법무실"],["인권센터"]]],["연구부총장",[["R&D혁신기획본부"],["연구처",[["연구관리팀"],["연구지원팀"],["실험동물자원센터"]]],["창업혁신진흥원",[["창업혁신전략센터"],["창업진흥센터"],["기술사업화센터"]]],["고등광기술연구원",[["미래우주국방융합연구본부"],["광기반원천연구부"],["광응용시스템연구부"],["초강력레이저연구부"],["경영지원실"]]],["연구소",[["차세대에너지연구소"],["한국문화기술연구소"],["생명의과학융합연구소"],["국제환경연구소"],["인공지능연구소"],["중앙기기연구소",[["첨단분석센터"],["첨단AI반도체팹센터"]]]]],["노벨연구센터"]]],["대외부총장",[["GIST아카데미"],["대외협력처",[["글로벌협력실"],["대외홍보팀"],["발전기금팀"]]]]]]]];
 const has=n=>ORGDIR.some(r=>r[0]===n||r[0].replace(/\s/g,"")===n.replace(/\s/g,""));const dn=n=>{const r=ORGDIR.find(r=>r[0].replace(/\s/g,"")===n.replace(/\s/g,""));return r?r[0]:n;};
 let cnt=0;const walk=(a,d)=>a.map(x=>{cnt++;const kids=x[1]||[];const nm=x[0];const b=has(nm)?'<button type="button" class="og-n'+(kids.length?' p':'')+'" data-od="'+esc(dn(nm))+'">'+esc(nm)+'<span>업무·내선</span></button>':'<span class="og-n'+(kids.length?' p':'')+'">'+esc(nm)+'</span>';
  return '<li class="og-l'+d+'">'+(kids.length&&d>=1?'<div class="og-g'+(d<2?' open':'')+'"><div class="og-row"><button type="button" class="og-t" aria-expanded="'+(d<2)+'" aria-label="'+esc(nm)+' 하위 조직 '+kids.length+'개 펼치기"></button>'+b+'<i class="num" aria-hidden="true">'+kids.length+'</i></div><ul>'+walk(kids,d+1)+'</ul></div>':b+(kids.length?'<ul>'+walk(kids,d+1)+'</ul>':''))+'</li>';}).join("");
 PBODY["조직도"]=()=>{cnt=0;const h=walk(T,0);return '<p class="p-lead">GIST는 이사회 아래 총장과 교학·연구·대외 세 부총장 체계로 운영됩니다. 부서 이름을 누르면 그 부서의 담당 업무와 내선번호가 바로 열립니다.</p><div class="og-tools"><span class="num">조직 '+cnt+'개 · 업무·내선이 있는 부서 '+new Set(ORGDIR.map(r=>r[0])).size+'곳</span><button type="button" class="pill" data-ogx="1">모두 펼치기</button><button type="button" class="pill" data-ogx="0">접기</button></div><ul class="og">'+h+'</ul>'+src("현행 GIST 홈페이지 ‘About GIST › 조직 › 조직도’ · 업무·내선은 ‘직원검색’");};
 document.addEventListener("click",e=>{const t=e.target.closest("[data-ogx]");if(!t)return;const o=t.dataset.ogx==="1";document.querySelectorAll(".og .og-g").forEach(g=>{g.classList.toggle("open",o);g.querySelector(".og-t").setAttribute("aria-expanded",o);});});
 document.addEventListener("click",e=>{const t=e.target.closest(".og-t");if(!t)return;const g=t.closest(".og-g");const o=!g.classList.contains("open");g.classList.toggle("open",o);t.setAttribute("aria-expanded",o);});
 
 /* 대학 입학 */
 const ug=f=>'<p class="p-lead">GIST 대학(학사과정)은 수시와 정시로 신입생을 뽑습니다. 전형별 자격·일정·모집인원은 해마다 나오는 모집요강이 기준입니다.</p>'+
  '<h3 class="p-h3">전형 한눈에</h3>'+cards([["일반전형","수시 전형 · 자격·일정은 해당 화면과 모집요강","https://www.gist.ac.kr/uadm/html/sub02/020101.html","수시"],["학교장추천전형","수시 전형 · 자격·일정은 해당 화면과 모집요강","https://www.gist.ac.kr/uadm/html/sub02/020102.html","수시"],["고른기회전형","수시 전형 · 자격·일정은 해당 화면과 모집요강","https://www.gist.ac.kr/uadm/html/sub02/020103.html","수시"],["특기자전형","수시 전형 · 자격·일정은 해당 화면과 모집요강","https://www.gist.ac.kr/uadm/html/sub02/020104.html","수시"],["정시","정시 전형 · 자격·일정은 해당 화면과 모집요강","https://www.gist.ac.kr/uadm/html/sub02/0202.html","정시"],["모집요강","올해 자격·일정·모집인원","https://www.gist.ac.kr/uadm/html/sub02/0205.html","필수"]])+
  '<h3 class="p-h3">온라인 입학상담 받는 법</h3>'+step([["대학 입학 홈페이지 「온라인 입학상담」 클릭","상담일과 상담자 정보를 넣고 저장합니다."],["예약 결과 확인","이름·이메일을 넣어 ‘승인완료’면 예약이 끝난 것입니다."],["입학사정관과 온라인 상담","상담 방법은 승인 뒤 따로 안내합니다. 학교생활기록부·자기소개서·모의고사 성적표를 준비하세요."]])+
  cards([["온라인 입학상담","예약·조회·취소","https://www.gist.ac.kr/uadm/html/sub04/0402.html","상담"],["Q&A · FAQ","자주 묻는 질문","https://www.gist.ac.kr/uadm/html/sub03/0303.html","도움"],["각종 서식","제출 서류 양식","https://www.gist.ac.kr/uadm/html/sub03/0305.html","서식"],["장학제도","학사과정 장학","#p-2-2-0","장학"]])+
  '<div class="sk-addr"><div><span class="eyebrow">입학팀</span><b>대학A동(N4) 323호</b><span>대표 <a class="num" href="tel:062-715-2950">062-715-2950</a> · 팩스 <span class="num">062-715-2959</span> · uadmission@gist.ac.kr</span></div></div>'+skContact("입학팀",/대학 |팀장/,"입학팀 담당")+src("GIST 대학 입학 홈페이지 메뉴·‘온라인 입학상담’ 안내");
 const aidB=()=>'<section class="aid-b" aria-labelledby="aidbt"><div class="aid-l"><h2 id="aidbt">학비 걱정은 덜고, 공부에 집중합니다</h2><p>GIST 학사과정 학생은 전원이 기본장학금을 받고, 성적·형편·전형에 따라 더 받을 수 있습니다.</p><a class="aid-a" href="#p-2-2-0">장학 제도 보기</a> <a class="aid-a2" href="#p-2-2-1">등록금 보기</a></div><div class="aid-n"><div><b class="num">1,030,000</b><span>원/학기 학생 실부담 수업료<br>(기본장학금 적용 시)</span></div><div><b class="num">8</b><span>학기 장학 지원 기간<br>(수업연한)</span></div><div><b class="num">2,000,000</b><span>원/학기 총장장학생<br>자기계발비</span></div></div><p class="aid-src">출처: D안 「장학 제도」 화면(현행 GIST 장학 안내 기준) · 금액은 학기마다 바뀔 수 있어 입학팀·학생지원팀 확인</p></section>';
 const admP=()=>'<section class="adm-p" aria-labelledby="admpt"><h2 id="admpt">2027학년도 학사과정 한눈에</h2><div class="adm-pn"><div><b class="num">330</b><span>명 내외 모집<br>(정원 내 300 · 반도체공학과 정원 외 30)</span></div><div><b class="num">9.7.~9.11.</b><span>2027학년도 수시모집 원서접수<br>(2026년, 마감) · GIST 홈페이지 안내</span></div><div><b>중복 지원 가능</b><span>수시 6회 제한에 들지 않고<br>다른 대학·과학기술원과 함께 지원</span></div></div><p class="aid-src">출처: 「2027학년도 GIST 학사과정 입학전형 안내」(GIST 입학 홈페이지 내려받기 자료) 모집인원 표 합계·안내 문구, GIST 홈페이지 첫 화면 원서접수 안내 · 전형별 인원은 아래 표</p><div class="tbl-w" tabindex="0" role="region" aria-label="2027학년도 전형별 모집인원 표"><table class="tbl"><thead><tr><th>전형</th><th>정원 내</th><th>정원 외*</th><th>계</th></tr></thead><tbody><tr><td>수시 · 일반전형</td><td>195</td><td>25</td><td>220</td></tr><tr><td>수시 · 학교장추천전형</td><td>60</td><td>-</td><td>60</td></tr><tr><td>수시 · 고른기회전형</td><td>25</td><td>-</td><td>25</td></tr><tr><td>수시 · 특기자전형</td><td>10</td><td>-</td><td>10</td></tr><tr><td>정시 · 수능우수자전형</td><td>10</td><td>5</td><td>15</td></tr><tr><th>합계</th><th>300</th><th>30</th><th>330</th></tr></tbody></table></div><p class="aid-src">단위: 명 내외 · * 정원 외는 반도체공학과 · 출처 같음. 정확한 인원·자격은 모집요강 원문 기준</p></section>';
 PBODY["입학 전형"]=()=>ug()+admP()+aidB();

 PBODY["모집 요강"]=()=>'<p class="p-lead">2027학년도 학사과정 모집인원과 전형입니다. 자격·일정·제출서류는 해마다 나오는 모집요강 원문이 기준입니다.</p>'+admP().replace('<section class="adm-p"','<section class="adm-p adm-p0"')+'<div class="hub" style="margin-top:20px"><a class="hb" href="https://www.gist.ac.kr/uadm/main.html"'+EXT+'><i data-lucide="file-text"></i><b>모집요강 원문</b><span>GIST 대학 입학 홈페이지</span><em>gist.ac.kr/uadm <i data-lucide="arrow-up-right"></i></em></a></div>';
 PBODY["입학 상담"]=()=>{const u=ug();const i=u.indexOf('<h3 class="p-h3">온라인 입학상담');return '<p class="p-lead">입학 궁금한 점은 온라인 입학상담 게시판이나 입학팀 전화로 물어볼 수 있습니다.</p>'+(i>0?u.slice(i):u);};
 /* 대학원 입학 */
 const gr=()=>'<p class="p-lead">GIST 대학원은 석사·박사·석박사통합과정을 봄·가을학기로 뽑습니다. 지원 전 학과(랩) 사전 컨택과 랩 배정 방식을 꼭 확인하세요.</p>'+
  '<h3 class="p-h3">지금 진행 중 <small>대학원 입학 홈페이지 공지</small></h3><ol class="sk-tl"><li class="past"><span class="num">10.12.~10.21.</span><b>2027학년도 봄학기 2차 전형 원서접수 (내국인)</b></li><li class="on"><span class="num">11.10.</span><b>서류합격자 발표 및 구술전형 안내 게시</b></li></ol>'+
  '<h3 class="p-h3">지원 전에 꼭 확인</h3>'+cards([["사전 컨택 안내","학과에 따라 원서접수 마감 전 사전 컨택이 필수입니다 (2026년 7월 기준 안내)","https://www.gist.ac.kr/gadm/","필수"],["랩 배정 방식","학과별 랩 배정 방식이 다릅니다. 학과 연락처로 문의","https://www.gist.ac.kr/gadm/","학과별"],["전문연구요원","박사과정 국비·과기원 장학생 최종 합격자 대상, 병무청 배정 인원 안에서","https://www.gist.ac.kr/gadm/","병역"],["학과 안내","13개 학과·대학원 소개와 연구 분야","#colleges","학과"]])+
  '<h3 class="p-h3">바로가기</h3>'+cards([["원서접수·서류제출 확인","대학원 입학 홈페이지","https://www.gist.ac.kr/gadm/","원서"],["International Graduate Admissions","외국인 대학원 입학","https://www.gist.ac.kr/iadm/main.html","Global"],["International Undergraduate Admissions","외국인 학사 입학","https://www.gist.ac.kr/iuadm/","Global"],["오픈랩·입학설명회","연구실 미리 보기","https://www.gist.ac.kr/gadm/","행사"]])+
  skContact("입학팀",/대학원|팀장/,"대학원 입시 담당")+src("GIST 대학원 입학 홈페이지 공지·Quick Link");
 PBODY["전형 안내"]=PBODY["외국인 입학"]=gr;
})();

/* v104 세부 화면 고도화 2차 — 창업 지원·안전 안내·감사·규정·경영공시 (현행 홈페이지 직원검색 업무 원문, 2026.11.11. 확인) */
(function(){
 const EXT2=EXT,src=t=>'<p class="note">출처: '+t+' (2026.11.11. 확인)</p>';
 const tl=e=>"062-715-"+String(e).split(/[\/, ]/)[0];
 const card=(x)=>'<a class="sk-card" href="'+esc(x[2])+'"'+(/^http/.test(x[2])?EXT2:'')+'><span class="sk-k">'+esc(x[3]||"")+'</span><b>'+esc(x[0])+'</b><p>'+esc(x[1])+'</p><span class="sk-go">'+(/^http/.test(x[2])?'바로가기 ↗':/^tel:/.test(x[2])?'전화 걸기':'보기 →')+'</span></a>';
 const cards=a=>'<div class="sk-cards">'+a.map(card).join("")+'</div>';
 const lnk=(h,t)=>'<div class="sk-addr"><div><span class="eyebrow">LINK</span><b>'+esc(t)+'</b></div><div class="sk-addr-b">'+h.map(x=>'<a class="pill'+(x[2]?' red':'')+'" href="'+esc(x[1])+'"'+EXT2+'>'+esc(x[0])+' ↗</a>').join("")+'</div></div>';
 PBODY["창업 지원"]=()=>'<p class="p-lead">GIST의 창업과 기술사업화는 창업혁신진흥원이 맡습니다. 아이디어 단계의 학생 창업부터 교원 기술의 이전·출자까지 한 곳에서 이어집니다.</p>'+
  '<div class="kpi k3 sk-k3"><div><span class="eyebrow">창업혁신진흥원</span><b class="num">3</b><span>개 센터 · 창업혁신전략·창업진흥·기술사업화</span></div><div><span class="eyebrow">기술이전 누적 계약액</span><b class="num">621</b><span>억 원 · 숫자로 보는 GIST</span></div><div><span class="eyebrow">창업성과 부문</span><b class="num">1</b><span>위 · 2023 대한민국 창업우수대학</span></div></div>'+
  '<h3 class="p-h3">창업진흥센터 프로그램 <small>직원검색 담당 업무에 적힌 이름 그대로</small></h3>'+cards([["GIST 모의창업 프로그램(GSS)","집중창업캠프·원포인트 창업 멘토링과 함께 운영","tel:062-715-6302","T.6302"],["GIST 엑설러레이팅 프로그램","공공기술기반 시장연계 창업탐색 지원사업","tel:062-715-6305","T.6305"],["학생 창업서포터즈·창업동아리","창업미니스쿨, 장비 활용 교육·시제품 제작 멘토링","tel:062-715-6303","T.6303"],["복합창업공간(CSG)","스타트업나이트·창업런치토크","tel:062-715-6303","T.6303"],["창업 아이디어 경진대회","GIST-호남권대학·특성화대학 공동, AI&IoT 메이커톤","tel:062-715-6302","T.6302"],["창업보육","선도 대학프로그램","tel:062-715-2597","T.2597"]])+
  '<h3 class="p-h3">기술사업화센터</h3>'+cards([["기술이전","IT(기계·정보·고등광·융합) · NT(신소재·지구환경·물리·화학)·실용화사업","tel:062-715-3077","T.3077·3095"],["특허 관리","특허관리·발명시스템, 특허교육","tel:062-715-3479","T.3479·3076"],["출자기업·연구소기업","출자기업·산학협력연구관, 연구소기업","tel:062-715-3074","T.3074·3086"],["TLO 혁신 사업","기술이전 전담조직 혁신 사업","tel:062-715-3073","T.3073"]])+
  lnk([["창업혁신진흥원(GTI)","https://gti.gist.ac.kr/",1],["GIST홀딩스","https://gistholdings.com/"]],"창업·기술사업화 사이트")+
  window.skContact("창업진흥센터",/총괄|기획/,"창업진흥센터")+window.skContact("기술사업화센터",/센터장|기술이전/,"기술사업화센터")+src("현행 GIST 홈페이지 직원검색(창업혁신진흥원 부서 담당 업무) · 숫자로 보는 GIST");
 PBODY["안전 안내"]=()=>'<p class="p-lead">연구실·방사선·생물 안전부터 보건, 보안·경비, 예비군·민방위까지 캠퍼스 안전은 안전팀이 맡습니다. 사고·위험을 보면 먼저 아래 담당에게 알려 주세요.</p>'+
  cards([["연구실안전 · 안전체험교육장","연구실 안전관리와 안전교육","tel:062-715-5502","T.5502·5505"],["산업안전 · 재난안전","산업재해 예방, 재난 대응","tel:062-715-5503","T.5503"],["방사선안전","방사선 안전관리","tel:062-715-5506","T.5506"],["생물안전","생물 안전관리","tel:062-715-5504","T.5504"],["보건 · 의무실 · 건강진단","의무실 운영과 건강진단","tel:062-715-2107","T.2107"],["보안 · 경비","캠퍼스 보안과 경비","tel:062-715-5508","T.5508"],["예비군 · 민방위 · 비상계획","예비군 대대","tel:062-715-2105","T.2105·5510"]])+
  lnk([["GIST 안전 사이트","http://safety.gist.ac.kr/ushm/main/home.do",1]],"연구실 안전관리 시스템")+window.skContact("안전팀",/팀장/,"안전팀")+src("현행 GIST 홈페이지 직원검색(안전팀) · 홈페이지 하단 ‘안전’ 바로가기");
 PBODY["감사"]=()=>'<p class="p-lead">감사는 이사회 소속이며, 감사부가 일반·특별·회계 감사와 청렴(청탁방지·행동강령) 업무를 맡습니다.</p>'+
  cards([["감사 총괄","감사부장 · 청탁방지담당관 · 행동강령책임관","tel:062-715-2007","T.2007"],["일반·특별·회계 감사","대·내외 감사현황 보고","tel:062-715-2185","T.2185·2008"],["신문고 민원 · 대외기관 업무","감사 관련 대·내외 기관 업무","tel:062-715-2009","T.2009"],["경영정보 공개(ALIO)","공공기관 경영정보 공개시스템의 GIST 화면","https://alio.go.kr/organ/organDisclosureDtl.do?apbaId=C0018","공개"]])+
  window.skContact("감사부",null,"감사부")+src("현행 GIST 홈페이지 조직도·직원검색(감사·감사부)");
 PBODY["규정"]=()=>'<p class="p-lead">GIST의 규정·규칙·지침 전문과 개정 이력은 원규 시스템에서 찾습니다. 규정 관리는 기획팀, 연구비 관련 규정은 연구관리팀이 맡습니다.</p>'+
  lnk([["GIST 원규 시스템","https://law.gist.ac.kr/lmxsrv/main/main.do",1]],"규정·규칙·지침 전문")+
  cards([["규정 관리","이사회·기획위·평의원회·규정 — 기획팀","tel:062-715-2974","T.2974"],["연구 관련 규정","연구관리제도·규정·전산화 — 연구관리팀","tel:062-715-2033","T.2033"],["법무 상담","소송·법률자문 상담 — 법무실","tel:062-715-6802","T.6802"],["학사 한 장","학칙·학사 규정을 쉬운 말로 정리한 길잡이","#tutorial","학사"]])+src("현행 GIST 홈페이지 직원검색(기획팀·연구관리팀·법무실)");
 PBODY["경영공시"]=()=>'<p class="p-lead">공공기관 경영정보는 ALIO, 대학 정보는 대학알리미에 공개합니다. 공시 업무는 경영혁신팀이 맡습니다.</p>'+
  cards([["ALIO 경영정보 공개","공공기관 경영정보 공개시스템의 GIST 화면","https://alio.go.kr/organ/organDisclosureDtl.do?apbaId=C0018","경영"],["대학알리미","대학 정보공시 GIST 화면","https://www.academyinfo.go.kr/popup/pubinfo1690/list.do?schlId=0000381","대학"],["정보공개 청구","정보공개포털","http://www.open.go.kr/com/login/memberLogin.do","청구"],["정보공개 안내","현행 GIST 홈페이지 정보공개 메뉴","https://www.gist.ac.kr/kr/html/sub08/080101.html","안내"]])+
  window.skContact("경영혁신팀",/공시|팀장/,"경영혁신팀 (국내대학평가·공시)")+src("현행 GIST 홈페이지 정보공개 메뉴·직원검색(경영혁신팀)");
})();


/* v105 세부 화면 연락처 보강 */
Object.assign(PDEPD,{"창업 지원":"창업혁신진흥원 (창업진흥센터·기술사업화센터)","안전 안내":"안전팀","감사":"감사부","규정":"기획팀 (규정)","경영공시":"경영혁신팀 (공시)","입학 전형":"입학팀","모집 요강":"입학팀","입학 상담":"입학팀","전형 안내":"입학팀 (대학원 입시)","외국인 입학":"입학팀 (대학원 외국인 입시)","학생기구":"학생팀","포털·ZEUS":"정보운영팀","부설 연구소":"각 연구소·센터 (아래 연락처)","연구센터":"각 연구소·센터 (아래 연락처)","공동 연구장비":"중앙기기연구소"});
{const _sg=PBODY["학생기구"];if(_sg)PBODY["학생기구"]=()=>_sg()+window.skContact("학생팀",/팀장|학생|동아리|자치/,"학생팀 (학생 자치·동아리 지원)");
 PBODY["포털·ZEUS"]=()=>hubHTML("포털·ZEUS")+window.skContact("정보운영팀",null,"정보운영팀 (포털·그룹웨어·메일·통합정보시스템)");
 const _ld=PBODY["부설 연구소"];PBODY["부설 연구소"]=()=>'<div class="kpi k3 sk-k3"><div><span class="eyebrow">연구소·센터</span><b class="num">8</b><span>곳 · 현행 ‘연구소 및 센터’ 목록</span></div><div><span class="eyebrow">고등광기술연구원</span><b class="num">4</b><span>개 연구부·본부 + 경영지원실 · 조직도</span></div><div><span class="eyebrow">창업혁신진흥원</span><b class="num">3</b><span>개 센터 · 조직도</span></div></div>'+_ld();}
/* v107 세부 화면 고도화 4차 — 공동 연구장비·공동연구 문의·기술이전·행사 (직원검색 업무 원문, 2026.11.11. 확인) */
(function(){
 const src=t=>'<p class="note">출처: '+t+' (2026.11.11. 확인)</p>';
 const card=(x)=>'<a class="sk-card" href="'+esc(x[2])+'"'+(/^http/.test(x[2])?EXT:'')+'><span class="sk-k">'+esc(x[3]||"")+'</span><b>'+esc(x[0])+'</b><p>'+esc(x[1])+'</p><span class="sk-go">'+(/^http/.test(x[2])?'바로가기 ↗':/^tel:/.test(x[2])?'전화 걸기':'보기 →')+'</span></a>';
 const cards=a=>'<div class="sk-cards">'+a.map(card).join("")+'</div>';
 PBODY["공동 연구장비"]=()=>{const R=ORGDIR.filter(r=>r[0]==="첨단분석센터"&&/분석\(/.test(r[2]));const G={};R.forEach(r=>{const m=r[2].match(/([가-힣]+실|[가-힣]+부 총괄)[^(]*\(([^)]+)\)/)||r[2].match(/(분석)\(([^)]+)\)/);const k=(r[2].match(/(전자현미경실|바이오분광분석실|질량분석실|표면물성분석실|물성분석부|이미지분석부)/)||["","기타"])[1];(G[k]=G[k]||[]).push([((r[2].match(/분석\(([^)]+)\)/)||["",""])[1]),r[1]]);});
  const ks=Object.keys(G);const n=R.reduce((a,r)=>a+((r[2].match(/분석\(([^)]+)\)/)||["",""])[1].split(",").length),0);
  return '<p class="p-lead">중앙기기연구소(GAIA) 첨단분석센터의 공동 연구장비 분석은 교내·외부 모두 시험분석료를 정산해 이용합니다. 장비별 담당자에게 바로 연락하세요.</p>'+
  '<div class="kpi k3 sk-k3"><div><span class="eyebrow">분석실</span><b class="num">'+ks.length+'</b><span>곳 · 직원검색 업무 기준</span></div><div><span class="eyebrow">담당자가 적힌 장비·분석</span><b class="num">'+n+'</b><span>종 · 이름 그대로</span></div><div><span class="eyebrow">시험분석료 정산</span><b class="num">2</b><span>창구 · 내부 T.5236 · 외부 T.5238</span></div></div>'+
  ks.map(k=>'<h3 class="p-h3">'+esc(k)+'</h3><div class="sk-eq">'+G[k].map(x=>'<div><p>'+x[0].split(",").map(t=>'<span>'+esc(t.trim())+'</span>').join("")+'</p><a class="num" href="tel:062-715-'+x[1]+'">T.'+esc(x[1])+'</a></div>').join("")+'</div>').join("")+
  '<div class="sk-addr"><div><span class="eyebrow">LINK</span><b>장비 예약·이용 — 중앙기기연구소 GAIA</b></div><div class="sk-addr-b"><a class="pill red" href="https://gaia.gist.ac.kr/"'+EXT+'>gaia.gist.ac.kr ↗</a><button type="button" class="pill" data-od="첨단분석센터">첨단분석센터 업무 모두 보기</button></div></div>'+window.skContact("중앙기기연구소",null,"중앙기기연구소")+src("현행 GIST 홈페이지 직원검색(중앙기기연구소·첨단분석센터)");};
 PBODY["공동연구 문의"]=()=>'<p class="p-lead">공동연구·연구수탁은 연구관리팀이 지원 부처별로 나눠 맡습니다. 해당 부처 담당에게 먼저 연락하세요.</p>'+
  cards([["과기부 개인·집단연구·기반구축","리더·핵심, 세종과학펠로우십, 집단연구, 용역","tel:062-715-2032","T.2032"],["과기부 신진연구","외부참여연구자 기관장 확인서, 학생인건비 풀링 지원","tel:062-715-2036","T.2036"],["과기부 원천·탄소중립·국제협력 등","미래유망원천, 원자력진흥, 국외수탁, 통합 Ezbaro","tel:062-715-2037","T.2037"],["과기정통부(ICT)·교육부·문체부","연구비카드","tel:062-715-2034","T.2034"],["산업부·중기부·기후부·복지부 등","통합 RCMS","tel:062-715-2038","T.2038"],["국토부·해수부·국방부·식약처","공공수탁, e나라도움(보탬e)","tel:062-715-2035","T.2035"],["GIST연구개발사업·민간수탁","기술자문 포함, R&D Academy","tel:062-715-2028","T.2028"],["연구관리제도·규정","연구비 결산·통계·감사, 연구시설장비비 풀링","tel:062-715-2033","T.2033"]])+
  '<h3 class="p-h3">함께 찾는 곳</h3>'+cards([["GIST-MIT 공동연구","연구지원팀 · 연구보안·생명윤리","tel:062-715-2933","T.2933"],["공동 연구장비","중앙기기연구소 첨단분석센터","#p-3-1-1","장비"],["기술이전","기술사업화센터","#p-3-2-0","사업화"]])+
  window.skContact("연구관리팀",/팀장/,"연구관리팀")+src("현행 GIST 홈페이지 직원검색(연구관리팀·연구지원팀)");
 const _tt=PBODY["기술이전"];PBODY["기술이전"]=()=>(_tt?_tt():"")+window.skContact("기술사업화센터",/기술이전|특허|센터장/,"기술사업화센터 (기술이전·특허)");
 PBODY["행사"]=()=>{const g=document.getElementById("gnowg");return '<p class="p-lead">GIST에서 열리는 행사·전시·협력 소식입니다. 다가오는 행사는 남은 날짜, 진행 중인 행사는 크게 보입니다.</p><div class="evf" role="group" aria-label="행사 거르기"><div class="evf-r"><span class="evf-l">때</span><button type="button" data-evs="" aria-pressed="true">전체</button><button type="button" data-evs="on" aria-pressed="false">진행 중</button><button type="button" data-evs="up" aria-pressed="false">다가오는</button><button type="button" data-evs="past" aria-pressed="false">지난 소식</button></div><div class="evf-r"><span class="evf-l">종류</span><button type="button" data-evk="" aria-pressed="true">전체</button>'+['전시','축제','행사','사업','협력'].map(k=>'<button type="button" data-evk="'+k+'" aria-pressed="false">'+k+'</button>').join('')+'<span class="evf-n" aria-live="polite"></span></div></div><div class="gnow-g">'+(g?g.innerHTML:"")+'</div><p class="evf-empty" hidden>고른 조건에 맞는 행사가 없습니다.</p>'+src("현행 GIST 홈페이지 미디어센터 ‘Events’");};
 Object.assign(PDEPD,{"공동 연구장비":"중앙기기연구소 (첨단분석센터)","공동연구 문의":"연구관리팀","기술이전":"기술사업화센터","행사":"대외홍보팀 (대표행사)"});
})();


/* v108 기존 세부 화면에 담당 연락처 붙이기 (직원검색, 2026.11.11. 확인) */
{const ADDC=[["장학 제도","학적팀",/장학|납입금/,"학적팀 (장학금·납입금)"],["등록금","학적팀",/장학|납입금/,"학적팀 (장학금·납입금)"],["생활관","학생팀",/기숙사|기혼자/,"학생팀 (기숙사)"],["수강신청","학적팀",/수강|교과과정|학적/,"학적팀 (수강·학적)"],["증명서 발급","학적팀",/증명서/,"학적팀 (증명서 발급)"],["상담센터","상담센터",null,"상담센터"],["오룡관 예약","GIST아카데미",/오룡관/,"GIST아카데미 (오룡관 관리)"],["캠퍼스 투어","대외홍보팀",/견학/,"대외홍보팀 (견학)"],["학사일정","학적팀",/학적|교과과정/,"학적팀 (학사)"],["홍보 영상","대외홍보팀",/영상|온라인/,"대외홍보팀 (사진·영상)"],["브로슈어","대외홍보팀",/홍보물/,"대외홍보팀 (홍보물)"],["유튜브","대외홍보팀",/영상|온라인/,"대외홍보팀 (온라인 홍보)"],["인스타그램","대외홍보팀",/온라인/,"대외홍보팀 (온라인 홍보)"],["공지","대외홍보팀",/온라인/,"대외홍보팀 (홈페이지)"]];
 ADDC.forEach(([n,d,re,t])=>{const f=PBODY[n]||(PLINK[n]?(()=>hubHTML(n)):null);if(!f)return;PBODY[n]=()=>f()+window.skContact(d,re,t);});
 Object.assign(PDEPD,{"장학 제도":"학적팀 (장학금·납입금)","등록금":"학적팀 (장학금·납입금)","수강신청":"학적팀","학사일정":"학적팀","오룡관 예약":"GIST아카데미 (오룡관 관리)","홍보 영상":"대외홍보팀","브로슈어":"대외홍보팀","유튜브":"대외홍보팀","인스타그램":"대외홍보팀"});}

/* v128 좁은 표는 휴대폰 한 화면에: 4칸 이하 표를 맞춰 보고, 그래도 넘치면 되돌림 */
(function(){function fit(){setTimeout(()=>{document.querySelectorAll(".view.on table.tbl").forEach(t=>{const w=t.parentElement;if(!w||!w.classList.contains("tbl-w")||t.classList.contains("tbl-fit"))return;const r=t.querySelector("tr");if(!r||r.children.length>4)return;t.classList.add("tbl-fit");w.classList.add("tbl-fitw");if(w.scrollWidth>w.clientWidth+2){t.classList.remove("tbl-fit");w.classList.remove("tbl-fitw");}else{w.classList.remove("scr");const sw=w.previousElementSibling;if(sw&&sw.classList.contains("swipe"))sw.remove();}});},200);}
addEventListener("hashchange",fit);fit();})();
/* v131 영문 화면에서는 하단 바·바닥글도 영어로 (다른 화면으로 가면 원래대로) */
(function(){const M=[["홈","Home"],["대학·학과","Colleges"],["광주과학기술원","Gwangju Institute of Science and Technology"],["대표전화","Tel."],["팩스","Fax"],["찾아오시는 길 →","Directions →"],["교내 주요사이트","Campus Sites"],["GIST 포털","GIST Portal"],["그룹웨어","Groupware"],["웹메일","Webmail"],["대학 입학","Undergraduate Admissions"],["대학원 입학","Graduate Admissions"]];
 const nodes=()=>{const o=[];[".tabbar","footer .ft-brand","footer .ft-site"].forEach(sel=>{const r=document.querySelector(sel);if(!r)return;const w=document.createTreeWalker(r,NodeFilter.SHOW_TEXT);let n;while((n=w.nextNode()))o.push(n);});return o;};
 let on=false;function ap(){const en=LH()==="#en";if(en===on)return;on=en;document.documentElement.lang=en?"en":"ko";nodes().forEach(n=>{const t=n.nodeValue.trim();if(!t)return;const m=M.find(x=>x[en?0:1]===t);if(m)n.nodeValue=n.nodeValue.replace(t,m[en?1:0]);});const fc=document.getElementById("ftcols");if(fc)fc.hidden=en;const tb=document.querySelector(".tabbar");if(tb)tb.setAttribute("aria-label",en?"Mobile menu":"휴대폰 메뉴");[[".hd .logo","GIST 광주과학기술원 홈","GIST home"],["#cmdbtn","검색 Ctrl K","Search (Ctrl K) — Korean site search"],["#mmenu","전체 메뉴 열기","Open full menu (Korean)"]].forEach(([q,k,e2])=>{const el=document.querySelector(q);if(el)el.setAttribute("aria-label",en?e2:k);});}
 addEventListener("hashchange",ap);ap();
 document.addEventListener("click",e=>{if(LH()!=="#en")return;const a=e.target.closest('.tabbar a[href="#colleges"]');if(!a)return;const t=document.getElementById("en-col");if(!t)return;e.preventDefault();e.stopPropagation();t.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});const h=t.querySelector("h2");if(h){h.setAttribute("tabindex","-1");h.focus({preventScroll:true});}},true);})();
/* v124 없는 주소 안내 */
(function(){function chk(){setTimeout(()=>{const h=LH().slice(1);const o=document.getElementById("nf-toast");const hide=()=>{if(o)o.classList.remove("on")};if(!h||h==="home")return hide();const hv=document.querySelector("#v-home");if(!hv||!hv.classList.contains("on"))return hide();if(document.getElementById(h))return hide();let t=document.getElementById("nf-toast");if(!t){t=document.createElement("div");t.id="nf-toast";t.setAttribute("role","status");document.body.appendChild(t);}t.innerHTML='찾는 화면(<b>#'+esc(h.slice(0,24))+'</b>)이 없어 첫 화면을 보여 드립니다. <a href="#search">검색으로 찾기 →</a>';t.classList.add("on");clearTimeout(t._x);t._x=setTimeout(()=>t.classList.remove("on"),6000);},350);}
addEventListener("hashchange",chk);chk();})();
/* v124 미디어센터 분류 화면 5곳: 지금, 지스트 실제 소식(현행 미디어센터·언론 원문) 분류별 목록 */
["보도자료","연구성과","사람","캠퍼스","영상"].forEach(k=>{PBODY[k]=()=>{const dk=x=>(x.d||x.m||"").replace(/\D/g,"").padEnd(8,"0");const L=STORIES.filter(x=>x.c===k).sort((a,b)=>dk(b).localeCompare(dk(a)));
 return '<p class="p-lead">지금, 지스트의 ‘'+esc(k)+'’ 소식 <b class="num">'+L.length+'</b>건입니다. 카드를 누르면 요약과 원문 기사로 이어집니다.</p>'+(L.length?'<div class="sgrid mc-sg">'+L.map(x=>storyCard(x,false)).join("")+'</div>':'<div class="empty">이 분류에는 아직 실린 소식이 없습니다.</div>')+'<p class="pv-more"><a class="p-pill dark" href="#story">지금, 지스트 전체 '+STORIES.length+'건 보기 →</a></p><p class="note">출처: 현행 GIST 미디어센터 게시글과 원문 기사 (2026.11.10.~11. 확인). 구축 때 담당 부서가 관리자 모드로 올리는 글이 이 목록에 그대로 쌓입니다.</p>';};});
/* v110 부속기관·3D 캠퍼스맵 고도화 (현행 링크 + 직원검색 연락처, 2026.11.11. 확인) */
{const _bs=PLINK["부속기관"]?(()=>hubHTML("부속기관")):PBODY["부속기관"];
 PBODY["부속기관"]=()=>'<p class="p-lead">GIST에는 연구원·도서관·교육기관 등 부속기관이 있습니다. 기관 홈페이지로 바로 가고, 기관 업무·내선은 아래에서 찾으세요.</p>'+(_bs?_bs().replace(/^<p class="p-lead">[^<]*<\/p>/,""):"")+
  '<h3 class="p-h3">부속기관 연락처 <small>현행 직원검색</small></h3><div class="sk-cards">'+[["고등광기술연구원","고등광기술연구원"],["학술정보팀","중앙도서관 (학술정보팀)"],["언어교육원","언어교육원"],["기술경영전문대학원","기술경영전문대학원"],["상담센터","상담센터"]].map(([d,t])=>{const R=ORGDIR.filter(r=>r[0]===d||r[0].indexOf(d+" ")===0);if(!R.length)return "";const h=R.find(r=>/(원장|센터장|팀장|원장)/.test(r[2]))||R[0];return '<button type="button" class="sk-card" data-od="'+esc(R[0][0])+'"><span class="sk-k">업무 '+R.length+'건</span><b>'+esc(t)+'</b><p>'+esc(h[2])+' · T.'+esc(h[1])+'</p><span class="sk-go">업무·내선 모두 보기 →</span></button>';}).join("")+'</div><p class="note">출처: 현행 GIST 홈페이지 부속기관 바로가기·직원검색 (2026.11.11. 확인)</p>';
 const _3d=PLINK["3D 캠퍼스맵"]?(()=>hubHTML("3D 캠퍼스맵")):PBODY["3D 캠퍼스맵"];
 PBODY["3D 캠퍼스맵"]=()=>(_3d?_3d():"")+'<div class="sk-addr"><div><span class="eyebrow">ADDRESS</span><b>(61005) 전남광주통합특별시 북구 첨단과기로 123 (오룡동)</b><span>대표전화 <a class="num" href="tel:062-715-2114">062-715-2114</a></span></div><div class="sk-addr-b"><a class="pill red" href="#p-0-3-0">찾아오시는 길 →</a><a class="pill" href="#p-2-3-0">캠퍼스 투어 →</a></div></div>';
 Object.assign(PDEPD,{"부속기관":"각 부속기관 (아래 연락처)"});}
/* 학과 홈페이지 바로가기(실제 주소) */
Object.keys(DEPT).forEach(n=>{const D0=DEPT[n];IDX.push({s:"dept",site:n+" 홈페이지",t:n+" 홈페이지",p:D0.hp.replace(/^https:\/\//,"").replace(/\/$/,"")+" · 학과 사무실 "+(D0.tel||""),k:n+" "+(D0.e||"")+" 학과 홈페이지 "+D0.code,u:D0.hp});});
/* 검색·명령창에 학과 소개 넣기 */
Object.keys(DEPT).forEach(n=>{const D0=DEPT[n];const t=[D0.e,D0.slo,...(D0.intro||[]),...(D0.pts||[]),...D0.areas.map(a=>a[0]+" "+(a[1]||"")+" "+(a[2]||"")+" "+(a[3]||[]).join(" "))].join(" ");const r={s:"main",site:"학과 소개 · "+(COLLEGES[deptCol(n)]||{}).n,t:n,p:((D0.intro&&D0.intro[0])||D0.slo||D0.e||"").slice(0,90),k:t.slice(0,1200),h:"#d-"+D0.code};IDX.push(r);CMDX.push(r);});if(typeof fuseCache!=="undefined")fuseCache.clear();
function pageCtx(){const m=(LH()||"").match(/^#p-(\d+)-(\d+)-(\d+)$/);if(!m)return null;const i=+m[1],g=+m[2],k=+m[3];if(!MEGA[i]||!MEGA[i][2][g]||MEGA[i][2][g][1][k]==null)return null;return {i,g,k};}
function renderPage(c){const {i,g,k}=c,M=MEGA[i],G=M[2][g],x=G[1][k];const host=$("#v-page");
 const dd=(id,label,items)=>'<li><button type="button" class="dd" aria-expanded="false" aria-controls="'+id+'">'+esc(label)+'</button><ul class="ddl" id="'+id+'" hidden>'+items+'</ul></li>';
 const topItems=MEGA.map((mm,ii)=>'<li><a href="'+pHref(ii,0,0)+'"'+(ii===i?' aria-current="page"':'')+'>'+esc(mm[0])+'</a></li>').join("");
 const grpItems=M[2].map((gg,gi)=>'<li><a href="'+pHref(i,gi,0)+'"'+(gi===g?' aria-current="page"':'')+'>'+esc(gg[0])+'</a></li>').join("");
 const itmItems=G[1].map((xx,ki)=>'<li><a href="'+pHref(i,g,ki)+'"'+(ki===k?' aria-current="page"':'')+'>'+esc(xx)+'</a></li>').join("");
 const lnb='<nav class="lnb" aria-label="'+esc(M[0])+' 메뉴"><h2>'+esc(M[0])+'</h2><ul>'+M[2].map((gg,gi)=>'<li><a href="'+pHref(i,gi,0)+'"'+(gi===g?' aria-current="page"':'')+'>'+esc(gg[0])+'</a>'+(gi===g?'<div class="sub">'+gg[1].map((xx,ki)=>'<a href="'+pHref(i,gi,ki)+'"'+(pExt(i,gi,ki)?EXT:'')+(ki===k?' class="cur" aria-current="page"':'')+'>'+esc(xx)+'</a>').join("")+'</div>':'')+'</li>').join("")+'</ul></nav>';
 const url=PURL[x];const q=encodeURIComponent(x.replace(/\s*\(.*\)/,""));
 const col=i===1?COLLEGES[g]:null;
 const body=col&&DURL[x]?'<p class="p-lead">'+esc(col.n)+' 소속 학과입니다. 교육과정·교수진·연구실·입학 안내는 학과 홈페이지에 있습니다.</p><div class="ory"><div class="ory-n go"><span class="eyebrow">'+esc(col.e)+'</span><b>'+esc(x)+' 홈페이지</b><a class="p-pill" href="'+dhref(x)+'"'+EXT+'>바로가기 <i data-lucide="arrow-up-right"></i></a></div><div class="ory-n"><span class="eyebrow">주소</span><b style="font-size:20px;word-break:break-all">'+esc(dhref(x).replace(/^https:\/\//,"").replace(/\/$/,""))+'</b><span>현행 학과 홈페이지</span></div><div class="ory-n"><span class="eyebrow">'+esc(col.n)+'</span><b class="num">'+col.d.length+'</b><span>개 학과·대학원</span></div></div><p class="note">학과 소식·졸업요건 등 학과 홈페이지 내용도 통합검색 ‘학과 홈페이지’ 범위에서 함께 찾습니다. <a href="#colleges">대학·학과 둘러보기 →</a></p>':PBODY[x]?PBODY[x]():'<p class="p-lead">'+esc(M[0])+' › '+esc(G[0])+' 안의 ‘'+esc(x)+'’ 화면입니다.</p><div class="slot"><span class="eyebrow">Contents</span><b>현행 홈페이지 내용을 이 틀에 옮겨 담습니다</b><p>구축 때 담당 부서가 관리자 모드로 글·사진·첨부를 올리면 이 자리에 그대로 보입니다. 시안에는 내용을 지어 넣지 않았습니다.</p></div>';
 const ov=PAGEOV[x]||{};let body2=body;
 if(ov.lead&&ov.lead.trim())body2=/<p class="p-lead">[\s\S]*?<\/p>/.test(body2)?body2.replace(/<p class="p-lead">[\s\S]*?<\/p>/,'<p class="p-lead">'+esc(ov.lead.trim())+'</p>'):'<p class="p-lead">'+esc(ov.lead.trim())+'</p>'+body2;
 if(ov.body&&ov.body.trim()){const md=mdHTML(ov.body);body2=/<div class="slot">/.test(body2)?body2.replace(/<div class="slot">[\s\S]*?<\/div>/,'<section class="pov">'+md+'</section>'):body2+'<section class="pov"><span class="eyebrow">담당 부서 안내</span>'+md+'</section>';}
 const ovAt=(ov.lead||ov.body||ov.dept)&&SITE_AT?new Date(SITE_AT).toLocaleDateString("ko-KR")+" (관리자 모드)":"관리자 모드에서 자동 기록";
 const info='<div class="pinfo"><div><span>담당 부서</span><b>'+(ov.dept&&ov.dept.trim()?esc(ov.dept.trim()):(PDEPD[x]?esc(PDEPD[x]):'<span style="font-weight:600;color:var(--gray)">현행 홈페이지 표기 없음 · 구축 때 지정</span>'))+'</b></div><div><span>최종 수정</span><b>'+esc(ovAt)+'</b></div><div><span>현행 홈페이지</span>'+(url?'<a href="'+url+'"'+EXT+'>이 화면 보기 ↗</a>':'<a href="https://www.google.com/search?q=site%3Agist.ac.kr+'+q+'"'+EXT+'>‘'+esc(x)+'’ gist.ac.kr에서 찾기 ↗</a>')+'</div></div>';
 const sat='<section class="psat" aria-label="페이지 만족도"><b>이 화면의 정보가 도움이 되었나요?</b><div class="psat-b" role="group" aria-label="만족도 고르기">'+["매우 만족","만족","보통","불만족"].map(v=>'<button type="button" data-sat="'+v+'">'+v+'</button>').join("")+'</div><p class="psat-m" role="status">[시안] 고른 결과는 저장하지 않습니다. 구축 때 담당 부서 집계로 연결합니다.</p></section>';
 const rel=nxJourney(G[1][k])+'<section class="prel"><h3>함께 찾는 메뉴</h3><div class="prel-g">'+G[1].map((xx,ki)=>ki===k?'':'<a href="'+pHref(i,g,ki)+'"'+(pExt(i,g,ki)?EXT:'')+'><b>'+esc(xx)+'</b><i data-lucide="arrow-up-right"></i></a>').join("")+'</div></section>';
 host.innerHTML='<div class="page-h pv"><div class="pv-bg" aria-hidden="true"><img loading="lazy" src="'+IMG(PIMG[i])+'" alt="" decoding="async"></div><div class="wrap"><span class="pv-en" aria-hidden="true">'+PEN[i]+'</span><h1>'+esc(M[0])+'</h1><p>'+esc(M[1])+'</p></div></div>'+
  '<nav class="pbar" aria-label="현재 위치"><div class="wrap"><a class="home" href="#home" aria-label="홈으로"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M3 11 12 4l9 7v9h-6v-6H9v6H3z"/></svg></a><ol>'+dd("pd1",M[0],topItems)+dd("pd2",G[0],grpItems)+dd("pd3",x,itmItems)+'</ol><span class="tools"><span class="pb-st" role="status"></span><button type="button" class="cp" aria-label="이 화면 주소 복사"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg></button><button type="button" class="pr" aria-label="이 화면 인쇄"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V3h12v6M6 18H4v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6h-2"/><rect x="6" y="14" width="12" height="7"/></svg></button></span></div></nav>'+
  '<div class="wrap"><div class="lnbw">'+lnb+'<div class="lnb-main pg-main"><h2 class="pg-t">'+esc(x)+'</h2>'+body2+info+sat+rel+'</div></div></div>';
 document.title=x+" | GIST 홈페이지 D안";icons();}
{const _r=route;route=function(){const c=pageCtx();if(c){$$(".view").forEach(v=>v.classList.toggle("on",v.id==="v-page"));$$(".gnb a").forEach(a=>a.classList.toggle("on",+a.dataset.m===c.i));renderPage(c);scrollTo({top:0});heroState&&heroState();if(window.ScrollTrigger)setTimeout(()=>ScrollTrigger.refresh(),50);return;}document.title="GIST 홈페이지 D안";_r();};}
addEventListener("hashchange",()=>{if(pageCtx())route();else document.title="GIST 홈페이지 D안";});

/* ===== v180 연구 한 줄 — 연구 연결 지도 (주제 → 학과 → 연구실 → 연구소 → 소식 → 입학·협력) ===== */
const NX=[
 {k:"ai",n:"AI·데이터",e:"AI & DATA",ic:"sparkles",re:/AI|인공지능|지능|데이터|컴퓨팅|컴퓨터|추론|자율|햅틱|그래픽스|Art & Tech|인지|인터랙션|마이닝|정책|IMPACT/i,st:/AI|인공지능|딥러닝|머신러닝|LLM|에이전트|데이터/i,inst:/인공지능|문화기술/},
 {k:"chip",n:"반도체·양자·광",e:"CHIPS · QUANTUM · PHOTONICS",ic:"cpu",re:/반도체|양자|소자|집적|회로|광|레이저|포토닉|분광|아토초|X-선|플라즈마|마이크로웨이브|배선|SYMPLE/,st:/반도체|양자|소자|칩|광검출|웨이퍼|레이저/,inst:/반도체|광기술/},
 {k:"energy",n:"에너지·탄소중립",e:"ENERGY & NET ZERO",ic:"zap",re:/에너지|전기화학|촉매|전지|배터리|수소|탄소|연소|추진|핵융합|열전달|열관리/,st:/에너지|풍력|배터리|전지|수소|탄소|태양/,inst:/에너지/},
 {k:"earth",n:"환경·기후·지구",e:"ENVIRONMENT & CLIMATE",ic:"globe",re:/환경|기후|대기|에어로졸|물 안보|수질|수처리|수문|생태|지구|생지화학|미생물/,st:/기후|환경|대기|미세먼지|해양|생태|이산화탄소/,inst:/환경/},
 {k:"bio",n:"바이오·의료",e:"BIO & MEDICINE",ic:"heart-pulse",re:/바이오|생체|생물|의약|의료|의학|신약|단백질|유전|세포|신경|뇌|암생물|종양|면역|효소|펩타이드|대사|노화|염증|뉴로|의생|RNA|테라노스틱스|생화학|생식|바이러스|마이크로바이옴|신호전달|Biomechatronics/i,st:/생명|의료|의생명|심장|통증|단백질|뇌|약물|하이드로젤|암|세포|신경/,inst:/생명|동물/},
 {k:"mat",n:"소재·나노·화학",e:"MATERIALS & NANO",ic:"atom",re:/소재|재료|나노|고분자|합성|유기|분자|산화물|표면|고체 화학|계산화학|물질/,st:/소재|나노|고분자|촉매|분자|합성/,inst:/중앙기기/},
 {k:"robot",n:"로봇·기계·모빌리티",e:"ROBOTICS & MOBILITY",ic:"bot",re:/로봇|로보틱스|기계|제어|자동화|모빌리티|자율주행|유체|동역학|설계|시뮬레이션|진단|멤스|Biomechatronics|가공/i,st:/로봇|모빌리티|자율주행|드론|기계/,inst:/^$/},
 {k:"basic",n:"기초과학·이론",e:"FUNDAMENTAL SCIENCE",ic:"sigma",re:/이론|계산물리|고에너지|중력|응집물질|아토초|핵융합|가속/,st:/수학|수리|물리학|이론/,inst:/^$/,dept:/수리과학과/}
];
const NXCOL=["#DC2715","#4F5B54","#111418","#A17D44"];const NXCOLD=["#FF5A47","#9DB8AA","#FFFFFF","#E5B76E"];
const nxBase=n=>n.replace(/\s*[\(\[].*$/,"");
const nxRole=n=>((n.match(/[\(\[]([^\)\]]+)[\)\]]/)||[])[1]||"");
function nxLabs(t){return PROFDIR.filter(p=>DURL[p[1]]&&((p[3]&&t.re.test(p[3]))||(t.dept&&t.dept.test(p[1]))));}
function nxThemesOfLab(p){return NX.filter(t=>(p[3]&&t.re.test(p[3]))||(t.dept&&t.dept.test(p[1])));}
function nxStories(t){return STORIES.map((x,i)=>[x,i]).filter(([x])=>x.c!=="영상"&&t.st.test(x.t+" "+(x.body||"")));}
function nxThemesOfStory(x){return NX.filter(t=>t.st.test(x.t+" "+(x.body||"")));}
function nxDeptCol(d){return COLLEGES.findIndex(c=>c.d.includes(d));}
function mHref(name){if(name==="연구실 찾기")return "#nexus";for(let i=0;i<MEGA.length;i++)for(let g=0;g<MEGA[i][2].length;g++){const k=MEGA[i][2][g][1].indexOf(name);if(k>=0)return pHref(i,g,k);}return "#home";}
let nxSel={k:"ai",d:""};
function nxMap(t,L){
 const W=720,C=W/2;const by={};L.forEach(p=>{(by[p[1]]=by[p[1]]||[]).push(p)});
 const ds=Object.keys(by).sort((a,b)=>nxDeptCol(a)-nxDeptCol(b)||by[b].length-by[a].length);
 const tot=L.length||1;const minS=.058;const raw=ds.map(d=>Math.max(by[d].length/tot,minS));const sum=raw.reduce((a,b)=>a+b,0);
 let a0=-Math.PI/2;let lines="",nodes="",dots="";
 ds.forEach((d,i)=>{const share=raw[i]/sum*2*Math.PI;const am=a0+share/2;const R1=178;const x=C+Math.cos(am)*R1,y=C+Math.sin(am)*R1;const n=by[d].length;const r=Math.min(34,15+Math.sqrt(n)*4.6);const col=NXCOLD[nxDeptCol(d)]||"#FFFFFF";const on=!nxSel.d||nxSel.d===d;
  lines+='<path class="nx-l'+(on?'':' off')+'" d="M'+C+' '+C+' Q'+(C+Math.cos(am-.18)*R1*.55).toFixed(1)+' '+(C+Math.sin(am-.18)*R1*.55).toFixed(1)+' '+x.toFixed(1)+' '+y.toFixed(1)+'" stroke="'+col+'" stroke-width="'+Math.min(9,1.4+n*.55).toFixed(1)+'"/>';
  const per=Math.min(n,40);const span=Math.min(share*.86,per*.085);
  by[d].forEach((p,j)=>{const row=j%2;const aa=per===1?am:am-span/2+span*(j/(per-1));const R2=286+row*26;const lx=C+Math.cos(aa)*R2,ly=C+Math.sin(aa)*R2;
   lines+='<path class="nx-l2'+(on?'':' off')+'" d="M'+x.toFixed(1)+' '+y.toFixed(1)+'L'+lx.toFixed(1)+' '+ly.toFixed(1)+'" stroke="'+col+'"/>';
   dots+='<circle class="nx-dot'+(on?'':' off')+'" data-lab="'+PROFDIR.indexOf(p)+'" cx="'+lx.toFixed(1)+'" cy="'+ly.toFixed(1)+'" r="6.5" fill="'+col+'"><title>'+esc((p[3]||"연구실 이름 미기재")+" · "+nxBase(p[0])+" 교수 · "+d)+'</title></circle>';});
  const out=r+13;const tx=x+Math.cos(am)*out,ty=y+Math.sin(am)*out;const cs=Math.cos(am);const anc=cs>.35?"start":cs<-.35?"end":"middle";const dy=Math.sin(am)>.5?12:Math.sin(am)<-.5?-4:4;const big=n>=6;const tx2=big?x:tx,ty2=big?y+r+17:ty+dy;const anc2=big?"middle":anc;
  nodes+='<g class="nx-n'+(nxSel.d===d?' on':'')+(on?'':' off')+'" style="animation-delay:'+(120+i*70)+'ms" data-nxd="'+esc(d)+'" tabindex="0" role="button" aria-pressed="'+(nxSel.d===d)+'" aria-label="'+esc(d)+' '+n+'"><title>'+esc(d)+' 연구실 '+n+'곳만 보기</title><circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+r.toFixed(1)+'" fill="'+col+'"/><text class="nx-t" x="'+tx2.toFixed(1)+'" y="'+ty2.toFixed(1)+'" text-anchor="'+anc2+'">'+esc(d)+'</text> <text class="nx-c num" style="fill:'+(col==="#FFFFFF"||col==="#E5B76E"||col==="#9DB8AA"?"#111418":"#fff")+'" x="'+x.toFixed(1)+'" y="'+(y+5).toFixed(1)+'" text-anchor="middle">'+n+'</text></g>';
  a0+=share;});
 return '<svg class="nx-svg" viewBox="0 0 '+W+' '+W+'" role="img" aria-label="'+esc(t.n)+' 주제와 이어진 학과 '+ds.length+'개, 연구실 '+L.length+'곳의 연결 그림"><g class="nx-stars" aria-hidden="true">'+Array.from({length:46},(_,q)=>{const a=q*2.399963,r=40+((q*53)%330);return '<circle cx="'+(C+Math.cos(a)*r).toFixed(1)+'" cy="'+(C+Math.sin(a)*r).toFixed(1)+'" r="'+(q%5===0?1.6:1)+'" style="animation-delay:'+(q%7)*400+'ms"/>'}).join("")+'</g><circle class="nx-halo" cx="'+C+'" cy="'+C+'" r="120"/><circle class="nx-ring" cx="'+C+'" cy="'+C+'" r="178"/><circle class="nx-ring" cx="'+C+'" cy="'+C+'" r="299"/>'+lines+dots+nodes+'<g class="nx-core"><circle cx="'+C+'" cy="'+C+'" r="74"/><text class="nx-ce" x="'+C+'" y="'+(C-16)+'" text-anchor="middle">'+esc(t.e.split(" ")[0])+'</text><text class="nx-ck" x="'+C+'" y="'+(C+12)+'" text-anchor="middle">'+esc(t.n.split("·")[0])+'</text><text class="nx-cs" x="'+C+'" y="'+(C+34)+'" text-anchor="middle">'+esc(t.n.split("·").slice(1).join("·"))+'</text></g></svg>';
}
function nxPanel(t,L){
 const by={};L.forEach(p=>{(by[p[1]]=by[p[1]]||[]).push(p)});const ds=Object.keys(by).sort((a,b)=>nxDeptCol(a)-nxDeptCol(b)||by[b].length-by[a].length);
 const show=nxSel.d&&by[nxSel.d]?[nxSel.d]:ds;
 const dchips='<div class="nx-dch" role="group" aria-label="학과로 좁히기"><button type="button" data-nxd="" aria-pressed="'+(!nxSel.d)+'">전체 <span class="num">'+L.length+'</span></button>'+ds.map(d=>'<button type="button" data-nxd="'+esc(d)+'" aria-pressed="'+(nxSel.d===d)+'"><i style="background:'+NXCOL[nxDeptCol(d)]+'"></i>'+esc(d)+' <span class="num">'+by[d].length+'</span></button>').join("")+'</div>';
 const labs=show.map(d=>'<div class="nx-dg"><h3><i style="background:'+NXCOL[nxDeptCol(d)]+'"></i><a href="#d-'+DURL[d]+'">'+esc(d)+'</a><small>'+esc(COLLEGES[nxDeptCol(d)].n)+' · <span class="num">'+by[d].length+'</span>곳</small></h3><ul>'+by[d].map(p=>{const oth=nxThemesOfLab(p).filter(x=>x!==t);return '<li data-lab="'+PROFDIR.indexOf(p)+'"><a href="#search" data-nxq="'+esc(nxBase(p[0]))+'"><b>'+esc(p[3]||"(연구실 이름 미기재)")+'</b><span>'+esc(nxBase(p[0]))+' 교수'+(nxRole(p[0])?' · '+esc(nxRole(p[0])):'')+'</span></a>'+(oth.length?'<span class="nx-x" aria-label="함께 이어진 주제">'+oth.map(x=>'<a href="#nexus-'+x.k+'">'+esc(x.n.split("·")[0])+'</a>').join("")+'</span>':'')+'</li>'}).join("")+'</ul></div>').join("");
 return dchips+'<div class="nx-labs">'+labs+'</div>';
}
function nxSide(t){
 const ins=LABS.filter(x=>t.inst.test(x[0]));const S=nxStories(t).slice(0,4);
 const go=(lab,arr)=>'<div class="nx-go"><span class="eyebrow">'+lab+'</span><div>'+arr.map(n=>'<a href="'+mHref(n[0])+'">'+esc(n[1]||n[0])+' <i data-lucide="arrow-right"></i></a>').join("")+'</div></div>';
 return '<div class="nx-side">'+
  '<section><h3>이 주제의 최근 소식 <small>지금, 지스트</small></h3>'+(S.length?'<div class="nx-st">'+S.map(([x,i])=>'<a href="#st-'+i+'"><img loading="lazy" src="'+sImg(x).u+'" alt=""><span><span class="gk">'+esc(x.c)+' · <span class="num">'+esc(x.d||x.m||"")+'</span></span><b>'+esc(x.t)+'</b></span></a>').join("")+'</div>':'<p class="nx-none">지금 색인에 이 주제 소식이 없습니다. <a href="#story">지금, 지스트 전체 보기</a></p>')+'</section>'+
  '<section><h3>이어진 연구소·센터</h3>'+(ins.length?'<div class="nx-ins">'+ins.map(x=>'<a href="'+x[1]+'"'+EXT+'><i data-lucide="'+x[2]+'"></i><b>'+esc(x[0])+'</b><span>'+esc(x[1].replace(/^https?:\/\//,"").replace(/\/$/,""))+' ↗</span></a>').join("")+'</div>':'<p class="nx-none">이 주제 이름으로 바로 이어지는 부설 연구소는 색인에 없습니다. <a href="'+mHref("부설 연구소")+'">부설 연구소 전체 보기</a></p>')+'</section>'+
  '<section><h3>다음 걸음</h3>'+go("이 분야로 진학",[["전형 안내","대학원 전형 안내"],["장학 제도"],["생활관"]])+go("함께 연구·사업화",[["공동연구 문의"],["기술이전"],["공동 연구장비"]])+'</section></div>';
}
function nxMatrix(){
 const mx=Math.max(...NX.map(t=>Math.max(...COLLEGES.map((c,ci)=>nxLabs(t).filter(p=>nxDeptCol(p[1])===ci).length))));
 return '<div class="tbl-w" tabindex="0" role="region" aria-label="주제와 단과대학이 만나는 표"><table class="tbl nx-mx"><thead><tr><th scope="col">연구 주제</th>'+COLLEGES.map((c,ci)=>'<th scope="col"><i style="background:'+NXCOL[ci]+'"></i>'+esc(c.n)+'</th>').join("")+'<th scope="col">이어진 학과</th><th scope="col">연구실</th></tr></thead><tbody>'+NX.map(t=>{const L=nxLabs(t);const nd=new Set(L.map(p=>p[1])).size;return '<tr><th scope="row"><a href="#nexus-'+t.k+'"><i data-lucide="'+t.ic+'"></i>'+esc(t.n)+'</a></th>'+COLLEGES.map((c,ci)=>{const n=L.filter(p=>nxDeptCol(p[1])===ci).length;return '<td class="num"'+(n?' style="background:rgba(220,39,21,'+(0.06+n/mx*0.5).toFixed(2)+')'+(n/mx>.62?';color:#fff':'')+'"':'')+'>'+(n||'<span class="sr">없음</span>–')+'</td>'}).join("")+'<td class="num"><b>'+nd+'</b>개</td><td class="num"><b>'+L.length+'</b>곳</td></tr>'}).join("")+'</tbody></table></div>';
}
function nxDraw(){const t=NX.find(x=>x.k===nxSel.k)||NX[0];const L=nxLabs(t);const m=$("#nxmap"),p=$("#nxpanel"),s=$("#nxside");if(!m)return;
 m.innerHTML=nxMap(t,L)+'<div class="nx-leg">'+COLLEGES.map((c,ci)=>'<span><i style="background:'+NXCOLD[ci]+'"></i>'+esc(c.n)+'</span>').join("")+'</div>';
 p.innerHTML='<h2 class="nx-h2"><i data-lucide="'+t.ic+'"></i>'+esc(t.n)+'<small>학과 <b class="num">'+new Set(L.map(x=>x[1])).size+'</b>개 · 연구실 <b class="num">'+L.length+'</b>곳'+(new Set(L.map(x=>nxDeptCol(x[1]))).size>1?' · 단과대학 <b class="num">'+new Set(L.map(x=>nxDeptCol(x[1]))).size+'</b>곳이 함께':'')+'</small></h2>'+nxPanel(t,L);
 s.innerHTML=nxSide(t);$$("#nxtabs button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.nx===t.k));icons();}
function renderNexus(k){const host=$("#v-page");if(k&&NX.some(x=>x.k===k)){if(nxSel.k!==k)nxSel.d="";nxSel.k=k;}
 const all=new Set();NX.forEach(t=>nxLabs(t).forEach(p=>all.add(p)));const multi=[...all].filter(p=>nxThemesOfLab(p).length>1).length;const un=PROFDIR.filter(p=>DURL[p[1]]&&!all.has(p)).length;
 host.innerHTML='<div class="nxhero"><div class="wrap"><nav class="nxhero-c" aria-label="위치"><a href="#home">홈</a><i data-lucide="chevron-right"></i><a href="#colleges">대학·학과</a><i data-lucide="chevron-right"></i><span>연구 한 줄</span></nav><h1><b lang="en">RESEARCH</b><span>연구 연결 지도</span></h1><p>주제 하나로 학과 · 연구실 · 소식 · 입학까지 이어 봅니다.</p><ul class="nxhero-k"><li><b class="num">'+NX.length+'</b>주제</li><li><b class="num">'+new Set([...all].map(p=>p[1])).size+'</b>학과</li><li><b class="num">'+all.size+'</b>연구실</li></ul>'+
 '<div class="nx-tabs" id="nxtabs" role="group" aria-label="연구 주제 고르기">'+NX.map(t=>'<button type="button" data-nx="'+t.k+'" aria-pressed="false"><i data-lucide="'+t.ic+'"></i><span><b>'+esc(t.n)+'</b><em>'+esc(t.e)+'</em></span><small class="num">'+nxLabs(t).length+'</small></button>').join("")+'</div></div></div><div class="wrap nx" style="padding-block:0 90px">'+
 '<div class="nx-g"><div class="nx-mapw" id="nxmap"></div><div class="nx-pan" id="nxpanel" aria-live="polite"></div></div>'+
 '<div id="nxside"></div>'+
 '<h2 class="pg-t" style="margin-top:64px">융합 한눈에 보기 <small style="font-size:.5em;color:var(--mute);font-weight:600">주제 × 단과대학</small></h2><p class="nx-lead">한 주제를 여러 단과대학이 함께 연구합니다. 칸의 숫자는 연구실 수, 색이 짙을수록 많습니다. 주제 이름을 누르면 위 지도가 바뀝니다.</p>'+nxMatrix()+
 '<p class="nx-fine">연구실 이름으로 주제를 자동 분류했습니다. 구축 때는 학과가 직접 지정합니다.</p></div>';
 document.title="연구 한 줄 연구 연결 지도 | GIST 홈페이지 D안";nxDraw();}
document.addEventListener("click",e=>{
 const tb=e.target.closest("#nxtabs button");if(tb){nxSel={k:tb.dataset.nx,d:""};history.replaceState(null,"","#nexus-"+tb.dataset.nx);nxDraw();return;}
 const nd=e.target.closest("[data-nxd]");if(nd&&nd.closest(".nx")){const d=nd.dataset.nxd;nxSel.d=(nxSel.d===d?"":d);nxDraw();return;}
 const q=e.target.closest("a[data-nxq]");if(q&&!q.dataset.nxgo&&(q.closest(".nx-labs")||q.closest(".nxd-l"))){e.preventDefault();nxLabOpen(q);return;}if(q){e.preventDefault();const i=$("#q");if(i)i.value=q.dataset.nxq;location.hash="search";setTimeout(()=>{if(i)i.value=q.dataset.nxq;typeof runSearch==="function"&&runSearch();},140);return;}
 const dot=e.target.closest(".nx-dot");if(dot){const li=document.querySelector('.nx-labs li[data-lab="'+dot.dataset.lab+'"]');if(li){li.scrollIntoView({block:"center",behavior:"smooth"});li.classList.add("hit");setTimeout(()=>li.classList.remove("hit"),1600);}}
});
document.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches&&e.target.matches(".nx-n")){e.preventDefault();e.target.dispatchEvent(new MouseEvent("click",{bubbles:true}));}});
document.addEventListener("pointerover",e=>{const li=e.target.closest&&e.target.closest(".nx-labs li[data-lab]");$$(".nx-dot.hot").forEach(x=>x.classList.remove("hot"));if(li){const c=document.querySelector('.nx-dot[data-lab="'+li.dataset.lab+'"]');c&&c.classList.add("hot");}});
{const _rn=route;route=function(){const m=(LH()||"").match(/^#nexus(?:-([a-z]+))?$/);if(m){$$(".view").forEach(v=>v.classList.toggle("on",v.id==="v-page"));$$(".gnb a").forEach(a=>a.classList.toggle("on",+a.dataset.m===3));renderNexus(m[1]);scrollTo({top:0});typeof heroState==="function"&&heroState();return;}_rn();};}
addEventListener("hashchange",()=>{if(/^#nexus/.test(LH()||""))route();});
PSPECIAL["연구실 찾기"]="#nexus";
/* 학과 화면: 연구실 + 이어진 주제 */
function nxDept(n){const P=PROFDIR.filter(p=>p[1]===n);if(!P.length)return "";const ts=NX.map(t=>[t,P.filter(p=>(p[3]&&t.re.test(p[3]))||(t.dept&&t.dept.test(n))).length]).filter(x=>x[1]).sort((a,b)=>b[1]-a[1]);const named=P.filter(p=>p[3]);
 return '<section class="nxd" id="nxd-sec" aria-labelledby="nxdh"><h3 class="p-h3" id="nxdh">연구실·교수 <small><span class="num">'+P.length+'</span>명'+(named.length?' · 연구실 이름 공개 <span class="num">'+named.length+'</span>곳':'')+'</small></h3>'+
 (ts.length?'<div class="nxd-t"><span class="eyebrow">이 학과와 이어진 연구 주제</span><div>'+ts.map(([t,c])=>'<a href="#nexus-'+t.k+'"><i data-lucide="'+t.ic+'"></i>'+esc(t.n)+' <b class="num">'+c+'</b></a>').join("")+'</div><p>주제를 누르면 같은 주제를 연구하는 다른 학과·연구소·소식까지 연구 한 줄에서 이어 봅니다.</p></div>':'')+
 nxDeptPeers(n,ts)+'<ul class="nxd-l">'+P.map(p=>'<li><a href="#search" data-nxq="'+esc(nxBase(p[0]))+'"><b>'+esc(p[3]||nxBase(p[0])+" 교수")+'</b><span>'+(p[3]?esc(nxBase(p[0]))+' 교수':'')+(nxRole(p[0])?(p[3]?' · ':'')+esc(nxRole(p[0])):'')+'</span></a></li>').join("")+'</ul><p class="note">교수·연구실 이름은 현행 학과 홈페이지 교수진 공개 화면 기준입니다. 이름을 누르면 지스트에 물어봐에서 내선과 함께 찾습니다.</p></section>';}
/* 세부 화면: 이어서 하기(여정) */
const JOUR=[["예비 학부생","graduation-cap",["학과 둘러보기","입학 전형","모집 요강","장학 제도","생활관","캠퍼스 투어"]],["대학원 지원자","flask-conical",["연구 분야","연구실 찾기","전형 안내","장학 제도","생활관"]],["재학생","book-open",["학사일정","수강신청","증명서 발급","상담센터","학생기구"]],["기업·연구자","handshake",["연구 분야","기술이전","공동연구 문의","공동 연구장비","창업 지원"]],["방문자","map-pin",["찾아오시는 길","3D 캠퍼스맵","캠퍼스 투어","오룡관 예약"]]];
function nxJourney(name){const J=JOUR.filter(j=>j[2].includes(name)).slice(0,2);if(!J.length)return "";
 return '<section class="jr" aria-label="이어서 하기"><h3>이어서 하기 <small>이 화면 다음에 많이 가는 길</small></h3>'+J.map(j=>{const at=j[2].indexOf(name);const nx=j[2][at+1];return '<div class="jr-r"><span class="jr-w"><i data-lucide="'+j[1]+'"></i>'+esc(j[0])+'</span><ol>'+j[2].map((s,si)=>'<li'+(si===at?' class="on" aria-current="step"':si<at?' class="jr-d"':'')+'>'+(si===at?'<span><em class="num">'+(si+1)+'</em>'+esc(s)+'</span>':'<a href="'+mHref(s)+'"><em class="num">'+(si+1)+'</em>'+esc(s==="연구실 찾기"?"연구실 찾기 (연구 한 줄)":s)+'</a>')+'</li>').join("")+'</ol>'+(nx?'<a class="jr-n" href="'+mHref(nx)+'">다음: '+esc(nx)+' <i data-lucide="arrow-right"></i></a>':'<span class="jr-n end">이 길의 마지막 화면입니다</span>')+'</div>'}).join("")+'</section>';}
/* 소식 글: 이어진 연구 주제 */
function nxStoryRel(x){const T=nxThemesOfStory(x).slice(0,3);if(!T.length)return "";const tx=(x.s||"")+" "+x.t;const dn=Object.keys(DURL).sort((a,b)=>b.length-a.length).find(n=>tx.includes(n)||tx.includes(n.replace(/·/g,"")));
 return '<section class="nxs" aria-label="이 소식과 이어진 연구"><span class="eyebrow">이 소식과 이어진 연구</span><div>'+T.map(t=>'<a href="#nexus-'+t.k+'"><i data-lucide="'+t.ic+'"></i>'+esc(t.n)+' <small>연구실 <span class="num">'+nxLabs(t).length+'</span>곳</small></a>').join("")+(dn?'<a class="d" href="#d-'+DURL[dn]+'"><i data-lucide="building-2"></i>'+esc(dn)+'</a>':'')+'</div></section>';}
/* 첫 화면: Nexus 들머리 */
(function(){const h=$("#pnexus");if(!h)return;h.innerHTML=nxTeaser();icons();})();

/* v180 Nexus: 통합검색·연구 분야 화면 연결 */
const NXAL={ai:["AI","인공지능","데이터"],chip:["반도체","양자","광학","레이저"],energy:["에너지","배터리","수소","탄소"],earth:["환경","기후","대기"],bio:["바이오","의료","생명","신약"],mat:["소재","나노","고분자"],robot:["로봇","기계","모빌리티","자율주행"],basic:["수학","기초과학","이론물리"]};
function nxTeaser(){const all=new Set();NX.forEach(t=>nxLabs(t).forEach(p=>all.add(p)));
 return '<div class="nxh-l"><span class="eyebrow">연구 한 줄 · 끊김 없이 연결</span><h2>학과에서 멈추지 않고<br>연구실 · 소식 · 입학까지</h2><p>학과 이름을 몰라도 됩니다. 관심 주제를 고르면 그 주제를 연구하는 <b class="num">'+new Set([...all].map(p=>p[1])).size+'</b>개 학과, <b class="num">'+all.size+'</b>개 연구실이 한 화면에 이어집니다.</p><a class="nxh-b" href="#nexus">연구 연결 지도 열기 <i data-lucide="arrow-right"></i></a></div><div class="nxh-r">'+NX.map(t=>{const L=nxLabs(t);return '<a href="#nexus-'+t.k+'"><i data-lucide="'+t.ic+'"></i><b>'+esc(t.n)+'</b><span>학과 <em class="num">'+new Set(L.map(p=>p[1])).size+'</em> · 연구실 <em class="num">'+L.length+'</em></span></a>'}).join("")+'</div>';}
{const _rs=runSearch;runSearch=function(){_rs();try{const q=($("#q").value||"").replace(/\s/g,"");if(q.length<2)return;const up=q.toUpperCase();const T=NX.filter(t=>NXAL[t.k].some(a=>up.includes(a.toUpperCase()))).slice(0,2);if(!T.length)return;const r=$("#res");if(!r)return;
 r.insertAdjacentHTML("afterbegin",T.map(t=>{const L=nxLabs(t);return '<li class="ri nxr"><a href="#nexus-'+t.k+'"><span class="src"><span>연구 한 줄</span>연구 연결 지도</span><b><i data-lucide="'+t.ic+'"></i> ‘'+esc(t.n)+'’ 주제로 이어 보기</b><p>이 주제를 연구하는 학과 '+new Set(L.map(p=>p[1])).size+'개 · 연구실 '+L.length+'곳 · 연구소 · 최근 소식 '+nxStories(t).length+'건을 한 화면에서 봅니다.</p></a></li>'}).join(""));icons();}catch(e){}};}
{const _rf=PBODY["연구 분야"];if(_rf)PBODY["연구 분야"]=()=>_rf()+'<div class="nxh" style="margin-top:34px">'+nxTeaser()+'</div>';}


/* ===== v182 온라인 신청 센터 — 제안요청서 SFR-006~009의 신청형 기능을 양식 하나의 틀로 (시안: 이 기기에만 저장) ===== */
const AP_NOTE="시안이라 입력한 내용은 이 기기에만 저장됩니다.";
const AP_ST=["접수","확정","완료","취소"];
const apDeptOpts=()=>Object.keys(DURL);
const AP_COMMON=[["nm","신청자 이름","text",null,1],["em","이메일","email",null,1],["ph","연락처","tel",null,0]];
const AP=[
 {id:"ua-mat",g:"대학 입학",n:"입시자료 신청",ic:"package",own:"입학팀",pf:"UM",d:"모집요강·학교 안내 책자를 우편이나 방문으로 받습니다.",f:[["kind","자료 종류","select",["모집요강","학교 안내 책자","학과 안내 자료"],1],["qty","수량","number",[1,30],1],["recv","받는 방법","radio",["우편","방문 수령"],1],["addr","받을 주소 (우편일 때)","text",null,0]],st:["접수","발송","완료","취소"]},
 {id:"ua-visit",g:"대학 입학",n:"대학 방문 참가 신청",ic:"map-pinned",own:"입학팀",pf:"UV",d:"캠퍼스 방문 프로그램에 참가를 신청합니다. 날짜별 정원을 넘으면 마감됩니다.",cap:40,capKey:["day","prog"],f:[["day","방문 희망일","date",null,1],["prog","프로그램","select",["캠퍼스 투어","입학 설명","연구실 견학"],1],["cnt","참가 인원","number",[1,40],1],["org","소속 (학교·단체)","text",null,0]]},
 {id:"ua-consult",g:"대학 입학",n:"입학 상담 신청",ic:"messages-square",own:"입학팀",pf:"UC",d:"방문·전화·온라인 가운데 편한 방법으로 상담을 신청합니다.",f:[["area","상담 분야","select",["수시 전형","정시 전형","장학·등록금","학교생활","기타"],1],["when","희망 일시","datetime-local",null,1],["how","상담 방법","radio",["방문","전화","온라인"],1],["msg","상담 내용","textarea",null,1]]},
 {id:"ua-hs",g:"대학 입학",n:"고교 방문 입학설명회 신청",ic:"school",own:"입학팀",pf:"UH",d:"고등학교로 찾아가는 입학설명회를 신청합니다.",f:[["hs","고등학교 이름","text",null,1],["when","희망 일시","datetime-local",null,1],["cnt","참석 예상 인원","number",[1,1000],1],["msg","요청 사항","textarea",null,0]]},
 {id:"ga-info",g:"대학원 입학",n:"대학원 입학설명회 신청",ic:"presentation",own:"대학원 입학 담당 부서",pf:"GI",d:"온라인·오프라인 입학설명회 참가를 신청합니다.",f:[["sch","출신(재학) 학교","text",null,1],["term","지원 예정 학기","select",["2027년 봄학기","2027년 가을학기","미정"],1],["dept","지원 예정 학과","dept",null,1],["mode","참가 방식","radio",["오프라인","온라인"],1]]},
 {id:"ga-intern",g:"대학원 입학",n:"인턴십 신청",ic:"briefcase",own:"대학원 입학 담당 부서",pf:"GN",d:"학과와 연구실을 골라 인턴십을 신청합니다. 연구실 목록은 연구 한 줄과 같은 자료입니다.",f:[["dept","희망 학과","dept",null,1],["lab","희망 연구실","lab",null,0],["sch","소속 학교·학년","text",null,1],["msg","지원 동기","textarea",null,1],["file","이력서 파일 이름 (시안: 파일은 올리지 않음)","text",null,0]],st:["접수","심사","선발","취소"]},
 {id:"ga-openlab",g:"대학원 입학",n:"오픈랩 참가 신청",ic:"door-open",own:"대학원 입학 담당 부서",pf:"GO",d:"연구실을 직접 둘러보는 오픈랩에 참가를 신청합니다. 연구실별 정원을 넘으면 마감됩니다.",cap:15,capKey:["dept","lab","day"],f:[["dept","참가 학과","dept",null,1],["lab","참가 연구실","lab",null,0],["day","참가 희망일","date",null,1],["cnt","참가 인원","number",[1,15],1]]},
 {id:"ipa-app",g:"International",n:"Exchange · Global Internship · Consultation",ic:"globe-2",own:"글로벌협력실 (IPA)",pf:"IP",en:1,d:"One form for exchange students, global internships and consultations.",f:[["type","Program","select",["Exchange student (inbound)","Exchange student (outbound)","Global internship","Consultation"],1],["home","Home university","text",null,1],["term","Preferred term","select",["Spring 2027","Fall 2027","Undecided"],1],["dept","Department of interest","dept",null,0],["msg","Message","textarea",null,0]],st:["Received","Confirmed","Completed","Cancelled"]},
 {id:"df-pledge",g:"발전기금",n:"온라인 기부 약정",ic:"heart-handshake",own:"발전기금 담당 부서",pf:"DF",d:"약정 유형과 금액을 정해 기부를 약정합니다. 결제 정보는 받지 않습니다.",f:[["kind","약정 유형","radio",["일시 기부","정기 기부"],1],["amt","약정 금액 (원)","number",[1000,1000000000],1],["term","기간 (정기일 때, 개월)","number",[1,120],0],["use","기부 목적","select",["GIST에 일임","장학","연구","시설"],1],["open","기부자 명단 공개","radio",["공개","비공개"],1]]}
];
let apMem=null;
function apLoad(){if(apMem)return apMem;try{apMem=JSON.parse(localStorage.getItem("gistd-apply")||"[]")}catch(e){apMem=[]}if(!Array.isArray(apMem))apMem=[];return apMem;}
function apSave(){try{localStorage.setItem("gistd-apply",JSON.stringify(apMem))}catch(e){}}
const apF=id=>AP.find(x=>x.id===id);
const apSt=(F,i)=>(F.st||AP_ST)[i];
function apUsed(F,v){if(!F.cap)return 0;return apLoad().filter(r=>r.f===F.id&&r.s!==3&&F.capKey.every(k=>(r.v[k]||"")===(v[k]||""))).reduce((a,r)=>a+(+r.v.cnt||1),0);}
function apField(F,x){const [k,lab,tp,op,req]=x;const id="ap-"+k;const L=F.en?{sel:"Select",opt:"optional"}:{sel:"고르세요",opt:"선택"};let c="";
 const rq=req?' required aria-required="true"':'';
 if(tp==="select")c='<select id="'+id+'" name="'+k+'"'+rq+'><option value="">'+L.sel+'</option>'+op.map(o=>'<option>'+esc(o)+'</option>').join("")+'</select>';
 else if(tp==="dept")c='<select id="'+id+'" name="'+k+'"'+rq+' data-apdept><option value="">'+L.sel+'</option>'+COLLEGES.map(C=>'<optgroup label="'+esc(C.n)+'">'+C.d.map(o=>'<option>'+esc(o)+'</option>').join("")+'</optgroup>').join("")+'</select>';
 else if(tp==="lab")c='<select id="'+id+'" name="'+k+'" data-aplab><option value="">'+(F.en?"Any lab":"학과를 먼저 고르세요 (정하지 않아도 됩니다)")+'</option></select>';
 else if(tp==="radio")return '<fieldset class="ap-f"><legend>'+esc(lab)+(req?' <em aria-hidden="true">*</em>':'')+'</legend><div class="ap-r">'+op.map((o,i)=>'<label><input type="radio" name="'+k+'" value="'+esc(o)+'"'+(req&&!i?' required':'')+'><span>'+esc(o)+'</span></label>').join("")+'</div><p class="ap-e" data-e="'+k+'" role="alert"></p></fieldset>';
 else if(tp==="textarea")c='<textarea id="'+id+'" name="'+k+'" rows="4" maxlength="1000"'+rq+'></textarea>';
 else if(tp==="number")c='<input id="'+id+'" name="'+k+'" type="number" inputmode="numeric" min="'+op[0]+'" max="'+op[1]+'"'+rq+'>';
 else c='<input id="'+id+'" name="'+k+'" type="'+tp+'"'+(tp==="email"?' autocomplete="email" placeholder="name@example.com"':tp==="tel"?' autocomplete="tel" placeholder="010-0000-0000"':tp==="date"?' min="'+new Date().toISOString().slice(0,10)+'"':'')+' maxlength="120"'+rq+'>';
 return '<div class="ap-f'+(tp==="textarea"||k==="addr"||k==="file"?' w':'')+'"><label for="'+id+'">'+esc(lab)+(req?' <em aria-hidden="true">*</em>':' <small>('+L.opt+')</small>')+'</label>'+c+'<p class="ap-e" data-e="'+k+'" role="alert"></p></div>';}
function dHero(word,title,lead){return '<div class="nxhero dh"><div class="wrap"><nav class="nxhero-c" aria-label="위치"><a href="#home">홈</a><i data-lucide="chevron-right"></i><span>'+title+'</span></nav><h1><b lang="en">'+word+'</b><span>'+title+'</span></h1>'+(lead?'<p>'+lead+'</p>':'')+'</div></div>';}
function apHead(en,t,p){return dHero(String(en).split(" ")[0],t,p);}
function apNav(cur){return '<nav class="ap-nav" aria-label="신청 센터 메뉴"><a href="#apply"'+(cur==="hub"?' aria-current="page"':'')+'><i data-lucide="layout-grid"></i>신청 양식</a><a href="#apply-my"'+(cur==="my"?' aria-current="page"':'')+'><i data-lucide="clipboard-list"></i>내 신청 내역 <b class="num">'+apLoad().length+'</b></a><a href="#apply-admin"'+(cur==="admin"?' aria-current="page"':'')+'><i data-lucide="shield-check"></i>담당자 화면 (미리보기)</a></nav><p class="ap-note"><i data-lucide="info"></i>'+AP_NOTE+'</p>';}
function renderApplyHub(){const gs=[...new Set(AP.map(x=>x.g))];
 $("#v-page").innerHTML=apHead("APPLY","온라인 신청 센터","입시자료·방문·상담·설명회·인턴십·오픈랩·국제교류·기부 약정까지, 신청은 한곳에서 하고 접수번호로 진행 상황을 확인합니다.")+
 '<div class="wrap ap" style="padding-block:36px 90px">'+apNav("hub")+
 gs.map(g=>'<h2 class="ap-g">'+esc(g)+'</h2><div class="ap-cards">'+AP.filter(x=>x.g===g).map(F=>'<a class="ap-c" href="#apply-'+F.id+'"'+(F.en?' lang="en"':'')+'><i data-lucide="'+F.ic+'"></i><b>'+esc(F.n)+'</b><span>'+esc(F.d)+'</span><em>'+(F.en?"Apply":"신청하기")+' <i data-lucide="arrow-right"></i></em></a>').join("")+'</div>').join("")+
 '<p class="note" style="margin-top:26px">양식 항목은 「GIST 홈페이지 통합 재구축 제안요청서」 기능 요구사항(대학 입학 SFR-006, 대학원 입학 SFR-007, 국제교류협력 SFR-008, 발전기금 SFR-009)에 적힌 신청·조회·관리 항목을 그대로 옮겼습니다. [시안] 실제 일정·정원·담당 부서 이름은 구축 때 담당 부서가 정합니다. <a href="#rfp">제안요청서 대조표 보기</a></p></div>';
 document.title="온라인 신청 센터 | GIST 홈페이지 D안";icons();}
function renderApplyForm(F){const pre=window.__apPre||{};window.__apPre=null;const T=F.en?{b:"Submit application",c:"I agree to the collection and use of personal information (required)",ci:"Items: name, e-mail, phone · Purpose: handling this application · Retention: until processing is complete",own:"Office in charge"}:{b:"신청하기",c:"개인정보 수집·이용에 동의합니다 (필수)",ci:"수집 항목: 이름·이메일·연락처 · 목적: 신청 접수와 안내 · 보유: 처리 끝날 때까지",own:"담당 부서"};
 $("#v-page").innerHTML=apHead("APPLY",esc(F.n),esc(F.d))+'<div class="wrap ap" style="padding-block:36px 90px">'+apNav("")+
 '<div class="ap-fw"><form class="ap-form" id="apform" novalidate data-f="'+F.id+'"'+(F.en?' lang="en"':'')+'><div class="ap-sum" id="apsum" role="alert" tabindex="-1" hidden></div><div class="ap-grid">'+F.f.concat(F.en?[["nm","Name","text",null,1],["em","E-mail","email",null,1],["ph","Phone","tel",null,0]]:AP_COMMON).map(x=>apField(F,x)).join("")+'</div>'+
 (F.cap?'<p class="ap-cap" id="apcap" aria-live="polite"></p>':'')+
 '<label class="ap-agree"><input type="checkbox" name="agree" required><span><b>'+T.c+'</b><small>'+T.ci+'</small></span></label><p class="ap-e" data-e="agree" role="alert"></p>'+
 '<div class="ap-act"><button type="submit" class="ap-b">'+T.b+' <i data-lucide="arrow-right"></i></button><a href="#apply">'+(F.en?"Back to all forms":"다른 양식 보기")+'</a></div></form>'+
 '<aside class="ap-side"><span class="eyebrow">'+T.own+'</span><b>'+esc(F.own)+'</b><ol><li>'+(F.en?"Fill in and submit":"양식을 써서 신청")+'</li><li>'+(F.en?"Get a receipt number":"접수번호 받기")+'</li><li>'+(F.en?"Track status in “My applications”":"‘내 신청 내역’에서 진행 상황 확인")+'</li><li>'+(F.en?"Cancel anytime before confirmation":"확정 전에는 직접 취소")+'</li></ol><p>'+(F.en?"Status":"진행 단계")+': '+(F.st||AP_ST).slice(0,3).map(esc).join(" → ")+'</p></aside></div></div>';
 Object.keys(pre).forEach(k=>{const el=$('#apform [name="'+k+'"]');if(el){el.value=pre[k];if(el.hasAttribute("data-apdept"))apLabs(el);}});if(pre.lab){const l=$('#apform [name="lab"]');if(l)l.value=pre.lab;}
 document.title=F.n+" | 온라인 신청 센터";icons();apCap();}
function apLabs(sel){const l=$("#apform [data-aplab]");if(!l)return;const P=PROFDIR.filter(p=>p[1]===sel.value&&p[3]);l.innerHTML='<option value="">'+(sel.value?(P.length?"정하지 않음 (학과에 맡김)":"공개된 연구실 이름이 없습니다"):"학과를 먼저 고르세요")+'</option>'+P.map(p=>'<option value="'+esc(p[3])+'">'+esc(p[3])+' · '+esc(nxBase(p[0]))+' 교수</option>').join("");}
function apVals(){const fm=$("#apform");const v={};new FormData(fm).forEach((val,k)=>{v[k]=String(val).trim()});return v;}
function apCap(){const fm=$("#apform"),c=$("#apcap");if(!fm||!c)return;const F=apF(fm.dataset.f);const v=apVals();if(!F.capKey.filter(k=>k!=="lab").every(k=>v[k])){c.textContent="날짜"+(F.capKey.includes("dept")?"·학과":"·프로그램")+"를 고르면 남은 자리를 보여 줍니다. (시안 정원 "+F.cap+"명)";c.className="ap-cap";return;}const u=apUsed(F,v);const left=F.cap-u;c.innerHTML=left>0?'남은 자리 <b class="num">'+left+'</b>명 / 정원 '+F.cap+'명 (시안 값)':'<b>마감되었습니다.</b> 다른 날짜를 골라 주세요. (정원 '+F.cap+'명)';c.className="ap-cap"+(left>0?"":" full");}
document.addEventListener("change",e=>{if(e.target.matches&&e.target.matches("#apform [data-apdept]"))apLabs(e.target);if(e.target.closest&&e.target.closest("#apform"))apCap();});
document.addEventListener("submit",e=>{const fm=e.target;if(fm.id!=="apform")return;e.preventDefault();const F=apF(fm.dataset.f);const v=apVals();const errs=[];const en=F.en;
 const all=F.f.concat(en?[["nm","Name","text",null,1],["em","E-mail","email",null,1],["ph","Phone","tel",null,0]]:AP_COMMON);
 $$("#apform .ap-e").forEach(p=>p.textContent="");$$("#apform [aria-invalid]").forEach(x=>x.removeAttribute("aria-invalid"));
 const bad=(k,m)=>{errs.push([k,m]);const p=$('#apform .ap-e[data-e="'+k+'"]');if(p)p.textContent=m;const el=$('#apform [name="'+k+'"]');el&&el.setAttribute("aria-invalid","true");};
 all.forEach(([k,lab,tp,op,req])=>{const x=v[k]||"";if(req&&!x){bad(k,en?lab+" is required.":"‘"+lab+"’을(를) 넣어 주세요.");return;}if(!x)return;
  if(tp==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(x))bad(k,en?"Check the e-mail address.":"이메일 주소 모양을 확인해 주세요. 예: name@example.com");
  if(tp==="tel"&&!/^[0-9+\-\s()]{8,20}$/.test(x))bad(k,en?"Check the phone number.":"연락처는 숫자와 - 만 넣어 주세요.");
  if(tp==="number"&&(+x<op[0]||+x>op[1]||!/^\d+$/.test(x)))bad(k,(en?"Enter a number between ":"")+op[0].toLocaleString()+"~"+op[1].toLocaleString()+(en?".":" 사이 숫자를 넣어 주세요."));
  if((tp==="date"||tp==="datetime-local")&&new Date(x)<new Date(new Date().toDateString()))bad(k,en?"Choose a future date.":"오늘 이후 날짜를 골라 주세요.");});
 if(F.id==="ua-mat"&&v.recv==="우편"&&!v.addr)bad("addr","우편으로 받으려면 주소를 넣어 주세요.");
 if(!v.agree)bad("agree",en?"Please agree to continue.":"개인정보 수집·이용에 동의해야 신청할 수 있습니다.");
 if(F.cap&&!errs.length&&apUsed(F,v)+(+v.cnt||1)>F.cap)bad("cnt","남은 자리("+Math.max(0,F.cap-apUsed(F,v))+"명)보다 많습니다. 인원을 줄이거나 다른 날짜를 골라 주세요.");
 if(errs.length){const s=$("#apsum");s.hidden=false;s.innerHTML='<b>'+(en?"Please fix "+errs.length+" item(s).":"고칠 곳이 "+errs.length+"군데 있습니다.")+'</b><ul>'+errs.map(x=>'<li><a href="#" data-apgo="'+x[0]+'">'+esc(x[1])+'</a></li>').join("")+'</ul>';s.focus();return;}
 delete v.agree;const d=new Date();const ymd=d.getFullYear()+String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0");const L=apLoad();const no=F.pf+"-"+ymd+"-"+String(L.filter(r=>r.f===F.id).length+1).padStart(4,"0");
 L.unshift({no,f:F.id,v,s:0,t:d.toISOString()});apSave();
 $("#v-page").innerHTML=apHead("APPLY",en?"Application received":"신청이 접수되었습니다",esc(F.n))+'<div class="wrap ap" style="padding-block:36px 90px"><div class="ap-done"><i data-lucide="check-circle-2"></i><span class="eyebrow">'+(en?"Receipt number":"접수번호")+'</span><b class="num">'+no+'</b><p>'+(en?"Keep this number. You can check the status or cancel in “My applications”.":"이 번호로 진행 상황을 확인합니다. ‘내 신청 내역’에서 상태를 보거나 확정 전에 취소할 수 있습니다.")+'</p><div><a class="ap-b" href="#apply-my">'+(en?"My applications":"내 신청 내역 보기")+' <i data-lucide="arrow-right"></i></a><a href="#apply">'+(en?"All forms":"다른 신청 하기")+'</a></div><small>'+AP_NOTE+'</small></div></div>';icons();scrollTo({top:0});});
document.addEventListener("click",e=>{const g=e.target.closest("[data-apgo]");if(g){e.preventDefault();const el=$('#apform [name="'+g.dataset.apgo+'"]');el&&el.focus();return;}
 const c=e.target.closest("[data-apcancel]");if(c){const r=apLoad().find(x=>x.no===c.dataset.apcancel);if(r&&r.s===0){r.s=3;apSave();renderApplyMy();}return;}
 const s=e.target.closest("[data-apnext]");if(s){const r=apLoad().find(x=>x.no===s.dataset.apnext);if(r&&r.s<2){r.s++;apSave();renderApplyAdmin();}return;}
 if(e.target.closest("#apcsv")){const L=apLoad();const keys=[...new Set(L.flatMap(r=>Object.keys(r.v)))];const q=x=>'"'+String(x==null?"":x).replace(/"/g,'""')+'"';const csv="﻿"+[["접수번호","양식","상태","접수일시"].concat(keys).map(q).join(",")].concat(L.map(r=>[r.no,apF(r.f).n,apSt(apF(r.f),r.s),r.t.slice(0,16).replace("T"," ")].concat(keys.map(k=>r.v[k])).map(q).join(","))).join("\r\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));a.download="GIST_신청내역_"+new Date().toISOString().slice(0,10)+".csv";document.body.appendChild(a);a.click();a.remove();return;}
 if(e.target.closest("#apclr")){apMem=[];apSave();renderApplyAdmin();return;}
 const pl=e.target.closest("[data-appre]");if(pl){try{window.__apPre=JSON.parse(pl.dataset.appre)}catch(_){}}
});
const apMask=(k,x)=>k==="em"?String(x).replace(/^(.).*(@.*)$/,"$1***$2"):k==="ph"?String(x).replace(/\d(?=\d{0,3}$)/g,"*"):k==="nm"?String(x).slice(0,1)+"*".repeat(Math.max(1,String(x).length-1)):x;
function renderApplyMy(){const L=apLoad();
 $("#v-page").innerHTML=apHead("MY","내 신청 내역","이 기기에서 넣은 신청의 접수번호와 진행 상황입니다.")+'<div class="wrap ap" style="padding-block:36px 90px">'+apNav("my")+
 (L.length?'<ul class="ap-my">'+L.map(r=>{const F=apF(r.f);const lab=k=>(F.f.concat(AP_COMMON).find(x=>x[0]===k)||[k,k])[1];return '<li class="s'+r.s+'"><div class="ap-my-h"><span class="ap-st s'+r.s+'">'+esc(apSt(F,r.s))+'</span><b>'+esc(F.n)+'</b><span class="num">'+esc(r.no)+'</span><time class="num">'+esc(r.t.slice(0,16).replace("T"," "))+'</time></div><div class="ap-steps" aria-label="진행 단계">'+(F.st||AP_ST).slice(0,3).map((s,i)=>'<span class="'+(r.s===3?"x":i<=r.s?"on":"")+'">'+esc(s)+'</span>').join("")+'</div><dl>'+Object.keys(r.v).filter(k=>r.v[k]).map(k=>'<div><dt>'+esc(lab(k))+'</dt><dd>'+esc(r.v[k])+'</dd></div>').join("")+'</dl>'+(r.s===0?'<button type="button" class="ap-x" data-apcancel="'+esc(r.no)+'">신청 취소</button>':'')+'</li>'}).join("")+'</ul>':'<div class="ap-empty"><i data-lucide="inbox"></i><b>아직 넣은 신청이 없습니다.</b><a class="ap-b" href="#apply">신청 양식 보기 <i data-lucide="arrow-right"></i></a></div>')+'</div>';
 document.title="내 신청 내역 | GIST 홈페이지 D안";icons();}
function renderApplyAdmin(){const L=apLoad();const by={};L.forEach(r=>by[r.f]=(by[r.f]||0)+1);
 $("#v-page").innerHTML=apHead("STAFF","담당자 화면","담당 부서가 보는 화면입니다. 접수 건을 확인하고 상태를 바꾸고, 엑셀로 내려받습니다.")+'<div class="wrap ap" style="padding-block:36px 90px">'+apNav("admin")+
 '<div class="rp-kpi" style="grid-template-columns:repeat(auto-fit,minmax(130px,1fr))"><div class="r"><b class="num">'+L.length+'</b><span>전체 신청</span></div>'+[0,1,2,3].map(i=>'<div><b class="num">'+L.filter(r=>r.s===i).length+'</b><span>'+AP_ST[i]+'</span></div>').join("")+'</div>'+
 '<div class="ap-bar">'+AP.filter(F=>by[F.id]).map(F=>'<span><b class="num">'+by[F.id]+'</b>'+esc(F.n)+'</span>').join("")+'<span class="ap-sp"></span><button type="button" class="pill" id="apcsv"><i data-lucide="download"></i> 엑셀(CSV)로 내려받기</button><button type="button" class="pill" id="apclr">시안 자료 모두 지우기</button></div>'+
 (L.length?'<div class="tbl-w" tabindex="0" role="region" aria-label="신청 목록 표"><table class="tbl ap-t"><thead><tr><th scope="col">접수번호</th><th scope="col">양식</th><th scope="col">신청자 (가림)</th><th scope="col">주요 내용</th><th scope="col">접수</th><th scope="col">상태</th><th scope="col">처리</th></tr></thead><tbody>'+L.map(r=>{const F=apF(r.f);const main=F.f.slice(0,3).map(x=>r.v[x[0]]).filter(Boolean).join(" · ");return '<tr><td class="num">'+esc(r.no)+'</td><td>'+esc(F.n)+'<small>'+esc(F.own)+'</small></td><td>'+esc(apMask("nm",r.v.nm||""))+'<small>'+esc(apMask("em",r.v.em||""))+'</small></td><td>'+esc(main)+'</td><td class="num">'+esc(r.t.slice(5,16).replace("T"," "))+'</td><td><span class="ap-st s'+r.s+'">'+esc(apSt(F,r.s))+'</span></td><td>'+(r.s<2?'<button type="button" class="pill" data-apnext="'+esc(r.no)+'">'+esc(apSt(F,r.s+1))+'(으)로</button>':'–')+'</td></tr>'}).join("")+'</tbody></table></div>':'<div class="ap-empty"><i data-lucide="inbox"></i><b>접수된 신청이 없습니다.</b><a class="ap-b" href="#apply">양식에서 시험 신청 넣어 보기 <i data-lucide="arrow-right"></i></a></div>')+
 '<p class="note" style="margin-top:18px">[시안] 이 화면은 같은 기기에 저장된 시험 자료만 보여 줍니다. 구축 때는 통합관리시스템(CMS) 권한(부서별·양식별)으로 로그인한 담당자만 보고, 이름·이메일은 개인정보취급자에게만 풀어서 보여 주며, 열람·수정 기록을 남깁니다(제안요청서 SFR-003).</p></div>';
 document.title="담당자 화면 | 온라인 신청 센터";icons();}
{const _ra=route;route=function(){const m=(LH()||"").match(/^#apply(?:-([a-z\-]+))?$/);if(m){$$(".view").forEach(v=>v.classList.toggle("on",v.id==="v-page"));$$(".gnb a").forEach(a=>a.classList.toggle("on",+a.dataset.m===2));const k=m[1];if(k==="my")renderApplyMy();else if(k==="admin")renderApplyAdmin();else if(k&&apF(k))renderApplyForm(apF(k));else renderApplyHub();scrollTo({top:0});typeof heroState==="function"&&heroState();return;}_ra();};}
addEventListener("hashchange",()=>{if(/^#apply/.test(LH()||""))route();});
/* 세부 화면에서 바로 신청으로 */
function apStrip(ids,t){return '<div class="ap-strip"><span class="eyebrow">온라인 신청</span><b>'+esc(t)+'</b><div>'+ids.map(id=>{const F=apF(id);return '<a href="#apply-'+id+'"><i data-lucide="'+F.ic+'"></i>'+esc(F.n)+'</a>'}).join("")+'<a class="all" href="#apply">신청 센터 전체 <i data-lucide="arrow-right"></i></a></div></div>';}
[["입학 전형",["ua-mat","ua-consult","ua-visit"],"입학을 준비한다면 여기서 바로 신청하세요"],["입학 상담",["ua-consult","ua-hs"],"상담과 설명회를 온라인으로 신청합니다"],["모집 요강",["ua-mat"],"모집요강 책자를 우편으로 받아 보세요"],["캠퍼스 투어",["ua-visit","ua-hs"],"방문 프로그램을 온라인으로 신청합니다"],["전형 안내",["ga-info","ga-openlab","ga-intern"],"대학원 진학을 준비한다면 여기서 바로 신청하세요"],["외국인 입학",["ipa-app"],"Exchange · Global Internship · Consultation"]].forEach(([p,ids,t])=>{const f=PBODY[p];if(f)PBODY[p]=()=>f()+apStrip(ids,t);});

/* ===== v182 제안요청서(RFP) 기능 요구사항 대조표 · SNS 보내기 · 학사일정 캘린더 파일 ===== */
const RFPS=["시안에서 동작","시안에 일부","구축 단계 몫"];
const RFP=[
 ["SFR-001","내·외부 환경 및 현황 분석","유사 기관·최신 웹 트렌드 벤치마킹 분석",0,"스탠퍼드·POSTECH 홈페이지를 직접 재서 100항목 비교, 못한 항목은 바로 고침","bench"],
 ["SFR-001","내·외부 환경 및 현황 분석","현행 홈페이지 구성 현황·이관 대상 분석",1,"현행 메뉴·세부 화면 40여 개·68개 부서 업무 358건을 옮겨 와 화면마다 출처·확인일 표시. 전체 이관 목록 작성은 구축 몫","menu"],
 ["SFR-002","공통 요구사항","표준 웹 스타일 가이드(색·서체·레이아웃 규정)",0,"디자인 규칙 화면과 PDF 7쪽(색·글꼴·모서리·세부페이지 틀 8단)","guide"],
 ["SFR-002","공통 요구사항","다수 시안 구성, 선호도 조사(온라인 설문 병행)",1,"같은 내용으로 보기 2종(기본·스탠퍼드형)을 단추로 바꿔 보고, 투표 화면 미리보기 제공. 실제 설문 집계는 구축 몫","vote"],
 ["SFR-002","공통 요구사항","메뉴 구조 3단계 이내, 직관적인 정보구조",0,"1단 6개 → 묶음 → 화면의 3단 구조, 메뉴 구조도 화면에서 겹치는 이름까지 점검","menu"],
 ["SFR-002","공통 요구사항","메타데이터 활용, 외부 검색포털 검색 최적화",1,"제목·설명·공유 그림(OG)·기관 구조화 자료(JSON-LD)·RSS 제공. 화면별 주소 체계는 구축 때 서버 방식으로 전환","story"],
 ["SFR-002","공통 요구사항","영문 홈페이지 기준 외국어 자동번역",1,"영문 첫 화면·영문 메뉴 시안 제공. 자동번역 연동은 구축 몫","en"],
 ["SFR-002","공통 요구사항","전자정부 표준프레임워크, 시큐어 코딩, 대표 도메인 디렉토리 방식",2,"서버·개발 표준에 해당 — 시안 범위 밖",""],
 ["SFR-003","CMS 관리기능","비전문 관리자도 웹에서 콘텐츠 편집·미리보기",0,"관리자 모드(아티팩트판)에서 첫 화면·공지·학사일정·소식·세부페이지를 직접 고치고 저장. 화면 캡처는 저장소 docs/admin","reflect"],
 ["SFR-003","CMS 관리기능","팝업존·배너 관리",0,"관리자 모드에서 띠 공지·팝업존·연구 배너 편집(아티팩트판)","home"],
 ["SFR-003","CMS 관리기능","콘텐츠별 만족도 조사, 모든 페이지에 담당 부서 표시",1,"모든 세부 화면에 담당 부서·수정일·원문 주소와 만족도 단추. 담당자 이름·전화 연동과 집계 저장은 구축 몫","p-2-0-0|.psat"],
 ["SFR-003","CMS 관리기능","인쇄·스크랩 등 편의기능",0,"세부 화면마다 인쇄·공유 단추, 인쇄 때 메뉴·단추 숨김","p-4-0-2"],
 ["SFR-003","CMS 관리기능","자료 통합검색(게시물·콘텐츠)",0,"지스트에 물어봐 통합검색: 대표·학과 홈페이지·사람·업무·규정·SNS를 한 번에, 초성 검색 지원","search"],
 ["SFR-003","CMS 관리기능","DB 자료 엑셀 출력",1,"신청 센터 담당자 화면에서 신청 내역을 엑셀(CSV)로 내려받기. 게시판 전체 출력은 구축 몫","apply-admin"],
 ["SFR-003","CMS 관리기능","Open API(XML·JSON·RSS)",1,"소식 RSS(feed.xml), SNS 최근 글 JSON 제공","story"],
 ["SFR-003","CMS 관리기능","권한 관리, 허가 IP, 2차 인증, 접속·수정 로그, 개인정보 이력, 방문 통계 대시보드",2,"서버·보안 기능 — 시안 범위 밖",""],
 ["SFR-004","반응형 웹","PC·태블릿·스마트폰에 맞게 자동으로 바뀌는 한 벌의 화면, 모바일 우선",0,"한 파일로 PC·휴대폰 화면 제공, 휴대폰은 아래 탭 5개와 전체 메뉴","home"],
 ["SFR-005","대표 홈페이지","관리자가 쉽게 바꾸는 메인 비주얼 영역",0,"관리자 모드에서 첫 화면 사진·문구 교체(아티팩트판)","home"],
 ["SFR-005","대표 홈페이지","사용자 편의 중심의 메인 구성, 자주 찾는 메뉴 반영",0,"방문자 6유형별 메뉴, 나만의 바로가기, 첫 화면 검색창","home"],
 ["SFR-005","대표 홈페이지","SNS 확산 기능",0,"공식 유튜브·인스타그램 글 30분마다 자동 반영, 소식 글 SNS 보내기","st-0|.nxsh"],
 ["SFR-005","대표 홈페이지","입학 안내 바로가기(내국인·외국인 구분)",1,"대학 입학·대학원 입학·외국인 입학 화면으로 각각 연결","p-2-1-2"],
 ["SFR-005","대표 홈페이지","한국형 웹콘텐츠 접근성 지침 2.2 준수, 접근성 품질마크",1,"자동 검사(Lighthouse) 접근성 100점. 전문가 심사와 품질마크 획득은 구축 몫","quality"],
 ["SFR-005","대표 홈페이지","국문·영문 2식, 메인 시안 3개 이상",1,"D안은 국문 전체와 영문 첫 화면. 영문 전체 구축은 구축 몫","en"],
 ["SFR-006","대학 입학 홈페이지","입시 자료 신청 관리(종류·수량·수령 방법, 접수번호, 처리 상태)",0,"신청 → 접수번호 → 내역 조회(접수·발송·완료) → 담당자 관리","apply-ua-mat"],
 ["SFR-006","대학 입학 홈페이지","대학 방문 참가 신청(일정·프로그램·인원, 정원·마감, 취소)",0,"날짜·프로그램별 정원 계산과 마감, 본인 취소","apply-ua-visit"],
 ["SFR-006","대학 입학 홈페이지","입학 상담 신청(분야·희망 일시·방법)",0,"방문·전화·온라인 선택, 접수번호와 상태 확인","apply-ua-consult"],
 ["SFR-006","대학 입학 홈페이지","고교 방문 입학설명회 신청",0,"고교명·희망 일시·예상 인원·요청사항","apply-ua-hs"],
 ["SFR-006","대학 입학 홈페이지","신청 데이터 관리(관리자)·통계",1,"담당자 화면에서 목록·상태 변경·엑셀. 시안은 기기 저장, 서버 저장·권한은 구축 몫","apply-admin"],
 ["SFR-007","대학원 입학 홈페이지","입학 설명회 신청(출신학교·지원 예정 학기·학과)",0,"학과 목록은 대학·학과 자료와 같은 것을 씀","apply-ga-info"],
 ["SFR-007","대학원 입학 홈페이지","e-멘토 학과정보(학과·계열별 검색·상세 조회)",1,"학과 14곳 소개·연구 분야·연구실, 주제로 찾는 연구 한 줄. 멘토 정보는 자료를 받아야 함","nexus"],
 ["SFR-007","대학원 입학 홈페이지","인턴십 신청(과정·연구실 선택, 지원서)",0,"학과를 고르면 연구실 목록이 따라 바뀜. 파일 올리기는 구축 몫","apply-ga-intern"],
 ["SFR-007","대학원 입학 홈페이지","오픈랩 신청(연구실·일정·인원, 정원·마감)",0,"연구실·날짜별 정원 계산, 학과 화면에서 바로 신청","apply-ga-openlab"],
 ["SFR-008","국제교류협력 홈페이지","교환학생·글로벌 인턴십·상담 신청형 콘텐츠 통합 메뉴(영문)",0,"영문 양식 하나로 통합","apply-ipa-app"],
 ["SFR-008","국제교류협력 홈페이지","영문 홈페이지 전체 재구축",2,"글로벌협력실 메뉴·콘텐츠가 필요 — 시안 범위 밖",""],
 ["SFR-009","발전기금 홈페이지","온라인 약정(유형·금액·기간, 접수번호, 내역 조회)",1,"약정 신청과 조회까지. 전자서명·결제·기부 시스템 연계는 구축 몫","apply-df-pledge"],
 ["SFR-009","발전기금 홈페이지","기부자 명단, 명예의 전당, 후원의 집 관리",2,"명단 자료가 필요 — 시안에 넣지 않음",""],
 ["SFR-010","학사 시스템 연계","학사일정 연계",1,"학사일정 화면(달력·D-day)과 내 캘린더에 넣는 파일(.ics). 학사 시스템 실시간 연동은 구축 몫","p-4-0-0"],
 ["SFR-010","학사 시스템 연계","조직 정보·교원 정보 연동",1,"부서별 업무 358건, 교수 180명·연구실을 검색과 학과 화면에 연결(수집 자료). 실시간 연동은 구축 몫","search-people"],
 ["SFR-010","학사 시스템 연계","연구정보 연계(교육·연구 역량 홍보)",1,"연구 분야 통계와 연구 한 줄 연구 연결 지도. 교원별 실적 연동은 구축 몫","nexus"],
 ["SFR-010","학사 시스템 연계","통합 로그인(단일 인증)",2,"학사 시스템 계정 연계 — 시안 범위 밖",""],
 ["SFR-011","AI 기반 챗봇","플로팅 단추형 챗봇, PC·모바일 채팅 화면, 추천 질문",0,"AI 안내(지스트에 물어봐) 단추와 추천 질문","home|#aibtn"],
 ["SFR-011","AI 기반 챗봇","답에 원문 페이지 주소 제공, 못 답하면 담당 부서 안내",0,"답마다 출처 번호와 원문 연결","search"],
 ["SFR-011","AI 기반 챗봇","홈페이지 전체 크롤링 학습, 자동 재학습, 멀티턴, 관리자 통계·금칙어",2,"생성형 AI 연결 자리(data/ai.json, 중계 서버 예시)만 준비 — 운영은 구축 몫",""],
 ["SFR-012","3D 캠퍼스 투어","3D 캠퍼스 투어 고도화, 시설 촬영(200식 이내)",2,"3D 캠퍼스맵 화면에서 현행 서비스로 연결. 촬영·3D 제작은 구축 몫","p-0-3-1"],
 ["SFR-013","SNS 연계","콘텐츠 페이지 ‘SNS 보내기’",0,"소식 글에서 X·페이스북·네이버·LINE·기기 공유·주소 복사","st-0|.nxsh"],
 ["SFR-013","SNS 연계","기관 SNS 콘텐츠 끌어오기",0,"공식 유튜브·인스타그램 최근 글을 30분마다 자동으로 가져옴","home|#snsw"],
 ["SFR-013","SNS 연계","SNS 간편 로그인(네이버·카카오·구글)",2,"로그인 연계 — 시안 범위 밖",""]
];
function renderRfp(){const cnt=[0,1,2].map(i=>RFP.filter(r=>r[3]===i).length);const ids=[...new Set(RFP.map(r=>r[0]))];
 const rows=ids.map(id=>{const R=RFP.filter(r=>r[0]===id);return R.map((r,i)=>'<tr data-st="'+r[3]+'" data-id="'+id+' · '+esc(r[1])+'">'+(i?'':'<th scope="rowgroup" rowspan="'+R.length+'" class="rf-id"><span class="num">'+id+'</span>'+esc(r[1])+'</th>')+'<td>'+esc(r[2])+'</td><td><span class="rf-s s'+r[3]+'">'+RFPS[r[3]]+'</span></td><td>'+esc(r[4])+'</td><td>'+(r[5]?'<a class="rp-go" href="#'+esc(r[5].split("|")[0])+'">보기 →</a>':'')+'</td></tr>').join("")}).join("");
 $("#v-page").innerHTML=dHero("CHECK","제안요청서 대조표","기능 요구사항 13개를 한 줄씩, 지금 되는 것과 구축 때 할 것으로 나눴습니다.")+
 '<div class="wrap" style="padding-block:44px 90px"><div class="pg-main" style="max-width:none"><h2 class="pg-t">한눈에 보기</h2><div class="rp-kpi" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr))"><div class="r"><b class="num">'+RFP.length+'</b><span>견준 요구 항목 (SFR 13개)</span></div>'+cnt.map((c,i)=>'<div><b class="num">'+c+'</b><span>'+RFPS[i]+'</span></div>').join("")+'</div>'+
 '<div class="rf-leg"><span><i class="rf-s s0">시안에서 동작</i> 지금 이 홈페이지에서 직접 눌러 볼 수 있음</span><span><i class="rf-s s1">시안에 일부</i> 화면과 흐름은 있고, 서버 연동·운영 자료가 더 필요함</span><span><i class="rf-s s2">구축 단계 몫</i> 서버·보안·인증·촬영처럼 시안으로 대신할 수 없음</span></div>'+
 '<div class="seg rf-f" role="group" aria-label="상태로 거르기"><button type="button" aria-pressed="true" data-f="">전체 '+RFP.length+'</button>'+cnt.map((c,i)=>'<button type="button" aria-pressed="false" data-f="'+i+'">'+RFPS[i]+' '+c+'</button>').join("")+'</div>'+
 '<div class="tbl-w" tabindex="0" role="region" aria-label="제안요청서 대조표"><table class="tbl rf-t"><thead><tr><th scope="col">요구사항</th><th scope="col">제안요청서가 요구한 것</th><th scope="col">D안 상태</th><th scope="col">D안에서 한 것</th><th scope="col">화면</th></tr></thead><tbody>'+rows+'</tbody></table></div>'+
 '<p class="note" style="margin-top:18px">알아 둘 점: 이 표는 제안요청서 ‘기능 요구사항’ 13개만 견준 것입니다. 장비·성능·보안·데이터·품질·사업관리 요구사항(서버 도입, 시큐어 코딩, 웹 취약점, 접근성 품질마크, 자료 이관, 교육·하자보수 등)은 시안으로 대신할 수 없는 구축 사업의 몫입니다. 요구 문구는 제안요청서 원문을 줄여 옮겼고, D안 내용은 2026.11.12. 화면 기준입니다. ‘시안에서 동작’도 자료는 이 기기에만 저장하는 시연용입니다.</p></div></div>';
 document.title="제안요청서 대조표 | GIST 홈페이지 D안";icons();}
document.addEventListener("click",e=>{const b=e.target.closest(".rf-f button");if(!b)return;$$(".rf-f button").forEach(x=>x.setAttribute("aria-pressed",x===b));const f=b.dataset.f;const tb=$(".rf-t tbody");tb.classList.toggle("flt",!!f);$$(".rf-t tbody tr").forEach(tr=>{tr.hidden=!!f&&tr.dataset.st!==f;});});
{const _rr=route;route=function(){if((LH()||"")==="#rfp"){$$(".view").forEach(v=>v.classList.toggle("on",v.id==="v-page"));renderRfp();scrollTo({top:0});typeof heroState==="function"&&heroState();return;}_rr();};}
addEventListener("hashchange",()=>{if(LH()==="#rfp")route();});
/* SNS 보내기 */
function nxShare(t){return '<div class="nxsh" role="group" aria-label="이 글 보내기"><span class="eyebrow">이 글 보내기</span>'+(navigator.share?'<button type="button" data-sh="native"><i data-lucide="share-2"></i>공유</button>':'')+[["x","X"],["fb","페이스북"],["nv","네이버"],["ln","LINE"]].map(x=>'<button type="button" data-sh="'+x[0]+'">'+x[1]+'</button>').join("")+'<button type="button" data-sh="copy"><i data-lucide="link"></i>주소 복사</button><span class="nxsh-m" role="status"></span></div>';}
document.addEventListener("click",e=>{const b=e.target.closest("[data-sh]");if(!b)return;const u=location.href,t=document.title.replace(/ \| .*/,"")||"GIST";const k=b.dataset.sh;let su=u;try{const sm=(LH()||"").match(/^#st-(\d+)$/);if(sm&&STORIES[+sm[1]]&&/^https?:/.test(u))su=u.split("#")[0].replace(/index\.html$/,"")+"news/"+stId(STORIES[+sm[1]])+".html";}catch(_){}const U=encodeURIComponent(su),T=encodeURIComponent(t);const m=b.parentNode.querySelector(".nxsh-m");
 if(k==="native"){navigator.share({title:t,url:u}).catch(()=>{});return;}
 if(k==="copy"){(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(()=>{if(m)m.textContent="주소를 복사했습니다."}).catch(()=>{if(m)m.textContent=u});return;}
 const L={x:"https://twitter.com/intent/tweet?text="+T+"&url="+U,fb:"https://www.facebook.com/sharer/sharer.php?u="+U,nv:"https://share.naver.com/web/shareView?url="+U+"&title="+T,ln:"https://social-plugins.line.me/lineit/share?url="+U}[k];if(L)window.open(L,"_blank","noopener,noreferrer,width=640,height=560");});
/* 학사일정 → 내 캘린더(.ics) */
function icsMake(){const Y=2026;const p=n=>String(n).padStart(2,"0");const d=(m,dd,add)=>{const x=new Date(Date.UTC(Y,m-1,dd+(add||0)));return x.getUTCFullYear()+p(x.getUTCMonth()+1)+p(x.getUTCDate())};const fold=s=>s.replace(/([,;\\])/g,"\\$1");
 return ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//GIST//D-an Academic Calendar//KO","CALSCALE:GREGORIAN","X-WR-CALNAME:GIST 학사일정"].concat(ACAL.flatMap((a,i)=>["BEGIN:VEVENT","UID:gist-acal-"+Y+"-"+i+"@gist.ac.kr","DTSTAMP:"+d(11,12)+"T000000Z","DTSTART;VALUE=DATE:"+d(a[0],a[1]),"DTEND;VALUE=DATE:"+d(a[2],a[3],1),"SUMMARY:"+fold(a[4]),"END:VEVENT"])).concat(["END:VCALENDAR"]).join("\r\n");}
document.addEventListener("click",e=>{if(!e.target.closest("#icsbtn"))return;const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([icsMake()],{type:"text/calendar;charset=utf-8"}));a.download="GIST_학사일정_2026_11-12.ics";document.body.appendChild(a);a.click();a.remove();});
{const f=PBODY["학사일정"];PBODY["학사일정"]=()=>f()+'<div class="ap-strip"><span class="eyebrow">내 캘린더</span><b>학사일정 '+ACAL.length+'건을 휴대폰·PC 캘린더에 넣으세요</b><div><button type="button" id="icsbtn"><i data-lucide="calendar-plus"></i>캘린더 파일(.ics) 받기</button></div></div>';}
/* 학과 화면에서 바로 신청 */
function apDeptBtns(n){return '<div class="ap-strip"><span class="eyebrow">온라인 신청</span><b>'+esc(n)+' 연구실을 직접 만나 보세요</b><div>'+[["ga-openlab","오픈랩 참가 신청"],["ga-intern","인턴십 신청"],["ga-info","대학원 입학설명회 신청"]].map(x=>'<a href="#apply-'+x[0]+'" data-appre="'+esc(JSON.stringify({dept:n}))+'"><i data-lucide="'+apF(x[0]).ic+'"></i>'+x[1]+'</a>').join("")+'</div></div>';}

/* ===== v182 품질 성적표: 같은 도구(Lighthouse)로 현행 홈페이지와 D안을 잰 값 ===== */
const QUAL={when:"현행·D안(고치기 전) 2026.11.12. 18:25~19:20, D안(지금) 2026.11.13. 11:43~11:46",tool:"Lighthouse 12.8.2 (크롬, 사무실 PC). 휴대폰 점수는 잴 때마다 차이가 커서 3번 잰 가운데 값",
 rows:[["현행 GIST 대표 홈페이지","www.gist.ac.kr/kr/main.html",[56,87,79,92,"10.2초","25.0초","48.0MB"],[70,85,81,92,"1.3초","18.1초","48.0MB"]],
       ["D안 (고치기 전, v180)","",[43,100,96,73,"6.3초","12.2초","2.2MB"],[78,100,96,73,"1.3초","2.8초","3.1MB"]],
       ["D안 (지금, v221)","yhju-gist.github.io/gist-homepage-d",[90,100,100,100,"1.9초","2.8초","1.5MB"],[99,100,100,100,"0.4초","0.7초","1.7MB"]]]};
function renderQuality(){const H=["성능","접근성","권장 사항","검색 최적화"];const tb=(mi,cap)=>'<h3 class="p-h3">'+cap+'</h3><div class="tbl-w" tabindex="0" role="region" aria-label="'+cap+' 점수 표"><table class="tbl ql-t"><thead><tr><th scope="col">홈페이지</th>'+H.map(h=>'<th scope="col">'+h+'</th>').join("")+'<th scope="col">첫 내용 표시</th><th scope="col">가장 큰 내용 표시</th><th scope="col">내려받는 양</th></tr></thead><tbody>'+QUAL.rows.map((r,ri)=>'<tr'+(ri===2?' class="me"':'')+'><th scope="row">'+esc(r[0])+(r[1]?'<small>'+esc(r[1])+'</small>':'')+'</th>'+r[mi].slice(0,4).map(v=>'<td><span class="ql-b"><i style="width:'+v+'%" class="'+(v>=90?"g":v>=50?"o":"r")+'"></i></span><b class="num">'+v+'</b></td>').join("")+r[mi].slice(4).map(v=>'<td class="num">'+v+'</td>').join("")+'</tr>').join("")+'</tbody></table></div>';
 const G=QUAL.rows[0],D=QUAL.rows[2];
 $("#v-page").innerHTML=dHero("QUALITY","품질 성적표","같은 날, 같은 도구로 현행 홈페이지와 D안을 쟀습니다.")+
 '<div class="wrap" style="padding-block:44px 90px"><div class="pg-main" style="max-width:none"><h2 class="pg-t">한눈에 보기 <small style="font-size:.5em;color:var(--mute);font-weight:600">휴대폰 기준, 100점 만점</small></h2>'+
 '<div class="ql-k">'+H.map((h,i)=>'<div><span class="eyebrow">'+h+'</span><p><b class="num">'+D[2][i]+'</b><em>D안</em></p><p class="g"><b class="num">'+G[2][i]+'</b><em>현행</em></p><span class="ql-d '+(D[2][i]>G[2][i]?"up":D[2][i]<G[2][i]?"dn":"")+'">'+(D[2][i]===G[2][i]?"같음":(D[2][i]>G[2][i]?"+":"")+(D[2][i]-G[2][i])+"점")+'</span></div>').join("")+'</div>'+
 tb(2,"휴대폰 (느린 4G·보급형 기기 조건)")+tb(3,"PC")+
 '<h3 class="p-h3">고치기 전과 지금 (2026.11.13. 아침)</h3><p class="p-lead" style="margin-top:0">D안 휴대폰 성능은 3번 잰 값이 54·57·62에서 90·89·93으로(10:10에는 93·91·94), PC는 93·95·95에서 99·99·99로(10:10에는 100·100·99) 바뀌었습니다. 접근성은 첫 화면과 그 밖 16개 화면을 모두 재서 100입니다(그 밖 16개 화면은 PC 안 서버에서 잼). 그림을 누르면 크게 보입니다.</p><figure class="ql-ba"><a href="img/ba_20261113c.webp" target="_blank" rel="noopener"><img src="img/ba_20261113c.webp" width="1000" height="1777" loading="lazy" decoding="async" alt="전후 비교표. 휴대폰 성능 54·57·62에서 90·89·93, 가장 큰 그림 뜨는 시간 6.6초에서 2.7~2.8초, 접근성 17개 화면 100, 화면 밀림 0, PC 성능 93·95·95에서 99·99·99. 화면에서 바뀐 것 16가지: 메뉴 이름, 검색 콘솔, 알약 단추, 아래 탭, 더 보기 단추 등."></a></figure>'+
 '<h3 class="p-h3">오늘 아침 고친 것 (v209~v221)</h3><ul class="ql-l"><li><b>큰 사진이 그려진 뒤에 프로그램 실행</b> — 휴대폰에서 가장 큰 그림 뜨는 시간 6.6초 → 3.4~3.7초</li><li><b>첫 화면 글자만 담은 작은 글꼴(61KB)을 먼저</b> — 나머지 글꼴(198KB)은 큰 사진 뒤에. 가장 큰 그림 3.4~3.7초 → 2.4~2.8초. 내려받는 양은 61KB 늘어남</li><li><b>작은 글자를 13px 이상으로</b> — 휴대폰·PC 모두, 10~12.5px로 남아 있던 곳</li><li><b>첫 화면 밖 16개 화면 접근성</b> — 대학·학과 99, 물어봐 98, 연구 한 줄 95였던 것을 100으로(제목 단계, 고른 탭 글자 대비, 지도 이름표)</li><li><b>덧붙여 온 꾸밈 규칙 30묶음을 문서 앞으로</b> — 느린 휴대폰에서 아래 탭·단추가 밀리던 원인 제거</li><li><b>글꼴이 준비된 뒤 첫 장면 글 표시</b> — 제목이 4줄에서 3줄로 바뀌며 밀리던 것 제거</li><li><b>카드 48개의 올라오는 움직임을 가벼운 방식으로</b> — 멈칫하는 시간 감소</li><li><b>드문 글자용 글꼴을 21KB 이하 조각 25개로</b> — 글자 하나 때문에 466KB를 받지 않음</li><li><b>학사일정 칸 글자 대비</b> — 휴대폰 접근성 96 → 100</li></ul>'+
 '<h3 class="p-h3">어제 고친 것 (v181~v185)</h3><ul class="ql-l"><li><b>글꼴을 따로 내려받게</b> — 화면 파일 안에 넣어 두었던 글꼴 8개를 파일로 빼서, 글자가 먼저 보이고 글꼴은 뒤따라 바뀝니다. 화면 파일 1.7MB → 0.9MB</li><li><b>사진 80장을 가벼운 형식(WebP)으로</b> — 16.6MB → 7.8MB, 휴대폰 첫 화면 사진은 더 작게</li><li><b>검색 로봇이 읽는 설명 추가</b> — 제목·설명·공유 그림·대표 주소, 파비콘</li><li><b>검색 로봇이 따라갈 수 없던 링크 42개</b>에 주소를 넣음</li><li><b>한글 글꼴은 이 홈페이지에 쓰인 글자만 먼저</b> — 477KB → 200KB, 나머지 글자는 필요할 때만</li><li><b>글과 사진을 먼저 보여 주고 프로그램은 뒤에 실행</b> — 화면 파일 0.9MB → 0.4MB, 당장 안 보이는 큰 사진은 화면이 뜬 뒤에 받음</li></ul>'+
 '<h3 class="p-h3">점수 읽는 법</h3><dl class="ql-dl"><div><dt>성능</dt><dd>화면이 얼마나 빨리 뜨고 바로 쓸 수 있는지. 휴대폰 점수는 일부러 느린 통신·느린 기기 조건으로 잽니다.</dd></div><div><dt>접근성</dt><dd>화면을 소리로 듣는 분, 키보드만 쓰는 분도 쓸 수 있는지 자동으로 검사한 점수. 사람이 하는 전문가 심사(접근성 품질마크)는 따로 받아야 합니다.</dd></div><div><dt>권장 사항</dt><dd>보안 연결, 오류 없는 화면, 최신 방식 사용 여부.</dd></div><div><dt>검색 최적화</dt><dd>네이버·구글 같은 검색 로봇이 내용을 읽기 좋게 만들었는지.</dd></div></dl>'+
 '<p class="note" style="margin-top:18px">측정: '+QUAL.when+', '+QUAL.tool+'. 점수는 잴 때마다 통신 상태에 따라 몇 점씩 달라질 수 있습니다. D안은 시안이라 GitHub 서버에 올린 화면을, 현행 홈페이지는 운영 중인 첫 화면을 쟀습니다. 휴대폰 성능은 측정마다 D안 57~75점, 현행 55~64점으로 나왔습니다(각 3회).</p></div></div>';
 document.title="품질 성적표 | GIST 홈페이지 D안";icons();}
{const _rq=route;route=function(){if((LH()||"")==="#quality"){$$(".view").forEach(v=>v.classList.toggle("on",v.id==="v-page"));renderQuality();scrollTo({top:0});typeof heroState==="function"&&heroState();return;}_rq();};}
addEventListener("hashchange",()=>{if(LH()==="#quality")route();});


/* v186 Nexus를 앞에: 대학·학과 화면 들머리, 전체 메뉴(교육·연구) 안내 */
(function(){const h=$("#pnexus2");if(h){h.innerHTML=nxTeaser();icons();}})();
openMega=(function(_){return function(i){_(i);if(i===1||i===3){const l=$("#megaw .lead");if(l&&!l.querySelector(".mg-nx"))l.insertAdjacentHTML("beforeend",'<a class="mg-nx" href="#nexus"><i data-lucide="waypoints"></i><span><b>연구 한 줄</b>주제로 학과·연구실 잇기</span></a>');icons();}};})(openMega);

/* v187 끊김 없이: 학과 화면에서 같은 주제를 함께 연구하는 다른 학과로 바로 / 방금 본 화면 이어 보기 */
function nxDeptPeers(n,ts){const R=ts.slice(0,3).map(([t])=>{const by={};nxLabs(t).forEach(p=>{if(p[1]!==n)by[p[1]]=(by[p[1]]||0)+1});const ds=Object.keys(by).sort((a,b)=>by[b]-by[a]).slice(0,6);return ds.length?'<div class="nxp-r"><a class="nxp-t" href="#nexus-'+t.k+'"><i data-lucide="'+t.ic+'"></i>'+esc(t.n)+'</a><div>'+ds.map(d=>'<a href="#d-'+DURL[d]+'"><i style="background:'+NXCOL[nxDeptCol(d)]+'"></i>'+esc(d)+' <b class="num">'+by[d]+'</b></a>').join("")+'</div></div>':''}).join("");
 return R?'<div class="nxp"><span class="eyebrow">같은 주제를 함께 연구하는 다른 학과</span>'+R+'<p>학과 이름을 누르면 그 학과 화면으로 바로 갑니다. 숫자는 그 주제의 연구실 수입니다.</p></div>':'';}
const TRAIL=[];
function trailName(){const h=LH()||"#home";if(h==="#home"||h==="#")return "첫 화면";const t=(document.title||"").replace(/\s*\|.*$/,"").trim();if(t&&t!=="GIST 홈페이지 D안")return t;let m;if((m=h.match(/^#d-([a-z0-9]+)$/))&&deptByCode(m[1]))return deptByCode(m[1]);if((m=h.match(/^#st-(\d+)$/))&&STORIES[+m[1]])return STORIES[+m[1]].t;return ({"#tutorial":"학사 한 장","#story":"지금, 지스트","#search":"지스트에 물어봐 통합검색","#colleges":"대학·학과","#reflect":"회의 반영 보고","#vote":"투표 미리보기","#menu":"메뉴 구조도","#en":"English","#search-people":"사람·업무 찾기"})[h]||"";}
function trailDraw(){const el=$("#trail");if(!el)return;const cur=LH()||"#home";const L=TRAIL.filter(x=>x.h!==cur).slice(-4);el.hidden=!L.length;if(!L.length)return;el.innerHTML='<div class="wrap"><span class="eyebrow">방금 본 화면</span><div>'+L.map(x=>'<a href="'+esc(x.h)+'">'+esc(x.n)+'</a>').join('<i data-lucide="chevron-right"></i>')+'<i data-lucide="chevron-right"></i><span aria-current="page">'+esc(trailName()||"지금 화면")+'</span></div></div>';icons();}
function trailPush(){setTimeout(()=>{const h=LH()||"#home";const n=trailName();if(n&&h!=="#home"&&document.title==="GIST 홈페이지 D안")document.title=n+" | GIST 홈페이지 D안";if(n){const i=TRAIL.findIndex(x=>x.h===h);if(i>=0)TRAIL.splice(i,1);TRAIL.push({h,n});if(TRAIL.length>8)TRAIL.shift();}trailDraw();},260);}
(function(){const f=document.querySelector("footer");if(!f)return;const d=document.createElement("nav");d.id="trail";d.className="trail";d.hidden=true;d.setAttribute("aria-label","방금 본 화면");f.parentNode.insertBefore(d,f);addEventListener("hashchange",trailPush);trailPush();})();

/* v188 끊김 없이: 연구실을 누르면 그 자리에서 교수·학과·내선·이어진 주제·신청까지 */
function nxLabOpen(a){const li=a.closest("li");const old=li.querySelector(".nxl-x");$$(".nxl-x").forEach(x=>{x.parentNode.classList.remove("open");x.remove()});if(old)return;
 const nm=a.dataset.nxq;const dm=(LH()||"").match(/^#d-([a-z0-9]+)$/);const dn=dm&&deptByCode(dm[1]);const idx=li.dataset.lab;
 const p=idx!=null?PROFDIR[+idx]:PROFDIR.find(x=>nxBase(x[0])===nm&&(!dn||x[1]===dn));if(!p)return;const ts=nxThemesOfLab(p);const ext=(p[2]||"").split(/[\/,]/)[0].trim();
 const pre=esc(JSON.stringify({dept:p[1],lab:p[3]||""}));
 li.classList.add("open");li.insertAdjacentHTML("beforeend",'<div class="nxl-x"><dl><div><dt>교수</dt><dd>'+esc(nxBase(p[0]))+(nxRole(p[0])?' <small>'+esc(nxRole(p[0]))+'</small>':'')+'</dd></div><div><dt>학과</dt><dd><a href="#d-'+DURL[p[1]]+'">'+esc(p[1])+'</a> <small>'+esc(COLLEGES[nxDeptCol(p[1])].n)+'</small></dd></div>'+(ext?'<div><dt>내선</dt><dd><a class="num" href="tel:062-715-'+esc(ext)+'">062-715-'+esc(ext)+'</a></dd></div>':'')+(ts.length?'<div><dt>이어진 주제</dt><dd class="c">'+ts.map(t=>'<a href="#nexus-'+t.k+'"><i data-lucide="'+t.ic+'"></i>'+esc(t.n)+'</a>').join("")+'</dd></div>':'')+'</dl><div class="nxl-b"><a href="#apply-ga-openlab" data-appre="'+pre+'"><i data-lucide="door-open"></i>오픈랩 신청</a><a href="#apply-ga-intern" data-appre="'+pre+'"><i data-lucide="briefcase"></i>인턴십 신청</a><a href="#d-'+DURL[p[1]]+'"><i data-lucide="building-2"></i>학과 화면</a><a href="#search" data-nxq="'+esc(nm)+'" data-nxgo="1"><i data-lucide="search"></i>지스트에 물어봐에서 더 찾기</a></div><small>이름·연구실·내선은 현행 학과 홈페이지 교수진 공개 화면 기준입니다. 연구실 홈페이지 주소는 구축 때 학과 자료와 연결합니다.</small></div>');icons();}
/* 학과 화면 위쪽 단추 줄에서 연구실 목록으로 바로 */
document.addEventListener("click",e=>{const j=e.target.closest("[data-jump]");if(!j)return;e.preventDefault();const t=document.querySelector(j.dataset.jump);if(t){const y=t.getBoundingClientRect().top+scrollY-110;(typeof lenis!=="undefined"&&lenis)?lenis.scrollTo(y):scrollTo({top:y,behavior:"smooth"});}});

/* v190 끊김 없이: 휴대폰 아래 탭이 지금 위치를 알려 줌 / 통합검색의 교수 결과에서 학과 화면 연구실로 바로 */
function tabSync(){const h=LH()||"#home";const k=/^#(d-|nexus|colleges)/.test(h)?"#colleges":/^#st-|^#story/.test(h)?"#story":/^#search/.test(h)?"#search":/^#tutorial/.test(h)?"#tutorial":(h==="#home"||h==="#")?"#home":"";$$(".tabbar a").forEach(a=>{const on=a.getAttribute("href")===k;a.classList.toggle("on",on);on?a.setAttribute("aria-current","page"):a.removeAttribute("aria-current");});}
addEventListener("hashchange",()=>setTimeout(tabSync,40));setTimeout(tabSync,60);
{const _rs2=runSearch;runSearch=function(){_rs2();try{$$("#res li.ri").forEach(li=>{if(li.querySelector(".ri-nx"))return;const b=li.querySelector("b");if(!b)return;const m=b.textContent.match(/^(.+?) 교수/);if(!m)return;const p=PROFDIR.find(x=>nxBase(x[0])===m[1].trim()&&DURL[x[1]]&&li.textContent.includes(x[1]));if(!p)return;const ts=nxThemesOfLab(p);
 li.insertAdjacentHTML("beforeend",'<div class="ri-nx"><a href="#d-'+DURL[p[1]]+'" data-nxopen="'+esc(nxBase(p[0]))+'"><i data-lucide="building-2"></i>'+esc(p[1])+' 화면에서 연구실 보기</a>'+ts.map(t=>'<a href="#nexus-'+t.k+'"><i data-lucide="'+t.ic+'"></i>'+esc(t.n)+'</a>').join("")+'</div>');});icons();}catch(e){}};}
document.addEventListener("click",e=>{const a=e.target.closest("[data-nxopen]");if(a)window.__nxOpen=a.dataset.nxopen;});
addEventListener("hashchange",()=>{if(!window.__nxOpen||!/^#d-/.test(LH()||""))return;const nm=window.__nxOpen;window.__nxOpen=null;setTimeout(()=>{const t=[...document.querySelectorAll(".nxd-l li>a[data-nxq]")].find(x=>x.dataset.nxq===nm);if(t){nxLabOpen(t);const y=t.getBoundingClientRect().top+scrollY-140;scrollTo({top:y});}},420);});

/* v191 소식에서 연구실까지: 지금, 지스트 맨 위에서 주제별 학과·연구실로 */
(function(){const h=$("#stnx");if(!h)return;h.innerHTML='<span class="eyebrow">소식에서 연구실까지</span><div>'+NX.map(t=>{const n=nxStories(t).length;return '<a href="#nexus-'+t.k+'"><i data-lucide="'+t.ic+'"></i>'+esc(t.n)+(n?' <b class="num">소식 '+n+'</b>':'')+'</a>'}).join("")+'</div>';icons();})();

/* v194 학과 화면에서 입학·장학·학사 길잡이로 끊김 없이 */
function deptWays(n){const W=[["전형 안내","대학원 입학","file-text"],["입학 전형","대학 입학","graduation-cap"],["장학 제도","장학","award"],["생활관","생활관","bed"],["학사일정","학사일정","calendar-days"]];
 return '<nav class="dway" aria-label="'+esc(n)+'에서 이어 보기"><span class="eyebrow">여기서 이어 보기</span><div>'+W.map(w=>'<a href="'+mHref(w[0])+'"><i data-lucide="'+w[2]+'"></i>'+w[1]+'</a>').join("")+'<a href="#tutorial"><i data-lucide="compass"></i>학사 길잡이</a></div></nav>';}

/* v195 오늘의 GIST: 다가오는 학사일정·새 소식·새 공지를 첫 화면 검색 아래 한 줄로 */
(function(){const h=$("#tdy");if(!h)return;const Y=2026,T=new Date();T.setHours(0,0,0,0);const C=[];
 try{const a=ACAL.map(x=>({s:new Date(Y,x[0]-1,x[1]),e:new Date(Y,x[2]-1,x[3]),t:x[4]})).filter(x=>x.e>=T).sort((p,q)=>p.s-q.s)[0];if(a){const n=Math.round((a.s-T)/864e5);C.push(["calendar-days","학사일정",(n>0?"D-"+n:"오늘"),a.t,mHref("학사일정")]);}}catch(e){}
 try{const i=STORIES.findIndex(x=>x.c!=="영상");if(i>=0)C.push(["newspaper","새 소식",STORIES[i].d||"",STORIES[i].t,"#st-"+i]);}catch(e){}
 try{if(NOTICES[0])C.push(["megaphone","공지",NOTICES[0].d||"",NOTICES[0].t,mHref("공지")]);}catch(e){}
 if(!C.length){h.hidden=true;return;}
 h.innerHTML=C.map(c=>'<a href="'+c[4]+'"><span class="tdy-k"><i data-lucide="'+c[0]+'"></i>'+c[1]+(c[2]?' <em class="num">'+esc(c[2])+'</em>':'')+'</span><b>'+esc(c[3])+'</b><i data-lucide="arrow-right" class="tdy-a"></i></a>').join("");icons();})();

/* v196 영구 주소(10년 기준): 소식은 #news/글번호, 세부 화면은 #p/이름. 메뉴 순서가 바뀌거나 새 글이 올라와도 주소가 그대로 */
const PSLUG={"총장 인사말":"president","비전·연혁":"vision-history","GIST 상징":"identity","조직도":"organization","부서별 업무·연락처":"offices","부속기관":"affiliated-institutes","경영공시":"disclosure","규정":"regulations","감사":"audit","찾아오시는 길":"directions","3D 캠퍼스맵":"campus-map","오룡관 예약":"oryong-hall","입학 전형":"undergraduate-admissions","모집 요강":"admissions-guide","입학 상담":"admissions-counseling","전형 안내":"graduate-admissions","외국인 입학":"international-admissions","장학 제도":"scholarships","등록금":"tuition","캠퍼스 투어":"campus-tour","부설 연구소":"research-institutes","연구센터":"research-centers","연구 분야":"research-areas","공동 연구장비":"shared-equipment","기술이전":"technology-transfer","창업 지원":"startup-support","공동연구 문의":"joint-research","학사일정":"academic-calendar","수강신청":"course-registration","증명서 발급":"certificates","생활관":"housing","상담센터":"counseling-center","학생기구":"student-organizations","포털·ZEUS":"portal-zeus","업무별 담당부서":"offices-by-task","안전 안내":"safety","통합경비":"security","공지":"notices","행사":"events","홍보 영상":"videos","브로슈어":"brochures","유튜브":"youtube","인스타그램":"instagram"};
function stId(x){const m=(x.g||"").match(/[?&]no=(\d+)/);if(m)return m[1];const d=(x.d||x.m||"").replace(/\D/g,"").slice(0,8);let h=0;for(const c of x.t)h=(h*31+c.charCodeAt(0))>>>0;return d+"-"+h.toString(36).slice(0,4);}
let _pm=null;function permMaps(){if(_pm)return _pm;const S={},P={};STORIES.forEach((x,i)=>{const k=stId(x);if(S[k]==null)S[k]=i});MEGA.forEach((m,i)=>m[2].forEach((g,gi)=>g[1].forEach((n,k)=>{const sl=PSLUG[n]||n;if(P[sl]==null)P[sl]="#p-"+i+"-"+gi+"-"+k})));return _pm={S,P};}
function _dec(t){try{return decodeURIComponent(t)}catch(e){return t}}
window.__toInt=function(h){if(!h||h.length<4)return h;if(h.slice(0,6)==="#news/"){const i=permMaps().S[_dec(h.slice(6))];return i!=null?"#st-"+i:h}if(h.slice(0,3)==="#p/"){return permMaps().P[_dec(h.slice(3))]||h}return h};
window.__toPerm=function(h){let m;if((m=(h||"").match(/^#st-(\d+)$/))){const x=STORIES[+m[1]];return x&&permMaps().S[stId(x)]===+m[1]?"#news/"+stId(x):h}if((m=(h||"").match(/^#p-(\d+)-(\d+)-(\d+)$/))){const a=MEGA[+m[1]],g=a&&a[2][+m[2]],n=g&&g[1][+m[3]];if(!n)return h;const sl=PSLUG[n]||n;return permMaps().P[sl]===h?"#p/"+sl:h}return h};
function permFix(){try{const h=location.hash,q=window.__toPerm(h);if(q!==h)history.replaceState(history.state,"",q)}catch(e){}}
addEventListener("hashchange",permFix,true);permFix();

/* ===== v197 10년 기준 점검표(#future): 세계 대학·공공 홈페이지 운영 기준에 D안을 대어 본 표 ===== */
const TEN=[
 ["주소","한번 준 주소는 바꾸지 않는다","W3C · Cool URIs don’t change","반영","화면 주소를 메뉴 위치 번호가 아니라 이름·글번호로 씁니다. 메뉴를 옮겨도 공유한 주소가 그대로 열립니다.","p/scholarships"],
 ["사용자","조직도가 아니라 찾는 사람의 필요에서 출발한다","GOV.UK 디자인 원칙 1","반영","대상별 메뉴, 학사 길잡이, 주제로 잇는 연구 지도","home"],
 ["찾기","검색을 맨 앞에 둔다","MIT 첫 화면","반영","첫 화면 검색 · 초성·오타 · 교수 → 연구실","search"],
 ["대상별 길","누구에게 필요한 정보인지로 길을 낸다","Stanford ‘Information for’","반영","예비 학부생·대학원 지원자·학부모·재학생·교직원·기업·연구자 메뉴","home"],
 ["끊김 없는 연결","한 화면에서 다음에 볼 화면으로 이어 준다","이사회·TF 회의 의견","반영","소식 → 주제 → 학과 → 연구실 → 신청까지 한 줄로","nexus"],
 ["접근성","WCAG 2.2 AA를 지킨다","W3C WCAG 2.2","부분","자동 검사 100점. 실측: 누르는 곳 24px 이상, 폭 320px(4배 확대)·720px(2배 확대)에서 좌우 넘침 0(124개 화면), 키보드 초점 가림 0(12개 화면). 사람이 하는 전문가 심사는 구축 때 받아야 합니다.","quality"],
 ["가벼움","내려받는 양과 에너지를 줄인다","GOV.UK 디자인 원칙 11","반영","첫 화면 1.5MB (현행 48.0MB)","quality"],
 ["일관성","색·글꼴·간격을 한 곳에서 정한다","GOV.UK Design System","반영","디자인 규칙 화면 + 디자인 값 파일(tokens.json)","guide"],
 ["도구 독립","내용과 모양을 나눠, 제작 도구가 바뀌어도 내용이 남게 한다","대학 홈페이지 재구축 지침(API 우선)","부분","내용만 담은 파일(data/content.json)을 따로 냅니다. 구축 때 관리 도구(CMS)와 연결해야 합니다.","guide"],
 ["구독","새 소식을 받아 볼 수 있게 한다","ETH Zürich RSS","반영","소식 구독 파일(feed.xml)","story"],
 ["언어","언어 전환을 같은 자리에 둔다","ETH Zürich","부분","영문 첫 화면. 세부 화면 영문은 구축 때 채워야 합니다.","en"],
 ["내용 수명","화면마다 담당 부서와 확인일을 밝힌다","GOV.UK 내용 보존·철회 기준","반영","화면 아래 담당 부서 · 자료·확인일 · 다음 점검 달(확인일에서 6개월 뒤). 점검 달이 지나면 그 자리에 빨간 글씨로 알립니다. 주기는 운영 때 바꿀 수 있습니다.","p/scholarships"],
 ["검색 로봇","기계가 읽는 정보와 화면 목록을 둔다","schema.org · sitemap","반영","기관·소식·위치 정보(JSON-LD), sitemap.xml, 학과 글 화면 14개 · 소식 글 화면 25개","quality"],
 ["없는 주소","없는 주소는 안내하고 검색으로 잇는다","W3C 주소 관리","반영","없는 화면 안내 + 404 화면","search"],
 ["고쳐 가며 쓰기","크게 갈아엎지 않고 계속 고친다","GOV.UK 디자인 원칙 5","결정 필요","직원이 직접 고치는 관리자 모드 시안은 있습니다. 운영 조직·주기는 TF가 정해야 합니다.","reflect"]];
const CORP=[["위 메뉴 개수 (가운데 값)","8개","5개","6개"],["본문 글자 크기","16px가 38곳","16px가 20곳","16~17.5px"],["첫 화면 내려받는 양 (가운데 값)","9.3MB","2.4MB","1.5MB"],["검색을 둔 곳","49곳 (54%)","22곳 (76%)","있음"],["언어 전환을 둔 곳","83곳 (91%)","12곳 (41%)","있음"],["본문 건너뛰기 링크","33곳 (36%)","15곳 (52%)","있음"],["휴대폰 좌우 넘침","3곳에서 생김","2곳에서 생김","0 (124개 화면)"],["본문 글꼴","Pretendard 계열 31곳","회사 전용 글꼴","Pretendard GIST"]];
function renderFuture(){const n=k=>TEN.filter(r=>r[3]===k).length;
 $("#v-page").innerHTML=dHero("DECADE","10년 기준 점검표","세계 대학과 공공 홈페이지의 운영 기준에 D안을 대어 보았습니다.")+
 '<div class="wrap" style="padding-block:44px 90px"><div class="pg-main" style="max-width:none">'+
 '<div class="fu-k"><div><b class="num">'+TEN.length+'</b><span>점검한 기준</span></div><div class="ok"><b class="num">'+n("반영")+'</b><span>반영</span></div><div><b class="num">'+n("부분")+'</b><span>부분 · 구축 때</span></div><div><b class="num">'+n("결정 필요")+'</b><span>TF 결정 필요</span></div></div>'+
 '<div class="fu-l">'+TEN.map(r=>'<a class="fu-r" href="#'+r[5]+'"><span class="fu-c">'+esc(r[0])+'</span><span class="fu-m"><b>'+esc(r[1])+'</b><small>'+esc(r[2])+'</small></span><span class="fu-d">'+esc(r[4])+'</span><em class="fu-s '+(r[3]==="반영"?"ok":r[3]==="부분"?"pt":"td")+'">'+esc(r[3])+'</em></a>').join("")+'</div>'+
 '<h2 class="pg-t" style="margin-top:64px">대기업 120곳과 대어 보기 <small style="font-size:.5em;color:var(--mute);font-weight:600">시가총액 상위 국내 91곳 · 세계 29곳, 2026.11.12. 실측</small></h2>'+
 '<div class="tbl-w" tabindex="0" role="region" aria-label="대기업 홈페이지와 대어 본 표"><table class="tbl fu-t"><thead><tr><th scope="col">항목</th><th scope="col">국내 대기업</th><th scope="col">세계 대기업</th><th scope="col">D안</th></tr></thead><tbody>'+CORP.map(r=>'<tr><th scope="row">'+esc(r[0])+'</th><td>'+esc(r[1])+'</td><td>'+esc(r[2])+'</td><td class="me">'+esc(r[3])+'</td></tr>').join("")+'</tbody></table></div>'+
 '<nav class="dway" aria-label="함께 보기"><span class="eyebrow">함께 보기</span><div><a href="#quality"><i data-lucide="gauge"></i>품질 성적표</a><a href="#rfp"><i data-lucide="list-checks"></i>제안요청서 대조표</a><a href="#guide"><i data-lucide="palette"></i>디자인 규칙</a><a href="#reflect"><i data-lucide="message-square-text"></i>회의 반영 보고</a></div></nav></div></div>';
 document.title="10년 기준 점검표 | GIST 홈페이지 D안";icons();}
{const _rf=route;route=function(){if((LH()||"")==="#future"){$$(".view").forEach(v=>v.classList.toggle("on",v.id==="v-page"));renderFuture();scrollTo({top:0});typeof heroState==="function"&&heroState();return;}_rf();};}
addEventListener("hashchange",()=>{if(LH()==="#future")route();});
/* v197 검색 로봇이 읽는 정보: 소식 글·세부 화면·학과 화면마다 그 화면의 정보(JSON-LD)를 바꿔 넣음 */
function ldSync(){try{const h=LH()||"";let o=null,m;const U=location.href.split("#")[0];const bc=a=>({"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:a.map((x,i)=>({"@type":"ListItem",position:i+1,name:x[0],item:U+x[1]}))});
 if((m=h.match(/^#st-(\d+)$/))&&STORIES[+m[1]]){const x=STORIES[+m[1]];const d=(x.d||"").replace(/\D/g,"");o={"@context":"https://schema.org","@type":"NewsArticle",headline:x.t,articleSection:x.c,url:location.href,publisher:{"@type":"CollegeOrUniversity",name:"광주과학기술원"}};if(d.length>=8)o.datePublished=d.slice(0,4)+"-"+d.slice(4,6)+"-"+d.slice(6,8);}
 else if((m=h.match(/^#p-(\d+)-(\d+)-(\d+)$/))&&MEGA[+m[1]]){const a=MEGA[+m[1]],g=a[2][+m[2]],n=g&&g[1][+m[3]];if(n)o=bc([["GIST","#home"],[a[0],location.hash],[n,location.hash]]);}
 else if((m=h.match(/^#d-([a-z0-9]+)$/))&&deptByCode(m[1])){o=bc([["GIST","#home"],["대학·학과","#colleges"],[deptByCode(m[1]),h]]);}
 let el=document.getElementById("ld-dyn");if(!o){if(el)el.remove();return;}if(!el){el=document.createElement("script");el.type="application/ld+json";el.id="ld-dyn";document.head.appendChild(el);}el.textContent=JSON.stringify(o);}catch(e){}}
addEventListener("hashchange",()=>setTimeout(ldSync,60));setTimeout(ldSync,80);
route();heroState();requestAnimationFrame(()=>{drawBanner();drawThumbs();heroState();});
})();

/* ===== v69 위원장 보고: 정확히 그 자리로 가기 ===== */
(function(){var $=function(q){return document.querySelector(q)};var esc=function(t){return String(t).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};var REF=window.REF||window.__REF||[];
var RAFTER=[
 ["대기업 120곳과 대어 보기 (v199)","시가총액 상위 대기업 홈페이지 120곳(국내 91·세계 29)을 직접 재서 메뉴 개수·글자 크기·무게·검색·언어 전환·건너뛰기 링크를 D안과 나란히 놓았습니다. 10년 기준 점검표 아래에 있습니다.","future|.fu-t"],
 ["소식 글마다 따로 있는 주소·내용 파일 (v198)","소식 글 25건을 글마다 제목·요약이 따로 있는 가벼운 글 화면(news/글번호.html)으로도 만들어 검색 로봇과 SNS 미리보기가 그 글을 읽게 했습니다. 소식·화면 이름·학과 정보는 모양 없이 내용만 담은 파일(data/content.json)로도 냅니다.","story|#scat"],
 ["10년 기준 점검표 (v197)","세계 대학(MIT·Stanford·ETH)과 공공 홈페이지(GOV.UK·W3C) 운영 기준 15가지에 D안을 대어 보고, 반영·부분·TF 결정 필요로 나눠 한 화면에 모았습니다. 소식 글·세부 화면마다 검색 로봇이 읽는 정보도 넣었습니다.","future|.fu-l"],
 ["바뀌지 않는 주소 (v196)","화면 주소를 메뉴 위치 번호(#p-2-2-0)·글 순번(#st-3) 대신 이름(#p/scholarships)·글번호(#news/224635)로 바꿨습니다. 메뉴를 옮기거나 새 글이 올라와도 예전에 공유한 주소가 그대로 열립니다. 소식 구독(feed.xml), 디자인 값 파일(tokens.json), 없는 주소 안내(404.html)도 함께 둡니다.","p/scholarships|.pg-t"],
 ["검색한 교수에서 학과 연구실·주제로 바로 (v190)","통합검색의 교수 결과 아래에 ‘학과 화면에서 연구실 보기’와 이어진 주제 단추를 두고, 누르면 학과 화면에서 그 연구실이 펼쳐진 채로 열림. 휴대폰 아래 탭은 학과·연구 한 줄·소식 글에서도 지금 위치를 표시","search|#res"],
 ["이사회 지적 2 ‘노출’: 학과가 검색에 따로 잡히게 (v189)","학과 14곳을 주소가 따로 있는 글 화면(dept/학과코드.html)과 sitemap.xml·robots.txt로도 내보냄. 검색 최적화 자동 검사 D안 100점(현행 92점)","quality|.ql-k"],
 ["연구실을 누르면 그 자리에서 (v188)","연구 한 줄·학과 화면의 연구실을 누르면 화면을 옮기지 않고 그 자리에서 교수·학과·내선·이어진 주제와 오픈랩·인턴십 신청 단추가 펼쳐짐","nexus|.nx-labs"],
 ["학과에서 다른 단과대학 학과로 바로 (v187)","학과 화면에 ‘같은 주제를 함께 연구하는 다른 학과’를 주제별로 두어 단과대학을 넘어 바로 옮겨 감. 모든 화면 아래 ‘방금 본 화면’ 줄로 왔던 길을 한 번에 되돌아감","d-env1|.nxp"],
 ["이사장님 가장 큰 주문 ‘끊김 없이’를 연구실까지 (v186)","연구 한 줄을 첫 화면 단과대학 바로 아래·맨 위 띠·검색창 아래·전체 메뉴(교육·연구)·대학·학과 화면 맨 위로 꺼냄. 첫 화면 → 단과대학 → 학과 → 연구실 → 같은 주제의 다른 학과 → 소식 → 입학·오픈랩 신청까지 밖으로 나가지 않고 이어짐","home|#pnexus"],
 ["품질 성적표 (v182)","구글 공개 검사 도구(Lighthouse)로 현행 홈페이지와 D안을 같은 날 같은 PC에서 잰 점수·속도·용량을 나란히 표시. 글꼴 분리·사진 WebP로 화면 파일 1.7MB→0.9MB","quality|.ql-k"],
 ["온라인 신청 센터 (v182)","제안요청서의 신청형 기능 9가지(입시자료·대학 방문·입학 상담·고교 설명회·대학원 설명회·인턴십·오픈랩·국제교류·기부 약정)를 양식 하나의 틀로: 접수번호 발급, 내 신청 조회·취소, 정원 마감, 담당자 화면(상태 변경·엑셀). 시안은 이 기기에만 저장","apply|.ap-cards"],
 ["제안요청서 대조표 (v182)","제안요청서 기능 요구사항 SFR-001~013을 한 줄씩 놓고 ‘시안에서 동작 / 일부 / 구축 단계 몫’으로 나눠 화면과 연결","rfp|.rf-t"],
 ["소식 글 SNS 보내기·학사일정 캘린더 파일 (v182)","소식 글에서 X·페이스북·네이버·LINE·기기 공유, 학사일정을 내 캘린더에 넣는 .ics 파일","p-4-0-0|#icsbtn"],
 ["연구 한 줄 연구 연결 지도 (v180)","연구 주제 8개 가운데 하나를 고르면 그 주제를 연구하는 학과·연구실·부설 연구소·최근 소식·진학/협력 메뉴가 한 화면에 이어짐. 주제×단과대학 융합 표 포함. 첫 화면·학과 화면·소식 글·통합검색·연구 분야 화면에서 들어감","nexus|.nx-tabs"],
 ["세부 화면 ‘이어서 하기’ (v180)","예비 학부생·대학원 지원자·재학생·기업·연구자·방문자 5개 길을 따라, 지금 화면이 몇 번째인지와 다음 화면을 보여 줌","p-2-0-0|.jr"],
 ["학과 화면에 연구실·교수와 이어진 연구 주제 (v180)","학과 화면마다 연구실 목록과 그 학과가 이어진 연구 주제를 보여 주고, 누르면 같은 주제의 다른 학과로 이어짐","d-env1|.nxd"],
 ["기본·스탠퍼드형 보기를 오른쪽 단추로 바로 전환","바닥글까지 내려가지 않아도 되게 화면 오른쪽에 [기본]/[스탠퍼드] 아이콘 단추를 고정(PC는 오른쪽 가운데 위, 휴대폰은 오른쪽 아래). 누르면 바로 바뀌고 고른 보기는 기억함","home|.vmfab"],
 ["스탠퍼드 소식 화면까지 실측 비교 마침","자동 캡처가 막혔던 스탠퍼드 Report(소식) 화면을 앱 안 브라우저로 직접 열어 PC 1440·휴대폰 390 그림을 확보해, 첫 화면·학과·입학·연구·소개·행사·소식 7종 모두 같은 크기로 나란히 비교(회의 자료 10_스탠퍼드_정밀비교)","story|.nc2"],
 ["위원회 비교용 ‘간결(스탠퍼드형)’ 보기","남은 위원회 판단 3가지(첫 화면 위쪽 구성·떠 있는 단추·글꼴 4종)를 바닥글의 보기 단추 하나로 바로 비교: 간결은 오른쪽 떠 있는 단추를 숨기고, 첫 화면 검색·내 바로가기 블록을 빼고, 숫자 글꼴을 본문·제목 글꼴로 바꿔 글꼴 2종. 주소 뒤 ?view=calm 으로도 열림(기본 보기는 그대로)","home|.vmode"],
 ["기술이전 숫자 출처 정리","첫 화면 누적 기술이전 계약액 621억 원은 현행 홈페이지 인포그래픽·2024.4. GIST 발표값, 기술이전 화면의 436건·연도별 기술료는 2026.3. 기준 입학전형 안내 값으로 출처·기준 시점을 각각 밝힘","p-3-2-0|.tt-g"],
 ["업무분장 화면을 눌러 쓰는 화면으로","부서 창의 담당 업무가 ‘/’로 이어진 긴 글이라 읽기만 하던 것을 업무 낱말 단추로 나눔 — 낱말을 누르면 그 일을 맡은 곳을 GIST 전체에서 바로 찾음. 줄마다 큰 전화 단추(휴대폰에서 바로 걸림)·번호 복사, 부서 창 안에서 업무 찾기·주요 업무 #꼬리표. 업무별 담당부서 화면 첫머리에 ‘무엇을 하러 오셨나요?’ 12가지(출장·카드·증명서·장학금·기숙사·학적·급여·채용·계약·인건비·시설·보안)를 맡은 곳·내선·전화 단추와 함께","p-4-2-2|.od-task"],
 ["벤치마킹표 휴대폰 실측값 채움","벤치마킹 100표의 ‘휴대폰 최소 글자’ 줄을 두 학교 실측값으로: 스탠퍼드 390 폭 본문 18px·구역 제목 40~56px(12px까지 씀), POSTECH 본문 14px·구역 제목 25px. D안 줄도 실제 값(13px 아래 없음·본문 17px·제목 38px)으로 바로잡음","bench|"],
 ["홍보 영상·유튜브 화면 구분","전체 점검에서 두 화면이 같은 영상 목록이던 것을 고침: 홍보 영상은 긴 영상만, 유튜브는 Shorts까지 전부","p-5-2-0|.vg"],
 ["입학 메뉴 세 화면을 서로 다르게","전체 점검(PC·휴대폰 43화면 캡처)에서 모집 요강·입학 상담이 입학 전형과 같은 내용으로 보이던 것을 고침: 모집 요강은 전형별 모집인원 표+원문 연결, 입학 상담은 온라인 입학상담 받는 법+입학팀 담당 연락처만","p-2-0-1|.adm-p"],
 ["남은 [확인 필요] 직접 찾아 채움","기술이전 화면: 「2027학년도 GIST 학사과정 입학전형 안내」로 누적 기술이전 436건(광주·전남·전북 219건, 50.2%), 출자기업 35사, 연도별 기술이전 수입 2021~2025(2025년 17억 6,100만 원)를 채움. 입학 화면: 전형별 모집인원 표(일반 220·학교장추천 60·고른기회 25·특기자 10·수능우수자 15, 합 330) — 합계가 원문과 맞는 것 확인","p-3-2-0|.tt-g"],
 ["소식 카드 제목을 스탠퍼드 Report처럼 크게","스탠퍼드 Report는 머리기사 제목 35px·기사 제목 21px(세리프). D안 지금, 지스트 머리기사 제목 22→30px, 카드 제목 16→18px(휴대폰 17px·머리기사 22px)","story|.nc2"],
 ["입학 화면에 2027학년도 학사과정 한눈에","스탠퍼드 Admission의 입학생 숫자 띠처럼, 「2027학년도 GIST 학사과정 입학전형 안내」 모집인원 표 합계(330명 내외 = 정원 내 300 + 반도체공학과 정원 외 30)·수시 원서접수 기간·중복 지원 가능 안내를 숫자 카드로. 전형별 인원은 원문 확인으로 남김","p-2-0-0|.adm-p"],
 ["스탠퍼드 PC 실측값으로 제목·설명 크기 맞춤","PC 창 1440에서 스탠퍼드를 다시 재 보니 구역 제목 64~80px(세리프, 굵기 440), 설명 글 20px·줄 간격 28px, 휴대폰 제목 48~56px. D안 구역 제목 최대 56→66px, 휴대폰 34→38px, 설명 글 PC 18→20px·휴대폰 16→17px (한글은 같은 크기에서 더 빽빽해 스탠퍼드보다 조금 작게)","home|.p-tit"],
 ["학과 화면에 학과 소식 카드","스탠퍼드 Academics 화면 끝의 학과 소식처럼, 학과 목록 아래에 최근 GIST 소식 가운데 학과 이름이 나오는 글 3건을 사진 카드로(GIST 원문 연결)","colleges|.dn-st"],
 ["행사 화면에 때·종류 거르기","스탠퍼드 Events처럼 행사를 진행 중·다가오는·지난 소식과 전시·축제·행사·사업·협력으로 골라 보기(고른 건수 표시, 없으면 안내 문구)","p-5-1-1|.evf"],
 ["학과 목록을 넓고 차분하게","스탠퍼드 학과 화면처럼 한 줄을 넓게: 학과 사진 168→240px, 설명 글 칸 253px→약 590px(16px), 버튼 5개는 설명 아래 한 줄로 모음(PC)","colleges|#cp2t"],
 ["소개 화면을 두 칸 이야기로","스탠퍼드 About처럼 소개 사진 아래에 교육·연구·산학창업 세 줄을 왼쪽 제목·오른쪽 글과 사진 두 칸으로. 숫자는 첫 화면 ‘숫자로 보는 GIST’와 같은 값(출처 함께 표기)","p-0-0-1|.ab-rows"],
 ["하위 화면 머리 제목을 스탠퍼드처럼 차분하게","스탠퍼드 하위 화면은 Academics·Research처럼 첫 글자만 대문자인 세리프 제목. D안의 ADMISSION·COLLEGES 같은 대문자 큰 이름을 Admission·Colleges로(GIST·AI 같은 약어는 그대로), 굵기 700→600. 세리프 글꼴 파일을 화면 안에 넣어 외부 글꼴 서버가 막힌 곳에서도 같은 모양","p-2-0-0|.pv-en"],
 ["소개 화면 첫머리에 큰 캠퍼스 사진","스탠퍼드 About 화면은 제목 바로 아래 캠퍼스 사진이 크게 놓임. D안 비전·연혁 화면 첫 문장 아래에 GIST 봄 캠퍼스 사진을 넓게 두고 비전·핵심가치·연혁으로 이어지게 함","p-0-0-1|.ab-ph"],
 ["입학 화면에 학비·장학 안내 띠","스탠퍼드 Admission 화면은 전형 안내 사이에 학비 지원 메시지(Yes, you can afford it)와 숫자를 크게 둠. D안 입학 전형 화면 아래에 기본장학금·실부담 수업료·지원 기간·총장장학생 자기계발비를 D안 「장학 제도」 화면 숫자 그대로 띠로 붙이고 장학·등록금 화면으로 연결","p-2-0-0|.aid-b"],
 ["학과·연구 화면에 이야기와 큰 사진","스탠퍼드 Academics·Research 화면과 나란히 놓고 보니, 스탠퍼드는 목록·숫자 앞뒤에 한 문장 소개와 큰 사진, 연구 기사 사진 카드를 두는데 D안은 목록·그래프만 있었음. 대학·학과 화면에 한 문장 소개+캠퍼스 전경 사진, 연구 분야 화면 숫자 아래에 최근 연구성과 보도자료 4건(GIST 원문 연결)을 사진 카드로 붙임","colleges|.cp-st"],
 ["스탠퍼드 실측 비교로 글자 체계 정리","스탠퍼드 첫 화면을 실제로 재어 보니 글자 크기 13단계·글꼴 2종(본문 18px, 제목 세리프 보통 굵기)인데 D안은 40단계(14.5·13.5·12.5px 같은 반 픽셀 크기 포함)였음. 반 픽셀·홀수 크기를 가까운 단계로 모아 29단계로 줄이고, 구역 제목 굵기를 낮추고(800→600), 구역 설명 글을 17→18px로 키움. 휴대폰에서 13px보다 작던 글자(설명·출처·작은 꼬리표)를 13px로","home|.p-tit"],
 ["세부 화면 44개 모두 실제 내용","메뉴 끝 화면 44개를 현행 홈페이지·학사공지 원문으로 채움. 11.12. 새벽 전수 점검에서 남아 있던 빈 틀 6곳(미디어센터 분류 5·대학원 등록금)을 찾아 채워 빈 화면 0건. 11.12. 오전 기술이전 건수·기술료도 공식 입학전형 안내 자료로 채움","p-4-3-1|"],
 ["학과 소개 14곳 + 학과 실사진","학과마다 현행 소개·연구 분야·사무실 연락처, 머리 사진은 각 학과 홈페이지 대표 사진","d-chem|"],
 ["GIST 공식 용어로 맞춤","첫 문구를 GIST 비전 2053·영문 표어(Creating limitless possibilities…)·현행 소개 문구로, 큰 메뉴를 현행 홈페이지 이름(About GIST·교육·입학·연구·대학생활·미디어센터)으로, 첫 화면 구역 이름을 현행 미디어센터 용어(GIST News·GIST Excellence·GISTian·Social Media)로, 핵심가치 GIST(Global asset·Insight innovation·Solution 4 securities·Tolerance for trust)를 첫 화면에","home|.hx"],
 ["지금, 지스트 실제 소식 25건","요약·원문 기사 링크, 원문 기사 읽는 시간, 연구 주제(AI·반도체·에너지·생명) 거르기, 사진 없는 글은 주제별 표지 그래픽, 글 화면 읽기 진행 막대·주소 복사","story|#sgrid"],
 ["검색·AI 안내 실제 자료로","많이 찾는 말·찾는 범위, AI 답마다 출처 화면 연결, 모르는 질문은 모른다고","search|#chat"],
 ["튜토리얼 학칙 원문 근거","7개 주제(휴학·복학, 등록금·장학, 증명서 추가), 주제마다 근거 원문과 수집일","tutorial|#obs"],
 ["디자인 규칙 화면","색 10가지·글자 7단계·부품 견본·세부 화면 틀 — 지오넷이 그대로 따라 만들 수 있게","guide|"],
 ["관리자 모드(직원 직접 수정)","첫 화면 문구·띠 공지·팝업·공지·세부 화면 본문을 권한 있는 직원이 화면에서 고치고 저장","home|"],
 ["보기 편하게","PC 메뉴·하단 바 글자 키움, 큰 모니터 자동 확대, 모든 화면 휴대폰 대응","home|.hd"],
 ["스탠퍼드·POSTECH 벤치마킹 100","두 대학 화면을 글자·색·간격·부품·접근성까지 재어 D안과 100항목 비교, 24항목 바로 고침","bench|"],
 ["이사회 지적 네 가지 풀이","첫 화면 아래 '이사장님이 지적하신 네 가지' 카드 — 대표 홈페이지에서 학과로 끊김 없이, 검색엔진 노출(구조화 정보·미리보기 문구), 최신 반영, 행사·소식 빠른 홍보(GIST NOW)","reflect|.rp-board"],
 ["첫 화면 사진 새로","가을 낙엽 사진(현행 홈페이지와 같음) 대신 G·I 기둥 올려다보기·야경 기둥·야간 항공 사진 3장이 7초마다 바뀜. 휴대폰은 T GIST 기둥 사진으로 잘림 없이","home|"],
 ["GIST 네 글자에 캠퍼스 사진","G·I·S·T 글자마다 다른 캠퍼스 사진을 채우고 글자가 하나씩 올라오게","home|.hx-rise"],
 ["부서별 업무·연락처 새로","87개 부서 686개 업무·내선을 부서 이름·업무·내선번호로 찾고, 부서 카드를 누르면 업무와 내선이 펼쳐짐(번호 복사). 행정안전부·교육부·연세대 연락처 화면 참고","p-0-1-1|"],
 ["조직도 현행 그대로","현행 홈페이지 조직도 95개 칸을 위아래 관계까지 그대로 옮기고 칸마다 펼치기","p-0-1-0|"],
 ["세부 화면마다 담당 연락처","찾아오시는 길·입학·장학·생활관·수강신청·창업·안전·감사·규정·경영공시·기술이전 등 30여 화면 끝에 담당 부서 업무·내선 카드","p-0-3-0|"],
 ["공동 연구장비·공동연구 문의","첨단분석센터 6개 실 50개 장비와 내선, 연구관리팀 부처별 담당 8명","p-3-1-1|"],
 ["부속기관·3D 캠퍼스맵","부속기관 5곳 연락처 카드, 3D 캠퍼스맵에 주소·찾아오시는 길·캠퍼스 투어 연결","p-0-1-2|"],
 ["학사일정 원문 16건","현행 「2026 학년도 학사일정」 11~12월 16건을 원문 그대로 — 두 달 달력, 오늘 표시, 일정마다 D-day, 여러 날 일정 이어 보기","p-4-0-0|"],
 ["등록금·장학 금액 원문 대조","Compass 수업료·장학·연차초과료·재수강료를 2026년 학사공지 원문과 맞춰 확인, 등록금제도 개편(안) 의견수렴도 안내","tutorial|"],
 ["GIST 상징 네 기둥","심볼마크 설명을 G·I·S·T 네 글자 카드로, 캠퍼스 기둥 조형물 사진과 함께","p-0-0-2|"],
 ["미디어센터 분류 화면 5곳 실제 소식","보도자료·연구성과·사람·캠퍼스·영상 화면에 지금, 지스트 실제 소식을 분류별로(빈 틀 → 실제 목록), 없는 주소로 오면 안내","p-5-0-1|"],
 ["연락처 같은 업무 묶음","학과 화면·부서 연락처 창·통합검색에서 같은 업무 여러 내선을 한 줄로(예: 연구과제관리 16건 → 5건)","p-0-1-1|"],
 ["휴대폰에서 더 읽기 쉽게","작은 표는 한 화면에(옆으로 밀기 없음), 11~12.5px 글자를 13px로, 넘김 점 누르는 영역 24px 이상(WCAG 2.2), 인쇄 시 메뉴·단추 숨김","p-4-0-2|"],
 ["영문 화면 정리","영문 화면에서는 하단 바·바닥글도 영어, Colleges 단추는 영문 학과 목록으로, 화면 언어 표시(lang) 영어","en|"],
 ["팀 공유 주소·전달 묶음","누구나 여는 주소(GitHub)와 대외홍보팀·지오넷 전달 묶음(코드·디자인 규칙)","ext|https://yhju-gist.github.io/gist-homepage-d/"]
];
function rpRender(){var k=$("#rpkpi");if(!k)return;var tot=REF.length,done=REF.filter(function(r){return r[4]==="반영"}).length;
 k.innerHTML='<div class="r"><b class="num">'+tot+'</b><span>회의 의견</span></div><div><b class="num">'+done+'</b><span>반영 완료</span></div><div><b class="num">'+(tot-done)+'</b><span>시안 반영 · 협의·검토 중</span></div><div><b class="num">'+RAFTER.length+'</b><span>회의 뒤 더 고친 것</span></div>';
 $("#rpafter").innerHTML=RAFTER.map(function(a){var ext=a[2].indexOf("ext|")===0;var u=ext?a[2].slice(4):"#"+a[2].split("|")[0];
  return '<a href="'+esc(u)+'"'+(ext?' target="_blank" rel="noopener noreferrer"':' data-go="'+esc(a[2])+'"')+'><b>'+esc(a[0])+'</b><span>'+esc(a[1])+'</span><em>'+(ext?'새 창으로 열기 ↗':'그 화면으로 →')+'</em></a>'}).join("");}
function goTo(spec){var h=spec.split("|")[0],sel=spec.split("|").slice(1).join("|");
 var same=(LH()||"#home").slice(1)===h; if(!same) location.hash=h; else window.scrollTo({top:0});
 setTimeout(function(){var el=sel?document.querySelector(sel):null;
  if(el&&el.offsetParent!==null){el.style.scrollMarginTop="140px";el.scrollIntoView({behavior:"auto",block:"start"});
   el.classList.remove("goflash");void el.offsetWidth;el.classList.add("goflash");setTimeout(function(){el.classList.remove("goflash")},4000);}
 },same?60:750);}
document.addEventListener("click",function(e){var a=e.target.closest("a[data-go]");if(!a)return;e.preventDefault();e.stopPropagation();goTo(a.getAttribute("data-go"));},true);
var b=$("#rpPrint");if(b)b.addEventListener("click",function(){window.print()});rpRender();})();
