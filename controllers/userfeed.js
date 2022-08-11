const Userfeed = require("../models/Userfeed");
const User = require("../models/User");

exports.message = (req, res, next) => {
  let { name, email, phone_no, category,client_name,product_name,quantity,price } = req.body;
  // User.findOne({ email: email }).then((user) => {
  //   if (user) {
  //     return res
  //       .status(422)
  //       .json({ errors: [{ user: "email already exists" }] });
  //   }
  // else {
  const userfeed = new Userfeed({
    name: name,
    email: email,
    phone_no: phone_no,
    category: category,
    client_name:client_name,
    product_name:product_name,
    quantity: quantity,
    price: price,
  });
  userfeed.save().then((response) => {
    res.status(200).json({
      success: true,
      result: response,
    });
  });
  // }
  // });
};
