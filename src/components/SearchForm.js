import React from "react";

function SearchForm(props) {
    return (
        <form className="form-inline" onSubmit={props.handleFormSubmit}>
            <label htmlFor="search">Search:</label>
            <input
                onChange={props.handleInputChange}
                value={props.value}
                name="search"
                type="search"
                className="form-control"
                placeholder="Search for an employee by name"
            />
            <button onClick={props.handleFormSubmit} className="btn btn-primary mt-3">
                Search
            </button>
        </form>
    );
}

export default SearchForm;