const Company = require("../models/companies-model");

getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({});
    return res.status(200).json({ success: true, data: companies });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err.message });
  }
};

checkServiceRunning = (req, res) => {
  res.send("Hello World! - from campanies service");
};

// Add a new company
addCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    return res.status(201).json({ success: true, data: company });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err.message });
  }
};

// Update an existing company
updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!company) {
      return res
        .status(404)
        .json({ success: false, error: "Company not found" });
    }
    return res.status(200).json({ success: true, data: company });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err.message });
  }
};

// Delete an existing company
deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndDelete(id);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, error: "Company not found" });
    }
    return res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = {
  addCompany,
  updateCompany,
  deleteCompany,
  getCompanies,
  checkServiceRunning,
};
