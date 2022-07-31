const Voucher = require("./model");
// relasi to category
const Category = require("../category/model");
const Nominal = require("../nominal/model");
// for upload image
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  index: async (req, res) => {
    try {
      // alert modal
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      const voucher = await Voucher.find()
        .populate("categorys")
        .populate("nominals");
      console.log("Vocuher", voucher);
      console.log(voucher);
      res.render("admin/voucher/view_voucher", {
        voucher,
        alert,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      // console.log(err.message);
    }
  },

  viewCreate: async (req, res) => {
    try {
      //relasi to category
      const category = await Category.find();
      const nominal = await Nominal.find();
      res.render("admin/voucher/create", {
        category,
        nominal,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      // console.log(err);
    }
  },

  // model category
  actionCreate: async (req, res) => {
    try {
      const { name, categorys, nominals } = req.body;

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
          try {
            const voucher = new Voucher({
              name,
              categorys,
              nominals,
              thumbnail: filename,
            });

            await voucher.save();
            // Alert message
            req.flash("alertMessage", `Create Voucher success`);
            req.flash("alertStatus", "success");

            res.redirect("/voucher");
          } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
          }
        });
      } else {
        const voucher = new Voucher({
          name,
          categorys,
          nominals,
        });

        await voucher.save();
        // Alert message
        req.flash("alertMessage", `Create Voucher  success`);
        req.flash("alertStatus", "success");

        res.redirect("/voucher");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      // console.log(err);
    }
  },

  //   // model Nominal
  //   viewEdit: async (req, res) => {
  //     try {
  //       const { id } = req.params;

  //       const nominal = await Nominal.findOne({ _id: id });

  //       res.render("admin/nominal/edit", {
  //         nominal,
  //       });
  //     } catch (err) {
  //       req.flash("alertMessage", `${err.message}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/nominal");
  //       // console.log(err);
  //     }
  //   },

  //   // Action Edit
  //   actionEdit: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const { coinName, coinQuantity, price } = req.body;

  //       await Nominal.findOneAndUpdate(
  //         {
  //           _id: id,
  //         },
  //         { coinName, coinQuantity, price }
  //       );

  //       // Alert message
  //       req.flash("alertMessage", `Update nominal  success`);
  //       req.flash("alertStatus", "success");

  //       res.redirect("/nominal");
  //     } catch (err) {
  //       req.flash("alertMessage", `${err.message}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/nominal");
  //       // console.log(err);
  //     }
  //   },

  //   // Action Delete
  //   actionDelete: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       await Nominal.findByIdAndRemove({
  //         _id: id,
  //       });
  //       // Alert message
  //       req.flash("alertMessage", `Delete nominal  success`);
  //       req.flash("alertStatus", "success");

  //       res.redirect("/nominal");
  //     } catch (err) {
  //       req.flash("alertMessage", `${err.message}`);
  //       req.flash("alertStatus", "danger");
  //       res.redirect("/nominal");
  //       // console.log(err);
  //     }
  //   },
};
