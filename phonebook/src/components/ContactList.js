import List from "./List"

const ContactList = ({displaySearch, handleRemoveButton}) => {
    return(
      <div>
        <ul>
        {
          displaySearch.map(person =>
           <li> <List person={person} handleRemoveButton={handleRemoveButton}/> </li>
          )
        }
          </ul>
      </div>
    )
  }

  export default ContactList