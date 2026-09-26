import { FiArrowDownCircle } from "react-icons/fi";

export default function Hero() {
  return (
    <section>
      <div className="grid items-center gap-8 rounded-card border border-base-border bg-base-panel p-8 md:grid-cols-2 md:p-12">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-accent">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold uppercase leading-tight sm:text-5xl">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-4 max-w-md text-sm text-base-muted sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
          >
            <FiArrowDownCircle />
            BROWSE WORKOUTS
          </a>
        </div>
        <div className="flex justify-center">
          <img
            src="/images/banner.png"
            alt="Athlete training on a gym machine"
            className="max-h-80 w-full rounded-card object-contain"
          />
        </div>
      </div>
    </section>
  );
}
