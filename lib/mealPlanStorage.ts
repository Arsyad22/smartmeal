// Utility functions for managing the meal plan in localStorage

export const MEAL_PLAN_KEY = 'smartmeal_plan';

export function getMealPlan() {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(MEAL_PLAN_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addToMealPlan(recipe: any) {
  if (typeof window === 'undefined') return;
  const plan = getMealPlan();
  // Avoid duplicates by id
  if (!plan.some((r: any) => r.id === recipe.id)) {
    plan.push(recipe);
    localStorage.setItem(MEAL_PLAN_KEY, JSON.stringify(plan));
  }
}

export function removeFromMealPlan(recipeId: number) {
  if (typeof window === 'undefined') return;
  const plan = getMealPlan().filter((r: any) => r.id !== recipeId);
  localStorage.setItem(MEAL_PLAN_KEY, JSON.stringify(plan));
}
