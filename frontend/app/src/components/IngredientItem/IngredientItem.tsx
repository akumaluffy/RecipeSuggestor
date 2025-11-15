import type { Ingredient } from '../../types';
import './IngredientItem.css';

// Props for each ingredient item
interface IngredientItemProps {
  ingredient: Ingredient; // ingredient item
  isSelected: boolean; // did user select item
  onSelect: (id: string) => void; // property function for handling user item selection
}

/**
 * 
 * @param ingredient - ingredient type
 * @param isSelected - boolean representing item selection by user
 * @param onSelect - property function for handling user item selection
 */
export const IngredientItem: React.FC<IngredientItemProps> = 
({ ingredient, isSelected, onSelect }) => 
{
  return (
    // change class name if item selected to enable different css effects
    <div
      onClick= {() => onSelect(ingredient.name)}
      className= {`ingredient-item ${isSelected ? 'selected' : ''}`}>
      <div className="ingredient-item-content">
        <span className="ingredient-item-name">{ingredient.name}</span>
      </div>
    </div>
  );
};