import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

var root = join(dirname(fileURLToPath(import.meta.url)), "..");
var cloneDir = join(root, ".tmp-bysquare");
var vendorDir = join(root, "js", "vendor", "bysquare");
var tsDir = join(cloneDir, "typescript");

function run(cmd, args, cwd) {
  var result = spawnSync(cmd, args, { cwd, stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

if (!existsSync(cloneDir)) {
  console.log("Cloning https://github.com/xseman/bysquare …");
  run("git", ["clone", "--depth", "1", "https://github.com/xseman/bysquare.git", cloneDir], root);
}

console.log("Building bysquare TypeScript from GitHub source …");
run("npm", ["install"], tsDir);
run("npm", ["run", "build"], tsDir);

if (existsSync(vendorDir)) {
  rmSync(vendorDir, { recursive: true, force: true });
}
mkdirSync(vendorDir, { recursive: true });

cpSync(join(tsDir, "lib"), join(vendorDir, "lib"), { recursive: true });
cpSync(join(cloneDir, "LICENSE"), join(vendorDir, "LICENSE"));
cpSync(join(tsDir, "package.json"), join(vendorDir, "package.json"));

console.log("bysquare vendor OK → js/vendor/bysquare/ (from github.com/xseman/bysquare)");
