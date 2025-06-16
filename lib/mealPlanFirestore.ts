import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  query,
  DocumentData,
} from "firebase/firestore";

// Add a recipe to the user's meal plan
export async function addRecipeToMealPlan(userId: string, recipe: any) {
  if (!userId || !recipe?.id) throw new Error("Missing userId or recipe.id");
  const ref = doc(db, "users", userId, "mealPlan", recipe.id.toString());
  await setDoc(ref, recipe);
}

// Remove a recipe from the user's meal plan
export async function removeRecipeFromMealPlan(userId: string, recipeId: string) {
  if (!userId || !recipeId) throw new Error("Missing userId or recipeId");
  const ref = doc(db, "users", userId, "mealPlan", recipeId);
  await deleteDoc(ref);
}

// Get all recipes in the user's meal plan
export async function getMealPlan(userId: string): Promise<DocumentData[]> {
  if (!userId) throw new Error("Missing userId");
  const q = query(collection(db, "users", userId, "mealPlan"));
  const querySnap = await getDocs(q);
  return querySnap.docs.map(doc => doc.data());
}
