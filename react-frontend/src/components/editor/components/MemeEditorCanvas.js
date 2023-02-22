import React from "react";
import { useRef, useCallback, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import DrawnLine from "../models/DrawnLine";
import { GpsFixedSharp } from "@mui/icons-material";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Modal from 'react-bootstrap/Modal';

const MemeEditorCanvas = React.forwardRef((props, canvasRef) => {
  const [canvasWidth, setCanvasWidth] = useState(500);
  const [canvasHeight, setCanvasHeight] = useState(500);
  const [lines, setLines] = useState([]);
  const [isPainting, setIsPainting] = useState(false);
  const [progress, setProgress] = useState(0);
  // const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [mousePosition, setMousePosition] = useState(undefined);
  const [fps, setFps] = useState(15);
  const [displayFrameIndex, setDisplayFrameIndex] = useState(0);

  var currentFrameIndex = 0;
  var fpsInterval = 0, now = 0, then = 0, elapsed = 0;
  var stop = false;

  var reqanimationreference = null;

  const startPaint = useCallback((event) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setMousePosition(coordinates);
      setIsPainting(true);
    }
  }, []);

  const loadImage = (src) => {
    var p = new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = "HTTPS://REMOTE.HOST/IMG";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
    return p;
  };

//   useEffect(() => {
//     reqanimationreference = requestAnimationFrame(update);
//  }, [currentFrameIndex]);

  const draw = () => {
    var canvas = canvasRef.current;
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    Promise.all(props.images.map((img) => loadImage(img.src)))
      .then((imgs) => {
        props.images.forEach((image, i) => {
          if (!imgs[i].src.startsWith("data:image/gif"))
          {
            let ratio = imgs[i].height / imgs[i].width;
            ctx.drawImage(
              imgs[i],
              image.x,
              image.y,
              image.size,
              image.size * ratio
            );
        }
        });
      })
      .then((i) => {
        props.textBlocks.map((element) => {
          drawTextBlock(ctx, element);
        });
      })
      .then((i) => {
        lines.map((element) => {
          drawLine(ctx, element);
        });
      });

    ctx.restore();
  };

  const drawTextBlock = (ctx, textBlock) => {
    ctx.textBaseline = "top";
    ctx.font = textBlock.fontSize + "px " + textBlock.fontFamily;

    var textWidth = ctx.measureText(textBlock.text).width;
    var width = textBlock.width;
    var height = textBlock.height;
    ctx.fillStyle = textBlock.backgroundColor;
    ctx.fillRect(textBlock.x, textBlock.y, width, height);
    ctx.fillStyle = textBlock.textColor;
    ctx.fillText(
      textBlock.text,
      parseInt(textBlock.x) + ((textBlock.width - textWidth) / 2.0),
      textBlock.y + (height - textBlock.fontSize) / 2
    );
  };

  useEffect(() => {
    draw();
  }, [props.images, props.textBlocks, canvasHeight, canvasWidth, props.animate]);

  function startAnimating() {
    fpsInterval = 1000 / fps;
    then = Date.now();
    animate();
  }

  function animate() {

    if (stop) 
    {
      if (reqanimationreference !== null)
      {
        cancelAnimationFrame(reqanimationreference);
      }
        return;
    }

    reqanimationreference = requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) 
    {
        then = now - (elapsed % fpsInterval);
        // Put your drawing code here
        update();
    }
  }

   // main update function
   function update() 
   {
    console.log(props.animate);

      var canvas = canvasRef.current;
      var ctx = canvas.getContext("2d");
      props.gifs.forEach((gif, i) => {
        if(!gif.loading) 
        { 
          if (!props.animate)
          {
            drawImage(ctx, gif.frames[0].image,0,0, 1, 0); // displays the current frame.
          }
          else
          {
            drawImage(ctx, gif.frames[currentFrameIndex].image,0,0, 1, 0); // displays the current frame.
          }
        }
      });

      if(props.video)
      {
        ctx.drawImage(document.querySelector("video"), 0, 0, canvas.width, canvas.height);
      }

      props.textBlocks.map((textBlock) => {
        if (textBlock.fromTimeFrame < currentFrameIndex && textBlock.toTimeFrame > currentFrameIndex)
        {
          drawTextBlock(ctx, textBlock);
        }
      });

      lines.map((element) => {
        drawLine(ctx, element);
      });

      if (props.gifEncoder)
      {
        if (props.gifEncoder.isEncoding)
        {
          setShowProgressModal(true);
          if(props.gifEncoder.frameCount > 0)
          {
            props.gifEncoder.frameCount -= 1; 
            setProgress(props.gifEncoder.frameCount);
            props.gifEncoder.encoder.addFrame(canvasRef.current.getContext("2d"));
          }
          else
          {
            props.gifEncoder.isEncoding = false;
            setShowProgressModal(false);
            props.gifEncoder.callback();
          }
        }
      }

      currentFrameIndex = currentFrameIndex + 1 >= props.frameCount ? 0 : currentFrameIndex + 1;
      setDisplayFrameIndex(currentFrameIndex);
   }

  useEffect(() => {
    currentFrameIndex = 0;

    if (reqanimationreference !== null)
    {
      cancelAnimationFrame(reqanimationreference);
    }

    if(props.animate)
    {
      stop = false;
      startAnimating();
      if (props.video)
      {
        document.getElementById("video").load();
      }
    }
    else
    {
      stop = true;
      if (props.video)
      {
        document.getElementById("video").pause();
      }
    }

  }, [props.gifs, props.textBlocks, props.gifEncoder, props.animate, fps, props.frameCount]);

  // Function draws an image
  function drawImage(ctx, image, x, y, scale, rot){
    var canvas = document.getElementById('canvas');
    ctx.setTransform(scale,0,0,scale,x,y);
    ctx.rotate(rot);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }

  useEffect(() => {
    var canvas = canvasRef.current;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener("mousedown", startPaint);
    return () => {
      canvas.removeEventListener("mousedown", startPaint);
    };
  }, [startPaint]);

  const paint = useCallback(
    (event) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          let newLine = new DrawnLine(
            mousePosition.x,
            mousePosition.y,
            newMousePosition.x,
            newMousePosition.y,
            props.pencil.color,
            props.pencil.lineWidth
          );
          lines.push(newLine);

          setMousePosition(newMousePosition);

          var canvas = canvasRef.current;
          var ctx = canvas.getContext("2d");
          drawLine(ctx, newLine);
          // draw();
        }
      }
    },
    [isPainting, mousePosition]
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener("mousemove", paint);
    return () => {
      canvas.removeEventListener("mousemove", paint);
    };
  }, [paint]);

  const exitPaint = useCallback(() => {
    setIsPainting(false);
    setMousePosition(undefined);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener("mouseup", exitPaint);
    canvas.addEventListener("mouseleave", exitPaint);
    return () => {
      canvas.removeEventListener("mouseup", exitPaint);
      canvas.removeEventListener("mouseleave", exitPaint);
    };
  }, [exitPaint]);

  const getCoordinates = (event) => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  const drawLine = (ctx, drawnLine) => {
    ctx.strokeStyle = drawnLine.color;
    ctx.lineJoin = "round";
    ctx.lineWidth = drawnLine.lineWidth;

    ctx.beginPath();
    ctx.moveTo(drawnLine.fromX, drawnLine.fromY);
    ctx.lineTo(drawnLine.toX, drawnLine.toY);
    ctx.closePath();

    ctx.stroke();
  };

  return (
    <Container style={{ width: "100%", height: "100%" }}>
        {
          props.animate && 
            <Row>
              <Col>
                {displayFrameIndex} / 
                {props.frameCount}
              </Col>
            </Row>   
        }
      <Row>
        <Col className="col-auto">
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            className="border border-secondary"
          />
          {
            props.video && 
            <video loop autoPlay muted playsInline controls id="video" style={{width: "0", height: "0"}} src={props.video}></video>
          }
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Label>Canvas Width: </Form.Label>
          <Form.Control
            value={canvasWidth}
            onChange={(evt) => setCanvasWidth(evt.target.value)}
            type="number"
            placeholder="0"
          />
        </Col>
        <Col>
          <Form.Label>Canvas Height: </Form.Label>
          <Form.Control
            value={canvasHeight}
            onChange={(evt) => setCanvasHeight(evt.target.value)}
            type="number"
            placeholder="0"
          />
        </Col>
      </Row>

      <Row>
        <Col>

                <Form.Label>Animate: </Form.Label>
                <Form.Check           
          type="switch"
          checked={props.animate}
          onChange={() => {props.setAnimate(!props.animate)}}
        />
        </Col>
      </Row>

      <Row>
        <Col>
        <Form.Label>Frames per Second: </Form.Label>
          <Form.Control
            value={fps}
            disabled={true}
            // disabled={!props.animate}
            onChange={(evt) => setFps(evt.target.value)}
            type="number"
            placeholder="0"
          />
        </Col>
        <Col>
        <Form.Label>Frame Count: </Form.Label>
          <Form.Control
            value={props.frameCount}
            disabled={!props.animate}
            onChange={(evt) => props.setFrameCount(evt.target.value)}
            type="number"
            placeholder="0"
          />
        </Col>
      </Row>

      <Modal
        show={showProgressModal}
        onHide={() => setShowProgressModal(false)}
      >
        Recording frames {progress}
      </Modal>

    </Container>
  );
});

export default MemeEditorCanvas;
