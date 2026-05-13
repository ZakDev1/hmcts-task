import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./src",
  testMatch: ["**/tests/**/*.test.ts"],
  clearMocks: true,
  globals: {
    "ts-jest": {
      tsconfig: {
        ignoreDeprecations: "6.0",
        module: "commonjs",
      },
    },
  },
};

export default config;
