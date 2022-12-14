const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
//import routes
const authRoutes = require("./routes/auth");
const webscrapRoutes = require("./routes/webScrap");
const getallcoldstoragesRoutes = require("./routes/getAllColdStorages");
const getallfarmersRoutes = require("./routes/getAllFamers");
const getallretailersRoutes = require("./routes/getAllRetailers");
const userfeedRoutes = require("./routes/userfeed");

const { db } = require("./models/User");
//app
const app = express();
// db
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB Connected"))
  .catch((err) => {
    console.log(err);
  });
//middlewares
app.use(bodyParser.json());
app.use(cors());
//routes middleware
app.use("/api", authRoutes);
app.use("/api", webscrapRoutes);
app.use("/api", getallcoldstoragesRoutes);
app.use("/api", getallfarmersRoutes);
app.use("/api", getallretailersRoutes);
app.use("/api", userfeedRoutes);
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
