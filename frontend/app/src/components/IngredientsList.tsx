import React from 'react';
import type { Ingredient } from '../types';
import { IngredientItem } from './IngredientItem';
import './IngredientsList.css';

// Props for ingredients list
interface IngredientsListProps {
  ingredients: Ingredient[]; // list of ingredient components
  selectedIngredient: string | null; // string of selected ingredient
  isLoading: boolean; // recipe loading state
  onSelectIngredient: (id: string) => void; // property function for handling user ingredient select
  onRemove: () => void; // button fx for removing
  onSubmit: () => void; // 
}

export const IngredientsList: React.FC<IngredientsListProps> = 
  ({ ingredients, selectedIngredient, isLoading, onSelectIngredient, onRemove, onSubmit }) => {
  return (
    <div className="ingredients-list-container">
      <h2 className="ingredients-list-title">Your Ingredients</h2>
      
      {/* change container and class depending on if ingredients have been added */}
      {ingredients.length === 0 ? 

      // empty ingredients list
      ( <p className="ingredients-list-empty">No ingredients added yet</p>) : 
      (
      // ingredients in list
        <>
          <div className="ingredients-list-items">
            {ingredients.map(ingredient => 
            (<IngredientItem key={ingredient.id} ingredient={ingredient} 
              isSelected={selectedIngredient === ingredient.id} onSelect={onSelectIngredient}/>))}
          </div>

          {/* handle submit, disable submit button if loading */}
          <div className="ingredients-list-actions">
            <button onClick={onSubmit} disabled={isLoading} className="ingredients-list-button ingredients-list-button-primary">
              {/* Finding recipes if button clicked, else name button "Find Recipes" */}
              {isLoading ? (<>Finding Recipes...</>) : 
              ('Find Recipes')}
            </button>
            
            {/* remove button to remove ingredients from list, disable button if ingredient not selected */}
            <button onClick={onRemove} disabled={!selectedIngredient}
            className="ingredients-list-button ingredients-list-button-secondary">
              Remove Selected
            </button>
          </div>
        </>
      )
      }
    </div>
  );
};