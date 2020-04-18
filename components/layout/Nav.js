import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Nav} from '@boilerplatejs/core/components/layout';
import {Progress} from '@boilerplatejs/core/components/layout';
import {load, dismiss} from '@fox-zero/gpb-web/actions/Nav';
import {transition} from '@boilerplatejs/core/actions/Transition';
import {solutions} from '@fox-zero/gpb-web/data';
import formatters from '@fox-zero/gpb-web/lib/formatters';
import * as analytics from '@fox-zero/gpb-web/lib/analytics';

const DEFAULT_ID = 'home';

@connect(state => ({section: state.router.params.section}), {load, dismiss, transition})

export default class extends Nav {
  static propTypes = {
    load: PropTypes.func.isRequired,
    transition: PropTypes.func.isRequired,
    dismiss: PropTypes.func.isRequired,
    section: PropTypes.string
  };

  id = DEFAULT_ID;

  componentDidMount = () => this.props.load();

  scrollTo = (id, source) => {
    const { transition, dismiss, section } = this.props;
    const app = document.querySelector('#app');
    const parallax = app.querySelector('.section.container > .parallax');
    let label;

    if (this.id === id) {
      if (!section)
        transition('slide.reset', true);

        if (app.scrollTo) {
          app.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          parallax && parallax.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          clearTimeout(this.dismiss);
          this.dismiss = setTimeout(dismiss, parallax ? parallax.scrollTop * 0.25 : 500);
        } else {
          app.scrollTop = 0;
          parallax && (parallax.scrollTop = 0);
          dismiss();
        }
    } else {
      app.scrollTop = 0;
      parallax && (parallax.scrollTop = 0);
      label = formatters.section(id);
      analytics.Section.Navigation.Click.track(label);
      transition('page.impression', false);

      if (source) {
        transition('analytics.sources', [['Section.Navigation.Click', label].join('|')]);
      } else {
        transition('analytics.sources', undefined);
      }
    }

    this.id = id;
  };

  render() {
    const preventDefault = e => e.preventDefault();
    const { scrollTo } = this;
    const update = (id, track) => () => scrollTo(id, track);

    return (
      <section className="nav">
        <div className="nav"/>
        <Progress />
        <nav>
          <a href="#" className="toggle" role="button" onClick={preventDefault}/>
          <div className="social">
            <a title="LinkedIn: Fox Zero™" href="https://www.linkedin.com/company/fox-zero" target="_blank">
              <i className="fa fa-linkedin-square"/>
            </a>
            <a title="GitHub: Fox Zero™" href="https://www.github.com/fox-zero" target="_blank">
              <i className="fa fa-github"/>
            </a>
            <a title="Facebook: @fox.zero.agency" href="https://www.facebook.com/fox.zero.agency" target="_blank">
              <i className="fa fa-facebook-official"/>
            </a>
            <a title="Twitter: @fox_zero_agency" href="https://twitter.com/fox_zero_agency" target="_blank">
              <i className="fa fa-twitter"/>
            </a>
            <a title="Instagram: @fox_zero_agency" href="https://www.instagram.com/fox_zero_agency" target="_blank">
              <i className="fa fa-instagram"/>
            </a>
          </div>
          <ul data-copyright={`© ${(new Date()).getFullYear()} · Fox Zero · A VitruvianTech Brand`}>
            <li className="home">
              <Link rel="nofollow" to="/" className="logo" onClick={update(DEFAULT_ID, true)}/>
            </li>
            <li className="subnav">
              <a href="#" onClick={preventDefault}><i className="fa fa-cubes"/> Services</a>
              <ul>
                <li><Link rel="nofollow" to="/home/consulting" onClick={update(solutions[0].slug, true)}><i className="fa fa-lightbulb-o"/> Consulting</Link></li>
                <li><Link rel="nofollow" to="/home/development" onClick={update(solutions[1].slug, true)}><i className="fa fa-wrench"/> Development</Link></li>
                <li><Link rel="nofollow" to="/home/maintenance" onClick={update(solutions[7].slug, true)}><i className="fa fa-heartbeat"/> Maintenance</Link></li>
              </ul>
            </li>
            <li className="subnav">
              <a href="#" onClick={preventDefault}><i className="fa fa-certificate"/> Experience</a>
              <ul>
                <li><Link rel="nofollow" to="/home/strategy" onClick={update(solutions[2].slug, true)}><i className="fa fa-fighter-jet"/> Strategy</Link></li>
                <li><Link rel="nofollow" to="/home/portfolio" onClick={update(solutions[3].slug, true)}><i className="fa fa-bullseye"/> Portfolio</Link></li>
              </ul>
            </li>
            <li className="subnav">
              <a href="#" onClick={preventDefault}><i className="fa fa-usd"/> Pricing</a>
              <ul>
                <li><Link rel="nofollow" to="/home/warranty" onClick={update(solutions[4].slug, true)}><i className="fa fa-umbrella"/> Warranty</Link></li>
                <li><Link rel="nofollow" to="/home/subscription" onClick={update(solutions[5].slug, true)}><i className="fa fa-refresh"/> Subscription</Link></li>
                <li><Link rel="nofollow" to="/home/on-demand" onClick={update(solutions[6].slug, true)}><i className="fa fa-power-off"/> On Demand</Link></li>
              </ul>
            </li>
            <li className="subnav">
              <a href="#" onClick={preventDefault}><i className="fa fa-info-circle"/> Support</a>
              <ul>
                <li><Link to="/contact" onClick={update('contact', true)}><i className="fa fa-envelope"/> Contact Us</Link></li>
                <li><Link to="/about" onClick={update('about')}><i className="fa fa-id-card-o"/> About Us</Link></li>
                <li><Link to="/privacy" onClick={update('privacy')}><i className="fa fa-legal"/> Privacy Policy</Link></li>
              </ul>
            </li>
            <li>
              <Link to="/stream/music/music-tech-steven-tyler-collision-nola/5/4/2018" onClick={update('stream')}>
                <i className="fa fa-television"/> Fox Zero™ TV
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    );
  }
}
