/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  moduleDirectories: ["node_modules", "src"],
  roots: ["src"],
  moduleNameMapper: {
    "@src/(.*)": "<rootDir>/src/$1",
  },
  testEnvironment: "jsdom",
};
