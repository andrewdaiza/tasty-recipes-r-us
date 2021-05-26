import React from "react";

const Recipe = ({ recipeData, showDetailView }) => {
  return (
    <div
      onClick={() => showDetailView(recipeData)}
      className='card flex-center'
    >
      <div>
        <img src={recipeData.images.small} />
      </div>
      <div className='header'>{recipeData.title}</div>
      <div>{recipeData.description}</div>

      <div>Servings: {recipeData.servings}</div>
      <div>Prep Time: {recipeData.prepTime}</div>
      <div>Cook Time: {recipeData.cookTime}</div>
    </div>
  );
};

export default Recipe;
