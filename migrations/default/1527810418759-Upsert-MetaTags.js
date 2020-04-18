import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.create({
      key: 'property',
      value: 'og:image',
      content: 'https://vitruvian.tech/@fox-zero/gpb-web/images/cover.jpg'
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.destroy({
      where: {
        key: 'property',
        value: 'og:image',
        content: 'https://vitruvian.tech/@fox-zero/gpb-web/images/cover.jpg'
      }
    });
  }
}
