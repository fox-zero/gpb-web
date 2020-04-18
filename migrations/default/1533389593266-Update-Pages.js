import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      route: 'home/:section'
    }, {
      where: {
        route: 'services/:section'
      }
    });

    await Page.destroy({
      where: {
        route: 'pricing/:section'
      }
    });

    await Page.destroy({
      where: {
        route: 'framework/:section'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
