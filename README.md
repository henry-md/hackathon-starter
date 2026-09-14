# CD&R Hackathon Starter

A Next.js App Router starter with TypeScript, Tailwind CSS, ESLint, Drizzle ORM with SQLite through `better-sqlite3`, and a shared visual style based on CD&R's public website.

Each participant builds their own application from this repository. Start with the workspace and prompt the features your demo needs.

## Getting started

Install the current [Node.js 24 LTS](https://nodejs.org/en/download), which includes npm. Existing installations need Node.js 22.9 or newer and npm 11.19 or newer. Restart your terminal after installing Node.

Download and extract this repository (or clone it), then open the project folder in your editor. Open a terminal in the folder containing `package.json` and run these commands one at a time:

```sh
npm install
npm run dev
```

Keep the terminal running. Once the server is ready, open the **Local** address printed in the terminal, usually [http://localhost:3000](http://localhost:3000).

On Windows, if PowerShell blocks `npm.ps1`, use `npm.cmd install` and `npm.cmd run dev`. No execution-policy change is needed.

## Setup compatibility

The same commands work on Windows and macOS, including project folders with spaces, parentheses, or `&` in their names. The npm scripts invoke the tools through Node directly to avoid Windows command-wrapper path parsing.

SQLite uses the native binaries included with the pinned `better-sqlite3` package. Its unnecessary install-time rebuild is disabled through npm's `allowScripts` setting; the required esbuild and unrs-resolver install scripts remain enabled. npm 11.19 or newer is required for that setting. See the [upstream Windows installer issue](https://github.com/WiseLibs/better-sqlite3/issues/1516).

CI checks clean installation, tests, lint, build, and development/production server startup on Windows and both Apple Silicon and Intel Macs, using Node.js 22 and 24. The startup checks include the page and SQLite health endpoint. To run the same checks locally:

```sh
npm ci
npm test
npm run lint
npm run build
npm run test:startup
```
