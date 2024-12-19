import { useState } from 'react';
import recipeIcon from '../assets/mixing.png';
import backIcon from '../assets/left-arrow.svg';
import rouletteIcon from '../assets/roulette.png';
import { useNavigate } from 'react-router';
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

  const navigate = useNavigate();

  const spinRoulette = () => {
    setRouletteSpinning(true);
    setSelectedRecipe(null);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      setSelectedRecipe(recipes[randomIndex]);
      setRouletteSpinning(false);
    }, 800);
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="roulette-container">
      <button type="button" className="back-button" onClick={goBack}>
        <img src={backIcon} alt="Go back" />
      </button>

      <h1 className="roulette-title">Recipe Roulette</h1>

      <button onClick={spinRoulette} className="spin-button">
        Spin
      </button>

      {selectedRecipe ? (
        <div className="recipe-display">
          <a href={selectedRecipe.href} target="_blank" rel="noopener noreferrer">
            <img src={recipeIcon} alt="Selected Recipe" className="recipe-image" />
          </a>
        </div>
      ) : (
        <div className="recipe-display">
          <img
            src={rouletteIcon}
            alt="Roulette Wheel"
            className={rouletteSpinning ? 'recipe-image spinning' : 'recipe-image'}
          />
        </div>
      )}
    </div>
  );
};

export default RecipeRoulette;
