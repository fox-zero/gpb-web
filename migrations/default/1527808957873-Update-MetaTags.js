import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.update({
      content: 'https://vitruvian.tech'
    }, {
      where: {
        key: 'property',
        value: 'og:url',
        content: 'http://Vitruvian.Tech'
      }
    });

    await MetaTag.update({
      content: 'https://vitruvian.tech/@fox-zero/gpb-web/images/cover.jpg'
    }, {
      where: {
        key: 'property',
        value: 'og:image',
        content: 'http://vitruvian.tech/@fox-zero/gpb-web/images/cover.jpg'
      }
    });

    await MetaTag.update({
      content: 'https://vitruvian.tech/@fox-zero/gpb-web/images/cover.jpg'
    }, {
      where: {
        key: 'property',
        value: 'twitter:image',
        content: 'http://vitruvian.tech/@fox-zero/gpb-web/images/cover.jpg'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.update({
      content: 'http://Vitruvian.Tech'
    }, {
      where: {
        key: 'property',
        value: 'og:url',
        content: 'https://vitruvian.tech'
      }
    });

    await MetaTag.update({
      content: 'http://vitruvian.tech/@fox-zero/gpb-web/images/cover.jpg'
    }, {
      where: {
        key: 'property',
        value: 'og:image',
        content: 'https://vitruvian.tech/@fox-zero/gpb-web/images/cover.jpg'
      }
    });

    await MetaTag.update({
      content: 'http://vitruvian.tech/@fox-zero/gpb-web/images/cover.jpg'
    }, {
      where: {
        key: 'property',
        value: 'twitter:image',
        content: 'https://vitruvian.tech/@fox-zero/gpb-web/images/cover.jpg'
      }
    });
  }
}
