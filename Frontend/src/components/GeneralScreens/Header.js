import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SearchForm from './SearchForm';
import '../../Css/Header.css'
import { FaUserEdit } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import SkeletonElement from '../Skeletons/SkeletonElement';
import { AuthContext } from '../../Context/AuthContext';

const Header = () => {
    // Check if authToken exists in localStorage
    const bool = localStorage.getItem("authToken") ? true : false
    // State to manage authentication status
    const [auth, setAuth] = useState(bool)
     // Context to get information about the active user
    const { activeUser } = useContext(AuthContext)
    // State to manage loading state
    const [loading, setLoading] = useState(true)
     // Hook to navigate to different routes
    const navigate = useNavigate()
 // Effect to set authentication status and loading state
    useEffect(() => {

        setAuth(bool)
        setTimeout(() => {
            setLoading(false)
        }, 1600)

    }, [bool])

// Function to handle user logout
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate('/')
    };

    return (

        <header>
            <div className="averager">

                <Link to="/" className="logo">
                    <h5> 
                     BLOG
                    </h5>
                </Link>
                <SearchForm />
                <div className='header_options'>

                    {auth ?
                        <div className="auth_options">


                            <Link className='addStory-link' to="/addstory">Create Post </Link>


                            <Link to="/readList" className='readList-link'>
                                <p className='bookmark'>BM</p>
                                <span id="readListLength">
                                    {activeUser.readListLength}
                                </span>
                            </Link>
                            <div className='header-profile-wrapper '>


                                {loading ? <SkeletonElement type="minsize-avatar" />

                                    :

                                    <img src={`/userPhotos/${activeUser.photo}`} alt={activeUser.username} />

                                }


                                <div className="sub-profile-wrap  ">
                                    <Link className='profile-link' to="/profile"  > <FaUserEdit />  Profile </Link>

                                    <button className='logout-btn' onClick={handleLogout}> <BiLogOut />  Logout</button>

                                </div>

                            </div>


                        </div>

                        :
                        <div className="noAuth_options">

                            <Link className='login-link' to="/login"> Login </Link>

                            <Link className='register-link' to="/register"> SignUp</Link>
                        </div>

                    }
                </div>

            </div>

        </header>

    )
}

export default Header;
