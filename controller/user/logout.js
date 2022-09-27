const { User } = require("../../models/User");
const { auth } = require("../../middleware/auth");

module.exports = {
  get: (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    });
  },
};
