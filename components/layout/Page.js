import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import NukaCarousel from 'nuka-carousel';
import {Page} from '@boilerplatejs/core/components/layout';
import {transition} from '@boilerplatejs/core/actions/Transition';
import {dismiss} from '@fox-zero/gpb-web/actions/Nav';
import {Footer} from '@fox-zero/gpb-web/components/layout';

@connect(state => {
  const { header = 0, slide = 0 } = state['@boilerplatejs/core'].Transition;
  return { header, slide };
}, {transition, dismiss})

export default class extends Page {
  static propTypes = {
    transition: PropTypes.func.isRequired,
    dismiss: PropTypes.func.isRequired,
    header: PropTypes.number.isRequired,
    slide: PropTypes.number.isRequired
  };

  componentDidMount = () => document.querySelector('#app > section > .page').addEventListener('click', this.props.dismiss);

  componentWillMount = () => this.transition('slide', 0);

  componentWillUnmount = () => document.querySelector('#app > section > .page').removeEventListener('click', this.props.dismiss);

  transition = (type, index) => this.props[type] === index ? Promise.resolve() : this.props.transition({ [type]: index });

  afterSlide = header => this.transition('slide', 0).then(() => this.transition('header', header));

  render() {
    const { sections, headers, header } = this.props;
    const single = headers.length === 1;

    return (
      <Page {...this.props}>
        {headers.length ? (
          <section className={`${single ? 'single' : ''} header container`}>
            {single ? headers : (
              <NukaCarousel
                initialSlideWidth={2000}
                afterSlide={this.afterSlide}
                slideIndex={header}>
                {headers}
              </NukaCarousel>
            )}
          </section>
        ) : <span/>}
        <section className="section container">
          {sections}
        </section>
        <Footer/>
      </Page>
    );
  }
}
