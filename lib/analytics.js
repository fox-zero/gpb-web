import {Category} from '@boilerplatejs/core/lib/GoogleAnalytics';

export const Section = new Category('Section', [
  { actions: ['Click'] },
  { component: 'Navigation', actions: ['Click'] },
  { component: 'Footer', actions: ['Click'] },
  { component: 'Header', actions: ['Impression', 'Click'] },
  { component: 'Page', actions: ['Impression', 'Click'] },
  { component: 'Detail', actions: ['Impression'] }
]);

export const Form = new Category('Form', [
  { component: 'Page', actions: ['Impression', 'Click', 'Submission', 'Success', 'Failure'] },
  { component: 'Detail', actions: ['Submission', 'Success', 'Failure'] },
  { component: 'Contact', actions: ['Submission', 'Success', 'Failure'] }
]);

export const Confirmation = new Category('Confirmation', [
  { component: 'Page', actions: ['Impression', 'Booking', 'Share', 'Reset'] },
  { component: 'Detail', actions: ['Impression', 'Booking', 'Share', 'Reset'] },
  { component: 'Contact', actions: ['Impression', 'Booking', 'Share', 'Reset'] }
]);