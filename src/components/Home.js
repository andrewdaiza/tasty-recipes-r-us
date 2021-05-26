import React from "react";
import { useState, useEffect } from "react";
import Recipes from "./Recipes";
import RecipeDetails from "./RecipeDetails";
import RecipeForm from "./RecipeForm";

const Home = () => {
  const [recipeData, setRecipeData] = useState();
  const [specialsData, setSpecialsData] = useState();
  const [detailView, setDetailView] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState();
  useEffect(() => {
    getRecipes();
    getSpecials();
  }, []);

  const getRecipes = async () => {
    const recipesFromAPI = await fetchRecipes();
    setRecipeData(recipesFromAPI);
  };
  const getSpecials = async () => {
    const specialsFromAPI = await fetchSpecials();
    setSpecialsData(specialsFromAPI);
  };

  // Fetch Recipes
  const fetchRecipes = async () => {
    const res = await fetch("http://localhost:3001/recipes");
    const data = await res.json();
    return data;
  };
  // Fetch Specials
  const fetchSpecials = async () => {
    const res = await fetch("http://localhost:3001/specials");
    const data = await res.json();
    return data;
  };
  // Add Recipe
  const addRecipe = async (recipe) => {
    const res = await fetch("http://localhost:3001/recipes", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
    const data = await res.json();
    console.log(data);
    setRecipeData([...recipeData, data]);
  };
  const handleDetailView = (recipeData) => {
    setDetailView(!detailView);
    setSelectedRecipe(recipeData);
  };
  console.log(recipeData);
  return (
    <>
      <div className='container'>
        {recipeData && <RecipeForm addNewRecipe={addRecipe} />}
        {recipeData &&
          (detailView ? (
            <RecipeDetails
              key={selectedRecipe.uuid}
              selectedRecipe={selectedRecipe}
              specialsData={specialsData}
            />
          ) : (
            <Recipes
              recipeData={recipeData}
              showDetailView={handleDetailView}
            />
          ))}
      </div>
    </>
  );
};

export default Home;
