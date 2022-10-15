import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { Card, Avatar, Col, Typography, Row } from "antd";
import Icon from "@ant-design/icons";
import axios from "axios";
import moment from "moment";

import "../QR/qrGen.css";
const { Meta } = Card;

function QRcard() {
  // return (
  //   <div className="app">
  //     <div className="headerQr">ID card</div>
  //     <hr className="hr" />
  //     <div className="main1">
  //       <div className="formContainer">
  //         <div className="cardImg">/
  //           <img className="img" src="dsfdsf" />
  //         </div>
  //         <div className="idcardContent">
  //           <div className="name">OOO</div>
  //           <div className="id">000000-000000</div>
  //           <div className="age">20</div>
  //           <div className="address">서울시 -------------------</div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  const [Image, setImage] = useState([]);
  useEffect(() => {
    axios.get("/api/image/getImages").then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setImage(response.data.images);
      } else {
        alert("이미지 가져오기 실패");
      }
    });
  }, []);

  const renderCards = Image.map((image, index) => {
    return (
      <div>
        <a href={`/image/post/${image._id}`}>
          <div style={{ posithon: "relative" }}>
            {/* <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${image.filePath}`}
            /> */}
          </div>
        </a>
        <br />
        <Meta address={image.address} description="" />
        <span>{image.name} </span>
        <br />
        <span>{moment(image.createdAt).format("yyyy/MMM/Do hh:mm:ss")}</span>
      </div>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </div>
  );
}

export default QRcard;
