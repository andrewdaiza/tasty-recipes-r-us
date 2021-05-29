import React from "react";
import Ingredients from "./Ingredients";
import Directions from "./Directions";
import ListItems from "./ListItems";
import { v4 as uuidv4 } from "uuid";

const RecipeDetails = ({ selectedRecipe, specialsData }) => {
  return (
    <div className='flex-center recipe-details'>
      <img src={selectedRecipe.images.medium} />
      <div className='header2'>{selectedRecipe.title}</div>
      <div>{selectedRecipe.description}</div>
      <div className='header3'>Ingredients:</div>
      <ul>
        {selectedRecipe.ingredients.map((ingredient) => (
          <ListItems
            key={ingredient.uuid}
            param={ingredient}
            specialsData={specialsData}
          />
        ))}
      </ul>

      <div className='header3'>Directions:</div>
      <ol>
        {selectedRecipe.directions.map((direction) => (
          <ListItems key={uuidv4()} param={direction} />
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetails;
