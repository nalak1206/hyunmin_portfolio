# 김현민 포트폴리오 v2

사용하기 편한 화면을 고민하는 프론트엔드 개발자 김현민의 포트폴리오입니다.

- Live: https://hyunmin-portfolio.vercel.app
- Stack: React 19 · Vite · Three.js / React Three Fiber · CSS

## 실행

```bash
npm install
npm run dev
```

## 컨셉: Deconstruct · Portfolio Workbench

"웹사이트를 직접 살펴보고 구조를 분석한다"를 화면 구조로 옮겼습니다. 스크롤해서 내려가는 페이지가 아니라, 한 화면짜리 작업대입니다.

| 영역 | 역할 |
|---|---|
| 왼쪽 **Parts** | 항상 보이는 목차. 누르거나 ← → 키로 이동, 주소는 `#/developet`처럼 바뀌어 공유·뒤로가기가 됩니다. |
| 가운데 **Stage** | 3D 조형물(Three.js / React Three Fiber). 정거장을 옮길 때마다 80개 조각이 흩어졌다가 그 프로젝트를 닮은 모양으로 다시 조립됩니다. 클릭하면 분해됩니다. |
| 오른쪽 **Detail** | 프로젝트를 화면 → 개요 → 구현 기록 → 코드 층으로 나눈 분해도. 패널 안에서만 스크롤됩니다. |

정거장별 모양: 소개 = 구, Who is LILPA = 발표 화면, DeveloPet = 펫이 도는 링, 못풀준 = 프론트·API·채점기 3층 판, GhostDock = Dock과 떠 있는 숨겨진 앱, Field log = 흩어진 조각, About = 이중 나선, Contact = 출구(포털).

- **Motion Off**: 헤더 버튼(또는 OS의 동작 줄이기)으로 모든 연출을 끕니다. 모양은 바로 바뀝니다.
- **테마**: 첫 방문은 화이트 모드로 시작하며, 이후에는 사용자가 선택한 테마를 유지합니다.
- **모바일(960px 이하)**: 무대 → 가로 목록 → 상세 순서로 쌓입니다.
- three.js는 지연 로딩되어 글자가 먼저 뜨고, 3D에서 오류가 나면 조형물만 숨깁니다.
- 색: 블랙 · 실버 · 아이스 블루. 글꼴: Unbounded(영문 제목), Pretendard(본문), JetBrains Mono(라벨).

## 구조

```
src/
  data/         콘텐츠(프로필, 프로젝트, 활동)와 정거장 목록(stations.js)
  components/   Header, PartsIndex, Stage, Sculpture(3D 모양 정의), Detail
  components/details/  정거장별 상세 패널
  hooks/        useStation(해시 라우팅·화살표 키), usePreference(테마·모션 저장)
  styles.css    디자인 토큰, 워크벤치 레이아웃, 다크/라이트, Motion Off
public/images/  프로젝트 스크린샷(JPG), DeveloPet 펫 GIF, 현장 사진
```

새 프로젝트를 넣을 때: `projects.js`에 내용을 추가하고, `stations.js`의 `formByProject`에서 모양을 고르면 됩니다.

## TODO (직접 해야 하는 것)

- [x] DeveloPet·GhostDock은 개발 중인 프로젝트로 표시
- [x] Who is LILPA는 개인 프로젝트·저장소 비공개로 표시 (라이브 데모는 공개)
- [ ] 손글씨 메모(`note`)와 `profile.now` 문구를 본인 말투로 다듬기
- [ ] 이름 기반 이메일 생성 후 교체 (`src/data/profile.js`, 생성 전까지 기존 주소 유지)
