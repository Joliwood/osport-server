import { UserConfig } from 'vitest';

const config: UserConfig | any = {
  // testMatch: ['**/__tests__/**/*.(ts|js)'],
  // extensions: ['ts', 'js'],
  exclude: ['./build/**/*', './node_modules/**/*'],
};

export default config;
