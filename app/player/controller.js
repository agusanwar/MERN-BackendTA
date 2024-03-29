const Player = require('./model')
const Voucher = require('../voucher/model')
const Category = require('../category/model')
const Nominal = require('../nominal/model')
const Bank = require('../bank/model')
const Payment = require('../payment/model')
const Transaction = require('../transaction/model')
// for upload image
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
    landingPage: async (req, res) => {
        try {
            const voucher = await Voucher.find()
            .select('_id name status category thumbnail')
            .populate('category')

            res.status(200).json({data: voucher})
        } catch (err) {
            res.status(500).json({message: `Internal server error`});
        }
    },
    detailPage: async (req, res) => {
        try {
            const { id } = req.params
            // find by ID
            const voucher = await Voucher.findOne({ _id: id })
            .populate('category')   
            .populate('nominals')
            .populate('user', '_id name phoneNumber')
            // view data

            // jika data tidak ada
            if(!voucher){
                return res.status(404).json({message: 'Voucher game not found'})
            }

            res.status(200).json({data: voucher})
        } catch (err) {

            res.status(500).json({message: `Internal server error`});

        }
    },
    category: async (req, res) => {
        try {
            // find by ID
            const category = await Category.find()
          

            res.status(200).json({data: category})
        } catch (err) {

            res.status(500).json({message: `Internal server error`});

        }
    },
    checkout: async (req, res) => {
        try {
            const { accountUser, name, nominals, voucher, payment, bank} = req.body
            // Voucher Game
            const res_voucher = await Voucher.findOne({ _id: voucher })
            .select('name category _id thumbnail user')
            .populate('category')
            .populate('user')

            if(!res_voucher){
                return res.status(404).json({
                    message: 'Voucher game tidak ditemukan'
                })
            }
            // Nominal
            const res_nomminal = await Nominal.findOne({ _id: nominals})

            if(!res_nomminal){
                return res.status(404).json({
                    message: 'Nominal tidak ditemukan'
                })
            }
            // Nominal
            const res_payment = await Payment.findOne({ _id: payment})

            if(!res_payment){
                return res.status(404).json({
                    message: 'payment tidak ditemukan'
                })
            }
            // Bank
            const res_bank = await Bank.findOne({ _id: bank})

            if(!res_bank){
                return res.status(404).json({
                    message: 'payment tidak ditemukan'
                })
            }
            let tax = ( 10 / 100 ) * res_nomminal._doc.price
            let value =  res_nomminal._doc.price - tax

            // History Voucher
            const payload = {
                historyVoucherTopup: {
                    gameName: res_voucher._doc.name,
                    category: res_voucher._doc.category ? res_voucher._doc.category.name : '',
                    thumbnail: res_voucher._doc.thumbnail,
                    coinName: res_nomminal._doc.coinName,
                    coinQuantity: res_nomminal._doc.coinQuantity,
                    price: res_nomminal._doc.price,
                  },
                  historyPayment: {
                    name: res_bank._doc.name,
                    type: res_payment._doc.type,
                    bankName: res_bank._doc.bankName,
                    noRekening: res_bank._doc.noRekening
                  },
                  name: name,
                  accountUser: accountUser,
                  tax: tax,
                  value: value,
                  player: req.player._id,
                  historyUser: {
                    name: res_voucher._doc.user?.name,
                    phoneNumber: res_voucher._doc.user?.phoneNumber,
                  },
                  category: res_voucher._doc.category?._id,
                  user: res_voucher._doc.user?._id
            }
            const transaction = new Transaction(payload)

            await transaction.save()

            res.status(201).json({
                data: transaction
            })
        } catch (err) {
        res.status(500).json({message: `Internal server error`});
        }
    },
    history: async ( req, res ) => {
        try {
            const { status = '' } = req.query;

            let criteria = {}

            if(status.lenght){
                criteria = {
                    ...criteria,
                    status : { $regex : `${status}`, $options: 'i'}
                }
            }

            if(req.player._id){
                criteria = {
                    ...criteria,
                   player : req.player._id
                } 
            }

            const history = await Transaction.find(criteria)

            let total = await Transaction.aggregate([
                {$match : criteria},
                {
                    $group: {
                        _id: null,
                        value: {$sum: "$value"}
                    }
                }
            ])
             res.status(200).json({
                data: history,
                total: total.length ? total[0].value : 0
            })
        } catch (err) {
            res.status(500).json({message: `Internal server error`});
        }
    },


    detailHistory: async (req, res) => {
        try {
            const { id } =  req.params

            const history = await Transaction.findOne({ _id: id})

            if(!history)
            return res.status(404).json({
                message: "History Tidak ditemukan"
            })

            res.status(200).json({ data: history })
        } catch (err) {
            res.status(500).json({message: `Internal server error`});
        }
    },

    dashboard: async (req, res) => {
        try {
            const count = await Transaction.aggregate([
                {  $match: { player: req.player._id } },
                {
                    $group: {
                        _id: '$category',
                        value: { $sum: '$value' }
                    }
                }
            ])
            const category = await Category.find({})
            category.forEach(element => {
                count.forEach(data => {
                    if(data._id.toString() === element._id.toString()){
                        data.name = element.name
                    }
                })
            })

            const history = await Transaction.find({
                player: req.player._id
            })
            .populate('category')
            .sort({ 'updatedAt': -1})

            res.status(200).json({
                data: history, count
            })
        } catch (err) {
            res.status(500).json({message: `Internal server error`});
        }
    },


    profile:  async (req, res) =>{
        try {
            const player = {
                id: req.player._id,
                username: req.player.username,
                email: req.player.email,
                aname: req.player.aname,
                avatar: req.player.avatar,
                phoneNumber: req.player.phoneNumber,

            }
            res.status(200).json({data: player})
        } catch (err) {
            res.status(500).json({message: `Internal server error`});
        }
    },

    editProfile: async (req, res, next) => {
        try {
            const { name = "" , phoneNumber = ""} = req.body
            const payload = {}

            if (name.lenght) payload.name = name
            if (phoneNumber.lenght) payload.phoneNumber = phoneNumber

           // upload image
            if (req.file) {
                let tmp_path = req.file.path;
                let originaExt =
                req.file.originalname.split(".")[
                    req.file.originalname.split(".").length - 1
                ];
                let filename = req.file.filename + "." + originaExt;
                let target_path = path.resolve(
                config.rootPath,
                `public/uploads/${filename}`
                );

                const src = fs.createReadStream(tmp_path);
                const dest = fs.createWriteStream(target_path);

                src.pipe(dest);

                src.on("end", async () => {
              
                    let player = await Player.findOne({ _id: req.player._id });

                    let currentImage = `${config.rootPath}/public/uploads/${player.avatar}`;
                    if (fs.existsSync(currentImage)) {
                    fs.unlinkSync(currentImage);
                    }

                   player = await Player.findOneAndUpdate(
                    {
                        _id: req.player._id,
                    },
                    { 
                        ...payload,
                        avatar: filename 
                    }, { new: true, runValidators: true })
                    res.status(201).json({
                        data: {
                            id: player.id,
                            name: player.name,
                            phoneNumber: player.phoneNumber,
                            avatar: player.avatar
                        }
                    })
                    console.log(player)
                })
                // print error
                src.on('err', async() => {
                    next(err)
                })
            }  else {
                 const  player = await Player.findOneAndUpdate({
                    _id: req.player._id
                }, payload, { new: true, runValidators: true })
                res.status(201).json({
                    data: {
                        id: player.id,
                        name: player.name,
                        phoneNumber: player.phoneNumber,
                        avatar: player.avatar
                    }
                })
            }
        } catch (err) {
           if(err && err.name === "Validation Error"){
            res.status(422).json({
                error: 1,
                message: err.message,
                field: err.errors
            });
           }
        }
    }
}