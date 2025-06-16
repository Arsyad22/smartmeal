import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing Spoonacular API key" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const diet = searchParams.get('diet') || '';
  const calories = searchParams.get('calories') || '';
  const mealType = searchParams.get('mealType') || '';

  // Map dropdowns to Spoonacular API params
  let dietParam = '';
  if (diet && diet !== 'All Diets') dietParam = `&diet=${encodeURIComponent(diet)}`;

  let calorieParam = '';
  if (calories === 'Under 300 kcal') calorieParam = '&maxCalories=300';
  else if (calories === '300-500 kcal') calorieParam = '&minCalories=300&maxCalories=500';
  else if (calories === '500-800 kcal') calorieParam = '&minCalories=500&maxCalories=800';
  else if (calories === '800+ kcal') calorieParam = '&minCalories=800';

  let typeParam = '';
  if (mealType && mealType !== 'All Meals') typeParam = `&type=${encodeURIComponent(mealType.toLowerCase())}`;

  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}${dietParam}${calorieParam}${typeParam}&addRecipeNutrition=true&number=8&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const text = await res.text();
    if (!res.ok) {
      return NextResponse.json({ error: text }, { status: res.status });
    }
    const data = JSON.parse(text);
    return NextResponse.json(data.results || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
