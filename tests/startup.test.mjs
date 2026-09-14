import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import { setTimeout as delay } from "node:timers/promises";
import test from "node:test";

async function availablePort() {
  const listener = createServer();
  listener.listen(0, "127.0.0.1");
  await once(listener, "listening");
  const { port } = listener.address();
  await new Promise((resolve, reject) => listener.close(error => error ? reject(error) : resolve()));
  return port;
}

// Run sequentially: both modes use this checkout's database and build directory.
test("development and production startup work through npm", { timeout: 180_000 }, async t => {
  assert.ok(process.env.npm_execpath, "Run with npm run test:startup");

  for (const script of ["dev", "start"]) {
    await t.test(script, { timeout: 85_000 }, async () => {
      const port = await availablePort();
      const url = `http://127.0.0.1:${port}`;
      const child = spawn(process.execPath, [
        process.env.npm_execpath, "run", script, "--",
        "--hostname", "127.0.0.1", "--port", String(port),
      ], { detached: process.platform !== "win32", windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
      let output = "";
      let spawnError;
      child.on("error", error => { spawnError = error; });
      child.stdout.on("data", data => { output += data; });
      child.stderr.on("data", data => { output += data; });

      try {
        let response;
        const deadline = Date.now() + 65_000;
        while (Date.now() < deadline) {
          if (spawnError) throw spawnError;
          assert.equal(child.exitCode, null, `Server exited before becoming ready:\n${output}`);
          try {
            response = await fetch(`${url}/api/health`, { signal: AbortSignal.timeout(5_000) });
          } catch {
            await delay(250);
            continue;
          }
          break;
        }
        assert.ok(response, `Server did not become ready:\n${output}`);
        assert.equal(response.status, 200, output);
        assert.deepEqual(await response.json(), { status: "ok", database: "sqlite" });
        const page = await fetch(url, { signal: AbortSignal.timeout(15_000) });
        assert.equal(page.status, 200);
        assert.match(await page.text(), /Your hackathon workspace/);
      } finally {
        if (child.pid) {
          if (process.platform === "win32") {
            spawnSync("taskkill.exe", ["/PID", String(child.pid), "/T", "/F"], { windowsHide: true });
          } else {
            try { process.kill(-child.pid, "SIGTERM"); } catch (error) {
              if (error.code !== "ESRCH") throw error;
            }
          }
          if (child.exitCode === null && child.signalCode === null) {
            await once(child, "exit");
          }
        }
      }
    });
  }
});
