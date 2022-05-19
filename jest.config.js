module.exports = {
  roots: ["<rootDir>/src/__tests__"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testRegex: "/__tests__/.*\\.(ts|js)$",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  modulePathIgnorePatterns: [
    "utils.ts",
    "setup.ts",
    "esMappings.ts",
    "conversationCronJob.test.ts",
    "coverage/",
  ],
  coverageDirectory: "src/__tests__/coverage/",
  collectCoverage: true,
  collectCoverageFrom: ["src/db/models/**", "src/data/resolvers/**"],
  coverageThreshold: {
    global: {
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.json",
    },
  },
};
