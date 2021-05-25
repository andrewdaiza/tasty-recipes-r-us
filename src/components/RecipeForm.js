import React from "react";
import { useState } from "react";

const RecipeForm = () => {
  const [inputDirections, setInputDirections] = useState();
  const [inputInstructions, setInputInstructions] = useState();
  const [addDirections, setAddDirections] = useState([]);
  const [addInstructions, setAddInstructions] = useState([]);

  const handleDirections = (e) => {
    e.preventDefault();
    setAddDirections([...addDirections, inputDirections]);
    setInputDirections("");
    console.log("Log:");
  };

  const handleInstructions = (e) => {
    e.preventDefault();
    setAddDirections([...addInstructions, setAddInstructions]);
    setInputDirections("");
    console.log("Log:");
  };
  return (
    <form>
      <div>
        <label>Title</label>
        <input type='text' placeholder='Title'></input>
      </div>
      <div>
        <label>Description</label>
        <input type='text' placeholder='Description'></input>
      </div>
      <div>
        <label>Servings</label>
        <input type='text' placeholder='Servings'></input>
      </div>
      <div>
        <label>Prep Time</label>
        <input type='text' placeholder='Prep Time'></input>
      </div>
      <div>
        <label>Cook Time</label>
        <input type='text' placeholder='Servings'></input>
      </div>
      <div>
        {addInstructions && (
          <>
            <div className='header2'>Direction List:</div>
            {addInstructions.map((direction) => (
              <div>{direction}</div>
            ))}
          </>
        )}
        <label>Ingredients</label>
        <input type='text' placeholder='Servings'></input>
        <button>Add Ingredient</button>
      </div>
      <div>
        {addDirections && (
          <>
            <div className='header2'>Direction List:</div>
            {addDirections.map((direction) => (
              <div>{direction}</div>
            ))}
          </>
        )}
        <label>Directions</label>
        <input
          onChange={(e) => setInputDirections(e.target.value)}
          type='text'
          placeholder='Servings'
          value={inputDirections}
        ></input>
        <button onClick={(e) => handleDirections(e)}>Add Direction</button>
      </div>
      <input type='submit' value='Save Recipe' />
    </form>
  );
};

export default RecipeForm;
