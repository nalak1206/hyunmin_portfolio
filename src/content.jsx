import { useEffect, useRef, useState } from 'react';
import { projects } from './projects.js';

export function About() {
  return <><h2>김현민</h2><p className="lead">다양한 웹사이트를 탐구하고 분석하며, 사용자에게 좋은 경험을 제공하는 UI를 설계하는 김현민입니다.</p><div className="id-card"><div className="avatar">N</div><div><b>Frontend Developer · UX/UI Designer</b><p>이메일: hfjevblkjfk@gmail.com<br />GitHub: github.com/nalak1206<br /><a href="https://app.notion.com/p/KimHyunMin-326dd31f000a802cb250c432452b6a1c" target="_blank" rel="noopener noreferrer">Notion: KimHyunMin ↗</a></p></div></div><h3>자기소개</h3><p className="lead">새로운 아이디어가 떠오르면 직접 디자인하거나 개발하면서 실제 결과물로 만들어 봅니다. 익숙하지 않은 기술이 필요할 때는 AI로 해결 방법을 탐색하고 내용을 이해한 뒤 프로젝트에 적용하고 있습니다.</p><p className="lead">디자인과 개발 역량을 함께 발전시켜 누구나 쉽고 편리하게 사용할 수 있는 웹 서비스를 만드는 것이 목표입니다.</p></>;
}

export function Projects({ onOpenProject }) {
  return <><h2>Selected Projects</h2><p className="lead">카드를 선택하면 프로젝트 상세 정보를 확인할 수 있습니다.</p><div className="card-grid">{projects.map((project, index) => <button type="button" className="card project" key={project.name} onClick={() => onOpenProject(index)} aria-label={`${project.name} 상세 보기`}><small>0{index + 1} / {project.stack}</small><b>{project.name}</b><p>{project.summary}</p><span>상세 보기 ↗</span></button>)}</div></>;
}

export function ProjectDetail({ project }) {
  return <><h2>{project.name}</h2><p className="lead">{project.intro}</p>{project.image && <img className="project-visual" src={project.image} alt="Major 음악 소통 및 공유 사이트 표지" />}<h3>구현한 내용</h3><p className="lead">{project.implementation}</p>{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}<h3>문제 해결</h3><p className="lead">{project.problem}</p>{project.result && <><h3>프로젝트 결과</h3><p className="lead"><b>{project.result}</b></p></>}<h3>배운 점</h3><p className="lead">{project.learned}</p><button type="button" className="primary unavailable" disabled>프로젝트 링크 · 준비 중</button></>;
}

export function Skills() {
  const ready = [['Python', 'Discord 자동 메시지 봇과 macOS 자동 실행 설정에 사용했습니다.'], ['HTML', '웹사이트의 제목, 입력, 버튼과 결과 영역 구조를 구성할 수 있습니다.'], ['CSS', 'Flexbox, 반응형 배치와 기본적인 인터랙션 UI를 구현할 수 있습니다.']];
  const learning = [['JavaScript', '입력 검증, 계산, 이벤트 기반 화면 변경을 프로젝트에 적용했습니다.'], ['React', '컴포넌트 분리와 라우팅을 사용한 게시판을 제작했습니다.'], ['Supabase', '게시글 데이터의 조회·등록·수정과 클라이언트 연결을 학습 중입니다.']];
  const cards = (items) => <div className="card-grid">{items.map(([name, text]) => <article className="card" key={name}><b>{name}</b><p>{text}</p></article>)}</div>;
  return <><h2>Skills & Experience</h2><p className="lead">숙련도를 숫자로 단정하지 않고 실제 적용 경험을 중심으로 정리합니다.</p><h3>실제 사용 가능 <span className="tag">READY</span></h3>{cards(ready)}<h3>학습 중 <span className="tag">LEARNING</span></h3>{cards(learning)}</>;
}

export function DevLog() {
  const logs = [['Troubleshooting', 'Supabase export 오류 해결'], ['Python', 'macOS에서 Python 파일 실행 권한 문제 해결'], ['Automation', 'Discord Bot 자동 실행 설정'], ['React', 'React Router를 이용한 게시판 페이지 분리'], ['Figma', 'Figma 팀 프로젝트 화면 구조 설계'], ['JavaScript', 'LoL RP 계산기 입력 UI 개선']];
  return <><h2>Dev Log</h2><p className="lead">배운 내용과 문제 해결 과정을 기록합니다.</p>{logs.map(([category, title]) => <article className="log" key={title}><small>{category} · 2026</small><b>{title}</b></article>)}</>;
}

export function Timeline() {
  const items = [['2025', '프론트엔드 분야에 관심을 갖고 학습 시작'], ['2025', 'Python과 HTML · CSS · JavaScript 학습'], ['2026', 'Figma 팀 프로젝트 · Discord Bot 개발'], ['2026', 'React · Supabase 게시판 프로젝트'], ['NEXT', '사용자 중심의 제품을 만드는 개발자']];
  return <><h2>Learning Timeline</h2><div className="timeline">{items.map(([year, text], index) => <article key={`${year}-${index}`}><small>{year}</small><b>{text}</b></article>)}</div></>;
}

export function Gallery() {
  const images = [['major-cover.png', 'Major 프로젝트 표지 디자인', 'Major · project cover'], ['major-screens.png', 'Major 음악 서비스 주요 모바일 화면', '주요 모바일 화면'], ['major-features.png', 'Major 서비스 주요 기능 소개', '서비스 주요 기능'], ['major-problem.png', 'Major 프로젝트 문제 정의', '문제 정의와 해결 방향']];
  return <><h2>Major · Gallery</h2><p className="lead">음악 소통 및 공유 사이트의 기획·프로토타입 결과물입니다.</p><div className="image-grid">{images.map(([file, alt, caption]) => <figure key={file}><img loading="lazy" decoding="async" src={`/assets/${file}`} alt={alt} /><figcaption>{caption}</figcaption></figure>)}</div></>;
}

export function Resume() {
  return <><h2>Resume</h2><p className="lead">김현민 · Frontend Developer in Progress</p><h3>핵심 기술</h3><p>HTML · CSS · JavaScript · React · Python · Figma · Supabase</p><h3>프로젝트</h3><p>Figma 팀 프로젝트 / Discord Bot / React · Supabase 게시판 / LoL RP 계산기</p><button type="button" className="primary unavailable" disabled>이력서 PDF · 준비 중</button></>;
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
