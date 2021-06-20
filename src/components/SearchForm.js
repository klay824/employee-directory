import React from "react";

function SearchForm(props) {
    return (
        <form className="form-inline" onSubmit={props.handleFormSubmit}>
            <input
                className="form-control"
                value={props.value}
                name="search"
                onChange={props.handleInputChange}
                type="search"
                placeholder="Search"
            />
        </form>
    );
}

export default SearchForm;