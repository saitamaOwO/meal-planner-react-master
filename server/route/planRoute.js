// Import necessary modules
const express = require('express');
const router = express.Router();
const { getPlan } = require('../controller/planController'); // Import the function to handle the meal plan logic

// Define route to handle POST requests for fetching meal plan
router.post('/mealPlan', async (req, res) => {
  try {
    const budget = req.body.budget; // Extract budget from request body
    const mealPlan = await getPlan(budget); // Call the function to fetch meal plan
    res.json(mealPlan); // Send the meal plan data as JSON response
  } catch (error) {
    console.error('Error fetching meal plan:', error);
    res.status(500).json({ error: 'Failed to fetch meal plan. Please try again.' }); // Handle errors
  }
});

module.exports = router;
