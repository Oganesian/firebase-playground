import { useState } from 'react';
import recipeIcon from '../assets/mixing.png'
import rouletteIcon from '../assets/roulette.png'
// Define the type for a recipe
export interface Recipe {
  href: string;
  src: string;
}

interface RecipeRouletteProps {
  recipes: Recipe[];
}

const RecipeRoulette = ({ recipes }: RecipeRouletteProps) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [rouletteSpinning, setRouletteSpinning] = useState(false);

  const spinRoulette = () => {
    setRouletteSpinning(true);
    setSelectedRecipe(null);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      setSelectedRecipe(recipes[randomIndex]);
      setRouletteSpinning(true);
    }, 800);

  };

  return (
    <div className="roulette-container">
      <h1>Recipe Roulette</h1>
      <button onClick={spinRoulette} className="spin-button">Spin!</button>
      {selectedRecipe ? (
        <div className="recipe-display">
          <a href={selectedRecipe.href} target="_blank" rel="noopener noreferrer">
            <img src={recipeIcon} alt="Selected Recipe" className="recipe-image" />
          </a>
        </div>
      ) : (<div className="recipe-display"><img src={rouletteIcon} alt="Selected Recipe" className={rouletteSpinning ? "recipe-image spinning" : "recipe-image"} /></div>)}
    </div>
  );
};

export default RecipeRoulette;