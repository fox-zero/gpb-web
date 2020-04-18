import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page, Layout, Script} = getModels();

    await Layout.update({
      title: 'FoxZero™ - The High-Performance/Zero-Latency Agency™'
    }, {
      where: {
        title: 'FoxZero™'
      }
    });

    await Page.update({
      title: 'FoxZero™ - The High-Performance/Zero-Latency Agency™',
      headers: '["@fox-zero/gpb-web:Title"]',
      sections: '["@fox-zero/gpb-web:Services", "@fox-zero/gpb-web:Value", "@fox-zero/gpb-web:Strategy", "@fox-zero/gpb-web:Process", "@fox-zero/gpb-web:Warranty", "@fox-zero/gpb-web:Pricing"]'
    }, {
      where: {
        route: '/'
      }
    });

    await Page.update({
      title: 'FoxZero™ - The High-Performance/Zero-Latency Agency™',
      route: 'digital-media-agency(/:section)',
      headers: '["@fox-zero/gpb-web:Title"]',
      sections: '["@fox-zero/gpb-web:Services", "@fox-zero/gpb-web:Value", "@fox-zero/gpb-web:Strategy", "@fox-zero/gpb-web:Process", "@fox-zero/gpb-web:Warranty", "@fox-zero/gpb-web:Pricing"]'
    }, {
      where: {
        route: 'home(/:section)'
      }
    });

    await Page.update({
      title: 'Full-Service, Zero BS - Services - FoxZero™',
      headers: '["@fox-zero/gpb-web:Title"]',
      sections: '["@fox-zero/gpb-web:Services"]'
    }, {
      where: {
        route: 'services'
      }
    });

    await Page.update({
      title: '100% Power Every Hour - Value - FoxZero™',
      route: 'value',
      headers: '["@fox-zero/gpb-web:Title"]',
      sections: '["@fox-zero/gpb-web:Value"]'
    }, {
      where: {
        route: 'communications'
      }
    });

    await Page.update({
      title: 'Introducing FAST™ PLM - Strategy - FoxZero™',
      route: 'strategy',
      headers: '["@fox-zero/gpb-web:Title"]',
      sections: '["@fox-zero/gpb-web:Strategy"]'
    }, {
      where: {
        route: 'headquarters'
      }
    });

    await Page.update({
      title: 'FoxZero™ JIRA Tracker - Process - FoxZero™',
      route: 'process',
      headers: '["@fox-zero/gpb-web:Title"]',
      sections: '["@fox-zero/gpb-web:Process"]'
    }, {
      where: {
        route: 'hosting'
      }
    });

    await Page.update({
      title: 'Perfect Aim™ 100% Guarantee - Warranty - FoxZero™',
      route: 'warranty',
      headers: '["@fox-zero/gpb-web:Title"]',
      sections: '["@fox-zero/gpb-web:Warranty"]'
    }, {
      where: {
        route: 'leadership'
      }
    });

    await Page.update({
      title: 'Velocity™ Subscription Plans - Pricing - FoxZero™',
      route: 'pricing',
      headers: '["@fox-zero/gpb-web:Title"]',
      sections: '["@fox-zero/gpb-web:Pricing"]'
    }, {
      where: {
        route: 'missions'
      }
    });

    await Page.destroy({ where: { route: 'rates' } });
    await Page.destroy({ where: { route: 'plans' } });
    await Page.destroy({ where: { route: 'network' } });

    await Script.destroy({ where: { content: 'https://use.typekit.net/ftk6yva.js' } });
    await Script.destroy({ where: { content: 'try{Typekit.load({ async: false });}catch(e){}' } });
  }

  static async down(models, sequelize, DataTypes) {}
}
