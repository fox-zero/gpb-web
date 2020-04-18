import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.update({
      content: 'The Digital Special Forces for custom software and marketing solutions. Based in NYC, VitruvianTech specializes in Consulting, Project Management, Web/Software Development, Marketing, Design, QA, IT/System Administration, Content Production, and Data Science services.'
    }, {
      where: {
        key: 'name',
        value: 'description'
      }
    });

    await MetaTag.update({
      content: 'The Digital Special Forces for custom software and marketing solutions. Based in NYC, VitruvianTech specializes in Consulting, Project Management, Web/Software Development, Marketing, Design, QA, IT/System Administration, Content Production, and Data Science services.'
    }, {
      where: {
        key: 'property',
        value: 'og:description'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.update({
      content: 'The Digital Special Forces for custom software and marketing solutions. Based in NYC, Vitruvian Technology, Corp. specializes in Web/Software Development, Marketing, Design, QA, Studio Production, Sourcing, IT/System Administration, Security, and Investigatory services.'
    }, {
      where: {
        key: 'name',
        value: 'description'
      }
    });

    await MetaTag.update({
      content: 'The Digital Special Forces for custom software and marketing solutions. Based in NYC, Vitruvian Technology, Corp. specializes in Web/Software Development, Marketing, Design, QA, Studio Production, Sourcing, IT/System Administration, Security, and Investigatory services.'
    }, {
      where: {
        key: 'property',
        value: 'og:description'
      }
    });
  }
}
