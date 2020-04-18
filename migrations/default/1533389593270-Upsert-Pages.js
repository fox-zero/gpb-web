import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.create({
        route: 'about',
        title: 'About Us · Fox Zero™',
        page: '@fox-zero/gpb-web:About',
        headers: '["@fox-zero/gpb-web:About"]',
        sections: '["@fox-zero/gpb-web:About"]'
    });

    await Page.create({
        route: 'contact',
        title: 'Contact Us · Fox Zero™',
        page: '@fox-zero/gpb-web:About',
        headers: '["@fox-zero/gpb-web:Contact"]',
        sections: '["@fox-zero/gpb-web:Contact"]'
    });

    await Page.create({
        route: 'privacy',
        title: 'Privacy Policy · Fox Zero™',
        page: '@fox-zero/gpb-web:About',
        headers: '["@fox-zero/gpb-web:Privacy"]',
        sections: '["@fox-zero/gpb-web:Privacy"]'
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.destroy({ where: { route: 'about' } });
    await Page.destroy({ where: { route: 'contact' } });
    await Page.destroy({ where: { route: 'privacy' } });
  }
}
