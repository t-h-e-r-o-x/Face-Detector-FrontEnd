import React from 'react';
import './FaceRecog.css';

const FaceRecog = ({imageUrl, box}) =>{
  return(
    <div className='center ma'>
      <div className='absolute mt2'>
      <img id='inputimage' src={imageUrl} alt='' width='500px' height='auto'/>
      {box.map((locale, index) => {
        return <div key={index} className='bounding-box' style={{top:locale.topRow, right:locale.rightCol, left:locale.leftCol, bottom: locale.bottomRow}}></div>
      })}
    </div>
  </div>
  );
}

export default FaceRecog;
