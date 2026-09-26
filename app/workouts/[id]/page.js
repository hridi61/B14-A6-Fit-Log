"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FiCalendar, FiBookmark } from "react-icons/fi";
import { getWorkoutById } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";

const SPEC_ROWS = [
  { key: "equipment", label: "Equipment" },
  { key: "difficulty", label: "Difficulty" },
  { key: "sets", label: "Sets" },
  { key: "reps", label: "Reps" },
  { key: "duration", label: "Duration", suffix: " min" },
  { key: "calories", label: "Calories", suffix: " kcal" },
  { key: "rating", label: "Rating" },
];

export default function WorkoutDetailsPage() {
  const { id } = useParams();
  const { addToPlan, addToSaved, plan, planLimit } = usePlan();
  const isPlanFull = plan.length >= planLimit;

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getWorkoutById(id)
      .then((data) => setWorkout(data))
      .catch(() => setError("This workout could not be found."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-container px-12 py-20 text-center text-base-muted">
        Loading workout...
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="mx-auto max-w-container px-12 py-20 text-center text-base-muted">
        {error || "Workout not found."}
      </div>
    );
  }

  const {
    name,
    description,
    image,
    categories,
    instructions,
  } = workout;

  return (
    <section className="mx-auto max-w-container px-12 py-10">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left: image */}
        <div className="overflow-hidden rounded-card border border-base-border">
          <img
            src={image || "/images/workout-default.png"}
            alt={name}
            onError={(e) => {
              e.currentTarget.src = "/images/workout-default.png";
            }}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right: details */}
        <div>
          <h1 className="font-display text-3xl font-bold uppercase">
            {name}
          </h1>
          <p className="mt-2 text-sm text-base-muted">{description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {categories?.map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase text-black"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Key specs */}
          <div className="mt-6 divide-y divide-base-border overflow-hidden rounded-card border border-base-border bg-base-panel">
            {SPEC_ROWS.map(({ key, label, suffix }) => (
              <div
                key={key}
                className="flex items-center justify-between px-4 py-3 text-sm"
              >
                <span className="text-base-muted">{label.toUpperCase()}</span>
                <span className="font-medium">
                  {workout[key]}
                  {workout[key] !== undefined && suffix ? suffix : ""}
                </span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          {instructions?.length > 0 && (
            <div className="mt-6">
              <h2 className="font-display text-sm font-semibold uppercase text-accent">
                Instructions
              </h2>
              <ol className="mt-3 space-y-2 text-sm text-base-muted">
                {instructions.map((step, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="font-semibold text-white">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => addToPlan(workout)}
              disabled={isPlanFull}
              title={isPlanFull ? "Today's plan is full (5 lifts max)" : ""}
              className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform ${
                isPlanFull
                  ? "cursor-not-allowed bg-base-panel2 text-base-muted"
                  : "bg-accent text-black hover:scale-[1.03]"
              }`}
            >
              <FiCalendar />
              {isPlanFull ? "Plan is full" : "Add to today's plan"}
            </button>
            <button
              onClick={() => addToSaved(workout)}
              className="flex items-center gap-2 rounded-full border border-base-border px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-accent"
            >
              <FiBookmark />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
