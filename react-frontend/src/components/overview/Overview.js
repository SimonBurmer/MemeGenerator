import React, { useState} from "react";
import MemeListContainer from "./MemeListContainer/MemeListContainer";
import Filter from "./Filter/Filter";

function Overview() {
    const [filter, setFilter] = useState({
        title: "",
        template: "",
        votesTotal: "",
        likes: "",
        dislikes: "",
        comments: "",
    });
    const [memes, setMemes] = useState([
        {
            id: 1,
            image: "https://static01.nyt.com/images/2021/05/09/fashion/07ELON-MEMES1print/07ELON-MEMES1-mediumSquareAt3X.jpg",
            title: "Meme 1",
            template: "Elon Musk",
            votesTotal: 100,
            likes: 10,
            dislikes: 5,
            comments: 10
        },
        {
            id: 2,
            image: "https://static01.nyt.com/images/2021/05/09/fashion/07ELON-MEMES1print/07ELON-MEMES1-mediumSquareAt3X.jpg",
            title: "Meme 2",
            template: "Elon Musk",
            votesTotal: 100,
            likes: 10,
            dislikes: 5,
            comments: 10
        },
        {
            id: 3,
            image: "https://static01.nyt.com/images/2021/05/09/fashion/07ELON-MEMES1print/07ELON-MEMES1-mediumSquareAt3X.jpg",
            title: "Meme 3",
            template: "Elon Musk",
            votesTotal: 100,
            likes: 10,
            dislikes: 5,
            comments: 10
        },
        {
            id: 4,
            image: "https://static01.nyt.com/images/2021/05/09/fashion/07ELON-MEMES1print/07ELON-MEMES1-mediumSquareAt3X.jpg",
            title: "Meme 4",
            template: "Elon Musk",
            votesTotal: 100,
            likes: 10,
            dislikes: 5,
            comments: 10
        },
        {
            id: 5,
            image: "https://static01.nyt.com/images/2021/05/09/fashion/07ELON-MEMES1print/07ELON-MEMES1-mediumSquareAt3X.jpg",
            title: "Meme 5",
            template: "Elon Musk",
            votesTotal: 100,
            likes: 10,
            dislikes: 5,
            comments: 10
        },
        {
            id: 6,
            image: "https://static01.nyt.com/images/2021/05/09/fashion/07ELON-MEMES1print/07ELON-MEMES1-mediumSquareAt3X.jpg",
            title: "Meme 6",
            template: "Elon Musk",
            votesTotal: 100,
            likes: 10,
            dislikes: 5,
            comments: 10
        },
        {
            id: 7,
            image: "https://static01.nyt.com/images/2021/05/09/fashion/07ELON-MEMES1print/07ELON-MEMES1-mediumSquareAt3X.jpg",
            title: "Meme 7",
            template: "Elon Musk",
            votesTotal: 100,
            likes: 10,
            dislikes: 5,
            comments: 10
        }
    ])

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