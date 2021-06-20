import React, { Component } from "react";
import SearchForm from "./SearchForm";
import Header from "./Header";
import EmployeeTable from "./EmployeeTable";
import API from "../utils/API";

class SearchEmployeeContainer extends Component {
    state = {
        search: "",
        results: [],
        filteredResults: [],
        sortResults: this.initSort
    };

    get initSort() {
        return {
            name: "",
            phone: "",
            email: "",
            age: "",
            location: ""
        };
    }

    // When this component mounts, load all employees from API
    componentDidMount() {
        API.getEmployee()
            .then((res) => {
                this.setState({
                    results: res.data.results,
                    filteredResults: res.data.results
                })
                console.log(this.state.results);

            }
            )
            .catch((err) => console.log(err));
    };

    handleInputChange = (event) => {
        const value = event.target.value;
        this.setState({ search: value });
        this.filterByName(value.toLowerCase().trim());
    };

    // From submission for searching for employees by name
    handleFormSubmit = (event) => {
        event.preventDefault();
    };

    sortBy = (key, primary = 0, secondary = 0) => {
        let sortedEmps = this.state.filteredResults;
        if (this.state.sortResults[key]) {
            this.setState({
                filteredResults: sortedEmps.reverse(),
                sortResults: {
                    ...this.initSort,
                    [key]: this.state.sortResults[key] === "asc" ? "desc" : "asc"
                },
            });
        } else {
            sortedEmps = this.state.filteredResults.sort((a, b) => {
                a = a[key];
                b = b[key];

                if (primary) {
                    if (secondary && a[primary] === b[primary]) {

                    }
                    return a[secondary].localeCompare(b[secondary]);
                } else {
                    return a.localeCompare(b);
                }
            });

            this.setState({
                filteredResults: sortedEmps,
                sortResults: {
                    ...this.initSort,
                    [key]: "asc",
                },
            });
        }
    };

    filterByName = (input) => {
        if (input) {
            this.setState({
                filteredResults: this.state.results.filter((employee) => {
                    return (
                        employee.name.first
                            .toLowerCase()
                            .concat(" ", employee.name.last.toLowerCase())
                            .includes(input)
                    );
                }),
            });
        } else {
            this.setState({ filteredResults: this.state.results });
        }
    };

    render() {
        return (
            <>
                <Header />
                <SearchForm
                    value={this.state.search}
                    handleFormSubmit={this.handleFormSubmit}
                    handleInputChange={this.handleInputChange}
                />
                <EmployeeTable
                    results={this.state.results}
                    sortBy={this.sortBy}
                    filterByName={this.filterByName}
                />

            </>
        );
    }
}

export default SearchEmployeeContainer;