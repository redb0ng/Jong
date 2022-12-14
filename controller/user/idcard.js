const { upload } = require("../../middleware/uploads");
const { User3 } = require("../../models/User2");
const { User } = require("../../models/User");

module.exports = {
  post: async (req, res) => {
    try {
      //업로드한 이미지 multer를 통해서 이미지 파일이 여기로 옴
      // aws에 업로드 할 것임
      //이미지가 저장된 aws url 주소를 반환하도록 할 것임

      let token = req.cookies.x_auth;
      User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ message: "토큰이 만료되었습니다." });
        if (user) {
          const user3 = new User3({
            ...req.body,
            image: req.file.location,
            email: user.email,
          });
          user3.save((err, user3Info) => {
            if (err) return res.json({ success: false, err });
            console.log(user3Info);
            res.status(201).json({ url: req.file.location });
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },

  get: async (req, res) => {
    try {
      User3.findOne({ email: req.user.email }, (err, images) => {
        if (err) throw err;
        if (!images) return res.json({ message: "등록한 이미지가 없습니다!" });

        res.status(200).json({ message: "get photos", imageUrl: images.image });
      });
    } catch (err) {
      console.log(err);
    }
  },
};
