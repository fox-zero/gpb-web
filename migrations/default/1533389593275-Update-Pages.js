import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    let route, section, title, description, image;
    const {Page} = getModels();

    const NAME = 'Fox Zero™';
    const SITE = 'https://foxzero.io';

    route = 'consulting';
    section = 'Consulting';
    title = '100% Power Every Hour';
    description = 'Each of our software consultants is expertly trained in both management and development of digital transformation, and operate off-site - limiting the need for individual roles, maximizing value per every hour worked.';
    image = 'https://s3.amazonaws.com/content.foxzero.io/2333b821b9104bb2ac0d62e38d7dbb97.jpg';

    await Page.update({
      meta: JSON.stringify([
        { property: 'og:url', content: `${SITE}/${route}` },
        { property: 'og:image:secure_url', content: image },
        { property: 'og:image', content: image },
        { property: 'twitter:image', content: image },
        { property: 'twitter:image:alt', content: `${title} · ${section}` },
        { itemprop: 'name', content: `${NAME} · ${title} · ${section}` },
        { property: 'og:title', content: `${title} · ${section}` },
        { property: 'twitter:title', content: `${title} · ${section}` },
        { name: 'description', content: description },
        { itemprop: 'description', content: description },
        { property: 'og:description', content: description },
        { property: 'twitter:description', content: description },
      ])
    }, {
      where: { route }
    });

    route = 'development';
    section = 'Development';
    title = 'Full Service Digital Agency';
    description = 'With a focus on UX, we offer warrantied agency services to fully manage digital client products from conception and design, to development, testing and hosting, for the goal of rapid production and time to market.';
    image = 'https://s3.amazonaws.com/content.foxzero.io/b08c0d15bb08409cb6a9b7cad20e10d2.png';

    await Page.update({
      meta: JSON.stringify([
        { property: 'og:url', content: `${SITE}/${route}` },
        { property: 'og:image:secure_url', content: image },
        { property: 'og:image', content: image },
        { property: 'twitter:image', content: image },
        { property: 'twitter:image:alt', content: `${title} · ${section}` },
        { itemprop: 'name', content: `${NAME} · ${title} · ${section}` },
        { property: 'og:title', content: `${title} · ${section}` },
        { property: 'twitter:title', content: `${title} · ${section}` },
        { name: 'description', content: description },
        { itemprop: 'description', content: description },
        { property: 'og:description', content: description },
        { property: 'twitter:description', content: description },
      ])
    }, {
      where: { route }
    });

    route = 'strategy';
    section = 'Strategy';
    title = 'Introducing FAST™ PLM';
    description = 'Our FAST™ production framework uses an incremental 3-phased lifecycle strategy to manage multiple projects and programs, relying on real-time processes and versatile consultants to lower feedback latency and cost.';
    image = 'https://s3.amazonaws.com/content.foxzero.io/fd561bcc988d4fca849d74b8f812e82a.jpg';

    await Page.update({
      meta: JSON.stringify([
        { property: 'og:url', content: `${SITE}/${route}` },
        { property: 'og:image:secure_url', content: image },
        { property: 'og:image', content: image },
        { property: 'twitter:image', content: image },
        { property: 'twitter:image:alt', content: `${title} · ${section}` },
        { itemprop: 'name', content: `${NAME} · ${title} · ${section}` },
        { property: 'og:title', content: `${title} · ${section}` },
        { property: 'twitter:title', content: `${title} · ${section}` },
        { name: 'description', content: description },
        { itemprop: 'description', content: description },
        { property: 'og:description', content: description },
        { property: 'twitter:description', content: description },
      ])
    }, {
      where: { route }
    });

    route = 'portfolio';
    section = 'Portfolio';
    title = 'Target Verticals & Applications';
    description = 'Exclusively within private and government sectors, clients have historically been VC-backed start-ups, SME, and Fortune 500 companies requiring greenfield software development, integration, or digital transformation.';
    image = 'https://s3.amazonaws.com/content.foxzero.io/27a51da50140413ca0de9c44d98f510f.jpg';

    await Page.update({
      meta: JSON.stringify([
        { property: 'og:url', content: `${SITE}/${route}` },
        { property: 'og:image:secure_url', content: image },
        { property: 'og:image', content: image },
        { property: 'twitter:image', content: image },
        { property: 'twitter:image:alt', content: `${title} · ${section}` },
        { itemprop: 'name', content: `${NAME} · ${title} · ${section}` },
        { property: 'og:title', content: `${title} · ${section}` },
        { property: 'twitter:title', content: `${title} · ${section}` },
        { name: 'description', content: description },
        { itemprop: 'description', content: description },
        { property: 'og:description', content: description },
        { property: 'twitter:description', content: description },
      ])
    }, {
      where: { route }
    });

    route = 'warranty';
    section = 'Warranty';
    title = 'Wingman™ Surety Coverage';
    description = 'Development projects are Wingman™ bonded up to 25% of the total project price to guarantee minimum risk of delivery time, budget, and quality, valid from kick-off until 120 days after release acceptance.';
    image = 'https://s3.amazonaws.com/content.foxzero.io/218eca8dcd514c6f8aa35e8f7aa27318.jpg';

    await Page.update({
      meta: JSON.stringify([
        { property: 'og:url', content: `${SITE}/${route}` },
        { property: 'og:image:secure_url', content: image },
        { property: 'og:image', content: image },
        { property: 'twitter:image', content: image },
        { property: 'twitter:image:alt', content: `${title} · ${section}` },
        { itemprop: 'name', content: `${NAME} · ${title} · ${section}` },
        { property: 'og:title', content: `${title} · ${section}` },
        { property: 'twitter:title', content: `${title} · ${section}` },
        { name: 'description', content: description },
        { itemprop: 'description', content: description },
        { property: 'og:description', content: description },
        { property: 'twitter:description', content: description },
      ])
    }, {
      where: { route }
    });

    route = 'subscription';
    section = 'Subscription';
    title = 'Velocity™ Plan Pricing';
    description = 'Reduce billing overhead while increasing team morale and project success with our Velocity™ pricing. Fixed teams of versatile full-stack seniors and juniors are curated to 3 monthly subscription plans for maximum value.';
    image = 'https://s3.amazonaws.com/content.foxzero.io/7d11051f875d4ff59496386500739afe.jpg';

    await Page.update({
      meta: JSON.stringify([
        { property: 'og:url', content: `${SITE}/${route}` },
        { property: 'og:image:secure_url', content: image },
        { property: 'og:image', content: image },
        { property: 'twitter:image', content: image },
        { property: 'twitter:image:alt', content: `${title} · ${section}` },
        { itemprop: 'name', content: `${NAME} · ${title} · ${section}` },
        { property: 'og:title', content: `${title} · ${section}` },
        { property: 'twitter:title', content: `${title} · ${section}` },
        { name: 'description', content: description },
        { itemprop: 'description', content: description },
        { property: 'og:description', content: description },
        { property: 'twitter:description', content: description },
      ])
    }, {
      where: { route }
    });

    route = 'on-demand';
    section = 'On Demand';
    title = 'Point & Pay™ Sprint Pricing';
    description = "Need help fast? Activate any of our senior partners at any time with our Point & Pay™ pricing. Plan a sprint, estimate story points with us, pay for each consultant's estimated point before sprint kick-off, and get stuff done.";
    image = 'https://s3.amazonaws.com/content.foxzero.io/6fae639325ce4ebcb766ef7881860bb6.jpg';

    await Page.update({
      meta: JSON.stringify([
        { property: 'og:url', content: `${SITE}/${route}` },
        { property: 'og:image:secure_url', content: image },
        { property: 'og:image', content: image },
        { property: 'twitter:image', content: image },
        { property: 'twitter:image:alt', content: `${title} · ${section}` },
        { itemprop: 'name', content: `${NAME} · ${title} · ${section}` },
        { property: 'og:title', content: `${title} · ${section}` },
        { property: 'twitter:title', content: `${title} · ${section}` },
        { name: 'description', content: description },
        { itemprop: 'description', content: description },
        { property: 'og:description', content: description },
        { property: 'twitter:description', content: description },
      ])
    }, {
      where: { route }
    });

    route = 'maintenance';
    section = 'Maintenance';
    title = 'Hosting, LTS, Monitoring';
    description = "We offer secure hosting, monitoring, and LTS maintenance for a 25% fee of cost as curated SLA arrangements after project release, and as material costs during development, managed by our certified cloud consultants.";
    image = 'https://s3.amazonaws.com/content.foxzero.io/04dd9f5bc99e4ea59b41d48a83690cb3.jpg';

    await Page.update({
      meta: JSON.stringify([
        { property: 'og:url', content: `${SITE}/${route}` },
        { property: 'og:image:secure_url', content: image },
        { property: 'og:image', content: image },
        { property: 'twitter:image', content: image },
        { property: 'twitter:image:alt', content: `${title} · ${section}` },
        { itemprop: 'name', content: `${NAME} · ${title} · ${section}` },
        { property: 'og:title', content: `${title} · ${section}` },
        { property: 'twitter:title', content: `${title} · ${section}` },
        { name: 'description', content: description },
        { itemprop: 'description', content: description },
        { property: 'og:description', content: description },
        { property: 'twitter:description', content: description },
      ])
    }, {
      where: { route }
    });
  }

  static async down(models, sequelize, DataTypes) {}
}
