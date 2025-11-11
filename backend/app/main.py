from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes_openai import router as openai_router


app = FastAPI()

# CORS so React frontend can call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#include routes
app.include_router(openai_router, prefix="/api/openai", tags=["OpenAI"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Recipe Suggestors App"}