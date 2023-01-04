import React from 'react';

function AddVideo(props) {
  const inputRef = React.useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);

    const video = document.createElement("video");
    video.src = url;

    video.addEventListener('seeked', (event) => {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, 350, 200);
  
      var img = document.createElement("img");
      img.src = canvas.toDataURL();
      props.addImage(img.src)
      
    });
    video.currentTime = 1;
  };

  return (
    <div className="VideoInput">
      <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4" 
      />
    </div>
  );
}

export default AddVideo;
