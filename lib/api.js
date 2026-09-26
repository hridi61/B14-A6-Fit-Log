const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

// The live API's field names don't always match what we expect, so every
// workout is normalized here, in one place, right after it's fetched.
function normalizeWorkout(raw) {
  if (!raw) return raw;

  const pick = (...keys) => {
    for (const k of keys) {
      if (raw[k] !== undefined && raw[k] !== null && raw[k] !== "") {
        return raw[k];
      }
    }
    return undefined;
  };

  const toCategoryArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === "string") {
      return val.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return [];
  };

  const toNumber = (val) => {
    if (val === undefined || val === null || val === "") return undefined;
    const n = typeof val === "string" ? parseFloat(val) : val;
    return Number.isNaN(n) ? undefined : n;
  };

  return {
    ...raw,
    id: pick("id", "_id", "workoutId"),
    name: pick("name", "title", "workoutName"),
    description: pick("description", "desc", "subtitle"),
    image: pick("image", "img", "imageUrl", "thumbnail", "photo"),
    equipment: pick("equipment", "equipments", "gear"),
    categories: toCategoryArray(
      pick("categories", "category", "tags", "muscleGroup", "muscleGroups", "muscle_groups")
    ),
    difficulty: pick("difficulty", "level"),
    sets: pick("sets", "set"),
    reps: pick("reps", "rep"),
    duration: toNumber(pick("duration", "durationMin", "time", "minutes")),
    calories: toNumber(pick("calories", "kcal", "cal", "caloriesBurned", "calorie")),
    rating: toNumber(pick("rating", "stars", "score")),
    instructions: pick("instructions", "steps", "instruction") || [],
  };
}

// Fetch the full workout list
export async function getWorkouts() {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to load workouts");
  }
  const data = await res.json();
  return Array.isArray(data) ? data.map(normalizeWorkout) : data;
}

// Fetch a single workout by id (used on the dynamic details page)
export async function getWorkoutById(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to load this workout");
  }
  const data = await res.json();
  return normalizeWorkout(data);
}
