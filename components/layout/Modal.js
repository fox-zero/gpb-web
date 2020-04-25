import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Modal from 'react-bootstrap-modal';
import {ShareButtons} from 'react-share';
import _ from 'lodash';

const {
  FacebookShareButton,
  TwitterShareButton
} = ShareButtons;

export default class extends Component {
  static propTypes = {
    onHide: PropTypes.func,
    children: PropTypes.object,
    className: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string,
    share: PropTypes.object,
    hero: PropTypes.string
  };

  static defaultProps = {
    onHide: () => {},
    className: '',
    share: {}
  };

  state = {
    ready: false
  };

  componentWillReceiveProps(next) {
    if (next.hero !== this.props.hero) {
      this.setState({ ready: false });
      global.setTimeout(() => this.setState({ ready: true }), 250);
    }
  }

  render() {
    const { id, children, title, dek, icon, className, share = {}, hero } = this.props;
    const { ready } = this.state;
    const { url, caption, subject, hashtags } = share;

    return (
      <Modal {..._.omit(this.props, ['share', 'title', 'icon', 'hero'])} className={`${className} ${ready ? 'ready' : ''}`} title="" id={id}>
        {hero ? <div className="modal-hero" style={{ backgroundImage: `url(${hero})` }} /> : <></>}
        <div className="modal-nav">
          <Modal.Dismiss className="dismiss">
            <i className="fa fa-arrow-circle-left"></i>
          </Modal.Dismiss>
          {url && <div className="share">
            <FacebookShareButton url={url} quote={caption} hashtag={hashtags.map(tag => `#${tag}`).join(',')}>
              <i className="fa fa-facebook-official"/>
            </FacebookShareButton>
            <TwitterShareButton url={url} title={caption} hashtags={share.hashtags} related="@grandpoobear">
              <i className="fa fa-twitter"/>
            </TwitterShareButton>
          </div>}
        </div>
        <div className="powered-by">
          <span>Powered by</span>
          <span>
            <img src="https://d3w33imimg0eu8.cloudfront.net/images/logo.png" alt="Fox Zero™ · Zero Latency Software Consultancy™" />
            {/* <i className="fa fa-plus"></i>
            <img src="https://s3-us-west-2.amazonaws.com/content-gpb.foxzero.io/assets/images/redbull.png" /> */}
          </span>
        </div>
        <Modal.Header>
          {title && <Modal.Title>
            {icon && <div data-dek={dek}><i className={`fa fa-${icon}`}></i></div>}<span>{title}</span>
          </Modal.Title>}
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <span>&copy; {(new Date()).getFullYear()} · Grand POOBear · Powered by <a href="https://foxzero.io">Fox Zero™</a></span>
        </Modal.Footer>
      </Modal>
    );
  }
}