import { useState } from "react"

const Display = ({counter}) => {
  return(
    <p>{counter}</p>
  )
}

const Button = ({action,sign}) => {
  return(
    <button onClick={action}>{sign}</button>
  )
}
const App = (props) => {
  const [counter, setCounter] = useState(0)
  const increaseByOne = () => (setCounter(counter+1))
  const decreaseByOne = () => {if(counter>0) setCounter(counter-1)}
  const resetToZero = () => (setCounter(0))

  console.log('rendering...', counter)

  return (
    <div>
      <Display counter = {counter}/> 
      <Button action={increaseByOne} sign="+"/>
      <Button action={decreaseByOne} sign="-"/>
      <Button action={resetToZero} sign="Reset"/>
    </div>
    
  )
}

export default App