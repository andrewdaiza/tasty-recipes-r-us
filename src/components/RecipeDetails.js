import React from "react";
import ListItems from "./ListItems";
import { v4 as uuidv4 } from "uuid";

const RecipeDetails = ({ selectedRecipe, specialsData }) => {
  return (
    <div className='flex-center recipe-details'>
      <img
        className='details-img'
        src={selectedRecipe.images.full}
        alt='large preview of recipe item'
      />
      <div className='header2'>{selectedRecipe.title}</div>
      <div className='details-desc'>{selectedRecipe.description}</div>
      <div className='flex-small details-items-container'>
        <div className='details-items'>
          <span>Servings: </span>
          <span>{selectedRecipe.servings}</span>
        </div>

        <div className='details-items'>
          <span>Prep Time: </span>
          <span>{selectedRecipe.prepTime} Minutes</span>
        </div>
        <div className='details-items'>
          <span>Cook Time: </span>
          <span>{selectedRecipe.cookTime} Minutes</span>
        </div>
      </div>
      <div className='header3 margin-top'>Ingredients:</div>
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
