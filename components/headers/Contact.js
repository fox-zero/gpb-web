import React from 'react';
import {Header} from '@fox-zero/gpb-web/components/layout';

export default class extends Header {
  render() {
    return (
      <Header timer={0}
        runOnMount={__CLIENT__}
        images={['https://d3w33imimg0eu8.cloudfront.net/images/new-york-3.png']}>
        <div className="content" >
          <h1>Contact Us</h1>
          <h2>Welcome!</h2>
          <section className="preview">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec dictum lacus, et dictum ex. Proin nec semper turpis, vel tincidunt lacus. Nulla at aliquet felis. Curabitur ac posuere felis.</p>
          </section>
        </div>
      </Header>
    );
  }
}
