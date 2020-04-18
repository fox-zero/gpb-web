import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      title: 'Work - VitruvianTech'
    }, {
      where: {
        route: 'missions'
      }
    });

    await Page.update({
      title: 'Services - VitruvianTech'
    }, {
      where: {
        route: 'services'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      title: 'Our Work - VitruvianTech'
    }, {
      where: {
        route: 'missions'
      }
    });

    await Page.update({
      title: 'What We Do - VitruvianTech'
    }, {
      where: {
        route: 'services'
      }
    });
  }
}
