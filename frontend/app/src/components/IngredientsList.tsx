import React from 'react';
import type { Ingredient } from '../types';
import { IngredientItem } from './IngredientItem';
import './IngredientsList.css';

interface IngredientsListProps {
  ingredients: Ingredient[];
  selectedIngredient: string | null;
  isLoading: boolean;
  onSelectIngredient: (id: string) => void;
  onRemove: () => void;
  onSubmit: () => void;
}

export const IngredientsList: React.FC<IngredientsListProps> = ({
  ingredients,
  selectedIngredient,
  isLoading,
  onSelectIngredient,
  onRemove,
  onSubmit
}) => {
  return (
    <div className="ingredients-list-container">
      <h2 className="ingredients-list-title">Your Ingredients</h2>
      
      {ingredients.length === 0 ? (
        <p className="ingredients-list-empty">No ingredients added yet</p>
      ) : (
        <>
          <div className="ingredients-list-items">
            {ingredients.map(ingredient => (
              <IngredientItem
                key={ingredient.id}
                ingredient={ingredient}
                isSelected={selectedIngredient === ingredient.id}
                onSelect={onSelectIngredient}
              />
            ))}
          </div>

          <div className="ingredients-list-actions">
            <button
              onClick={onSubmit}
              disabled={isLoading}
              className="ingredients-list-button ingredients-list-button-primary"
            >
              {isLoading ? (
                <>
                  Finding Recipes...
                </>
              ) : (
                'Find Recipes'
              )}
            </button>
            
            <button
              onClick={onRemove}
              disabled={!selectedIngredient}
              className="ingredients-list-button ingredients-list-button-secondary"
            >
              Remove Selected
            </button>
          </div>
        </>
      )}
    </div>
  );
};