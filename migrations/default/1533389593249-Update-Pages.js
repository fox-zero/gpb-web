import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page, Layout} = getModels();

    await Layout.update({
      title: 'FoxZero Media - FoxZero™'
    }, {
      where: {
        title: 'VitruvianTech'
      }
    });

    await Page.update({
      title: 'FoxZero Media - FoxZero™'
    }, {
      where: {
        route: '/'
      }
    });

    await Page.update({
      title: 'FoxZero Media - FoxZero™'
    }, {
      where: {
        route: 'home(/:section)'
      }
    });

    await Page.update({
      title: 'Nope! - FoxZero™'
    }, {
      where: {
        route: '*'
      }
    });

    await Page.update({
      title: 'Contact - FoxZero™',
      meta: '[{"name":"description","content":"Connect with us today, so we can start building your dream project."},{"property":"og:description","content":"Connect with us today, so we can start building your dream project."},{"property":"twitter:description","content":"Connect with us today, so we can start building your dream project."},{"property":"og:url","content":"http://foxzero.io/communications"}]'
    }, {
      where: {
        route: 'communications'
      }
    });

    await Page.update({
      title: 'Office - FoxZero™',
      meta: '[{"name":"description","content":"We operate globally, but our heart is in NYC, based in booming Long Island City."},{"property":"og:description","content":"We operate globally, but our heart is in NYC, based in booming Long Island City."},{"property":"twitter:description","content":"We operate globally, but our heart is in NYC, based in booming Long Island City."},{"property":"og:url","content":"http://foxzero.io/headquarters"}]'
    }, {
      where: {
        route: 'headquarters'
      }
    });

    await Page.update({
      title: 'Hosting - FoxZero™',
      meta: '[{"name":"description","content":"Learn about our hosting packages."},{"property":"og:description","content":"Learn about our hosting packages."},{"property":"twitter:description","content":"Learn about our hosting packages."},{"property":"og:url","content":"http://foxzero.io/hosting"}]'
    }, {
      where: {
        route: 'hosting'
      }
    });

    await Page.update({
      title: 'Who We Are - FoxZero™',
      meta: '[{"name":"description","content":"Learn about who we are, and our message."},{"property":"og:description","content":"Learn about who we are, and our message."},{"property":"twitter:description","content":"Learn about who we are, and our message."},{"property":"og:url","content":"http://foxzero.io/leadership"}]'
    }, {
      where: {
        route: 'leadership'
      }
    });

    await Page.update({
      title: 'Work - FoxZero™',
      meta: '[{"name":"description","content":"Learn about our work and past missions."},{"property":"og:description","content":"Learn about our work and past missions."},{"property":"twitter:description","content":"Learn about our work and past missions."},{"property":"og:url","content":"http://foxzero.io/missions"}]'
    }, {
      where: {
        route: 'missions'
      }
    });

    await Page.update({
      title: 'Partners - FoxZero™',
      meta: '[{"name":"description","content":"Wanna be a part of the FoxZero™ family? Check out our partners and come join us in our mission."},{"property":"og:description","content":"Wanna be a part of the FoxZero™ family? Check out our partners and come join us in our mission."},{"property":"twitter:description","content":"Wanna be a part of the FoxZero™ family? Check out our partners and come join us in our mission."},{"property":"og:url","content":"http://foxzero.io/network"}]'
    }, {
      where: {
        route: 'network'
      }
    });

    await Page.update({
      title: 'Plans - FoxZero™',
      meta: '[{"name":"description","content":"Learn about our flexible plans and economical product offerings."},{"property":"og:description","content":"Learn about our flexible plans and economical product offerings."},{"property":"twitter:description","content":"Learn about our flexible plans and economical product offerings."},{"property":"og:url","content":"http://foxzero.io/plans"}]'
    }, {
      where: {
        route: 'plans'
      }
    });

    await Page.update({
      title: 'Pricing - FoxZero™',
      meta: '[{"name":"description","content":"With a distributed workforce, our rates are more affordable than leading competitors."},{"property":"og:description","content":"With a distributed workforce, our rates are more affordable than leading competitors."},{"property":"twitter:description","content":"With a distributed workforce, our rates are more affordable than leading competitors."},{"property":"og:url","content":"http://foxzero.io/rates"}]'
    }, {
      where: {
        route: 'rates'
      }
    });

    await Page.update({
      title: 'Services - FoxZero™',
      meta: '[{"name":"description","content":"Dreaming of a project or app to put you on the map? Make your digital dream a reality with AIM\'s guaranteed software, design, innovation, and marketing services. Whether simple or complex, FoxZero™ for the best."},{"property":"og:description","content":"Dreaming of a project or app to put you on the map? Make your digital dream a reality with AIM\'s guaranteed software, design, innovation, and marketing services. Whether simple or complex, FoxZero™ for the best."},{"property":"twitter:description","content":"Dreaming of a project or app to put you on the map? Make your digital dream a reality with AIM\'s guaranteed software, design, innovation, and marketing services. Whether simple or complex, FoxZero™ for the best."},{"property":"og:url","content":"http://foxzero.io/services"}]'
    }, {
      where: {
        route: 'services'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
