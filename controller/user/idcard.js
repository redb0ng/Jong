const { User3 } = require("../../models/User2");

module.exports = {
  post: (req, res) => {
    const user3 = new User3(req.body);

    user3.save((err, user3Info) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
      });
    });
  },
};
