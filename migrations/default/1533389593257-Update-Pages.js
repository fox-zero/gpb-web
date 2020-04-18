import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      sections: '["@fox-zero/gpb-web:Error"]'
    }, {
      where: {
        route: '*'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
