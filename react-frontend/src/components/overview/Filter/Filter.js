import React from 'react';
import "./Filter.css";
import TextField from '@mui/material/TextField';
import VoiceControlledTextField from "../../../helpers.js/VoiceControlledTextField";

function Filter(props) {

    const handleChange = (event) => {
        const { name, value } = event.target;
        props.onFilterChange(value, name);
    };


    return (
        <div className="filter-container">
            <VoiceControlledTextField
                placeholder="Title ..."
                name="title"
                type={"text"}
                onChange={handleChange} // add the new handler prop
            />
            <VoiceControlledTextField
                placeholder="Creator ..."
                name="creator"
                type={"text"}
                onChange={handleChange} // add the new handler prop
            />
            <VoiceControlledTextField
                placeholder="Likes >="
                name="likes"
                type={"number"}
                onChange={handleChange} // add the new handler prop
            />
            <VoiceControlledTextField
                placeholder="Dislikes >="
                name="dislikes"
                type={"number"}
                onChange={handleChange} // add the new handler prop
            />
            <VoiceControlledTextField
                placeholder="Comments >="
                name="comments"
                type={"number"}
                onChange={handleChange} // add the new handler prop
            />
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