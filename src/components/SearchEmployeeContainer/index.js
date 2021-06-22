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
        if (this.state.order === "descend") {
            this.setState({
                order: "ascend"
            })
        } else {
            this.setState({
                order: "descend"
            })
        }

        const compareFnc = (a, b) => {
            if (this.state.order === "ascend") {
                //account for missing values
                if (a[heading] === undefined) {
                    return 1;
                } else if (b[heading] === undefined) {
                    return -1;
                }
                //numerically
                else if (heading === "name") {
                    return a[heading].first.localeCompare(b[heading].first);
                } else {
                    return a[heading] - b[heading];
                }
            } else {
                //(account for missing values
                if (a[heading] === undefined) {
                    return 1;
                } else if (b[heading] === undefined) {
                    return -1;
                }
                //numerically
                else if (heading === "name") {
                    return b[heading].first.localeCompare(a[heading].first);
                } else {
                    return b[heading] - a[heading];
                }
            }
        }
        const sortedUsers = this.state.filteredResults.sort(compareFnc);
        this.setState({ filteredResults: sortedUsers });
    }

    // onSortChange = () => {
    //     const sortTypes = {
    //         up: {
    //             class: 'sort-up',
    //             fn: (a, b) => a.this.state.results.name.first - b.this.state.results.name.first
    //         },
    //         down: {
    //             class: 'sort-down',
    //             fn: (a, b) => b.this.state.results.name.first - a.this.state.results.name.first
    //         },
    //         default: {
    //             class: 'sort',
    //             fn: (a, b) => a
    //         }
    //     };

    //     const { currentSort } = this.state;
    //     let nextSort;

    //     if (currentSort === "down") {
    //         nextSort = "up";
    //     } else if (currentSort === "up") {
    //         nextSort = "default";
    //     } else if (currentSort === "default") {
    //         nextSort = "down";
    //     }

    //     this.setState({
    //         currentSort: nextSort
    //     });
    // };

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