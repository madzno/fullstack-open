import axios from 'axios'
const baseURL = '/api/persons'

const getAll = () => {
  let request = axios.get(baseURL);
  return request.then(response => response.data);
};

const addPerson = (newObj) => {
  let request = axios.post(baseURL, newObj);
  return request.then(response => response.data);
};

const deletePerson = (id) => {
  let url = `/api/persons/${id}`
  axios.delete(url);
};

const updateNumber = (id, newObj) => {
  let url = `/api/persons/${id}`
  let request = axios.put(url, newObj);
  return request.then(response => response.data);
}

export default { getAll, addPerson, deletePerson, updateNumber }
