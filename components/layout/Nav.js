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
