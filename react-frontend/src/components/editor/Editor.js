import React, { useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./Editor.css";
import TextOptionsTab from "./tabs/TextOptionsTab";
import ImageOptionsTab from "./tabs/ImageOptionsTab";
import GenerateImageTab from "./tabs/GenerateImageTab";
import PencelOptionsTab from "./tabs/PencelOptionsTab";
import MemeEditorCanvas from "./components/MemeEditorCanvas";
import ImageBlock from "./models/ImageBlock";
import Pencil from "./models/Pencil";
import { Modal } from "react-bootstrap";

const {GIF} = require('./util/GIF');
const {GIFEncoder} = require('./util/GIFEncoder');

function Editor() {
  const [textBlocks, setTextBlocks] = useState([]);
  const [images, setImages] = useState([]);
  const [gifs, setGifs] = useState([]);
  const [video, setVideo] = useState(null);
  const [canvasImage, setCanvasImage] = useState(null);
  const [pencil, setPencil] = useState(new Pencil("red", 5));
  const [gifEncoder, setGifEncoder] = useState({});
  const [animate, setAnimate] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
  const [modalUploadImageShow, setModalUploadImageShow] = React.useState(false);

  const canvasRef = React.useRef(null);

  function addTextBlock(textBlock) {
    let newTextBlocks = textBlocks.slice();
    newTextBlocks.unshift(textBlock);
    setTextBlocks(newTextBlocks);
  }

  function updateTextBlocks() {
    let newTextBlocks = textBlocks.slice();
    setTextBlocks(newTextBlocks);
  }

  function updateImages() {
    let newImages = images.slice();
    setImages(newImages);
  }

  function addImage(src) {
    let newImages = images.slice();

    if(src.startsWith("data:image/gif"))
    {
      setTimeout(()=>{
        let myGif = GIF();                  // creates a new gif  
        myGif.onerror = function(e){
          console.log("Gif loading error " + e.type);
        }
        console.log(src);
        myGif.load(src);  
        myGif.onload = () =>
        {
          if (gifs.length == 0)
          {
            setFrameCount(myGif.frames.length);
            setAnimate(true);
          }

          let newGifs = gifs.slice();
          newGifs.unshift(myGif);
          setGifs(newGifs);
        };
      },0);
    }
    else if(src.startsWith("blob:"))
    {
      setVideo(src);
      setAnimate(true);
    }

      let newImage = new ImageBlock();
      newImage.src = src;
      newImages.unshift(newImage);
      setImages(newImages);
  }

  function changePencil(newPencil) {
    setPencil(newPencil);
  }

  function updateCanvas()
  {
    let dataUrl = ""; 

    console.log("Hallo");
    // old condition: images.some(i => i.src.startsWith("data:image/gif"))
    if (animate)
    {
      var encoder = new GIFEncoder();
      encoder.start();
      console.log("start encoder");
      console.log(frameCount);
      setGifEncoder({"encoder" : encoder, "isEncoding" : true, "frameCount" : frameCount, "callback" : () => 
      {
        console.log("callback");

        encoder.finish();

        var binary_gif = encoder.stream().getData() //notice this is different from the as3gif package!
        dataUrl = 'data:image/gif;base64,'+ btoa(binary_gif);
        console.log(dataUrl);
        console.log("Finished Encoding Gif");
        setGifEncoder(null);
        setCanvasImage(dataUrl);
        setModalUploadImageShow(true);
      }});
    }
    else
    {
      dataUrl = canvasRef.current.toDataURL(); 
      setCanvasImage(dataUrl);
      setModalUploadImageShow(true);
    }
  }

  return (
    <Container className="editor-layout-container">
      <Row className="justify-content-between">
      <Col md={10} lg={5}  className="editor-layout-col align-end text-align-end fit-content">
          <MemeEditorCanvas video={video} frameCount={frameCount} setFrameCount={setFrameCount} animate={animate} setAnimate={setAnimate} ref={canvasRef} gifEncoder={gifEncoder} gifs={gifs} textBlocks={textBlocks} images={images} pencil={pencil}/>
        </Col>
        <Col
          md={10}
          lg={5}
          className="editor-layout-col editor-options-container border border-secondary"
          style={{ overflow: "overlay" }}
        >
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Image">
              <ImageOptionsTab
                addImage={addImage}
                images={images}
                updateImages={updateImages}
              />
            </Tab>
            <Tab eventKey="profile" title="Text">
              <TextOptionsTab animate={animate} updateTextBlocks={updateTextBlocks} addTextBlock={addTextBlock} textBlocks={textBlocks}/>
            </Tab>
            <Tab eventKey="pencil" title="Pencil">
              <PencelOptionsTab pencil={pencil} changePencil={changePencil} />
            </Tab>
            <Tab eventKey="generate" title="Generate">
              <GenerateImageTab modalUploadImageShow={modalUploadImageShow} setModalUploadImageShow={setModalUploadImageShow} images={images} canvasImage={canvasImage} updateCanvas={updateCanvas} text={"test"}/>
            </Tab>
          </Tabs>
        </Col>
      </Row>

    </Container>
  );
}

export default Editor;
