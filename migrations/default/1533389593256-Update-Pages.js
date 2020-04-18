import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      route: 'digital-media-agency/:section'
    }, {
      where: {
        route: 'digital-media-agency(/:section)'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
