const Filter = ({newSearch,handleNewSearch}) => {
    return(
      <div>
        Search: <input value={newSearch} onChange={handleNewSearch}/>
      </div>
    )
  }

  export default Filter