import '../App.css';

import React from 'react';

import Person from './person';

const PeopleList = (props) => {
  const {
    filtered, nominate, search, people, add,
  } = { ...props };
  // Check if list of name is not empty from searching
  const isSearching = filtered.length !== people.length;
  // Render list of people already in DB, matching search string
  if (!isSearching) {
    return (
      <div className="list-of-people">
        {
          Object
            .keys(filtered)
            .sort((a, b) => (filtered[a].First > filtered[b].First ? 1 : -1))
            .map(key => (
              <Person
                key={key}
                name={filtered[key]}
                nominate={nominate}
                search={isSearching}
                highlight={search}
              />
            ))
        }
      </div>
    );
  } // Render add new name component, if no search results are present
  return (
    <div className="list-of-people">
      <Person
        key={filtered.length}
        index={people.length}
        add={add}
        name={search}
        search={isSearching}
      />
    </div>
  );
};

export default PeopleList;
