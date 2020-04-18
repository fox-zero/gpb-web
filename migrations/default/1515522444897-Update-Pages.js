import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      title: 'Plans and Products - VitruvianTech'
    }, {
      where: {
        route: 'plans'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      title: 'VitruvianTech - Plans and Products'
    }, {
      where: {
        route: 'plans'
      }
    });
  }
}
