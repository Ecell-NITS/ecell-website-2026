# Backend API Documentation (src/app/api)

This file provides a concise reference for each backend endpoint, **what it accepts (HTTP method, request parameters / body)** and **what it returns (status code, JSON shape)**. All routes are located under `src/app/api/` and are server‑only Next.js API handlers.

---

## Authentication

### `POST /api/auth/login`

_Accepts_: JSON body

```json
{
  "email": "user@example.com",
  "password": "plaintext-or-hashed? (will be compared with bcrypt)"
}
```

_Returns_ (`200 OK`):

```json
{
  "token": "<jwt>",
  "user": {
    "id": "<uuid>",
    "email": "user@example.com",
    "role": "USER"
  }
}
```

_Errors_:

- `400` – missing fields
- `401` – invalid credentials

### `POST /api/auth/signup`

_Accepts_: JSON body

```json
{
  "email": "new@example.com",
  "password": "plain-text-password",
  "name": "Optional display name"
}
```

_Returns_ (`201 Created`):

```json
{
  "user": {
    "id": "<uuid>",
    "email": "new@example.com",
    "role": "USER"
  }
}
```

_Errors_:

- `400` – validation errors
- `409` – email already exists

---

## Blog Endpoints

### `GET /api/blog`

_Accepts_: No body. Optional query params: `?page=1&limit=10`.
_Returns_ (`200 OK`):

```json
[
  {
    "id": "<uuid>",
    "title": "Post title",
    "slug": "post-title",
    "excerpt": "First 200 chars…",
    "author": {"id": "<uuid>", "email": "author@example.com"},
    "createdAt": "2026-01-01T12:00:00.000Z"
  },
  ...
]
```

### `GET /api/blog/[id]`

_Accepts_: URL param `id` (UUID).
_Returns_ (`200 OK`):

```json
{
  "id": "<uuid>",
  "title": "Full post title",
  "slug": "full-post-title",
  "content": "<HTML‑sanitised string>",
  "author": { "id": "<uuid>", "email": "author@example.com" },
  "createdAt": "2026-01-01T12:00:00.000Z",
  "updatedAt": "2026-01-05T09:30:00.000Z"
}
```

_Errors_:

- `404` – not found

### `POST /api/blog` _(admin only)_

_Accepts_: JSON body

```json
{
  "title": "New post",
  "slug": "new-post",
  "content": "<raw HTML from editor>"
}
```

_Returns_ (`201 Created`):

```json
{ "id": "<uuid>", "message": "Blog created" }
```

_Auth_: Requires valid JWT with role `ADMIN`.

### `PUT /api/blog/[id]` _(admin only)_

_Accepts_: URL param `id`; JSON body with any updatable fields (`title`, `slug`, `content`).
_Returns_ (`200 OK`):

```json
{ "message": "Blog updated", "id": "<uuid>" }
```

### `DELETE /api/blog/[id]` _(admin only)_

_Accepts_: URL param `id`.
_Returns_ (`204 No Content`) – empty body on success.

---

## Gallery

### `GET /api/gallery`

_Accepts_: No body. Optional `?limit=`.
_Returns_ (`200 OK`):

```json
[
  { "id": "<uuid>", "url": "/images/photo1.jpg", "altText": "Photo 1" },
  ...
]
```

### `POST /api/gallery` _(admin only)_

_Accepts_: Multipart/form‑data with fields `file` (image) and optional `altText`.
_Returns_ (`201 Created`):

```json
{ "id": "<uuid>", "url": "/images/uploaded.jpg", "altText": "…" }
```

---

## Admin Helpers (`/api/admin/*`)

These routes are protected by the `authMiddleware` and require the `ADMIN` role.
| Route | Method | Description | Response |
|-------|--------|-------------|----------|
| `/api/admin/users` | GET | List all users | `[{id,email,role,createdAt}]` |
| `/api/admin/users/[id]` | DELETE | Delete a user | `204 No Content` |
| `/api/admin/roles` | PATCH | Change a user's role | `{message, userId, newRole}` |

---

## Common Response Envelope (when not raw arrays)

Many endpoints wrap the payload in a standard envelope:

```json
{
  "success": true,
  "data": <payload>,
  "error": null
}
```

When an error occurs the envelope looks like:

```json
{
  "success": false,
  "data": null,
  "error": { "code": 401, "message": "Unauthorized" }
}
```

---

## Tips for Claude Blueprint Generation

- Provide Claude the **full contents** of this file together with the higher‑level `info.md` for a complete architecture view.
- Mention you want a **flow diagram** that shows request → auth middleware → Prisma service → response.
- Ask Claude to render a **table** summarising the request/response schemas for each endpoint.

---

_End of backend documentation._
