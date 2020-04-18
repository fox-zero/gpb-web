import _ from 'lodash';
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {sync} from '@boilerplatejs/core/lib/Fetch';
import {load} from '@boilerplatejs/strapi/actions/Entry';
import {Page} from '@boilerplatejs/core/components/layout';
import {transition} from '@boilerplatejs/core/actions/Transition';
import {dismiss} from '@fox-zero/gpb-web/actions/Nav';
import {open, close} from '@fox-zero/gpb-web/actions/Solution';
import {Footer} from '@fox-zero/gpb-web/components/layout';
import {Solution} from '@fox-zero/gpb-web/components/buttons';
import * as modals from '@fox-zero/gpb-web/components/modals';
import {solutions, brand} from '@fox-zero/gpb-web/data';
import * as analytics from '@fox-zero/gpb-web/lib/analytics';

const HEADER_TIMER = 15;

const SOLUTION_DELAY = 100;
const SOLUTION_AVG = solutions.length / 2;

@sync([{
  promise: ({store: {dispatch}, params: { slug = 'wheel' }}) => dispatch(load('posts', { slug, published: true }))
}])

@connect(state => {
  const { Transition } = state['@boilerplatejs/core'];
  const { slide = 0 } = Transition;
  const { current: solution = null } = state['@fox-zero/gpb-web'].Solution;
  const content = { ...brand, ...state['@boilerplatejs/strapi'].Entry.posts.content };
  const { title, media, summary, slug = 'wheel' } = content;
  const image = media[0] ? media[0].url : brand.media[0].url;

  return ({
    slide,
    query: state.router.location.query,
    sources: state['@boilerplatejs/core'].Transition['analytics.sources'],
    recaptchaSiteKey: state['@boilerplatejs/core'].Config['@boilerplatejs/core'].recaptchaSiteKey,
    solution,
    title: `${title} · Grand POOBear · Fox Zero™`,
    meta: [
      {name: 'description', content: title},
      {property: 'og:type', content: 'article'},
      {property: 'og:url', content: `https://grandpoobear.foxzero.io${slug === 'wheel' ? '' : `/post/${slug}`}`},
      {property: 'og:title', content: title},
      {property: 'og:description', content: summary},
      {property: 'og:image:secure_url', content: image},
      {property: 'og:image', content: image},
      {property: 'twitter:card', content: 'article'},
      {property: 'twitter:title', content: title},
      {property: 'twitter:description', content: summary},
      {property: 'twitter:image', content: image}
    ]
  });
}, {transition, dismiss, open, close})

export default class extends Page {
  static propTypes = {
    transition: PropTypes.func.isRequired,
    dismiss: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    classNames: PropTypes.object,
    solution: PropTypes.object,
    recaptchaSiteKey: PropTypes.any,
    query: PropTypes.object,
    slide: PropTypes.number.isRequired,
    sources: PropTypes.any
  };

  static defaultProps = {
    className: '',
    classNames: {},
    solution: null
  };

  state = {
    ready: false
  };

  componentDidMount = () => {
    if (__CLIENT__) {
      document.querySelector('#app > section > .page').addEventListener('click', this.props.dismiss);
      document.querySelector('#app').classList.add('home');
      global.setTimeout(() => this.setState({ ready: true }), 1000);
      this.cycleHeader();
    }
  }

  componentWillMount = () => {
    const { props } = this;
    const { transition, query } = props;
    const { detail } = query;

    transition('header', 0).then(() => transition('slide', 0));
    this.props.transition({ progress: 1 });

    if (__CLIENT__) {
      if (detail || detail === null) {
        this.openSolution(solutions[0]);
      }
    }
  };

  componentWillUnmount = () => {
    if (__CLIENT__) {
      this.props.transition({ progress: 0.2 });
      document.querySelector('#app > section > .page').removeEventListener('click', this.props.dismiss);
      document.querySelector('#app').classList.remove('home');
    }
  }

  cycleHeader = (timer = HEADER_TIMER) => {
    const { transition } = this.props;

    if (__CLIENT__) {
      transition('timer', timer);
    }
  };

  get solutions() {
    const { renderSolution } = this;

    return (
      <section className="solutions">
        <div className="left">{solutions.slice(0, SOLUTION_AVG).map(renderSolution(i => ({ delay: (5 - i) * SOLUTION_DELAY, from: { transform: 'translate3d(-200%, 0, 0)', opacity: 0 }, to: { transform: 'translate3d(0, 0, 0)', opacity: .8 } })))}</div>
        <div className="right">{solutions.slice(SOLUTION_AVG).map(renderSolution(i => ({ delay: (7.5 - i) * SOLUTION_DELAY, from: { transform: 'translate3d(200%, 0, 0)', opacity: 0 }, to: { transform: 'translate3d(0, 0, 0)', opacity: .8 } })))}</div>
      </section>
    );
  }

  get header() {
    const { headers } = this.props;
    const single = headers.length === 1;

    return headers.length ? (
      <section className={`${single ? 'single' : ''} header container`}>
        {single ? headers : (headers[0])}
      </section>
    ) : <span/>;
  }

  openSolution = async (solution, sources) => {
    const { load, open, transition } = this.props;
    const { slug, media } = solution;
    (new Image()).src = media[0].url;
    await transition('timer.pause', true);
    open({ ...solution, ...{ sources }, ...await load('posts', { slug: encodeURIComponent(slug) }) });
  };

  renderSolution = transition => (solution, i) => {
    const { slide, sources } = this.props;
    const { ready } = this.state;

    return <Solution
      className={`${ready && slide === solution.index ? 'active' : ''}`}
      key={`detail-button-${i}`}
      icon={solution.icon}
      tooltip="Click to open overlay screen"
      transition={transition(i)}
      onClick={() => {
        analytics.Section.Click.track(solution.section, sources);
        this.openSolution(solution, (sources || []).concat(['Section.App.Click']));
      }}>
        <>
          <span>{solution.section} &bull;</span> {solution.title}
        </>
      </Solution>;
  }

  transition = (type, index) => this.props[type] === index ? Promise.resolve() : this.props.transition({ [type]: index });

  closeSolution = () => {
    const { close, transition } = this.props;
    transition('timer.pause', false);
    close();
  };

  render() {
    const { props, closeSolution } = this;
    const { className, solution } = props;

    return (
        <Page {...this.props} className={`home ${className}`}>
          <section className="section container">
            {this.header}
            {this.solutions}
            <Footer/>
          </section>
          <modals.Solution id="solution-modal" show={!!solution} solution={solution || {}} onHide={closeSolution}/>
        </Page>
    );
  }
}
