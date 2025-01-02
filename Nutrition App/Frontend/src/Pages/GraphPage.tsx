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

const GraphPage = () => {
  const [chartData, setChartData] = useState<[]>([]);

  const queryMeals = async (filter: object) => {
    const newMeals = await getMeals(filter);
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
    </>
  );
};

export default GraphPage;
