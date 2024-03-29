const mongoose = require("mongoose");

const bcrypt = require('bcryptjs')

const HASH_ROUND = 10

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
  { timestamps: true })

  // jika email sudah ada
  playerSchema.path('email').validate(async function (value){
    try {
      const count = await this.model('Player').countDocuments({ email: value})

      return !count
    } catch (err) {
      throw err
    }
  }, attr => `${attr.value} sudah terdaftar`)
  // bycyt passpord
  playerSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
    next()
  })
module.exports = mongoose.model("Player", playerSchema);
