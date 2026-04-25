import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd());

/**
 * Минимальный парсер `.env` (без зависимостей). Поддержка # и KEY=value.
 * @param {string} filePath
 * @returns {Record<string, string>}
 */
function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return {};
  const out = {};
  for (const rawLine of readFileSync(filePath, "utf8").split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

const chain = [".env", ".env.local", ".env.production", ".env.production.local"];
let fileEnv = {};
for (const name of chain) {
  fileEnv = { ...fileEnv, ...loadEnvFile(resolve(root, name)) };
}

const env = {
  ...fileEnv,
  ...process.env,
  NODE_ENV: "production",
};

const port = env.PORT || "3000";
const host = env.LISTEN_HOST || "127.0.0.1";

const nextBin = resolve(root, "node_modules/next/dist/bin/next");

const child = spawn(process.execPath, [nextBin, "start", "-H", host, "-p", String(port)], {
  env,
  stdio: "inherit",
  cwd: root,
});

child.on("exit", (code) => process.exit(code === null || code === undefined ? 1 : code));
