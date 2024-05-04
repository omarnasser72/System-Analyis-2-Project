const express = require("express");
const CampanyController = require("../controllers/campany_controller");
const router = express.Router();

router.get("/campanies", CampanyController.getCampanies);
router.get("/", CampanyController.checkServiceRunning);

module.exports = router;
