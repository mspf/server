import React, { PropTypes } from 'react';
import _ from 'lodash'

const TWITTER_PAGE_LINK = 'https://twitter.com/vwyf1x1';
const GOOGLE_FORM_LINK = 'https://goo.gl/forms/lf9dBVNkjt0ixVmn2';

function NavLinks() {
  return (
    <nav className='navbar navbar-default' role='navigation'>
      <div className='navbar-header'>
        <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-ex1-collapse'>
          <span className='sr-only'>Toggle navigation</span>
          <span className='icon-bar'></span>
          <span className='icon-bar'></span>
          <span className='icon-bar'></span>
        </button>
      </div>

      <div className='collapse navbar-collapse navbar-ex1-collapse'>
        <ul className='nav navbar-nav'>
          <li><a href='#what'>WHAT</a></li>
          <li><a href='#highlights'>HIGHLIGHTS</a></li>
          <li><a href='#votes'>VOTES</a></li>
          <li><a href='#team'>TEAM</a></li>
          <li><a href='#make'>MAKE</a></li>
        </ul>
      </div>
    </nav>
  );
};

function Header() {
  return (
    <header>
      <a className='logo' href='/'><img src='images/logo.png'/></a>
      <NavLinks />
    </header>
  );
};

function SectionTitle({anchor, title}) {
  return (
    <h1 className='section-title'>
      <a name={anchor} href={'#' + anchor}>{title}</a>
    </h1>
  );
};
}

const INTRO_1 = `Have a question for your fellow citizens and wonder how they'd react? We made an art installation for just that! "Vote With Your Feet" is a public installation that asks questions for citizens, and get answers from citizens.`;

const INTRO_2 = `Two doorways stand in the middle of the sidewalk, with a question displayed on a sign above them. Each door stands for an answer.`;

export default class HomeView extends React.Component {
  render() {
    return (
      <div className='main container-fluid home'>
        <Header />

        <SectionTitle anchor='what' title='WHAT IS VOTE WITH YOUR FEET' />
        <div className='intro'>
          <p>{INTRO_1}</p>
          <p>{INTRO_2}</p>
        </div>

        <SectionTitle anchor='highlights' title='HIGHLIGHTS' />
        <Highlights />

        <SectionTitle anchor='votes' title='THE VOTES' />
        <div className='container home-wrapper'>
          <a className='twitter-timeline'
            data-width='800'
            data-height='260'
            data-theme='light'
            data-link-color='#2B7BB9'
            href='https://twitter.com/vwyf1x1'></a>
        </div>



        <SectionTitle anchor='team' title='THE TEAM' />



        <SectionTitle anchor='make' title='THE MAKE' />
      </div>
    );
  }
}
