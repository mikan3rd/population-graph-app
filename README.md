# Population Graph App

![lint Status](https://github.com/mikan3rd/population-graph-app/actions/workflows/lint.yaml/badge.svg?branch=main)
![build Status](https://github.com/mikan3rd/population-graph-app/actions/workflows/build.yaml/badge.svg?branch=main)

## Demo

https://population-graph-app-3ay7xzjlrq-an.a.run.app

Since the minimum number of instances is set to 0, the server will take a few seconds to start up if it has not been accessed for a while.

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [TanStack Query](https://tanstack.com/query/)
- [Zod](https://zod.dev/)
- [Linaria](https://linaria.dev/)
- [Playwright](https://playwright.dev/)

## Getting Started

1. Node.js and yarn must be installed if not already present.
   Node.js must match the version specified in the engines in package.json.
   You can use [nodebrew](https://github.com/hokaccha/nodebrew) to switch Node.js versions.

2. Create `.env.local` file referring to `.env.local.example`

3. Run the development server:

```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Directory Structure

```
.
├── src
│   ├── pages
│   │   ├── _app.tsx  # <-- add `withTRPC()`-HOC here
│   │   ├── api
│   │   │   └── trpc
│   │   │       └── [trpc].ts  # <-- tRPC HTTP handler
│   │   └── [..]
│   ├── server
│   │   ├── routers
│   │   │   ├── _app.ts  # <-- main app router
│   │   │   ├── post.ts  # <-- sub routers
│   │   │   └── [..]
│   │   ├── context.ts   # <-- create app context
│   │   └── trpc.ts      # <-- procedure helpers
│   └── utils
│       └── trpc.ts  # <-- your typesafe tRPC hooks
└── [..]
```
