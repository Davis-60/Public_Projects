import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { getMeals } from "../API/API";
import { idMeal } from "../Interfaces/Interfaces";

const GraphPage = () => {
  const [chartData, setChartData] = useState<[]>([]);

  const queryMeals = async (filter: object) => {
    const myMeals = await getMeals(filter);
    const newMeals = myMeals.map((meal: idMeal) => ({
      ...meal,
      calPerPro: meal.calories / meal.protein,
    }));
    setChartData(newMeals);
  };

  useEffect(() => {
    queryMeals({ limit: 100 });
    console.log(chartData);
  }, []);

  //Eventually Pull these graphs out into seperate components
  return (
    <>
      <h2>Overview Graph</h2>
      <BarChart width={500} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="calories" fill="#fdf0d5" />
        <Bar dataKey="protein" fill="#003049" />
        <Bar dataKey="sugar" fill="#669bbc" />
      </BarChart>

      <h2>Protien v. Sugar</h2>
      <BarChart width={500} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="protein" fill="#003049" />
        <Bar dataKey="sugar" fill="#669bbc" />
      </BarChart>

      <h2>Calories per gram Protien </h2>
      <BarChart width={500} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="calPerPro" name="Ratio" fill="#003049" />
      </BarChart>
    </>
  );
};

export default GraphPage;
