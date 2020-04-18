import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

export default class extends Component {
  static propTypes = {
    children: PropTypes.any,
    icon: PropTypes.string,
    className: PropTypes.string,
    tooltip: PropTypes.string,
    transition: PropTypes.object,
    onClick: PropTypes.func
  };

  static defaultProps = {
    onClick: () => {},
    className: '',
    tooltip: ''
  };

  state = {
    style: {}
  };

  componentWillMount() {
    const { transition } = this.props;
    transition && this.setState({ style: transition.from });
  }

  componentDidMount() {
    const { transition } = this.props;
    transition && setTimeout(() => this.setState({ style: transition.to }), transition.delay);
  }

  render() {
    const { icon, onClick, className, children, tooltip } = this.props;
    const { style } = this.state;

    return (
      <div className={`solution button ${className}`} style={style} onClick={onClick}>
        {icon && <i className={`fa fa-${icon}`}></i>}
        <button title={tooltip}>
          <span>{children}</span>
        </button>
      </div>
    );
  }
}
