import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      title: 'Contact - VitruvianTech'
    }, {
      where: {
        route: 'communications'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      title: 'Connect with Us - VitruvianTech'
    }, {
      where: {
        route: 'communications'
      }
    });
  }
}
