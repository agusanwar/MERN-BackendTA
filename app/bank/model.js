const mongoose = require("mongoose");

let bankSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama Pemilik Harus diisi"],
    },
    bankName: {
      type: String,
      required: [true, "Nama Bank Harus diisi"],
    },
    noRekening: {
      type: String,
      required: [true, "Nomor Rekening Harus diisi"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bank", bankSchema);
