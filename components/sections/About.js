import React from 'react';
import {Section} from '@boilerplatejs/core/components/layout';
import {brand} from '@fox-zero/gpb-web/data';

export default class extends Section {
  render() {
    return (
      <Section>
        <h2>About Us</h2>
        <h3>Welcome!</h3>
        <div className="container">
          <div className="row">
            <div className="col-md-12 card">
              <p><span>{brand.summary}</span></p>
            </div>
          </div>
        </div>
      </Section>
    );
  }
}
