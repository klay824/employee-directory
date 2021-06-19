import axios from "axios";
const BASEURL = "https://randomuser.me/api/?results=200&nat=us";

export default {
    getEmployee: function () {
        return axios.get(BASEURL);
    }
};