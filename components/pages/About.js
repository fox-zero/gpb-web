import React from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {Page} from '@boilerplatejs/core/components/layout';
import {dismiss} from '@fox-zero/gpb-web/actions/Nav';
// import {Footer} from '@fox-zero/gpb-web/components/layout';

@connect(() => ({}), {dismiss})

export default class extends Page {
  static propTypes = {
    dismiss: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: 'about home'
  };

  componentDidMount = () => {
    document.querySelector('#app > section > .page').addEventListener('click', this.props.dismiss);
  }

  componentWillUnmount = () => {
    document.querySelector('#app > section > .page').removeEventListener('click', this.props.dismiss);
  }

  render() {
    const { sections, headers } = this.props;

    return (
      <Page {...this.props}>
        <section className="section container">
          <section className="single header container">
            {headers[0]}
          </section>
          {sections}
          {/* <Footer/> */}
        </section>
      </Page>
    );
  }
}
