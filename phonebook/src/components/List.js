const List = ({person, handleRemoveButton}) => {
    return(
      <div>
          <p>
            {person.name}: {person.number} 
            <button id={person.id} name={person.name} onClick={handleRemoveButton}>delete</button>
          </p>
      </div>
    )
  }

export default List