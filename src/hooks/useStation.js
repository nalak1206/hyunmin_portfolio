import { useCallback, useEffect, useState } from 'react';

function readHash(ids) {
  const id = window.location.hash.replace(/^#\/?/, '');
  return ids.includes(id) ? id : ids[0];
}

// URL 해시(#/developet)로 현재 정거장을 정합니다. 새로고침·공유·뒤로가기가 그대로 동작합니다.
export function useStation(ids) {
  const [current, setCurrent] = useState(() => readHash(ids));

  useEffect(() => {
    const sync = () => setCurrent(readHash(ids));
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [ids]);

  const go = useCallback(
    (id) => {
      if (id !== current) window.location.hash = `/${id}`;
    },
    [current],
  );

  return [current, go];
}

function isTyping(target) {
  return target instanceof HTMLElement && target.closest('input, textarea, select, [contenteditable="true"]');
}

// ← → 키로 이전·다음 정거장
export function useArrowKeys(onPrev, onNext) {
  useEffect(() => {
    function onKey(event) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (isTyping(event.target)) return;
      if (event.key === 'ArrowRight') onNext();
      if (event.key === 'ArrowLeft') onPrev();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onPrev, onNext]);
}
