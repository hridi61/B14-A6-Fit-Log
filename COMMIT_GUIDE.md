# Suggested Commit Plan (8+ meaningful commits)

Make these as **separate commits, in this order**, after you've actually run
and tested each part locally. Don't commit everything in one shot — that
defeats the point of "meaningful commit history."

1. `chore: initial Next.js + Tailwind project setup`
   → package.json, tailwind.config.js, postcss.config.js, next.config.js, globals.css

2. `feat: add Navbar with logo, nav links, and plan/saved badges`
   → components/Navbar.js

3. `feat: add Hero section on home page`
   → components/Hero.js, app/page.js

4. `feat: fetch and display workout library grid`
   → lib/api.js, components/WorkoutCard.js, components/Library.js

5. `feat: add dynamic workout details page`
   → app/workouts/[id]/page.js

6. `feat: add Context API for today's plan and saved workouts`
   → context/PlanContext.js, app/layout.js, wire up buttons on details page

7. `feat: build My Plan page with tabs, metrics, and sort`
   → app/my-plan/page.js, components/PlanCard.js

8. `feat: add mark-as-done, remove actions, and localStorage persistence`
   → PlanContext.js updates

9. `feat: add 404 page and footer`
   → app/not-found.js, components/Footer.js

10. `fix: responsive adjustments for mobile and tablet`
    → after you test on a real narrow screen and fix anything cramped

11. `docs: add README with project info and features`
    → README.md

12. `chore: deploy to Vercel and fix production issues`
    → after deployment, once you've fixed any console errors

Tip: run `git add <specific files>` per commit instead of `git add .` so each
commit's diff actually matches its message.
