const mongoose = require("mongoose");

let voucherSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama Game diisi"],
  },
  status: {
    type: String,
    enum: ["Y", "N"],
    default: "Y",
  },
  thumbnail: {
    type: String,
  },
  categorys: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categorys",
  },
  nominals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nominal",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Voucher", voucherSchema);
