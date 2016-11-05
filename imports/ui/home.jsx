import React from 'react';

const TWITTER_PAGE_LINK = 'https://twitter.com/vwyf1x1';
const GOOGLE_FORM_LINK = 'https://goo.gl/forms/lf9dBVNkjt0ixVmn2';

export default class HomeView extends React.Component {
  render() {
    return (
      <div className="main container-fluid home">
        <header>
        </header>


        <div className='container home-wrapper'>
          <a className="twitter-timeline" data-width="800" data-height="300" data-theme="light" data-link-color="#2B7BB9" href="https://twitter.com/vwyf1x1"></a>
        </div>
      </div>
    );
  }
}
