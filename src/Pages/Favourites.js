import React, { useEffect, useState } from 'react';
import "../CSS/Favourite.css"
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YouTube from "react-youtube";
import Cookies from 'universal-cookie';

let fclickIndex;
const fimageUrl = "https://image.tmdb.org/t/p/original/";
function Favourites() {
  const [favMovie, setFavMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [hover, sethover] = useState(false);
  const cookie = new Cookies();

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get('https://rs-flixbackend.onrender.com/favourites', {headers: {Authorization: cookie.get('jwtToken')}});
      if (response.data === undefined || response.data.data.length === 0) {
        return;
      }
      else {
        setFavMovie(response.data.data);
      }
      return response;
    };
    fetchMovie();
  }, []);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1
    },
  };

  const handleClick = (movie) => {
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

  const handleButton = (index) => {
    fclickIndex = index;
    sethover(!hover);
  }

  if (hover) {
    setTimeout(() => {
      sethover(false);
    }, 15000);
  }

  const handleList = (movie) => {
    axios.post('https://rs-flixbackend.onrender.com/favourites', movie, {headers: {Authorization: cookie.get('jwtToken')}})
      .then((response) => {
        let status = response.status;
        if (status === 200) {
          toast.success("The movie has been deleted successfully from my-favourites");
          window.location.reload(true);
        }
      })
      .catch((err) => {
        let status = err.response.status;
        if (status === 502) {
          toast.error("Error in deleting movie from favourites");
        }
      });
  }

  return (
    <div>
      <Navbar isFav={false} />
      <div className='favHeading'>
        {favMovie === undefined || favMovie.length === 0 ? <h1>Favourite List is Empty</h1> : <h1>Favourite List</h1>}
      </div>
      <div className="frow">
        <div className="frowPosters">
          {favMovie === undefined ? null : favMovie.map((movie, index) => {
            return (
              <>
                <img
                  onClick={() => handleClick(movie)}
                  key={index}
                  className="frowPoster"
                  src={`${fimageUrl}${movie.backdrop_path || movie.poster_path}`}
                  alt={movie?.name}
                />
                <div className="f_fav_button" onClick={() => handleButton(index)} key={index + 1}>
                  <button className="f_fav" key={movie.id}>⋮</button>
                  {hover && index === fclickIndex ? 
                    <div className="f_fav_dropdown" key={index} onClick={() => handleList(movie)}>
                      <ul key={index}>
                        <li key={index}>Delete &#10060;</li>
                      </ul>
                    </div> 
                  : null}
                </div>
              </>
            );
          })}
        </div>
        {trailerUrl ? <YouTube videoId={trailerUrl} opts={opts} /> : null}
      </div>
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
};

export default Favourites;