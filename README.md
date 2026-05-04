# Cookie Store

A small business cookie ordering app built to learn Next.js, React, and Stripe.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Stripe Elements

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Clone the repo
2. Install dependencies
```bash
   pnpm install
   # or if you don't have pnpm
   npm install
```
3. Create a `.env.local` file in the root and add your Stripe keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key_here
STRIPE_SECRET_KEY=your_key_here
4. Run the dev server
```bash
   pnpm dev
```
5. Open [http://localhost:3000](http://localhost:3000)

## Features

- Cookie catalog
### To be Implemented
- Cart management
- Stripe Elements embedded checkout