import { useEffect, useRef } from 'react';

// 왼쪽 부품 목록. 어느 화면에서든 항상 보이는 목차입니다.
export default function PartsIndex({ stations, currentId }) {
  const navRef = useRef(null);
  const groups = [...new Set(stations.map((station) => station.group))];

  // 모바일의 가로 목록에서 현재 항목이 화면 밖에 있으면 보이는 곳으로 옮깁니다.
  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector('[aria-current="page"]');
    if (!nav || !link || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({ left: link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2 });
  }, [currentId]);

  return (
    <nav className="parts" aria-label="목차" ref={navRef}>
      {groups.map((group) => (
        <div className="parts-group" key={group}>
          <p className="parts-heading">{group}</p>
          <ol>
            {stations.map((station, index) =>
              station.group !== group ? null : (
                <li key={station.id}>
                  <a href={`#/${station.id}`} aria-current={station.id === currentId ? 'page' : undefined}>
                    <span className="parts-no">{String(index).padStart(2, '0')}</span>
                    <span className="parts-name">
                      {station.label}
                      {station.meta && <small>{station.meta}</small>}
                    </span>
                  </a>
                </li>
              ),
            )}
          </ol>
        </div>
      ))}
      <p className="parts-hint">← → 키로도 이동할 수 있어요</p>
    </nav>
  );
}
