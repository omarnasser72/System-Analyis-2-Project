const Company = require("../models/companies-model");

getCampanies = async (req, res) => {
  await Company.find({}, (err, companies) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, data: companies });
  }).catch((err) => console.log(err));
};

checkServiceRunning = (req, res) => {
  res.send("Hello World! - from campanies service");
};

module.exports = {
  getCampanies,
  checkServiceRunning,
};
