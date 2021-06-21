import React from "react";
import "./style.css";

const Header = () => {
    return (
        <header className="col-12">
            <h1 className="text-center">Employee Directory</h1>
            <h6 className="text-center">Enter an employee's name to search for a specific employee. Click <em>Name</em> to sort in ascending or descending alphabetical order by first name.</h6>
        </header>
    );
};

export default Header;