import React from 'react';
import {Section} from '@fox-zero/gpb-web/components/layout';
import {solutions} from '@fox-zero/gpb-web/data';

export default class extends Section {
  render() {
    return <Section solution={solutions[1]} title={<>Full Service<br />Digital Agency</>} right />;
  }
}
