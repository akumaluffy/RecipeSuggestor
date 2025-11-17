import { useState, useEffect } from 'react';
import type { Ingredient, Recipe, RecipeRequest } from '../types';
import { InputForm } from '../components/InputForm';
import { IngredientsList } from '../components/IngredientsList';
import { RecipesDisplay } from '../components/RecipeDisplay';
import { FavoritesDisplay } from '../components/FavoritesDisplay';
import { fetchRecipes, fetchFavorites, addFavorite, removeFavorite, clearFavorites } from '../services/api';
import './RecipeFinderContainer.css';

export const RecipeFinderContainer = () => {

  // user ingredient input value variable
  const [inputValue, setInputValue] = useState<string>('');

  // ingredients list and selected ingredient variables
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);

  // recipes list and selected recipe variables
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);

  // favorites Recipe list and selected favorite variables
  const [favorites, setFavorites] = useState<Recipe[]>([]); // locally cache recipes found within favorites for faster loading after initial fetch
  const [selectedFavorite, setSelectedFavorite] = useState<string | null>(null);

  // load state and error state variables
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFavorites = async() => {
      try {
        const favoritesData = await fetchFavorites();
        setFavorites(favoritesData);
      } catch (error) {
        console.error('Error loading favorites: ', error);
      }
    };
    loadFavorites();
  }, []); // ensures loading only occurs once


  // handlers for input (ingredient) form
  // handles user input (ingredient) value changes
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  // adds ingredients from input form to ingredients list 
  const handleAddIngredient = () => {
    const addIngredient = inputValue.trim();
    if (addIngredient) {
      const alreadyAdded = ingredientsList.some(ing => ing.name === addIngredient)
      if (!alreadyAdded) {
        const newIngredient: Ingredient = {
          name: addIngredient,
        };
        setIngredientsList(prev => [...prev, newIngredient]);
        setInputValue('');
      }
    }
  };

  // handlers for ingredients list

  // removes ingredients from ingredients list and updates ingredients list
  const handleRemoveIngredient = () => {
    if (selectedIngredient) {
      setIngredientsList(prev => prev.filter(ing => ing.name !== selectedIngredient));
      setSelectedIngredient(null);
    }
  };

  // handler for selected ingredient
  const handleSelectIngredient = (id: string) => {
    setSelectedIngredient(prev => prev === id ? null : id);
  };

  // submits ingredients to send as prompt for openai api call
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
      console.error('Error fetching recipes: ', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch recipes');
    } finally {
      setIsLoading(false); // update loading state to false after submission is complete
    }
  };
  
  // handles user recipe selection
  const handleSelectRecipe = (id: string) => {
    setSelectedRecipe(prev => prev === id ? null : id);
  }

  // adds selected recipe from recipes list to favorites
  const handleFavorite = async () => {
    if (selectedRecipe) {
      // find the selected recipe object from the current recipes list
      const recipeToFavorite = recipes.find(recipe => recipe.name === selectedRecipe);
      if (recipeToFavorite) {
        const alreadyFavorited = favorites.some(recipe => recipe.name === recipeToFavorite.name);
        if (!alreadyFavorited) {
          try {
            setIsLoading(true);
            await addFavorite(recipeToFavorite);
            setFavorites(prev => [...prev, recipeToFavorite]);
          } catch (error) {
            console.error('Error adding favorite: ', error);
            setError(error instanceof Error ? error.message : 'Failed to add favorite');
          } finally {
            setIsLoading(false);
          }
        }
      }
    }
  }

  // handler functions for favorites section
  // handles user selection of favorited recipe
  const handleSelectFavorite = (id: string) => {
    setSelectedFavorite(prev => prev === id ? null : id);
  };

  // removes selected recipe from favorites list
  const handleRemoveFavorite = async () => {
    if (selectedFavorite) {
      try {
        setIsLoading(true);
        await removeFavorite(selectedFavorite);
        setFavorites(prev => prev.filter(recipe => recipe.name !== selectedFavorite));
        setSelectedFavorite(null); // undo select after adding
      } catch (error) {
        console.error('Error removing favorite: ', error);
        setError(error instanceof Error ? error.message : 'Failed to remove favorite');
      } finally {
        setIsLoading(false);
      }
    }
  }

  // clears all recipes from favorites list
  const handleClearFavorites = async () => {
    try {
      setIsLoading(true);
      await clearFavorites();
      setFavorites([]);
      setSelectedFavorite(null);
    } catch (error) {
      console.error('Error clearing favorites: ', error);
      setError(error instanceof Error ? error.message : 'Failed to clear favorites ');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="recipe-finder-inputs-section">
          <InputForm
            value={inputValue}
            onChange={handleInputChange}
            onAdd={handleAddIngredient}
          />
      </div>
      <div className="recipe-finder-ingredients-section">
          <IngredientsList
            ingredients={ingredientsList}
            selectedIngredient={selectedIngredient}
            isLoading={isLoading}
            onSelectIngredient={handleSelectIngredient}
            onRemove={handleRemoveIngredient}
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
