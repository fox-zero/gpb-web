import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      title: 'Verticals & Applications · Portfolio · Fox Zero™',
      route: 'portfolio',
      page: '@fox-zero/gpb-web:Portfolio',
      sections: '["@fox-zero/gpb-web:Portfolio"]'
    }, {
      where: {
        route: 'process'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
