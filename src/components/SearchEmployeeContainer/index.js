import React, { Component } from "react";
import SearchForm from "../SearchForm";
import Header from "../Header";
import EmployeeTable from "../EmployeeTable";
import API from "../../utils/API";

class SearchEmployeeContainer extends Component {
    state = {
        search: "",
        results: [],
        filteredResults: [],
        currentSort: "default"
    };

    // get initSort() {
    //     return { name: "" };
    // }

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
        console.log(event);
        const value = event.target.value.toLowerCase();
        const newFilteredResults = this.state.results.filter(employee => employee.name.first.toLowerCase().indexOf(value) >= 0 || employee.name.last.toLowerCase().indexOf(value) >= 0);
        console.log(newFilteredResults);
        this.setState({ search: value, filteredResults: newFilteredResults })
    };

    // From submission for searching for employees by name
    handleFormSubmit = (event) => {
        event.preventDefault();
    };

    onSortChange = () => {
        const { currentSort } = this.state;
        let nextSort;

        if (currentSort === "down") {
            nextSort = "up";
        } else if (currentSort === "up") {
            nextSort = "default";
        } else if (currentSort === "default") {
            nextSort = "down";
        }

        this.setState({
            currentSort: nextSort
        });
    };

    // sortBy = (key, primary = 0, secondary = 0) => {
    //     let sortedEmps = this.state.filteredResults;
    //     if (this.state.sortResults[key]) {
    //         this.setState({
    //             filteredResults: sortedEmps.reverse(),
    //             sortResults: {
    //                 ...this.initSort,
    //                 [key]: this.state.sortResults[key] === "asc" ? "desc" : "asc"
    //             },
    //         });
    //     } else {
    //         sortedEmps = this.state.filteredResults.sort((a, b) => {
    //             a = a[key];
    //             b = b[key];

    //             if (primary) {
    //                 if (secondary && a[primary] === b[primary]) {

    //                 }
    //                 return a[secondary].localeCompare(b[secondary]);
    //             } else {
    //                 return a.localeCompare(b);
    //             }
    //         });

    //         this.setState({
    //             filteredResults: sortedEmps,
    //             sortResults: {
    //                 ...this.initSort,
    //                 [key]: "asc",
    //             },
    //         });
    //     }
    // };

    // searchByEmployee = (input) => {
    //     if (input) {
    //         this.setState({
    //             filteredResults: this.state.results.filter((employee) => {
    //                 return (
    //                     employee.name.first
    //                         .toLowerCase()
    //                         .toLowerCase()
    //                         .includes(input)
    //                 );
    //             }),
    //         });
    //     } else {
    //         this.setState({ filteredResults: this.state.results });
    //     }
    // };

    render() {
        return (
            <div className="container">
                <Header />
                <SearchForm
                    value={this.state.search}
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}
                />
                <EmployeeTable
                    results={this.state.results}
                    filteredResults={this.state.filteredResults}
                    onSortChange={this.state}
                // sortBy={this.sortBy}
                />
            </div>
        );
    }
}

export default SearchEmployeeContainer;