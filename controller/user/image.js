const { User } = require("../../models/User");

module.exports = {
  get: (req, res) => {
    //이미지 DB에서 가져와서 클라이언트에 보내기
    User.find().exec((err, images) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, images });
    });
  },
};
