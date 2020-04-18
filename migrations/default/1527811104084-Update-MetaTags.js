import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.update({
      content: 'https://s3.amazonaws.com/vitruvian-tech/cover.jpg'
    }, {
      where: {
        key: 'property',
        value: 'og:image:secure_url',
        content: 'https://vitruvian.tech/@fox-zero/gpb-web/images/cover.jpg'
      }
    });

    await MetaTag.update({
      content: 'https://s3.amazonaws.com/vitruvian-tech/cover.jpg'
    }, {
      where: {
        key: 'property',
        value: 'og:image',
        content: 'https://vitruvian.tech/@fox-zero/gpb-web/images/cover.jpg'
      }
    });

    await MetaTag.update({
      content: 'https://s3.amazonaws.com/vitruvian-tech/cover.jpg'
    }, {
      where: {
        key: 'property',
        value: 'twitter:image',
        content: 'https://vitruvian.tech/@fox-zero/gpb-web/images/cover.jpg'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {MetaTag} = getModels();

    await MetaTag.update({
      content: 'https://vitruvian.tech/@fox-zero/gpb-web/images/cover.jpg'
    }, {
      where: {
        key: 'property',
        value: 'og:image:secure_url',
        content: 'https://s3.amazonaws.com/vitruvian-tech/cover.jpg'
      }
    });

    await MetaTag.update({
      content: 'https://vitruvian.tech/@fox-zero/gpb-web/images/cover.jpg'
    }, {
      where: {
        key: 'property',
        value: 'og:image',
        content: 'https://s3.amazonaws.com/vitruvian-tech/cover.jpg'
      }
    });

    await MetaTag.update({
      content: 'https://vitruvian.tech/@fox-zero/gpb-web/images/cover.jpg'
    }, {
      where: {
        key: 'property',
        value: 'twitter:image',
        content: 'https://s3.amazonaws.com/vitruvian-tech/cover.jpg'
      }
    });
  }
}
