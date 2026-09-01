import { useEffect, useRef, useState } from 'react';
import {
  About,
  Contact,
  DevLog,
  Gallery,
  ProjectDetail,
  Projects,
  Resume,
  Settings,
  Skills,
  Terminal,
  Timeline,
} from './content.jsx';
import { projects } from './projects.js';

const apps = {
  about: { name: 'About Me', icon: 'N' },
  projects: { name: 'Projects', icon: '✦' },
  skills: { name: 'Skills', icon: '⌘' },
  log: { name: 'Dev Log', icon: '≡' },
  timeline: { name: 'Timeline', icon: '↗' },
  gallery: { name: 'Gallery', icon: '▦' },
  resume: { name: 'Resume', icon: '▤' },
  contact: { name: 'Contact', icon: '@' },
  terminal: { name: 'Terminal', icon: '›_' },
  settings: { name: 'Settings', icon: '⚙' },
};

const dockApps = ['about', 'projects', 'skills', 'log', 'gallery', 'terminal'];
const startApps = ['about', 'projects', 'skills', 'log', 'contact', 'settings'];

function initialPreferences() {
  return {
    theme: localStorage.getItem('hyunmin-theme') || 'light',
    motion: localStorage.getItem('hyunmin-motion') !== 'off',
    effects: localStorage.getItem('hyunmin-effects') !== 'off',
  };
}

function WindowFrame({ windowState, title, children, motion, onClose, onFocus, onMinimize, onMaximize, onMove }) {
  const [launching, setLaunching] = useState(true);
  const dragRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    frameRef.current?.focus({ preventScroll: true });
    const timer = setTimeout(() => setLaunching(false), motion ? 650 : 0);
    return () => clearTimeout(timer);
  }, [motion]);

  function startDrag(event) {
    if (event.target.closest('button') || windowState.maximized || innerWidth <= 700) return;
    dragRef.current = { x: event.clientX - windowState.x, y: event.clientY - windowState.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function drag(event) {
    if (!dragRef.current) return;
    const x = Math.min(Math.max(0, innerWidth - 120), Math.max(0, event.clientX - dragRef.current.x));
    const y = Math.min(Math.max(26, innerHeight - 80), Math.max(26, event.clientY - dragRef.current.y));
    onMove(x, y);
  }

  return (
    <section
      ref={frameRef}
      className={`window active${launching ? ' launching' : ''}${windowState.maximized ? ' maximized' : ''}`}
      role="dialog"
      aria-label={title}
      tabIndex={-1}
      style={{ left: windowState.x, top: windowState.y, zIndex: windowState.z, display: windowState.minimized ? 'none' : 'flex' }}
      onPointerDown={onFocus}
    >
      <header className="titlebar" onPointerDown={startDrag} onPointerMove={drag} onPointerUp={() => { dragRef.current = null; }}>
        <div className="win-controls">
          <button type="button" className="close" aria-label={`${title} 닫기`} onClick={onClose} />
          <button type="button" className="min" aria-label={`${title} 최소화`} onClick={onMinimize} />
          <button type="button" className="max" aria-label={`${title} ${windowState.maximized ? '이전 크기로 복원' : '최대화'}`} aria-pressed={windowState.maximized} onClick={onMaximize} />
        </div>
        <b className="win-title">{title}</b>
      </header>
      <div className="window-content">{children}</div>
    </section>
  );
}

export default function App() {
  const [stage, setStage] = useState('booting');
  const [bootKey, setBootKey] = useState(0);
  const [bootLines, setBootLines] = useState([]);
  const [preferences, setPreferences] = useState(initialPreferences);
  const [windows, setWindows] = useState([]);
  const [startOpen, setStartOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [now, setNow] = useState(new Date());
  const nextZ = useRef(10);
  const toastTimer = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setBootLines([]);
    const messages = ['Initializing HYUNMIN React...', 'Mounting portfolio components...', 'Restoring preferences...', 'Loading projects...', 'System ready.'];
    const lineTimers = messages.map((message, index) => setTimeout(() => setBootLines((current) => [...current, message]), index * 420));
    const lockTimer = setTimeout(() => setStage('locked'), 2500);
    return () => { lineTimers.forEach(clearTimeout); clearTimeout(lockTimer); };
  }, [bootKey]);

  useEffect(() => {
    document.body.classList.toggle('light', preferences.theme === 'light');
    document.documentElement.classList.toggle('motion-off', !preferences.motion);
    document.querySelector('meta[name="theme-color"]').content = preferences.theme === 'light' ? '#eaf3fb' : '#07111e';
  }, [preferences]);

  useEffect(() => {
    function keydown(event) {
      if (event.key === 'Enter' && stage === 'locked') unlock();
      if (event.key === 'Escape') setStartOpen(false);
    }
    document.addEventListener('keydown', keydown);
    return () => document.removeEventListener('keydown', keydown);
  });

  function showToast(message) {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(''), 3500);
  }

  function openApp(id, options = {}) {
    const z = ++nextZ.current;
    setWindows((current) => {
      const existing = current.find((item) => item.id === id);
      if (existing) return current.map((item) => item.id === id ? { ...item, ...options, minimized: false, z } : item);
      return [...current, {
        id,
        x: Math.max(30, Math.round((innerWidth - 690) / 2 + Math.random() * 48 - 24)),
        y: Math.max(48, Math.round((innerHeight - 680) / 2 + Math.random() * 38 - 19)),
        z,
        minimized: false,
        maximized: false,
        ...options,
      }];
    });
    setStartOpen(false);
  }

  function updateWindow(id, patch) {
    setWindows((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  }

  function focusWindow(id) {
    updateWindow(id, { z: ++nextZ.current });
  }

  function toggleDockApp(id) {
    const existing = windows.find((item) => item.id === id);
    if (existing && !existing.minimized) updateWindow(id, { minimized: true });
    else openApp(id);
  }

  function changePreference(key, value) {
    setPreferences((current) => ({ ...current, [key]: value }));
    const storageValue = key === 'theme' ? value : value ? 'on' : 'off';
    localStorage.setItem(`hyunmin-${key}`, storageValue);
    if (key === 'theme') showToast(value === 'light' ? '화이트 모드를 적용했습니다.' : '다크 모드를 적용했습니다.');
  }

  function reboot() {
    setStage('booting');
    setBootKey((value) => value + 1);
  }

  function unlock() {
    setStage('ready');
    openApp('about');
    showToast('어서오세요! 김현민의 포트폴리오 사이트입니다!');
  }

  function renderContent(windowState) {
    const props = { preferences, onChange: changePreference, onReboot: reboot };
    switch (windowState.id) {
      case 'about': return <About />;
      case 'projects': return <Projects onOpenProject={(index) => openApp('detail', { projectIndex: index })} />;
      case 'detail': return <ProjectDetail project={projects[windowState.projectIndex ?? 0]} />;
      case 'skills': return <Skills />;
      case 'log': return <DevLog />;
      case 'timeline': return <Timeline />;
      case 'gallery': return <Gallery />;
      case 'resume': return <Resume />;
      case 'contact': return <Contact />;
      case 'terminal': return <Terminal />;
      case 'settings': return <Settings {...props} />;
      default: return null;
    }
  }

  function windowTitle(windowState) {
    return windowState.id === 'detail' ? projects[windowState.projectIndex ?? 0].name : apps[windowState.id].name;
  }

  const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString('ko-KR', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <main id="os" className={stage}>
      <section id="boot" className="overlay boot" aria-label="포트폴리오 로딩 중">
        <div><p className="os-logo">HYUNMIN</p><div id="boot-lines">{bootLines.map((line) => <p key={line}>› {line}</p>)}</div><button type="button" className="ghost skip" onClick={() => setStage('locked')}>SKIP BOOT ↗</button><div className="progress"><i /></div></div>
      </section>
      <section id="lock" className="overlay lock" aria-label="잠금 화면">
        <p className="clock">{time}</p><p>{date}</p><div className="identity"><div className="avatar">N</div><h1>김현민</h1><p>Frontend Developer in Progress</p><button type="button" className="primary unlock" onClick={unlock}>포트폴리오 열기 <b aria-hidden="true">↗</b></button><small>CLICK OR PRESS ENTER TO UNLOCK</small></div>
      </section>
      <section id="desktop" aria-label="HYUNMIN 바탕화면" className={preferences.effects ? '' : 'no-effects'}>
        <header className="desktop-brand"><b>●</b> HYUNMIN <span>File · Edit · View · Window · Help</span><em>React Edition · ◌ · {time}</em></header>
        <div id="icons" className="icons">{Object.entries(apps).map(([id, app]) => <button type="button" className="desk-icon" key={id} onClick={() => openApp(id)} aria-label={`${app.name} 열기`}><span className="app-icon" aria-hidden="true">{app.icon}</span>{app.name}</button>)}</div>
        <div id="windows">{windows.map((windowState) => <WindowFrame key={windowState.id} windowState={windowState} title={windowTitle(windowState)} motion={preferences.motion} onClose={() => setWindows((current) => current.filter((item) => item.id !== windowState.id))} onFocus={() => focusWindow(windowState.id)} onMinimize={() => updateWindow(windowState.id, { minimized: true })} onMaximize={() => updateWindow(windowState.id, { maximized: !windowState.maximized })} onMove={(x, y) => updateWindow(windowState.id, { x, y })}>{renderContent(windowState)}</WindowFrame>)}</div>
        <div id="toast" role="status" className={toast ? 'show' : ''}>{toast}</div>
        <div id="start-menu" className={`start-menu${startOpen ? ' open' : ''}`}><p className="os-logo">HYUNMIN</p><div>{startApps.map((id) => <button type="button" key={id} onClick={() => openApp(id)}>{apps[id].icon} · {apps[id].name}</button>)}</div><button type="button" className="lock-action" onClick={() => { setStage('locked'); setStartOpen(false); }}>⌑ 화면 잠금</button><small>React Portfolio Edition · 2026</small></div>
        <footer className="taskbar"><button type="button" id="start" aria-label="시작 메뉴" aria-expanded={startOpen} onClick={() => setStartOpen((open) => !open)}>⌘</button><div id="dock-apps">{dockApps.map((id) => { const running = windows.some((item) => item.id === id); const visible = windows.some((item) => item.id === id && !item.minimized); return <button type="button" className={`dock-app${running ? ' is-running' : ''}`} key={id} onClick={() => toggleDockApp(id)} aria-label={`${apps[id].name} ${visible ? '최소화' : '열기'}`} aria-pressed={visible}><span className="app-icon" aria-hidden="true">{apps[id].icon}<i className="running-dot" /></span></button>; })}</div><div id="task-apps" /><button type="button" className={`quick-app${windows.some((item) => item.id === 'settings') ? ' is-running' : ''}`} data-app="settings" aria-label="Settings 열기" onClick={() => toggleDockApp('settings')}>⚙</button><span className="tray">{time}</span></footer>
      </section>
    </main>
  );
}
