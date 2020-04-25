import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Modal} from '@fox-zero/gpb-web/components/layout';
import {transition as t} from '@boilerplatejs/core/actions/Transition';
import * as analytics from '@fox-zero/gpb-web/lib/analytics';

const DEFAULT_FILTER = 'All';
const RE_SIZE = /([\d\.]*)(.*)/;

@connect(state => {
  return {
    filters: state['@boilerplatejs/core'].Transition.filters || []
  };
}, {t})
export default class extends Modal {
  static defaultProps = {
    onHide: () => {}
  };

  state = {
    active: false
  };

  componentWillUpdate(props) {
    const { solution: wheel } = props;

    if (!wheel.wheelName && this.state.active) {
      this.setState({ active: false });
    }
  }

  componentDidUpdate(props) {
    const { solution: wheel, t, filters } = this.props;
    const { wheelName, sources, wheelSegments, wheelConfiguration, wheelSearchFilter } = wheel;

    const getTextSize = size => {
      const value = size.replace(RE_SIZE, '$1');
      const unit = size.replace(RE_SIZE, '$2');
      return (value * (global.isFullScreen ? (unit === 'em' ? 1.25 : 1.25) : 1)) + unit;
    };

    if (!wheelName && this.wheel) {
      this.wheel.restart();
    } else if (props.solution.wheelName !== wheelName) {
      analytics.Section.Detail.Impression.track(wheelName, sources);

      setTimeout(() => {
        (this.wheel = new Spin2WinWheel()).init({
          // Documentation: https://gist.github.com/chrisgannon/1afba5c07faeb9947a2e84d987200e3e
          onResult: () => {
            const results = this.wheel.getGameProgress().map(result => result.msg);

            t('filters', {
              ...filters,
              [wheelSearchFilter || DEFAULT_FILTER]: _.uniq(!wheelSearchFilter ? (filters[DEFAULT_FILTER] || []).concat(results) : results)
            });
          },
          onError: () => {},
          onGameEnd: () => {},
          spinTrigger: document.querySelector('.spin'),
          data: {
            wheelSize: 560 * (global.isFullScreen ? 1.35 : 1),
            svgWidth: 800,
            svgHeight: 640,
            centerX: 400,
            centerY: 285,
            clickToSpin: true,
            ...wheelConfiguration,
            wheelTextOffsetY: wheelConfiguration.wheelTextOffsetY * (global.isFullScreen ? 1.25 : 1),
            wheelTextSize: getTextSize(wheelConfiguration.wheelTextSize),
            spinDestinationArray: [],
            segmentValuesArray: wheelSegments.map(({
              segmentIconImage, segmentName, segmentResult//, segmentProbability, segmentData
            }) => ({
              win: true,
              type: segmentIconImage ? 'image' : 'string',
              value: segmentIconImage || segmentName,
              resultText: segmentResult || segmentName,
              // probability: segmentProbability,
              // userData: segmentData
            }))
          }
        });
      }, 0);
    }
  }

  onSpin = () => this.setState({ active: true });

  onHide = (...args) => {
    this.props.onHide.apply(this, args);
  };

  render() {
    const { active } = this.state;
    const { solution: wheel } = this.props;
    const { wheelName, slug, summary, title, subject, wheelIcon = 'pie-chart', wheelBackgroundImage = {}, wheelConfiguration = {} } = wheel;
    const { introText } = wheelConfiguration;
    const { location = {} } = global;
    const share = {
      url: `${location.protocol}//${location.host}${slug ? `/post/${slug.toLowerCase()}` : ''}`,
      caption: summary,
      subject: wheelName ? `${wheelName} · ${subject || title}` : subject || title,
      hashtags: ['smm2', 'nintendo', 'redbull', 'speedrun']
    };

    return (
      <Modal {..._.omit(this.props, ['update', 'solution', 'create', 'destroy', 'check', 'recaptchaSiteKey', 'contact', 't'])}
        onHide={this.onHide}
        className={`solution`}
        title={wheelName}
        dek={title}
        icon={wheelIcon}
        share={share}
        hero={wheelBackgroundImage.url}>
        {wheelName && <section className="content">
          <div className="wheelContainer">
            <svg className="wheelSVG" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" textRendering="optimizeSpeed">
              <defs>
                <filter id="shadow" x="-100%" y="-100%" width="550%" height="550%">
                  <feOffset in="SourceAlpha" dx="0" dy="0" result="offsetOut"></feOffset>
                  <feGaussianBlur stdDeviation="9" in="offsetOut" result="drop" />
                  <feColorMatrix in="drop" result="color-out" type="matrix" values="0 0 0 0   0
                                0 0 0 0   0
                                0 0 0 0   0
                                0 0 0 .3 0" />
                  <feBlend in="SourceGraphic" in2="color-out" mode="normal" />
                </filter>
              </defs>
              <g className="mainContainer">
                <g className="wheel" />
              </g>
              <g className="centerCircle" />
              <g className="wheelOutline" />
              <g className="pegContainer">
                <path className="peg" fill="#EEEEEE" d="M22.139,0C5.623,0-1.523,15.572,0.269,27.037c3.392,21.707,21.87,42.232,21.87,42.232  s18.478-20.525,21.87-42.232C45.801,15.572,38.623,0,22.139,0z" />
              </g>
              <g className="valueContainer" />
              <image xlinkHref="https://s3-us-west-2.amazonaws.com/content-gpb.foxzero.io/assets/images/logo.png" width="200" height="200" x="300" y="187" />
            </svg>
            <div className={`toast ${active || introText ? 'active' : ''}`}>
              <p />
            </div>
          </div>
          <div className="spin-container">
            <button className="spin btn btn-success" onClick={this.onSpin}>
              <i className="fa fa-hand-o-right" />
              <span>Spin <span>for the People</span></span>
            </button>
          </div>
        </section>}
      </Modal>
    );
  }
}
