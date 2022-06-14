import React, { useState } from 'react'
import Header from "./components/Header"
import FeedbackData from "./data/FeedbackData"
import FeedbackList from './components/FeedbackList'

function App(){
  const [feedback, setFeedback] = useState(FeedbackData)

  return(
    <div>
      <Header />
      <FeedbackList feedback={feedback}/>
    </div>
  )
}

export default App