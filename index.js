const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 4000;
const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
