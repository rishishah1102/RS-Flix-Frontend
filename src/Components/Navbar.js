import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Navbar.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';

function Navbar({isFav}) {
    const [show, handleShow] = useState(false);
    const [click, setClick] = useState(false);
    const cookie = new Cookies();

    const Navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            }
            else {
                handleShow(false);
            }
        });
    });

    const handleClick = () => {
        setClick(!click);
    }
    if (click) {
        setTimeout(handleClick, 15000);
    }

    const handleLogout = () => {
        cookie.remove('jwtToken');
        Navigate('/login');
    }

    const handleDelete = () => {
        axios.post('https://rs-flixbackend.onrender.com/navbar', '', {headers: {Authorization: cookie.get('jwtToken')}})
        .then((respone) => {
            if (respone.status === 200) {
                toast.success("The account has been deleted successfully");
                cookie.remove('jwtToken');
                setTimeout(() => {
                    Navigate('/');
                }, 2000);
            }
        })
        .catch((err) => {
            if (err.respone.status === 503) {
                toast.error("The server is down, Please try again later!");
            }
        });
    }

    return (
        <div className={`nav ${show || !isFav ? "nav_black" : null}`}>
            <img
                className='nav_logo'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/330px-Netflix_2015_logo.svg.png'
                alt='Netflix Logo'
                onClick={() => {Navigate('/netflixintro')}}
            />
            <div className="nav_container" onClick={handleClick}>
                <button type="button" className="nav_button">
                    ☰
                </button>
            </div>

            <div className={`nav_dropdown ${click && 'show'}`}>
                <ul>
                    <li onClick={() => {isFav ? Navigate('/favourites') : Navigate('/home')}}>{isFav ? "My-Favourites" : "Home"}</li>
                    <li onClick={handleDelete}>Delete Account</li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </div>

            <ToastContainer position="bottom-right" theme="colored" />
        </div>
    );
};

export default Navbar;
