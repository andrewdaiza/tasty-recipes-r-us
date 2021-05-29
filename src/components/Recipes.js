import React from "react";
import Recipe from "./Recipe";

const Recipes = ({ recipeData, showDetailView }) => {
  return (
    <>
      {recipeData.map((data) => (
        <Recipe
          key={data.uuid}
          recipeData={data}
          showDetailView={showDetailView}
        />
      ))}
    </>
  );
};

export default Recipes;
