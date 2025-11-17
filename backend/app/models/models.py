from pydantic import BaseModel
from typing import List

class RecipeRequest(BaseModel):
    ingredients: List[str]

# Response from openai llm, each recipe is contained within a RecipeResponse object
class RecipeResponse(BaseModel):
    name: str
    description: str
    ingredients: List[str]
    instructions: List[str]