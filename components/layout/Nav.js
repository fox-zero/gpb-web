import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Nav} from '@boilerplatejs/core/components/layout';
import {Progress} from '@boilerplatejs/core/components/layout';
import {load, dismiss} from '@fox-zero/gpb-web/actions/Nav';
import {transition} from '@boilerplatejs/core/actions/Transition';

@connect(state => ({section: state.router.params.section}), {load, dismiss, transition})

export default class extends Nav {
  static propTypes = {
    load: PropTypes.func.isRequired,
    transition: PropTypes.func.isRequired,
    dismiss: PropTypes.func.isRequired,
    section: PropTypes.string
  };

  componentDidMount = () => this.props.load();

  render() {
    const preventDefault = e => e.preventDefault();

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
            <li>
              <Link to="/post/wheel-of-the-people">
                <i className="fa fa-pie-chart"/> Wheel of the People
              </Link>
            </li>
            {/* <li>
              <Link to="/contact"><i className="fa fa-envelope"/> Contact Us</Link>
            </li> */}
          </ul>
        </nav>
      </section>
    );
  }
}
