import React, { PropTypes } from 'react';
import _ from 'lodash'
import { Results } from './Results.jsx';

const TWITTER_PAGE_LINK = 'https://twitter.com/vwyf1x1';
const GOOGLE_FORM_LINK = 'https://goo.gl/forms/lf9dBVNkjt0ixVmn2';

function NavLinks() {
  return (
    <nav className='navbar navbar-default' role='navigation'>
      <div className='navbar-header'>
        <button type='button'
          className='navbar-toggle' data-toggle='collapse' data-target='.navbar-ex1-collapse'>
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
      <iframe id='intro-video' src="https://player.vimeo.com/video/190417768"
        width="640" height="360" frameBorder="0"
        allowFullScreen>
      </iframe>
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

function CarouselItem(props) {
  return (
    <div className={'item' + (props.isActive ? ' active' : '')}>
      <img src={props.src} alt={props.title} />
      <div className='carousel-caption'>
        <h1>{props.title}</h1>
        <p>{props.text}</p>
      </div>
    </div>
  );
};

CarouselItem.PropTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

function CarouselLink({isActive, index}) {
  return (
    <li data-target='#vwyf-highlights-carousel'
      data-slide-to={index}
      className={isActive ? 'active' : ''}>
    </li>
  );
};

function Carousel({items}) {
  return (
		<div id='vwyf-highlights-carousel' className='carousel slide' data-ride='carousel'>
			<ol className='carousel-indicators'>
        {
          _.map(items, (item, i) => <CarouselLink key={i} index={i} isActive={i === 0} />)
        }
			</ol>

			<div className='carousel-inner' role='listbox'>
        {
          _.map(items, (item, i) =>
            <CarouselItem key={i} {...item} isActive={i === 0} />)
        }
			</div>

			<a className='left carousel-control'
        href='#vwyf-highlights-carousel' role='button' data-slide='prev'>
				<span className='glyphicon glyphicon-chevron-left' aria-hidden='true'></span>
				<span className='sr-only'>Previous</span>
			</a>
			<a className='right carousel-control'
        href='#vwyf-highlights-carousel' role='button' data-slide='next'>
				<span className='glyphicon glyphicon-chevron-right' aria-hidden='true'></span>
				<span className='sr-only'>Next</span>
			</a>
		</div>
  );
}

function Highlights() {
  const highlights = [
    {
      src: 'images/highlight_hillary_trump.jpg',
      title: 'Most Voted Question',
      text: 'Whenever the question shows up, it instantly drew a crowd, sometimes waiting in line for showing their opinion.',
    },
    {
      src: 'images/highlight_homeless.jpg',
      title: 'Conflicts in action and mind',
      text: 'We observed people who voted to help, ran into homeless right away, debated hard, and declined to give money.',
    },
    {
      src: 'images/highlight_uber.jpg',
      title: 'Heated Discussion',
      text: 'Seriously, Uber??',
     },
    {
      src: 'images/highlight_dance.jpg',
      title: 'Dance through the door?',
      text: 'Applause for the one hundred people who dance on market street',
    }
  ];

  return (
    <div className='highlights'>
			<Carousel items={highlights} />
    </div>
  );
};

function TwitterTimeLine() {
  return (
    <div className='twitter-wrapper'>
      <a className='twitter-timeline'
        data-width='620'
        data-height='230'
        data-theme='light'
        data-link-color='#2B7BB9'
        href='https://twitter.com/vwyf1x1'></a>
    </div>
  );
};

function Team() {
  return (
    <div className='container team'>
      <div className='row'>
        <div className='col-md-2 col-md-offset-1 ppl'>
          <a className='name' target='_blank' href='http://cheeriocheng.com'>Cheng Xu</a>
        </div>

        <div className='col-md-2 ppl'>
          <a className='name' target='_blank' href='http://emeraldbottery.com'>Mike Philetus Weller</a>
        </div>

        <div className='col-md-2 ppl'>
          <a className='name' target='_blank' href='https://github.com/parano'>Chaoyu Yang</a>
        </div>

        <div className='col-md-2 ppl'>
          <a className='name' target='_blank' href='http://ziyunpeng.com'>Ziyun Peng</a>
        </div>

        <div className='col-md-2 ppl'>
          <a className='name' target='_blank' href='https://about.me/yubozhao'>Bozhao Yu</a>
        </div>
      </div>
    </div>
  );
};

function Make() {
  return (
    <div className='container make'>
      <div className='row'>
        <div className='col-md-5 col-md-offset-1'>
          <a className='big-link' target='_blank'
            href='http://www.instructables.com/id/Vote-With-Your-Feet/'>
            Instructable
          </a>
        </div>

        <div className='col-md-5'>
          <a className='big-link' target='_blank'
            href='https://github.com/vwyf'>
            Github
          </a>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-5 col-md-offset-1'>
          <a className='big-link' target='_blank'
            href='http://www.instructables.com/id/Data-Collection-With-Raspberry-Pi/'>
            Data Collection
          </a>
        </div>

        <div className='col-md-5'>
          <a className='big-link' target='_blank'
            href='http://www.instructables.com/id/Howto-Flipdot-With-a-Raspi/'>
            How To Flipdot
          </a>
        </div>
      </div>
    </div>
  );
};

function Votes() {
  return (
    <div className='container votes make'>
      <div className='row'>
        <div className='col-md-5 col-md-offset-1'>
          <a className='big-link' href={GOOGLE_FORM_LINK} target='_blank'>
            SUBMIT QUESTIONS
          </a>
        </div>

        <div className='col-md-5'>
          <a className='big-link results' href='/results'>
            SEE ALL VOTE RESULTS
          </a>
        </div>
      </div>
    </div>
  );
};


const INTRO_1 = `Have a question for your fellow citizens and wonder how they'd react? We made an art installation for just that! "Vote With Your Feet" is a public installation that asks questions for citizens, and get answers from citizens.`;

const INTRO_2 = `Two doorways stand in the middle of the sidewalk, with a question displayed on a sign above them. Each door stands for an answer. Walk through the door, and your vote will be counted, viewable both at the door and on our website.`;

const INTRO_3 = `The result? We got more than ten thousand votes over 3 days on Market St, San Francisco, to about 80 rotating questions, all of which are crowd-sourced online or at the door. It covers everything from election to pets, whether serious (death penalty) or silly (cats or dogs), reflective (are you happy) or evocative (Trump or Hitler), technical (vim or emacs) or whimsical(would you dance through the door?).`

const INTRO_4 = `We’re so grateful and proud of all the people who submitted the questions. It was your questions that gave the Vote With Your Feet project a life. The reflection and conversation started at the doorways will carry on beyond the installation itself.`

function Footer() {
  return (
    <footer>
      <a className='logo' href='https://twitter.com/vwyf1x1'><img src='images/logo.png'/></a>
    </footer>
  );
}

export default class HomeView extends React.Component {
  render() {
    return (
      <div className='main container-fluid home'>
        <Header />

        <SectionTitle anchor='what' title='WHAT IS VOTE WITH YOUR FEET' />
        <div className='intro'>
          <p>{INTRO_1}</p>
          <p>{INTRO_2}</p>
          <p>{INTRO_3}</p>
          <p>{INTRO_4}</p>
        </div>
        <TwitterTimeLine />

        <SectionTitle anchor='highlights' title='HIGHLIGHTS' />
        <Highlights />

        <SectionTitle anchor='votes' title='THE VOTES' />
        <Results limit='8' numOfColumns='4' />
        <Votes />

        <SectionTitle anchor='team' title='THE TEAM' />
        <Team />

        <SectionTitle anchor='make' title='THE MAKE' />
        <Make />

        <Footer />
      </div>
    );
  }
}
