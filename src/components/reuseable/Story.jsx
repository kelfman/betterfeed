import React, {PropTypes} from 'react';

const Story = ({user, content, isNew}) => {
  return (
    <div className='Story'>
      <div className='header'>
        <Link className='user' to={'/users/'+user.email}>{user.email}</Link>
        {isNew ? <div className='new'>new</div> : ''}
      </div>
      <div className='content'>{content}</div>
    </div>
  );
};

Story.propTypes = {
  content: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
  user: PropTypes.object.isRequired
};

export default Story;
