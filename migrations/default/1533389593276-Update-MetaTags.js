import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Layout, MetaTag, Page} = getModels();

    const NAME = 'Fox Zero';
    const TITLE = 'Zero Latency Software Consultancy™';

    await Layout.update({
      title: `${NAME} · ${TITLE}`
    }, {
      where: { title: 'Fox Zero · High-Performance/Zero-Latency Consultancy™' }
    });

    await MetaTag.update({
      content: `${NAME} · ${TITLE}`
    }, {
      where: { value: 'name', key: 'itemprop' }
    });

    await MetaTag.update({
      content: TITLE
    }, {
      where: { value: 'og:title' }
    });

    await MetaTag.update({
      content: TITLE
    }, {
      where: { value: 'twitter:title' }
    });

    await MetaTag.update({
      content: TITLE
    }, {
      where: { value: 'twitter:image:alt' }
    });

    await MetaTag.update({
      content: 'Grand POOBear'
    }, {
      where: { value: 'og:site_name' }
    });

    await MetaTag.update({
      content: '@grandpoobear'
    }, {
      where: { value: 'og:site' }
    });

    await MetaTag.update({
      content: '@grandpoobear'
    }, {
      where: { value: 'og:creator' }
    });

    await MetaTag.update({
      content: '@grandpoobear'
    }, {
      where: { value: 'twitter:site' }
    });

    await MetaTag.update({
      content: '@grandpoobear'
    }, {
      where: { value: 'twitter:creator' }
    });

    await MetaTag.update({
      content: 'Grand POOBear'
    }, {
      where: { value: 'og:site_name' }
    });

    await Page.update({
      title: `${NAME} · ${TITLE}`
    }, {
      where: { route: '/' }
    });

    await Page.update({
      title: `${NAME} · ${TITLE}`
    }, {
      where: { route: 'home/:section' }
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
