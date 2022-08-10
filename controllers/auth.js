const User = require("../models/User");
const nodemailer = require(`nodemailer`);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createJWT } = require("../utils/auth");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
async function mailing(email, category) {
  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Hey, you registered in farmcart!!",
    // text: `You registered as a ${category} in farmcart enjoy the journey of trading your products.`,
    html: `Thank you for registering as a ${category} in farmcart<br> 
    We have received your registration.<br> 
    If you would like to buy or sell products again, please log in at <a href="www.farmcart.com">www.farmcart.com</a>.
    <br> On your dashboard page, under “name”, click on the products which you are interested in to buy and/or sell and then click the submit button to complete the transaction. <br>
    If you need any help, visit <a href="www.farmcart.com/helpinfo">www.farmcart.com/helpinfo</a>. <br>
    If any changes to your contact information are required, you will need to connect via email of the concerned authorities, <i>Again thanking you for registering</i>.
    If you have any queries, feel free to contact us at farmcart0@gmail.com`,
  };
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email send to ${sendermail}
      ${info.response}`);
    }
  });
}
const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
exports.signup = (req, res, next) => {
  let {
    name,
    email,
    phone_no,
    category,
    cold_storage_name,
    cold_storage_license_no,
    password,
    password_confirmation,
  } = req.body;
  let errors = [];
  if (!name) {
    errors.push({ name: "required" });
  }
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "invalid" });
  }
  if (!phone_no) {
    errors.push({ phone_no: "required" });
  }
  if (!category) {
    errors.push({ category: "required" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (!password_confirmation) {
    errors.push({
      password_confirmation: "required",
    });
  }
  if (password != password_confirmation) {
    errors.push({ password: "mismatch" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res
          .status(422)
          .json({ errors: [{ user: "email already exists" }] });
      } else {
        const user = new User({
          name: name,
          email: email,
          phone_no: phone_no,
          category: category,
          cold_storage_name:cold_storage_name,
          cold_storage_license_no: cold_storage_license_no,
          password: password,
        });
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then(mailing(email, category))
              .then((response) => {
                res.status(200).json({
                  success: true,
                  result: response,
                });
              })
              .then()
              .catch((err) => {
                res.status(500).json({
                  errors: [{ error: err }],
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
    });
};
exports.signin = (req, res) => {
  let { email, password } = req.body;
  let errors = [];
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "invalid email" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          errors: [{ user: "not found" }],
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res
                .status(400)
                .json({ errors: [{ password: "incorrect" }] });
            }
            let access_token = createJWT(user.email, user._id, 3600);
            jwt.verify(
              access_token,
              process.env.TOKEN_SECRET,
              (err, decoded) => {
                if (err) {
                  res.status(500).json({ errors: err });
                }
                if (decoded) {
                  return res.status(200).json({
                    success: true,
                    token: access_token,
                    message: user,
                  });
                }
              }
            );
          })
          .catch((err) => {
            res.status(500).json({ errors: err });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ errors: err });
    });
};
