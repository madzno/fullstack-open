const Person = ({ name, number, deleteHandler }) => {
  return (
    <>
      <p>{name} {number}
        <button onClick={deleteHandler}>delete</button>
      </p>
    </>
  )
}

const Persons = ({ contacts, handleDelete }) => {
  return (
    <>
      {contacts.map(person => {
        return <Person
          key={person.id}
          name={person.name}
          number={person.number}
          deleteHandler={() => handleDelete(person.id)}
        />
      })}
    </>
  )
}

export default Persons
