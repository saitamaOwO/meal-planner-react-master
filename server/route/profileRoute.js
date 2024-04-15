const express = require("express");
const router = express.Router();
const { getProfile } = require("../controller/profileController");

router.get("/getProfile", getProfile);

module.exports = router;
