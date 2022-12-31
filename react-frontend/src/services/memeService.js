import APIUtils from "../helpers.js/APIUtils";
import axios from "axios";


class MemeService {
    async getAllMemes() {
        let response = await axios.get(APIUtils.getURL() + '/memes/all', APIUtils.getAuthHeader())
        return response.data;
    }
}

export default MemeService;