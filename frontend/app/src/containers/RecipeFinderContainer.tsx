import { useState } from 'react';
import type { Ingredient, Recipe, RecipeRequest } from '../types';
import { InputForm } from '../components/InputForm';
import { IngredientsList } from '../components/IngredientsList';
import { RecipesDisplay } from '../components/RecipeDisplay';
import { FavoritesDisplay } from '../components/FavoritesDisplay';
import { fetchRecipes } from '../services/api';
import './RecipeFinderContainer.css';

export const RecipeFinderContainer = () => {

  const [inputValue, setInputValue] = useState<string>('');

  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);

  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [selectedFavorite, setSelectedFavorite] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // handlers for input (ingredient) form
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };


  const handleAdd = () => {
    const value = inputValue.trim();
    if (value) {
      const newIngredient: Ingredient = {
        name: value,
      };
      setIngredientsList(prev => [...prev, newIngredient]);
      setInputValue('');
    }
  };

  // handlers for ingredients list
  const handleRemove = () => {
    if (selectedIngredient) {
      setIngredientsList(prev => prev.filter(ing => ing.name !== selectedIngredient));
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
      // takes ingredient names and wraps in a RecipeRequest object for request
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
  
  const handleSelectRecipe = (id: string) => {
    setSelectedRecipe(prev => prev === id ? null : id);
  }

  const handleFavorite = () => {
    if (selectedRecipe) {
      // Find the selected recipe object from the current recipes list
      const recipeToFavorite = recipes.find(recipe => recipe.name === selectedRecipe);
      if (recipeToFavorite) {
        setFavorites(prev => {
          const alreadyFavorited = prev.some(r => r.name === recipeToFavorite.name);
          return alreadyFavorited ? prev : [...prev, recipeToFavorite];
        });
      }
    }
  }

  // handler functions for favorites section
  const handleSelectFavorite = (id: string) => {
    setSelectedFavorite(prev => prev === id ? null : id);
  };

  const handleRemoveFavorite = () => {
    if (selectedFavorite) {
      setFavorites(prev => prev.filter(recipe => recipe.name !== selectedFavorite));
      setSelectedFavorite(null);
    }
  }

  const handleClearFavorites = () => {
    setFavorites([]);
    setSelectedFavorite(null);
  }

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

      {/* error message if api call fails */}
      {error && (
        <div className="error-message">
          <p> {error} </p>
        </div>
      )}

      {!isLoading && !error && 
      <RecipesDisplay 
        recipes={recipes} 
        selectedRecipe={selectedRecipe}
        isLoading={isLoading}
        onSelectRecipe={handleSelectRecipe}
        onFavorite={handleFavorite}
      />}

      <div className="recipe-finder-favorites-section">
        <FavoritesDisplay 
        recipes={favorites}
        selectedFavorite={selectedFavorite}
        isLoading={isLoading}
        onSelectFavorite={handleSelectFavorite}
        onRemove={handleRemoveFavorite}
        onClear={handleClearFavorites}
        />
      </div>
    </>
  );
};
