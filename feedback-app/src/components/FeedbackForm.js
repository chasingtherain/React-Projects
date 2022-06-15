import React, { useState } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'

function FeedbackForm({handleAdd}) {
const [text, setText] = useState("")
const [validationText, setValidationText] = useState("")
const [disabled, setDisabled] = useState(true)
const [rating, setRating] = useState(10)

const handleTextChange = (event) => {
    event.preventDefault()
    console.log(event.target.value.length);
    if(text === "") {
        setValidationText(null)
        setDisabled(true)
    }
    else if(text.length < 10){
        setValidationText("Your review is too short, please have at least 10 characters!")
        setDisabled(true)
    }
    else {
        setValidationText(null)
        setDisabled(false)
    }
    setText(event.target.value);
}

const handleSubmit = (event) => {
    event.preventDefault()
    if(text.trim().length > 10){
        const newFeedback = {
            text,
            rating
        }
        handleAdd(newFeedback)
        setText("")
        setRating(null)
    }
    
}
 
    return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate our service?</h2>
            <div className='input-group'>
                <RatingSelect select={(rating)=> setRating(rating)}/>
                <input type="text" onChange={handleTextChange} placeholder='Write a review'/>
                <Button type='submit' value={text} isDisabled={disabled}>Send</Button>
            </div>
        </form>
        {validationText && <div className='message'>{validationText}</div>}
    </Card>
    )
}

export default FeedbackForm