import React from "react";
import { useRef, useCallback, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import DrawnLine from "../models/DrawnLine";

const MemeEditorCanvas = React.forwardRef((props, canvasRef) => {
  // const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(500);
  const [canvasHeight, setCanvasHeight] = useState(500);
  const [lines, setLines] = useState([]);
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState(undefined);

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

  const draw = () => {
    var canvas = canvasRef.current;
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    Promise.all(props.images.map((img) => loadImage(img.src)))
      .then((imgs) => {
        props.images.forEach((image, i) => {
          let ratio = imgs[i].height / imgs[i].width;
          ctx.drawImage(
            imgs[i],
            image.x,
            image.y,
            image.size,
            image.size * ratio
          );
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
      textBlock.x + (width - textWidth) / 2,
      textBlock.y + (height - textBlock.fontSize) / 2
    );
  };

  useEffect(() => {
    draw();
  }, [props.images, props.textBlocks, canvasHeight, canvasWidth]);

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
          draw();
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
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3">
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
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col className="col-auto">
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            className="border border-secondary"
          />
        </Col>
      </Row>
    </Container>
  );
});

export default MemeEditorCanvas;
