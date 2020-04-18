import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.update({
      value: 'og:image:secure_url'
    }, {
      where: {
        value: 'og:image'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.update({
      value: 'og:image'
    }, {
      where: {
        value: 'og:image:secure_url'
      }
    });
  }
}
