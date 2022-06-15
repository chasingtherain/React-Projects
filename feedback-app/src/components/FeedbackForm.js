import React, { useState } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'


function FeedbackForm() {
const [text, setText] = useState("")
const [validationText, setValidationText] = useState("")
const [disabled, setDisabled] = useState(true)
const handleTextChange = (event) => {
    event.preventDefault()
    console.log(event.target.value.length);
    if(event.target.value.length <= 10 || !(event.target.value.length)) {
        setValidationText("Your review is too short, please have at least 10 characters!")
        setDisabled(true)
    }
    else {
        setValidationText("")
        setDisabled(false)
    }
    setText(event.target.value);
}

const handleButton = (event) => {
    event.preventDefault()
    setText(event.target.value);
    console.log(event.target.value)
}



    return (
    <Card>
        <form>
            <h2>How would you rate our service?</h2>
            <div className='input-group'>
                <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                </select>
                <input type="text" onChange={handleTextChange} value={text} placeholder='Write a review'/>
                <Button type='submit' value={text} isDisabled={disabled}>Send</Button>
            </div>
        </form>
        <p>{validationText}</p>
    </Card>
    )
}

export default FeedbackForm