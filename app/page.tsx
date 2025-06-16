"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import SearchFilters from "@/components/search-filters"
import RecipeCard from "@/components/recipe-card"
import { addRecipeToMealPlan } from "@/lib/mealPlanFirestore";
import { useUser } from "@clerk/nextjs";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dietaryPreference, setDietaryPreference] = useState("All Diets")
  const [caloricGoal, setCaloricGoal] = useState("Any Calories")

  const [popularRecipes, setPopularRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      setError(false);
      const params = new URLSearchParams();
      if (searchQuery) params.append('query', searchQuery);
      if (dietaryPreference && dietaryPreference !== 'All Diets') params.append('diet', dietaryPreference);
      if (caloricGoal && caloricGoal !== 'Any Calories') params.append('calories', caloricGoal);
      try {
        const res = await fetch(`/api/recipes/search?${params.toString()}`);
        let data = await res.json();
        if (!Array.isArray(data)) {
          setPopularRecipes([]);
        } else {
          setPopularRecipes(data);
        }
      } catch {
        setPopularRecipes([]);
        setError(true);
      }
      setLoading(false);
    }
    fetchRecipes();
  }, [searchQuery, dietaryPreference, caloricGoal]);

  // High Protein Meals state
  const [highProteinMeals, setHighProteinMeals] = useState<any[]>([]);
  const [highProteinLoading, setHighProteinLoading] = useState(false);
  const [highProteinError, setHighProteinError] = useState(false);

  // Low Carb Options state
  const [lowCarbOptions, setLowCarbOptions] = useState<any[]>([]);
  const [lowCarbLoading, setLowCarbLoading] = useState(false);
  const [lowCarbError, setLowCarbError] = useState(false);

  // Fetch High Protein Meals
  useEffect(() => {
    async function fetchHighProtein() {
      setHighProteinLoading(true);
      setHighProteinError(false);
      try {
        const res = await fetch('/api/recipes/high-protein');
        let data = await res.json();
        if (!Array.isArray(data)) {
          setHighProteinMeals([]);
        } else {
          setHighProteinMeals(data);
        }
      } catch {
        setHighProteinMeals([]);
        setHighProteinError(true);
      }
      setHighProteinLoading(false);
    }
    fetchHighProtein();
  }, []);

  // Fetch Low Carb Options
  useEffect(() => {
    async function fetchLowCarb() {
      setLowCarbLoading(true);
      setLowCarbError(false);
      try {
        const res = await fetch('/api/recipes/low-carb');
        let data = await res.json();
        if (!Array.isArray(data)) {
          setLowCarbOptions([]);
        } else {
          setLowCarbOptions(data);
        }
      } catch {
        setLowCarbOptions([]);
        setLowCarbError(true);
      }
      setLowCarbLoading(false);
    }
    fetchLowCarb();
  }, []);

  const [toast, setToast] = useState<string | null>(null);
  const { user, isSignedIn } = useUser();
const handleAddToPlan = async (recipe: any) => {
  if (!isSignedIn || !user) {
    setToast("Please sign in to add to your plan.");
    setTimeout(() => setToast(null), 2000);
    return;
  }
  try {
    await addRecipeToMealPlan(user.id, recipe);
    setToast(`Added "${recipe.title}" to your meal plan!`);
  } catch (err) {
    setToast("Failed to add recipe. Please try again.");
  }
  setTimeout(() => setToast(null), 2000);
};

  return (
    <div className="min-h-screen">
      <Navigation />
      {toast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 transition-opacity">
          {toast}
        </div>
      )}

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
            {loading ? (
              <div className="text-center py-8 text-purple-500 font-medium">Loading recipes...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-500 font-medium">Error loading recipes. Please try again.</div>
            ) : popularRecipes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No recipes found. Try changing your search or filters.</div>
            ) : (
              <div className="flex overflow-x-auto space-x-6 pb-4">
                {popularRecipes.map((recipe, index) => (
                  <RecipeCard
                    key={recipe.id || index}
                    title={recipe.title}
                    description={recipe.summary ? recipe.summary.replace(/<[^>]+>/g, '') : ''}
                    calories={recipe.nutrition?.nutrients?.find((n: any) => n.name === "Calories")?.amount || 0}
                    cookTime={recipe.readyInMinutes ? `${recipe.readyInMinutes} min` : "N/A"}
                    servings={recipe.servings}
                    image={recipe.image}
                    onAddToPlan={() => handleAddToPlan(recipe)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* High Protein Meals */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">High Protein Meals</h2>
            {highProteinLoading ? (
              <div className="text-center py-8 text-purple-500 font-medium">Loading high protein meals...</div>
            ) : highProteinError ? (
              <div className="text-center py-8 text-red-500 font-medium">Error loading high protein meals. Please try again.</div>
            ) : highProteinMeals.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No high protein meals found.</div>
            ) : (
              <div className="flex overflow-x-auto space-x-6 pb-4">
                {highProteinMeals.map((recipe, index) => (
                  <RecipeCard
                    key={recipe.id || index}
                    title={recipe.title}
                    description={recipe.summary ? recipe.summary.replace(/<[^>]+>/g, '') : ''}
                    calories={recipe.nutrition?.nutrients?.find((n: any) => n.name === "Protein")?.amount || 0}
                    caloriesUnit="g protein"
                    cookTime={recipe.readyInMinutes ? `${recipe.readyInMinutes} min` : "N/A"}
                    servings={recipe.servings}
                    image={recipe.image}
                    onAddToPlan={() => handleAddToPlan(recipe)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Low Carb Options */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Low Carb Options</h2>
            {lowCarbLoading ? (
              <div className="text-center py-8 text-purple-500 font-medium">Loading low carb options...</div>
            ) : lowCarbError ? (
              <div className="text-center py-8 text-red-500 font-medium">Error loading low carb options. Please try again.</div>
            ) : lowCarbOptions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No low carb options found.</div>
            ) : (
              <div className="flex overflow-x-auto space-x-6 pb-4">
                {lowCarbOptions.map((recipe, index) => (
                  <RecipeCard
                    key={recipe.id || index}
                    title={recipe.title}
                    description={recipe.summary ? recipe.summary.replace(/<[^>]+>/g, '') : ''}
                    calories={recipe.nutrition?.nutrients?.find((n: any) => n.name === "Carbohydrates")?.amount || 0}
                    caloriesUnit="g carbs"
                    cookTime={recipe.readyInMinutes ? `${recipe.readyInMinutes} min` : "N/A"}
                    servings={recipe.servings}
                    image={recipe.image}
                    onAddToPlan={() => handleAddToPlan(recipe)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
