import React, { useState} from "react";
import MemeListContainer from "./MemeListContainer/MemeListContainer";
import Filter from "./Filter/Filter";
import MemeService from "../../services/memeService";

function Overview() {
    const memeService = new MemeService();
    const [filter, setFilter] = useState({
        name: "",
        template: "",
        votesTotal: "",
        likes: "",
        dislikes: "",
        comments: "",
    });

    const [memes, setMemes] = useState(memeService.getAllMemes())

    const handleFilterChange = (value, name) => {
        // update the filter object with the new value
        setFilter({...filter, [name]: value});
    };

    return (
        <>
            <Filter onFilterChange={handleFilterChange}></Filter>
            <MemeListContainer memes={memes} filter={filter}></MemeListContainer>
        </>
    );
}

export default Overview;