import React from "react";

const Recipe = ({ recipeData }) => {
  return (
    <div className='card'>
      <div className='header'>{recipeData.title}</div>
      <div>{recipeData.description}</div>
      <div>
        <img src={recipeData.images.small} />
      </div>
      <div>{recipeData.title}</div>
    </div>
  );
};

export default Recipe;
