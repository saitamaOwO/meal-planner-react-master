const router = require("express").Router();
const authController = require("../controller/authController");

router.post("/signUp", signUpValidator, authController.signUp);
router.post("/signIn", signInValidator, authController.signIn);

function signUpValidator(req, res, next) {
  const { username, name, email, password, height, age, weight } = req.body;
  try {
    if (!username) throw "username is required";
    if (!name) throw "name is required";
    if (!email) throw "email is required";
    if (!password) throw "password is required";
    if (!height) throw "height is required";
    if (!age) throw "age is required";
    if (!weight) throw "weight is required";
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: true, message: err });
  }
  return next();
}

function signInValidator(req, res, next) {
  const { username, password } = req.body;
  try {
    if (!username) throw "username is required";
    if (!password) throw "password is required";
  } catch (err) {
    return res.status(400).json({ error: true, message: err });
  }
  return next();
}

module.exports = router;
