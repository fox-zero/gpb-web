import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      title: 'VitruvianTech - Roman Inspired Software'
    }, {
      where: {
        route: 'home(/:section)'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      title: 'VitruvianTech - Roman Inspired Software Designers'
    }, {
      where: {
        route: 'home(/:section)'
      }
    });
  }
}
