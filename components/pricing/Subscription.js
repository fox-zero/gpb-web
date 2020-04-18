import React, {Component} from 'react';

export default class extends Component {
  render() {
    return <>
      <div className="subscription container">
        <div className="row">
          <div className="col-md-4">
            <div className="plan">
              <div>
                <h4>Fox<br />One</h4>
              </div>
              <div>
                <span className="price">$35k<sub>/mo.</sub></span>
                <ul>
                  <li><i className="fa fa-lightbulb-o" /> Consulting</li>
                  <li><i className="fa fa-unlock" /> No commitment</li>
                  <li><i className="fa fa-user" /> 1.5 Partners</li>
                </ul>
              </div>
            </div>
            <hr />
          </div>
          <div className="col-md-4">
            <div className="plan">
              <div>
                <h4>Fox<br />Two</h4>
              </div>
              <div>
                <span className="price">$75k<sub>/mo.</sub></span>
                <ul>
                  <li><i className="fa fa-wrench" /> Development</li>
                  <li><i className="fa fa-umbrella" /> Wingman™ warranty</li>
                  <li><i className="fa fa-lock" /> 1-3 mo. commitment</li>
                  <li><i className="fa fa-user" /> 2 Partners</li>
                  <li><i className="fa fa-user-plus" /> 1 Associate</li>
                </ul>
              </div>
            </div>
            <hr />
          </div>
          <div className="col-md-4">
            <div className="plan">
              <div>
                <h4>Fox<br />Three</h4>
              </div>
              <div>
                <span className="price">$145k<sub>/mo.</sub></span>
                <ul>
                  <li><i className="fa fa-wrench" /> Development</li>
                  <li><i className="fa fa-umbrella" /> Wingman™ warranty</li>
                  <li><i className="fa fa-lock" /> 1-3 mo. commitment</li>
                  <li><i className="fa fa-user" /> 3 Partners</li>
                  <li><i className="fa fa-user-plus" /> 3 Associates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <p><small>Plans can be additive. Additional ad-hoc partners, associates, and interns are available at no monthly commitment at respective day rates. Remaining last month balance refunded upon project acceptance or cancellation.</small></p>
    </>;
  }
}
