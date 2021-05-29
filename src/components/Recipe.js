import React from "react";

const Recipe = ({ recipeData, showDetailView }) => {
  return (
    <div className='card flex-center'>
      <div>
        <img src={recipeData.images.medium} />
      </div>
      <div className='header'>{recipeData.title}</div>
      <div className='recipe-desc'>{recipeData.description}</div>
      <div>Servings: {recipeData.servings}</div>
      <div>Prep Time: {recipeData.prepTime}</div>
      <div>Cook Time: {recipeData.cookTime}</div>
      <button className='btn' onClick={() => showDetailView(recipeData)}>
        Details
      </button>
    </div>
  );
};

export default Recipe;
