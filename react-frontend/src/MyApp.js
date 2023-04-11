import React, {useState} from 'react';
import Table from './Table';
import Form from './Form';


function MyApp() {
  const [characters, setCharacters] = useState([
    {
      name: 'Charlie',
      job: 'Janitor',
    },
    {
      name: 'Dee',
      job: 'Aspiring Actress',
    },
    {
      name: 'Dennis',
      job: 'Bartender',
    },
    {
      name: 'Mac',
      job: 'Bouncer'
    }
  ]);

  function removeOneCharacter (index) {
    const updated = characters.filter((character, i) => {
      return i !== index
    });
    setCharacters(updated);
  }

  function updateList(person) {
    setCharacters([...characters, person]);
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}

export default MyApp;