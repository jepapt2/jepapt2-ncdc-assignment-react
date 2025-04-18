const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Next.jsアプリケーションへのパスを指定
  dir: "./",
});

// Jest設定をカスタマイズ
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    // エイリアスの設定（tsconfig.jsonと一致させる）
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

// createJestConfigは、next/jestが設定したNext.js固有の設定をエクスポートします
module.exports = createJestConfig(customJestConfig);
