import { useState,useEffect } from 'react';
import finnHub from "../api/finnHub.js";
export default function AutoComplete() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    /*
    * The results state will hold the search results from the API.
    * the values will be displayed in the dropdown.
    * Therefore, we create a function to add the show attribute to the dropdown whenever the search results are not empty.
    * */
    const renderingDropdown = () => {
        const toShow = results.length > 0 ? "show" : "";
        return (
            <ul
                style={{
                    height: "500px",
                    overflowY: "scroll",
                    overFlowX: "hidden",
                    cursor: "pointer"

                }}
                className={`dropdown-menu ${toShow}`}
            >
                {results.map((result) => {
                    return (
                        <li
                            className="dropdown-item"
                            key={result.symbol}
                            value={result.symbol}
                        >
                            {result.description} ({result.symbol})
                        </li>
                    )
                })}
            </ul>
        )
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await finnHub.get("/search", {
                    params: {
                        q: search
                    }
                });
                console.log(response);
                setResults(response.data.result);
            } catch (e) {
                console.log(e);
            }
        }

        search.length > 1 ? fetchData() : setResults([]);

    },[search])
    // add the dependency array.
    return (
        <div className = "w-50 p-5 rounded mx-auto">
            <div className="form-floating dropdown">
                <input
                    style={{backgroundColor:"rgba(145,158,171, 0.4)"}}
                    id='search'
                    type='text'
                    className='form-control'
                    placeholder='Search'
                    autoComplete='off'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                >
                </input>
                <label htmlFor='search'>Search</label>
                {renderingDropdown()}
            </div>
        </div>
    )
}