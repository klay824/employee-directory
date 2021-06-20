import React from 'react';

function EmployeeTable(props) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Photo</th>
                    <th scope="col">
                        <span onClick={() => props.sortBy("name", "last", "first")}>Name</span>
                    </th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Age</th>
                    <th scope="col">Location</th>
                </tr>
            </thead>
            <tbody>
                {props.results.map((result, index) => {
                    const { first, last } = result.name;
                    const fullName = `${first} ${last}`;
                    const { city, state } = result.location;
                    const cityState = `${city}, ${state}`

                    return (
                        <tr key={index + 1}>
                            <th>{index + 1}</th>
                            <td><img alt={fullName} src={result.picture.thumbnail}></img></td>
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
    );
}

export default EmployeeTable;