# CD&R Hackathon Starter

A starting point for building a local app demo with Codex. It includes an Excel upload/export flow, optional local data storage, and shared CD&R styling.

Each participant builds their own application from this repository. Start with the workspace and prompt the features your demo needs.

## Start here with Codex

1. Install the latest [Node.js 24 LTS](https://nodejs.org/en/download). This project uses Node 24 and npm 11.19 or newer. Restart Codex and any open terminals after installation.
2. Open [Codex](https://developers.openai.com/codex/app/) and sign in. Complete this setup before the workshop.
3. Extract the ZIP, then open the extracted `hackathon-starter` folder as a project in Codex. Choose the folder containing `package.json`.
4. Paste this first prompt into a new Codex task:

> Read AGENTS.md and set up this project for me. Check Node.js 24, npm 11.19 or newer, and Git, and help install any missing tools. Install the project dependencies. If this folder has no Git repository, initialize one and create a local checkpoint of the starter source, respecting .gitignore. Start or reuse the local development server. Verify the page in a browser and check that /api/health reports a working database. Handle the setup commands yourself, and show me the working local link when ready.

Once the starter is running, describe the demo you want. For example:

> I work in [team] and want to make [task] easier. My input is [sample file or data]. The app should [business rules] and produce [expected output]. Read the sample files before choosing a data structure. Build the smallest useful version, keep it local, and verify the main workflow in the browser.

The starter's Business logic step is a placeholder. Export initially downloads an unchanged copy of the uploaded workbook. Describe the calculations or changes you want Codex to add.

## Optional: start manually

Open a terminal in the folder containing `package.json`. On macOS, run these commands one at a time:

```sh
npm install
npm run dev
```

In Windows PowerShell, use:

```powershell
npm.cmd install
npm.cmd run dev
```

Keep the terminal running. Once the server is ready, open the **Local** address printed in the terminal, usually [http://localhost:3000](http://localhost:3000).
