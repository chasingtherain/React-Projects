import React, { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackStats() {
    const {feedback} = useContext(FeedbackContext)
    let feedbackLength = (feedback.length) ? feedback.length : 0
    let averageRating = (feedback.length) ? (feedback.reduce((acc,curr) => acc + curr.rating, 0)/feedbackLength).toFixed(2)
        : "No ratings yet"
        
    return (
    <div className='feedback-stats'>
        <h4>Reviews: {feedbackLength}</h4>
        <h4>Average ratings: {averageRating}</h4>
    </div>
    )
}

export default FeedbackStats