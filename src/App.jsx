import { useCallback, useEffect, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import PartsIndex from './components/PartsIndex.jsx';
import Stage from './components/Stage.jsx';
import Detail from './components/Detail.jsx';
import { stationIds, stations } from './data/stations.js';
import { usePreference } from './hooks/usePreference.js';
import { useArrowKeys, useStation } from './hooks/useStation.js';

function defaultMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'off' : 'on';
}

export default function App() {
  const [theme, setTheme] = usePreference('theme', 'dark');
  const [motion, setMotion] = usePreference('motion', defaultMotion());
  const [currentId, go] = useStation(stationIds);
  const [exploded, setExploded] = useState(false);
  const detailRef = useRef(null);

  const index = stationIds.indexOf(currentId);
  const station = stations[index];
  const prev = useCallback(() => go(stationIds[(index - 1 + stationIds.length) % stationIds.length]), [go, index]);
  const next = useCallback(() => go(stationIds[(index + 1) % stationIds.length]), [go, index]);
  useArrowKeys(prev, next);

  // 정거장이 바뀌면 분해 상태를 풀고, 상세 패널을 맨 위로 되돌립니다.
  // 모바일(세로로 쌓인 화면)에서는 재조립되는 조형물이 보이도록 페이지 맨 위로 올립니다.
  useEffect(() => {
    setExploded(false);
    detailRef.current?.scrollTo({ top: 0 });
    if (window.matchMedia('(max-width: 960px)').matches && window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: document.documentElement.dataset.motion === 'off' ? 'auto' : 'smooth' });
    }
  }, [currentId]);

  return (
    <>
      <a className="skip-link" href="#detail">
        상세 내용으로 건너뛰기
      </a>
      <Header theme={theme} onTheme={setTheme} motion={motion} onMotion={setMotion} />
      <main className="workbench">
        <h1 className="sr-only">김현민 포트폴리오</h1>
        <PartsIndex stations={stations} currentId={currentId} />
        <Stage
          station={station}
          index={index}
          total={stations.length}
          motion={motion === 'on'}
          exploded={exploded}
          onToggleExplode={() => setExploded((value) => !value)}
          onPrev={prev}
          onNext={next}
        />
        <Detail ref={detailRef} station={station} next={stations[(index + 1) % stations.length]} />
      </main>
    </>
  );
}
