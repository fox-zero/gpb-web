import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {Header} from '@fox-zero/gpb-web/components/layout';
import {transition} from '@boilerplatejs/core/actions/Transition';
import {open} from '@fox-zero/gpb-web/actions/Solution';
import {brand} from '@fox-zero/gpb-web/data';
import * as analytics from '@fox-zero/gpb-web/lib/analytics';

@connect(state => {
  const content = { ...brand, ...state['@boilerplatejs/strapi'].Entry.posts.content };
  const { media, wheelConfiguration, title, slug, summary } = content;
  const image = media[0] || brand.media[0];
  const wheels = content.wheels.filter(wheel => wheel.wheelSegments.length).map((wheel, i) => ({
    ...wheel,
    title,
    slug,
    summary,
    index: i,
    wheelBackgroundImage: wheel.wheelBackgroundImage || image,
    wheelConfiguration
  }));

  return {
    wheels,
    timer: state['@boilerplatejs/core'].Transition.timer,
    slide: state['@boilerplatejs/core'].Transition.slide,
    sources: state['@boilerplatejs/core'].Transition['analytics.sources']
  };
}, {open, transition})

export default class extends Header {
  static propTypes = {
    timer: PropTypes.number,
    sources: PropTypes.any,
    slide: PropTypes.number,
    open: PropTypes.func.isRequired,
    transition: PropTypes.func.isRequired,
    wheels: PropTypes.array
  };

  static defaultProps = {
    timer: 0,
    slide: 0,
    wheels: []
  };

  state = {
    loading: false
  };

  openSolution = wheel => {
    const { open, transition, sources } = this.props;
    const { wheelName, wheelBackgroundImage } = wheel;
    transition('timer.pause', true);
    analytics.Section.Header.Click.track(wheelName, sources);
    this.setState({ loading: true });
    (new Image()).src = wheelBackgroundImage.url;
    open({ ...wheel, ...{ sources: (sources || []).concat(['Section.Header.Click']) } });
    this.setState({ loading: false });
  };

  transitionBegin = () => {};

  transitionComplete = () => {};

  renderWheelHeader = wheel => {
    const { loading } = this.state
    const { wheelName, wheelDescription, title } = wheel;

    return (
      <div className="content" key={`slide-${wheel.index}`}>
        <h1>{title}</h1>
        <h2>{wheelName}</h2>
        <section className="preview">
          <button onClick={() => this.openSolution(wheel)} title="Click to open wheel">
            <i className={`fa fa-ellipsis-h ${loading ? 'loading' : ''}`}/>
            <span>Go to <span>Wheel</span></span>
          </button>
          <div/>
          <p>{wheelDescription}</p>
        </section>
      </div>
    );
  };

  render() {
    const { renderWheelHeader, props } = this;
    const { timer, wheels } = props;

    return (
        <Header timer={timer}
          runOnMount={__CLIENT__}
          onTransitionComplete={this.transitionComplete}
          onTransitionBegin={this.transitionBegin}
          images={wheels.map(wheel => wheel.wheelBackgroundImage.url)}>
          {wheels.map(renderWheelHeader)}
        </Header>
    );
  }
}
