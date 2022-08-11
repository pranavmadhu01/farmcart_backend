const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userFeedSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
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
