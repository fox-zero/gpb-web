import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      page: '@fox-zero/gpb-web:Post',
      headers: '["@fox-zero/gpb-web:Wheel"]',
      sections: '[]',
      title: null
    }, {
      where: {
        route: '/'
      }
    });

    await Page.create({
      page: '@fox-zero/gpb-web:Post',
      headers: '["@fox-zero/gpb-web:Wheel"]',
      sections: '[]',
      route: 'post/:slug'
    });

    await Page.destroy({ where: { route: 'home/:section' } });
    await Page.destroy({ where: { route: 'consulting' } });
    await Page.destroy({ where: { route: 'development' } });
    await Page.destroy({ where: { route: 'portfolio' } });
    await Page.destroy({ where: { route: 'strategy' } });
    await Page.destroy({ where: { route: 'subscription' } });
    await Page.destroy({ where: { route: 'warranty' } });
    await Page.destroy({ where: { route: 'on-demand' } });
    await Page.destroy({ where: { route: 'maintenance' } });
    await Page.destroy({ where: { route: 'about' } });
    await Page.destroy({ where: { route: 'privacy' } });
  }

  static async down(models, sequelize, DataTypes) {}
}
