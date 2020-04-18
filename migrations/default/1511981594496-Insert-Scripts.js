import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Script} = getModels();

    await Script.create({
      content: 'https://use.typekit.net/ftk6yva.js'
    });

    await Script.create({
      content: 'try{Typekit.load({ async: false });}catch(e){}',
      external: false
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {Script} = getModels();

    await Script.destroy({
      where: {
        content: 'https://use.typekit.net/ftk6yva.js'
      }
    });

    await Script.destroy({
      where: {
        content: 'try{Typekit.load({ async: false });}catch(e){}',
        external: false
      }
    });
  }
}
