const Payment = require("./model");
const Bank = require("../bank/model");

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
      const payment = await Payment.find();
      res.render("admin/payment/view_payment", {
        payment,
        alert,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      // console.log(err.message);
    }
  },

  viewCreate: async (req, res) => {
    try {
      const banks = await Bank.find();
      res.render("admin/payment/create", {
        banks,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      // console.log(err);
    }
  },

  // model category
  actionCreate: async (req, res) => {
    try {
      const { banks, type } = req.body;

      let payment = await Payment({ banks, type });
      await payment.save();

      // Alert message
      req.flash("alertMessage", `Create payment  success`);
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
      // console.log(err);
    }
  },

  // // model Nominal
  // viewEdit: async (req, res) => {
  //   try {
  //     const { id } = req.params;

  //     const bank = await Bank.findOne({ _id: id });

  //     res.render("admin/bank/edit", {
  //       bank,
  //     });
  //   } catch (err) {
  //     req.flash("alertMessage", `${err.message}`);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/bank");
  //     // console.log(err);
  //   }
  // },

  // // Action Edit
  // actionEdit: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { name, nameBank, noRekening } = req.body;

  //     await Bank.findOneAndUpdate(
  //       {
  //         _id: id,
  //       },
  //       { name, nameBank, noRekening }
  //     );

  //     // Alert message
  //     req.flash("alertMessage", `Update bank  success`);
  //     req.flash("alertStatus", "success");

  //     res.redirect("/bank");
  //   } catch (err) {
  //     req.flash("alertMessage", `${err.message}`);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/bank");
  //     console.log(err);
  //   }
  // },

  // // Action Delete
  // actionDelete: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     await Bank.findByIdAndRemove({
  //       _id: id,
  //     });
  //     // Alert message
  //     req.flash("alertMessage", `Delete bank  success`);
  //     req.flash("alertStatus", "success");

  //     res.redirect("/bank");
  //   } catch (err) {
  //     req.flash("alertMessage", `${err.message}`);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/bank");
  //     // console.log(err);
  //   }
  // },
};
