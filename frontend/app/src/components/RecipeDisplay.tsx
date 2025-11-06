import type { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';
import './RecipeDisplay.css';

interface RecipeDisplayProps {
  recipes: Recipe[];
}

export const RecipesDisplay: React.FC<RecipeDisplayProps> = ({ recipes }) => {
  if (recipes.length === 0) return null;

  return (
    <div className="recipes-display-container">
      <h2 className="recipes-display-title">Suggested Recipes</h2>
      <div className="recipes-display-grid">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};
