import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.update({
      content: 'Roman Inspired Software Designers'
    }, {
      where: {
        id: 243
      }
    });

    await MetaTag.update({
      content: 'Roman Inspired Software Designers'
    }, {
      where: {
        id: 248
      }
    });

    await MetaTag.update({
      content: 'Roman Inspired Software Designers'
    }, {
      where: {
        id: 259
      }
    });

    await MetaTag.update({
      content: 'Roman Inspired Software Designers'
    }, {
      where: {
        id: 262
      }
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.update({
      content: 'VitruvianTech - Sentient. Secure. Quality for All.'
    }, {
      where: {
        id: 243
      }
    });

    await MetaTag.update({
      content: 'VitruvianTech - Sentient. Secure. Quality for All.'
    }, {
      where: {
        id: 248
      }
    });

    await MetaTag.update({
      content: 'VitruvianTech - Sentient. Secure. Quality for All.'
    }, {
      where: {
        id: 259
      }
    });

    await MetaTag.update({
      content: 'VitruvianTech - Sentient. Secure. Quality for All.'
    }, {
      where: {
        id: 262
      }
    });
  }
}
