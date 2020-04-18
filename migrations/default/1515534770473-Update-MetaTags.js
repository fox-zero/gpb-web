import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.update({
      content: 'Roman Inspired Software Designers'
    }, {
      where: {
        key: 'itemprop',
        value: 'description'
      }
    });

    await MetaTag.update({
      content: 'Roman Inspired Software Designers'
    }, {
      where: {
        key: 'property',
        value: 'og:title'
      }
    });

    await MetaTag.update({
      content: 'Roman Inspired Software Designers'
    }, {
      where: {
        key: 'property',
        value: 'twitter:description'
      }
    });

    await MetaTag.update({
      content: 'Roman Inspired Software Designers'
    }, {
      where: {
        key: 'property',
        value: 'twitter:image:alt'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.update({
      content: 'Sentient. Secure. Quality for All.'
    }, {
      where: {
        key: 'itemprop',
        value: 'description'
      }
    });

    await MetaTag.update({
      content: 'Sentient. Secure. Quality for All.'
    }, {
      where: {
        key: 'property',
        value: 'og:title'
      }
    });

    await MetaTag.update({
      content: 'Sentient. Secure. Quality for All.'
    }, {
      where: {
        key: 'property',
        value: 'twitter:description'
      }
    });

    await MetaTag.update({
      content: 'Sentient. Secure. Quality for All.'
    }, {
      where: {
        key: 'property',
        value: 'twitter:image:alt'
      }
    });
  }
}
