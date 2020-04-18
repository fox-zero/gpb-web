import React from 'react';
import {Header} from '@fox-zero/gpb-web/components/layout';
import {brand} from '@fox-zero/gpb-web/data';

export default class extends Header {
  render() {
    return (
      <Header timer={0}
        runOnMount={__CLIENT__}
        images={['https://s3.amazonaws.com/content.foxzero.io/2333b821b9104bb2ac0d62e38d7dbb97.jpg']}>
        <div className="content" >
          <h1>About Us</h1>
          <h2>Welcome!</h2>
          <section className="preview">
          <p>{brand.summary}</p>
          </section>
        </div>
      </Header>
    );
  }
}
