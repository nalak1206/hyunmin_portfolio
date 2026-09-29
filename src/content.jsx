import { useEffect, useRef, useState } from 'react';
import { projects } from './projects.js';

export function About() {
  return <><h2>김현민</h2><p className="lead">웹사이트를 직접 살펴보고 구조를 분석하며, 사용하기 편한 화면을 고민하는 김현민입니다.</p><div className="status-line"><span />현재 React와 Supabase를 배우며 프로젝트로 확인하고 있어요.</div><div className="id-card"><div className="avatar">N</div><div><b>Frontend Developer · UX/UI Designer</b><p>이메일: hfjevblkjfk@gmail.com<br />GitHub: github.com/nalak1206<br /><a href="https://app.notion.com/p/KimHyunMin-326dd31f000a802cb250c432452b6a1c" target="_blank" rel="noopener noreferrer">Notion: KimHyunMin ↗</a></p></div></div><h3>자기소개</h3><p className="lead">새 아이디어가 생기면 디자인과 코드로 옮겨 실제로 작동하는 결과물까지 만들어 봅니다. 낯선 기술이 필요하면 AI로 해결책을 찾되, 원리를 이해한 다음 프로젝트에 적용합니다.</p><p className="lead">디자인 감각과 개발 역량을 함께 키워, 처음 쓰는 사람도 헤매지 않는 웹 서비스를 만들고 싶습니다.</p></>;
}

export function Projects({ onOpenProject }) {
  return <><h2>Selected Projects</h2><p className="lead">무엇을 만들었고 어떤 문제를 풀었는지 프로젝트별로 정리했습니다.</p><div className="card-grid">{projects.map((project, index) => <button type="button" className="card project" key={project.name} onClick={() => onOpenProject(index)} aria-label={`${project.name} 상세 보기`}><small>{project.stack}</small><b>{project.name}</b><p>{project.summary}</p>{project.result && <em>1등 수상</em>}<span>구현과 문제 해결 보기 ↗</span></button>)}</div></>;
}

export function ProjectDetail({ project }) {
  return <><h2>{project.name}</h2><p className="lead">{project.intro}</p>{project.image && <img className="project-visual" src={project.image} alt="Major 음악 소통 및 공유 사이트 표지" />}<h3>구현한 내용</h3><p className="lead">{project.implementation}</p>{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}<h3>문제 해결</h3><p className="lead">{project.problem}</p>{project.result && <><h3>프로젝트 결과</h3><p className="lead"><b>{project.result}</b></p></>}<h3>배운 점</h3><p className="lead">{project.learned}</p><button type="button" className="primary unavailable" disabled>프로젝트 링크 · 준비 중</button></>;
}

export function Skills() {
  const ready = [['Python', 'Discord 자동 메시지 봇과 macOS 자동 실행 설정에 사용했습니다.'], ['HTML', '제목, 입력창, 버튼, 결과 영역 등 웹 화면의 기본 구조를 만들 수 있습니다.'], ['CSS', 'Flexbox와 반응형 배치를 활용해 다양한 화면에 맞는 인터랙션 UI를 구현할 수 있습니다.']];
  const learning = [['JavaScript', '입력 검증과 계산, 이벤트에 따른 화면 변화를 프로젝트에 적용했습니다.'], ['React', '컴포넌트를 나누고 React Router로 페이지를 구분한 게시판을 만들었습니다.'], ['Supabase', '게시글 조회·등록·수정과 React 클라이언트 연결을 익히는 중입니다.']];
  const cards = (items) => <div className="card-grid">{items.map(([name, text]) => <article className="card" key={name}><b>{name}</b><p>{text}</p></article>)}</div>;
  return <><h2>Skills & Experience</h2><p className="lead">숫자로 숙련도를 부풀리기보다, 직접 써 본 범위와 현재 배우는 내용을 나눠 적었습니다.</p><h3>실제 사용 가능 <span className="tag">READY</span></h3>{cards(ready)}<h3>학습 중 <span className="tag">LEARNING</span></h3>{cards(learning)}</>;
}

export function DevLog() {
  const logs = [['Troubleshooting', 'Supabase export 오류 해결'], ['Python', 'macOS에서 Python 파일 실행 권한 문제 해결'], ['Automation', 'Discord Bot 자동 실행 설정'], ['React', 'React Router를 이용한 게시판 페이지 분리'], ['Figma', 'Figma 팀 프로젝트 화면 구조 설계'], ['JavaScript', 'LoL RP 계산기 입력 UI 개선']];
  const photos = [['presentation', '발표를 준비하며'], ['video-presentation', '구현한 화면과 아이디어 발표'], ['video-audience', '현장 참가자들과 함께한 발표 시간'], ['award', 'Most Fun Product 수상 기념']];
  return <><h2>Dev Log</h2><p className="lead">배운 내용과 막힌 문제를 풀어 간 과정을 짧게 기록했습니다.</p><article className="field-trip"><h3>I/O Extended: Agent Field Trip 2026 Incheon</h3><p className="lead">2026.09.12 · 인천 · 프론트엔드 개발 역할로 참여</p><h3>현장에서 문제를 찾으며, 개발자의 역할을 다시 생각하다</h3><p className="lead">현장을 직접 돌아다니며 문제를 찾는 방식이 가장 인상 깊었습니다. 화면 앞에서 아이디어를 생각할 때와 달리, 실제 공간에서 불편함을 마주하니 무엇을 해결해야 하는지 더 구체적으로 보였고 해결 방법도 함께 고민하기 좋았습니다. 개발자가 현장을 이해하고 AI와 함께 문제를 풀어가는 모습에서 앞으로의 개발 방식도 엿볼 수 있었습니다.</p><p className="lead">프론트엔드 개발 역할로 참여하면서 같은 팀의 시니어 개발자분들에게 AI 활용 방법과 실제 개발 현장의 이야기를 들었습니다. 혼자 공부할 때는 접하기 어려웠던 경험을 나누며, 앞으로 무엇을 배우고 어떤 방향으로 성장할지 생각해 볼 수 있었습니다.</p><p className="lead">이번 경험을 통해 개발은 기능을 구현하는 것만큼이나 해결할 문제를 제대로 찾는 일이 중요하다는 것을 느꼈습니다. 현장을 살피고 사람들의 불편함을 이해하는 개발자가 되고 싶다는 마음이 생겼고, 프론트엔드 개발자로 나아가려는 진로도 한층 확실해졌습니다.</p><p className="lead"><b>팀 결과물로 Most Fun Product를 수상했습니다.</b></p><div className="image-grid field-trip-photos">{photos.map(([file, caption]) => <figure key={file}><img loading="lazy" decoding="async" width="1200" height={file.startsWith('video') ? 675 : 800} src={`/assets/field-trip/${file}.jpg`} alt={`Agent Field Trip · ${caption}. 본인 외 참가자 얼굴 모자이크 처리`} /><figcaption>{caption}</figcaption></figure>)}</div><p className="event-links"><a href="https://gdg.community.dev/events/details/google-gdg-incheon-presents-io-extended-agent-field-trip-2026-incheon/" target="_blank" rel="noopener noreferrer">행사 소개 ↗</a><a href="https://photos.app.goo.gl/7TGSo8Rd9pf6Pq4h7" target="_blank" rel="noopener noreferrer">행사 사진 앨범 ↗</a></p></article><h3>개발 기록</h3>{logs.map(([category, title]) => <article className="log" key={title}><small>{category} · 2026</small><b>{title}</b></article>)}</>;
}

export function Timeline() {
  const items = [['2025', '프론트엔드 분야에 관심을 갖고 학습 시작'], ['2025', 'Python과 HTML · CSS · JavaScript 학습'], ['2026', 'Figma 팀 프로젝트 · Discord Bot 개발'], ['2026', 'React · Supabase 게시판 프로젝트'], ['2026.09.12', 'Agent Field Trip 참가 · 프론트엔드 개발 · Most Fun Product 수상'], ['NEXT', '사용자 중심의 제품을 만드는 개발자']];
  return <><h2>Learning Timeline</h2><div className="timeline">{items.map(([year, text], index) => <article key={`${year}-${index}`}><small>{year}</small><b>{text}</b></article>)}</div></>;
}

export function Gallery() {
  const images = [['major-cover.png', 'Major 프로젝트 표지 디자인', 'Major · project cover'], ['major-screens.png', 'Major 음악 서비스 주요 모바일 화면', '주요 모바일 화면'], ['major-features.png', 'Major 서비스 주요 기능 소개', '서비스 주요 기능'], ['major-problem.png', 'Major 프로젝트 문제 정의', '문제 정의와 해결 방향']];
  return <><h2>Major · Gallery</h2><p className="lead">음악 소통 및 공유 사이트의 기획·프로토타입 결과물입니다.</p><div className="image-grid">{images.map(([file, alt, caption]) => <figure key={file}><img loading="lazy" decoding="async" src={`/assets/${file}`} alt={alt} /><figcaption>{caption}</figcaption></figure>)}</div></>;
}

export function Resume() {
  return <><h2>Resume</h2><p className="lead">김현민 · Frontend Developer in Progress</p><h3>핵심 기술</h3><p>HTML · CSS · JavaScript · React · Python · Figma · Supabase</p><h3>프로젝트</h3><p>Figma 팀 프로젝트 / Discord Bot / React · Supabase 게시판 / LoL RP 계산기</p><a className="primary" href="https://app.notion.com/p/KimHyunMin-326dd31f000a802cb250c432452b6a1c" target="_blank" rel="noopener noreferrer">Notion 프로필 보기 ↗</a><p className="availability-note">이력서 PDF는 준비 중입니다.</p></>;
}

export function Contact() {
  return <><h2>Let&apos;s talk.</h2><p className="lead">이메일 또는 GitHub를 통해 연락해 주세요.</p><h3>hfjevblkjfk@gmail.com</h3><a className="primary" href="mailto:hfjevblkjfk@gmail.com">이메일 보내기 ↗</a><a className="primary" href="https://github.com/nalak1206" target="_blank" rel="noopener noreferrer">GitHub 열기 ↗</a><a className="primary" href="https://app.notion.com/p/KimHyunMin-326dd31f000a802cb250c432452b6a1c" target="_blank" rel="noopener noreferrer">Notion 열기 ↗</a></>;
}

export function Terminal() {
  const [lines, setLines] = useState([]);
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); }, []);
  const answers = { help: 'help, about, projects, skills, contact, clear, whoami, date', whoami: '김현민\nFrontend Developer in Progress', about: '사용자 중심의 화면을 만드는 프론트엔드 개발자를 목표로 합니다.', projects: 'Major 팀 프로젝트\nDiscord 자동 메시지 봇\nReact · Supabase 게시판\nLoL RP 계산기', skills: 'HTML, CSS, JavaScript, React, Python, Figma, Supabase', contact: 'hfjevblkjfk@gmail.com' };
  function submit(event) {
    event.preventDefault();
    const input = inputRef.current;
    const command = input.value.trim().toLowerCase();
    if (!command) return;
    if (command === 'clear') setLines([]);
    else setLines((current) => [...current, answers[command] ? `hyunmin:~$ ${command}\n${answers[command]}` : command === 'date' ? `hyunmin:~$ date\n${new Date()}` : `command not found: ${command}`]);
    input.value = '';
  }
  return <div className="terminal"><p>HYUNMIN Terminal v2.0 · React</p><p>Type <b>help</b> to see available commands.</p><div className="term-output" aria-live="polite">{lines.map((line, index) => <p key={`${index}-${line}`}>{line}</p>)}</div><form onSubmit={submit}><label htmlFor="terminal-input">hyunmin:~$</label><input ref={inputRef} id="terminal-input" autoComplete="off" aria-label="터미널 명령어" /></form></div>;
}

export function Settings({ preferences, onChange, onReboot }) {
  return <><h2>Settings</h2><p className="lead">HYUNMIN의 모양과 동작을 조정합니다.</p><div className="settings"><label>화이트 모드 <input type="checkbox" checked={preferences.theme === 'light'} onChange={(event) => onChange('theme', event.target.checked ? 'light' : 'dark')} /></label><label>애니메이션 효과 <input type="checkbox" checked={preferences.motion} onChange={(event) => onChange('motion', event.target.checked)} /></label><label>배경 효과 <input type="checkbox" checked={preferences.effects} onChange={(event) => onChange('effects', event.target.checked)} /></label><label>부팅 화면 다시 보기 <button type="button" className="reboot" onClick={onReboot}>REBOOT</button></label></div></>;
}
