import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.create({
      key: 'property',
      value: 'og:image',
      content: 'https://foxzero.io/@fox-zero/gpb-web/images/logo.png'
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
