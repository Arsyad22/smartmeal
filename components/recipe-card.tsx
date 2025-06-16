"use client"

import { Heart, Clock, Users } from "lucide-react"

interface RecipeCardProps {
  title: string
  description: string
  calories: number
  cookTime?: string
  servings?: number
  image?: string
  onAddToPlan?: () => void
}

export default function RecipeCard({
  title,
  description,
  calories,
  cookTime = "30 min",
  servings = 2,
  image,
  onAddToPlan,
}: RecipeCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md card-hover overflow-hidden min-w-[280px]">
      <div className="relative">
        <img src={image || `/placeholder.svg?height=200&width=280`} alt={title} className="w-full h-48 object-cover" />
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {cookTime}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {servings}
            </div>
          </div>
          <span className="font-medium text-purple-600">{calories} kcal</span>
        </div>

        <button onClick={onAddToPlan} className="w-full btn-primary text-sm">
          Add to My Plan
        </button>
      </div>
    </div>
  )
}
