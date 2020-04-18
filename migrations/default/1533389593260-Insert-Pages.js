import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.create({
      route: 'maintenance',
      title: 'Long-Term Support - Maintenance - FoxZero™',
      page: '@fox-zero/gpb-web:Maintenance',
      headers: '["@fox-zero/gpb-web:Title"]',
      sections: '["@fox-zero/gpb-web:Maintenance"]'
    });

    await Page.create({
      route: 'on-demand',
      title: 'Point & Pay™ Sprint Pricing - On Demand - FoxZero™',
      page: '@fox-zero/gpb-web:OnDemand',
      headers: '["@fox-zero/gpb-web:Title"]',
      sections: '["@fox-zero/gpb-web:OnDemand"]'
    });

    await Page.update({
      route: 'subscription',
      title: 'Velocity™ Plan Pricing - Subscription - FoxZero™',
      page: '@fox-zero/gpb-web:Subscription',
      sections: '["@fox-zero/gpb-web:Subscription"]'
    }, {
      where: {
        route: 'pricing'
      }
    });

    await Page.update({
      sections: '["@fox-zero/gpb-web:Consulting", "@fox-zero/gpb-web:Development", "@fox-zero/gpb-web:Maintenance", "@fox-zero/gpb-web:Strategy", "@fox-zero/gpb-web:Process", "@fox-zero/gpb-web:Warranty", "@fox-zero/gpb-web:Subscription", "@fox-zero/gpb-web:OnDemand"]'
    }, {
      where: {
        route: '/'
      }
    });

    await Page.update({
      sections: '["@fox-zero/gpb-web:Consulting", "@fox-zero/gpb-web:Development", "@fox-zero/gpb-web:Maintenance", "@fox-zero/gpb-web:Strategy", "@fox-zero/gpb-web:Process", "@fox-zero/gpb-web:Warranty", "@fox-zero/gpb-web:Subscription", "@fox-zero/gpb-web:OnDemand"]'
    }, {
      where: {
        route: 'services/:section'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
