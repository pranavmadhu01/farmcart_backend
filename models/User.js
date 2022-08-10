const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone_no:{
       type: Number,
       required:true, 
    },
    category:{
      type:String,
      required:true,
    },
    cold_storage_name:{
      type:String,
    },
    cold_storage_license_no:{
      type:String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

module.exports = mongoose.model("User", userSchema);
