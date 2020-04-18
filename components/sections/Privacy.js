import React from 'react';
import {Section} from '@boilerplatejs/core/components/layout';

export default class extends Section {
  render() {
    return (
      <Section>
        <h2>Privacy Policy</h2>
        <h3>Welcome!</h3>
        <div className="container">
          <div className="row">
            <div className="col-md-12 card">
              <p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec dictum lacus, et dictum ex. Proin nec semper turpis, vel tincidunt lacus. Nulla at aliquet felis. Curabitur ac posuere felis.</span></p>
            </div>
          </div>
        </div>
      </Section>
    );
  }
}
