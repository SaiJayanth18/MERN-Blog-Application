import React, { useState } from 'react'
import {BiSearchAlt2} from 'react-icons/bi'
import {  useNavigate } from "react-router-dom";
const SearchForm = () => {
    // 1. State Hook to manage the search term
    const [searchTerm, setSearchTerm] = useState("");
    // 2. useNavigate Hook for navigation
    const navigate =useNavigate()
 // 3. Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault() ; 
        if(searchTerm){
             // 4. Navigating to a new route with the search term as a query parameter
            navigate(`/?search=${searchTerm}`)
        }
 // 5. Clearing the search term after submission
        setSearchTerm("")
    }

  
    return (
     
        <form
            className="search-form"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                name="search"
                placeholder="Search..."
                className=" m-4"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
            />

            <button type="submit" className={searchTerm.trim() ? 'searchBtn' : 'disBtn'}  ><i> <BiSearchAlt2/> </i> </button>
        </form>
    )
}

export default SearchForm