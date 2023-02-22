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

  async uploadTemplate(formData) {
    let response = await axios({
      url: APIUtils.getURL() + "/img/upload?type=template",
      method: "POST",
      headers: APIUtils.getAuthHeader(),
      data: formData,
    });
    return response.data;
  }
}

export default TemplateService;
