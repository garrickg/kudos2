import '../app.css';

import React from 'react';

const Person = (props) => {
  const {
    search, name: { First, Last, key }, highlight, nominate, name, index, add,
  } = { ...props };
  // Check if component has received search bool
  if (!search) {
    // Highlight any search string matches in all names
    let fullName = `${First} ${Last}`;
    if (highlight) {
      const regex = new RegExp(highlight, 'gi');
      fullName = fullName.replace(regex, match => `<span class="hl">${match}</span>`);
    }
    // Render name component
    return (
      <p className="person">
        <a onClick={nominate} data-key={key} dangerouslySetInnerHTML={{ __html: fullName }} onKeyPress={e => e.keyCode === 13 && nominate} role="button" tabIndex={key} />
      </p>
    );
  } // If no search results in list, add new component for new name
  return (
    <p className="add-name">
      <a onClick={add} data-key={index} data-search={name} onKeyPress={e => e.keyCode === 13 && nominate} role="button" tabIndex={0}>{`Add ${name}`}</a>
    </p>
  );
};

export default Person;
