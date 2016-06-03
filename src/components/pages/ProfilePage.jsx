import React from 'react';
import {findDOMNode} from 'react-dom';
import Page from '../reuseable/Page.jsx';
import UserActions from '../../actions/UserActions.js';
import UserStore from '../../stores/UserStore.js';
import IconLink from '../reuseable/IconLink.jsx';


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = UserStore.getState();

    this._onChange = (state) => {
      this.setState(state);
    };
  }

  componentDidMount() {
    UserStore.listen(this._onChange);

    // Wait for listener to start
    // Need this if got here from within spa
    setTimeout(() => {
      if (!this.state.user) {
        UserActions.getProfile(this.props.params.email);
      }
    });
  }

  componentWillUnmount() {
    UserStore.unlisten(this._onChange);
  }

  render() {
    const {user} = this.state;

    return (
      <Page id='ProfilePage'>
        <IconLink className='backBtn' to='/' name='back' size={24} bgsize={48}/>
        {user
          ?
          <div>
            <h3>{user.email}</h3>
            <div className='blurb'>{user.blurb || 'A short bio...'}</div>
          </div>
          :
          null
        }
      </Page>
    );
  }
}

export default ProfilePage;
