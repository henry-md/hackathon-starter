# CD&R Hackathon Starter

A Next.js App Router starter with TypeScript, Tailwind CSS, ESLint, Drizzle ORM with SQLite through `better-sqlite3`, and a shared visual style based on CD&R's public website.

Each participant builds their own application from this repository. Start with the workspace and prompt the features your demo needs.

## Getting started

Use Node.js 22 or newer.

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Edit `src/app/page.tsx` to get started.

## Design

Read [the visual guide](docs/design.md) before creating or changing a page. It documents the source references, palette, typography, and shared components. Fonts are bundled locally, and the theme lives in `src/app/globals.css`.

The homepage starts with “Your hackathon workspace” and two actions: **Import CSV** and **Export CSV**. Select a file to enable export, then download an exact copy: `example.csv` becomes `example-copy.csv`.

Try this prompt in Cursor, Claude, or ChatGPT:

> Build a [demo purpose] page using docs/design.md. Reuse AppHeader and the shared UI components. Keep the CD&R typography and palette, use sample data, and make [main action] work locally.

## CSV data

Import accepts files ending in `.csv` (case-insensitive), without reading, validating, or processing their contents. There are no size, encoding, header, or row requirements. Export downloads the original bytes without reformatting, adding `-copy` before the filename extension.

The [page](src/app/page.tsx) keeps the original file in `csv`, typed as `File | null`. Everything stays in the browser, and refreshing clears the selection.

## SQLite

Import `getDb` from `@/lib/db` in server code to access the typed Drizzle database. SQLite stores data in `data/app.db`; the connection is reused during development reloads. The database directory is ignored by Git.

`npm run dev` and `npm start` automatically create the database if needed and apply pending migrations before starting Next.js. They do not generate migrations or reset existing data.

Open [http://localhost:3000/api/health](http://localhost:3000/api/health) to check the connection. It returns `{ "status": "ok", "database": "sqlite" }` after running a database query.

Define application tables in `src/db/schema.ts`. The starter has no application tables or seed data. After changing the schema:

```sh
npm run db:generate -- --name=describe_change
# Review the generated SQL, then apply it.
npm run db:migrate
```

Keep generated SQL and metadata in `drizzle/` under version control with the schema. Add new migrations instead of editing ones already applied. Use this workflow for schema changes, preserving existing records rather than resetting the database or using `drizzle-kit push`.

## Checks

```sh
npm run lint
npm run build
```

Run `npm start` after building to serve the production build locally.
