import React, { Component } from "react";
import API from "../utils/API";


class Search extends Component {
    state = {
        search: "",
        results: [],
        error: ""
    };

    componentDidMount() {
        API.getEmployee()
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }
}

export default Search;