import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange, onSubmit}) => {
  return(
    <div>
      <p className="f3 gold fw8">
        {'The Brain is smart enough to detect faces in your picture. Do give it a try!'}
      </p>
      <div className="center">
        <div className=" center form pa4 br3 shadow-5">
          <input className="f4 bw0 bg-gold pa2 w-70 center" type="text" onChange={onInputChange} />
          <button className="ba b--black br2 bw2 w-30 f4 grow link ph3 pv2 gold dib bg-black" onClick={onSubmit}>Detect!</button>
      </div>
    </div>
  </div>
  );
}

export default ImageLinkForm;
