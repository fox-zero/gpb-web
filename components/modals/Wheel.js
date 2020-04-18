import React, {Fragment} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Modal} from '@fox-zero/gpb-web/components/layout';
import * as analytics from '@fox-zero/gpb-web/lib/analytics';

@connect(state => ({}), {})
export default class extends Modal {
  static defaultProps = {
    onHide: () => {}
  };

  state = {};

  componentDidUpdate(props) {
    const { solution: { wheelName, sources } } = this.props;

    if (wheelName && props.solution.wheelName !== wheelName) {
      analytics.Section.Detail.Impression.track(wheelName, sources);
    }
  }

  onHide = (...args) => {
    this.props.onHide.apply(this, args);
  };

  render() {
    const { solution: wheel } = this.props;
    const { wheelName, slug, summary, title, subject, wheelIcon = 'pie-chart', wheelBackgroundImage = {} } = wheel;
    const { location = {} } = global;
    const share = {
      url: `${location.protocol}//${location.host}/${(slug || '').toLowerCase()}`,
      caption: summary,
      subject: wheelName ? `${wheelName} · ${subject || title}` : subject || title,
      hashtags: ['smm2', 'nintendo', 'redbull', 'speedrun']
    };

    return (
      <Modal {..._.omit(this.props, ['update', 'solution', 'create', 'destroy', 'check', 'recaptchaSiteKey', 'contact'])}
        onHide={this.onHide}
        className={`solution`}
        title={wheelName}
        dek={title}
        icon={wheelIcon}
        share={share}
        hero={wheelBackgroundImage.url}>
        {wheelName && <section className="content">
          
        </section>}
      </Modal>
    );
  }
}
