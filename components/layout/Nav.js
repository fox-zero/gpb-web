import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Nav} from '@boilerplatejs/core/components/layout';
import {Progress} from '@boilerplatejs/core/components/layout';
import {load, dismiss} from '@fox-zero/gpb-web/actions/Nav';
import {transition} from '@boilerplatejs/core/actions/Transition';

const HEADER_TIMER = 15;

const SETTINGS_DEFAULT = {
  fullscreen: false,
  cycle: true
};

@connect(state => ({}), {load, dismiss, transition})

export default class extends Nav {
  static propTypes = {
    load: PropTypes.func.isRequired,
    transition: PropTypes.func.isRequired,
    dismiss: PropTypes.func.isRequired
  };

  state = {
    settings: __CLIENT__ ? JSON.parse(global.localStorage.getItem('settings') || JSON.stringify(SETTINGS_DEFAULT)) : SETTINGS_DEFAULT
  };

  componentDidMount = () => this.props.load();

  save = settings => {
    global.localStorage.setItem('settings', JSON.stringify(_.omit(settings, ['fullscreen'])));
  }

  toggleCycle = async () => {
    const cycle = !this.state.settings.cycle;
    const settings = { ...this.state.settings, cycle };

    this.props.transition('timer', cycle ? HEADER_TIMER : 0);
    this.setState({ settings });
    this.save(settings);
  };

  toggleFullscreen = async () => {
    const fullscreen = !this.state.settings.fullscreen;

    try {
      if (fullscreen) {
        await document.body.requestFullscreen();
        global.isFullScreen = true;
      } else {
        await document.exitFullscreen();
        global.isFullScreen = false;
      }

      this.setState({ settings: { ...this.state.settings, fullscreen } });
      document.body.classList[global.isFullScreen ? 'add' : 'remove']('fullscreen');
    } catch (e) {}
  };

  render() {
    const preventDefault = e => e.preventDefault();
    const { fullscreen, cycle } = this.state.settings;

    return (
      <section className="nav">
        <div className="nav"/>
        <Progress />
        <nav>
          <a href="#" className="toggle" role="button" onClick={preventDefault}/>
          <div className="social">
            <a title="Twitch: @GrandPOObear" href="https://www.twitch.tv/grandpoobear" target="_blank">
              <i className="fa fa-twitch"/>
            </a>
            <a title="YouTube: Grand POOBear" href="https://www.youtube.com/channel/UC3g50Yr3GFPYrBj-n55BdqA" target="_blank">
              <i className="fa fa-youtube"/>
            </a>
            <a title="Instagram: @grandpoobear" href="https://www.instagram.com/grandpoobear" target="_blank">
              <i className="fa fa-instagram"/>
            </a>
            <a title="Facebook: @grandpoobear" href="https://www.facebook.com/grandpoobear" target="_blank">
              <i className="fa fa-facebook-official"/>
            </a>
            <a title="Twitter: @GrandPOObear" href="https://twitter.com/GrandPOOBear" target="_blank">
              <i className="fa fa-twitter"/>
            </a>
          </div>
          <ul data-copyright={`© ${(new Date()).getFullYear()} · Grand POOBear`}>
            <li className="home">
              <Link rel="nofollow" to="/" className="logo"/>
            </li>
            {/* <li>
              <Link to="/post/wheel-of-the-people">
                <i className="fa fa-pie-chart"/> Wheel of the People
              </Link>
            </li>
            <li>
              <Link to="/contact"><i className="fa fa-envelope"/> Contact Us</Link>
            </li> */}
            {__CLIENT__ && <li className="settings subnav">
              <a href="#" onClick={preventDefault}><i className="fa fa-cog"/> Settings</a>
              <ul>
                <li className="fullscreen" onClick={this.toggleFullscreen} title="Activate full-screen mode.">
                  <i className={`fa fa-toggle-on ${fullscreen ? 'on' : 'off'}`} /> Enable Full Screen
                </li>
                <li onClick={this.toggleCycle} title="Cycle through wheel descriptions in the main page automatically.">
                  <i className={`fa fa-toggle-on ${cycle ? 'on' : 'off'}`} /> Auto-Cycle Wheels
                </li>
              </ul>
            </li>}
          </ul>
        </nav>
      </section>
    );
  }
}
