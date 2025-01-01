import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  HashRouter,
  Link,
} from "react-router-dom";

//Importing Pages
import HomePage from "./Pages/HomePage";
import GraphPage from "./Pages/GraphPage";
import { Button } from "@mui/material";

//Need this to initialize Router
Router;

//Using MUI for the main styling
function App() {
  return (
    <HashRouter basename="/">
      <>
        <Button
          //component = Link integrates the react router link into the MUI Button component
          component={Link}
          to="/"
          variant="contained"
          sx={{ mx: 1 }}
        >
          Home
        </Button>
        <Button
          //component = Link integrates the react router link into the MUI Button component
          component={Link}
          to="/GraphPage"
          variant="contained"
          sx={{ mx: 1 }}
        >
          Graphs
        </Button>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/GraphPage" element={<GraphPage />} />
        </Routes>
      </>
    </HashRouter>
  );
}

export default App;
