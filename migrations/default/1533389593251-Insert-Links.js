import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Link} = getModels();

    await Link.create({
      href: 'https://fonts.googleapis.com/css?family=Fjalla+One',
      rel: 'stylesheet',
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
