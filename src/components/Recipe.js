import React from "react";

const Recipe = ({ recipeData, showDetailView }) => {
  return (
    <div className='card flex-center'>
      <div>
        <img
          className='recipe-img'
          src={recipeData.images.medium}
          alt='medium preview of recipe item'
        />
      </div>
      <div className='header3'>{recipeData.title}</div>
      <div className='recipe-desc'>{recipeData.description}</div>
      <div className='recipe-items'>{recipeData.servings} Servings</div>
      <div className='flex-row'>
        <div className='recipe-items'>{recipeData.prepTime} Min Prep</div>
        <div className='recipe-items'>{recipeData.cookTime} Min Cook</div>
      </div>
      <button
        className='btn margin-top'
        onClick={() => showDetailView(recipeData)}
      >
        Details
      </button>
    </div>
  );
};

export default Recipe;
