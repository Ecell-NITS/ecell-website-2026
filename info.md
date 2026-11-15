# eCell Website 2026 – Combined Overview

## 📚 Project Purpose

The repository houses the **eCell 2026** web application built with **Next.js** (React) for the frontend and **API routes** for the backend, using **Prisma** as the ORM for a relational database (PostgreSQL/MySQL).

---

## 📁 Directory Layout (root)

```
/ecell-website-2026
│   info.md                ← *You are reading this file*
│   .env.example           ← Example environment variables
│   package.json
│   pnpm-lock.yaml
│
├── .husky/                # Git hooks (lint‑staged, pre‑commit)
├── .next/                 # Next.js build artefacts
├── node_modules/          # Dependencies (pnpm managed)
├── public/                # Static assets (images, favicons, …)
│
└── src/                   # Main source tree
    ├── app/               # Next.js **App Router** – pages & API routes
    │   ├── api/           # ⇢ Backend (REST‑like) endpoints
    │   │   ├── auth/      # Authentication (login, signup, callbacks)
    │   │   ├── blog/      # Blog CRUD
    │   │   ├── gallery/   # Image‑gallery data
    │   │   └── …
    │   ├── about/        # Public informational pages
    │   ├── admin/        # Admin dashboard UI
    │   ├── dashboard/    # Member‑only dashboard UI
    │   └── …
    │
    ├── components/       # Re‑usable React components
    │   ├── Auth/          # Login, Signup forms
    │   ├── Blog/          # BlogCard, BlogsClient, …
    │   ├── Dashboard/     # Widgets, tables
    │   ├── UI/            # Tailwind / shadcn UI primitives
    │   └── …
    │
    ├── data/             # JSON seed data (coreTeam, etc.)
    ├── hooks/            # Custom React hooks
    ├── lib/              # Utilities, Prisma client, auth helpers
    └── styles/           # Global CSS / Tailwind config
```

---

## 🔌 Backend – API Overview (`src/app/api`)

| Route              | Method           | Description                                   | Uses                           |
| ------------------ | ---------------- | --------------------------------------------- | ------------------------------ |
| `/api/auth/login`  | POST             | Authenticate user, issue JWT / session cookie | `lib/auth.ts`, Prisma `User`   |
| `/api/auth/signup` | POST             | Register a new user                           | Prisma `User`                  |
| `/api/blog`        | GET              | List public blog posts                        | Prisma `Blog`                  |
| `/api/blog/[id]`   | GET, PUT, DELETE | Retrieve / update / delete a post (admin)     | Prisma `Blog`, auth guard      |
| `/api/gallery`     | GET              | Fetch gallery image metadata                  | Prisma `GalleryImage`          |
| `/api/admin/*`     | Various          | Admin‑only actions (user mgmt, moderation)    | Auth middleware, Prisma models |

> All API routes run server‑side, return JSON, and are protected by JWT/session validation where required.

---

## 🗄️ Database – Prisma Schema (summary)

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  blogs     Blog[]
}

enum Role { USER ADMIN }

model Blog {
  id        String   @id @default(uuid())
  title     String
  slug      String   @unique
  content   String   @db.LongText
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model GalleryImage {
  id         String   @id @default(uuid())
  url        String
  altText    String?
  uploadedAt DateTime @default(now())
}
```

The schema lives in `prisma/schema.prisma`. After any change run `npx prisma generate`.

---

## 🎯 Security Highlights

### XSS Mitigation

- Server‑side sanitisation of all user‑generated HTML using `sanitize‑html` before persistence.
- In React, `dangerouslySetInnerHTML` is only used on already‑sanitised content.
- Content‑Security‑Policy header set in `next.config.js` to restrict script sources.

### Authentication & Authorization

- Passwords hashed with **bcrypt** (cost 12).
- JWTs signed with a strong secret (`process.env.JWT_SECRET`).
- API routes enforce role‑based access (`ADMIN` for admin endpoints) via `authMiddleware`.

---

## 🛠️ Development Workflow

1. **Install dependencies**
   ```bash
   pnpm install
   ```
2. **Create environment file** – copy `.env.example` → `.env` and fill DB URL, JWT secret, etc.
3. **Run Prisma migrations**
   ```bash
   npx prisma migrate dev --name init
   ```
4. **Start dev server**
   ```bash
   pnpm dev   # runs `next dev`
   ```
5. **Lint & format** (pre‑commit via Husky)
   ```bash
   pnpm lint
   pnpm format
   ```

---

## 📄 Generating a Blueprint PDF with Claude

1. Copy the entire contents of this `info.md`.
2. Prompt Claude (e.g., Claude‑3) with:
   > "Create a PDF blueprint of the eCell website project. Include a diagram of the directory layout, a flowchart of API request handling, and a summary of the Prisma schema. Use the following markdown as source: <paste‑here>."
3. Claude will return a downloadable PDF you can share with stakeholders.

---

## ✅ Quick Start Checklist for New Contributors

- [ ] Clone repo & run `pnpm install`.
- [ ] Create `.env` from the example.
- [ ] Run `npx prisma migrate dev` to sync DB.
- [ ] Start dev server (`pnpm dev`).
- [ ] Verify API routes via `http://localhost:3000/api/...`.
- [ ] Run tests (`pnpm test`) – includes XSS sanitisation checks.

---

_Happy coding!_
