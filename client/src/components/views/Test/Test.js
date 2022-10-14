import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }

  handleFileInput(e) {
    this.setState({
      selectedFile: e.target.files[0],
    });
  }

  handlePost() {
    const formData = new FormData();
    formData.append("file", this.state.selectedFile);

    return axios
      .post("/api/users/idcard", formData)
      .then((res) => {
        alert("성공");
      })
      .catch((err) => {
        // alert("실패");
      });
  }

  render() {
    return (
      <div>
        <input
          type="file"
          name="file"
          onChange={(e) => this.handleFileInput(e)}
        />
        <button type="button" onClick={this.handlePost()} />
      </div>
    );
  }
}

export default App;
