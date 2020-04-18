import React, {Fragment} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {ShareButtons} from 'react-share';
import {update} from '@boilerplatejs/hubspot/actions/Contact';
import {check} from '@boilerplatejs/core/actions/Verification';
import {create, destroy} from '@fox-zero/gpb-web/actions/Contact';
import {Contact} from '@fox-zero/gpb-web/components/forms';
import {Modal} from '@fox-zero/gpb-web/components/layout';
import * as components from '@fox-zero/gpb-web/components';
import * as analytics from '@fox-zero/gpb-web/lib/analytics';

const {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton
} = ShareButtons;

const VERIFY_ACTION = 'form_detail_submission';
const VERIFY_GRADE = 0.65;

@connect(state => ({
  contact: state['@fox-zero/gpb-web'].Contact.current,
  recaptchaSiteKey: state['@boilerplatejs/core'].Config['@boilerplatejs/core'].recaptchaSiteKey
}), {update, create, destroy, check})
export default class extends Modal {
  static defaultProps = {
    onHide: () => {},
    contact: null
  };

  state = {
    form: {
      message: null,
      status: null
    }
  };

  componentDidUpdate(props) {
    const { solution: { slug, section = ' Home', sources } } = this.props;

    if (slug && props.solution.slug !== slug) {
      analytics.Section.Detail.Impression.track(section, sources);
    }
  }

  onHide = (...args) => {
    this.props.onHide.apply(this, args);
    this.setState({ form: { message: null } });
  };

  submit = values => {
    const { update, solution, create, recaptchaSiteKey, check } = this.props;
    const { section = 'Home', sources } = solution;
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
        const tracking = analytics.Form.Detail.Submission.track(section, sources);

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
            section,
            application: 'Fox Zero™ Marketing App',
            tracking
          }
        });

        create(contact);
        this.setState({ form: { message: null, status: null } });
        analytics.Form.Detail.Success.track(section, sources);
        analytics.Confirmation.Detail.Impression.track(section, sources);
      } catch (e) {
        const { message, status, code, errorCode, name } = e;
        this.setState({ form: { message, status: null } });
        analytics.Form.Detail.Failure.track([section].concat(name || []).concat(status || code || errorCode || []).join(','), sources);
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

  formatCalendarParams = ({ email, firstname, lastname, company = { value: '' }, message = { value: '' } }) => {
    const e = encodeURIComponent;
    return `email=${e(email.value)}&name=${e([firstname.value, lastname.value].join(' '))}&a1=${e(company.value)}&a2=${e(message.value)}`;
  };

  onShare = (source, { email, shares }) => async () => {
    const { update, create, contact, solution: { section = 'Home', sources } } = this.props;
    const updated = await update({ lead: true, newsletter: true, properties: { email: email.value, shares: [shares ? shares.value : []].concat(source).join(';') } });
    contact && create(updated);
    analytics.Confirmation.Detail.Share.track([section, source].join(','), sources);
  };

  render() {
    const { solution, contact, destroy: reset } = this.props;
    const { message, status } = this.state.form;
    const { slug, content = [], summary, title, subject, icon, section, media = [], sources } = solution;
    const { location = {} } = global;
    const [hero = {}] = media;
    const share = {
      url: `${location.protocol}//${location.host}/${(slug || '').toLowerCase()}`,
      caption: summary,
      subject: section ? `${section} · ${subject || title}` : subject || title,
      hashtags: ['software', 'agency', (section || 'consulting').toLowerCase()]
    };

    return (
      <Modal {..._.omit(this.props, ['update', 'solution', 'create', 'destroy', 'check', 'recaptchaSiteKey', 'contact'])}
        onHide={this.onHide}
        className={`solution ${slug ? '' : 'contact'}`}
        title={title}
        dek={section}
        icon={icon}
        share={share}
        hero={hero.url}>
        {section && <section>
          <section className="content">
            {content.map((content, i) => {
              const Component = content.type === 'component' && _.get(components, content.value);

              return <Fragment key={`detail-content-${i}`}>
                {Component && <Component />}
                {content.type === 'paragraph' && <p>{content.copy}</p>}
                {content.type === 'image' && <img src={content.media[0].url} />}
              </Fragment>
            })}
          </section>
          <section className="quote">
            <div>
              <h2>Talk to Me</h2>
              <h3>{contact ? <>Get it on<br />the Calendar!</> : <>Book a Free<br />Consultation!</>}</h3>
              <p>Our services can accelerate and enhance your software projects. Use the form (<i className="fa color-primary-green fa-hand-o-down" />) to get started with a free 30 minute call with a senior partner.</p>
            </div>
            <div className={`form ${contact ? 'success' : ''}`}>
              <div>
                <div>
                  {contact && <>
                    <h4>Schedule a Call</h4>
                    <p>Hey <strong>{contact.firstname.value}</strong>, thanks for contacting us! You can use the button below to schedule an appointment for your consultation call. We look forward to chatting with you!</p>
                    <button className="btn btn-success" onClick={() => analytics.Confirmation.Detail.Booking.track(section || 'Home', sources)}>
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
                  {contact && <div className="share">
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
                  </div>}
                  <br />
                  <br />
                  <button className="btn btn-success" onClick={() => { reset(); analytics.Confirmation.Detail.Reset.track(section || 'Home', sources); }}>Reset Form</button>
                </div>
              </div>
              <Contact status={status} quote cancelText="Close" onCancel={this.onHide} newsletterText="Subscribe to Fox Zero™ TV emails for project management tips, industry trends,  free-to-use software, and more." onSubmit={this.submit}/>
              {!contact && message && <span className="error">{message}</span>}
              {!contact && <span className="legal">This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank">Terms of Service</a> apply.</span>}
            </div>
          </section>
        </section>}
      </Modal>
    );
  }
}
