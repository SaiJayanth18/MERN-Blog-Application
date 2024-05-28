import React, { useState, useRef } from 'react'
import axios from 'axios';
import StarRating from './StarRating';
import { BsShieldCheck, BsCheckAll } from 'react-icons/bs'
import { IoAdd } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import '../../Css/AddComment.css'

const AddComment = ({ setSidebarShowStatus, slug, getStoryComments, activeUser, count }) => {
// Create a navigation object to navigate to different routes
    const navigate = useNavigate();
     // Create a reference to the textarea element for easy access and rich-editor(bold,italic etc.)
    const textareaRef = useRef(null)
    // State variables to manage the component's state
    const [star, setStar] = useState(0);
    const [starCurrentVal, setStarCurrentVal] = useState(0);
    const [content, setContent] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [showStatus, setShowStatus] = useState(true)

// Function to handle form submission
    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
             // Send a POST request to add a comment
            await axios.post(`/comment/${slug}/addComment`, { content, star }, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            // Set a success message
            setSuccess('Added Comment successfully ')
            // Clear the success message after a delay
            setTimeout(() => {
                setSuccess('')
            }, 2700)
            // Update the comment count
            setTimeout(() => {
                document.querySelector(".commentCount").textContent = count + 1
            }, 650);
 // Clear the form inputs
            clearInputs()
 // Get the updated comments
            getStoryComments()

        }
        catch (error) {

            if (error.response.data.error === 'Jwt expired') {
                console.log("token expired ...")
                navigate('/')
            }
            setError(error.response.data.error)
            setTimeout(() => {
                setError('')
            }, 4500)
        }
    }

    const clearInputs = () => {
        setStar(0)
        setStarCurrentVal(0)
        setContent('')
        textareaRef.current.textContent = ''

    }


    return (

        <>
            <div className="sidebar-top-block">

                <h3>Responses ( <span className='sidebar-commentCount'>{count}
                </span> )   </h3>

                <div>

                    < BsShieldCheck />
                    <IoAdd onClick={() => setSidebarShowStatus(false)} className='ıoAddIcon' />
                </div>
            </div>

            {error && <div className="alert-error-message">{error}</div>}


            {activeUser.username &&

                <form className='addComment-form' onSubmit={handleSubmit}>


                    {success && <div className="alert-success-message">
                        <BsCheckAll />
                        {success}</div>}


                    <div className={showStatus ? 'activeuser-info ' : 'activeuser-info hidden '}>
                        <img src={`/userPhotos/${activeUser.photo}`} alt={activeUser.username} />
                        <span className='username'>{activeUser.username}  </span>
                    </div>

                    <div className="textarea-wrapper">
                        <div ref={textareaRef}
                            contentEditable
                            placeholder='What are your thoughts ?' id="comment"
                            name="content"
                            onKeyUp={(e) => {
                                setContent(e.target.innerHTML)
                                console.log(e.target.innerHTML)
                            }
                            }

                            onFocus={() => setShowStatus(true)}
                        ></div>
                    </div>

                    <div className={showStatus ? 'form-bottom-block' : 'form-bottom-block hidden'} >
                        <StarRating setStar={setStar} setStarCurrentVal={setStarCurrentVal} starCurrentVal={starCurrentVal} />

                        <div className="formBtn-wrapper">
                            <button type='button'
                                className='cancel-Btn'
                                onClick={() => setShowStatus(!showStatus)}
                            >Cancel </button>
                            <button type='submit' className={content === '' ? 'respond-Btn disable' : 'respond-Btn'}
                                disabled={content === '' ? true : false}
                            >Respond </button>

                        </div>
                    </div>

                </form>


            }
        </>

    )
}

export default AddComment