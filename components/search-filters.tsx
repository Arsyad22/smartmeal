"use client"

import { Search } from "lucide-react"

interface SearchFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  dietaryPreference: string
  onDietaryChange: (preference: string) => void
  caloricGoal: string
  onCaloricChange: (goal: string) => void
  showMealType?: boolean
  mealType?: string
  onMealTypeChange?: (type: string) => void
}

export default function SearchFilters({
  searchQuery,
  onSearchChange,
  dietaryPreference,
  onDietaryChange,
  caloricGoal,
  onCaloricChange,
  showMealType = false,
  mealType = "",
  onMealTypeChange,
}: SearchFiltersProps) {
  const dietaryOptions = [
    "All Diets",
    "Vegetarian",
    "Vegan",
    "Keto",
    "Paleo",
    "Mediterranean",
    "Low Carb",
    "Gluten Free",
  ]

  const caloricOptions = ["Any Calories", "Under 300 kcal", "300-500 kcal", "500-800 kcal", "800+ kcal"]

  const mealTypeOptions = ["All Meals", "Breakfast", "Lunch", "Dinner", "Snack"]

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search recipes by name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      <div className={`grid gap-4 ${showMealType ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preference</label>
          <select
            value={dietaryPreference}
            onChange={(e) => onDietaryChange(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          >
            {dietaryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Caloric Goal</label>
          <select
            value={caloricGoal}
            onChange={(e) => onCaloricChange(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          >
            {caloricOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {showMealType && onMealTypeChange && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Meal Type</label>
            <select
              value={mealType}
              onChange={(e) => onMealTypeChange(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            >
              {mealTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  )
}
