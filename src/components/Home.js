import React from "react";
import { useState, useEffect } from "react";
import Recipes from "./Recipes";
import RecipeDetails from "./RecipeDetails";
import RecipeForm from "./RecipeForm";
import RecipeFormEdit from "./RecipeFormEdit";
import Loading from "./Loading";

const Home = () => {
  const [recipeData, setRecipeData] = useState([]);
  const [specialsData, setSpecialsData] = useState([]);
  const [detailView, setDetailView] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [addEditRecipeSelected, setAddEditRecipeSelected] = useState(false);
  const [toggleShowForm, setToggleShowForm] = useState(false);
  const [toggleShowLoading, setToggleShowLoading] = useState(true);

  // Get data from API on Mount
  useEffect(() => {
    getRecipes();
    getSpecials();
  }, []);

  // Get data from API fetch
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
    const res = await fetch("https://recipe-json-api.herokuapp.com/recipes");
    const data = await res.json();
    setToggleShowLoading(false);
    return data;
  };
  // Fetch Specials
  const fetchSpecials = async () => {
    const res = await fetch("https://recipe-json-api.herokuapp.com/specials");
    const data = await res.json();
    return data;
  };
  // Add Recipe
  const addRecipe = async (recipe) => {
    const res = await fetch("https://recipe-json-api.herokuapp.com/recipes", {
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
    const res = await fetch(
      `https://recipe-json-api.herokuapp.com/recipes/${recipe.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(recipe),
      }
    );
    const data = await res.json();
    setRecipeData(recipeData.map((r) => (r.id === recipe.id ? data : r)));
    setSelectedRecipe(data);
  };
  // Display Detail View
  const handleDetailView = (recipeData) => {
    setDetailView(!detailView);
    setSelectedRecipe(recipeData);
    setToggleShowForm(false);
  };
  // Display Recipe View
  const handleBackButton = () => {
    setDetailView(!detailView);
    setToggleShowForm(false);
  };
  // Display Add Form
  const handleAddButton = () => {
    setAddEditRecipeSelected(true);
    setToggleShowForm(!toggleShowForm);
  };
  // Display Edit Form
  const handleEditButton = () => {
    setAddEditRecipeSelected(false);
    setToggleShowForm(!toggleShowForm);
  };
  return (
    <>
      <div className='container'>
        {detailView && (
          <button className='btn btn-back' onClick={() => handleBackButton()}>
            Back
          </button>
        )}
        <div className='flex-center'>
          <div className='header'>Tasty Recipes R Us</div>
          <div>
            <button className='btn' onClick={() => handleAddButton()}>
              Add Recipe
            </button>
            {detailView && (
              <button className='btn' onClick={() => handleEditButton()}>
                Edit Recipe
              </button>
            )}
          </div>
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
                  toggleEditView={handleEditButton}
                />
              )}
            </>
          )}
          {toggleShowLoading && <Loading />}

          <div className='flex-recipes'>
            {detailView ? (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
