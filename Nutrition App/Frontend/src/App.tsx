import { Box } from "@mui/material";
import "./App.css";
import CreateComponent from "./Components/CreateComponent";
import ViewComponent from "./Components/ViewComponent";

//Using MUI for the main styling
function App() {
  return (
    <>
      <h1>Nutrition Tracker</h1>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <CreateComponent></CreateComponent>
        <ViewComponent></ViewComponent>
      </Box>
    </>
  );
}

export default App;
