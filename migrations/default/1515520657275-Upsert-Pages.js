import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.create({
      route: 'missions',
      title: 'Our Work - VitruvianTech',
      page: '@fox-zero/gpb-web:Missions',
      sections: '["@fox-zero/gpb-web:Missions"]',
      headers: '["@fox-zero/gpb-web:Title", "@fox-zero/gpb-web:Contact"]',
      meta: '[{"name":"description","content":"Learn about our work and past missions."},{"property":"og:description","content":"Learn about our work and past missions."},{"property":"twitter:description","content":"Learn about our work and past missions."},{"property":"og:url","content":"http://Vitruvian.Tech/home/missions"}]'
    });

    await Page.create({
      route: 'services',
      title: 'What We Do - VitruvianTech',
      page: '@fox-zero/gpb-web:Services',
      sections: '["@fox-zero/gpb-web:Services"]',
      headers: '["@fox-zero/gpb-web:Title", "@fox-zero/gpb-web:Contact"]',
      meta: '[{"name":"description","content":"Learn about our work and past missions."},{"property":"og:description","content":"Learn about our work and past missions."},{"property":"twitter:description","content":"Learn about our work and past missions."},{"property":"og:url","content":"http://Vitruvian.Tech/home/services"}]'
    });

    await Page.create({
      route: 'rates',
      title: 'Hourly Rates - VitruvianTech',
      page: '@fox-zero/gpb-web:Rates',
      sections: '["@fox-zero/gpb-web:Rates"]',
      headers: '["@fox-zero/gpb-web:Title", "@fox-zero/gpb-web:Contact"]',
      meta: '[{"name":"description","content":"Learn about our work and past missions."},{"property":"og:description","content":"Learn about our work and past missions."},{"property":"twitter:description","content":"Learn about our work and past missions."},{"property":"og:url","content":"http://Vitruvian.Tech/home/rates"}]'
    });

    await Page.create({
      route: 'hosting',
      title: 'Hosting - VitruvianTech',
      page: '@fox-zero/gpb-web:Hosting',
      sections: '["@fox-zero/gpb-web:Hosting"]',
      headers: '["@fox-zero/gpb-web:Title", "@fox-zero/gpb-web:Contact"]',
      meta: '[{"name":"description","content":"Learn about our work and past missions."},{"property":"og:description","content":"Learn about our work and past missions."},{"property":"twitter:description","content":"Learn about our work and past missions."},{"property":"og:url","content":"http://Vitruvian.Tech/home/hosting"}]'
    });

    await Page.create({
      route: 'leadership',
      title: 'Who We Are - VitruvianTech',
      page: '@fox-zero/gpb-web:Leadership',
      sections: '["@fox-zero/gpb-web:Leadership"]',
      headers: '["@fox-zero/gpb-web:Title", "@fox-zero/gpb-web:Contact"]',
      meta: '[{"name":"description","content":"Learn about our work and past missions."},{"property":"og:description","content":"Learn about our work and past missions."},{"property":"twitter:description","content":"Learn about our work and past missions."},{"property":"og:url","content":"http://Vitruvian.Tech/home/leadership"}]'
    });

    await Page.create({
      route: 'network',
      title: 'Partners - VitruvianTech',
      page: '@fox-zero/gpb-web:Network',
      sections: '["@fox-zero/gpb-web:Network"]',
      headers: '["@fox-zero/gpb-web:Title", "@fox-zero/gpb-web:Contact"]',
      meta: '[{"name":"description","content":"Learn about our work and past missions."},{"property":"og:description","content":"Learn about our work and past missions."},{"property":"twitter:description","content":"Learn about our work and past missions."},{"property":"og:url","content":"http://Vitruvian.Tech/home/network"}]'
    });

    await Page.create({
      route: 'communications',
      title: 'Connect with Us - VitruvianTech',
      page: '@fox-zero/gpb-web:Communications',
      sections: '["@fox-zero/gpb-web:Communications"]',
      headers: '["@fox-zero/gpb-web:Title", "@fox-zero/gpb-web:Contact"]',
      meta: '[{"name":"description","content":"Learn about our work and past missions."},{"property":"og:description","content":"Learn about our work and past missions."},{"property":"twitter:description","content":"Learn about our work and past missions."},{"property":"og:url","content":"http://Vitruvian.Tech/home/communications"}]'
    });

    await Page.create({
      route: 'headquarters',
      title: 'Base of Operations - VitruvianTech',
      page: '@fox-zero/gpb-web:Headquarters',
      sections: '["@fox-zero/gpb-web:Headquarters"]',
      headers: '["@fox-zero/gpb-web:Title", "@fox-zero/gpb-web:Contact"]',
      meta: '[{"name":"description","content":"Learn about our work and past missions."},{"property":"og:description","content":"Learn about our work and past missions."},{"property":"twitter:description","content":"Learn about our work and past missions."},{"property":"og:url","content":"http://Vitruvian.Tech/home/headquarters"}]'
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.destroy({
      where: {
        route: 'missions'
      }
    });

    await Page.destroy({
      where: {
        route: 'services'
      }
    });

    await Page.destroy({
      where: {
        route: 'rates'
      }
    });

    await Page.destroy({
      where: {
        route: 'hosting'
      }
    });

    await Page.destroy({
      where: {
        route: 'leadership'
      }
    });

    await Page.destroy({
      where: {
        route: 'network'
      }
    });

    await Page.destroy({
      where: {
        route: 'communications'
      }
    });

    await Page.destroy({
      where: {
        route: 'headquarters'
      }
    });
  }
}
