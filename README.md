# You Clone

An attempt to create youtube clone.

### Prerequisite

- bun
- PostgresDB
- Clerk Account
- UpStash Account

### Run

Copy `sample.env` to `.env.local` and modify the content based on your settings.

```
# install dependencies
bun install

# migrate the db
bun run drizzle:push

# run video category seeded data (Optional)
bun src/scripts/seed-categories.ts

# run in dev
bun run dev

```