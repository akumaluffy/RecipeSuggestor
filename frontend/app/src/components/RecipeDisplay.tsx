import type { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';
import './RecipeDisplay.css';

// Props for recipes display
interface RecipesDisplayProps {
  recipes: Recipe[];
}

/**
 * Container for recipes, comprised of recipe cards
 * @param recipes - array of Recipe objects (types)
 */
export const RecipesDisplay: React.FC<RecipesDisplayProps> = ({ recipes }) => {
  if (recipes.length === 0) return null; // Don't render display if no recipes have been suggested yet

  return (
    <div className="recipes-display-container">
      <h2 className="recipes-display-title">Suggested Recipes</h2>
      <div className="recipes-display-grid">
        {/* maps each recipe item to a recipe card within recipe display*/}
        {recipes.map((recipe, index) => ( 
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};
