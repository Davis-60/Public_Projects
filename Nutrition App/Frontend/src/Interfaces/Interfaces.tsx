//Defining the meal type as an interface (I should pull this out of this file)
export interface Meal {
  name: string;
  //date shouldn't be a string but I'll figure it out
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

//I use this meal object for meals that I am pulling from the database (already have _id prop)
export interface idMeal extends Meal {
  _id: string;
}
