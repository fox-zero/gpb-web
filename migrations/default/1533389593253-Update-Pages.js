import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page, Layout} = getModels();

    await Layout.update({
      title: 'FoxZero™ - Digital Media Agency'
    }, {
      where: {
        title: 'VitruvianTech'
      }
    });

    await Page.update({
      title: 'FoxZero™ - Digital Media Agency'
    }, {
      where: {
        route: '/'
      }
    });

    await Page.update({
      title: 'FoxZero™ - Digital Media Agency'
    }, {
      where: {
        route: 'home(/:section)'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
