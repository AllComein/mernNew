// Inside ParentComponent.js

import React, { useState } from 'react';
import RecordList  from './details';
import Manage from '../priority/manage'; // Import your page components

const ParentComponent = () => {
  const [selectedPage, setSelectedPage] = useState(null);

  const handleButtonClick = (page) => {
    setSelectedPage(page);
  };

  return (
    <div>
      <RecordList onPageButtonClick={handleButtonClick} />
      <div>
        {selectedPage && (
          <div>
            {/* Render all buttons */}
            <RecordList onPageButtonClick={handleButtonClick} />

            {/* Render the content of the selected page */}
            {selectedPage === 'A' && <Manage pageName="A" />}
            {selectedPage === 'B' && <Manage pageName="B" />}
            {/* Add similar lines for other pages */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentComponent;
