# BLAZER.PART
Blazer Part Finder

An embeddable Next.js AI chat widget (Vercel AI SDK + Google Gemini) that can
be hosted on Vercel and dropped into any website via `<iframe>` or the
`public/embed.js` snippet.

## Getting started

```bash
npm install
cp .env.local.example .env.local
# then edit .env.local and set GOOGLE_GENERATIVE_AI_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the full chat page,
or [http://localhost:3000/?embed=true](http://localhost:3000/?embed=true) to
preview the borderless, header-less layout used for iframe embedding.

## Environment variables

| Variable | Description |
| --- | --- |
| `GOOGLE_GENERATIVE_AI_API_KEY` | API key for Google Gemini, used by `@ai-sdk/google`. Get one at https://aistudio.google.com/app/apikey |

## Project structure

- `app/api/chat/route.ts` — streaming chat API route (Gemini via Vercel AI SDK). Customize the `SYSTEM_PROMPT` constant with your agent's instructions.
- `app/page.tsx` — chat UI. Add `?embed=true` to the URL to hide the header/margins for iframe embedding.
- `public/embed.js` — vanilla JS snippet for embedding the widget (floating button or inline `<iframe>`) on any external site.

## Embedding on another website

```html
<script
  src="https://YOUR-DEPLOYMENT.vercel.app/embed.js"
  data-blazer-chat-url="https://YOUR-DEPLOYMENT.vercel.app"
  defer
></script>
```

This renders a floating chat button that opens the widget in an `<iframe>`.
To embed it inline instead, add `<div id="blazer-part-finder"></div>` anywhere
on the page and the script will render the iframe inside it.

## Deploying

Deploy to [Vercel](https://vercel.com/new) and set the
`GOOGLE_GENERATIVE_AI_API_KEY` environment variable in the project settings.

