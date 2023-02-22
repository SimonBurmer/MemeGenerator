import React, { useState } from 'react';

function AddGIF(props) {
  const [preview, setPreview] = useState(null);

  function handleChange(event) {
    var tgt = event.target || window.event.srcElement, files = tgt.files;

    // FileReader support
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
          setPreview(fr.result);
          props.setImage(fr.result);
        }
        fr.readAsDataURL(files[0]);
    }
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
