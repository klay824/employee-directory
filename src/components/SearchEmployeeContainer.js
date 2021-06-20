import React, { Component } from "react";
import SearchForm from "./SearchForm";
import Header from "./Header";
import EmployeeTable from "./EmployeeTable";
import API from "../utils/API";

class SearchEmployeeContainer extends Component {
    state = {
        search: "",
        results: []
    };

    // When this component mounts, load all employees from API
    componentDidMount() {
        this.showEmployees();
    }

    showEmployees = () => {
        API.getEmployee()
            .then(res => {
                console.log(res.data.results);
                this.setState({ results: res.data.results })
            })
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const value = event.target.value;
        this.setState({
            search: value
        });
    };

    // From submission for searching for employees by name
    handleFormSubmit = event => {
        event.preventDefault();
    };

    render() {
        return (
            <>
                <SearchForm
                    search={this.state.search}
                    handleFormSubmit={this.handleFormSubmit}
                    handleInputChange={this.handleInputChange}
                />
                <EmployeeTable
                    results={this.state.results}
                />

            </>
        );
    }
}

export default SearchEmployeeContainer;