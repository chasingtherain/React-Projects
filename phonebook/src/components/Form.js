const Form = ({addNewContact,newName,handleNewName,newNum,handleNewNum}) => {
    return(
      <form onSubmit={addNewContact}>
      <div>
        <label id="name">name:</label>  <input value={newName} onChange={handleNewName}/><br></br>
        <label>number:</label> <input value={newNum} onChange={handleNewNum}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
  }

  export default Form