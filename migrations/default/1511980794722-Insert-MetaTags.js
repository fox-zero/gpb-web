import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.create({
      key: 'name',
      value: 'description',
      content: 'The Digital Special Forces for custom software and marketing solutions. Based in NYC, Vitruvian Technology, Corp. specializes in Web/Software Development, Marketing, Design, QA, Studio Production, Sourcing, IT/System Administration, Security, and Investigatory services.'
    });

    await MetaTag.create({
      key: 'name',
      value: 'keywords',
      content: 'VitruvianTech, Vitruvian Tech, Vitruvian Technology, Vitruvian Technology Corp., Long Island City, NYC, New York, Machete App Theming Platform, CMS, content management system, economical, custom, web development, web design, web, software, development, design, marketing, studio, production, sourcing, IT/system administration, security, investigatory, services, solutions, consulting, digital, special, forces, agency, digital special forces agency, VitruvianTechHQ, Peter C. Romano'
    });

    await MetaTag.create({
      key: 'name',
      value: 'robots',
      content: 'index,follow'
    });

    await MetaTag.create({
      key: 'name',
      value: 'theme-color',
      content: '#080808'
    });

    await MetaTag.create({
      key: 'itemprop',
      value: 'name',
      content: 'VitruvianTech'
    });

    await MetaTag.create({
      key: 'itemprop',
      value: 'description',
      content: 'Sentient. Secure. Quality for All.'
    });

    await MetaTag.create({
      key: 'property',
      value: 'og:site_name',
      content: 'VitruvianTech'
    });

    await MetaTag.create({
      key: 'property',
      value: 'og:url',
      content: 'http://Vitruvian.Tech'
    });

    await MetaTag.create({
      key: 'property',
      value: 'og:type',
      content: 'website'
    });

    await MetaTag.create({
      key: 'property',
      value: 'og:locale',
      content: 'en_US'
    });

    await MetaTag.create({
      key: 'property',
      value: 'og:title',
      content: 'Sentient. Secure. Quality for All.'
    });

    await MetaTag.create({
      key: 'property',
      value: 'og:description',
      content: 'The Digital Special Forces for custom software and marketing solutions. Based in NYC, Vitruvian Technology, Corp. specializes in Web/Software Development, Marketing, Design, QA, Studio Production, Sourcing, IT/System Administration, Security, and Investigatory services.'
    });

    await MetaTag.create({
      key: 'property',
      value: 'og:site',
      content: '@VitruvianTechHQ'
    });

    await MetaTag.create({
      key: 'property',
      value: 'og:creator',
      content: '@VitruvianTechHQ'
    });

    await MetaTag.create({
      key: 'property',
      value: 'og:image',
      content: 'http://vitruvian.tech/assets/images/cover.jpg'
    });

    await MetaTag.create({
      key: 'property',
      value: 'og:image:width',
      content: '1200'
    });

    await MetaTag.create({
      key: 'property',
      value: 'og:image:height',
      content: '630'
    });

    await MetaTag.create({
      key: 'property',
      value: 'og:image:type',
      content: 'image/png'
    });

    await MetaTag.create({
      key: 'property',
      value: 'twitter:card',
      content: 'summary'
    });

    await MetaTag.create({
      key: 'property',
      value: 'twitter:site',
      content: '@VitruvianTechHQ'
    });

    await MetaTag.create({
      key: 'property',
      value: 'twitter:title',
      content: 'VitruvianTech'
    });

    await MetaTag.create({
      key: 'property',
      value: 'twitter:description',
      content: 'Sentient. Secure. Quality for All.'
    });

    await MetaTag.create({
      key: 'property',
      value: 'twitter:creator',
      content: '@VitruvianTechHQ'
    });

    await MetaTag.create({
      key: 'property',
      value: 'twitter:image',
      content: 'http://vitruvian.tech/assets/images/cover.jpg'
    });

    await MetaTag.create({
      key: 'property',
      value: 'twitter:image:alt',
      content: 'Sentient. Secure. Quality for All.'
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.destroy({
      where: {
        key: 'name',
        value: 'description',
        content: 'The Digital Special Forces for custom software and marketing solutions. Based in NYC, Vitruvian Technology, Corp. specializes in Web/Software Development, Marketing, Design, QA, Studio Production, Sourcing, IT/System Administration, Security, and Investigatory services.'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'name',
        value: 'keywords',
        content: 'VitruvianTech, Vitruvian Tech, Vitruvian Technology, Vitruvian Technology Corp., Long Island City, NYC, New York, Machete App Theming Platform, CMS, content management system, economical, custom, web development, web design, web, software, development, design, marketing, studio, production, sourcing, IT/system administration, security, investigatory, services, solutions, consulting, digital, special, forces, agency, digital special forces agency, VitruvianTechHQ, Peter C. Romano'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'name',
        value: 'robots',
        content: 'index,follow'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'name',
        value: 'theme-color',
        content: '#080808'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'itemprop',
        value: 'name',
        content: 'VitruvianTech'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'itemprop',
        value: 'description',
        content: 'Sentient. Secure. Quality for All.'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'property',
        value: 'og:site_name',
        content: 'VitruvianTech'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'property',
        value: 'og:url',
        content: 'http://Vitruvian.Tech'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'property',
        value: 'og:type',
        content: 'website'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'property',
        value: 'og:locale',
        content: 'en_US'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'property',
        value: 'og:title',
        content: 'Sentient. Secure. Quality for All.'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'property',
        value: 'og:description',
        content: 'The Digital Special Forces for custom software and marketing solutions. Based in NYC, Vitruvian Technology, Corp. specializes in Web/Software Development, Marketing, Design, QA, Studio Production, Sourcing, IT/System Administration, Security, and Investigatory services.'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'property',
        value: 'og:site',
        content: '@VitruvianTechHQ'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'property',
        value: 'og:creator',
        content: '@VitruvianTechHQ'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'property',
        value: 'og:image',
        content: 'http://vitruvian.tech/assets/images/cover.jpg'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'property',
        value: 'og:image:width',
        content: '1200'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'property',
        value: 'og:image:height',
        content: '630'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'property',
        value: 'og:image:type',
        content: 'image/png'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'property',
        value: 'twitter:card',
        content: 'summary'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'property',
        value: 'twitter:site',
        content: '@VitruvianTechHQ'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'property',
        value: 'twitter:title',
        content: 'VitruvianTech'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'property',
        value: 'twitter:description',
        content: 'Sentient. Secure. Quality for All.'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'property',
        value: 'twitter:creator',
        content: '@VitruvianTechHQ'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'property',
        value: 'twitter:image',
        content: 'http://vitruvian.tech/assets/images/cover.jpg'
      }
    });

    await MetaTag.destroy({
      where: {
        key: 'property',
        value: 'twitter:image:alt',
        content: 'Sentient. Secure. Quality for All.'
      }
    });
  }
}
