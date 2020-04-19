import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page, Link} = getModels();

    await Page.update({
      scripts: JSON.stringify([{ src: 'https://s3-us-west-2.amazonaws.com/content-gpb.foxzero.io/assets/scripts/wheel.js' }])
    }, {
      where: {
        route: '/'
      }
    });

    await Page.update({
      scripts: JSON.stringify([{ src: 'https://s3-us-west-2.amazonaws.com/content-gpb.foxzero.io/assets/scripts/wheel.js' }])
    }, {
      where: {
        route: 'posts/:slug'
      }
    });

    await Link.update({
      href: 'https://s3-us-west-2.amazonaws.com/content-gpb.foxzero.io/assets/images/logo.png'
    }, {
      where: {
        rel: 'shortcut icon'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
