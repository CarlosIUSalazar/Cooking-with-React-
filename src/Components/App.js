import React, { useState, useEffect } from 'react';
import RecipeList from "./RecipeList";
import RecipeEdit from './RecipeEdit';
import '../css/app.css';
import {v4 as uuidv4} from "uuid";

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'  //Good practice to name the key with the name of your project to identify it among other ones.  You can also call it with the project name and file name.  cookingWithReact.App.recipes

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)  //got through all recipes, find the recipe with the given id and if there is no recipe with that id return undefined.  A.k.a. Find a recipe from recipes list and for each recipe compare the recipe id to the id of the selected recipe.
  console.log("selectedREcipe", selectedRecipe)


  useEffect(() => {  //Get
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  },[])

  useEffect(() => {  //Set.  The order of get set is important
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))  //Localstorage only takes strings
  },[recipes])


  const recipeContextValue = {  //if the both names match you dont need to write it twice.  it could have been hadleRecipeAdd, handleRecipeDelete.
    handleRecipeAdd: handleRecipeAdd,
    handleRecipeDelete: handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  function handleRecipeSelect(id) {  //This function does essentially nothing except to add a name for readibility with the 'handle recipe select' name and have consistency with other function names.
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd(){
    const newRecipe = {
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        { id: uuidv4(), name: '', amount: '' }
      ]
    }

    setSelectedRecipeId(newRecipe.id)

    setRecipes([...recipes, newRecipe])
  }


  function handleRecipeChange(id,recipe){
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(receta => receta.id === id) 
    newRecipes[index] = recipe  //the newRecipes array is the same as old recipes array but it has the recipe we changed replacing the recipe of the id we passed in. We swaped in one of the recipies in the array
    setRecipes(newRecipes)
  }

  function handleRecipeDelete(id){
    //this if is to clear a selected recipe Id from a recipe you just deleted. vid21 min 7
    //check to see if you have a selected recipe id and if the selected recipe id is equal to recpe id we passed in, if so it means we're deleting the recipe we have currently selected. so set selected recipe id to undefined to explicitly say that we no longer have a selected recipe.
    if (selectedRecipeId != null && selectedRecipeId == id){
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))  //give me every recipe that doesnt have this id
  }


  return (  
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes}/>
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
    </RecipeContext.Provider>
  );

}


const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Tofu',
    servings: 3,
    cookTime: '1:45',
    instructions: "1. Put Salt on Tofu\n2. Put Tofu in oven\n3.Eat Tofu",
    ingredients: [
      {
        id:1,
        name: 'Tofu',
        amount: '2 Pounds'
      },
      {
        id:2,
        name: 'Salt',
        amount: '1 tbs'
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Seitan',
    servings: 5,
    cookTime: '4:25',
    instructions: "1. Put Salt on Seitan\n2. Put Seitan in oven\n3.Eat Seitan",
    ingredients: [
      {
        id:1,
        name: 'Seitan',
        amount: '3 Pounds'
      },
      {
        id:2,
        name: 'Pepper',
        amount: '4 tbs'
      }
    ]
  }
]

export default App;
