import React, { useEffect, useState } from "react";
import MemeListContainer from "./MemeListContainer/MemeListContainer";
import Filter from "./Filter/Filter";
import MemeService from "../../services/memeService";

function Overview() {
  const memeService = new MemeService();
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
    const allMemes = await memeService.getAllMemes();
    setMemes(allMemes);
  };

  // gets and sets the memes when the view mounts
  useEffect(() => {
    fetchMemes();
  }, []);

  const handleFilterChange = (value, name) => {
    // update the filter object with the new value
    setFilter({ ...filter, [name]: value });
  };

  return (
    <>
      <Filter onFilterChange={handleFilterChange}></Filter>
      <MemeListContainer
        memes={memes}
        filter={filter}
        fetchMemes={fetchMemes}
      ></MemeListContainer>
    </>
  );
}

export default Overview;
