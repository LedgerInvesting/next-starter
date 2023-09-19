# Next.js starter

### 🔗 View demo: [starter.ldgr.app](https://starter.ldgr.app/)

This project uses **Next.js 13** app directory structure with **TypeScript**. The data layer uses **Drizzle ORM** to interface with **PostgreSQL/MySQL**. Emails are sent via **Resend** and written using **react-email**. UI components utilize **Radix UI** and **Tailwind CSS**.

## Stack

*   **Framework**: [Next.js](https://nextjs.org/docs) 13 (App Directory)
*   **Database**: PostgreSQL/MySQL, [Drizzle ORM](https://orm.drizzle.team/docs/overview)
*   **Email**: [Resend](https://resend.com/) + [react-email](https://react.email/)
*   **UI**: [Radix UI]() + [Shadcn UI](https://ui.shadcn.com/)
    * [Lucide Icons](https://lucide.dev/)
    * [Heroicons](https://heroicons.com/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Deployment**: [Vercel](https://vercel.com/)

## Features

*   Serverless API routes and functions
*   Type safety with TypeScript
*   Declarative db schema with Drizzle ORM
*   PostgreSQL and MySQL support
*   Email sending with Resend
*   Email templates written in React with react-email
    *   Open `localhost:3000/emails` to preview email templates and send test emails
*   Radix UI components
*   Tailwind CSS styling
*   Optimized with bun builds

## Getting Started

1.  Clone the repo
2.  Install dependencies with `bun install`
3.  Configure environment variables
4.  Run dev server with `bun run dev`
5.  Create components in `app` directory
6.  Define API routes in `app/api`
7.  Write email templates in `emails` directory
8.  Build database schema in `db` folder

## Structure

*   `app`: Next.js pages, layouts, API routes
*   `components`: React components
*   `emails`: Email templates
*   `db`: Database schema and config
*   `styles`: Global styles
*   `utils`: Shared utility functions

## Database client

Run `bun run db:studio` and open `http://0.0.0.0:4983/` to view the database in the browser.

## Deployment

The app can be easily deployed on Vercel or any Node.js platform.

Let me know if you would like me to modify or expand this README further.

### Apply migrations to database

```bash
# Drizzle Kit
# Vercel Postgres requires SSL "?sslmode=require"
export DATABASE_URL="postgres://<user>:<password>@<host>/<dbname>?sslmode=require" && npx drizzle-kit push:pg --config=drizzle.config.ts
```

## Inspiration

* [Shadcn Taxonomy](https://github.com/shadcn-ui/taxonomy)
* [Create T3 App](https://github.com/t3-oss/create-t3-app)
* [Tailwind UI](https://tailwindui.com/)
* [Vercel Platform Starter](https://github.com/vercel/platforms)
