import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      title: 'VitruvianTech - Roman Inspired Software Designers'
    }, {
      where: {
        route: '/'
      }
    });

    await Page.update({
      title: 'VitruvianTech - Roman Inspired Software Designers'
    }, {
      where: {
        route: 'home(/:section)'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      title: 'VitruvianTech - Sentient. Secure. Quality for All.'
    }, {
      where: {
        route: '/'
      }
    });

    await Page.update({
      title: 'VitruvianTech - Sentient. Secure. Quality for All.'
    }, {
      where: {
        route: 'home(/:section)'
      }
    });
  }
}
