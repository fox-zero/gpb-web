import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {Header} from '@fox-zero/gpb-web/components/layout';
import {transition} from '@boilerplatejs/core/actions/Transition';
import {load} from '@boilerplatejs/strapi/actions/Entry';
import {open} from '@fox-zero/gpb-web/actions/Solution';
import {solutions} from '@fox-zero/gpb-web/data';
import * as analytics from '@fox-zero/gpb-web/lib/analytics';

@connect(state => ({
  timer: state['@boilerplatejs/core'].Transition.timer,
  slide: state['@boilerplatejs/core'].Transition.slide,
  sources: state['@boilerplatejs/core'].Transition['analytics.sources'],
  impression: state['@boilerplatejs/core'].Transition['page.impression']
}), {load, open, transition})

export default class extends Header {
  static propTypes = {
    timer: PropTypes.number,
    sources: PropTypes.any,
    slide: PropTypes.number,
    impression: PropTypes.bool,
    load: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
    transition: PropTypes.func.isRequired
  };

  static defaultProps = {
    timer: 0,
    slide: 0
  };

  state = {
    loading: false
  };

  impressions = [];

  openSolution = async (solution) => {
    const { load, open, transition, sources } = this.props;
    const { slug, section, media } = solution;
    let entry;
    await transition('timer.pause', true);
    analytics.Section.Header.Click.track(section, sources);
    this.setState({ loading: true });
    (new Image()).src = media[0].url;
    entry = await load('posts', { slug: encodeURIComponent(slug) });
    this.setState({ loading: false });
    open({ ...solution, ...{ sources: (sources || []).concat(['Section.Header.Click']) }, ...entry });
  };

  transitionBegin = () => {};

  transitionComplete = () => {
    const { impressions, props } = this;
    const { impression, slide, sources } = props;

    if (!impression && !impressions[slide]) {
      impressions[slide] = true;
      analytics.Section.Header.Impression.track(solutions[slide].section, sources);
    }
  };

  renderTitle = (i, heading) => {
    const { loading } = this.state;
    const solution = solutions[i];
    const { section, title, summary } = solution;

    return (
      <div className="content" key={`slide-${i}`}>
        <h1>{section}</h1>
        <h2>{heading || title}</h2>
        <section className="preview">
          <button onClick={() => this.openSolution(solution)} title="Click to open overlay screen">
            <i className={`fa fa-ellipsis-h ${loading ? 'loading' : ''}`}/>
            <span>Read <span>More</span></span>
          </button>
          <div/>
          <p>{summary}</p>
        </section>
      </div>
    );
  };

  render() {
    const { renderTitle, props } = this;
    const { timer } = props;

    return (
        <Header timer={timer}
          runOnMount={__CLIENT__}
          onTransitionComplete={this.transitionComplete}
          onTransitionBegin={this.transitionBegin}
          images={solutions.map(solution => solution.media[0].url)}>
          {[
            <>100% Power<br />Every Hour</>,
            <>Full Service<br />Digital Agency</>,
            <>Introducing<br />FAST™ PLM</>,
            <>Target Verticals<br />&amp; Applications</>,
            <>Wingman™<br />Surety Coverage</>,
            <>Velocity™<br />Plan Pricing</>,
            <>Point &amp; Pay™<br />Sprint Pricing</>,
            <>Hosting, LTS,<br />Monitoring</>
          ].map((title, i) => renderTitle(i, title))}
        </Header>
    );
  }
}
