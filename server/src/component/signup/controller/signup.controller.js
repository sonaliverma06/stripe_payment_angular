const { RgisterModel } = require("../models/signup.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { async } = require("rxjs");
const Stripe = require("stripe");
// (
//   "sk_test_51LriJGSB8OX1zXgAkweaqKpV4cUmjoebIK8r7z16Fge6ShdogJsSLqaR0aTrqNSkuks5PCMeeT83W4IPBeZ7xHUo00m8HVIEHc"
// );
const stripe = Stripe(
  "sk_test_51LriJGSB8OX1zXgAkweaqKpV4cUmjoebIK8r7z16Fge6ShdogJsSLqaR0aTrqNSkuks5PCMeeT83W4IPBeZ7xHUo00m8HVIEHc",
  {
    apiVersion: "2020-08-27",
  }
);

const { SubModel } = require("../../subscription/models/subscription.models");

exports.hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
exports.normalizeEmail = (email) => {
  return email.trim().toLowerCase();
};

exports.log = async (req, res) => {
  console.log("req", req, "res", res);
  const { email, password } = req.body;
  console.log("req.body", req.body);
  const findUser = await RgisterModel.findOne({
    where: { email: req.body.email },
  });
  console.log("findUser", findUser);

  if (!findUser) {
    return { error: "Invalid login" };
  }

  var passwordIsValid = await bcrypt.compareSync(
    req.body.password,
    findUser.dataValues.password
  );
  console.log("passwordIsValid", passwordIsValid);

  if (!passwordIsValid) {
    return {
      accessToken: null,
      message: "Invalid Password!",
    };
  }

  var token = jwt.sign({ email: email }, process.env.JWT_TOKEN, {
    expiresIn: "1d",
  });
  console.log("token......", token);
  return { token };
};

exports.adduser = async (req, res) => {
  // console.log(
  //   "this.hashPassword(req.body.password)",
  //   await this.hashPassword(req.body.password)
  // );
  const findUser = await RgisterModel.findOne({
    where: { email: req.body.email },
  });
  if (!findUser) {
    const cusomer = await stripe.customers.create({
      email: this.normalizeEmail(req.body.email),
    });
    console.log("cusomer", cusomer.id);
    if (Object.prototype.hasOwnProperty.call(cusomer, "id")) {
      const password1 = await this.hashPassword(req.body.password);
      const user = await RgisterModel.create({
        email: this.normalizeEmail(req.body.email),
        password: password1,
        name: req.body.name,
        address: req.body.address,
        contect: req.body.contect,
        customer_id: cusomer.id,
      });

      return user;
    } else {
      throw new Error(`somthing went wrong`);
    }
  } else {
    throw new Error(`${req.body.email} already exists`);
  }
};

exports.product = async (req, res) => {
  const products = await stripe.products.list({
    limit: 19,
  });
  const prices = await stripe.prices.list({
    limit: 30,
  });
  console.log("hhhhhhhhhhhhhhhhhh", products, prices);
  if (
    Object.prototype.hasOwnProperty.call(products, "data") &&
    Object.prototype.hasOwnProperty.call(prices, "data")
  ) {
    const combine = products.data.map((ik) => {
      if (ik.default_price !== null) {
        const getprice = prices.data.find((idd) => {
          return idd.id === ik.default_price;
        });
        return {
          ...ik,
          pricedetails: getprice !== undefined ? getprice : {},
        };
      } else {
        return undefined;
      }
    });
    const refilterUndefined = combine.filter((iii) => {
      return iii !== undefined;
    });

    return refilterUndefined;
  } else {
    throw new Error(`something went wrong`);
  }
};
exports.price = async (req, res) => {};

exports.checkout = async (req, res) => {
  console.log("req", req.body.data);

  //
    try {
       const customer = req.body.data.customer_id;
  const email = req.body.data.email;
  const price = req.body.data.price;
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer: customer,
    // email,
    line_items: [
      {
        price: price,
        quantity: 1,
        // currency: "inr",
        // description:"hello"
      },
    ],
    subscription_data: {
      //   trial_period_days:20
    },
    success_url: `${process.env.FRONT_END_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONT_END_URL}/subscription`,
  });
    // console.log("subscription", subscription);
    console.log("session",session);
    const findUser = await RgisterModel.findOne({
      where: { email: session.customer_details.email },
    });
    if(findUser !== null){
      const findSub = await SubModel.findOne({ where:{session_id: session.id} });
      if(findSub===null){
        const subUserEntry = await SubModel.create({
          customer_id: session.customer,
          invoice_id: "",
          subscription_id: "",
          subscription_created: `${session.created}`,
          subscription_expire: `${session.expires_at}`,
          session_id: session.id,
          signup_id: findUser.dataValues.id,
          payment_status:session.payment_status
        });
         return session;
      }else{
         return session;
      }

    }
    else{
      return {message:"no user found"}
    }
  } catch (error) {

    console.error(error);
    return { error: "Subscription not found" };
      }

};

exports.profileDetails = async (req, res) => {
  if (Object.prototype.hasOwnProperty.call(req.headers, "authorization")) {
    const extract = req.headers.authorization.split(" ");
    const details = await jwt.verify(extract[1], process.env.JWT_TOKEN);
    if (details !== undefined) {
      const userDetails = await RgisterModel.findOne({
        where: { email: details.email },
        include: {
          model: SubModel,
          as: "signup_subscriptions",
        },
      });
      return userDetails;
    } else {
      return { message: "token not valid" };
    }
  } else {
    return { message: "token not provided" };
  }
};

exports.subscriptionRetrive = async (req, res) => {
  const subscriptionId = req.body.data.id;

  try {
    const subscription = await stripe.checkout.sessions.retrieve(
      subscriptionId
    );
    console.log("subscription", subscription);
    const findUser = await RgisterModel.findOne({
      where: { email: subscription.customer_details.email },
    });
    if(findUser !== null){
      const findSub = await SubModel.findOne({ where:{session_id: subscriptionId} });
      if(findSub===null){
         const subs = await stripe.subscriptions.retrieve(
      subscription.subscription
    );
        const subUserEntry = await SubModel.create({
          customer_id: subscription.customer,
          invoice_id: subscription.invoice,
          subscription_id: subscription.subscription,
         subscription_created: `${subs.current_period_start}`,
          subscription_expire: `${subs.current_period_end}`,
          session_id: subscription.id,
          signup_id: findUser.dataValues.id,
          payment_status:subscription.payment_status
        });
        return { subUserEntry, subscription };
      }else{
        console.log("subscription",subscription);
        const subs = await stripe.subscriptions.retrieve(
      subscription.subscription
    );
       await SubModel.update({
          customer_id: subscription.customer,
          invoice_id: subscription.invoice,
          subscription_id: subscription.subscription,
          subscription_created: `${subs.current_period_start}`,
          subscription_expire: `${subs.current_period_end}`,
          session_id: subscription.id,
          signup_id: findUser.dataValues.id,
          payment_status:subscription.payment_status
          
        },{where:{session_id:subscriptionId}});
        return { findSub, subscription };
      }

    }
    else{
      return {message:"no user found"}
    }
  } catch (error) {

    console.error(error);
    return { error: "Subscription not found" };
      }
};

exports.getSubs = async(req,res) => {
const subscription = await stripe.subscriptions.retrieve(
      req.params.id
    );
    return subscription
}
