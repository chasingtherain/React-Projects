import { useState } from "react"

const Button = ({action,sign}) => {
  return(
    <button onClick={action}>{sign}</button>
  )
}

const History = (props) => {
  if (props.allClicks.length === 0){
    return(
    <div>
      the app is used by pressing the buttons
    </div>
    )
  }
  else{
    return(
      <div>
      button press history: {props.allClicks.join(" ")}
      </div>
    )
  }
}

const App = (props) => {
  // const [counter, setCounter] = useState(0)
  const[click,setClicks] = useState({left:0,right:0})
  const[allClicks,setAll] = useState([])

  const handleLeftClicks = () => {
    const newClicks = {
      ...click,
      left: click.left + 1,
      
    }
    setAll(allClicks.concat("L"))
    setClicks(newClicks)
  }

  const handleRightClicks = () => {
    const newClicks = {
      ...click,
      right: click.right + 1
    }
    setAll(allClicks.concat("R"))
    setClicks(newClicks)
  }

  const resetToZero = () => {
    const resetClicks = {
      left: 0,
      right: 0
    }
    setClicks(resetClicks)
    setAll([])
  }


  // console.log('rendering...', counter)

  return (
    <div>
      {click.left}
      <Button action={handleLeftClicks} sign="left"/>
      <Button action={handleRightClicks} sign="right"/>
      {click.right}<br></br>
      <Button action={resetToZero} sign="Reset"/><br></br>
      <History allClicks={allClicks}/>
    </div>
    
  )
}

export default App