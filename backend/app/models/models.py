from pydantic import BaseModel
from typing import List

class RecipeRequest(BaseModel):
    ingredients: List[str]

class RecipeResponse(BaseModel):
    name: str
    description: str
    ingredients: List[str]
    instructions: List[str]