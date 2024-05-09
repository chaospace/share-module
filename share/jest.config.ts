
const config = {
  verbose: true,
  rootDir: ".",
  roots: ["<rootDir>/src/", "<rootDir>/tests/"],
  // testEnvironment: "jsdom",
  // msw에 node사용을 위해 커스텀 옵션을 빈 문자열로 변경 jsdom사용 시 기본은 browser로 된다.
  // testEnvironmentOptions: {
  //   customExportConditions: [''],
  // },
  transformIgnorePatterns: ["/node_modules/", "/dist/", "\\.pnp\\.[^\\/]+$"],
  coveragePathIgnorePatterns: ["src/index.ts"],
  setupFiles: ["./tests/jest.pollyfill.js",],
  setupFilesAfterEnv: ["./tests/jest.setup.ts"],
  testMatch: [
    "<rootDir>/src/**/*.(test|spec).(ts|tsx)",
    "<rootDir>/tests/**/*.(test|spec).(ts|tsx)",
  ],
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  resolver: "<rootDir>/tests/jest.resolver.js",
  moduleNameMapper: {
    "^@/(.+)$": "<rootDir>/src/$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/__mocks__/fileMock.ts",
    "\\.(css|less)$": "<rootDir>/tests/__mocks__/styleMock.ts",
  },
};

export default config;
