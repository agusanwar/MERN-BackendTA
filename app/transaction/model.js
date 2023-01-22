const mongoose = require("mongoose");

let TransactionSchema = mongoose.Schema(
  {
    historyVoucherTopup: {
      gameName: {
        type: String,
        require: [true, "nama harus diisi"],
      },
      category: {
        type: String,
        require: [true, "category harus diisi"],
      },
      thumbnail: {
        type: String,
      },
      coinName: {
        type: String,
        require: [true, "coin name harus diisi"],
      },
      coinQuantity: {
        type: String,
        require: [true, "coin quantity harus diisi"], 
      },
      price: {
        type: Number,
      },
    },
    historyPayment: {
      name: {
        type: String,
        require: [true, "nama harus diisi"],
      },
      type: {
        type: String,
        require: [true, "tipe pembayaran harus diisi"],
      },
      bankName: {
        type: String,
        require: [true, "nama  bank harus diisi"],
      },
      noRekening: {
        type: String,
        require: [true, "nomor rekening harus diisi"],
      },
    },
    name: {
      type: String,
      require: [true, "nama harus diisii"],
      minLenght: [3, "panjang nama  harus 3 - 255 karakter"],
      maxLenght: [255, "panjang nama  harus 3 - 255 karakter"],
    },
    accountUser: {
      type: String,
      require: [true, "nama akun harus diisii"],
      minLenght: [3, "panjang nama  harus 3 - 255 karakter"],
      maxLenght: [255, "panjang nama  harus 3 - 255 karakter"],
    },
    tax: {
      type: String,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Success", "Cancel"],
      default: "Pending",
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    historyUser: {
      name: {
        type: String,
        require: [true, "nama harus diisi"],
      },
      phoneNumber: {
        type: Number,
        require: [true, "nomor hanphone diisi"],
        minLenght: [9, "panjang nama  harus 3 - 13 karakter"],
        maxLenght: [13, "panjang nama  harus 3 - 13 karakter"],
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
