import React from 'react';
import _ from 'lodash';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Questions } from '../api/questions.js';

const GOOGLE_FORM_LINK = 'https://goo.gl/forms/lf9dBVNkjt0ixVmn2';
const TWITTER_PAGE_LINK = 'https://twitter.com/vwyf1x1';

function getQuestionText(question) {
  if (question.text === '?') {
    return `${question.optionA} or ${question.optionB}?`
  }
  return question.text;
}

class ResultItem extends React.Component {
  componentDidMount() {
    this.renderPieChartWithLegend(this.props);
  }
  componentDidUpdate() {
    this.renderPieChartWithLegend(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.renderPieChartWithLegend(nextProps);
  }
  renderPieChartWithLegend(props) {
    this.chart && this.chart.destroy();
    // global options variable
    var options = {
      animation: false,
      responsive: true,
      scaleBeginAtZero: true,
      tooltipTemplate: "<%=label%>",
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    }

    var ctxPTD = $(this.pieChart).get(0).getContext("2d");
    var dataPTD = [
      {
        label: `${props.question.optionA}: ${props.question.count.A}`,
        color: "rgba(74, 74, 74, 1)",
        highlight: "rgba(74, 74, 74, .9)",
        value: props.question.count.A,
      },
      {
        label: `${props.question.optionB}: ${props.question.count.B}`,
        color: "rgba(252, 238, 31, 1)",
        highlight: "rgba(252, 238, 31, .9)",
        value: props.question.count.B,
      },
    ]

    this.chart = new Chart(ctxPTD).Pie(dataPTD, options);
    // pie chart legend
    $(this.legend).html(this.chart.generateLegend());
  }

  render() {
    return (
      <div className={'col-md-' + (12 / this.props.numOfColumns)}>
        <div className='result-wrapper'>
          <h1>{getQuestionText(this.props.question)}</h1>
          <div className='chart'>
            <canvas className='pie' ref={ref => this.pieChart = ref} />
            <div ref={ref => this.legend = ref} />
          </div>
        </div>
      </div>);
  }
}

ResultItem.propTypes = {
  question: React.PropTypes.object,
  numOfColumns: React.PropTypes.integer // integer in 1, 2, 3, 4, 6, 12
}

const ResultsRow = ({questions, numOfColumns}) => (
  <div className='results-row'>
    <div className='container'>
      <div className='row'>
        {questions.map(question =>
          <ResultItem key={question.id} question={question} numOfColumns={numOfColumns} />)}
      </div>
    </div>
  </div>);

export class Results extends TrackerReact(React.Component) {
  renderResults() {
    let questions = _.take(Questions.find(
      {priority: {$lt: 4}}, {sort: {lastUpdatedAt: -1}}
    ).fetch(), this.props.limit);

    return _.chunk(questions, this.props.numOfColumns).map(
      (threeQuestions, i) =>
        <ResultsRow key={i}
          questions={threeQuestions}
          numOfColumns={this.props.numOfColumns}
        />);
  }

  render() {
    return (
      <div className='all-results-wrapper'>
        {this.renderResults()}
      </div>
    );
  }
}

Results.PropTypes = {
  limit: React.PropTypes.integer,
  numOfColumns: React.PropTypes.integer // integer in 1, 2, 3, 4, 6, 12
};

Results.defaultProps = {
  limit: 1000,
  numOfColumns: 3,
};

export class ResultsView extends React.Component {
  constructor() {
    super();

    this.state = {numOfVotes: 0};
  }

  componentDidMount() {
    Meteor.call('answers.count', (error, result) => {
      if(result) {
        this.setState({numOfVotes: result});
      }
    });
  }

  getTitle() {
    const tweet = <a href='/' target='_blank'>#VoteWithYourFeet</a>;
    if (!this.state.numOfVotes) {
      return tweet;
    }
    return <span>
      <b>{this.state.numOfVotes}</b> people {tweet}
    </span>
  }

  render() {
    return (
      <div className="main container-fluid">
        <header>
          <a className='logo' href='/'><img src='images/logo.png'/></a>
          <span className='title'>{this.getTitle()}</span>
          <span className='location'>San Francisco 2016</span>
        </header>
        <Results />
      </div>
    );
  }
};
