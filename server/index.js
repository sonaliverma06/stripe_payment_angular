const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { connection } = require("./src/connection/connection");
const UserRouter = require("./src/component/signup/route/signup.route");
require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
// console.log("proedddddd",process.env)
var corsOptions = {
  origin: "http://localhost:4800",
};

app.use(cors());

app.use(bodyParser.json({ limit: "100mb" }));

app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

const PORT = process.env.PORT || 4800;
app.use("/api", UserRouter);
connection
  .sync()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
