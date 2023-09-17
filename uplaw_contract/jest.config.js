
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json", "tsx", "jsx"],
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverage: true,
  coverageReporters: ["html", "text"],
  coverageDirectory: "<rootDir>/coverage",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};