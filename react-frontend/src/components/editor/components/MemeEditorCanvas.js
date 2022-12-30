import React from "react";
import {useRef, useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';


function MemeEditorCanvas(props) {
  const canvasRef = useRef(null);
  const [textBlocks, setTextBlocks] = useState(props.textBlocks);
  const [images, setImages] = useState(props.images);

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

  const draw = (ctx) => {
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

  // Changes Image
  useEffect(() => 
  { 
    setImages(props.images);
    var canvas = canvasRef.current;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(ctx);
  }, 
  [props.images]);

  // Changes Text
  useEffect(() => 
  { 
    setTextBlocks(props.textBlocks);
    var canvas = canvasRef.current;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(ctx);
  }, 
  [props.textBlocks]);

  return (
  <Container style={{ width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} width="500" height="500" className="border border-secondary" />

  </Container>
      );
}

export default MemeEditorCanvas;