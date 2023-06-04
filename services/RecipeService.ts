import AsyncStorage from "@react-native-async-storage/async-storage";

const RECIPE_STORAGE_KEY = "recipes";

// Recipe Models
export type Recipe = {
  data: RecipeData;
  ingredients: Array<RecipeIngredients>;
  steps: Array<RecipeSteps>;
};

export type RecipeData = {
  id: string;
  name: string;
  image: any;
  description: string;
};

export type RecipeIngredients = {
  id: string;
  amount: string;
  unit: string;
  name: string;
};

export type RecipeSteps = {
  id: string;
  description: string;
  time?: number;
};

export type RecipeStore = {
  recipes: Array<Recipe>;
};

// Recipe Controller
export const getAllRecipes = async (): Promise<RecipeStore> => {
  const recipeItems = await AsyncStorage.getItem(RECIPE_STORAGE_KEY);
  if (recipeItems) {
    return JSON.parse(recipeItems) as RecipeStore;
  } else {
    return { recipes: [] };
  }
};
export async function getAllRecipe(): Promise<RecipeData[]> {
  const recipeItems = await AsyncStorage.getItem(RECIPE_STORAGE_KEY);
  if (recipeItems) {
    const allRecipes = JSON.parse(recipeItems) as RecipeStore;
    const resepData = allRecipes.recipes.map((recipe) => {
      return recipe.data;
    });
    return resepData;
  } else {
    return [];
  }
}
export async function getRecipe(id: string): Promise<Recipe | null> {
  const recipeItems = await AsyncStorage.getItem(RECIPE_STORAGE_KEY);
  if (recipeItems) {
    const allRecipes = JSON.parse(recipeItems) as RecipeStore;
    const resepData = allRecipes.recipes.find((recipe) => {
      return recipe.data.id == id;
    });
    if (resepData) {
      return resepData;
    } else return null;
  } else {
    return null;
  }
}
export const storeRecipe = async (value: Recipe[]) => {
  try {
    const recipeString = JSON.stringify(value);
    await AsyncStorage.setItem(RECIPE_STORAGE_KEY, recipeString);
  } catch (err) {
    //saving
    console.log(err);
  }
};

export const addNewRecipe = async (newRecipe: Recipe) => {
  try {
    let allRecipe = await getAllRecipes();
    if (allRecipe) {
      allRecipe.recipes.push(newRecipe);
    }
    const recipeString = JSON.stringify(allRecipe);
    await AsyncStorage.setItem(RECIPE_STORAGE_KEY, recipeString);
  } catch (err) {
    //saving
    console.log(err);
  }
};
