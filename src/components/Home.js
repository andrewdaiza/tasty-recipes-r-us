import React from "react";
import { useState, useEffect } from "react";
import Recipes from "./Recipes";

const Home = () => {
  const [recipeData, setRecipeData] = useState();
  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const recipesFromAPI = await fetchRecipes();
    setRecipeData(recipesFromAPI);
  };

  // Fetch Recipes
  const fetchRecipes = async () => {
    const res = await fetch("http://localhost:3001/recipes");
    const data = await res.json();
    return data;
  };
  return (
    <>
      <div className='container'>
        {recipeData && <Recipes recipeData={recipeData} />}
      </div>
    </>
  );
};

export default Home;
