import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.create({
      route: 'pricing/:section',
      title: 'FoxZero - The High-Performance/Zero-Latency Agency™',
      page: '@fox-zero/gpb-web:Home',
      headers: '["@fox-zero/gpb-web:Title"]',
      sections: '["@fox-zero/gpb-web:Consulting", "@fox-zero/gpb-web:Development", "@fox-zero/gpb-web:Maintenance", "@fox-zero/gpb-web:Strategy", "@fox-zero/gpb-web:Subscription", "@fox-zero/gpb-web:Warranty", "@fox-zero/gpb-web:Process", "@fox-zero/gpb-web:OnDemand"]'
    });

    await Page.create({
      route: 'framework/:section',
      title: 'FoxZero - The High-Performance/Zero-Latency Agency™',
      page: '@fox-zero/gpb-web:Home',
      headers: '["@fox-zero/gpb-web:Title"]',
      sections: '["@fox-zero/gpb-web:Consulting", "@fox-zero/gpb-web:Development", "@fox-zero/gpb-web:Maintenance", "@fox-zero/gpb-web:Strategy", "@fox-zero/gpb-web:Subscription", "@fox-zero/gpb-web:Warranty", "@fox-zero/gpb-web:Process", "@fox-zero/gpb-web:OnDemand"]'
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
