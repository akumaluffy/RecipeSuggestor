import type { Ingredient } from '../types';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '../constants/categories.ts';
import './IngredientItem.css';

interface IngredientItemProps {
  ingredient: Ingredient;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const IngredientItem: React.FC<IngredientItemProps> = ({
  ingredient,
  isSelected,
  onSelect
}) => {
  return (
    <div
      onClick={() => onSelect(ingredient.id)}
      className={`ingredient-item ${isSelected ? 'selected' : ''}`}
    >
      <div className="ingredient-item-content">
        <span className="ingredient-item-name">{ingredient.name}</span>
        <span className={`ingredient-item-tag ${CATEGORY_COLORS[ingredient.category]}`}>
          {CATEGORY_LABELS[ingredient.category]}
        </span>
      </div>
    </div>
  );
};