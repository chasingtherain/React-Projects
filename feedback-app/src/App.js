import React, { useState } from 'react'
import Header from "./components/Header"
import FeedbackData from "./data/FeedbackData"
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'

function App(){
  const [feedback, setFeedback] = useState(FeedbackData)

  const handleDelete = (id) => {
    if(window.confirm("Are you sure?")) setFeedback(feedback.filter((item) => item.id !== id))
    console.log(feedback);
  }

  return(
    <div>
      <Header />
      <FeedbackForm />
      <FeedbackStats feedback={feedback}/>
      <FeedbackList feedback={feedback} handleDelete={handleDelete}/>
    </div>
  )
}

export default App