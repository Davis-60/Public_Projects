import { Box, Button } from "@mui/material";
import "./App.css";
import CreateComponent from "./Components/CreateComponent";
import ViewComponent from "./Components/ViewComponent";
import { useState } from "react";

//Using MUI for the main styling
function App() {
  const [showMealGrid, setShowMealGrid] = useState<boolean>(false);
  return (
    <>
      <h1>Nutrition Tracker</h1>
      <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
        <CreateComponent></CreateComponent>
        <Button
          variant={"contained"}
          color={"secondary"}
          onClick={() => setShowMealGrid(!showMealGrid)}
          sx={{ fontWeight: "bold" }}
        >
          Show My Meals
        </Button>
        {showMealGrid && <ViewComponent></ViewComponent>}
      </Box>
    </>
  );
}

export default App;
