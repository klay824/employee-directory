import React from "react";

function SearchForm(props) {
    return (
        <div className="text-center">
            <form className="col" onSubmit={props.handleFormSubmit}>
                <input
                    className="form-control"
                    value={props.value}
                    name="search"
                    onChange={props.handleInputChange}
                    type="text"
                    placeholder="Search"
                />
            </form>
        </div>
    );
}

export default SearchForm;