import type { Recipe } from '../../types';
import { RecipeCard } from '../RecipeCard';
import './RecipesDisplay.css';

// Props for recipes display
interface RecipesDisplayProps {
  recipes: Recipe[];
  selectedRecipe: string | null;
  isLoading: boolean;
  onSelectRecipe: (id: string) => void;
  onFavorite: () => void;
}

/**
 * Container for recipes, comprised of recipe cards
 * @param recipes - array of Recipe objects (types)
 * @param selectedRecipe - recipe that has been selected
 * @param isLoading - load state handling to prevent additional user actions
 * @param onSelectRecipe - property function for handling user recipe selection
 * @param onFavorite - button function for adding selected recipe to favorites
 */
export const RecipesDisplay: React.FC<RecipesDisplayProps> = 
({ recipes, selectedRecipe, isLoading, onSelectRecipe, onFavorite}) => 
{
  if (recipes.length === 0) return null; // Don't render display if no recipes have been suggested yet

  return (
    <div className="recipes-display-container">
      <h2 className="recipes-display-title"> Suggested Recipes </h2>
      <div className="recipes-display-grid">
        {/* maps each recipe item to a recipe card within recipe display*/}
        {recipes.map((recipe, index) => ( 
          <RecipeCard key={index} recipe={recipe} 
          isSelected={selectedRecipe === recipe.name}
          onSelect={onSelectRecipe}/>))}
      </div>

      <div className="recipes-display-actions">
        <button onClick={onFavorite} disabled={isLoading}
        className = "recipes-display-button recipes-display-button-primary">
          Favorite
        </button>
      </div>
    </div>
  );
};
