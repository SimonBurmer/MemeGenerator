import APIUtils from "../helpers.js/APIUtils";
import axios from "axios";

class UserService {
    async getUserById(userId) {
        try {
            const response = await axios.get(APIUtils.getURL() + '/user/getUserById?id=' + userId, APIUtils.getAuthHeader());
            console.log("GetUserById: " + response.data)
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async getCurrentUser() {
        try {
            const currentUser = JSON.parse(localStorage.getItem("loginData"))
            const response = await axios.get(APIUtils.getURL() + '/user/getCurrentUser?id=' + currentUser.sub, APIUtils.getAuthHeader());
            console.log("Get Current User Response: " + response.data)
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserService;