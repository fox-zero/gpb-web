import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      meta: '[{"name":"description","content":"Learn about our work and past missions."},{"property":"og:description","content":"Learn about our work and past missions."},{"property":"twitter:description","content":"Learn about our work and past missions."},{"property":"og:url","content":"http://vitruvian.tech/missions"}]'
    }, {
      where: {
        route: 'missions'
      }
    });

    await Page.update({
      meta: '[{"name":"description","content":"Learn about our services: Web/Software Development, Marketing, Design, QA, Studio Production, and more!"},{"property":"og:description","content":"Learn about our services: Web/Software Development, Marketing, Design, QA, Studio Production, and more!"},{"property":"twitter:description","content":"Learn about our services: Web/Software Development, Marketing, Design, QA, Studio Production, and more!"},{"property":"og:url","content":"http://vitruvian.tech/services"}]'
    }, {
      where: {
        route: 'services'
      }
    });

    await Page.update({
      meta: '[{"name":"description","content":"With a distributed workforce, our rates are more affordable than leading competitors."},{"property":"og:description","content":"With a distributed workforce, our rates are more affordable than leading competitors."},{"property":"twitter:description","content":"With a distributed workforce, our rates are more affordable than leading competitors."},{"property":"og:url","content":"http://vitruvian.tech/rates"}]'
    }, {
      where: {
        route: 'rates'
      }
    });

    await Page.update({
      meta: '[{"name":"description","content":"Learn about our hosting packages."},{"property":"og:description","content":"Learn about our hosting packages."},{"property":"twitter:description","content":"Learn about our hosting packages."},{"property":"og:url","content":"http://vitruvian.tech/hosting"}]'
    }, {
      where: {
        route: 'hosting'
      }
    });

    await Page.update({
      meta: '[{"name":"description","content":"Learn about who we are, and our message."},{"property":"og:description","content":"Learn about who we are, and our message."},{"property":"twitter:description","content":"Learn about who we are, and our message."},{"property":"og:url","content":"http://vitruvian.tech/leadership"}]'
    }, {
      where: {
        route: 'leadership'
      }
    });

    await Page.update({
      meta: '[{"name":"description","content":"Wanna be a part of the Vitruvian family? Check out our partners and come join us in our mission."},{"property":"og:description","content":"Wanna be a part of the Vitruvian family? Check out our partners and come join us in our mission."},{"property":"twitter:description","content":"Wanna be a part of the Vitruvian family? Check out our partners and come join us in our mission."},{"property":"og:url","content":"http://vitruvian.tech/network"}]'
    }, {
      where: {
        route: 'network'
      }
    });

    await Page.update({
      meta: '[{"name":"description","content":"Connect with us today, so we can start building your mission-critical product."},{"property":"og:description","content":"Connect with us today, so we can start building your mission-critical product."},{"property":"twitter:description","content":"Connect with us today, so we can start building your mission-critical product."},{"property":"og:url","content":"http://vitruvian.tech/communications"}]'
    }, {
      where: {
        route: 'communications'
      }
    });

    await Page.update({
      meta: '[{"name":"description","content":"We operate globally, but our heart is in NYC, based in booming Long Island City."},{"property":"og:description","content":"We operate globally, but our heart is in NYC, based in booming Long Island City."},{"property":"twitter:description","content":"We operate globally, but our heart is in NYC, based in booming Long Island City."},{"property":"og:url","content":"http://vitruvian.tech/headquarters"}]'
    }, {
      where: {
        route: 'headquarters'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.update({
      meta: '[{"name":"description","content":"Learn about our work and past missions."},{"property":"og:description","content":"Learn about our work and past missions."},{"property":"twitter:description","content":"Learn about our work and past missions."},{"property":"og:url","content":"http://Vitruvian.Tech/home/missions"}]'
    }, {
      where: {
        route: 'missions'
      }
    });

    await Page.update({
      meta: '[{"name":"description","content":"Learn about our work and past missions."},{"property":"og:description","content":"Learn about our work and past missions."},{"property":"twitter:description","content":"Learn about our work and past missions."},{"property":"og:url","content":"http://Vitruvian.Tech/home/missions"}]'
    }, {
      where: {
        route: 'services'
      }
    });

    await Page.update({
      meta: '[{"name":"description","content":"Learn about our work and past missions."},{"property":"og:description","content":"Learn about our work and past missions."},{"property":"twitter:description","content":"Learn about our work and past missions."},{"property":"og:url","content":"http://Vitruvian.Tech/home/missions"}]'
    }, {
      where: {
        route: 'rates'
      }
    });

    await Page.update({
      meta: '[{"name":"description","content":"Learn about our work and past missions."},{"property":"og:description","content":"Learn about our work and past missions."},{"property":"twitter:description","content":"Learn about our work and past missions."},{"property":"og:url","content":"http://Vitruvian.Tech/home/missions"}]'
    }, {
      where: {
        route: 'hosting'
      }
    });

    await Page.update({
      meta: '[{"name":"description","content":"Learn about our work and past missions."},{"property":"og:description","content":"Learn about our work and past missions."},{"property":"twitter:description","content":"Learn about our work and past missions."},{"property":"og:url","content":"http://Vitruvian.Tech/home/missions"}]'
    }, {
      where: {
        route: 'leadership'
      }
    });

    await Page.update({
      meta: '[{"name":"description","content":"Learn about our work and past missions."},{"property":"og:description","content":"Learn about our work and past missions."},{"property":"twitter:description","content":"Learn about our work and past missions."},{"property":"og:url","content":"http://Vitruvian.Tech/home/missions"}]'
    }, {
      where: {
        route: 'network'
      }
    });

    await Page.update({
      meta: '[{"name":"description","content":"Learn about our work and past missions."},{"property":"og:description","content":"Learn about our work and past missions."},{"property":"twitter:description","content":"Learn about our work and past missions."},{"property":"og:url","content":"http://Vitruvian.Tech/home/missions"}]'
    }, {
      where: {
        route: 'communications'
      }
    });

    await Page.update({
      meta: '[{"name":"description","content":"Learn about our work and past missions."},{"property":"og:description","content":"Learn about our work and past missions."},{"property":"twitter:description","content":"Learn about our work and past missions."},{"property":"og:url","content":"http://Vitruvian.Tech/home/missions"}]'
    }, {
      where: {
        route: 'headquarters'
      }
    });
  }
}
