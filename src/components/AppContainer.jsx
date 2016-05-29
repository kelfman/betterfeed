import React from 'react';

export default React.createClass({
  render() {
    return (
      <div id='AppContainer'>
        hey
        {this.props.children}
      </div>
    );
  }
});
