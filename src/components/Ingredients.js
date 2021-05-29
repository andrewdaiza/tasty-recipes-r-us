import React from "react";
import Special from "./Special";

const Ingredients = ({ ingredient, specialsData }) => {
  return (
    <>
      <li>
        <span>
          {ingredient.amount}
          <span> {ingredient.measurement} </span>
        </span>
        {ingredient.name}
      </li>
    </>
  );
};

export default Ingredients;
