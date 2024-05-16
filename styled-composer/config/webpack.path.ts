// 웹팩 공통설정..
import path from "path";
import fs from "fs";

const appDir = fs.realpathSync(process.cwd());
const workspaceDir = path.resolve(appDir, "../");
const srcDir = path.resolve(appDir, "src");
const publicDir = path.resolve(appDir, "public");
const outDir = path.resolve(appDir, "dist");

export { appDir, srcDir, publicDir, outDir, workspaceDir };
