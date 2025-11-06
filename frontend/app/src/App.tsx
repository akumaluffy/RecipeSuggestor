// import { useState } from 'react'
import './App.css';
import { Header } from './components/Header.tsx';
import { RecipeFinderContainer } from './containers/RecipeFinderContainer.tsx';

function App() {
  return (
    <div className = "app-container"> 
      <div className = "app-content">
        <Header />
        <RecipeFinderContainer />
      </div>
    </div>
  )
}

export default App