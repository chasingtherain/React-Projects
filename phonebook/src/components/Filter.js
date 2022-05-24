const Filter = ({newSearch,handleNewSearch}) => {
    return(
      <div>
        <label id="search">search:</label> <input value={newSearch} onChange={handleNewSearch}/>
      </div>
    )
  }

  export default Filter