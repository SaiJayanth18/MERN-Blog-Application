import { useState } from "react";
import { FaStar } from 'react-icons/fa'

const StarRating = ({ setStar, setStarCurrentVal, starCurrentVal }) => {
 // State to track the currently hovered star
    const [hoverVal, setHoverVal] = useState(undefined)
 // Function to handle star click event
    const handleClick = (val) => {
        setStarCurrentVal(val);
        setStar(val)
    }
// Function to handle mouse over event on star
    const handleMouseOver = (val) => {
        setHoverVal(val);
    }
     // Function to handle mouse leave event on star
    const handleMouseLeave = () => {
        setHoverVal(undefined);
    }
    return (
        <div className="StarRating-wrapper" >

            {

                [...Array(5)].map((_, index) => {

                    return (
                        <FaStar
                            key={index}
                            className="star"
                            size={21}
                            onClick={() => handleClick(index + 1)}
                            color={(hoverVal || starCurrentVal) > index ? "#0063a5" : "grey"}
                            onMouseLeave={handleMouseLeave}
                            onMouseOver={() => handleMouseOver(index + 1)}
                        />
                    )

                })
            }

        </div>

    )

}


export default StarRating; 