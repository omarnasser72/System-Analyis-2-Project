const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/datetime", (req, res) => {
  const currentDate = new Date();
  res.json({
    date: currentDate.toDateString(),
    time: currentDate.toTimeString(),
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
