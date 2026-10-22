// 프로젝트 데이터. 모든 내용은 각 프로젝트의 README·docs·코드에서 확인한 사실만 적습니다.
//
// fields: 케이스 본문. { label, text, highlight? }
//   highlight는 text 안에 그대로 있는 문구여야 형광펜이 칠해집니다.
// note: 케이스를 한 줄로 요약한 설계 메모 (본인 말투로 바꿔도 됩니다)
// snippet: 실제 코드에서 가져온 짧은 조각 { file, code }
// links: 공개 레포·데모. 없으면 버튼을 그리지 않습니다.

export const projects = [
  {
    id: 'whoislilpa',
    featured: true,
    name: 'Who is LILPA',
    subtitle: '실제 기록으로 만든 클릭형 발표 웹사이트',
    period: '2026.10.06 — 10.19',
    role: '기획 · 디자인 · 개발',
    stamp: 'Live',
    stack: ['React 19', 'TypeScript', 'Vite', 'Vitest', 'Playwright'],
    intro:
      '버추얼 그룹 이세계아이돌 릴파의 과거, 오디션, 데뷔, 성장, 무대를 따라가는 발표용 웹사이트입니다. 지어낸 이야기가 아니라 확인된 기록만으로 5분 발표를 하는 것이 목표였습니다.',
    fields: [
      {
        label: '구현',
        text: '장면마다 URL 해시와 ?mode=present|full 상태를 두고 history.pushState·popstate로 브라우저 뒤로가기를 지원했습니다. 화살표·PageUp/Down·Home/End 키, 목차, 전체화면으로 조작하고, YouTube IFrame API로 영상의 지정 구간만 재생한 뒤 포스터로 돌아가게 했습니다.',
      },
      {
        label: '발표 중 오작동 막기',
        text: '텍스트를 드래그하는 중에는 클릭해도 다음 장면으로 넘어가지 않게 했고, 버튼이나 다이얼로그에 포커스가 있을 때는 발표 키를 가로채지 않게 했습니다. 일부 브라우저가 popstate와 hashchange를 함께 보내는 경우는 회귀 테스트로 고정했습니다.',
        highlight: '텍스트를 드래그하는 중에는 클릭해도 다음 장면으로 넘어가지 않게',
      },
      {
        label: '인터랙션',
        text: '시드를 고정한 랜덤 배치로 매번 같은 모양의 "흩뿌린 사진 더미"를 만들고, requestAnimationFrame 카운트업 숫자와 CSS 3D 원근 갤러리를 넣었습니다. 시스템의 동작 줄이기 설정도 따릅니다.',
      },
      {
        label: '검증',
        text: 'Vitest·Testing Library 테스트와 Playwright 브라우저 검증 스크립트로 장면 흐름과 레이아웃을 확인했습니다. 출처 페이지를 열 수 없던 수치는 미검증으로 표시했습니다.',
      },
    ],
    note: '발표 중엔 절대 엉뚱하게 넘어가면 안 된다!',
    snippet: {
      file: 'src/App.tsx',
      code: `const selection = window.getSelection();
if (selection && !selection.isCollapsed) return;`,
    },
    result: '발표 모드 12장면과 전체 아카이브 25장면을 Vercel에 배포했습니다.',
    images: [
      { src: '/images/lilpa/scene-01.jpg', alt: 'Who is LILPA 표지 장면', caption: '01 · 표지' },
      { src: '/images/lilpa/scene-05.jpg', alt: '무대 경험과 영상 편집을 다룬 장면', caption: '05 · Behind the content' },
      { src: '/images/lilpa/scene-20.jpg', alt: '카운트업 숫자로 보여주는 플랫폼 지표 장면', caption: '20 · 카운트업 지표' },
      { src: '/images/lilpa/scene-24.jpg', alt: '발표를 마무리하는 장면', caption: '24 · 마무리' },
    ],
    links: [{ label: '라이브 데모', href: 'https://who-is-lilpa.vercel.app' }],
  },
  {
    id: 'developet',
    name: 'DeveloPet',
    subtitle: 'AI 코딩 에이전트의 작업 상태를 픽셀 펫으로 보여주는 macOS 앱',
    period: '2026.09.12 — 10.19',
    role: 'Personal · 설계 · 개발',
    stack: ['Swift 6', 'SwiftUI', 'AppKit', 'SwiftPM', 'GitHub Actions'],
    intro:
      'Codex 데스크톱·CLI 작업을 지켜보다가 생각 중, 수정 중, 테스트 중, 승인 대기, 성공, 오류 같은 상태를 메뉴 막대의 펫 "Develo"와 노치형 HUD로 보여줍니다. 작업이 끝나면 Git 변경 사항을 보여주고, 안전 검사를 거쳐 커밋합니다.',
    sprites: ['idle', 'running', 'waiting', 'review', 'failed', 'waving'],
    fields: [
      {
        label: '구현',
        text: '상태 엔진, Codex 세션 로그 파서, 사용량 읽기, 안전한 Git 커밋, 펫·노치 오버레이를 12단계로 나눠 만들었습니다. Swift 약 7,500줄에 릴리스 테스트 264개가 통과하고, GitHub Actions로 CI를 돌립니다.',
      },
      {
        label: '코드 리뷰에서 잡은 버그',
        text: '세션 로그에 다시 연결하면 지난 완료 이벤트가 또 발생했고, 1MB가 넘는 로그 한 줄에서 이벤트 수집이 멈췄고, 초 단위 시간을 밀리초로 읽어 경과 시간이 틀렸고, 명령 하나만 실패해도 작업 전체가 오류 상태에 갇혔습니다. 실패하는 회귀 테스트를 먼저 만들고, 고친 뒤 통과하는지 확인했습니다.',
        highlight: '실패하는 회귀 테스트를 먼저 만들고',
      },
      {
        label: '안전장치',
        text: '커밋 대상은 저장소·브랜치·기준 커밋·파일 목록으로 고정해, 그사이 생긴 다른 변경이 섞여 커밋되지 않게 했습니다. push는 하지 않습니다.',
      },
    ],
    note: '에이전트가 뭘 하는지 터미널 안 보고도 알게',
    links: [],
  },
  {
    id: 'unsolvableoj',
    name: '못풀준 (UnsolvableOJ)',
    subtitle: '게임처럼 성장하는 온라인 저지',
    period: '2026.09',
    role: 'Team · 홈 대시보드, 디자인 토큰, Docker Compose',
    stack: ['React 19', 'TypeScript', 'Vite', 'Docker Compose', 'nginx'],
    intro:
      '문제를 풀고 코드를 제출하면 Docker 샌드박스 컨테이너에서 채점하는 온라인 저지입니다. C, C++, Java, Python, JavaScript, TypeScript, Go, Rust를 채점합니다. 프론트(React)·API(NestJS)·채점기(BullMQ 워커)로 나뉜 팀 프로젝트입니다.',
    image: { src: '/images/oj/home.jpg', alt: '못풀준 홈 대시보드 화면', caption: '홈 대시보드 (데모 모드)' },
    fields: [
      {
        label: '담당',
        text: '홈 대시보드를 만들었습니다. 문제 목록, 랭킹, 내 정보, 최근 제출을 Promise.all로 동시에 불러오고, AbortController로 페이지를 떠나면 요청을 취소하며, 로딩·오류 상태를 따로 보여줍니다.',
        highlight: 'AbortController로 페이지를 떠나면 요청을 취소',
      },
      {
        label: '디자인 → 코드',
        text: 'Figma 파운데이션(색, 상태 색상)을 CSS 변수 디자인 토큰으로 옮겨 팀이 같은 값을 쓰게 했습니다.',
      },
      {
        label: '인프라',
        text: 'PostgreSQL·Redis·API·채점기·프론트를 한 번에 띄우는 Docker Compose 스택을 구성하고, nginx가 /api 요청을 백엔드로 넘기고 나머지는 SPA로 돌려주게 했습니다.',
      },
    ],
    note: '디자인 값은 토큰으로, 팀 전체가 같이 쓰게',
    links: [{ label: '데모', href: 'https://unsolvable-oj-front.vercel.app/' }],
  },
  {
    id: 'ghostdock',
    name: 'GhostDock',
    subtitle: '메신저를 켜 둔 채 Dock에서 숨기는 macOS 유틸리티',
    period: '2026.10 — 진행 중',
    role: 'Personal · Phase 0',
    stack: ['Swift 6', 'Foundation', 'CryptoKit', 'XCTest'],
    intro:
      '카카오톡이나 Discord는 알림을 받으려면 켜 둬야 하지만 Dock과 Cmd+Tab을 차지합니다. 이를 숨기는 도구를 목표로, 지금은 앱을 건드리기 전에 대상 앱의 상태를 읽기만 하는 진단 CLI까지 만들었습니다.',
    fields: [
      {
        label: '구현',
        text: '앱 버전·Bundle ID, 실행 파일 SHA-256, 쓰기 권한, 디스크 여유 공간, codesign 서명 검증 결과를 모아 보고서로 저장합니다. 외부 의존성 없이 약 430줄이고, XCTest 25개가 통과합니다.',
      },
      {
        label: '안전하게 만들기',
        text: '외부 명령은 셸 없이 인자 배열로 실행하고, 출력은 non-blocking 파이프로 나눠 읽어 타임아웃이 밀리지 않게 했습니다. 보고서 파일은 기존 파일을 덮어쓰거나 심볼릭 링크를 따라가지 않게 열고, 실행 전후 SHA-256이 같은 것으로 앱을 건드리지 않았음을 확인했습니다.',
        highlight: '실행 전후 SHA-256이 같은 것으로 앱을 건드리지 않았음을 확인',
      },
      {
        label: '알게 된 것',
        text: '카카오톡 번들은 root 소유라 쓸 수 없었습니다. 앱을 고치는 방식에는 한계가 있다는 것을 실제로 확인한 뒤 다음 단계를 정하고 있습니다.',
      },
    ],
    note: '건드리기 전에 먼저 읽기만!',
    // README의 실행 예시와 docs/phase0 개발 결과 표에서 가져온 값
    terminal: {
      command: 'ghostdock-preflight --json --output reports/preflight-001.json /Applications/Discord.app /Applications/KakaoTalk.app',
      results: [
        { app: 'Discord', version: '0.0.416', status: 'passed', note: '' },
        { app: 'KakaoTalk', version: '26.7.0', status: 'failed', note: '번들 쓰기 불가 (root 소유)' },
      ],
    },
    snippet: {
      file: 'ReportWriter.swift',
      code: `Darwin.openat(directory, $0,
  O_WRONLY | O_CREAT | O_EXCL | O_NOFOLLOW | O_CLOEXEC,
  mode_t(0o600))`,
    },
    links: [],
  },
];
