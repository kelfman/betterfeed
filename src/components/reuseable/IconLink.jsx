import classnames from 'classnames';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Icon from './Icon.jsx';

const IconLink= (props) => {
  const {
    to,
    ...other
  } = props;

  return (
    <Link to={to}>
      <Icon {...other}/>
    </Link>
  );
};

IconLink.propTypes = {
  to: PropTypes.string.isRequired
};

export default IconLink;
