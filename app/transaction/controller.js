const Transaction = require("./model");

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
      const transaction = await Transaction.find().populate('player')
      res.render("admin/transaction/view_transaction", {
        transaction,
        alert,
        name: req.session.user.name,
        title: "Dashboard | Transaction",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaction");
      // console.log(err.message);
    }
  },

  actionStatus: async (req, res) => {
    try {
      const {id} = req.params
      const {status} = req.query

      await Transaction.findByIdAndUpdate({_id: id}, {status})

      req.flash("alertMessage", 'Berhasil update status');
      req.flash("alertStatus", "danger");
      res.redirect("/transaction");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaction");
      // console.log(err.message);
    }
  }
};
