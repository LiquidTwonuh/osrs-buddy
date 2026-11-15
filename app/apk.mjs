// Builds the Android APK without Windows Developer Mode (the same workaround as Momentum's).
// `tauri android build` compiles the Rust library with the page baked in, then fails trying to
// symlink it into jniLibs. That failure is expected here: this script copies the library into
// place and lets Gradle package the APK.
//
//   node apk.mjs          the stable page (OSRS-Buddy.html), the normal phone release
//   node apk.mjs --dev    the dev page (OSRS-Buddy-dev.html), to judge the Beta on a phone
//
// Output: src-tauri/gen/android/app/build/outputs/apk/arm64/debug/app-arm64-debug.apk
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dev = process.argv.includes("--dev");
const run = (cmd, args, cwd) => spawnSync(cmd, args, { cwd, stdio: "inherit", shell: true }).status;
const so = "src-tauri/target/aarch64-linux-android/debug/libapp_lib.so";
const before = fs.existsSync(so) ? fs.statSync(so).mtimeMs : 0;

// the page goes into dist before cargo bakes it into the library
const args = ["tauri", "android", "build", "--debug", "--apk", "--target", "aarch64"];
if (dev) {
  const cfg = path.join(os.tmpdir(), "mortimeter-apk-dev.json");
  fs.writeFileSync(cfg, JSON.stringify({ build: { beforeBuildCommand: "npm run sync:dev" } }));
  args.push("--config", cfg);
}
run("npx", args);
if (!fs.existsSync(so) || fs.statSync(so).mtimeMs === before) {
  console.error("\nThe Rust library was not rebuilt. Fix the error above first.");
  process.exit(1);
}
const jni = "src-tauri/gen/android/app/src/main/jniLibs/arm64-v8a";
fs.mkdirSync(jni, { recursive: true });
fs.rmSync(jni + "/libapp_lib.so", { force: true });
fs.copyFileSync(so, jni + "/libapp_lib.so");
const androidDir = path.resolve("src-tauri/gen/android");
const code = run(`"${path.join(androidDir, "gradlew.bat")}"`, ["assembleArm64Debug", "-x", "rustBuildArm64Debug"], androidDir);
if (code === 0) console.log(`\nAPK (${dev ? "dev page" : "stable page"}): src-tauri/gen/android/app/build/outputs/apk/arm64/debug/app-arm64-debug.apk`);
process.exit(code ?? 1);
