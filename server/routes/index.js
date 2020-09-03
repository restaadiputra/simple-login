const express = require("express");
const router = express.Router();

const userController = require("../controllers").user;
const authController = require("../controllers").auth;
const { userValidationRules, authValidationRules, validate } = require("../middlewares/validator");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* User Router */
router.get("/api/user", userController.list);
router.get("/api/user/:id", userController.getById);
router.post("/api/user", userValidationRules(), validate, userController.add);
router.put("/api/user/:id", userController.update);
router.delete("/api/user/:id", userController.delete);

/* Auth Router */
router.post("/api/auth", authValidationRules(), validate, authController.login);

module.exports = router;
