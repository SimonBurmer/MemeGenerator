import React, {useEffect, useState} from 'react';
import {Form, FormLabel} from "react-bootstrap";
import "./NavigationOptions.css";
import Button from "react-bootstrap/Button";

function NavigationOptions({filteredMemes, currentMemeIndex, setCurrentMemeIndex}) {
    const [autoplayDuration, setAutoplayDuration] = useState(2);
    const [autoplay, setAutoplay] = useState(false);

    //useEffect to start the interval when autoplay is enabled
    useEffect(() => {
        if (autoplay) {
            const timer = setInterval(() => {
                handleNextMemeClicked()
            }, autoplayDuration * 1000);
            return () => clearInterval(timer);
        }
    }, [autoplay, autoplayDuration, setCurrentMemeIndex, currentMemeIndex]);

    //NavigationButton Handlers
    const handlePreviousMemeClicked = () => {
        setCurrentMemeIndex((currentMemeIndex - 1 + filteredMemes.length) % filteredMemes.length);
    }
    const handleNextMemeClicked = () => {
        // if clicking previous on the first element, start at the end
        setCurrentMemeIndex((currentMemeIndex + 1) % filteredMemes.length);
    }
    const handleRandomMemeClicked = () => {
        // if clicking previous on the first element, start at the end
        setCurrentMemeIndex(Math.floor(Math.random() * (filteredMemes.length)));
    }
    const handleAutoplayDurationChange = (event) => {
        setAutoplayDuration(event.target.value);
    };

    return (
        <div className={"singleview-navigator-container"}>
            <div className={"singleview-navigator-buttons"}>
                <Button variant="outline-secondary" onClick={handlePreviousMemeClicked}>Previous</Button>
                <Button variant="outline-secondary" onClick={handleNextMemeClicked}>Next</Button>
                <Button variant="outline-secondary" onClick={handleRandomMemeClicked}>Random</Button>
                <Button variant="outline-secondary"
                        onClick={() => setAutoplay(!autoplay)}>{autoplay ? "Stop Autoplay" : "Start Autoplay"}</Button>
            </div>
            <div className={"autoplay-selector"}>
                <FormLabel>Autoplay Duration: </FormLabel>
                <Form.Select value={autoplayDuration} onChange={handleAutoplayDurationChange}>
                    <option value={2}>2 sec</option>
                    <option value={4}>4 sec</option>
                    <option value={8}>8 sec</option>
                </Form.Select>
            </div>
        </div>
    );
}

export default NavigationOptions;