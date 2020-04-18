import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.update({
      content: 'FoxZero™, fox_zero_media, digital media, digital agency, media agency, FoxZero Media, VitruvianTech, Vitruvian Tech, Vitruvian Technology, Vitruvian Technology Corp., Long Island City, NYC, New York, BoilerplateJS™, App Development Platform, project management, tactical project management, custom software, app development, web design, software development, web development, ui design, ux design, marketing, seo, content production, quality assurance, system administration, foxzero.io, fox-zero, Peter C. Romano'
    }, {
      where: {
        key: 'name',
        value: 'keywords'
      }
    });

    await MetaTag.update({
      content: 'Digital media agency specialized in premium UX/software development, product management, design, and marketing services.'
    }, {
      where: {
        key: 'name',
        value: 'description'
      }
    });

    await MetaTag.update({
      content: 'FoxZero™'
    }, {
      where: {
        key: 'itemprop',
        value: 'name'
      }
    });

    await MetaTag.update({
      content: 'FoxZero Media'
    }, {
      where: {
        key: 'itemprop',
        value: 'description'
      }
    });

    await MetaTag.update({
      content: 'FoxZero™'
    }, {
      where: {
        key: 'property',
        value: 'og:site_name'
      }
    });

    await MetaTag.update({
      content: 'https://foxzero.io'
    }, {
      where: {
        key: 'property',
        value: 'og:url'
      }
    });

    await MetaTag.update({
      content: 'FoxZero Media'
    }, {
      where: {
        key: 'property',
        value: 'og:title'
      }
    });

    await MetaTag.update({
      content: 'Digital media agency specialized in premium UX/software development, product management, design, and marketing services.'
    }, {
      where: {
        key: 'property',
        value: 'og:description'
      }
    });

    await MetaTag.update({
      content: '@fox_zero_media'
    }, {
      where: {
        key: 'property',
        value: 'og:site'
      }
    });

    await MetaTag.update({
      content: '@fox_zero_media'
    }, {
      where: {
        key: 'property',
        value: 'og:creator'
      }
    });

    await MetaTag.update({
      content: 'https://foxzero.io/@fox-zero/gpb-web/images/logo.png'
    }, {
      where: {
        key: 'property',
        value: 'og:image:secure_url'
      }
    });

    await MetaTag.update({
      content: '256'
    }, {
      where: {
        key: 'property',
        value: 'og:image:width'
      }
    });

    await MetaTag.update({
      content: '256'
    }, {
      where: {
        key: 'property',
        value: 'og:image:height'
      }
    });

    await MetaTag.update({
      content: '@fox_zero_media'
    }, {
      where: {
        key: 'property',
        value: 'twitter:site'
      }
    });

    await MetaTag.update({
      content: '@fox_zero_media'
    }, {
      where: {
        key: 'property',
        value: 'twitter:creator'
      }
    });

    await MetaTag.update({
      content: 'FoxZero™'
    }, {
      where: {
        key: 'property',
        value: 'twitter:title'
      }
    });

    await MetaTag.update({
      content: 'FoxZero Media'
    }, {
      where: {
        key: 'property',
        value: 'twitter:description'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
