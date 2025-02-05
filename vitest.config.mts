import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    coverage: {
      all: true,
      // TODO: add all folders to include for coverage
      //  for now, only include lib and mock directories,
      //  as our components/routes aren't going to have tests for a while
      // include: ['app/**', 'components/**', 'lib/**', 'mock/**'],
      include: ['lib/**', 'mock/**', 'components/**', 'hooks/**', 'app/**'],
      reporter: ['text', 'json-summary', 'json']
      // Set thresholds for passing/failing coverage.
      //   Turning this on fails the build if thresholds are not met
      // lines: 60,
      // branches: 60,
      // functions: 60,
      // statements: 60,
    }
  }
});
