import React from 'react';

const TWITTER_PAGE_LINK = 'https://twitter.com/vwyf1x1';
const GOOGLE_FORM_LINK = 'https://goo.gl/forms/lf9dBVNkjt0ixVmn2';

function NavLinks() {

  return (
    <nav className="navbar navbar-default" role="navigation">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
      </div>

      <div className="collapse navbar-collapse navbar-ex1-collapse">
        <ul className="nav navbar-nav">
          <li><a href="#">WHAT</a></li>
          <li><a href="#">HIGHLIGHTS</a></li>
          <li><a href="#">VOTES</a></li>
          <li><a href="#">TEAM</a></li>
          <li><a href="#">MAKE</a></li>
        </ul>
      </div>
    </nav>
  );
}

function Header() {
  return (
    <header>
      <a className='logo' href='/'><img src='images/logo.png'/></a>
      <NavLinks />
    </header>
  );
}

export default class HomeView extends React.Component {
  render() {
    return (
      <div className='main container-fluid home'>
        <Header />



        <div className='container home-wrapper'>
          <a className='twitter-timeline' data-width='800' data-height='300' data-theme='light' data-link-color='#2B7BB9' href='https://twitter.com/vwyf1x1'></a>
        </div>
      </div>
    );
  }
}
