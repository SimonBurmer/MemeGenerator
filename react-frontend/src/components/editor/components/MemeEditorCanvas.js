import React from "react";
import {useRef, useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';


function MemeEditorCanvas(props) {
  const canvasRef = useRef(null);
  const [textBlocks, setTextBlocks] = useState(props.textBlocks);
  const [images, setImages] = useState(props.images);
  const [canvasWidth, setCanvasWidth] = useState(500);
  const [canvasHeight, setCanvasHeight] = useState(500);

  const loadImage = (src) => 
  {
    var p = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    })  
  ;
    return p;
  }

  const draw = () => {
    var canvas = canvasRef.current;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    Promise.all(props.images.map(img => loadImage(img.src))).then(imgs => {
      props.images.forEach((image, i) =>
      {
        let ratio = imgs[i].height / imgs[i].width;
        ctx.drawImage(imgs[i], image.x, image.y, image.size, image.size * ratio );
      }
      )
    }).then(i => 
      {
        props.textBlocks.map(element => {
          drawTextBlock(ctx, element);
      });
      });

    ctx.restore();
  }

  const drawTextBlock = (ctx, textBlock) => {
    console.log(textBlock)
    ctx.textBaseline = 'top';
    ctx.font = textBlock.fontSize + "px " + textBlock.fontFamily;

    var width = ctx.measureText(textBlock.text).width;

    ctx.fillStyle = textBlock.backgroundColor;
    ctx.fillRect(textBlock.x, textBlock.y, width, textBlock.fontSize);

    ctx.fillStyle = textBlock.textColor;
    ctx.fillText(textBlock.text, textBlock.x, textBlock.y);
  }

      useEffect(() => 
      { 
        draw();
      }, 
      [canvasWidth]);

    useEffect(() => 
    { 
      draw();
    }, 
    [canvasHeight]);

    useEffect(() => 
    { 
      setImages(props.images);
      draw();
    }, 
    [props.images]);

  useEffect(() => 
  { 
    setTextBlocks(props.images);
    draw();
  }, 
  [props.textBlocks]);

  return (
  <Container style={{ width: "100%", height: "100%" }}>
    <Row>
      <Col>
      <Form>
      <Form.Group className="mb-3">
        <Row >
            <Col>
            <Form.Label>Canvas Width: </Form.Label>
        <Form.Control value={canvasWidth} onChange={evt => setCanvasWidth(evt.target.value)} type="number" placeholder="0" />
            </Col>
            <Col>
            <Form.Label>Canvas Height: </Form.Label>
        <Form.Control value={canvasHeight} onChange={evt => setCanvasHeight(evt.target.value)} type="number" placeholder="0" />
            </Col>
        </Row>
      </Form.Group>
      </Form>
      </Col>
    </Row>
    <Row>
      <Col className="col-auto">
        <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="border border-secondary" />
      </Col>
    </Row>
  </Container>
      );
}

export default MemeEditorCanvas;