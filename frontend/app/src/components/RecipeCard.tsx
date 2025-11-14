import type { Recipe } from '../types';
import './RecipeCard.css';

// Props for each recipe card
interface RecipeCardProps {
  recipe: Recipe;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

/**
 * Card / container for each recipe including recipe name, description, ingredients, and instructions
 * @param recipe - recipe type containing all information pertaining to a recipe
 */
export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isSelected, onSelect }) => {
  return (
    <div 
    onClick = {() => onSelect(recipe.name)}
    className = {`recipe-card ${isSelected ? 'selected' : ''}`}>
      <h3 className="recipe-card-title">{recipe.name}</h3>
      <p className="recipe-card-description">{recipe.description}</p>
      
      <div className="recipe-card-section">
        <h4 className="recipe-card-section-title">Ingredients:</h4>
        <div className="recipe-card-ingredients">
          {/* map ingredients list used by recipe */}
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
          {/* maps recipe instructions as a list element */}
          {recipe.instructions.map((step, i) => (
            <li key={i} className="recipe-card-instruction">{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};