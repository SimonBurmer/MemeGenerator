import React, { useEffect, useState } from "react";
import MemeListContainer from "./MemeListContainer/MemeListContainer";
import Filter from "./Filter/Filter";
import MemeService from "../../services/memeService";
import NoMemesYet from "./NoMemesYet/NoMemesYet";
import UserService from "../../services/userService";

function Overview({isUserProfile}) {
    const memeService = new MemeService();
    const userService = new UserService();
    const [filter, setFilter] = useState({
        title: "",
        creator: "",
        likes: "",
        dislikes: "",
        comments: "",
        creationDate: "",
    });

    const [memes, setMemes] = useState([]);

    const fetchMemes = async () => {
        const currentUser = await userService.getCurrentUser();
        const allMemes = isUserProfile ? await memeService.getAllMemesByUserId(currentUser._id) : await memeService.getAllMemes();
        setMemes(allMemes);
    };

    // gets and sets the memes when the view mounts
    useEffect(() => {
        fetchMemes();
    }, []);

    const handleFilterChange = (value, name) => {
        // update the filter object with the new value
        setFilter({...filter, [name]: value});
    };

    return (
        <>
            {memes.length === 0 ? (
                <NoMemesYet isUserProfile={isUserProfile}></NoMemesYet>
            ) : (
                <>
                    <Filter onFilterChange={handleFilterChange}></Filter>
                    <MemeListContainer
                        memes={memes}
                        filter={filter}
                        fetchMemes={fetchMemes}
                        isUserProfile={isUserProfile}
                    ></MemeListContainer>
                </>
            )}
        </>
    );
}

export default Overview;
