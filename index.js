const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");
const { errorMid } = require("./middlewares/errorMid");
const connectdb = require("./config/connectdb");
app.use(express.json());
app.use(express.urlencoded());
connectdb();

app.use("/api/users", userRoutes);

app.use(errorMid);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
