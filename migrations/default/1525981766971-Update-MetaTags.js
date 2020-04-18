import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.update({
      content: 'index,follow,noodp,noydir'
    }, {
      where: {
        key: 'name',
        value: 'robots'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.update({
      content: 'index,follow'
    }, {
      where: {
        key: 'name',
        value: 'robots'
      }
    });
  }
}
