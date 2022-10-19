const mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email Harus diisi"],
    },
    name: {
      type: String,
      required: [true, "Nama Harus diisi"],
    },
    password: {
      type: String,
      required: [true, "kata sandi Harus diisi tidak boleh kosong"],
    },
    roles: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    phoneNumber: {
      type: String,
      required: [true, "Nomor Telpon Harus diisi"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
