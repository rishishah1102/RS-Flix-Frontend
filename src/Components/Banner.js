import React, { useEffect, useState } from 'react';
import instance from '../Utils/axios';
import request from '../Utils/request';
import '../CSS/Banner.css';
import YouTube from "react-youtube";
import axios from "axios";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [info, setInfo] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const req = await instance.get(request.fetchNetflixOriginals);
      setMovie(req.data.results[Math.floor(Math.random() * req.data.results.length - 1)]);
    };
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1
    },
  };
  const handlePlay = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      const query = movie?.name || movie?.title || movie?.original_title;
      const key = "AIzaSyCI_ZeQHva1fiUyzl7DAfZ_IFjryk7Dspc";
      const url = 'https://youtube.googleapis.com/youtube/v3/search?type=video&q=' + query + ' trailer&key=' + key;
      const movieTrailer = async () => {
        let request = await axios.get(url)
          .then((response) => {
            const v = response.data.items[1].id.videoId;
            setTrailerUrl(v);
          });
        return request;
      }
      movieTrailer();
    }
  };

  const handleInfo = () => {
    setInfo(!info);
  }

  if (movie.backdrop_path === undefined) {
    return;
  } else {
    return (
      <>
        <header
          className='banner'
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          <div className='banner_contents'>
            <h1 className='banner_title'>{movie?.title || movie?.name || movie?.original_name}</h1>

            <div className='banner_buttons'>
              <button className='banner_button' onClick={() => handlePlay(movie)}>{trailerUrl ? '◼ \u00A0 Stop' : '▶ \u00A0 Play'}</button>
              <button className='banner_button' onClick={handleInfo}>🛈 &nbsp; Info</button>
            </div>

            {info ? <h1 className='banner_description'>
              {truncate(movie?.overview, 150)}
            </h1> : null}
          </div>

          <div className='banner_fadeBottom' />
        </header>
        {trailerUrl ? <YouTube videoId={trailerUrl} opts={opts} /> : null}
      </>
    );
  }
};

export default Banner;
