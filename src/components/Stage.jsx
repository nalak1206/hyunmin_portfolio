import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react';

// three.js는 무거우므로 글자가 먼저 뜨도록 따로 불러옵니다.
const Sculpture = lazy(() => import('./Sculpture.jsx'));

// 3D에서 오류가 나도 나머지 화면은 그대로 보이게, 조형물만 조용히 숨깁니다.
class SculptureBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function Stage({ station, index, total, motion, exploded, onToggleExplode, onPrev, onNext }) {
  const stageRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [webgl] = useState(supportsWebGL);

  // 모바일에서 스크롤로 무대가 화면 밖에 나가면 그리기를 멈춥니다.
  useEffect(() => {
    const node = stageRef.current;
    if (!node || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stage" ref={stageRef} aria-label="조형물 무대">
      {webgl && (
        <button type="button" className="stage-canvas" onClick={onToggleExplode} aria-pressed={exploded} aria-label={exploded ? '조형물 다시 조립하기' : '조형물 분해하기'}>
          <SculptureBoundary>
            <Suspense fallback={null}>
              <Sculpture form={station.form} exploded={exploded} motion={motion} visible={visible} />
            </Suspense>
          </SculptureBoundary>
        </button>
      )}

      <div className="stage-meta">
        <p className="stage-counter" aria-live="polite">
          <span>Station</span> {String(index).padStart(2, '0')} / {String(total - 1).padStart(2, '0')}
        </p>
        {webgl && <p className="stage-hint">조형물을 클릭하면 {exploded ? '다시 조립됩니다' : '분해됩니다'}</p>}
      </div>
      <p className="stage-title" key={station.id}>
        {station.title}
      </p>

      <div className="stage-controls">
        <button type="button" className="toggle" onClick={onPrev} aria-label="이전">
          ←
        </button>
        <button type="button" className="toggle" onClick={onNext} aria-label="다음">
          →
        </button>
      </div>
    </section>
  );
}
