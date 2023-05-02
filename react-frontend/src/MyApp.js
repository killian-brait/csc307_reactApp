import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';

import axios from 'axios';


function MyApp() {
  const usersURL = 'http://localhost:8000/users'

  const [characters, setCharacters] = useState(
    []
  );
  
  useEffect(() => {
    fetchAll().then( result => {
      if (result)
        setCharacters(result);
    });
  }, [] );

  async function fetchAll() {
    try {
      const response = await axios.get(usersURL);
      return response.data.users_list;
    }
    catch (error) {
      // We're not handling errors, just logging them to console
      console.log(error);
      return false;
    }
  }

  async function makePostCall(person) {
    try {
      const response  = await axios.post(usersURL, person);
      if (response.status === 201) {
        const newPerson = response.data;
        setCharacters([...characters, newPerson]);
      }
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  async function removeOneCharacter (index) {
    try {
      const response = await axios.delete(usersURL + "/" + characters[index]._id);
      const updated = characters.filter((character, i) => {
        return i !== index
      });
      setCharacters(updated);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
   
    
  }

  function updateList(person) {
    makePostCall(person).then( result => {
      if (result && result.status === 201)
        setCharacters([...characters, result.data]);
      else
        return false;
    });
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}

export default MyApp;