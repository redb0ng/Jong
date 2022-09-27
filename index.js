const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");

const userRouter = require("./routes/users");
const bodyParser = require("body-parser");
const cookiePasrser = require("cookie-parser");
const config = require("./config/key");

dotenv.config();
app.set("port", process.env.PORT || 5000);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookiePasrser());
app.use("/", userRouter);

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected...."))
  .catch((err) => console.log(err));

app.listen(app.get("port"), () => {
  console.log("Example app listening on port", app.get("port"));
});
