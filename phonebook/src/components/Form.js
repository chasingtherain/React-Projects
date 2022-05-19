const Form = ({addNewContact,newName,handleNewName,newNum,handleNewNum}) => {
    return(
      <form onSubmit={addNewContact}>
      <div>
        name: <input value={newName} onChange={handleNewName}/>
        number: <input value={newNum} onChange={handleNewNum}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
  }

  export default Form