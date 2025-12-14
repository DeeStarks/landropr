#!/usr/bin/env node

const { program } = require("commander");
const { spawn, spawnSync } = require("child_process");

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
  .option(
    "--build",
    "force build the Next.js app (use after updates or first run)"
  )
  .option("--verbose", "show build output", false)
  .parse(process.argv);

const options = program.opts();

console.log(`Starting LanDropr on port ${options.port}...`);

function runCommand(command, args, options = {}) {
  const { cwd = process.cwd(), silent = !options.verbose } = options;

  if (!silent) {
    console.log(`> ${command} ${args.join(" ")}`);
  }

  const stdio = silent ? "ignore" : "inherit";
  const result = spawnSync(command, args, { stdio, cwd, ...options });
  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
  return result;
}

// Check if build is needed
const needsBuild =
  options.build === true ||
  !require("fs").existsSync(__dirname + "/../.next/BUILD_ID");

if (needsBuild) {
  runCommand("npm", ["run", "build"], {
    cwd: __dirname + "/..",
    verbose: options.verbose,
  });
}

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
