import { useState } from "react";
import axiosInstance from "@/util/axios";
import { MEAL_PLAN, SAVE_PLAN } from "@/util/api";

type MealPlan = {
  day: number;
  meal_type: string;
  meal_name: string;
  price: number;
  calories: number;
  total_calories: number;
  updated_budget: number;
};

export default function Plan() {
  const [budget, setBudget] = useState<any>(0);
  const [mealPlan, setMealPlan] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleGetMealPlan() {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(MEAL_PLAN, { budget });
      console.log({ data });
      if (data.error) throw { err: data.message };
      setMealPlan(data.payload);
    } catch (error: any) {
      console.error(error);
      alert(error.err || "Something went wrong");
      setMealPlan([]);
    } finally {
      setLoading(false);
    }
  }
  async function saveMealPlan() {
    if (!mealPlan.length) {
      alert("Please make a valid plan beforing saving");
      return;
    }
    try {
      const { data } = await axiosInstance.post(SAVE_PLAN, { budget, plan: mealPlan });
      if (data.error) throw { err: data.message };
      alert(data.message);
    } catch (error: any) {
      console.error(error);
      alert(error.err || "Something went wrong");
    }
  }

  return (
    <div className="mx-auto p-4 sm:p-7 md:p-10 pb-0 sm:pb-0 md:pb-0">
      <h1 className="text-3xl font-bold mb-4">Meal Planner</h1>
      <div className="mb-4">
        <label htmlFor="budget" className="mr-2">
          Enter Budget:
        </label>
        <input
          type="number"
          id="budget"
          onChange={(e) => setBudget(e.target.value)}
          onWheel={(e) => e.currentTarget.blur()}
          className="rounded border border-zinc-700 w-32 bg-black text-white px-2 py-1 outline-none"
        />

        <button
          onClick={handleGetMealPlan}
          className="bg-blue-500 border border-zinc-600 hover:scale-105 text-white px-4 py-1 ml-2 rounded hover:bg-black transition-all"
        >
          {loading ? "Loading..." : "Get Meal Plan"}
        </button>
      </div>
      <div>
        {mealPlan.length > 0 ? (
          <>
            <div className="relative overflow-x-auto rounded-md max-h-[70vh]">
              <table className="w-full text-left rtl:text-right text-zinc-950 dark:text-gray-200  overflow-scroll">
                <thead className="font-bold uppercase bg-zinc-200 dark:bg-zinc-900 text-gray-800 dark:text-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Day
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Meal Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Meal Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Calories
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Calories
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Budget
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-zinc-100 dark:bg-zinc-950 overflow-scroll">
                  {mealPlan.map(
                    ({ day, meal_type, meal_name, price, calories, total_calories, updated_budget }, index) => (
                      <tr key={index}>
                        <th scope="row" className="px-6 py-4">
                          {day}
                        </th>
                        <td className="px-6 py-4">{meal_type}</td>
                        <td className="px-6 py-4">{meal_name || "Can't afford"}</td>
                        <td className="px-6 py-4">{price || "Can't afford"}</td>
                        <td className="px-6 py-4">{calories || "Can't fetch"}</td>
                        <td className="px-6 py-4">{total_calories || "Can't fetch"}</td>
                        <td className="px-6 py-4">{updated_budget || "Can't fetch"}</td> 
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
            <div className="w-full my-4 flex justify-end px-10">
              <button
                onClick={saveMealPlan}
                className="bg-blue-500 border border-zinc-600 hover:scale-105 text-white px-4 py-1 ml-2 rounded hover:bg-black transition-all"
              >
                Save Plan
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-400">No meal plan available.</p>
        )}
      </div>
    </div>
  );
}
