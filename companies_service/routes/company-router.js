const express = require("express");
const CampanyController = require("../controllers/campany_controller");
const router = express.Router();

router.get("/companies", CampanyController.getCompanies);
router.get("/",CampanyController.checkServiceRunning);
router.post("/Addcompanies", CampanyController.addCompany);
router.put("/companies/:id", CampanyController.updateCompany);
router.delete("/companies/:id", CampanyController.deleteCompany);

module.exports = router;
