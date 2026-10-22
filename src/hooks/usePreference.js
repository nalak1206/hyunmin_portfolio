import { useEffect, useState } from 'react';

function read(key, fallback) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

// <html data-{key}="..."> 로 반영하고 localStorage에 저장하는 설정 값
export function usePreference(key, fallback) {
  const [value, setValue] = useState(() => document.documentElement.dataset[key] || read(key, fallback));

  useEffect(() => {
    document.documentElement.dataset[key] = value;
    try {
      localStorage.setItem(key, value);
    } catch {
      // 저장이 막힌 환경에서는 이번 방문에만 적용합니다.
    }
  }, [key, value]);

  return [value, setValue];
}
