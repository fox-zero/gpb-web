import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.create({
      key: 'name',
      value: 'apple-mobile-web-app-capable',
      content: 'yes'
    });

    await MetaTag.create({
      key: 'name',
      value: 'mobile-web-app-capable',
      content: 'yes'
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
