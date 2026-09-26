# FitLog — Workout Library & Planner

A dark, no-nonsense workout library and daily planning app built with Next.js.
Browse a library of lifts, open a detailed page for each one, and build out
today's plan or a saved-for-later list — all while state is remembered across
page reloads.

## Description

FitLog fetches workout data from a public API, displays it in a responsive
card grid, and lets users manage a personal training session: add lifts to
**Today's Plan** (capped at 5), **Save** lifts for later, mark lifts as done,
and track running totals for exercises, minutes, and calories on the
`/my-plan` page.

## Technologies Used

- **Next.js 14** (App Router) — routing, dynamic routes, client/server components
- **React** — component state with `useState` / `useEffect`
- **Context API** — global state for Today's Plan and Saved lists
- **Tailwind CSS** — styling and responsive layout
- **react-hot-toast** — toast notifications
- **react-icons** — icon set
- **localStorage** — persists the plan/saved lists across reloads

## Key Features

1. **Dynamic workout details page** (`/workouts/[id]`) fetched live from the API.
2. **Add to Today's Plan / Save for later** with a 5-lift daily cap and toast feedback.
3. **My Plan dashboard** with live Exercises / Minutes / Calories summary cards.
4. **Sort dropdown** (Duration / Calories / Rating) on the My Plan page.
5. **Mark as Done and Remove** actions on each planned workout.
6. **Persistent state** via `localStorage` so the plan survives a page reload.
7. **Fully responsive** layout for mobile, tablet, and desktop.
8. **Custom 404 page** and loading states for both the library and My Plan page.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

## Deployment

Deployed on Vercel. See the live link in the submission form.

   - Live Link: https://b14-a6-fit-log-delta.vercel.app
   - GitHub Repository Link: https://github.com/hridi61/B14-A6-Fit-Log
