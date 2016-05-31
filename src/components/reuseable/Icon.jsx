import assign from 'object-assign';
import React, {PropTypes} from 'react';
import icons from '../../maps/icons.jsx';

const Icon = ({bgcolor, bgsize, color, name, size, style}) => {
  const styles = assign({
    fill: color,
    verticalAlign: 'middle',
    width: size, // CSS instead of the width attr to support non-pixel units
    height: size // Prevents scaling issue in IE
  }, style);
  const icon = icons[name];
  const svgMarkup = icon ? icon[0] : null;
  const svgSize = (icon && icon.length === 2) ? icon[1] : 24;

  const svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      preserveAspectRatio='xMidYMid meet'
      style={assign(styles, style)}
      >
      <g>{svgMarkup}</g>
    </svg>
  );

  if (bgsize) {
    const padding = (bgsize - size) / 2;
    const bgStyles = {
      paddingTop: padding,
      backgroundColor: bgcolor || 'transparent',
      width: bgsize,
      height: bgsize,
      borderRadius: '50%',
      textAlign: 'center'
    };
    return <div style={bgStyles}>{svg}</div>;
  } else {
    return svg;
  }
};

Icon.propTypes = {
  bgcolor: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object
};

Icon.defaultProps = {
  color: '#fff',
  size: 24,
  style: {}
};

export default Icon;
