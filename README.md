# Buzzsky

Get the most talked about links from your Bluesky feed.

## Developing

1. Install dependencies with `pnpm install` (or `npm install` or `yarn`)
2. Duplicate a `.env.example` file to `.env` and fill in the Bluesky credentials. You can get an app password [here](https://bsky.social/settings/app-passwords).
3. Start a development server:

```bash
pnpm dev --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
