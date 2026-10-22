export const fieldTrip = {
  title: 'I/O Extended: Agent Field Trip 2026 Incheon',
  meta: '2026.09.12 · 인천 · 프론트엔드 개발 역할',
  award: 'Most Fun Product',
  heading: '현장에서 문제를 찾으며, 개발자의 역할을 다시 생각하다',
  paragraphs: [
    '현장을 직접 돌아다니며 문제를 찾는 방식이 가장 인상 깊었습니다. 화면 앞에서 아이디어를 생각할 때와 달리, 실제 공간에서 불편함을 마주하니 무엇을 해결해야 하는지 더 구체적으로 보였고 해결 방법도 함께 고민하기 좋았습니다. 개발자가 현장을 이해하고 AI와 함께 문제를 풀어가는 모습에서 앞으로의 개발 방식도 엿볼 수 있었습니다.',
    '프론트엔드 개발 역할로 참여하면서 같은 팀의 시니어 개발자분들에게 AI 활용 방법과 실제 개발 현장의 이야기를 들었습니다. 혼자 공부할 때는 접하기 어려웠던 경험을 나누며, 앞으로 무엇을 배우고 어떤 방향으로 성장할지 생각해 볼 수 있었습니다.',
    '이번 경험을 통해 개발은 기능을 구현하는 것만큼이나 해결할 문제를 제대로 찾는 일이 중요하다는 것을 느꼈습니다. 현장을 살피고 사람들의 불편함을 이해하는 개발자가 되고 싶다는 마음이 생겼고, 프론트엔드 개발자로 나아가려는 진로도 한층 확실해졌습니다.',
  ],
  photos: [
    { src: '/images/field-trip/presentation.jpg', w: 1200, h: 800, caption: '발표를 준비하며' },
    { src: '/images/field-trip/video-presentation.jpg', w: 1200, h: 675, caption: '구현한 화면과 아이디어 발표' },
    { src: '/images/field-trip/video-audience.jpg', w: 1200, h: 675, caption: '현장 참가자들과 함께한 발표 시간' },
    { src: '/images/field-trip/award.jpg', w: 1200, h: 800, caption: 'Most Fun Product 수상 기념' },
  ],
  links: [
    {
      label: '행사 소개',
      href: 'https://gdg.community.dev/events/details/google-gdg-incheon-presents-io-extended-agent-field-trip-2026-incheon/',
    },
    { label: '행사 사진 앨범', href: 'https://photos.app.goo.gl/7TGSo8Rd9pf6Pq4h7' },
  ],
};

// 기술마다 "어디에 썼는지"를 함께 적습니다.
export const skills = [
  { name: 'React · TypeScript', note: 'Who is LILPA의 장면 라우팅·키보드 조작·인터랙션과 못풀준 홈 대시보드를 만들었습니다.' },
  { name: 'HTML · CSS', note: 'CSS 3D 원근 갤러리, 동작 줄이기 대응, Figma 값을 옮긴 CSS 변수 디자인 토큰을 직접 작성했습니다.' },
  { name: 'Swift · SwiftUI', note: 'DeveloPet 메뉴 막대 앱과 노치 HUD, GhostDock 진단 CLI를 만들었습니다.' },
  { name: '테스트', note: 'Vitest·Testing Library·Playwright(웹), XCTest(macOS)로 회귀 테스트를 먼저 쓰고 고치는 흐름에 익숙합니다.' },
  { name: 'Docker · CI', note: '못풀준 전체 스택을 Docker Compose와 nginx로 묶었고, DeveloPet은 GitHub Actions로 CI를 돌립니다.' },
  { name: 'Figma', note: '디자인 파운데이션을 정리하고 코드의 디자인 토큰으로 옮깁니다.' },
];

export const devLog = [
  { category: 'React', title: 'popstate·hashchange 중복 발생을 회귀 테스트로 고정' },
  { category: 'TypeScript', title: 'tsc가 node:fs를 못 찾을 때 import.meta.glob으로 대체' },
  { category: 'Swift', title: '1MB 넘는 로그 한 줄에서 멈추던 이벤트 수집 수정' },
  { category: 'Swift', title: '초 단위 시간을 밀리초로 읽던 경과 시간 버그 수정' },
  { category: 'macOS', title: '카카오톡 번들이 root 소유라 쓸 수 없는 문제 확인' },
  { category: 'Docker', title: 'nginx로 /api는 백엔드, 나머지는 SPA로 보내기' },
];

export const timeline = [
  { when: '2025', what: '프론트엔드 분야에 관심을 갖고 학습 시작' },
  { when: '2026.09', what: 'Agent Field Trip 참가 · Most Fun Product 수상' },
  { when: '2026.09', what: 'DeveloPet 설계 시작 (macOS · Swift)' },
  { when: '2026.09', what: '못풀준 팀 프로젝트 · 홈 대시보드와 Docker 스택' },
  { when: '2026.10', what: 'Who is LILPA 발표 웹사이트 배포' },
  { when: '2026.10', what: 'GhostDock Phase 0 진단 CLI' },
  { when: 'Next', what: '사용자 중심의 제품을 만드는 개발자' },
];
