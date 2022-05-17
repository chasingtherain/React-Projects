import { useState } from 'react'

const Header = () => {
  return(
    <h2>Give feedback</h2>
  )
}

const StatisticsHeader = ({display}) => {
  console.log(display)
  if(display === "hasFeedback"){
    return(
      <h2>Statistics</h2>
    )
  }
  else{
    return(
      <div>
        <h2>Statistics</h2>
        <p>no feedback given</p>
      </div>
    )
  }
}

const Button = ({onClick,text}) => {

  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticsLine = ({feedbackType,feedBackNum}) => {
  console.log(feedbackType,feedBackNum)
  if(feedbackType === "positive score"){
    return(
      <tr>
        <td>{feedbackType}: {feedBackNum}%</td>
      </tr>
    )
  }
  return(
    <tr>
      <td>{feedbackType}: {feedBackNum}</td>
    </tr>
  )
}

const Statistics = ({good,neutral,bad,average}) => {
  if(average.length > 0){
    let numOfFeedback = average.length
    let positiveLength = average.filter(x=> x>0).length
    let totalScore = average.reduce((c,v) => c+v)
    let averageScore = (totalScore / numOfFeedback).toFixed(2)
    let positiveScore = (positiveLength / numOfFeedback * 100).toFixed(2)
  
    return(
      <div>
          <StatisticsHeader display="hasFeedback"/>
        <table>
          <tbody>
            <StatisticsLine feedbackType="good" feedBackNum={good}/>
            <StatisticsLine feedbackType="neutral" feedBackNum={neutral}/>
            <StatisticsLine feedbackType="bad" feedBackNum={bad}/>
            <StatisticsLine feedbackType="average score" feedBackNum={averageScore}/>
            <StatisticsLine feedbackType="positive score" feedBackNum={positiveScore}/>
          </tbody>
        </table>
      </div>
    )
  }
  else{
    return(
        <StatisticsHeader display="noFeedback"/>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good,setGoodFeedback] = useState(0)
  const [neutral,setNeutralFeedback] = useState(0)
  const [bad,setBadFeedback] = useState(0)
  const [average,setAverage] = useState([])

  const handleGoodFeedback = () => {
    setGoodFeedback(good+1)
    setAverage(average.concat(1))
  }

  const handleNeutralFeedback = () => {
    setNeutralFeedback(neutral+1)
    setAverage(average.concat(0))
  }

  const handleBadFeedback = () => {
    setBadFeedback(bad+1)
    setAverage(average.concat(-1))
  }

  return (
    <div>
        <Header/>
        <Button onClick={handleGoodFeedback} text="good"/>
        <Button onClick={handleNeutralFeedback} text="neutral"/>
        <Button onClick={handleBadFeedback} text="bad"/>
        <Statistics good={good} neutral={neutral} bad={bad} average={average}/>
    </div>
  )
}

export default App