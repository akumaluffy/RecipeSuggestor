from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes_openai import router as openai_router
from app.api.routes_favorites import router as favorites_router
from app.services.favorites_database import init_database


app = FastAPI()

# initialize database on startup
@app.on_event("startup")
async def startup_event():
    init_database()


# CORS so React frontend can call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# include routes
app.include_router(openai_router, prefix="/api/openai", tags=["OpenAI"])
app.include_router(favorites_router, prefix="/api/favorites", tags=["Favorites"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Recipe Suggestors App"}