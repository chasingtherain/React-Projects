import { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import ContactList from './components/ContactList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 999, id: 1}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNum = (event) => {
    setNewNum(event.target.value)
  }

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
    if (newSearch.length !== 0) setShowAll(false)
    else setShowAll(true)
  }

  const displaySearch = showAll 
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  const addNewContact = (event) => {
    let regex = /[^0-9|^-]+/g
    event.preventDefault();

    const contactObject = {
      name: newName,
      number: newNum,
      id: persons.length + 1
    }

    if(persons.map(person => person.name).includes(newName)){
      console.log(`${newName} is already added to phonebook`)
      alert(`${newName} is already added to phonebook`)
    }
    if(regex.test(newNum)){
      alert("please provide a valid number")
    }
    console.log(regex.test(newNum))

    if(!(persons.map(person => person.name).includes(newName)) && (!regex.test(newNum))){
      setPersons(persons.concat(contactObject))
      setNewName("")
      setNewNum("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleNewSearch={handleNewSearch} />
      <h3>Add a new contact: </h3>
      <Form addNewContact={addNewContact} newName={newName} handleNewName={handleNewName} newNum={newNum} handleNewNum={handleNewNum} />
      <h2>Numbers</h2>
      <ContactList displaySearch={displaySearch}/>

    </div>
  )
}

export default App