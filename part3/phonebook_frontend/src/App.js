import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import contactService from './services/contacts'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [currentMessage, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => setPersons(initialContacts));
  }, [])

  const contactsToShow = (filterName === '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterName))

  const uniqueName = (name) => {
    let namesArr = persons.map(person => person.name);
    return !(namesArr.includes(name));
  }

  const resetNameAndNumber = () => {
    setNewName('');
    setNewNumber('');
  }

  const generateMessage = (messageString, type) => {
    setMessage(messageString);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addNewObj = () => {
    const personObject = {
      name: newName,
      number: newNumber
    };

    contactService
      .addPerson(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson));
        generateMessage(`Successfully added ${newName} as a contact`, 'success')
        resetNameAndNumber();
      })
      .catch(error => generateMessage(`${error.response.data.error}`, 'error'))
  }

  const generateNewPersonsArr = (id, newNumberObj) => {
    return persons.map(person => {
      if (person.id !== id) {
        return person;
      } else {
        return newNumberObj;
      }
    });
  }

  const updateExistingObj = () => {
    if (window.confirm(`${newName} is already added to phonebook,
      replace the old number with a new one?`)) {

      let currentObj = persons.find(person => person.name === newName);
      let id = currentObj.id;
      let newObj = { ...currentObj, number: newNumber }

      contactService
        .updateNumber(id, newObj)
        .then(newNumberObj => {
          let newPersons = generateNewPersonsArr(id, newNumberObj);
          generateMessage(`${newObj.name}'s number updated.`, 'success')
          setPersons(newPersons);
          resetNameAndNumber();
        })
        .catch(error => {
          generateMessage(`${error.response.data.error}`, 'error');
        });

    } else {
      resetNameAndNumber();
    }
  }

  const addName = (event) => {
    event.preventDefault();

    if (uniqueName(newName)) {
      addNewObj();
    } else {
      updateExistingObj();
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearch = (event) => {
    setFilterName((event.target.value).toLowerCase());
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      contactService.deletePerson(id);
      let deletedObj = persons.find(person => person.id === id);
      generateMessage(`${deletedObj.name} deleted`, 'success')
      setPersons(persons.filter(person => person.id !== id));
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={currentMessage} type={messageType} />

      <Filter
        currentName={filterName}
        handler={handleSearch}
      />

      <h2>add a new</h2>

      <PersonForm
        newNameHandler={addName}
        newName={newName}
        nameChangeHandler={handleNameChange}
        numberChangeHandler={handleNumberChange}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>

      <Persons contacts={contactsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
