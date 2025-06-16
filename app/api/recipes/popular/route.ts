import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    console.error("Missing Spoonacular API key");
    return NextResponse.json({ error: "Missing Spoonacular API key" }, { status: 500 });
  }

  const url = `https://api.spoonacular.com/recipes/random?number=6&apiKey=${apiKey}`;
  try {
    const res = await fetch(url);
    const text = await res.text();
    console.log("Spoonacular raw response:", text);
    if (!res.ok) {
      console.error("Spoonacular returned error status:", res.status, text);
      return NextResponse.json({ error: `Spoonacular error: ${text}` }, { status: res.status });
    }
    let data;
    try {
      data = JSON.parse(text);
    } catch (jsonErr) {
      console.error("Failed to parse Spoonacular response as JSON:", jsonErr, text);
      return NextResponse.json({ error: "Failed to parse Spoonacular response as JSON" }, { status: 500 });
    }
    if (Array.isArray(data.recipes)) {
      return NextResponse.json(data.recipes);
    }
    console.error("No recipes array in Spoonacular response:", data);
    return NextResponse.json({ error: "No recipes array in Spoonacular response" }, { status: 500 });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}