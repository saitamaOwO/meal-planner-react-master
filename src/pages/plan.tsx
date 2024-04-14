import React, { useState } from 'react';
import axios from 'axios';

interface MealPlan {
  day: number;
  meal_type: string;
  meal_name: string;
  price: number;
}

function App() {
  const [budget, setBudget] = useState('');
  const [mealPlan, setMealPlan] = useState<MealPlan[]>([]); // Explicitly type mealPlan
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(event.target.value);
  };

  const handleGetMealPlan = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.post<MealPlan[]>('/api', { budget }); // Specify the response data type
      setMealPlan(response.data);
    } catch (error) {
      console.error('Error fetching meal plan:', error);
      setError('Failed to fetch meal plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Meal Planner</h1>
      <div className="mb-4">
        <label htmlFor="budget" className="mr-2">Enter Budget:</label>
        <input
          type="number"
          id="budget"
          value={budget}
          onChange={handleBudgetChange}
          className="border border-gray-300 rounded px-2 py-1 text-black"
        />
        <button onClick={handleGetMealPlan} className="bg-blue-500 text-white px-4 py-1 ml-2 rounded hover:bg-blue-600">
          {loading ? 'Loading...' : 'Get Meal Plan'}
        </button>
      </div>
      <div>
        {error && <p className="text-red-500">{error}</p>}
        {mealPlan.length > 0 ? (
          <table className="table-auto bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Day</th>
                <th className="px-4 py-2">Meal Type</th>
                <th className="px-4 py-2">Meal Name</th>
                <th className="px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {mealPlan.map((meal, index) => (
                <tr key={index} className="text-blue-500">
                  <td className="border px-4 py-2">{meal.day}</td>
                  <td className="border px-4 py-2">{meal.meal_type}</td>
                  <td className="border px-4 py-2">{meal.meal_name}</td>
                  <td className="border px-4 py-2">${meal.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-800">No meal plan available.</p>
        )}
      </div>
    </div>
  );
}

export default App;