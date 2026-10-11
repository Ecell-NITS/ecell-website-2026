# Blog Feature Work Notes

This document records the blog work and current data flow for the sample blog
experience. It is separate from the official project `README.md`.

## What I worked on

- Used sample blog records in `src/data/blogs2.json` to populate the blog
  listing and the blog detail pages.
- Connected the “Read More” link on a sample blog card to the matching detail
  route under `/blog/<slug>`.
- Updated the detail page to resolve a blog by either its ID or its title slug
  on the server and pass the resolved record to the client component. Unknown
  slugs use Next.js `notFound()` rather than rendering an empty detail page.
- Fixed the detail page's social-share URL handling so the URL is supplied
  deterministically instead of reading `window.location` during render.
- Removed a custom immutable-cache header for `/_next/static/*` from
  `next.config.js`; Next.js now controls caching for its JavaScript bundles.

## Blog data flow

The `/blogs` listing combines local sample content with published posts from
the blog API. Blog details resolve local sample posts first and then look up
published API posts.

1. Add or edit a sample record in `src/data/blogs2.json`, or publish a post
   through the blog backend.
2. `src/app/blogs/page.tsx` renders the listing page and
   `src/components/Blogs/BlogsClient.tsx`.
3. `BlogsClient` combines sample records with posts from `/api/blog`, then
   filters by title, description, and tags, sorts them, and renders one
   `src/components/Blogs/BlogCard.tsx` per record.
4. Each record should provide the fields used by the UI:
   `id`, `title`, `description`, `fullContent`, `author`, `role`, `readTime`,
   `likes`, `tags`, `image`, `avatar`, and `date`. Dates are written as
   `day-month-year`, for example `16-9-2026`.
5. `src/lib/blogs.ts` maps backend blog fields to the shared card and detail
   shape; `src/lib/utils.ts` exports `blogSlug(title)` for URL-safe title
   segments. Cards link to `/blog/<slug>`.
6. `src/app/blog/[id]/page.tsx` resolves sample and API posts by slug or ID,
   creates page metadata, and passes the record to
   `src/components/Blogs/BlogDetailClient.tsx`.

Example: a title such as `NIT Silchar’s Semiconductor Chip: Innovation from
the Northeast` is converted to a slug like
`nit-silchar-s-semiconductor-chip-innovation-from-the-northeast`.

## Likes

The like count has two sources at different points in the interaction:

- **Initial page/card display:** `likes` is read from the JSON record. The
  listing also sorts by this local value for “Most Liked” and uses it in its
  “Trending” calculation.
- **After a successful Like click:** `BlogCard.tsx` and
  `src/components/Blogs/BlogEngagement.tsx` send
  `POST /api/blog/toggleLike/<blogId>` through `src/lib/api.ts`. The UI updates
  its local liked state and count from the backend response's `liked` and
  `likesCount` fields.

The frontend does not fetch the current total likes or the current user's
liked state when loading these sample blog pages. After a reload, the initial
count and liked state therefore return to the JSON-provided values. The
frontend request alone does not prove how the backend stores or persists
likes; that needs to be verified in the backend code. Like toggling requires
the backend to be available.

## Login state

`src/context/AuthContext.tsx` provides the current user to client components.
At startup it requests `/auth/me`; a successful response sets `user`, and a
failed request sets it to `null`. The blog list and detail components use
`!!user` as their client-side signed-in check.

The Axios API client in `src/lib/api.ts` attaches an access token when one is
available and sends credentials. This frontend check controls the UI, but the
backend must still authenticate and authorize protected requests.

- Clicking Like while signed out shows a login prompt and does not send the
  like request.
- The comment form is disabled when no user is present.

## Comments

Comments are backend-powered rather than stored in `blogs2.json`.

- `src/components/Blogs/BlogComments.tsx` loads comments with
  `GET /api/comment/apiComment/<blogId>`.
- For a signed-in user, the form submits to
  `POST /api/comment/apicomment/<blogId>` with the comment text and user
  author details.
- If a visitor submits while signed out, the component redirects them to
  `/login`.
- On a successful post, the returned comment is added to the visible list.
- If fetching comments fails, the current UI falls back to the empty-comments
  state; if submitting fails, it displays an error toast.

Both comment routes and the like route use the API base URL configured by
`NEXT_PUBLIC_API_URL` (default `http://localhost:4000` in the frontend API
client). The backend must be running and configured for these interactions to
work.

## Related files

| File                                        | Responsibility                                                           |
| ------------------------------------------- | ------------------------------------------------------------------------ |
| `src/data/blogs2.json`                      | Sample blog records used by listing and detail pages                     |
| `src/app/blogs/page.tsx`                    | `/blogs` page shell                                                      |
| `src/components/Blogs/BlogsClient.tsx`      | Fetches, combines, searches, filters, and sorts sample and API records   |
| `src/components/Blogs/BlogCard.tsx`         | Blog card, initial likes, like request, and Read More link               |
| `src/app/blog/[id]/page.tsx`                | Resolves sample/API blog by slug/ID and generates metadata               |
| `src/components/Blogs/BlogDetailClient.tsx` | Renders article detail and engagement/comment components                 |
| `src/lib/blogs.ts`                          | Backend blog shape and normalization                                     |
| `src/components/Blogs/BlogEngagement.tsx`   | Like toggle and social sharing UI                                        |
| `src/components/Blogs/BlogComments.tsx`     | Loads and posts comments; applies signed-in UI checks                    |
| `src/context/AuthContext.tsx`               | Loads and provides current user state                                    |
| `src/lib/api.ts`                            | Axios client, API base URL, credentials, and access-token handling       |
| `src/lib/utils.ts`                          | `blogSlug` helper                                                        |
| `next.config.js`                            | Next.js configuration; no longer overrides caching for `/_next/static/*` |
