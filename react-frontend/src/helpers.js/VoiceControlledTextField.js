import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import MicIcon from '@mui/icons-material/Mic';

function VoiceControlledTextField(props) {
    const [value, setValue] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef();

    useEffect(() => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'de-DE';
        recognitionRef.current = recognition;

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            setValue(transcript);
            props.onChange({target: {name: props.name, value: transcript}});
        };

        recognition.onend = () => {
            setIsRecording(false);
        };

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, [props]);

    const startRecording = () => {
        recognitionRef.current.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        recognitionRef.current.stop();
    };

    const handleInputChange = (event) => {
        setValue(event.target.value);
        props.onChange(event);
    };

    return (
        <div className="voice-controlled-text-field">
            <TextField
                placeholder={props.placeholder}
                name={props.name}
                type={props.type}
                value={value}
                onChange={handleInputChange}

                InputProps={{
                    endAdornment: (
                        <MicIcon
                            onMouseDown={startRecording}
                            onMouseUp={stopRecording}
                            onMouseLeave={stopRecording}
                            style={{ backgroundColor: isRecording ? '#ff9393' : '#bfffef' }}
                        />
                    ),
                }}
            />
        </div>
    );
}


export default VoiceControlledTextField;

