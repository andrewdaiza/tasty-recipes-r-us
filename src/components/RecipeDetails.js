import React from "react";
import Ingredients from "./Ingredients";
import Directions from "./Directions";

const RecipeDetails = ({ selectedRecipe, specialsData }) => {
  return (
    <div className='flex-center'>
      <img src={selectedRecipe.images.medium} />
      <div className='header'>{selectedRecipe.title}</div>
      <div>{selectedRecipe.description}</div>
      <div className='header'>Ingredients:</div>
      <ul>
        {selectedRecipe.ingredients.map((ingredient, index) => (
          <Ingredients
            key={ingredient.uuid}
            ingredient={ingredient}
            num={index}
            specialsData={specialsData}
          />
        ))}
      </ul>

      <div className='header'>Directions:</div>
      <ol>
        {selectedRecipe.directions.map((direction) => (
          <Directions key={direction.uuid} direction={direction} />
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetails;
