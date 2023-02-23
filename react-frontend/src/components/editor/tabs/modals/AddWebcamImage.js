import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/Row';

function AddWebcamImage(props) {
    const [img, setImg] = useState(null);
    const webcamRef = useRef(null);

    const videoConstraints = {
        //width: 420,
        //height: 420,
        facingMode: "user",
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImg(imageSrc);
        props.setImage(imageSrc)
    }, [webcamRef]);

    return (
        <div className="Container">
            {img === null ? (
                <>
                    <Row>
                        <Webcam
                            audio={false}
                            mirrored={true}
                            height={400}
                            width={400}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                        />
                    </Row>
                    <Row>
                        <Button onClick={capture}>Capture a photo</Button>
                    </Row>
                </>
            ) : (
                <>
                    <Row>
                        <img src={img} alt="screenshot" className="mb-2" width="500" height="600"/>
                    </Row>
                    <Row>
                        <Button onClick={() => setImg(null)}>Retake</Button>
                    </Row>
                </>
            )}
        </div>
    );
}

export default AddWebcamImage;