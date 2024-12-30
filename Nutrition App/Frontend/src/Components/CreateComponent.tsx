import { useState } from "react";
import { createMeal } from "../API/API";
import { Meal } from "../Interfaces/Interfaces";
import { Box, Button, TextField } from "@mui/material";

const defaultMeal: Meal = {
  name: "",
  date: Date.now(),
  calories: 0,
  protein: 0,
  sugar: 0,
};

//This component should hold the forms to enter a new meal and a create button
const CreateComponent = () => {
  const [mealInfo, setMealInfo] = useState<Meal>(defaultMeal);

  //This event handler will update the current meal info when the forn is typed in
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMealInfo((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setMealInfo(defaultMeal);
  };

  const handleMealCreate = () => {
    createMeal(mealInfo);
    resetForm();
  };

  //Need a form and event listener here to allow user input for meals
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        maxWidth={400}
        minWidth={300}
        padding={3}
        borderRadius={2}
        boxShadow={3}
        bgcolor={"gray"}
      >
        <TextField
          label="Meal Name"
          //This name must match the name in the meal interface for the event handler to work as intended
          name="name"
          value={mealInfo.name}
          onChange={handleChange}
          required
          variant="outlined"
        />
        <TextField
          label="Calories "
          //This name must match the name in the meal interface for the event handler to work as intended
          name="calories"
          value={mealInfo.calories}
          onChange={handleChange}
        />

        <TextField
          label="Protein"
          //This name must match the name in the meal interface for the event handler to work as intended
          name="protein"
          value={mealInfo.protein}
          onChange={handleChange}
        />

        <TextField
          label="Sugar"
          //This name must match the name in the meal interface for the event handler to work as intended
          name="sugar"
          value={mealInfo.sugar}
          onChange={handleChange}
        />

        <Button
          variant={"contained"}
          color={"primary"}
          onClick={handleMealCreate}
          sx={{ fontWeight: "bold" }}
        >
          Log New Meal
        </Button>
      </Box>
    </>
  );
};

export default CreateComponent;
