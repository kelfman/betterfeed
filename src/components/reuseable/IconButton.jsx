import classnames from 'classnames';
import React, {PropTypes} from 'react';
import Icon from './Icon.jsx';

const IconButton = ({className, name, onAction, selected, src, style, text, ...other}) => {
  return (
    <div
      className={classnames('IconButton', className, {selected})}
      style={style}
      onClick={onAction}
      {...other}
      >
      {name ? <Icon name={name} {...other}/> : <img src={src}/>}
      {text ? <div>{text}</div> : null}
    </div>
  );
};

IconButons.propTypes = {
  className: PropTypes.string,
  bgcolor: PropTypes.string,
  bgsize: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.string,
  onAction: PropTypes.func,
  selected: PropTypes.bool,
  src: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  text: PropTypes.string
};

export default IconButton;
