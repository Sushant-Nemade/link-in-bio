# Custom Link in Bio

Next.js browser demo of a mobile link page with theme, bio, reordering, local click counts, and a demo editor. All state is stored in browser local storage; no visitor IP or user-agent data is collected.

Run `pnpm install`, `pnpm --filter link-in-bio dev`, and open `http://127.0.0.1:3008`.

The supplied prompt calls for a password-protected shared CMS and Prisma database. This preview intentionally has neither, so editing affects only the current browser. Do not use it as a multi-user production CMS. Before public production use, add server authentication, a database, rate limiting, and privacy controls for analytics.
