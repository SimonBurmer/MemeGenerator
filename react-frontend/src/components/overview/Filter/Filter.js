import React from 'react';
import "./Filter.css";
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, {Dayjs} from 'dayjs';
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
            <input className="filter-input-text" type="text" name={"template"} onChange={handleChange}
                   placeholder="Template..."/>
            <input className="filter-input-text" type="text" name={"creator"} onChange={handleChange}
                   placeholder="Creator..."/>
            <input className="filter-input-number" type="number" name={"votesTotal"} onChange={handleChange}
                   placeholder="#Votes"/>
            <input className="filter-input-number" type="number" name={"comments"} onChange={handleChange}
                   placeholder="#Comments"/>
            <TextField
                id="date"
                label="Birthday"
                type="date"
                defaultValue="2017-05-24"
                sx={{width: 200}}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
    );
}

export default Filter;