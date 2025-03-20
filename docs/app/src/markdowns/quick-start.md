# Quick Start

This guide will help you to get started with the **Next.js** app development. We will create a simple app that will display a welcome message on the screen.

## Prerequisites

- Node.js
- npm, yarn, or pnpm

## Create a New Next.js App

To create a new Next.js app, run the following command:

```bash
npx create-next-app my-app --yes
```

Replace `my-app` with your app name.

## Run the App

Navigate to the app directory and run the following command:

```bash
cd my-app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

> **TIP:** Use CTRL + C to stop the server.

## Create a New CRUD using poly-scaffold

Install the `poly-scaffold` package globally using the following command:

```bash
npm install -g poly-scaffold
```

Create a new CRUD using the following command:

```bash
pscaffold post title:string description:text -t ./
```

Set your API URL in the `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=https://poly-scaffold.free.beeceptor.com
```

Install the dependencies and run the app:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

If you check code in the `app/page.ts` file, you will see the following code:

```tsx
useEffect(() => {
  push("/posts");
}, []);
```

This code will redirect the user to the `/posts` page when the app loads.
