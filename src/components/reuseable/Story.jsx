import React, {PropTypes} from 'react';

const Story = (props) => {
  return (
    <div className='Story'>
      Here's a Story
    </div>
  );
};

Story.propTypes = {
  content: PropTypes.string
};

export default Story;
