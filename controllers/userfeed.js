const Userfeed = require("../models/Userfeed");
const User = require("../models/User");

exports.message = (req, res, next) => {
  let { id, name, email, phone_no, category, product_name, quantity, price } =
    req.body;
  const userfeed = new Userfeed({
    id: id,
    name: name,
    email: email,
    phone_no: phone_no,
    category: category,
    product_name: product_name,
    quantity: quantity,
    price: price,
  });
  userfeed.save().then((response) => {
    res.status(200).json({
      success: true,
      result: response,
    });
  });
};

exports.messageget = (req, res, next) => {
  Userfeed.find({}, (err, msg) => {
    var message = [];

    msg.forEach((msg) => {
      message.push({
        id: msg.id,
        name: msg.name,
        email: msg.email,
        phone_no: msg.phone_no,
        category: msg.category,
        product_name: msg.product_name,
        quantity: msg.quantity,
        price: msg.price,
      });
    });
    res.status(200).send({
      success: true,
      message: message,
    });
  });
};
