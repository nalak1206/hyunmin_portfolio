import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // three.js 청크(Sculpture)는 히어로에서 지연 로딩되므로 크기 경고 기준을 올립니다.
  build: { chunkSizeWarningLimit: 900 },
});
