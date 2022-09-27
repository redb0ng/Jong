const { User } = require("../../models/User");

module.exports = {
  post: (req, res) => {
    const user = new User(req.body);

    user.save((err, userInfo) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
      });
    });
  },
};
