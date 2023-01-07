import React, { useState } from 'react';

function AddGIF() {
  const [gif, setGif] = useState(null);
  const [preview, setPreview] = useState(null);

  function handleChange(event) {
    const file = event.target.files[0];
    //setGif(file);

    //const reader = new FileReader();
    //reader.readAsDataURL(file);
    //reader.onloadend = () => {
    //  setPreview(reader.result);
    //};

    const video = document.createElement("video");
    video.src = file;

    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 200;
    video.currentTime = 0;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);


    ctx.fillStyle = "green";
    ctx.font = "40px serif";
    ctx.fillText("Hello world", 0, 50);

    var img = document.createElement("img");
    img.src = canvas.toDataURL();
    setPreview(img.src)
  }

  return (
    <div>
      <input
        type="file"
        accept="image/gif"
        onChange={handleChange}
      />
      {preview ? (
        <img src={preview} alt="Gif preview" />
      ) : (
        'No gif selected'
      )}
    </div>
  );
}

export default AddGIF;
