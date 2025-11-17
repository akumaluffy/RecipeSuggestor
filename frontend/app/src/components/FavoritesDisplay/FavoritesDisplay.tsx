import type { Recipe } from '../../types';
import { FavoritesCard } from '../FavoritesCard';
import './FavoritesDisplay.css';

interface FavoritesDisplayProps {
    recipes: Recipe[];
    selectedFavorite: string | null;
    isLoading: boolean;
    onSelectFavorite: (id: string) => void;
    onRemove: () => void;
    onClear: () => void;
}

/**
 * container for displaying favorited recipes
 * @param recipes - list of Recipe types
 * @param selectedFavorite - favorited recipe that has been selected
 * @param isLoading - load state handling to prevent additional user actions
 * @param onSelectFavorite - property function for handling user selection
 * @param onRemove - button function for handling removal of favorited recipes
 * @param onClear - button function for clearing all favorites from list
 */
export const FavoritesDisplay: React.FC<FavoritesDisplayProps> = 
({ recipes, selectedFavorite, isLoading, onSelectFavorite, onRemove, onClear}) => 
{
  return (
    <div className="favorites-display-container">
      <h2 className="favorites-display-title"> Favorite Recipes </h2>
        {recipes.length===0 ? 
        ( <p className="favorites-display-empty">Currently Empty</p>) : 
        (
        /* fill container with ingredients and buttons if not empty */
          <>
            <div className="favorites-display-grid">
              {recipes.map(recipe => (
                <FavoritesCard key={recipe.name} recipe={recipe} 
                isSelected={selectedFavorite === recipe.name} 
                onSelect={onSelectFavorite}/>
              ))}
            </div>

            <div className="favorites-display-actions">
              <button onClick={onClear} disabled={isLoading}
              className="favorites-display-button favorites-display-button-primary">
                Clear
              </button>

              <button onClick={onRemove} disabled={!selectedFavorite}
              className="favorites-display-button favorites-display-button-secondary">
                Remove Favorite
              </button>
            </div>
          </>
        )
        }
    </div>
  );
};