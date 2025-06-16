import RecipeCard from "./recipe-card"

interface Recipe {
  id: number
  title: string
  description: string
  calories: number
  image: string
}

interface RecipeSectionProps {
  title: string
  recipes: Recipe[]
}

export default function RecipeSection({ title, recipes }: RecipeSectionProps) {
  return (
    <section>
      <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">{title}</h2>
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-6 min-w-max md:grid md:grid-cols-3 md:gap-6 md:min-w-0">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="w-80 md:w-auto flex-shrink-0">
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
