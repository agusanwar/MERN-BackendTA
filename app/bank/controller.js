const Bank = require("./model");

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
      const bank = await Bank.find();
      res.render("admin/bank/view_bank", {
        bank,
        alert,
        name: req.session.user.name,
        title: "Dashboard | Bank",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      // console.log(err.message);
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/bank/create", {
        name: req.session.user.name,
        title: "Dashboard | Create Bank",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      // console.log(err);
      
    }
  },

  // model category
  actionCreate: async (req, res) => {
    try {
      const { name, nameBank, noRekening } = req.body;

      let bank = await Bank({ name, nameBank, noRekening });
      await bank.save();

      // Alert message
      req.flash("alertMessage", `Create Bank  success`);
      req.flash("alertStatus", "success");

      res.redirect("/bank");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      // console.log(err);
    }
  },

  // model Nominal
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const bank = await Bank.findOne({ _id: id });

      res.render("admin/bank/edit", {
        bank,
        name: req.session.user.name,
        title: "Dashboard | Update Bank",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      // console.log(err);
    }
  },

  // Action Edit
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, nameBank, noRekening } = req.body;

      await Bank.findOneAndUpdate(
        {
          _id: id,
        },
        { name, nameBank, noRekening }
      );

      // Alert message
      req.flash("alertMessage", `Update bank  success`);
      req.flash("alertStatus", "success");

      res.redirect("/bank");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      console.log(err);
    }
  },

  // Action Delete
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Bank.findByIdAndRemove({
        _id: id,
      });
      // Alert message
      req.flash("alertMessage", `Delete bank  success`);
      req.flash("alertStatus", "success");

      res.redirect("/bank");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
      // console.log(err);
    }
  },
};
