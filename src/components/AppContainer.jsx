import React from 'react';

class AppContainer extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id='AppContainer'>
        {this.props.children}
      </div>
    );
  }
}

export default AppContainer;
