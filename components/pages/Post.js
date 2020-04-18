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
    animating: false,
    isMobile: true,
    isLandscape: false,
    ready: false,
    form: {
      message: null,
      status: null
    }
  };

  impressions = [];

  componentDidMount = () => {
    if (__CLIENT__) {
      const elements = this.elements = this.getElements();

      const { app, parallax } = elements;
      document.querySelector('#app > section > .page').addEventListener('click', this.props.dismiss);
      app.classList.add('home');
      parallax.addEventListener('scroll', this.onScroll = _.debounce(this.onScroll, 950, { trailing: true }));
      global.addEventListener('resize', this.updateViewport);
      global.setTimeout(() => this.setState({ ready: true }), 1000);
      this.updateViewport();
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
      const { app, parallax } = this.elements;
      this.props.transition({ progress: 0.2 });
      document.querySelector('#app > section > .page').removeEventListener('click', this.props.dismiss);
      app.classList.remove('home');
      parallax.removeEventListener('scroll', this.onScroll);
      global.removeEventListener('resize', this.updateViewport);
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

  componentDidUpdate = () => {
    this.elements = this.getElements();
  };

  cycleHeader = (timer = HEADER_TIMER) => {
    const { transition } = this.props;

    if (__CLIENT__) {
      transition('timer', this.sections.length > 1 ? timer : 0);
    }
  };

  getElements() {
    const { length, props } = this;
    const { slide } = props;
    const app = document.querySelector('#app');
    const parallax = app.querySelector('.section.container > .parallax');
    const section = parallax.querySelector(`.section-${slide}`);
    const form = parallax.querySelector(`.section-form`);
    const sections = [];

    for (let i = 0; i < length; i++) {
      let section = parallax.querySelector(`.section-${i}`);

      sections[i] = {
        element: section,
        height: section && section.offsetHeight
      };
    }

    return {
      app,
      parallax,
      section,
      sections,
      form: {
        element: form,
        height: form && form.offsetHeight
      }
    };
  }

  onScroll = () => {
    const { elements, section, props, impression, impressions } = this;
    const { transition, reset, slide: current, sources } = props;
    const { sections, form } = elements;
    const { length } = sections;
    const pageHeight = global.innerHeight;
    let timer, slide;

    if (sections[0].element.getBoundingClientRect().top <= pageHeight * IMPRESSION_START) {
      let start, end;
      timer = 0;
      transition('page.impression', this.impression = true);

      for (let i = 0; i < length; i++) {
        start = sections[i].element.getBoundingClientRect().top;
        end = start + sections[i].height;

        if (start <= pageHeight * IMPRESSION_START) {
          slide = section ? SECTIONS[section].slide : i;

          if (end >= pageHeight * IMPRESSION_END) {
            if (!impressions[i]) {
              this.impressions = [];
              form.impression = false;
              impressions[i] = true;
              analytics.Section.Page.Impression.track(
                section ? formatters.section(section) : ['Home', solutions[i].section].join(','),
                sources
              );
            }
          } else {
            impressions[i] = false;
          }
        }
      }

      start = form.element.getBoundingClientRect().top
      end = start + form.height

      if (start <= pageHeight * 0.7 && end >= pageHeight * 0.9) {
        if (!form.impression) {
          this.impressions = [];
          form.impression = true;
          analytics.Form.Page.Impression.track(formatters.section(section || 'Home'), sources);
        }
      } else {
        form.impression = false;
      }
    } else if (impression) {
      timer = HEADER_TIMER;
      slide = section ? SECTIONS[section].slide : (reset ? 0 : (props.slide === this.length - 1 ? 0 : props.slide + 1));
      transition('page.impression', this.impression = false);
    }

    if (typeof slide !== 'undefined') {
      slide !== current && transition('slide', slide);
      transition('slide.reset', false);
      this.cycleHeader(timer);
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
    const { props } = this;
    const section = props.section || props.param.section;
    return section ? (SECTIONS[section] ? section : SECTION_DEFAULT) : section;
  }

  get sections() {
    return this.props.sections.filter(this.filter);
  }

  get length() {
    return this.section ? 1 : this.props.sections.length;
  }

  get formatted() {
    return formatters.section(this.section || 'Home');
  }

  get content() {
    const headerClass = this.length % 2 ? 'text-right' : '';

    return (
      <section className="section">
        <h2 className={headerClass}>Content</h2>
        <h3 className={headerClass}>Channel<br />Fox Zero™</h3>
        <div className="container">
          <div className="row">
            <div className="col-md-12 card">
              <p><span>Optimized for efficient innovation, design, development, hosting, and marketing services, we manage digital media products and web-based apps for Fortune 500 and VC-backed companies.</span></p>
              <img src="https://d3w33imimg0eu8.cloudfront.net/images/logo.png" />
              <p>With over 100 years of combined experience in the software development and digital marketing industries, our senior partners have curated a well-oiled "one-stop-shop" product lifecycle management (PLM) process, without the added weight of current industry standards.</p>
              <div>
                <Link className="link" to="/stream/music/music-tech-steven-tyler-collision-nola/5/4/2018">
                  <Solution
                    icon="television">
                    View <span>Fox Zero™ TV</span>
                  </Solution>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  updateViewport = () => {
    const { isLandscape: currentOrientation, ready } = this.state;
    const isLandscape = global.innerWidth > global.innerHeight;

    this.setState({ isMobile: global.innerWidth < 992, isLandscape });

    if (ready && isLandscape !== currentOrientation) {
      global.location.reload();
    }
  };

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

  submit = values => {
    const { formatted } = this;
    const { update, create, sources, recaptchaSiteKey, check } = this.props;
    const { email } = values;

    const submit = async () => {
      try {
        const { score } = recaptchaSiteKey ? await grecaptcha.execute(recaptchaSiteKey, { action: VERIFY_ACTION }).then(token => check(token, VERIFY_ACTION)) : {};

        if (score && score < VERIFY_GRADE) {
          let e = new Error('Unauthorized submission reported by bot verification check.');
          e.name = 'Verification';
          e.code = 403;
          throw e;
        }

        this.setState({ form: { message: null, status: 'Submitting' } });
        const tracking = analytics.Form.Page.Submission.track(formatted, sources);

        const contact = await update({
          lead: true,
          newsletter: !(values.newsletter === false),
          properties: {
            email,
            message: values.comment,
            firstname: values.firstName,
            lastname: values.lastName,
            phone: values.phone,
            company: values.company,
            section: formatted,
            application: 'Fox Zero™ Marketing App',
            tracking
          }
        });

        create(contact);
        this.setState({ form: { message: null, status: null } });
        analytics.Form.Page.Success.track(formatted, sources);
        analytics.Confirmation.Page.Impression.track(formatted, sources);
      } catch (e) {
        const { message, status, code, errorCode, name } = e;
        this.setState({ form: { message, status: null } });
        analytics.Form.Page.Failure.track([formatted].concat(name || []).concat(status || code || errorCode || []).join(','), sources);
      }
    };

    if (email) {
      if (recaptchaSiteKey) {
        this.setState({ form: { message: null, status: 'Verifying' } });
        grecaptcha.ready(submit);
      } else {
        submit();
      }
    }
  };

  updateHeader = (props = this.props) => {
    const { transition } = this;
    const { header, slide } = SECTIONS[props.section || props.param.section] || SECTIONS[SECTION_DEFAULT];
    transition('header', header).then(() => transition('slide', slide));
    this.props.transition({ progress: 1 });
  };

  transition = (type, index) => this.props[type] === index ? Promise.resolve() : this.props.transition({ [type]: index });

  wrap = sections => sections.map((section, i) => <div key={String(i)}>{section}</div>);

  filter = component => {
    const { section } = this;
    return section ? component.key.replace(RE_SECTION_KEY, '$1').toLowerCase() === section.toLowerCase().replace('-', '') : true;
  }

  closeSolution = () => {
    const { close, transition } = this.props;
    transition('timer.pause', false);
    close();
  };

  openContact = () => {
    const { section } = this;
    const { open, contact, sources } = this.props;
    const { isMobile } = this.state;
    const { title, summary } = brand;
    let label;

    if ((isMobile || RE_LEGACY_IE.test(window.navigator.userAgent)) && !contact) {
      label = formatters.section(section || 'Home');
      analytics.Form.Page.Click.track(label, sources);
      transition('timer.pause', true);
      open({ subject: title, summary, section: label, sources: (sources || []).concat(['Form.Page.Click']) });

      setTimeout(() => {
        const dialog = document.getElementById('solution-modal').querySelector('.modal-dialog');
        const body = dialog.querySelector('.modal-body');
        const form = body.querySelector('.form');

        if (dialog.scrollTo) {
          dialog.scrollTo({ top: body.offsetTop, left: 0, behavior: 'smooth' });
        } else {
          dialog.scrollTop = body.offsetTop;
        }

        form.querySelector('.firstName input').focus();
      }, 0);
    }
  };

  formatCalendarParams = ({ email, firstname, lastname, company = { value: '' }, message = { value: '' } }) => {
    const e = encodeURIComponent;
    return `email=${e(email.value)}&name=${e([firstname.value, lastname.value].join(' '))}&a1=${e(company.value)}&a2=${e(message.value)}`;
  };

  onShare = (source, { email, shares }) => async () => {
    const { update, create, contact, sources } = this.props;
    const updated = await update({ lead: true, newsletter: true, properties: { email: email.value, shares: [shares ? shares.value : []].concat(source).join(';') } });
    contact && create(updated);
    analytics.Confirmation.Page.Share.track([this.formatted, source].join(','), sources);
  };

  renderShare = ({ slug, summary, title, subject, section }) => {
    const { contact } = this.props;
    const share = {
      url: `${location.protocol}//${location.host}/${(slug || '').toLowerCase()}`,
      caption: summary,
      subject: section ? `${section} · ${subject || title}` : subject || title,
      hashtags: ['software', 'agency', (section || 'consulting').toLowerCase()]
    };

    return <div className="share">
      <LinkedinShareButton url={share.url} title={subject || title} source="Fox Zero™" summary={share.caption} onShareWindowClose={this.onShare('linkedin', contact)}>
        <i className="fa fa-linkedin-square"/>
      </LinkedinShareButton>
      <FacebookShareButton url={share.url} quote={share.caption} hashtag={share.hashtags.map(tag => `#${tag}`).join(' ')} onShareWindowClose={this.onShare('facebook', contact)}>
        <i className="fa fa-facebook-official"/>
      </FacebookShareButton>
      <TwitterShareButton url={share.url} title={share.caption} hashtags={share.hashtags} related="@fox_zero_agency" onShareWindowClose={this.onShare('twitter', contact)}>
        <i className="fa fa-twitter"/>
      </TwitterShareButton>
      <EmailShareButton url={share.url} subject={`Fox Zero™ · ${share.subject}`} body={`${share.caption}\n\nRead More: ${share.url}\n\n`} onShareWindowClose={this.onShare('email', contact)}>
        <i className="fa fa-envelope"/>
      </EmailShareButton>
    </div>;
  };

  render() {
    const { props, state, sections, length, closeSolution, section, formatted } = this;
    const { className, classNames = {}, solution, contact, destroy: reset, sources } = props;
    const { animating, isMobile, isLandscape } = state;
    const { message, status } = state.form;

    const SECTION_HEIGHTS = [0, 0, 0, 0, 0, isMobile ? 0.275 : 0, 0, 0];
    const aggregateHeight = offset => SECTION_HEIGHTS.slice(0, offset).reduce((a, b) => a + b, 0);
    const hasMany = sections.length > 1;
    const scale = global.innerHeight ? PARALLAX_SCALE / global.innerHeight : 1;
    const height = length + (hasMany ? aggregateHeight(length - 1) : SECTION_HEIGHTS[SECTIONS[section].slide]);
    const factor = offset => 1.1 + (offset * scale) + (offset * 0.4);
    const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://d3w33imimg0eu8.cloudfront.net/images/${name}.svg${wrap ? ')' : ''}`;

    const renderLayer = (index = 0, offset = 0) => (component, i) => (
      <ParallaxLayer
        className={`section-${i + index}`}
        key={`section-${i + index}`}
        offset={factor(i + index + offset) + (hasMany ? aggregateHeight(i) : 0)}
        factor={scale + (hasMany ? SECTION_HEIGHTS[i] : SECTION_HEIGHTS[SECTIONS[section].slide])}
        speed={PARALLAX_SPEED}>
        {component}
      </ParallaxLayer>
    );

    return (
        <Page {...this.props} className={`home ${className} ${animating ? `${classNames.animating || ''} animating` : ''}`}>
          <section className="section container">
            {__CLIENT__ ? <Parallax className={`parallax ${isLandscape ? 'landscape' : ''}`} pages={factor(height + (isMobile && !hasMany ? 2.5 : 2.35))} style={{ left: 0 }}>
              <ParallaxLayer offset={0} speed={0} factor={10} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }} />
              <ParallaxLayer offset={5} speed={0} factor={10} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }} />
              <ParallaxLayer offset={10} speed={0} factor={10} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }} />
              <ParallaxLayer offset={12} speed={0} factor={10} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }} />
              <ParallaxLayer
                offset={0}
                speed={0}
                style={{ height: '100vh' }}>
                {this.header}
              </ParallaxLayer>
              {!isMobile && <ParallaxLayer
                offset={0}
                speed={-1}
                style={{ pointerEvents: 'none', zIndex: 1 }}>
                {this.solutions}
              </ParallaxLayer>}

              <ParallaxLayer offset={factor(0)} speed={1} style={{ backgroundColor: '#76a8c7', opacity: '.35', height: '125vh' }} />
              <ParallaxLayer offset={factor(2)} speed={1} style={{ backgroundColor: '#009fdd', opacity: '.5', height: '125vh' }} />
              <ParallaxLayer offset={factor(4)} speed={0.35} style={{ backgroundColor: '#76a8c7', opacity: '.35', height: '125vh' }} />
              <ParallaxLayer offset={factor(6)} speed={1} style={{ backgroundColor: '#009fdd', opacity: '.5', height: '125vh' }} />
              <ParallaxLayer offset={factor(8)} speed={1} style={{ backgroundColor: '#76a8c7', opacity: '.35', height: '125vh' }} />
              <ParallaxLayer offset={2.5} speed={-0.4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <img src={url('earth')} style={{ width: '60%', opacity: '.8' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={6.5} speed={-0.4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <img src={url('earth')} style={{ width: '60%', opacity: '.8' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={10.5} speed={-0.4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <img src={url('earth')} style={{ width: '60%', opacity: '.8' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
                <img src={url('satellite4')} style={{ width: '15%', marginLeft: '70%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={5} speed={-0.5} style={{ pointerEvents: 'none' }}>
                <img src={url('satellite4')} style={{ width: '15%', marginLeft: '15%', transform: 'rotate(270deg)' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={9} speed={-0.3} style={{ pointerEvents: 'none' }}>
                <img src={url('satellite4')} style={{ width: '15%', marginLeft: '70%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={12} speed={-0.5} style={{ pointerEvents: 'none' }}>
                <img src={url('satellite4')} style={{ width: '15%', marginLeft: '15%', transform: 'rotate(270deg)' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={1} speed={0.5} style={{ opacity: 0.1 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.2 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={1.75} speed={0.75} style={{ opacity: 0.2 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '25%', marginLeft: '70%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '45%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={3} speed={0.2} style={{ opacity: 0.2 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
                <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={3.6} speed={0.2} style={{ opacity: 0.2 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={4} speed={0.4} style={{ opacity: 0.6 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={5} speed={0.8} style={{ opacity: 0.1 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
                <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={5.75} speed={0.5} style={{ opacity: 0.1 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
                <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={6.6} speed={0.4} style={{ opacity: 0.6 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
                <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={7.6} speed={0.2} style={{ opacity: 0.2 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
                <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={8} speed={0.4} style={{ opacity: 0.6 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '65%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={9} speed={0.8} style={{ opacity: 0.1 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
                <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={9.75} speed={0.5} style={{ opacity: 0.1 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
                <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={10.6} speed={0.4} style={{ opacity: 0.6 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
                <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={11.6} speed={0.2} style={{ opacity: 0.2 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
                <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
              </ParallaxLayer>
              <ParallaxLayer offset={12.1} speed={0.4} style={{ opacity: 0.6 }}>
                <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '65%' }} />
              </ParallaxLayer>
              {sections.slice(0, hasMany ? SECTION_FORM : sections.length).map(renderLayer())}
              <ParallaxLayer
                className="section-form"
                offset={factor((hasMany ? SECTION_FORM : height) + 0.1)}
                speed={PARALLAX_SPEED}>
                <section className="quote section">
                  <h2>Talk to Me</h2>
                  <h3>{contact ? <>Get it on<br />the Calendar!</> : <>Book a Free<br />Consultation!</>}</h3>
                  <p>Our services can accelerate and enhance your software projects. Use the form (<i className="fa color-primary-green fa-hand-o-down" />) to get started with a free 30 minute call with a senior partner.</p>
                  <div className={`form ${contact ? 'success' : ''}`} onClick={this.openContact}>
                    <div>
                      <div>
                        {contact && <>
                          <h4>Schedule a Call</h4>
                          <p>Hey <strong>{contact.firstname.value}</strong>, thanks for contacting us! You can use the button below to schedule an appointment for your consultation call. We look forward to chatting with you!</p>
                          <button className="btn btn-success" onClick={() => analytics.Confirmation.Page.Booking.track(formatted, sources)}>
                            <a href={`https://calendly.com/fox-zero/consultation?${this.formatCalendarParams(contact)}`} target="_blank">Book Now</a>
                            <i className="fa fa-link" />
                          </button>
                        </>}
                        <br />
                        <br />
                        <h4>Spread the Word</h4>
                        <p>Shout-outs can get you a <strong>5% discount</strong>!</p>
                        <ul>
                          <li>Use the buttons below to share us.</li>
                          <li>20 aggregate "likes" discounts 2.5%.</li>
                          <li>10 aggregate comments discounts 2.5%.</li>
                          <li><small><i>Shout-Out Discount</i> applies to all subscription plans for the first 6 billing cycles.</small></li>
                        </ul>
                        {contact && this.renderShare(this.section ? solutions[SECTIONS[this.section].slide] : brand)}
                        <br />
                        <br />
                        <button className="btn btn-success" onClick={() => { reset(); analytics.Confirmation.Page.Reset.track(formatted, sources); }}>Reset Form</button>
                      </div>
                    </div>
                    <forms.Contact status={status} quote newsletterText="Subscribe to Fox Zero™ TV emails for project management tips, industry trends,  free-to-use software, and more." onSubmit={this.submit}/>
                    {!contact && message && <span className="error">{message}</span>}
                    {!contact && <span className="legal">This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank">Terms of Service</a> apply.</span>}
                  </div>
                </section>
              </ParallaxLayer>
              {hasMany ? sections.slice(SECTION_FORM).map(renderLayer(SECTION_FORM, 0.9 + (isMobile ? 0 : 0.05))) : <></>}
              <ParallaxLayer
                offset={factor(height + (hasMany ? (isMobile ? 0.8 : 0.9) : 0.95) + (isMobile ? 0 : 0.05))}
                factor={scale}
                speed={PARALLAX_SPEED}>
                {this.content}
              </ParallaxLayer>
              <Footer/>
            </Parallax> : <>
              {this.header}
              {sections}
              {this.content}
              <Footer/>
            </>}
          </section>
          <modals.Solution id="solution-modal" show={!!solution} solution={solution || {}} onHide={closeSolution}/>
        </Page>
    );
  }
}
