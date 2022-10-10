import React, { useState, useEffect } from "react";
import createFormData from "./createFormData";

const Upload = () => {
  const [picturename, setpicturename] = useState("");
  const [imageFile, setimageFile] = useState("");
  const [s3Location, sets3Location] = useState("");
  useEffect(() => {
    document = "AWS S3 Image";
  }, [s3Location]);

  const handleFileChange = (e) => {
    setimageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("picturename", picturename);
    formData.append("imageFile", imageFile);
    const location = await createFormData(formData);
    sets3Location(location.data.location);
  };

  return (
    <div>
      <h1>이미지 업로드</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="picturename"
          type="text"
          id="picturename"
          value={picturename}
          onChange={(e) => setpicturename(e.target.value)}
        />
        <input
          type="file"
          name="imageFile"
          accept="image/jpg, image/png"
          onChange={handleFileChange}
        />
        <button>제출</button>
      </form>
      <img src={s3Location} alt="" />
    </div>
  );
};

export default Upload;
