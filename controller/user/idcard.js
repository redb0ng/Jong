const { upload } = require("../../middleware/uploads");
const { User3 } = require("../../models/User2");

module.exports = {
  post: async (req, res) => {
    try {
      //업로드한 이미지 multer를 통해서 이미지 파일이 여기로 옴

      // aws에 업로드 할 것임

      //이미지가 저장된 aws url 주소를 반환하도록 할 것임
      const user3 = new User3({ ...req.body, image: req.file.location });
      user3.save((err, user3Info) => {
        if (err) return res.json({ success: false, err });
        res.status(201).json({ url: req.file.location, message: req.params });
      });
    } catch (err) {
      console.log(err);
    }
  },

  get: async (req, res) => {
    try {
      res.status(200).json({ message: "get photos" });
    } catch (err) {
      console.log(err);
    }
  },
};
