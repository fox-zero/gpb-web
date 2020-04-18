import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      scripts: JSON.stringify([{ src: 'https://d3w33imimg0eu8.cloudfront.net/scripts/wheel.js' }])
    }, {
      where: {
        route: '/'
      }
    });

    await Page.update({
      scripts: JSON.stringify([{ src: 'https://d3w33imimg0eu8.cloudfront.net/scripts/wheel.js' }])
    }, {
      where: {
        route: 'posts/:slug'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
