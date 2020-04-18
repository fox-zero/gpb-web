import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Layout, Page} = getModels();

    await Layout.update({
      title: 'Fox Zero · High-Performance/Zero-Latency Consultancy™'
    }, {
      where: {
        theme: '@fox-zero/gpb-web'
      }
    });

    await Page.update({
      title: 'Nope! · Fox Zero™'
    }, {
      where: {
        route: '*'
      }
    });

    await Page.update({
      title: 'Fox Zero · High-Performance/Zero-Latency Consultancy™'
    }, {
      where: {
        route: '/'
      }
    });

    await Page.update({
      title: 'Fox Zero · High-Performance/Zero-Latency Consultancy™'
    }, {
      where: {
        route: 'home/:section'
      }
    });

    await Page.update({
      title: '100% Power Every Hour · Consulting · Fox Zero™'
    }, {
      where: {
        route: 'consulting'
      }
    });

    await Page.update({
      title: 'Full Service Digital Agency · Development · Fox Zero™'
    }, {
      where: {
        route: 'development'
      }
    });

    await Page.update({
      title: 'Hosting, LTS, Monitoring · Maintenance · Fox Zero™'
    }, {
      where: {
        route: 'maintenance'
      }
    });

    await Page.update({
      title: 'Introducing FAST™ PLM · Strategy · Fox Zero™'
    }, {
      where: {
        route: 'strategy'
      }
    });

    await Page.update({
      title: 'Velocity™ Plan Pricing · Subscription · Fox Zero™'
    }, {
      where: {
        route: 'subscription'
      }
    });

    await Page.update({
      title: 'Wingman™ Surety Coverage · Warranty · Fox Zero™'
    }, {
      where: {
        route: 'warranty'
      }
    });

    await Page.update({
      title: 'Point & Pay™ Sprint Pricing · On Demand · Fox Zero™'
    }, {
      where: {
        route: 'on-demand'
      }
    });

    await Page.update({
      title: 'Tactical Project Management · Process · Fox Zero™'
    }, {
      where: {
        route: 'process'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
