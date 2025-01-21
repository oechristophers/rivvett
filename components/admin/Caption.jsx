import React, { useState } from 'react'

export default function Caption({captions, setCaptions}) {
    const [newCaption, setNewCaption] = useState("");
    const handleAddCaption = () => {
          setCaptions([...captions, newCaption]);
          setNewCaption(""); // Clear the input after adding
        
      };

       // Handle updating a specific caption
  const handleCaptionChange = (index, value) => {
    const updatedCaptions = captions.map((caption, i) =>
      i === index ? value : caption
    );
    setCaptions(updatedCaptions);
  };

    
  return (
    <div>
         {captions.length === 0 && (
        <>
          <button
            className="btn-primary mt-2"
            onClick={(e) => {
              e.preventDefault();
              handleAddCaption();
            }}
          >
            Add media caption
          </button>
          <br />
         
        </>
      )}
     
      {captions.length > 0 &&
        captions.map((c, index) => (
          <div key={index}>
            <label>Media Captions</label>
            <input
              type="text"
              placeholder="whats what"
              value={c}
              onChange={(e) => handleCaptionChange(index, e.target.value)}
            />
            <div className="flex justify-between mb-2">
              <button
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddCaption();
                }}
              >
                Add new
              </button>
              <button
                className="btn-primary"
                onClick={(ev) => {
                  ev.preventDefault();
                  setCaptions(captions.filter((_, i) => i !== index));
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}
