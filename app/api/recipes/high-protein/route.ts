import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing Spoonacular API key" }, { status: 500 });
  }

  // High protein: use minProtein param, sort by protein
  const url = `https://api.spoonacular.com/recipes/complexSearch?minProtein=20&sort=protein&addRecipeNutrition=true&number=8&apiKey=${apiKey}`;

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
