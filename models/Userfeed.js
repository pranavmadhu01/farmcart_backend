const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userFeedSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone_no: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    client_name: { type: String },
    product_name: { type: String },
    quantity: { type: Number },
    price: { type: Number },
  },
  {
    timestamps: true,
    collection: "userfeed",
  }
);
module.exports = mongoose.model("Userfeed", userFeedSchema);
