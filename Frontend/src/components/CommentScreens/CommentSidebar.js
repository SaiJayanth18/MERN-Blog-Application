import React, { useState, useEffect, useRef } from 'react';
import StoryComments from './StoryComments';
import axios from 'axios';
import AddComment from './AddComment';

const CommentSidebar = ({ slug, sidebarShowStatus, setSidebarShowStatus, activeUser }) => {
 // State for keeping track of the total number of comments
  const [count, setCount] = useState(0)
   // State for storing the list of comments
  const [commentlist, setCommentList] = useState([])
// Reference to the sidebar element
  const sidebarRef = useRef(null);
// useEffect to fetch comments when component mounts
  useEffect(() => {
    getStoryComments()
  }, [setCommentList])

// Function to fetch comments for the story
  const getStoryComments = async () => {
    try {
      const { data } = await axios.get(`/comment/${slug}/getAllComment`)
      setCommentList(data.data)
      setCount(data.count)
    }
    catch (error) {
      console.log(error.response.data.error);
    }
  }
 // useEffect to detect clicks outside the sidebar and close it
  useEffect(() => {
    const checkIfClickedOutside = e => {

      if (sidebarShowStatus && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarShowStatus(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [sidebarShowStatus])



  return (

    <div ref={sidebarRef} className={sidebarShowStatus ? "Inclusive-comment-sidebar visible" : "Inclusive-comment-sidebar hidden "}  >

      <div className='sidebar-wrapper'>

        <AddComment setSidebarShowStatus={setSidebarShowStatus} slug={slug} getStoryComments={getStoryComments} activeUser={activeUser} count={count} />

        <StoryComments commentlist={commentlist} activeUser={activeUser} count={count} />
      </div>

    </div>

  )
}

export default CommentSidebar;
