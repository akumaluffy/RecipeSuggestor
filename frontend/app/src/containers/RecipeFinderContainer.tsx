import { useState } from 'react';
import type { Ingredient, Recipe } from '../types';
import { InputForm } from '../components/InputForm';
import { IngredientsList } from '../components/IngredientsList';
import { RecipesDisplay } from '../components/RecipeDisplay.tsx';
import './RecipeFinderContainer.css';

export const RecipeFinderContainer = () => {
  const [inputValue, setInputValue] = useState<string>('');
  
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    
    try {
      // Replace with actual FastAPI endpoint
      // const response = await fetch('http://localhost:8000/api/recipes', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ingredients: ingredientsList.map(i => i.name) })
      // });
      // const data = await response.json();
      // setRecipes(data.recipes);
      
      // Mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 1500));
      setRecipes([
        {
          name: 'Mediterranean Delight',
          description: 'A fresh and healthy dish combining your selected ingredients',
          ingredients: ingredientsList.map(i => i.name),
          instructions: [
            'Prepare all ingredients by washing and chopping as needed',
            'Heat a large pan over medium heat',
            'Cook proteins until golden brown',
            'Add vegetables and sauté until tender',
            'Season with spices and finish with sauces',
            'Serve hot and enjoy!'
          ]
        },
        {
          name: 'Quick Stir-Fry',
          description: 'A fast and flavorful option using your ingredients',
          ingredients: ingredientsList.map(i => i.name),
          instructions: [
            'Heat wok or large pan on high heat',
            'Quickly cook proteins until done',
            'Toss in vegetables and stir continuously',
            'Add spices and sauces',
            'Serve over rice or noodles'
          ]
        }
      ]);
    } catch (error) {
      console.error('Error fetching recipes:', error);
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

      <RecipesDisplay recipes={recipes} />
    </>
  );
};
