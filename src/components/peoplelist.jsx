import '../App.css';

import React from 'react';

import Person from './person';

const PeopleList = (props) => {
  const {
    filtered, nominate, search, people, add,
  } = { ...props };
  // Check if list of name is not empty from searching
  const hasSearchResults = filtered.length > 0;
  // Render list of people already in DB, matching search string
  if (hasSearchResults) {
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
                search={!hasSearchResults}
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
        search={!hasSearchResults}
      />
    </div>
  );
};

export default PeopleList;
