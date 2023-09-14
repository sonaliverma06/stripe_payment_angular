const subController = require("../controller/subscription.controller");
const express = require("express");
const subRouter = express.Router()



subRouter.post("/get-details", async (req, res) => {
  // const data = req.body.user;
  await subController.getUserSubscriptions(req, res)
    .then((res1) => {
      res.status(201).json({
        status: true,
        res: res1,
      });
    })
    .catch((error) => {
      console.log("error", error);
      return res.send(error.message);
    });
});


module.exports = subRouter
