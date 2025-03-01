import { useEffect, useState } from "react";
import { idMeal } from "../Interfaces/Interfaces";
import { getMeals } from "../API/API";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { deleteMeal } from "../API/API";

const ViewComponent = () => {
  const [visibleMeals, setVisibleMeals] = useState<idMeal[]>([]);

  const queryMeals = async (filter: object) => {
    const newMeals = getMeals(filter);
    setVisibleMeals(await newMeals);
  };

  //This useEffect handles when meals are queried
  //Right now the only supported filter is a limit
  useEffect(() => {
    queryMeals({ limit: 100 });
  }, []);

  //Starting Config for data grip columns, rows, and sort
  const mealColumns: GridColDef[] = [
    { field: "name", headerName: "Meal Name", width: 200 },
    { field: "calories", headerName: "Calories", width: 150 },
    { field: "protien", headerName: "Protien", width: 150 },
    { field: "sugar", headerName: "Sugar", width: 150 },
    { field: "date", headerName: "Date", width: 150 },

    //Delete Column
    {
      field: " ",
      headerName: " ",
      width: 200,
      sortable: false,
      align: "center",
      renderCell: (params) => {
        return (
          <IconButton
            size="small"
            color="error"
            onClick={() => deleteMeal(String(params.id))}
          >
            <Tooltip title="Delete todo">
              <GridDeleteIcon />
            </Tooltip>
          </IconButton>
        );
      },
    },
  ];

  const mealRows: GridRowsProp = visibleMeals.map((meal) => ({
    id: meal._id,
    name: meal.name,
    calories: meal.calories,
    protien: meal.protein,
    sugar: meal.sugar,
    //Need to convert the date back from a number to a date object so I can make it a readable string
    date: new Date(meal.date).toDateString(),
  }));

  return (
    <>
      <DataGrid
        sx={{
          backgroundColor: "#f5f5f5",
        }}
        rows={mealRows}
        columns={mealColumns}
      ></DataGrid>
    </>
  );
};

export default ViewComponent;
