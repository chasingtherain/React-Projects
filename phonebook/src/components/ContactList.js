import List from "./List"

const ContactList = ({displaySearch}) => {
    return(
      <div>
        <ul>
        {
          displaySearch.map(person =>
           <li> <List key= {person.id} person={person}/> </li>
          )
        }
          </ul>
      </div>
    )
  }

  export default ContactList