import React from 'react';
import type { Ingredient } from '../../types';
import { IngredientItem } from '../IngredientItem';
import './IngredientsList.css';

interface IngredientsListProps {
  ingredients: Ingredient[];
  selectedIngredient: string | null;
  isLoading: boolean;
  onSelectIngredient: (id: string) => void;
  onRemove: () => void;
  onSubmit: () => void; 
}

/**
 * container for list of ingredients added by user
 * @param ingredients - list of ingredients in the list
 * @param selectedIngredient - ingredient that has been selected
 * @param isLoading - load state handling to prevent additional user actions
 * @param onSelectIngredient - property function for handling user ingredient select
 * @param onRemove - button function for remove
 * @param onSubmit - buttion function for sending ingredients to ai
 */
export const IngredientsList: React.FC<IngredientsListProps> = 
({ ingredients, selectedIngredient, isLoading, onSelectIngredient, onRemove, onSubmit }) => 
{
  return (
    <div className="ingredients-list-container">
      <h2 className="ingredients-list-title">Your Ingredients</h2>
      
      {/* empty container if no ingredients, prevents user submission */}
      {ingredients.length === 0 ? 
      ( <p className="ingredients-list-empty">No ingredients added yet</p>) : 

      /* fill container with ingredients and buttons if list not empty */
      (
        <>
          <div className="ingredients-list-items">
            {ingredients.map(ingredient => 
            (<IngredientItem key={ingredient.name} ingredient={ingredient} 
              isSelected={selectedIngredient === ingredient.name} onSelect={onSelectIngredient}/>))}
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