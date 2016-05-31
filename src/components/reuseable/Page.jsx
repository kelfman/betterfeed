import React, {PropTypes} from 'react';
import classnames from 'classnames';

class Page extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {className, id} = this.props;

    return (
      <div className={classnames('Page', className)} id={id}>
        {this.props.children}
      </div>
    );
  }

}

Page.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

export default Page;
