import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Link} = getModels();

    await Link.update({
      href: '/@fox-zero/gpb-web/images/favicon.png'
    }, {
      where: {
        rel: 'shortcut icon'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {Link} = getModels();

    await Link.update({
      href: '/@boilerplatejs/core/images/favicon.png'
    }, {
      where: {
        rel: 'shortcut icon'
      }
    });
  }
}
