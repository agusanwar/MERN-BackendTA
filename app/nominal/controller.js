const Nominal = require("./model");

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
      const nominal = await Nominal.find();
      res.render("admin/nominal/view_nominal", {
        nominal,
        alert,
        name: req.session.user.name,
        title: "Dashboard | Nominal",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
      // console.log(err.message);
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/nominal/create", {
        name: req.session.user.name,
        title: "Dashboard | Create Nominal",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
      // console.log(err);
    }
  },

  // model category
  actionCreate: async (req, res) => {
    try {
      const { coinName, coinQuantity, price } = req.body;

      let nominal = await Nominal({ coinName, coinQuantity, price });
      await nominal.save();

      // Alert message
      req.flash("alertMessage", `Create Nominal  success`);
      req.flash("alertStatus", "success");

      res.redirect("/nominal");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
      // console.log(err);
    }
  },

  // model Nominal
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const nominal = await Nominal.findOne({ _id: id });

      res.render("admin/nominal/edit", {
        nominal,
        name: req.session.user.name,
        title: "Dashboard | Update Nominal",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
      // console.log(err);
    }
  },

  // Action Edit
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { coinName, coinQuantity, price } = req.body;

      await Nominal.findOneAndUpdate(
        {
          _id: id,
        },
        { coinName, coinQuantity, price }
      );

      // Alert message
      req.flash("alertMessage", `Update nominal  success`);
      req.flash("alertStatus", "success");

      res.redirect("/nominal");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
      // console.log(err);
    }
  },

  // Action Delete
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Nominal.findByIdAndRemove({
        _id: id,
      });
      // Alert message
      req.flash("alertMessage", `Delete nominal  success`);
      req.flash("alertStatus", "success");

      res.redirect("/nominal");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
      // console.log(err);
    }
  },
};
