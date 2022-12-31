class APIUtils {
    getAuthHeader() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.accessToken) {
            // for Node.js Express back-end
            return {Cookie: "jwt=" + user.accessToken};
        } else {
            return {};
        }
    }

    getURL() {
        const url = 'http://localhost:5000'
        return url
    }
}

export default new APIUtils();
