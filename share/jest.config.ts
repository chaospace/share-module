
const config = {
  verbose: true,
  rootDir: ".",
  roots: ["<rootDir>/src/", "<rootDir>/tests/"],
  // testEnvironment: "node",
  transformIgnorePatterns: ["/node_modules/", "/dist/", "\\.pnp\\.[^\\/]+$"],
  coveragePathIgnorePatterns: ["src/index.ts"],
  setupFilesAfterEnv: ["./tests/setup.ts"],
  testMatch: [
    "<rootDir>/src/**/*.(test|spec).(ts|tsx)",
    "<rootDir>/tests/**/*.(test|spec).(ts|tsx)",
  ],
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.+)$": "<rootDir>/src/$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/__mocks__/fileMock.ts",
    "\\.(css|less)$": "<rootDir>/tests/__mocks__/styleMock.ts",
  },
};

export default config;
