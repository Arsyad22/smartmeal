"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import { Eye, Edit, Trash2 } from "lucide-react"
import { useUser } from "@clerk/nextjs";
import { getMealPlan, removeRecipeFromMealPlan, addRecipeToMealPlan } from "@/lib/mealPlanFirestore";
import MealPlanModal from "@/components/MealPlanModal";

interface SavedMeal {
  id: number
  name: string
  calories: number
  mealType: string
  dateAdded: string
}

export default function MyPlanPage() {
  const { user, isSignedIn } = useUser();
  const [savedMeals, setSavedMeals] = useState<SavedMeal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMeal, setModalMeal] = useState<any | null>(null);

  useEffect(() => {
    if (!isSignedIn || !user) return;
    setLoading(true);
    setError(null);
    getMealPlan(user.id)
      .then((recipes) => {
        setSavedMeals(recipes.map((r: any) => ({
          ...r,
          id: r.id,
          name: r.title || r.name,
          calories: r.nutrition?.nutrients?.find((n: any) => n.name === "Calories")?.amount || r.calories || 0,
          mealType: r.mealType || r.dishTypes?.[0] || "Meal",
          dateAdded: r.dateAdded || r.createdAt || new Date().toISOString(),
          notes: r.notes || "",
          servings: r.servings || 1,
        })));
      })
      .catch(() => setError("Failed to load your meal plan."))
      .finally(() => setLoading(false));
  }, [user, isSignedIn]);

  const handleView = (mealId: number) => {
    const meal = savedMeals.find(m => m.id === mealId);
    setModalMeal(meal || null);
    setModalOpen(true);
  }

  const handleEdit = (mealId: number) => {
    const meal = savedMeals.find(m => m.id === mealId);
    setModalMeal(meal || null);
    setModalOpen(true);
  }

  const handleModalSave = async (updatedMeal: any) => {
    if (!isSignedIn || !user) return;
    await addRecipeToMealPlan(user.id, updatedMeal);
    setSavedMeals(savedMeals.map(m => m.id === updatedMeal.id ? { ...m, ...updatedMeal } : m));
  }

  const handleDelete = async (id: number, mealName: string) => {
    if (!isSignedIn || !user) return;
    if (confirm(`Are you sure you want to remove "${mealName}" from your plan?`)) {
      await removeRecipeFromMealPlan(user.id, id.toString());
      setSavedMeals(savedMeals.filter((meal) => meal.id !== id));
    }
  }

  const totalCalories = savedMeals.reduce((sum, meal) => sum + meal.calories, 0)

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Saved Meals</h1>
          <p className="text-gray-600">Manage your meal planning</p>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <h3 className="text-2xl font-bold text-purple-700">{savedMeals.length}</h3>
              <p className="text-purple-600">Saved Meals</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-pink-700">{totalCalories}</h3>
              <p className="text-pink-600">Total Calories</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-700">{savedMeals.length > 0 ? Math.round(totalCalories / savedMeals.length) : 0}</h3>
              <p className="text-blue-600">Avg per Meal</p>
            </div>
          </div>
        </div>

        {/* Saved Meals Grid */}
        {savedMeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedMeals.map((meal) => (
              <div key={meal.id} className="bg-white rounded-2xl shadow-md card-hover overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{meal.name}</h3>
                      <p className="text-sm text-gray-500">{meal.mealType}</p>
                    </div>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                      {meal.calories} kcal
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mb-4">Added on {new Date(meal.dateAdded).toLocaleDateString()}</p>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(meal.id)}
                      className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">View</span>
                    </button>
                    <button
                      onClick={() => handleEdit(meal.id)}
                      className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="text-sm">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(meal.id, meal.name)}
                      className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🍽️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved meals yet</h3>
            <p className="text-gray-600 mb-6">Start building your meal plan by adding recipes</p>
            <a href="/discover" className="btn-primary">
              Discover Recipes
            </a>
          </div>
        )}
      </main>
    <MealPlanModal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      meal={modalMeal}
      onSave={handleModalSave}
    />
  </div>
  )
}
