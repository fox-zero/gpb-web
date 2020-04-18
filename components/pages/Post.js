import _ from 'lodash';
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {ShareButtons} from 'react-share';
import {Page} from '@boilerplatejs/core/components/layout';
import {transition} from '@boilerplatejs/core/actions/Transition';
import {check} from '@boilerplatejs/core/actions/Verification';
import {dismiss} from '@fox-zero/gpb-web/actions/Nav';
import {open, close} from '@fox-zero/gpb-web/actions/Solution';
import {create, destroy} from '@fox-zero/gpb-web/actions/Contact';
import {Footer} from '@fox-zero/gpb-web/components/layout';
import {Solution} from '@fox-zero/gpb-web/components/buttons';
import {update} from '@boilerplatejs/hubspot/actions/Contact';
import {load} from '@boilerplatejs/strapi/actions/Entry';
import * as modals from '@fox-zero/gpb-web/components/modals';
import * as forms from '@fox-zero/gpb-web/components/forms';
import formatters from '@fox-zero/gpb-web/lib/formatters';
import {solutions, brand} from '@fox-zero/gpb-web/data';
import * as analytics from '@fox-zero/gpb-web/lib/analytics';
import {Parallax, ParallaxLayer} from '@react-spring/addons/parallax.cjs';

const {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton
} = ShareButtons;

const HEADER_TIMER = 15;

const SOLUTION_DELAY = 100;
const SOLUTION_AVG = solutions.length / 2;

const PARALLAX_SCALE = 750;
const PARALLAX_SPEED = 0.2;

const IMPRESSION_START = 0.5;
const IMPRESSION_END = 0.35;

const RE_SECTION_KEY = /.*\:(.*)$/;
const SECTION_DEFAULT = 'consulting';
const SECTION_FORM = 6;
const SECTIONS = {
  'consulting': { slide: 0 },
  'development': { slide: 1 },
  'strategy': { slide: 2 },
  'portfolio': { slide: 3 },
  'warranty': { slide: 4 },
  'subscription': { slide: 5 },
  'on-demand': { slide: 6 },
  'maintenance': { slide: 7 }
};

const RE_LEGACY_IE = /Trident\/7/;

const VERIFY_ACTION = 'form_page_submission';
const VERIFY_GRADE = 0.65;

@connect(state => {
  const { Transition } = state['@boilerplatejs/core'];
  const { slide = 0 } = Transition;
  const { current: solution = null } = state['@fox-zero/gpb-web'].Solution;
  return ({
    param: state.router.params,
    slide, query: state.router.location.query,
    contact: state['@fox-zero/gpb-web'].Contact.current,
    reset: Transition['slide.reset'],
    sources: state['@boilerplatejs/core'].Transition['analytics.sources'],
    recaptchaSiteKey: state['@boilerplatejs/core'].Config['@boilerplatejs/core'].recaptchaSiteKey,
    solution
  });
}, {transition, dismiss, update, load, open, close, create, destroy, check})

export default class extends Page {
  static propTypes = {
    transition: PropTypes.func.isRequired,
    dismiss: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    destroy: PropTypes.func.isRequired,
    classNames: PropTypes.object,
    solution: PropTypes.object,
    contact: PropTypes.object,
    recaptchaSiteKey: PropTypes.any,
    param: PropTypes.object,
    query: PropTypes.object,
    slide: PropTypes.number.isRequired,
    reset: PropTypes.bool,
    section: PropTypes.string,
    sources: PropTypes.any,
    check: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: '',
    classNames: {},
    solution: null,
    contact: null
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
    const { section, props } = this;
    const { transition, query } = props;
    const { detail } = query;
    const initial = section ? SECTIONS[section].slide : null;

    this.updateHeader();
    transition('slide.initial', initial);

    if (__CLIENT__) {
      if (detail || detail === null) {
        this.openSolution(solutions[initial || 0]);
      }
    } else {
      global.SLIDE_INITIAL = initial;
    }
  };

  componentWillUnmount = () => {
    if (__CLIENT__) {
      this.props.transition({ progress: 0.2 });
      document.querySelector('#app > section > .page').removeEventListener('click', this.props.dismiss);
      document.querySelector('#app').classList.remove('home');
    }
  }

  componentWillUpdate = props => {
    const { transition, param } = this.props;
    const section = props.param.section;

    if (param.section !== section) {
      this.updateHeader(props);
      transition('slide.initial', section ? SECTIONS[section].slide : null);
    }
  };

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

  get section() {
    return SECTION_DEFAULT;
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

  updateHeader = (props = this.props) => {
    const { transition } = this;
    const { header, slide } = SECTIONS[props.section || props.param.section] || SECTIONS[SECTION_DEFAULT];
    transition('header', header).then(() => transition('slide', slide));
    this.props.transition({ progress: 1 });
  };

  transition = (type, index) => this.props[type] === index ? Promise.resolve() : this.props.transition({ [type]: index });

  closeSolution = () => {
    const { close, transition } = this.props;
    transition('timer.pause', false);
    close();
  };

  render() {
    const { props, closeSolution } = this;
    const { className, solution, sections } = props;

    return (
        <Page {...this.props} className={`home ${className}`}>
          <section className="section container">
            {this.header}
            {this.solutions}
            {sections}
            <Footer/>
          </section>
          <modals.Solution id="solution-modal" show={!!solution} solution={solution || {}} onHide={closeSolution}/>
        </Page>
    );
  }
}
