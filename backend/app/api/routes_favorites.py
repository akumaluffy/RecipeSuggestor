from fastapi import APIRouter, HTTPException
from app.services.favorites_database import (get_all_favorites, add_favorite, remove_favorites, clear_all_favorites)
from app.models import RecipeResponse
from typing import List

router = APIRouter()

@router.get("/", response_model=List[RecipeResponse])
async def get_favorites():
    try:
        favorites = get_all_favorites()
        return [RecipeResponse(**fav) for fav in favorites]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch favorites: {str(e)}")

@router.post("/", response_model=RecipeResponse)
async def add_favorite_recipe(recipe: RecipeResponse): 
    try:
        recipe_dict = recipe.dict()
        success = add_favorite(recipe_dict)
        if not success:
            raise HTTPException(status_code=400, details="Recipe already in favorites")
        return recipe
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to add favorite: {str(e)}")

@router.delete("/{recipe_name}")
async def remove_favorite_recipe(recipe_name: str):
    try:
        success = remove_favorites(recipe_name)
        if not success:
            raise HTTPException(status_code=400, detail="recipe not found in favorites")
        return {"message": "Recipe removed from favorites"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to remove favorite: {str(e)}")

@router.delete("/")
async def clear_favorites():
    """Clear all favorites"""
    try:
        count = clear_all_favorites()
        return {"message": f"Cleared {count} favorite(s)"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to clear favorites: {str(e)}")