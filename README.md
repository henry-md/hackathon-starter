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

## Checks

CI checks installation, tests, lint, build, and server startup. The startup checks cover the page and SQLite health endpoint. To run the checks locally:

```sh
npm ci
npm test
npm run lint
npm run build
npm run test:startup
```
