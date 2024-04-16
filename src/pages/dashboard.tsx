import { GET_PLAN } from "@/util/api";
import axiosInstance from "@/util/axios";
import Head from "next/head";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type plan = {
  username: string;
  day: string;
  meal_type: string;
  meal_name: string;
  price: string;
  date_created: string;
  budget: string;
  calories: string;
  total_calories: string;
  updated_budget: string
};
export default function Dashboard() {
  const [savedPlan, setSavedPlans] = useState<[plan] | null>();
  const [date, setDate] = useState<string>("");

  async function getSavedPlan(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.get(GET_PLAN + "/" + date);
      if (data.error) throw { err: data.message };
      setSavedPlans(data?.payload);
    } catch (error: any) {
      console.error({ error });
      setSavedPlans(null);
      alert(error.err || "Something went wrong");
    }
  }
  function handleSubmit() { }
  return (
    <>
      <Head>
        <title>Meal tracker Dashboard</title>
        <meta name="description" content="Meal tracker system Dashboard" />
      </Head>
      <section className="w-full min-h-screen flex flex-col items-center justify-center">
        <form 
        className="flex items-center gap-x-4"
        onSubmit={getSavedPlan}>
          <p>Select date</p>
          <input
            type="date"
            className="bg-zinc-900 outline-none text-white border px-4 py-2 rounded-md"
            onChange={(e) => setDate(e.target.value)}
          />
          <button
            className="flex items-center justify-center py-1.5 px-4 border border-blue-500 bg-blue-500 rounded-md my-2 hover:bg-black transition-all"
            type="submit">Submit
          </button>
        </form>
        {savedPlan?.length && (
          <>
            <h1 className="text-2xl uppercase font-bold mb-4">Saved plan</h1>
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
                      Date Created
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Budget
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Calories
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Calories
                    </th>
                    <th scope="col" className="px-6 py-3">
                      U_Budget
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-zinc-100 dark:bg-zinc-950 overflow-scroll">
                  {savedPlan?.map(
                    (
                      {
                        day,
                        meal_type,
                        meal_name,
                        price,
                        date_created,
                        budget,
                        calories,
                        total_calories,
                        updated_budget,
                      },
                      index
                    ) => (
                      <tr key={index}>
                        <td className="px-6 py-4">{day}</td>
                        <td className="px-6 py-4">{meal_type}</td>
                        <td className="px-6 py-4">{meal_name}</td>
                        <td className="px-6 py-4">{price}</td>
                        <td className="px-6 py-4">{date_created}</td>
                        <td className="px-6 py-4">{budget}</td>
                        <td className="px-6 py-4">{calories}</td>
                        <td className="px-6 py-4">{total_calories}</td>
                        <td className="px-6 py-4">{updated_budget}</td> 
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
        <Link
          href={"/plan"}
          className="flex items-center justify-center py-1.5 px-4 border border-blue-500 bg-blue-500 rounded-md my-2 hover:bg-black transition-all"
        >
          Make a meal plan
        </Link>
      </section>
    </>
  );
}
