import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Script, Link, MetaTag} = getModels();

    const NAME = 'Fox Zero™';
    const TITLE = 'High-Performance/Zero-Latency Consultancy™';
    const DESCRIPTION = 'Our software consulting and digital agency services combine zero-latency development tactics with versatile talent as simple monthly subscriptions to enhance project accuracy and morale, reducing complexity and waste.';
    const IMAGE = 'https://d3w33imimg0eu8.cloudfront.net/images/logo.png';

    await Link.update({
      href: 'https://d3w33imimg0eu8.cloudfront.net/images/Icon.png'
    }, {
      where: { rel: 'shortcut icon' }
    });

    await Script.create({
      external: false,
      content: '(new Image()).src="https://d3w33imimg0eu8.cloudfront.net/images/loading-beat.gif"'
    });

    await MetaTag.update({
      content: 'Fox Zero, fox_zero_agency, VitruvianTech, Vitruvian Tech, Vitruvian Technology, NYC, New York, full service, digital agency, consulting agency, consultancy, software consulting, software development, Wingman, agile, ux design, seo marketing, scrum, FAST PLM, OODA loop, subscription, project management, innovation, web app, foxzero.io, fox-zero, Peter C. Romano'
    }, {
      where: { value: 'keywords' }
    });

    await MetaTag.update({
      content: DESCRIPTION
    }, {
      where: { value: 'description', key: 'name' }
    });

    await MetaTag.update({
      content: `${NAME} · ${TITLE}`
    }, {
      where: { value: 'name', key: 'itemprop' }
    });

    await MetaTag.update({
      content: DESCRIPTION
    }, {
      where: { value: 'description', key: 'itemprop' }
    });

    await MetaTag.update({
      content: NAME
    }, {
      where: { value: 'og:site_name' }
    });

    await MetaTag.create({
      content: '564908557483666',
      key: 'property',
      value: 'fb:app_id'
    });

    await MetaTag.update({
      content: TITLE
    }, {
      where: { value: 'og:title' }
    });

    await MetaTag.update({
      content: DESCRIPTION
    }, {
      where: { value: 'og:description' }
    });

    await MetaTag.update({
      content: '@fox.zero.agency'
    }, {
      where: { value: 'og:site' }
    });

    await MetaTag.update({
      content: '@fox.zero.agency'
    }, {
      where: { value: 'og:creator' }
    });

    await MetaTag.update({
      content: IMAGE
    }, {
      where: { value: 'og:image' }
    });

    await MetaTag.update({
      content: IMAGE
    }, {
      where: { value: 'og:image:secure_url' }
    });

    await MetaTag.update({
      content: '320'
    }, {
      where: { value: 'og:image:width' }
    });

    await MetaTag.update({
      content: '320'
    }, {
      where: { value: 'og:image:height' }
    });

    await MetaTag.update({
      content: '@fox_zero_agency'
    }, {
      where: { value: 'twitter:site' }
    });

    await MetaTag.update({
      content: '@fox_zero_agency'
    }, {
      where: { value: 'twitter:creator' }
    });

    await MetaTag.update({
      content: TITLE
    }, {
      where: { value: 'twitter:title' }
    });

    await MetaTag.update({
      content: DESCRIPTION
    }, {
      where: { value: 'twitter:description' }
    });

    await MetaTag.update({
      content: IMAGE
    }, {
      where: { value: 'twitter:image' }
    });

    await MetaTag.update({
      content: TITLE
    }, {
      where: { value: 'twitter:image:alt' }
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
