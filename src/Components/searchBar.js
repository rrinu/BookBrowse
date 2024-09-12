import React, { useState }  from "react";
import ClearIcon from '@mui/icons-material/Clear';

export default function SearchBar(props){
    const [inputValue,setInputValue]=useState('');
    const onInputChange=(e)=>{
        setInputValue(e.target.value);
        }
    const onButtonClick=()=>{
        props.onSearch(inputValue);
    }
    const clearResults=()=>{
        setInputValue("");
        props.bookResults([]);
        props.onSearch('');
    }
return(
    <div className="searchBar">
        <input type="text" placeholder="Search for Book or author" value={inputValue} onChange={onInputChange} className="searchInput"/>
        {inputValue && (
        <ClearIcon className="clearIcon" onClick={clearResults} />
      )}
        <button onClick={onButtonClick} className="searchButton">Search</button>
    </div>
)
}