import React from 'react';
import "./Filter.css";
import TextField from '@mui/material/TextField';

function Filter(props) {

    const handleChange = (event) => {
        // get the value from the input field
        const {name, value} = event.target;
        // call the onFilterChange prop function with the value and type
        props.onFilterChange(value, name);
    };

    return (
        <div className="filter-container">
            <input className="filter-input-text" type="text" name={"title"} onChange={handleChange}
                   placeholder="Title..."/>
            {/*
            <input className="filter-input-text" type="text" name={"template"} onChange={handleChange}
                   placeholder="Template..."/>
                   */}
            <input className="filter-input-text" type="text" name={"creator"} onChange={handleChange}
                   placeholder="Creator..."/>
            <input className="filter-input-number" type="number" name={"likes"} onChange={handleChange}
                   placeholder="Likes >="/>
            <input className="filter-input-number" type="number" name={"dislikes"} onChange={handleChange}
                   placeholder="Dislikes >="/>
            <input className="filter-input-number" type="number" name={"comments"} onChange={handleChange}
                   placeholder="Comments >="/>
            <TextField
                id="start-date"
                label="Creation Date >="
                type="date"
                sx={{width: 200, marginLeft: 2}}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleChange}
                name="creationDate"
            />
        </div>
    );
}

export default Filter;