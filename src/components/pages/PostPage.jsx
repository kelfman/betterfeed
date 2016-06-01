import React from 'react';
import {withRouter} from 'react-router';
import IconLink from '../reuseable/IconLink.jsx';
import Page from '../reuseable/Page.jsx';
import StoriesActions from '../../actions/StoriesActions.js';

class PostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      submitComplete: false
    };

    this.handleChange = (event) => {
      this.setState({text: event.target.value});
    }

    this.handleSubmit = (event) => {
      event.preventDefault();
      let {text} = this.state;
      text = text.trim();
      if (text.length) {
        this.setState({submitComplete: true});
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.submitComplete) {
      this.setState({text: '', submitComplete: false});
      this.props.router.push('/');
    }
  }

  render() {
    const {text} = this.state;

    return (
      <Page id='PostPage'>
        <IconLink className='backBtn' to='/' name='back' size={24} bgsize={48}/>

        <div className='formWrapper'>
          <form onSubmit={this.handleSubmit}>
              <textarea
                placeholder='What do you want to say?'
                onChange={this.handleChange}
                value={text}
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
