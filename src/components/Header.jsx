export default function Header({ theme, onTheme, motion, onMotion }) {
  return (
    <header className="site-header">
      <a className="brand" href="#/intro">
        HYUNMIN
        <span className="brand-sub">Portfolio Workbench</span>
      </a>
      <div className="header-controls">
        <button
          type="button"
          className="toggle"
          onClick={() => onMotion(motion === 'on' ? 'off' : 'on')}
          aria-pressed={motion === 'on'}
        >
          Motion {motion === 'on' ? 'On' : 'Off'}
        </button>
        <button
          type="button"
          className="toggle icon"
          onClick={() => onTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
        >
          {theme === 'dark' ? '○' : '●'}
        </button>
      </div>
    </header>
  );
}
