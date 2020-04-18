import React from 'react';
import {Header} from '@fox-zero/gpb-web/components/layout';

export default class extends Header {
  render() {
    return (
      <Header timer={0}
        runOnMount={__CLIENT__}
        images={['https://s3.amazonaws.com/content.foxzero.io/2333b821b9104bb2ac0d62e38d7dbb97.jpg']}>
        <div className="content" >
          <h1>Privacy Policy</h1>
          <h2>Welcome!</h2>
          <section className="preview">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec dictum lacus, et dictum ex. Proin nec semper turpis, vel tincidunt lacus. Nulla at aliquet felis. Curabitur ac posuere felis.</p>
          </section>
        </div>
      </Header>
    );
  }
}
