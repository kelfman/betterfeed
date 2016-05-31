import React from 'react';
import colors from '../../maps/colors.js';
import IconLink from '../reuseable/IconLink.jsx';
import Page from '../reuseable/Page.jsx';
import Story from '../reuseable/Story.jsx';

class FeedPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {children, stories} = this.props;

    return (
      <div>
        {children}
        <Page id='FeedPage'>
          {stories ?
            stories.map((story) => <Story {...story}/>) :
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
