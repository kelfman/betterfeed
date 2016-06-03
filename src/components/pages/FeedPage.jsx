import React from 'react';
import colors from '../../maps/colors.js';
import IconLink from '../reuseable/IconLink.jsx';
import Page from '../reuseable/Page.jsx';
import Story from '../reuseable/Story.jsx';
import StoriesActions from '../../actions/StoriesActions.js';
import StoriesStore from '../../stores/StoriesStore.js';

class FeedPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = StoriesStore.getState();

    this._onChange = (state) => {
      this.setState(state);
    };
  }

  componentDidMount() {
    StoriesStore.listen(this._onChange);

    // Wait for listener to start
    // Need this if got here from within spa
    setTimeout(() => {
      if (!this.state.stories.length) {
        StoriesActions.loadAllStories();
      }
    });
  }

  componentWillUnmount() {
    StoriesStore.unlisten(this._onChange);
  }

  render() {
    const {children} = this.props;
    const {stories} = this.state;

    return (
      <div>
        {children}
        <Page id='FeedPage'>
          <h1>Welcome to BetterFeed!</h1>
          {stories.length
            ?
            stories.map((story, idx) => {
              if (story.user) {
                return <Story key={idx} {...story}/>
              }
            })
            :
            <div className="noStories">
              Let's get this party started. Create a post!
            </div>
          }
          {children ? null : <IconLink to='/post' name='compose' size={24} bgsize={60} bgcolor={colors.purple} className='postBtn'/>}
        </Page>
      </div>
    );
  }
}

export default FeedPage;
