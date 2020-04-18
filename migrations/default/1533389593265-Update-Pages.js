import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      title: 'Waypoint™ Worry-Free Guarantee - Warranty - FoxZero™'
    }, {
      where: {
        route: 'warranty'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
