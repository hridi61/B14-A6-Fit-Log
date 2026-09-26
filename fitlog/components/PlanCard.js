import Link from "next/link";
import { FiClock, FiZap, FiStar, FiCheck, FiX } from "react-icons/fi";

export default function PlanCard({
  workout,
  onRemove,
  onMarkDone,
  showDoneButton,
}) {
  const { id, name, image, equipment, duration, calories, rating, done } =
    workout;

  return (
    <div className="flex flex-col items-start gap-4 rounded-card border border-base-border bg-base-panel p-4 sm:flex-row sm:items-center">
      <img
        src={image || "/images/workout-default.png"}
        alt={name}
        onError={(e) => {
          e.currentTarget.src = "/images/workout-default.png";
        }}
        className="h-16 w-16 shrink-0 rounded-lg object-cover"
      />

      <div className="flex-1">
        <h3
          className={`font-display text-sm font-semibold uppercase ${
            done ? "text-base-muted line-through" : ""
          }`}
        >
          {name}
        </h3>
        <p className="text-xs text-base-muted">{equipment}</p>
        <div className="mt-1 flex items-center gap-4 text-xs text-base-muted">
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

      <div className="flex items-center gap-2">
        <Link
          href={`/workouts/${id}`}
          className="rounded-full border border-base-border px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-accent"
        >
          View Details
        </Link>
        {showDoneButton && (
          <button
            onClick={() => onMarkDone(id)}
            className={`flex items-center gap-1 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              done
                ? "bg-base-panel2 text-base-muted hover:bg-base-panel2/70"
                : "bg-accent text-black hover:bg-accent-dark"
            }`}
          >
            <FiCheck /> {done ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          onClick={() => onRemove(id)}
          aria-label="Remove"
          className="rounded-full p-2 text-base-muted transition-colors hover:text-white"
        >
          <FiX />
        </button>
      </div>
    </div>
  );
}
