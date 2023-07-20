const PersonForm = ({
  newNameHandler,
  newName,
  nameChangeHandler,
  numberChangeHandler,
  newNumber }) => {
  return (
    <form onSubmit={newNameHandler}>
      <div>
        name: <input value={newName} onChange={nameChangeHandler} />
      </div>
      <div>
        number: <input value={newNumber} onChange={numberChangeHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
