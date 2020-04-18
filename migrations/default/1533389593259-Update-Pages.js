import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      route: 'consulting',
      title: '100% Power Every Hour - Consulting - FoxZero™',
      page: '@fox-zero/gpb-web:Consulting',
      sections: '["@fox-zero/gpb-web:Consulting"]'
    }, {
      where: {
        route: 'value'
      }
    });

    await Page.update({
      route: 'development',
      title: 'Full Service Digital Agency - Development - FoxZero™',
      page: '@fox-zero/gpb-web:Development',
      sections: '["@fox-zero/gpb-web:Development"]'
    }, {
      where: {
        route: 'services'
      }
    });

    await Page.update({
      title: 'FoxZero - The High-Performance/Zero-Latency Agency™',
      sections: '["@fox-zero/gpb-web:Consulting", "@fox-zero/gpb-web:Development", "@fox-zero/gpb-web:Strategy", "@fox-zero/gpb-web:Process", "@fox-zero/gpb-web:Warranty", "@fox-zero/gpb-web:Pricing"]'
    }, {
      where: {
        route: '/'
      }
    });

    await Page.update({
      route: 'services/:section',
      title: 'FoxZero - The High-Performance/Zero-Latency Agency™',
      sections: '["@fox-zero/gpb-web:Consulting", "@fox-zero/gpb-web:Development", "@fox-zero/gpb-web:Strategy", "@fox-zero/gpb-web:Process", "@fox-zero/gpb-web:Warranty", "@fox-zero/gpb-web:Pricing"]'
    }, {
      where: {
        route: 'digital-agency/:section'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
