import React from 'react';
import {Section} from '@fox-zero/gpb-web/components/layout';
import {solutions} from '@fox-zero/gpb-web/data';

export default class extends Section {
  render() {
    return <Section solution={solutions[7]} title={<>Hosting, LTS,<br />Monitoring</>} right />;
  }
}
