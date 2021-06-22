import React from 'react';
import "./style.css";

function EmployeeTable({ filteredResults, tableHeadings, handleSort }) {
    return (
        <div className="container">
            <table className="table col-10">
                <thead>
                    <tr>
                        {/* maps over table headings to render them all */}
                        {tableHeadings.map(({ name }) => {
                            return (
                                <th className="nameCol"
                                    key={name}
                                    onClick={() => {
                                        handleSort(name.toLowerCase());
                                    }}
                                >
                                    {name}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {/* maps over results to map them to the table */}
                    {filteredResults.map((result, index) => {
                        const { first, last } = result.name;
                        const fullName = `${first} ${last}`;
                        const { city, state } = result.location;
                        const cityState = `${city}, ${state}`

                        return (
                            <tr key={index + 1}>
                                <th>{index + 1}</th>
                                <td><img alt={fullName} src={result.picture.large}></img></td>
                                <td>{fullName}</td>
                                <td>{result.phone}</td>
                                <td>{result.email}</td>
                                <td>{result.dob.age}</td>
                                <td>{cityState}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeTable;