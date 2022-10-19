const Category = require("./model");

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
      const category = await Category.find();
      res.render("admin/category/view_category", {
        category,
        alert,
        name: req.session.user.name,
        title: "Dashboard | Category",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
      // console.log(err.message);
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/category/create", {
        name: req.session.user.name,
        title: "Dashboard | Create Category",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
      // console.log(err);
    }
  },

  // model category
  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;

      let category = await Category({ name });
      await category.save();

      // Alert message
      req.flash("alertMessage", `Create category  success`);
      req.flash("alertStatus", "success");

      res.redirect("/category");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
      // console.log(err);
    }
  },

  // model category
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await Category.findOne({ _id: id });

      res.render("admin/category/edit", {
        category,
        name: req.session.user.name,
        title: "Dashboard | Update Category",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
      // console.log(err);
    }
  },

  // Action Edit
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await Category.findOneAndUpdate(
        {
          _id: id,
        },
        { name }
      );

      // Alert message
      req.flash("alertMessage", `Update category  success`);
      req.flash("alertStatus", "success");

      res.redirect("/category");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
      // console.log(err);
    }
  },

  // Action Delete
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Category.findByIdAndRemove({
        _id: id,
      });
      // Alert message
      req.flash("alertMessage", `Delete category  success`);
      req.flash("alertStatus", "success");

      res.redirect("/category");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
      // console.log(err);
    }
  },
};
