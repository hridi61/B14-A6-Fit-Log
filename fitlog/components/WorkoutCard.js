import Link from "next/link";
import { FiClock, FiZap, FiStar } from "react-icons/fi";

function getCategories(workout) {
  const raw =
    workout.categories ||
    workout.category ||
    workout.tags ||
    workout.muscleGroup ||
    workout.muscle_groups ||
    workout.muscleGroups;

  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "string") {
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

export default function WorkoutCard({ workout }) {
  const { id, name, image, equipment, duration, calories, rating } = workout;
  const categories = getCategories(workout);

  return (
    <Link
      href={`/workouts/${id}`}
      className="group flex flex-col overflow-hidden rounded-card border border-base-border bg-base-panel transition-colors hover:border-accent/60"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-base-panel2">
        <img
          src={image || "/images/workout-default.png"}
          alt={name}
          onError={(e) => {
            e.currentTarget.src = "/images/workout-default.png";
          }}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-2">
          {categories?.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase text-black"
            >
              {cat}
            </span>
          ))}
        </div>
        <h3 className="font-display text-base font-semibold uppercase leading-snug">
          {name}
        </h3>
        <p className="text-xs text-base-muted">{equipment}</p>
        <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-base-muted">
          <span className="flex items-center gap-1">
            <FiClock /> {duration ?? 0} min
          </span>
          <span className="flex items-center gap-1">
            <FiZap /> {calories ?? 0} kcal
          </span>
          <span className="flex items-center gap-1">
            <FiStar className="text-accent" /> {rating ?? 0}
          </span>
        </div>
      </div>
    </Link>
  );
}
