import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import React from "react";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/Image";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function AddRandom(props) {
  const [preview, setPreview] = useState([]);
  const [randImg, setRandImg] = useState();
  const [selected, setSelected] = useState(-1);

  const fetchMemes = async () => {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();
    setPreview(data.data.memes);
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  useEffect(() => {
    console.log(preview.length);
    if (preview.length > 0) {
      handleClick();
    }
  }, [preview]);

  function handleClick() {
    const randNum = Math.floor(Math.random() * preview.length);
    let randImg = preview[randNum].url;
    console.log(randImg);
    setRandImg(randImg);
    props.addImage(randImg);
  }

  return (
    <div className="Container">
      <Row></Row>
      <Row>
        <img src={randImg} className="img-fluid hover-shadow" alt="" />
        <Button onClick={handleClick}>Reroll</Button>
      </Row>
    </div>
  );
}
export default AddRandom;
