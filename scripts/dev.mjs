import { spawn } from "node:child_process";
import net from "node:net";

const START_PORT = Number.parseInt(process.env.PORT ?? "3000", 10);
const MAX_PORT = START_PORT + 50;

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once("error", () => {
      resolve(false);
    });

    server.once("listening", () => {
      server.close(() => {
        resolve(true);
      });
    });

    server.listen(port);
  });
}

async function findAvailablePort() {
  for (let port = START_PORT; port <= MAX_PORT; port += 1) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }

  throw new Error(`No available port found from ${START_PORT} to ${MAX_PORT}.`);
}

const port = await findAvailablePort();
const distDir = port === 3000 ? ".next" : `.next-${port}`;
const args = ["next", "dev", "--webpack", "-p", String(port), ...process.argv.slice(2)];

console.log(`Starting Next.js on http://localhost:${port}`);
console.log(`Using dev output directory: ${distDir}`);

const child = spawn("npx", args, {
  env: {
    ...process.env,
    NEXT_DIST_DIR: distDir,
    PORT: String(port)
  },
  stdio: "inherit",
  shell: process.platform === "win32"
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
