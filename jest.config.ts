import type { Config } from 'jest'
import nextJest from "next/jest.js";
// import type { JestConfigWithTsJest } from "ts-jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["./src/helper/test/setup-jest.ts"],
  testEnvironment: "jsdom",
};

// export default config;
export default createJestConfig(config);
