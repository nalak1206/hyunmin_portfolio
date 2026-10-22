// 워크벤치의 '정거장' 목록. 왼쪽 목록, 가운데 조형물 모양, 오른쪽 상세 패널이 모두 이 순서를 따릅니다.
import { projects } from './projects.js';

// 프로젝트마다 조형물이 재조립될 모양 (Sculpture.jsx의 forms 참고)
// 무대에 크게 쓰는 짧은 이름 (없으면 프로젝트 이름)
const stageTitle = {
  unsolvableoj: '못풀준',
};

const formByProject = {
  whoislilpa: 'screen', // 발표 화면
  developet: 'ring', // 메뉴 막대 위를 도는 펫
  unsolvableoj: 'tiers', // 프론트 · API · 채점기 3층 구조
  ghostdock: 'dock', // Dock과 숨겨진 앱
};

export const stations = [
  { id: 'intro', group: 'Index', label: 'HYUNMIN', title: 'HYUNMIN.', form: 'sphere' },
  ...projects.map((project) => ({
    id: project.id,
    group: 'Projects',
    label: project.name,
    meta: project.stack.slice(0, 2).join(' · '),
    title: stageTitle[project.id] ?? project.name,
    form: formByProject[project.id] ?? 'sphere',
    project,
  })),
  { id: 'field', group: 'Profile', label: 'Field log', meta: 'Most Fun Product', title: 'Field log', form: 'scatter' },
  { id: 'about', group: 'Profile', label: 'About', meta: 'Spec · Timeline', title: 'About', form: 'helix' },
  { id: 'contact', group: 'Profile', label: 'Contact', meta: 'Email · GitHub', title: 'Rebuild.', form: 'portal' },
];

export const stationIds = stations.map((station) => station.id);
