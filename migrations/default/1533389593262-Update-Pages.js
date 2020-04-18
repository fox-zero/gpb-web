import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      sections: '["@fox-zero/gpb-web:Consulting", "@fox-zero/gpb-web:Development", "@fox-zero/gpb-web:Maintenance", "@fox-zero/gpb-web:Insurance", "@fox-zero/gpb-web:Subscription", "@fox-zero/gpb-web:OnDemand", "@fox-zero/gpb-web:Strategy", "@fox-zero/gpb-web:Process"]'
    }, {
      where: {
        route: '/'
      }
    });

    await Page.update({
      sections: '["@fox-zero/gpb-web:Consulting", "@fox-zero/gpb-web:Development", "@fox-zero/gpb-web:Maintenance", "@fox-zero/gpb-web:Insurance", "@fox-zero/gpb-web:Subscription", "@fox-zero/gpb-web:OnDemand", "@fox-zero/gpb-web:Strategy", "@fox-zero/gpb-web:Process"]'
    }, {
      where: {
        route: 'services/:section'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
