"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import { getWorkouts } from "@/lib/api";

export default function Library() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getWorkouts()
      .then((data) => setWorkouts(data))
      .catch(() => setError("Could not load workouts. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="library">
      <h2 className="font-display text-2xl font-bold uppercase">
        The Library
      </h2>
      <p className="mt-1 text-sm text-base-muted">
        Twelve lifts covering every major muscle group.
      </p>

      {loading && (
        <div className="mt-10 flex flex-col items-center gap-3 py-16 text-base-muted">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-base-border border-t-accent" />
          <p className="text-sm">Loading workouts...</p>
        </div>
      )}

      {error && (
        <div className="mt-10 rounded-card border border-base-border bg-base-panel p-8 text-center text-sm text-base-muted">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
