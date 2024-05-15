import path from "path";
import { workspaceDir } from "./config/webpack.path";

const config = {
    verbose: true,
    rootDir: ".",
    roots: ["<rootDir>/src/", "<rootDir>/tests/"],
    // testEnvironment: "jsdom",
    transformIgnorePatterns: ["/node_modules/", "/dist/", "\\.pnp\\.[^\\/]+$"],
    coveragePathIgnorePatterns: ["src/index.ts"],
    setupFilesAfterEnv: ["./tests/config/jest.setup.ts"],
    testMatch: [
        "<rootDir>/src/**/*.(test|spec).(ts|tsx)",
        "<rootDir>/tests/**/*.(test|spec).(ts|tsx)",
    ],
    transform: {
        "^.+\\.tsx?$": path.resolve(workspaceDir, "jestBabelTransform.ts"),
    },
    moduleNameMapper: {
        "^@/(.+)$": "<rootDir>/src/$1",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/tests/__mocks__/fileMock.ts",
        "\\.(css|less)$": "<rootDir>/tests/__mocks__/styleMock.ts",
    },
};

export default config;
