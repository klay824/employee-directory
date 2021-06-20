import axios from "axios";
const BASEURL = "https://randomuser.me/api/?results=50&nat=us";

// eslint-disable-next-line
export default {
    getEmployee: function () {
        return axios.get(BASEURL);
    }
};