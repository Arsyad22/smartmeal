"use client"

import React, { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import SearchFilters from "@/components/search-filters"
import RecipeCard from "@/components/recipe-card"
import { addRecipeToMealPlan } from "@/lib/mealPlanFirestore";
import { useUser } from "@clerk/nextjs";

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dietaryPreference, setDietaryPreference] = useState("All Diets")
  const [caloricGoal, setCaloricGoal] = useState("Any Calories")
  const [mealType, setMealType] = useState("All Meals")

  const { user, isSignedIn } = useUser();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Fetch recipes from API when search/filter changes
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append('query', searchQuery);
        if (dietaryPreference && dietaryPreference !== 'All Diets') params.append('diet', dietaryPreference);
        if (caloricGoal && caloricGoal !== 'Any Calories') params.append('calories', caloricGoal);
        if (mealType && mealType !== 'All Meals') params.append('mealType', mealType);
        const res = await fetch(`/api/recipes/search?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch recipes');
        const data = await res.json();
        setSearchResults(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || 'Error fetching recipes');
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [searchQuery, dietaryPreference, caloricGoal, mealType]);

  // Add to plan logic
  const handleAddToPlan = async (recipe: any) => {
    if (!isSignedIn || !user) {
      setToast("Please sign in to add to your plan.");
      setTimeout(() => setToast(null), 2000);
      return;
    }
    try {
      await addRecipeToMealPlan(user.id, recipe);
      setToast(`Added "${recipe.title || recipe.name}" to your meal plan!`);
    } catch (err) {
      setToast("Failed to add recipe. Please try again.");
    }
    setTimeout(() => setToast(null), 2000);
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
          {toast && (
            <div className="mb-4 text-center text-white bg-purple-500 rounded-lg px-4 py-2 font-medium shadow-lg">{toast}</div>
          )}
          {loading ? (
            <div className="text-center py-8 text-purple-500 font-medium">Loading recipes...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500 font-medium">{error}</div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-8 text-gray-500 font-medium">No recipes found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((recipe, index) => (
                <RecipeCard key={index} {...recipe} onAddToPlan={() => handleAddToPlan(recipe)} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
