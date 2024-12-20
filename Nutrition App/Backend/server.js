//Based on starting server config by chatGPT
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

//CORS allows reasource sharing with the frontend
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection (nutritionDatabase)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

//Schema for a Meal Object
const MealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
});

const Meal = mongoose.model("Meal", MealSchema);

// API Endpoints
app.post("/api/meals", async (req, res) => {
  try {
    const meal = new Meal(req.body.mealInfo);
    //Testing line
    console.log(meal);
    const savedMeal = await meal.save();
    res.json(savedMeal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/meals", async (req, res) => {
  //Creating my mongo filter from urlParams
  const filters = req.query;
  //Right now the only supported filter is a limit
  //Using mongoose to query with filters
  try {
    // const meals = await Meal.find(mongoQuery).limit(mongoQuery.limit || 0);
    const meals = await Meal.find().limit(filters.limit || 0);
    res.json({ reply: meals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/meals/:id", async (req, res) => {
  try {
    const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedMeal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/meals/:id", async (req, res) => {
  try {
    await Meal.findByIdAndDelete(req.params.id);
    res.json({ message: "Meal deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server with 'node server.js' or 'npm start'
//Note that this should connect to the local 'nutritionDatabase' (can be verified on 3T)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
