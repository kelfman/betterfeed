import React from 'react';
import {findDOMNode} from 'react-dom';
import {withRouter} from 'react-router';
import assign from 'object-assign';
import Page from '../reuseable/Page.jsx';
import UserActions from '../../actions/UserActions.js';
import UserStore from '../../stores/UserStore.js';


class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = UserStore.getState();

    this._onChange = (state) => {
      this.setState(state);
    };

    this._getFormVals = () => ({
      email: findDOMNode(this.refs.email).value,
      password: findDOMNode(this.refs.password).value
    })

    this.handleSignup = (event) => {
      event.preventDefault();
      let {email, password} = this._getFormVals();
      if (email.length && password.length) {
        UserActions.signup(email, password);
      }
    };

    this.handleSignin = (event) => {
      event.preventDefault();
      let {email, password} = this._getFormVals();
      if (email.length && password.length) {
        UserActions.login(email, password);
      }
    };
  }

  componentDidMount() {
    findDOMNode(this.refs.email).focus();
    UserStore.listen(this._onChange);
  }

  componentWillUnmount() {
    UserStore.unlisten(this._onChange);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentUser) {
      this.props.router.push('/');
    }
  }

  render() {
    const {email, password, formInvalid} = this.state;

    return (
      <Page id='LoginPage'>
        <div className='formWrapper'>
          <form>
            <h1>BetterFeed</h1>
            <h3>Chat with interesting people in your city</h3>
            <div className='inputWrapper'>
              <input ref='email' type='text' placeholder='Email'/>
              <input ref='password' type='password' placeholder='password'/>
            </div>
            <button onClick={this.handleSignup}>SIGN UP</button>
            <div className='or'>OR</div>
            <button onClick={this.handleSignin}>SIGN IN</button>
            <div className='formInvalid'>
              {formInvalid ? 'Invalid register/login attempt.' : ''}
            </div>
          </form>
        </div>
      </Page>
    );
  }
}

export default withRouter(LoginPage);
