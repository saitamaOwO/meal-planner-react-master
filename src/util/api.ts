// backend
const BASE_URL = "http://localhost:8080";

// auth
const SIGN_IN = "/auth/signIn"; // post : body {username, password}
const SIGN_UP = "/auth/signUp"; // post : body {username, name, email, password, age, height, weight}

// plan
const MEAL_PLAN = "/api/plan/mealPlan"; // post : body {budget}
const SAVE_PLAN = "/api/plan/savePlan"; // post : body [plan:{}]}
const GET_PLAN = "/api/plan/getPlan"; // get

// user
const GET_PROFILE = "/api/profile/getProfile"; // get
export { BASE_URL, SIGN_IN, SIGN_UP, MEAL_PLAN, SAVE_PLAN, GET_PROFILE, GET_PLAN };
