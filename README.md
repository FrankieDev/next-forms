## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Migrations

To generate the database, we use:

[https://orm.drizzle.team/docs/get-started-postgresql](https://)

Drizzle Folder structure:

```bash
next-forms/
├── drizzle/
│   ├── schema.ts
│   ├── migrations/
│   │   ├── 20230101_initial_migration.ts
│   │   └── 20230201_add_new_table.ts
│   └── db.ts
├── app/
│   └── api/
│       └── forms/
│           └── route.ts
├── .env.production
└── drizzle.config.ts
```

To generate a new migration, use:

```bash
npx drizzle-kit generate
```

or

```bash
pnpm run generate
```

To run migrations, use:

```bash
npx drizzle-kit migrate
```

or

```bash
pnpm run migrate
```
