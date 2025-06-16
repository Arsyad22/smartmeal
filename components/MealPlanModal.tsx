"use client";
import { useState } from "react";

export interface MealPlanModalProps {
  open: boolean;
  onClose: () => void;
  meal: any | null;
  onSave?: (updatedMeal: any) => void;
}

export default function MealPlanModal({ open, onClose, meal, onSave }: MealPlanModalProps) {
  const [notes, setNotes] = useState(meal?.notes || "");
  const [servings, setServings] = useState(meal?.servings || 1);
  if (!open || !meal) return null;

  const handleSave = () => {
    if (onSave) onSave({ ...meal, notes, servings });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 relative overflow-y-auto max-h-[80vh]">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-2">{meal.title}</h2>
        <img src={meal.image} alt={meal.title} className="w-full h-48 object-cover rounded-lg mb-4" />
        <p className="mb-2 text-gray-700">{meal.summary ? meal.summary.replace(/<[^>]+>/g, '') : ''}</p>
        <div className="flex gap-4 mb-4">
          <div>
            <span className="font-semibold">Calories:</span> {meal.nutrition?.nutrients?.find((n: any) => n.name === "Calories")?.amount || meal.calories || 0} kcal
          </div>
          <div>
            <span className="font-semibold">Type:</span> {meal.mealType || meal.dishTypes?.[0] || "Meal"}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            className="w-full border rounded-md p-2"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Add your notes here..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Servings</label>
          <input
            type="number"
            min={1}
            className="w-24 border rounded-md p-2"
            value={servings}
            onChange={e => setServings(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
