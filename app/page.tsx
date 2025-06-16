"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import SearchFilters from "@/components/search-filters"
import RecipeCard from "@/components/recipe-card"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dietaryPreference, setDietaryPreference] = useState("All Diets")
  const [caloricGoal, setCaloricGoal] = useState("Any Calories")

  const popularRecipes = [
    {
      title: "Mediterranean Quinoa Bowl",
      description: "Fresh vegetables with quinoa and tahini dressing",
      calories: 420,
      cookTime: "25 min",
      servings: 2,
    },
    {
      title: "Grilled Salmon with Asparagus",
      description: "Perfectly seasoned salmon with roasted vegetables",
      calories: 380,
      cookTime: "20 min",
      servings: 1,
    },
    {
      title: "Avocado Toast Supreme",
      description: "Multigrain toast topped with avocado and seeds",
      calories: 320,
      cookTime: "10 min",
      servings: 1,
    },
  ]

  const highProteinMeals = [
    {
      title: "Chicken Power Bowl",
      description: "Grilled chicken with brown rice and vegetables",
      calories: 520,
      cookTime: "30 min",
      servings: 1,
    },
    {
      title: "Greek Yogurt Parfait",
      description: "Protein-rich yogurt with berries and granola",
      calories: 280,
      cookTime: "5 min",
      servings: 1,
    },
    {
      title: "Lentil Protein Curry",
      description: "Hearty lentils in aromatic spices",
      calories: 450,
      cookTime: "35 min",
      servings: 3,
    },
  ]

  const lowCarbOptions = [
    {
      title: "Zucchini Noodle Carbonara",
      description: "Creamy carbonara with spiralized zucchini",
      calories: 290,
      cookTime: "15 min",
      servings: 2,
    },
    {
      title: "Cauliflower Rice Stir Fry",
      description: "Asian-inspired vegetables with cauliflower rice",
      calories: 220,
      cookTime: "12 min",
      servings: 2,
    },
    {
      title: "Stuffed Bell Peppers",
      description: "Bell peppers filled with ground turkey and herbs",
      calories: 340,
      cookTime: "40 min",
      servings: 2,
    },
  ]

  const handleAddToPlan = (recipeName: string) => {
    alert(`Added "${recipeName}" to your meal plan!`)
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            SmartMeal Planner
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Plan your meals. Stay healthy. Save time.</p>
        </div>

        {/* Search and Filters */}
        <SearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          dietaryPreference={dietaryPreference}
          onDietaryChange={setDietaryPreference}
          caloricGoal={caloricGoal}
          onCaloricChange={setCaloricGoal}
        />

        {/* Recipe Sections */}
        <div className="space-y-12">
          {/* Popular Recipes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Recipes</h2>
            <div className="flex overflow-x-auto space-x-6 pb-4">
              {popularRecipes.map((recipe, index) => (
                <RecipeCard key={index} {...recipe} onAddToPlan={() => handleAddToPlan(recipe.title)} />
              ))}
            </div>
          </section>

          {/* High Protein Meals */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">High Protein Meals</h2>
            <div className="flex overflow-x-auto space-x-6 pb-4">
              {highProteinMeals.map((recipe, index) => (
                <RecipeCard key={index} {...recipe} onAddToPlan={() => handleAddToPlan(recipe.title)} />
              ))}
            </div>
          </section>

          {/* Low Carb Options */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Low Carb Options</h2>
            <div className="flex overflow-x-auto space-x-6 pb-4">
              {lowCarbOptions.map((recipe, index) => (
                <RecipeCard key={index} {...recipe} onAddToPlan={() => handleAddToPlan(recipe.title)} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
