// const { async } = require("rxjs");
const RegisterController = require("../controller/signup.controller");
const express = require("express");
const RegisterRouter = express.Router();

// RegisterRouter.get("/", async (req, res) => {
//   await RegisterController.findAll(req, res)
//   .then((i) => {

//       return res.status(201).json(i);
//     })
//     .catch((err) => {
//       return res.send(err.message);
//     });
// });

RegisterRouter.post("/register", async (req, res) => {
  const data = req.body.user;
  await RegisterController.adduser(req, res)
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
  return data;
});

RegisterRouter.post("/login", async (req, res) => {
  await RegisterController.log(req, res)
    .then((result) => {
      res.status(201).json({
        status: true,
        res: result,
      });
    })
    .catch((error) => {
      console.log("error", error);
      return res.send(error.message);
    });
});
RegisterRouter.post("/checkout", async (req, res) => {
  await RegisterController.checkout(req, res)
    .then((result) => {
      res.status(201).json({
        status: true,
        res: result,
      });
    })
    .catch((error) => {
      console.log("error", error);
      return res.send(error.message);
    });
});
RegisterRouter.post("/profile-details", async (req, res) => {
  await RegisterController.profileDetails(req, res)
    .then((result) => {
      res.status(201).json({
        status: true,
        res: result,
      });
    })
    .catch((error) => {
      console.log("error", error);
      return res.send(error.message);
    });
});

RegisterRouter.post("/sub-retrieve", async (req, res) => {
  await RegisterController.subscriptionRetrive(req, res)
    .then((result) => {
      res.status(201).json({
        status: true,
        res: result,
      });
    })
    .catch((error) => {
      console.log("error", error);
      return res.send(error.message);
    });
});
RegisterRouter.get("/stripe-product", async (req, res) => {
  await RegisterController.product(req, res)
    .then((result) => {
      res.status(201).json({
        status: true,
        res: result,
      });
    })
    .catch((error) => {
      console.log("error", error);
      return res.send(error.message);
    });
});
RegisterRouter.post("/stripe-product1/:id", async (req, res) => {
  const id = req.params.id;
  await RegisterController.getSubs(req, res)
    .then((res1) => {
      return res.status(201).json({
        status: true,
        res: res1,
      });
    })
    .catch((error) => {
      console.log("error", error);
      return res.send(error.message);
    });
});

// RegisterRouter.get("/stripe-price", async (req, res) => {
//   const id = req.params.id;
//   await RegisterController.price(req, res)
//     .then((res1) => {
//       return res.status(201).json({
//         status: true,
//         res: res1,
//       });
//     })
//     .catch((error) => {
//       console.log("error", error);
//       return res.send(error.message);
//     });
// });

module.exports = RegisterRouter;
