import React from 'react';
import {Section} from '@fox-zero/gpb-web/components/layout';
import {Subscription} from '@fox-zero/gpb-web/components/pricing';
import {solutions} from '@fox-zero/gpb-web/data';

export default class extends Section {
  render() {
    return (
      <Section solution={solutions[5]} title={<>Velocity™<br />Plan Pricing</>} right>
        <Subscription />
        <p>Click below to learn more or contact us about our subscription model.</p>
      </Section>
    );
  }
}
