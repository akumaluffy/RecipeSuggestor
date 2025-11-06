import type { Recipe } from '../types';
import './RecipeCard.css';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <h3 className="recipe-card-title">{recipe.name}</h3>
      <p className="recipe-card-description">{recipe.description}</p>
      
      <div className="recipe-card-section">
        <h4 className="recipe-card-section-title">Ingredients:</h4>
        <div className="recipe-card-ingredients">
          {recipe.ingredients.map((ing, i) => (
            <span key={i} className="recipe-card-ingredient-tag">
              {ing}
            </span>
          ))}
        </div>
      </div>
      
      <div className="recipe-card-section">
        <h4 className="recipe-card-section-title">Instructions:</h4>
        <ol className="recipe-card-instructions">
          {recipe.instructions.map((step, i) => (
            <li key={i} className="recipe-card-instruction">{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};