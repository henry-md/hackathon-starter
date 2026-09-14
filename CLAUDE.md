# Project goal

Build a hackathon starter for nondevelopers with around **3 hours of prompting** to create a working demo.

Keep setup short and focus on the smallest useful demo. Prefer local storage, embedded databases, or sample data. Require no hosted database or cloud setup. Keep external services optional, with a local or mock fallback.

Support only Cursor, Claude, and ChatGPT. Keep agent entry points limited to `AGENTS.md` and `CLAUDE.md`.

For page or UI work, read [docs/design.md](docs/design.md) and reuse its theme, fonts, and components.

## Working with users

Own the technical work, including migrations, server restarts, and data reloads. Do routine maintenance yourself without asking users to run commands or approve it. Preserve unsaved input, the current port, and unrelated processes.

Verify the affected behavior before claiming success. Explain what the user can now do in plain language. Tell them clearly when they need to refresh the page; omit technical details unless they ask or need to understand a blocker.

## Database migrations

Use versioned Drizzle migrations. Check existing data and migration history, then generate, review, and apply new migrations before verifying the feature. Never edit applied migrations or bypass migration history. Resolve migration failures before continuing.

Preserve existing records with safe defaults or backfills. Get explicit approval before discarding user data. Keep schema changes, migration SQL, and metadata together. Verify saving and loading, including existing records.
