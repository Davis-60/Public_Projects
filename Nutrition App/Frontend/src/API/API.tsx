import { Meal } from "../Interfaces/Interfaces";

export const createMeal = async (mealInfo: Meal) => {
  try {
    const response = await fetch("http://localhost:5001/api/meals", {
      method: "POST",
      //Do I need this header??
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mealInfo }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Error fetching response:", error);
    return "An error occurred while fetching the response.";
  }
};

//Work in progress, but it works to pull all meals in the DB
export const getMeals = async (params: any) => {
  try {
    const query = new URLSearchParams(params).toString();
    const reqURL = "http://localhost:5001/api/meals?" + query;
    //This will pull meals filtered based on the paramater pased
    const response = await fetch(reqURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Error fetching response:", error);
    return "An error occurred while fetching the response.";
  }
};
