import React from 'react';
import {Section} from '@boilerplatejs/core/components/layout';

export default class extends Section {
  render() {
    return (
      <Section className="error">
        <h2>Page Not Found</h2>
        <h3>Do You Even Web Surf?</h3>
      </Section>
    );
  }
}
