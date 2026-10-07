This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Signal Email Alerts

Add SMTP settings to `.env.local` and to the production hosting environment:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
SMTP_FROM=Trading Academy <alerts@example.com>
SMTP_SECURE=false
```

Use the SMTP credentials and verified sender address from your email provider. Set `SMTP_SECURE=true` when the provider requires implicit TLS (commonly port 465); port 587 normally uses `false` with STARTTLS. `NEXTAUTH_URL` should be set to the public site URL so email links open the live signal page.

New student accounts must have a valid email address. For existing accounts, add an address in Admin > Users > Edit. If a user's username is already an email address, it is used as a fallback. Signal creation still succeeds if the email provider is unavailable; delivery errors are logged by the server.

## THC Bot Email Alerts

The bot posts authenticated alerts to `POST /api/thc-alerts`. Configure
`THC_BOT_API_TOKEN` in the academy's server environment and configure that same
secret in the bot environment. The bot also needs `THC_ACADEMY_ALERTS_URL`
pointing to the academy endpoint, ending in `/api/thc-alerts`. Keep the token
private and use the academy's existing `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
`SMTP_PASS`, `SMTP_FROM`, and `SMTP_SECURE` settings for mail delivery.

The endpoint accepts `eventId`, `alertType`, `symbol`, `timeframe`,
`direction`, `entry`, `sl`, and `tp`. Alert types are `NEW_THC` and
`FAILED_THC_REVERSED`; timeframes are M30, H1, H4, or D1. It uses the existing
recipient selection: each account's email address, falling back to its username
when that is an email address, with duplicate addresses removed.

Delivery status is stored per event and recipient. Retries skip recipients whose
message was already accepted by SMTP and retry failed or unfinished recipients.
The endpoint reports completion only when SMTP has accepted a message for every
intended recipient; SMTP acceptance does not confirm inbox delivery. A process
crash after SMTP acceptance but before the delivery status is saved can cause
that recipient to receive a duplicate on retry.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
