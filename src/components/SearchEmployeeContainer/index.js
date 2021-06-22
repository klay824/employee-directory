import React, { Component } from "react";
import SearchForm from "../SearchForm";
import Header from "../Header";
import EmployeeTable from "../EmployeeTable";
import API from "../../utils/API";

class SearchEmployeeContainer extends Component {
    state = {
        search: "",
        results: [],
        order: "descend",
        filteredResults: []
    };

    // list of table headings to be mapped in the table
    tableHeadings = [
        { name: "ID" },
        { name: "Photo" },
        { name: "Name" },
        { name: "Phone" },
        { name: "Email" },
        { name: "Age" },
        { name: "Location" }
    ]

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

    // as the user types, it begins to search the results to filter out the specific employee being searched for
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



    handleSort = heading => {
        // sets the order to "descend" or "ascend"
        if (this.state.order === "descend") {
            this.setState({
                order: "ascend"
            })
        } else {
            this.setState({
                order: "descend"
            })
        }

        // comparison function to compare each heading to determine order of Names
        const compareFunc = (a, b) => {
            if (this.state.order === "ascend") {

                if (a[heading] === undefined) {
                    return 1;
                } else if (b[heading] === undefined) {
                    return -1;
                }

                else if (heading === "name") {
                    return a[heading].first.localeCompare(b[heading].first);
                } else {
                    return a[heading] - b[heading];
                }
            } else {

                if (a[heading] === undefined) {
                    return 1;
                } else if (b[heading] === undefined) {
                    return -1;
                }

                else if (heading === "name") {
                    return b[heading].first.localeCompare(a[heading].first);
                } else {
                    return b[heading] - a[heading];
                }
            }
        }
        const sortedUsers = this.state.filteredResults.sort(compareFunc);
        this.setState({ filteredResults: sortedUsers });
    }

    // renders each component
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

                    filteredResults={this.state.filteredResults}
                    tableHeadings={this.tableHeadings}
                    handleSort={this.handleSort}
                />
            </div>
        );
    }
}

export default SearchEmployeeContainer;