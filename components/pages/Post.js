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
import {brand} from '@fox-zero/gpb-web/data';
import * as analytics from '@fox-zero/gpb-web/lib/analytics';

const DEFAULT_SLUG = brand.slug;

const HEADER_TIMER = 15;

const WHEEL_BUTTON_DELAY = 100;
const WHEEL_DEFAULT_ICON = 'pie-chart';

@sync([{
  promise: ({store: {dispatch}, params: { slug = DEFAULT_SLUG }}) => dispatch(load('posts', { slug, published: true }))
}])

@connect(state => {
  const { Transition } = state['@boilerplatejs/core'];
  const { slide = 0 } = Transition;
  const { current: solution = null } = state['@fox-zero/gpb-web'].Solution;
  const content = { ...brand, ...state['@boilerplatejs/strapi'].Entry.posts.content };
  const { title, media, summary, slug = DEFAULT_SLUG, wheelConfiguration } = content;
  const image = media[0] || brand.media[0];
  const wheels = content.wheels.filter(wheel => wheel.wheelActive && wheel.wheelSegments.length > 1).map((wheel, i) => ({
    ...wheel,
    title,
    summary,
    slug,
    index: i,
    wheelBackgroundImage: wheel.wheelBackgroundImage || image,
    wheelConfiguration
  }));

  return ({
    content,
    wheels,
    slide,
    query: state.router.location.query,
    sources: state['@boilerplatejs/core'].Transition['analytics.sources'],
    recaptchaSiteKey: state['@boilerplatejs/core'].Config['@boilerplatejs/core'].recaptchaSiteKey,
    solution,
    title: `${title} · Grand POOBear · Fox Zero™`,
    meta: [
      {name: 'description', content: title},
      {property: 'og:type', content: 'article'},
      {property: 'og:url', content: `https://grandpoobear.foxzero.io${slug === DEFAULT_SLUG ? '' : `/post/${slug}`}`},
      {property: 'og:title', content: title},
      {property: 'og:description', content: summary},
      {property: 'og:image:secure_url', content: image.url},
      {property: 'og:image', content: image.url},
      {property: 'twitter:card', content: 'article'},
      {property: 'twitter:title', content: title},
      {property: 'twitter:description', content: summary},
      {property: 'twitter:image', content: image.url}
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
    sources: PropTypes.any,
    wheels: PropTypes.array,
    content: PropTypes.object.isRequired
  };

  static defaultProps = {
    className: '',
    classNames: {},
    wheels: [],
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
    const { transition, query, wheels } = props;
    const { detail } = query;

    transition('header', 0).then(() => transition('slide', 0));
    this.props.transition({ progress: 1 });

    if (__CLIENT__) {
      if (detail || detail === null) {
        this.openSolution(wheels[0]);
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
    const { transition, wheels: { length } } = this.props;

    if (__CLIENT__) {
      transition('timer', length > 1 ? timer : 0);
    }
  };

  get solutions() {
    const { renderSolution, props } = this;
    const { wheels } = props;
    const { length } = wheels;
    const median = length / 2 + (length % 2 ? 1 : 0);

    return (
      <section className="solutions">
        <div className="left">{wheels.slice(0, median).map(renderSolution(i => ({ delay: (5 - i) * WHEEL_BUTTON_DELAY, from: { transform: 'translate3d(-200%, 0, 0)', opacity: 0 }, to: { transform: 'translate3d(0, 0, 0)', opacity: .8 } })))}</div>
        <div className="right">{wheels.slice(median).map(renderSolution(i => ({ delay: (7.5 - i) * WHEEL_BUTTON_DELAY, from: { transform: 'translate3d(200%, 0, 0)', opacity: 0 }, to: { transform: 'translate3d(0, 0, 0)', opacity: .8 } })))}</div>
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

  openSolution = (wheel, sources) => {
    const { open, transition } = this.props;
    const { wheelBackgroundImage } = wheel;
    (new Image()).src = wheelBackgroundImage.url;
    transition('timer.pause', true);
    open({ ...wheel, ...{ sources } });
  };

  renderSolution = transition => (wheel, i) => {
    const { slide, sources } = this.props;
    const { ready } = this.state;

    return <Solution
      className={`${ready && slide === wheel.index ? 'active' : ''}`}
      key={`detail-button-${i}`}
      icon={wheel.wheelIcon || WHEEL_DEFAULT_ICON}
      tooltip="Click to open wheel"
      transition={transition(i)}
      onClick={() => {
        analytics.Section.Click.track(wheel.wheelName, sources);
        this.openSolution(wheel, (sources || []).concat(['Section.App.Click']));
      }}>
        <>
          <span>{wheel.wheelName}</span> {wheel.wheelDek && <>&bull; {wheel.wheelDek}</>}
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
            {/* <Footer/> */}
          </section>
          <modals.Wheel id="solution-modal" show={!!solution} solution={solution || {}} onHide={closeSolution}/>
        </Page>
    );
  }
}
