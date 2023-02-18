import APIUtils from "../helpers.js/APIUtils";
import axios from "axios";

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
}

export default TemplateService;
