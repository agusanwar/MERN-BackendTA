const mongoose = require("mongoose");

let playerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email Harus diisi"],
    },
    name: {
      type: String,
      required: [true, "Nama Harus diisi"],
      minLenght: [3, "panjang nama  harus 3 - 255 karakter"],
      maxLenght: [255, "panjang nama  harus 3 - 255 karakter"],
    },
    username: {
      type: String,
      required: [true, "Nama Harus diisi"],
      minLenght: [3, "panjang nama  harus 3 - 255 karakter"],
      maxLenght: [255, "panjang nama  harus 3 - 255 karakter"],
    },
    password: {
      type: String,
      required: [true, "kata sandi Harus diisi tidak boleh kosong"],
      minLenght: [8, "panjang nama  harus 3 - 255 karakter"],
      maxLenght: [255, "panjang nama  harus 3 - 255 karakter"],
    },
    roles: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    avatar:{
      type: String,
    },
    fileName:{
      type: String,
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    phoneNumber: {
      type: String,
      required: [true, "Nomor Telpon Harus diisi"],
      minLenght: [9, "panjang nama  harus 9 -13 karakter"],
      maxLenght: [13, "panjang nama  harus 9 - 13 karakter"],
    },

    favorite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Player", playerSchema);
