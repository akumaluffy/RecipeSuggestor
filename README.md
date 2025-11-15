# RecipeSuggestor

A webapp that uses AI to generate recipe suggestions based on ingredients that the user currently has on hand.

## Features

- **Ingredients Manager**: Add and remove ingredients you have on hand
- **AI-Powered Recipe Generator**: Get 4 recipe suggestions from OpenAI's GPT-5-nano model
- **Favorites**: Add or remove your favorite recipes to be saved in a local database

## Tech Stack

### Backend

- **FastAPI** - Modern Python web framework
- **OpenAI API** - For recipe generation
- **SQLite** - Local database for storing favorites
- **Uvicorn** - ASGI server
- **Python 3.10**

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

## Prerequisites
- **Python 3.10** (required version)
- **Node.js** (v16 or higher recommended)
- **npm** or **yarn** (comes with Node.js)
- **OpenAI API Key** - Get one from [OpenAI](https://platform.openai.com/api-keys)

## Run Instructions

1. git clone <https://github.com/akumaluffy/RecipeSuggestor>

### Backend

1. Navigate to backend directory
2. Create a virtual environment:
    - **Mac**:
        - python3.10 -m venv venv
        - source ./venv/bin/activate
    - **Windows**:
        - python3.10 -m venv venv
        - venv\Scripts\activate
3. Install dependencies:
    - pdm install

### Frontend

1. Navigate to frontend directory
2. Install dependencies:
    - npm install

### Environment Variables

1. Create a `.env` file within the `backend` directory:
2. Add OpenAI API key to the `.env` file using the following formatting:
    - OPENAI_API_KEY=your_openai_api_key

## Run

1. Have 2 terminals to run both frontend and backend servers simultaneously
2. Terminal 1:
    - Navigate to frontend/app/
    - npm run dev
3. Terminal 2:
    - Navigate to backend/
    - pdm run dev
4. Open application in browser using the following: `http://localhost:5173`