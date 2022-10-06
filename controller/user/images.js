const { upload } = require("../../middleware/uploads");

module.exports = {
  //이미지를 업로드 할 때 Post
  post: async (req, res) => {
    try {
      //업로드한 이미지 multer를 통해서 이미지 파일이 여기로 옴
      console.log(req.file);
      // aws에 업로드 할 것임

      //이미지가 저장된 aws url 주소를 반환하도록 할 것임
      res.status(201).json({ url: req.file.location });
    } catch (err) {
      console.log(err);
    }
  },

  //이미지를 내용을 얻을 때
  get: async (req, res) => {
    try {
      res.status(200).json({ message: "get photos" });
    } catch (err) {
      console.log(err);
    }
  },
};
