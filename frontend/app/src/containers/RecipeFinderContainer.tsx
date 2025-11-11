import { useState } from 'react';
import type { Ingredient, Recipe, RecipeRequest } from '../types';
import { InputForm } from '../components/InputForm';
import { IngredientsList } from '../components/IngredientsList';
import { RecipesDisplay } from '../components/RecipeDisplay.tsx';
import { fetchRecipes } from '../services/api';
import './RecipeFinderContainer.css';

export const RecipeFinderContainer = () => {
  const [inputValue, setInputValue] = useState<string>('');
  
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleAdd = () => {
    const value = inputValue.trim();
    if (value) {
      const newIngredient: Ingredient = {
        id: `ingredient-${Date.now()}`,
        name: value,
      };
      setIngredientsList(prev => [...prev, newIngredient]);
      setInputValue('');
    }
  };

  const handleRemove = () => {
    if (selectedIngredient) {
      setIngredientsList(prev => prev.filter(ing => ing.id !== selectedIngredient));
      setSelectedIngredient(null);
    }
  };

  const handleSelectIngredient = (id: string) => {
    setSelectedIngredient(prev => prev === id ? null : id);
  };

  const handleSubmit = async () => {
    if (ingredientsList.length === 0) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Extract ingredient names and wrap them in a RecipeRequest object
      const ingredientNames: string[] = ingredientsList.map(ing => ing.name);
      const request: RecipeRequest = { ingredients: ingredientNames };
      const recipesData: Recipe[] = await fetchRecipes(request);
      
      setRecipes(recipesData);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch recipes');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="recipe-finder-inputs-section">
          <InputForm
            value={inputValue}
            onChange={handleInputChange}
            onAdd={handleAdd}
          />
      </div>
      <div className="recipe-finder-ingredients-section">
          <IngredientsList
            ingredients={ingredientsList}
            selectedIngredient={selectedIngredient}
            isLoading={isLoading}
            onSelectIngredient={handleSelectIngredient}
            onRemove={handleRemove}
            onSubmit={handleSubmit}
          />
      </div>

      {isLoading && (
        <div className="loading-message">
          <p>Finding recipes for you...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p> {error} </p>
        </div>
      )}

      {!isLoading && !error && <RecipesDisplay recipes={recipes} />}
    </>
  );
};
