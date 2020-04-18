import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      title: 'Full-Service Digital Agency - Services - FoxZero™',
    }, {
      where: {
        route: 'services'
      }
    });

    await Page.update({
      route: 'digital-agency/:section'
    }, {
      where: {
        route: 'digital-media-agency/:section'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
