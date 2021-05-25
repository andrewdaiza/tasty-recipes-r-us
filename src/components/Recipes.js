import React from "react";
import Recipe from "./Recipe";

const Recipes = ({ recipeData, showDetailView }) => {
  return (
    <div>
      {recipeData.map((data) => (
        <Recipe
          key={data.uuid}
          recipeData={data}
          showDetailView={showDetailView}
        />
      ))}
    </div>
  );
};

export default Recipes;
