"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import { Eye, Edit, Trash2 } from "lucide-react"

interface SavedMeal {
  id: number
  name: string
  calories: number
  mealType: string
  dateAdded: string
}

export default function MyPlanPage() {
  const [savedMeals, setSavedMeals] = useState<SavedMeal[]>([
    {
      id: 1,
      name: "Mediterranean Quinoa Bowl",
      calories: 420,
      mealType: "Lunch",
      dateAdded: "2024-01-15",
    },
    {
      id: 2,
      name: "Grilled Salmon with Asparagus",
      calories: 380,
      mealType: "Dinner",
      dateAdded: "2024-01-14",
    },
    {
      id: 3,
      name: "Greek Yogurt Parfait",
      calories: 280,
      mealType: "Breakfast",
      dateAdded: "2024-01-13",
    },
    {
      id: 4,
      name: "Chicken Power Bowl",
      calories: 520,
      mealType: "Lunch",
      dateAdded: "2024-01-12",
    },
  ])

  const handleView = (mealName: string) => {
    alert(`Viewing recipe for: ${mealName}`)
  }

  const handleEdit = (mealName: string) => {
    alert(`Editing: ${mealName}`)
  }

  const handleDelete = (id: number, mealName: string) => {
    if (confirm(`Are you sure you want to remove "${mealName}" from your plan?`)) {
      setSavedMeals(savedMeals.filter((meal) => meal.id !== id))
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
              <h3 className="text-2xl font-bold text-blue-700">{Math.round(totalCalories / savedMeals.length)}</h3>
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
                      onClick={() => handleView(meal.name)}
                      className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">View</span>
                    </button>
                    <button
                      onClick={() => handleEdit(meal.name)}
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
    </div>
  )
}
