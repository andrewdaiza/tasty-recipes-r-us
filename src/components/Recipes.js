import React from "react";
import Recipe from "./Recipe";

const Recipes = ({ recipeData }) => {
  return (
    <div>
      {recipeData.map((data) => (
        <Recipe key={data.uuid} recipeData={data} />
      ))}
    </div>
  );
};

export default Recipes;
