#!/usr/bin/env node

const { program } = require("commander");
const { spawn } = require("child_process");

program
  .name("landropr")
  .description("LanDropr - Local Network File Sharing")
  .version(
    require("../package.json").version,
    "-v, --version",
    "output the current version"
  )
  .option("-p, --port <number>", "port to run the server on", "12000")
  .option("-h, --host <host>", "host to bind the server to", "0.0.0.0")
  .option("--no-browser", "do not open browser automatically")
  .parse(process.argv);

const options = program.opts();

console.log(`🚀 Starting LanDropr on port ${options.port}...`);

const server = spawn(
  "node",
  ["--no-warnings", "--import", "tsx", "server.ts"],
  {
    cwd: __dirname + "/..",
    stdio: "inherit",
    env: {
      ...process.env,
      PORT: options.port,
      HOST: options.host,
      NODE_ENV: "production",
    },
  }
);

server.on("close", (code) => {
  process.exit(code);
});
process.on("SIGINT", () => {
  console.log("\nShutting down LanDropr...");
  server.kill("SIGINT");
});
