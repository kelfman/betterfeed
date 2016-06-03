import React from 'react';
import {findDOMNode} from 'react-dom';
import {withRouter} from 'react-router';
import IconLink from '../reuseable/IconLink.jsx';
import Page from '../reuseable/Page.jsx';
import StoriesActions from '../../actions/StoriesActions.js';
import StoriesStore from '../../stores/StoriesStore.js';
import UserStore from '../../stores/UserStore.js';

class PostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = StoriesStore.getState();

    this._onChange = (state) => {
      this.setState(state);
    };

    this.handleSubmit = (event) => {
      event.preventDefault();
      let text = findDOMNode(this.refs.textarea).value;
      text = text.trim();
      if (text.length) {
        StoriesActions.submitStory(UserStore.state.currentUser._id, text);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.newPostsCnt > prevState.newPostsCnt) {
      this.props.router.push('/');
    }
  }

  componentDidMount() {
    StoriesStore.listen(this._onChange);
  }

  componentWillUnmount() {
    StoriesStore.unlisten(this._onChange);
  }

  render() {
    return (
      <Page id='PostPage'>
        <IconLink className='backBtn' to='/' name='back' size={24} bgsize={48}/>
        <div className='formWrapper'>
          <form onSubmit={this.handleSubmit}>
            <textarea
              ref='textarea'
              placeholder='What do you want to say?'
              maxLength={200}
              />
            <button>Post</button>
          </form>
        </div>
      </Page>
    );
  }
}

export default withRouter(PostPage);
