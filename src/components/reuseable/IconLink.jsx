import classnames from 'classnames';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Icon from './Icon.jsx';

const IconLink= ({to, className, ...other}) => {
  return (
    <Link className={classnames('IconLink', className)} to={to} style={{display:'inline-block'}}>
      <Icon {...other}/>
    </Link>
  );
};

IconLink.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string.isRequired
};

export default IconLink;
