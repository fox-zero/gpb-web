import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.create({
      route: 'home(/:section)',
      page: '@fox-zero/gpb-web:Home',
      title: 'VitruvianTech - Sentient. Secure. Quality for All.',
      headers: '["@fox-zero/gpb-web:Title", "@fox-zero/gpb-web:Contact"]',
      sections: '["@fox-zero/gpb-web:Home", "@fox-zero/gpb-web:Missions", "@fox-zero/gpb-web:Services", "@fox-zero/gpb-web:Plans", "@fox-zero/gpb-web:Rates", "@fox-zero/gpb-web:Hosting", "@fox-zero/gpb-web:Leadership", "@fox-zero/gpb-web:Network", "@fox-zero/gpb-web:Communications", "@fox-zero/gpb-web:Headquarters"]'
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.destroy({
      where: {
        route: 'home(/:section)',
        page: '@fox-zero/gpb-web:Home',
        title: 'VitruvianTech - Sentient. Secure. Quality for All.',
        headers: '["@fox-zero/gpb-web:Title", "@fox-zero/gpb-web:Contact"]',
        sections: '["@fox-zero/gpb-web:Home", "@fox-zero/gpb-web:Missions", "@fox-zero/gpb-web:Services", "@fox-zero/gpb-web:Plans", "@fox-zero/gpb-web:Rates", "@fox-zero/gpb-web:Hosting", "@fox-zero/gpb-web:Leadership", "@fox-zero/gpb-web:Network", "@fox-zero/gpb-web:Communications", "@fox-zero/gpb-web:Headquarters"]'
      }
    });
  }
}
