import React from "react";
import ListItems from "./ListItems";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const RecipeForm = ({ editRecipe, selectedRecipe }) => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [inputServings, setInputServings] = useState("");
  const [inputPrep, setInputPrep] = useState("");
  const [inputCook, setInputCook] = useState("");
  const [inputDirections, setInputDirections] = useState("");
  const [inputDirectionsOptional, setInputDirectionsOptional] = useState(false);
  const [inputIngredients, setInputIngredients] = useState("");
  const [inputIngredientsAmount, setInputIngredientsAmount] = useState("");
  const [inputIngredientsMeasurement, setInputIngredientsMeasurement] =
    useState("");
  const [addDirections, setAddDirections] = useState([]);
  const [addIngredients, setAddIngredients] = useState([]);
  const [postDate, setPostDate] = useState("");

  useEffect(() => {
    editForm();
  }, []);

  // Populate Form
  const editForm = () => {
    if (selectedRecipe) {
      setInputTitle(selectedRecipe.title);
      setInputDesc(selectedRecipe.description);
      setInputServings(selectedRecipe.servings);
      setInputPrep(selectedRecipe.prepTime);
      setInputCook(selectedRecipe.cookTime);
      setAddIngredients(selectedRecipe.ingredients);
      setAddDirections(selectedRecipe.directions);
      setPostDate(selectedRecipe.postDate);
    }
  };

  const localTimeStamp = () => {
    return new Date().toLocaleString().split(",").join("");
  };

  // Add Directions to list
  const handleDirections = (e) => {
    e.preventDefault();
    if (inputDirections === "") {
      alert("Please enter data into Directions textbox");
      return;
    } else {
      setAddDirections([
        ...addDirections,
        {
          instructions: inputDirections,
          optional: Boolean(inputDirectionsOptional),
        },
      ]);
    }
    setInputDirections("");
    setInputDirectionsOptional("");
  };
  // Add Ingredients to list
  const handleIngredients = (e) => {
    e.preventDefault();
    if (
      inputIngredients === "" ||
      inputIngredientsMeasurement === "" ||
      inputIngredientsAmount <= 0
    ) {
      alert("Please enter data into Ingredients textboxes");
      return;
    } else {
      setAddIngredients([
        ...addIngredients,
        {
          uuid: uuidv4(),
          name: inputIngredients,
          amount: Number(inputIngredientsAmount),
          measurement: inputIngredientsMeasurement,
        },
      ]);
    }
    setInputIngredients("");
    setInputIngredientsAmount("");
    setInputIngredientsMeasurement("");
  };
  // Save and Submit form to API
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputTitle === "" ||
      inputDesc === "" ||
      inputServings <= 0 ||
      inputPrep <= 0 ||
      inputCook <= 0 ||
      addDirections.length === 0 ||
      addIngredients.length === 0
    ) {
      alert("Invalid Data");
      return;
    } else {
      editRecipe({
        uuid: selectedRecipe.uuid,
        title: inputTitle,
        description: inputDesc,
        servings: Number(inputServings),
        prepTime: Number(inputPrep),
        cookTime: Number(inputCook),
        postDate: postDate,
        editDate: localTimeStamp(),
        ingredients: addIngredients,
        directions: addDirections,
        images: selectedRecipe.images,
      });
      setInputDirections("");
      setInputIngredients("");
      setInputIngredientsAmount("");
      setInputIngredientsMeasurement("");
      setInputDirectionsOptional(false);
    }
  };
  return (
    <form className='container flex-center' onSubmit={handleSubmit}>
      <div className='header2'>Edit Recipe</div>
      <div className='form-container'>
        <div className='form-div'>
          <label>Title</label>
          <input
            onChange={(e) => setInputTitle(e.target.value)}
            type='text'
            placeholder='Title'
            maxlength='20'
            value={inputTitle}
          ></input>
          <label>Description</label>
          <input
            onChange={(e) => setInputDesc(e.target.value)}
            type='text'
            placeholder='Description'
            maxlength='50'
            value={inputDesc}
          ></input>
          <label>Servings</label>
          <input
            onChange={(e) => setInputServings(e.target.value)}
            type='number'
            placeholder='Servings'
            value={inputServings}
          ></input>
          <label>Prep Time</label>
          <input
            onChange={(e) => setInputPrep(e.target.value)}
            type='number'
            placeholder='Prep Time'
            value={inputPrep}
          ></input>
          <label>Cook Time</label>
          <input
            onChange={(e) => setInputCook(e.target.value)}
            type='number'
            placeholder='Cook Time'
            value={inputCook}
          ></input>
        </div>
        <div className='form-div'>
          {addIngredients && (
            <>
              <div className='header3'>Ingredients:</div>
              <ul>
                {addIngredients.map((ingredient) => (
                  <ListItems key={ingredient.uuid} param={ingredient} />
                ))}
              </ul>
            </>
          )}
          <label>Ingredient Amount</label>
          <input
            onChange={(e) => setInputIngredientsAmount(e.target.value)}
            type='number'
            placeholder='Amount'
            value={inputIngredientsAmount}
          ></input>
          <label>Ingredient Name</label>
          <input
            onChange={(e) => setInputIngredients(e.target.value)}
            type='text'
            placeholder='Name'
            value={inputIngredients}
          ></input>
          <label>Ingredient Measurement</label>
          <input
            onChange={(e) => setInputIngredientsMeasurement(e.target.value)}
            type='text'
            placeholder='Measurement'
            value={inputIngredientsMeasurement}
          ></input>

          <button className='btn' onClick={(e) => handleIngredients(e)}>
            Add Ingredient
          </button>
        </div>
        <div className='form-div'>
          {addDirections && (
            <>
              <div className='header3'>Directions:</div>
              <ol>
                {addDirections.map((direction) => (
                  <ListItems key={uuidv4()} param={direction} />
                ))}
              </ol>
            </>
          )}
          <label>Direction Instruction</label>
          <input
            onChange={(e) => setInputDirections(e.target.value)}
            type='text'
            placeholder='Instruction'
            value={inputDirections}
          ></input>
          <label>Required</label>
          <input
            onChange={() =>
              setInputDirectionsOptional(!inputDirectionsOptional)
            }
            type='checkbox'
            checked={inputDirectionsOptional}
          ></input>
          <button className='btn' onClick={(e) => handleDirections(e)}>
            Add Direction
          </button>
          <div className='btn-save'>
            <input className='btn' type='submit' value='Save Recipe' />
          </div>
        </div>
      </div>
    </form>
  );
};

export default RecipeForm;
