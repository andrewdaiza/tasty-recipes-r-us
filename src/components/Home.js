import React from "react";
import { useState, useEffect } from "react";
import Recipes from "./Recipes";
import RecipeDetails from "./RecipeDetails";
import RecipeForm from "./RecipeForm";
import RecipeFormEdit from "./RecipeFormEdit";

const Home = () => {
  const [recipeData, setRecipeData] = useState();
  const [specialsData, setSpecialsData] = useState();
  const [detailView, setDetailView] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [addEditRecipeSelected, setAddEditRecipeSelected] = useState(false);
  const [toggleShowForm, setToggleShowForm] = useState(false);
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
    setRecipeData([...recipeData, data]);
  };
  // Edit Recipe
  const editRecipe = async (recipe) => {
    const res = await fetch(`http://localhost:3001/recipes/${recipe.uuid}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
    const data = await res.json();
    setRecipeData(recipeData.map((r) => (r.uuid === recipe.uuid ? recipe : r)));
    setSelectedRecipe(recipe);
  };
  const handleDetailView = (recipeData) => {
    setDetailView(!detailView);
    setSelectedRecipe(recipeData);
  };
  const handleAddButton = () => {
    setAddEditRecipeSelected(true);
    setToggleShowForm(!toggleShowForm);
  };
  const handleEditButton = () => {
    setAddEditRecipeSelected(false);
    setToggleShowForm(!toggleShowForm);
  };
  return (
    <>
      <div className='container'>
        <div className='header'>Tasty Recipes</div>
        <button onClick={() => handleAddButton()}>Add Recipe</button>
        {detailView && (
          <button onClick={() => handleEditButton()}>Edit Recipe</button>
        )}
        {toggleShowForm && (
          <>
            {recipeData && addEditRecipeSelected ? (
              <RecipeForm
                addNewRecipe={addRecipe}
                selectedRecipe={selectedRecipe}
              />
            ) : (
              <RecipeFormEdit
                editRecipe={editRecipe}
                selectedRecipe={selectedRecipe}
              />
            )}
          </>
        )}

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
