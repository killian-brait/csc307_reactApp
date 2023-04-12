import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';

import axios from 'axios';


function MyApp() {
  const usersURL = 'http://localhost:8000/users'

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
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    fetchAll().then( result => {
      if (result)
        setCharacters(result);
    });
  }, [] );

  const [characters, setCharacters] = useState([
    {
      name: 'Charlie',
      job: 'Janitor',
    },
    // {
    //   name: 'Dee',
    //   job: 'Aspiring Actress',
    // },
    // {
    //   name: 'Dennis',
    //   job: 'Bartender',
    // },
    // {
    //   name: 'Mac',
    //   job: 'Bouncer'
    // }
  ]);

  function removeOneCharacter (index) {
    const updated = characters.filter((character, i) => {
      return i !== index
    });
    setCharacters(updated);
  }

  function updateList(person) {
    makePostCall(person).then( result => {
      if (result && result.status === 201)
        setCharacters([...characters, person]);
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