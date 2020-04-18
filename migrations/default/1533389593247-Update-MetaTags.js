import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.update({
      content: 'The Digital Special Forces™ for custom software and project management solutions. Based in NYC, we specialize in Project Management, Web/Software Development, Marketing, Design, Quality Assurance, IT/System Administration, and Content Production services.'
    }, {
      where: {
        key: 'name',
        value: 'description'
      }
    });

    await MetaTag.update({
      content: 'The Digital Special Forces™ for custom software and project management solutions. Based in NYC, we specialize in Project Management, Web/Software Development, Marketing, Design, Quality Assurance, IT/System Administration, and Content Production services.'
    }, {
      where: {
        key: 'property',
        value: 'og:description'
      }
    });

    await MetaTag.update({
      content: 'VitruvianTech, Vitruvian Tech, Vitruvian Technology, Vitruvian Technology Corp., Digital Special Forces, Long Island City, NYC, New York, BoilerplateJS™, Developemtn Platform, project management, tactical project management, custom software, web design, software development, web development, ui design, ux design, product design, marketing, seo, content production, information technology, quality assurance, system administration, vitruvian.tech, vitruvian-tech, VitruvianTechHQ, Peter C. Romano'
    }, {
      where: {
        key: 'name',
        value: 'keywords'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.update({
      content: 'The Digital Special Forces for custom software and marketing solutions. Based in NYC, Vitruvian Technology, Corp. specializes in Web/Software Development, Consulting, Project Management, Marketing, Design, QA, IT/System Administration, Content Production, and Data Science services.'
    }, {
      where: {
        key: 'name',
        value: 'description'
      }
    });

    await MetaTag.update({
      content: 'The Digital Special Forces for custom software and marketing solutions. Based in NYC, Vitruvian Technology, Corp. specializes in Web/Software Development, Consulting, Project Management, Marketing, Design, QA, IT/System Administration, Content Production, and Data Science services.'
    }, {
      where: {
        key: 'property',
        value: 'og:description'
      }
    });

    await MetaTag.update({
      content: 'VitruvianTech, Vitruvian Tech, Vitruvian Technology, Vitruvian Technology Corp., Long Island City, NYC, New York, Machete App Theming Platform, CMS, content management system, economical, custom, web development, web design, web, software, development, design, marketing, studio, production, sourcing, IT/system administration, security, investigatory, services, solutions, consulting, digital, special, forces, agency, digital special forces agency, VitruvianTechHQ, Peter C. Romano'
    }, {
      where: {
        key: 'name',
        value: 'keywords'
      }
    });
  }
}
