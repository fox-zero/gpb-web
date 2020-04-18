import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      headers: '["@fox-zero/gpb-web:Title", "@fox-zero/gpb-web:Contact"]',
      page: '@fox-zero/gpb-web:Plans'
    }, {
      where: {
        route: 'plans'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      headers: '["@fox-zero/gpb-web:Plans", "@fox-zero/gpb-web:Contact"]',
      page: null
    }, {
      where: {
        route: 'plans'
      }
    });
  }
}
