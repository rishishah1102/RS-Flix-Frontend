import React from 'react';
import { useNavigate } from 'react-router-dom';
import Netflix_Video from '../Images/NetflixIntro.mp4';
import '../CSS/NetflixIntro.css'

function NetflixIntro() {
  const Navigate = useNavigate();
  return (
    <div id='netflixIntro'>
      <video playsInline autoPlay loop disablePictureInPicture id='video'>
        <source src={Netflix_Video} />
      </video>
      {setTimeout(() => {
        {/* document.getElementById("netflixIntro").style.display = "none"; */}
        Navigate('/home');
      }, 4000)}
    </div>

  );
}

export default NetflixIntro;