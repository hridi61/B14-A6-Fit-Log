"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { usePlan } from "@/context/PlanContext";
import PlanCard from "@/components/PlanCard";

const SORT_OPTIONS = [
  { key: "duration", label: "Duration" },
  { key: "calories", label: "Calories" },
  { key: "rating", label: "Rating" },
];

export default function MyPlanPage() {
  const {
    plan,
    saved,
    loaded,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = usePlan();

  const [activeTab, setActiveTab] = useState("today");
  const [sortBy, setSortBy] = useState("duration");

  const activeList = activeTab === "today" ? plan : saved;

  const sortedList = useMemo(() => {
    return [...activeList].sort((a, b) => (b[sortBy] || 0) - (a[sortBy] || 0));
  }, [activeList, sortBy]);

  const totals = useMemo(() => {
    return plan.reduce(
      (acc, w) => ({
        minutes: acc.minutes + (w.duration || 0),
        calories: acc.calories + (w.calories || 0),
      }),
      { minutes: 0, calories: 0 }
    );
  }, [plan]);

  return (
    <section className="mx-auto max-w-container px-12 py-10">
      <h1 className="font-display text-3xl font-bold uppercase">My Plan</h1>
      <p className="mt-1 text-sm text-base-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics */}
      <div className="flex flex-col items-center gap-3 rounded-card border border-base-border border-t-2 border-t-accent bg-base-panel py-16 text-center">
        <div>
          <p className="text-xs text-base-muted">Exercises</p>
          <p className="mt-1 text-2xl font-bold text-accent">{plan.length}</p>
        </div>
        <div>
          <p className="text-xs text-base-muted">Minutes</p>
          <p className="mt-1 text-2xl font-bold">{totals.minutes}</p>
        </div>
        <div>
          <p className="text-xs text-base-muted">Calories</p>
          <p className="mt-1 text-2xl font-bold">{totals.calories}</p>
        </div>
      </div>

      {/* Tabs + Sort */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 rounded-full border border-base-border p-1">
          <button
            onClick={() => setActiveTab("today")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "today"
                ? "bg-accent text-black"
                : "text-base-muted"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "saved"
                ? "bg-accent text-black"
                : "text-base-muted"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-base-muted">
          <span>Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-full border border-base-border bg-base-panel px-4 py-1.5 pr-8 text-xs font-semibold text-white outline-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>
            <FiChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* List */}
      <div className="mt-6">
        {!loaded && (
          <p className="py-10 text-center text-sm text-base-muted">
            Loading workouts...
          </p>
        )}

        {loaded && sortedList.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-card border border-base-border bg-base-panel py-16 text-center">
            <h2 className="font-display text-lg font-semibold uppercase">
              Nothing here yet
            </h2>
            <p className="max-w-xs text-sm text-base-muted">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-2 rounded-full bg-accent px-5 py-2 text-xs font-semibold text-black"
            >
              Go to workouts
            </Link>
          </div>
        )}

        {loaded && sortedList.length > 0 && (
          <div className="flex flex-col gap-3">
            {sortedList.map((workout) => (
              <PlanCard
                key={workout.id}
                workout={workout}
                showDoneButton={activeTab === "today"}
                onRemove={
                  activeTab === "today" ? removeFromPlan : removeFromSaved
                }
                onMarkDone={markAsDone}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
