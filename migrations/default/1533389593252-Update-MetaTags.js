import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.update({
      content: 'https://foxzero.io/@fox-zero/gpb-web/images/logo.png'
    }, {
      where: {
        key: 'property',
        value: 'og:image'
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
  }

  static async down(models, sequelize, DataTypes) {}
}
