import type { Recipe } from '../../types';
import './FavoritesCard.css';

interface FavoritesCardProps {
    recipe: Recipe;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

/**
 * card / container for each recipe including recipe name, description, ingredients, and instructions
 * @param recipe - recipe type containing all info pertaining to a recipe
 * @param isSelected - use state for if a favorited recipe has been selected
 * @param onSelect - property function to handle user selection
 */
export const FavoritesCard: React.FC<FavoritesCardProps> = 
({ recipe, isSelected, onSelect }) => 
  {
  return (
    <div
    onClick = {() => onSelect(recipe.name)}
    className={`favorites-card ${isSelected ? 'selected' : ''}`}>
      <h3 className="favorites-card-title">{recipe.name}</h3>
      <p className="favorites-card-description">{recipe.description}</p>
      
      <div className="favorites-card-section">
        <h4 className="favorites-card-section-title">Ingredients:</h4>
        <div className="favorites-card-ingredients">
          {/* map ingredients list used by recipe */}
          {recipe.ingredients.map((ing, i) => (
            <span key={i} className="favorites-card-ingredient-tag">
              {ing}
            </span>
          ))}
        </div>
      </div>
      
      <div className="favorites-card-section">
        <h4 className="favorites-card-section-title">Instructions:</h4>
        <ol className="favorites-card-instructions">
          {/* maps recipe instructions as a list element */}
          {recipe.instructions.map((step, i) => (
            <li key={i} className="favorites-card-instruction">{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};