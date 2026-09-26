"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const PlanContext = createContext(null);

const PLAN_LIMIT = 5;

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load saved state from localStorage once, on first mount
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");
      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
    } catch (err) {
      console.error("Could not read saved plan from localStorage", err);
    }
    setLoaded(true);
  }, []);

  // Persist to localStorage whenever plan/saved change
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, loaded]);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, loaded]);

  function addToPlan(workout) {
    if (plan.some((w) => w.id === workout.id)) {
      toast.error("Already in today's plan");
      return;
    }
    if (plan.length >= PLAN_LIMIT) {
      toast.error("Today's plan is full (5 lifts max)");
      return;
    }
    setPlan((prev) => [...prev, { ...workout, done: false }]);
    toast.success("Added to today's plan");
  }

  function addToSaved(workout) {
    if (saved.some((w) => w.id === workout.id)) {
      toast.error("Already saved");
      return;
    }
    setSaved((prev) => [...prev, workout]);
    toast.success("Saved for later");
  }

  function removeFromPlan(id) {
    setPlan((prev) => prev.filter((w) => w.id !== id));
    toast.success("Removed from today's plan");
  }

  function removeFromSaved(id) {
    setSaved((prev) => prev.filter((w) => w.id !== id));
    toast.success("Removed from saved");
  }

  function markAsDone(id) {
    setPlan((prev) =>
      prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w))
    );
    toast.success("Nice work! Marked as done");
  }

  const value = {
    plan,
    saved,
    loaded,
    planCount: plan.length,
    savedCount: saved.length,
    planLimit: PLAN_LIMIT,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  };

  return (
    <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) {
    throw new Error("usePlan must be used inside a PlanProvider");
  }
  return ctx;
}
