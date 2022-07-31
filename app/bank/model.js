const mongoose = require("mongoose");

let bankSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama Pemilik Harus diisi"],
  },
  nameBank: {
    type: String,
    required: [true, "Nama Bank Harus diisi"],
  },
  noRekening: {
    type: String,
    required: [true, "Nomor Rekening Harus diisi"],
  },
});

module.exports = mongoose.model("Bank", bankSchema);
