"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import SearchFilters from "@/components/search-filters"
import RecipeCard from "@/components/recipe-card"

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dietaryPreference, setDietaryPreference] = useState("All Diets")
  const [caloricGoal, setCaloricGoal] = useState("Any Calories")
  const [mealType, setMealType] = useState("All Meals")

  const searchResults = [
    {
      title: "Thai Green Curry",
      description: "Aromatic coconut curry with fresh vegetables",
      calories: 380,
      cookTime: "25 min",
      servings: 3,
    },
    {
      title: "Quinoa Buddha Bowl",
      description: "Colorful bowl with quinoa, roasted vegetables, and tahini",
      calories: 420,
      cookTime: "30 min",
      servings: 2,
    },
    {
      title: "Baked Cod with Herbs",
      description: "Flaky white fish with Mediterranean herbs",
      calories: 290,
      cookTime: "20 min",
      servings: 1,
    },
    {
      title: "Sweet Potato Black Bean Tacos",
      description: "Roasted sweet potato with black beans in corn tortillas",
      calories: 350,
      cookTime: "35 min",
      servings: 2,
    },
    {
      title: "Mushroom Risotto",
      description: "Creamy arborio rice with wild mushrooms",
      calories: 480,
      cookTime: "40 min",
      servings: 4,
    },
    {
      title: "Chicken Caesar Salad",
      description: "Grilled chicken over crisp romaine with parmesan",
      calories: 320,
      cookTime: "15 min",
      servings: 1,
    },
  ]

  const handleAddToPlan = (recipeName: string) => {
    alert(`Added "${recipeName}" to your meal plan!`)
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Recipes</h1>
          <p className="text-gray-600">Find your next favorite meal</p>
        </div>

        <SearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          dietaryPreference={dietaryPreference}
          onDietaryChange={setDietaryPreference}
          caloricGoal={caloricGoal}
          onCaloricChange={setCaloricGoal}
          showMealType={true}
          mealType={mealType}
          onMealTypeChange={setMealType}
        />

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Search Results ({searchResults.length} recipes)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((recipe, index) => (
              <RecipeCard key={index} {...recipe} onAddToPlan={() => handleAddToPlan(recipe.title)} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
