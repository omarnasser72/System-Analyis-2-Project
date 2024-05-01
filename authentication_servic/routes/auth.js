const express = require("express");
const { register, login, healthCheck } = require("../controllers/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

//health check
router.get("/healthCheck", healthCheck);

module.exports = router;
