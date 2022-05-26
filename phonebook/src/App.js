import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import ContactList from './components/ContactList'
import axios from 'axios'
import directoryService from './services/phone-directory'

const baseUrl = '/api/phonebook'

const Notification = ({notificationMsg,notificationType}) => {
  let notificationStyle = {color: "blue"}
  if(notificationType === "add"){notificationStyle = {color: "green"}}
  if(notificationType === "delete"){notificationStyle = {color: "red"}}
  if(notificationType === "invalid"){notificationStyle = {color: "red"}}

  if (notificationMsg == null){
    return null
  }
  return(
    <div style={notificationStyle} className="notification">
      {notificationMsg}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notificationMsg, setNotificationMsg] = useState()
  const [notificationType,setNotificationType] = useState()

  useEffect(()=>{
    axios
    .get(baseUrl)
    .then(resp => setPersons(resp.data))
  },
  [])
  
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

    if(window.confirm(`Delete ${event.target.name}?`)){
      directoryService
        .remove(removedId)
        .then(resp => {
          setNotificationType("delete")
          setNotificationMsg(`${event.target.name} was deleted`)
          setTimeout(() => {setNotificationMsg(null)}, 5000);
          setPersons(persons.filter(person => person.id !== removedId))
        })
        .catch(error => {
          setNotificationMsg(`${event.target.name} has already been removed from database`)
          setTimeout(() => {setNotificationMsg(null)}, 5000);
        })
        setNotificationType("")
    }

  }

  // displays countries that match search input
  const displaySearch = showAll 
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  const addNewContact = (event) => {
    let regex = /[^0-9|^-]+/g
    event.preventDefault();

    const contactObject = {
      name: newName,
      number: newNum,
      id: Math.floor(Math.random() * 999999999999)
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
      if(window.confirm(`${newName} is already added to phonebook,update existing number?`)){
        directoryService
          .update(existingContactId, updatedContactObject)
          .then(() =>{
            setPersons(persons.map(person => person))
            setNotificationMsg(`Updated ${newName}'s number`)
            })
          .catch(error => {
            console.log("failed to update");
            setNotificationMsg(`${newName} has already been removed from database`)
            setTimeout(() => {setNotificationMsg(null)}, 5000);
            }
          )
          setTimeout(() => {
            setNotificationMsg(null)
            window.location.reload();
          }, 3000);
          setNotificationType("")
          
      }
    }
    
    // checks if number is valid
    if(regex.test(newNum) || newNum === ""){
      // alert("please provide a valid number")
      setNotificationType("invalid")
      setNotificationMsg("please provide a valid number")
      setTimeout(() => {
        setNotificationMsg(null)
      },5000);
    }
    // create and post new contact into db
    else{
      directoryService
        .create(contactObject)
        .then( (resp) => {
          setPersons(persons.concat(resp.data))
          setNotificationType("add")
          setNotificationMsg(`Added ${newName}`)
        })
        
      setTimeout(() => setNotificationMsg(null), 5000);
      setNewName("")
      setNewNum("")
      setNotificationType("")
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationMsg={notificationMsg} notificationType={notificationType}/>
      <Filter newSearch={newSearch} handleNewSearch={handleNewSearch} />
      <h3>Add a new contact: </h3>
      <Form addNewContact={addNewContact} newName={newName} handleNewName={handleNewName} newNum={newNum} handleNewNum={handleNewNum} />
      <h2>Numbers</h2>
      <ContactList displaySearch={displaySearch} handleRemoveButton={handleRemoveButton}/>

    </div>
  )
}

export default App