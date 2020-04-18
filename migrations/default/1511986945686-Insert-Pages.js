import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.create({
      route: '/',
      title: 'VitruvianTech - Sentient. Secure. Quality for All.',
      headers: '["@fox-zero/gpb-web:Title", "@fox-zero/gpb-web:Contact"]'
    });

    await Page.create({
      route: 'about',
      title: 'VitruvianTech - About Us',
      page: '@fox-zero/gpb-web:About',
      headers: '["@fox-zero/gpb-web:Title", "@fox-zero/gpb-web:Contact"]',
      sections: '["@fox-zero/gpb-web:About"]'
    });

    await Page.create({
      route: 'contact',
      title: 'VitruvianTech - Contact Us',
      headers: '["@fox-zero/gpb-web:Contact"]',
      sections: '["@boilerplatejs/core:Contact"]'
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.destroy({
      where: {
        route: '/',
        title: 'VitruvianTech - Sentient. Secure. Quality for All.',
        headers: '["@fox-zero/gpb-web:Title", "@fox-zero/gpb-web:Contact"]'
      }
    });

    await Page.destroy({
      where: {
        route: 'about',
        title: 'VitruvianTech - About Us',
        page: '@fox-zero/gpb-web:About',
        headers: '["@fox-zero/gpb-web:Title", "@fox-zero/gpb-web:Contact"]',
        sections: '["@fox-zero/gpb-web:About"]'
      }
    });

    await Page.destroy({
      where: {
        route: 'contact',
        title: 'VitruvianTech - Contact Us',
        headers: '["@fox-zero/gpb-web:Contact"]',
        sections: '["@boilerplatejs/core:Contact"]'
      }
    });
  }
}
