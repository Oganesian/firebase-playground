import { useEffect, useState } from "react";
import RecipeRoulette, { Recipe } from "./RecipeRoulette";
import "./styles.css"

const RouletteApp = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Load recipes from a JSON file
  useEffect(() => {
    fetch('/scraped_recipes.json') 
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.error('Error loading recipes:', error));
  }, []);

  return (
    <div className="roulette-app">
      {recipes.length > 0 ? (
        <RecipeRoulette recipes={recipes} />
      ) : (
        <p>Loading recipes...</p>
      )}
    </div>
  );
};

export default RouletteApp;