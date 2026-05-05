# Cookie Store

A cookie ordering app built for my sibling's local home bakery business, and as a way to learn Next.js, React, and Stripe end-to-end.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Stripe Embedded Checkout
- Zustand (cart state)

## Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

## Getting Started

1. Clone the repo
```bash
   git clone https://github.com/sidneyvu1/cookie-store.git
   cd cookie-store
```

2. Install dependencies
```bash
   pnpm install
```

3. Create a `.env.local` file in the root:
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

4. Run the dev server
```bash
   pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Features

- Cookie catalog with cart management
- Persistent cart via localStorage
- Stripe Embedded Checkout
- Order confirmation with email receipt via Stripe

## Planned

- AWS S3 for image storage
- AWS SES for branded order emails
- DynamoDB for order history
- Admin dashboard
- Cookie preview/detail page
- Blog feature