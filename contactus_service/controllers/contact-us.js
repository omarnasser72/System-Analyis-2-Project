const Contact = require("../models/contactus-model");

addMassage = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a massage",
    });
  }

  const cont = new Contact(body);
  console.log(cont);

  if (!cont) {
    return res.status(400).json({ success: false, error: err });
  }

  cont
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: cont._id,
        message: "massage send!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "massage not send!",
      });
    });
};

getMassages = async (req, res) => {
  await Contact.find({}, (err, contacts) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, data: contacts });
  }).catch((err) => console.log(err));
};

getMassageOwn = async (req, res) => {
  console.log(req);
  await Contact.find({ email: req.params.email }, (err, contacts) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!contacts) {
      return res
        .status(404)
        .json({ success: false, error: `user un autherise` });
    }
    return res.status(200).json({ success: true, data: contacts });
  }).catch((err) => console.log(err));
};

checkServiceRunning = (req, res) => {
  res.send("Hello World! - from contact_us service");
};

module.exports = {
  addMassage,
  getMassageOwn,
  getMassages,
  checkServiceRunning,
};
