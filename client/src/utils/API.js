import axios from "axios";

export default {
    getImages: function(userId) {
        return axios.get("/api/users/images/" + userId);
    },
    deleteImage: function(userId, url) {
        return axios.delete(`/api/images/${userId}/${url}`)
    }
}