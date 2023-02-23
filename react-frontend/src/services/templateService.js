import APIUtils from "../helpers.js/APIUtils";
import axios from "axios";
import FormData from "form-data";

class TemplateService {
  async getAllTemplates() {
    let response = await axios.get(
      APIUtils.getURL() + "/img/all?type=template",
      APIUtils.getAuthHeader()
    );
    console.log("Get All Templates: " + response.data);
    return response.data;
  }

  // TODO
  async getAllTemplatesFromUser(userId) {
    console.log("Get All Memes from one User");
  }

  async uploadTemplate(formData, creator, templateName, accessibility) {
    let response = await axios({
      url: APIUtils.getURL() + "/img/upload?type=template",
      method: "POST",
      headers: APIUtils.getAuthHeader(),
      data: formData,
    })
      .then(function (response) {
        var data = JSON.stringify({
          creator: creator,
          name: templateName,
          src: "http://localhost:5000/img/template/" + response.data.message[0],
          accessibility: accessibility,
        });
        console.log(data);
        axios({
          url: APIUtils.getURL() + "/img/addTemplate",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        })
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }
}

export default TemplateService;
