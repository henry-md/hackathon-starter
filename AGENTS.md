# Project goal

This project will help non-technical people create an app demo that should work locally. They have domain expertise (ex. finance), but likely little/no software engineering experience.
Participants have around **3 hours for prompting** to build a working demo, so tools & plan should be chosen to create a working MVP within that time.

# Guidelines

Do not require hosted databases, cloud provisioning, or complex infrastructure in your design.
Keep external services optional, likely with a local or mock fallback for the core demo.

For any page or UI work, read [docs/design.md](docs/design.md) and reuse the shared theme, fonts, and components it describes.

For file-based features, read [docs/tabular-data.md](docs/tabular-data.md) and reuse its optional helpers when appropriate. Inspect supplied sheets before choosing headers or a schema; keep business validation and calculations specific to the requested app. Do not connect these helpers to the starter demo unless the user requests that functionality.

Own the technical work, including migrations, server restarts, and data reloads. Do routine maintenance yourself without asking users to run commands or approve it. Preserve unsaved input, the current port, and unrelated processes.

Verify the affected behavior before claiming success. Explain what the user can now do in plain language. Tell them clearly when they need to refresh the page; omit technical details unless they ask or need to understand a blocker.

# Database specific best practices

Use versioned Drizzle migrations. Check existing data and migration history, then generate, review, and apply new migrations before verifying the feature. Never edit applied migrations or bypass migration history. Resolve migration failures before continuing.

Generate migration files with `npm run db:generate` and apply them with `npm run db:migrate` to keep the database and migration history in sync. Avoid creating migration files manually unless absolutely necessary.
