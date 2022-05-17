import {useState} from 'react'

const Display = ({name,anecdotes,selected,voteCount}) => {
  let chosen = voteCount[selected]
  // console.log(voteCount,selected,chosen)
  return (
    <div>
      <h2>{name}</h2>
      <h4>{anecdotes[selected]}</h4>
      <span>has been voted <strong>{chosen}</strong> times</span>
    </div>
  )
}

const MostVotedDisplay = ({name,anecdotes,selected,voteCount}) => {
  let mostVoted = voteCount.indexOf(Math.max(...voteCount))
  if(voteCount.reduce((c,v)=>c+v) === 0) return(
    <div>
    <h2>{name}</h2>
    <p>To be determined</p>
  </div>
  )
  return(
    <div>
      <h2>Most Voted Anecdote</h2>
      <p>{anecdotes[mostVoted]}</p>
      <span>has <strong>{Math.max(...voteCount)}</strong> votes</span>
    </div>
  )
}

const Button = ({text,onClick}) => {
  return(
    <div>
      <button onClick={onClick}>
        {text}
      </button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const [selected,setQuote] = useState(0)
  const [voteCount, setVote] = useState(new Array(anecdotes.length).fill(0))
  // console.log(voteCount)

  const handleClick = () => {
    setQuote(Math.floor(Math.random() * anecdotes.length))
  }
  const upVote = () => {
    let copy = [...voteCount]
    copy[selected] += 1
    setVote(copy)
  }


  return (
    <div>
      <Display name ={"Anecdote of the day"}  anecdotes = {anecdotes} selected={selected} voteCount={voteCount}/>
      <div>
        <Button text="Next Quote" onClick= {handleClick} />
        <Button text="Vote" onClick={upVote}/>
      </div>
      <MostVotedDisplay name ={"Most Voted Anecdote"} anecdotes = {anecdotes} selected={selected} voteCount={voteCount}/>
    </div>
  )
}

export default App
