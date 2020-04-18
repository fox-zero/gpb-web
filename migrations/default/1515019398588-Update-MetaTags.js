import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.update({
      content: 'http://vitruvian.tech/@fox-zero/gpb-web/images/cover.jpg'
    }, {
      where: {
        key: 'property',
        value: 'og:image',
        content: 'http://vitruvian.tech/assets/images/cover.jpg'
      }
    });

    await MetaTag.update({
      content: 'http://vitruvian.tech/@fox-zero/gpb-web/images/cover.jpg'
    }, {
      where: {
        key: 'property',
        value: 'twitter:image',
        content: 'http://vitruvian.tech/assets/images/cover.jpg'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.update({
      content: 'http://vitruvian.tech/assets/images/cover.jpg'
    }, {
      where: {
        key: 'property',
        value: 'og:image',
        content: 'http://vitruvian.tech/@fox-zero/gpb-web/images/cover.jpg'
      }
    });

    await MetaTag.update({
      content: 'http://vitruvian.tech/assets/images/cover.jpg'
    }, {
      where: {
        key: 'property',
        value: 'twitter:image',
        content: 'http://vitruvian.tech/@fox-zero/gpb-web/images/cover.jpg'
      }
    });
  }
}
