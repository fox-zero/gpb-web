import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {ShareButtons} from 'react-share';
import {check} from '@boilerplatejs/core/actions/Verification';
import {create, destroy} from '@fox-zero/gpb-web/actions/Contact';
import {update} from '@boilerplatejs/hubspot/actions/Contact';
import * as forms from '@fox-zero/gpb-web/components/forms';
import * as analytics from '@fox-zero/gpb-web/lib/analytics';
import {brand} from '@fox-zero/gpb-web/data';
import {Section} from '@boilerplatejs/core/components/layout';

const {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton
} = ShareButtons;

const VERIFY_ACTION = 'form_page_submission';
const VERIFY_GRADE = 0.65;

@connect(state => {
  return ({
    contact: state['@fox-zero/gpb-web'].Contact.current,
    sources: state['@boilerplatejs/core'].Transition['analytics.sources'],
    recaptchaSiteKey: state['@boilerplatejs/core'].Config['@boilerplatejs/core'].recaptchaSiteKey
  });
}, {update, create, destroy, check})

export default class extends Section {
  static propTypes = {
    update: PropTypes.func.isRequired,
    check: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    destroy: PropTypes.func.isRequired,
    contact: PropTypes.object,
    recaptchaSiteKey: PropTypes.any,
    sources: PropTypes.any
  };

  state = {
    form: {
      message: null,
      status: null
    }
  };

  formatCalendarParams = ({ email, firstname, lastname, company = { value: '' }, message = { value: '' } }) => {
    const e = encodeURIComponent;
    return `email=${e(email.value)}&name=${e([firstname.value, lastname.value].join(' '))}&a1=${e(company.value)}&a2=${e(message.value)}`;
  };

  onShare = (source, { email, shares }) => async () => {
    const { update, create, contact, sources } = this.props;
    const updated = await update({ lead: true, newsletter: true, properties: { email: email.value, shares: [shares ? shares.value : []].concat(source).join(';') } });
    contact && create(updated);
    analytics.Confirmation.Contact.Share.track(source, sources);
  };

  renderShare = ({ slug, summary, title, subject, section }) => {
    const { contact } = this.props;
    const share = {
      url: `${location.protocol}//${location.host}/${(slug || '').toLowerCase()}`,
      caption: summary,
      subject: section ? `${section} · ${subject || title}` : subject || title,
      hashtags: ['software', 'agency', (section || 'consulting').toLowerCase()]
    };

    return <div className="share">
      <LinkedinShareButton url={share.url} title={subject || title} source="Fox Zero™" summary={share.caption} onShareWindowClose={this.onShare('linkedin', contact)}>
        <i className="fa fa-linkedin-square"/>
      </LinkedinShareButton>
      <FacebookShareButton url={share.url} quote={share.caption} hashtag={share.hashtags.map(tag => `#${tag}`).join(' ')} onShareWindowClose={this.onShare('facebook', contact)}>
        <i className="fa fa-facebook-official"/>
      </FacebookShareButton>
      <TwitterShareButton url={share.url} title={share.caption} hashtags={share.hashtags} related="@fox_zero_agency" onShareWindowClose={this.onShare('twitter', contact)}>
        <i className="fa fa-twitter"/>
      </TwitterShareButton>
      <EmailShareButton url={share.url} subject={`Fox Zero™ · ${share.subject}`} body={`${share.caption}\n\nRead More: ${share.url}\n\n`} onShareWindowClose={this.onShare('email', contact)}>
        <i className="fa fa-envelope"/>
      </EmailShareButton>
    </div>;
  };

  submit = values => {
    const { update, create, sources, recaptchaSiteKey, check } = this.props;
    const { email } = values;

    const submit = async () => {
      try {
        const { score } = recaptchaSiteKey ? await grecaptcha.execute(recaptchaSiteKey, { action: VERIFY_ACTION }).then(token => check(token, VERIFY_ACTION)) : {};

        if (score && score < VERIFY_GRADE) {
          let e = new Error('Unauthorized submission reported by bot verification check.');
          e.name = 'Verification';
          e.code = 403;
          throw e;
        }

        this.setState({ form: { message: null, status: 'Submitting' } });
        const tracking = analytics.Form.Contact.Submission.track(null, sources);

        const contact = await update({
          lead: true,
          newsletter: !(values.newsletter === false),
          properties: {
            email,
            message: values.comment,
            firstname: values.firstName,
            lastname: values.lastName,
            phone: values.phone,
            company: values.company,
            section: 'Contact',
            application: 'Fox Zero™ Marketing App',
            tracking
          }
        });

        create(contact);
        this.setState({ form: { message: null, status: null } });
        analytics.Form.Contact.Success.track(null, sources);
        analytics.Confirmation.Contact.Impression.track(null, sources);
      } catch (e) {
        const { message, status, code, errorCode, name } = e;
        this.setState({ form: { message, status: null } });
        analytics.Form.Contact.Failure.track([].concat(name || []).concat(status || code || errorCode || []).join(','), sources);
      }
    };

    if (email) {
      if (recaptchaSiteKey) {
        this.setState({ form: { message: null, status: 'Verifying' } });
        grecaptcha.ready(submit);
      } else {
        submit();
      }
    }
  };

  render() {
    const { contact, destroy: reset, sources } = this.props;
    const { message, status } = this.state.form;

    return (
      <Section>
        <h2>Contact Us</h2>
        <h3>Welcome!</h3>
        <div className="container">
          <div className="row">
            <div className="col-md-12 card">
              <p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec dictum lacus, et dictum ex. Proin nec semper turpis, vel tincidunt lacus. Nulla at aliquet felis. Curabitur ac posuere felis.</span></p>
            </div>
          </div>
        </div>
        <section className="quote section">
          <h2>Talk to Me</h2>
          <h3>{contact ? <>Get it on<br />the Calendar!</> : <>Book a Free<br />Consultation!</>}</h3>
          <p>Our services can accelerate and enhance your software projects. Use the form (<i className="fa color-primary-green fa-hand-o-down" />) to get started with a free 30 minute call with a senior partner.</p>
          <div className={`form ${contact ? 'success' : ''}`}>
            <div>
              <div>
                {contact && <>
                  <h4>Schedule a Call</h4>
                  <p>Hey <strong>{contact.firstname.value}</strong>, thanks for contacting us! You can use the button below to schedule an appointment for your consultation call. We look forward to chatting with you!</p>
                  <button className="btn btn-success" onClick={() => analytics.Confirmation.Contact.Booking.track(null, sources)}>
                    <a href={`https://calendly.com/fox-zero/consultation?${this.formatCalendarParams(contact)}`} target="_blank">Book Now</a>
                    <i className="fa fa-link" />
                  </button>
                </>}
                <br />
                <br />
                <h4>Spread the Word</h4>
                <p>Shout-outs can get you a <strong>5% discount</strong>!</p>
                <ul>
                  <li>Use the buttons below to share us.</li>
                  <li>20 aggregate "likes" discounts 2.5%.</li>
                  <li>10 aggregate comments discounts 2.5%.</li>
                  <li><small><i>Shout-Out Discount</i> applies to all subscription plans for the first 6 billing cycles.</small></li>
                </ul>
                {contact && this.renderShare(brand)}
                <br />
                <br />
                <button className="btn btn-success" onClick={() => { reset(); analytics.Confirmation.Contact.Reset.track(null, sources); }}>Reset Form</button>
              </div>
            </div>
            <forms.Contact status={status} quote newsletterText="Subscribe to Fox Zero™ TV emails for project management tips, industry trends,  free-to-use software, and more." onSubmit={this.submit}/>
            {!contact && message && <span className="error">{message}</span>}
            {!contact && <span className="legal">This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank">Terms of Service</a> apply.</span>}
          </div>
        </section>
      </Section>
    );
  }
}
