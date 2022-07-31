const mongoose = require("mongoose");

let paymentSchema = mongoose.Schema({
  type: {
    type: String,
    required: [true, "Type Pembayaran Harus diisi"],
  },
  status: {
    type: String,
    enum: ["Pending", "Success", "Cancel"],
    default: "Pending",
  },
  banks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bank",
    },
  ],
});

module.exports = mongoose.model("Payment", paymentSchema);