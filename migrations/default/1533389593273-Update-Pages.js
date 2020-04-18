import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      title: 'Target Verticals & Applications · Portfolio · Fox Zero™'
    }, {
      where: {
        route: 'portfolio'
      }
    });

    await Page.update({
      sections: '["@fox-zero/gpb-web:Consulting", "@fox-zero/gpb-web:Development", "@fox-zero/gpb-web:Strategy", "@fox-zero/gpb-web:Portfolio", "@fox-zero/gpb-web:Warranty", "@fox-zero/gpb-web:Subscription", "@fox-zero/gpb-web:OnDemand", "@fox-zero/gpb-web:Maintenance"]'
    }, {
      where: {
        route: '/'
      }
    });

    await Page.update({
      sections: '["@fox-zero/gpb-web:Consulting", "@fox-zero/gpb-web:Development", "@fox-zero/gpb-web:Strategy", "@fox-zero/gpb-web:Portfolio", "@fox-zero/gpb-web:Warranty", "@fox-zero/gpb-web:Subscription", "@fox-zero/gpb-web:OnDemand", "@fox-zero/gpb-web:Maintenance"]'
    }, {
      where: {
        route: 'home/:section'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
