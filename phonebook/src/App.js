import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import ContactList from './components/ContactList'
import axios from 'axios'
import directoryService from './services/phone-directory'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  // useEffect(()=>{
  //   axios
  //   .get("http://localhost:3001/persons")
  //   .then(resp => setPersons(resp.data))
  // },
  // [])
  const personsHook = ()=>{
    directoryService
    .getAll()
    .then(resp => setPersons(resp.data))
  }
  useEffect(personsHook,[setPersons])

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

  const handleRemoveButton = (event) => {
    let removedId = parseInt(event.target.id)
    console.log(removedId)
    if(window.confirm(`Delete ${event.target.name}?`)){
      directoryService
        .remove(removedId)
        .then(resp => {
          alert(`${resp.status}: ${event.target.name} was deleted`)
          setPersons(persons.filter(person => person.id !== removedId))
        })
        .catch(error => {
          alert("user already deleted")
        })
    }

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
    
    // update existing contact's number
    if(persons.map(person => person.name).includes(newName)){
      // filter for the contact
      let existingContact = persons.filter(object => object["name"] === newName)
      // get id of filtered contact
      let existingContactId = existingContact.map(object => object.id)
      // console.log(existingContact,existingContactId);
      let updatedContactObject = {
        name: newName,
        number: newNum,
        id: existingContactId
      }
      if(window.confirm(`${newName} is already added to phonebook,update existing number to a new one?`)){
        directoryService
          .update(existingContactId, updatedContactObject)
          .then(() =>{
            setPersons(persons.map(person => person))
            alert("update successful")
            window.location.reload();
            } 
          )
          // .catch(alert("update unsuccessful"))
      }
    }
    
    // checks if number is invalid
    if(regex.test(newNum)){
      alert("please provide a valid number")
    }
    
    // create and post new contact into db
    if(!(persons.map(person => person.name).includes(newName)) && (!regex.test(newNum))){
      directoryService
        .create(contactObject)
        .then(resp => setPersons(persons.concat(resp.data)))
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
      <ContactList displaySearch={displaySearch} handleRemoveButton={handleRemoveButton}/>

    </div>
  )
}

export default App