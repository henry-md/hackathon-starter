# Next.js + SQLite

A standard Next.js App Router starter with TypeScript, Tailwind CSS, ESLint, and SQLite through `better-sqlite3`.

## Getting started

Use Node.js 22 or newer.

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Edit `src/app/page.tsx` to get started.

## SQLite

Import `getDb` from `@/lib/db` in server code to access the database. The first call creates `data/app.db` automatically. The connection is reused during development reloads, and the database directory is ignored by Git.

Open [http://localhost:3000/api/health](http://localhost:3000/api/health) to check the connection. It returns `{ "status": "ok", "database": "sqlite" }` after running a database query.

The database starts empty. Add tables and queries as needed. To reset it, stop the app and delete the `data` directory. It will be recreated on the next database request.

## Checks

```sh
npm run lint
npm run build
```

Run `npm start` after building to serve the production build locally.
