import Radium from 'radium';
import React from 'react';
import IconLink from '../reuseable/IconLink.jsx';
import Page from '../reuseable/Page.jsx';
import Story from '../reuseable/Story.jsx';

class FeedPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {stories} = this.props;

    stories = ['yo']

    return (
      <Page id='FeedPage'>
        <main>
          <IconLink to='/' name='back' size={24} bgsize={32}/>
          {stories ?
            stories.map((story) => <Story story={story}/>) :
            <div className="noStories">
              Let's get this party started. Create a post!
            </div>
          }
        </main>
      </Page>
    );
  }
}

export default FeedPage;
