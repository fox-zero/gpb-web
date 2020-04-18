import _ from 'lodash';

const LOAD = '@fox-zero/gpb-web/Nav/LOAD';
const LOAD_SUCCESS = '@fox-zero/gpb-web/Nav/LOAD_SUCCESS';
const LOAD_FAIL = '@fox-zero/gpb-web/Nav/LOAD_FAIL';

const DISMISS = '@fox-zero/gpb-web/Nav/DISMISS';
const DISMISS_SUCCESS = '@fox-zero/gpb-web/Nav/DISMISS_SUCCESS';
const DISMISS_FAIL = '@fox-zero/gpb-web/Nav/DISMISS_FAIL';

const TOGGLE_CLASS = 'nav-open';

const close = () => {
  const body = document.body;
  const app = document.getElementById('app');
  const items = document.querySelectorAll('.nav nav ul > li');

  app.classList.remove(TOGGLE_CLASS, app.classList.contains(TOGGLE_CLASS));
  body.classList.remove(TOGGLE_CLASS, body.classList.contains(TOGGLE_CLASS));
  _.forEach(items, item => item.classList.remove('active'));
};

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: () => new Promise((resolve, reject) => {
      try {
        const body = document.body;
        const app = document.getElementById('app');
        const items = document.querySelectorAll('.nav nav ul > li');
        const links = document.querySelectorAll('.nav nav ul a');
        const isPortrait = () => window.innerHeight > window.innerWidth;

        _.forEach(links, link => link.addEventListener('click', () => {
          const item = link.parentNode;
          const isActive = item.classList.contains('active');

          // Remove active state for all items
          _.forEach(items, item => item.classList.remove('active'));

          if (item.querySelectorAll('ul').length) {
            // If item has a subnav, set nav `active` class
            app.classList.add(TOGGLE_CLASS);
            body.classList.add(TOGGLE_CLASS);
            item.classList[isActive ? 'remove' : 'add']('active');
          } else if (isPortrait()) {
            // If item has no subnav, unset nav `active` class
            app.classList.remove(TOGGLE_CLASS);
            body.classList.remove(TOGGLE_CLASS);
            item.classList.remove('active');
          }
        }));

        // Bind click event for toggle ("hamburger") button to toggle nav active state
        document.querySelector('.nav .toggle').addEventListener('click', e => {
          if (isPortrait()) {
            e.preventDefault();
            body.classList.toggle(TOGGLE_CLASS);
            app.classList.toggle(TOGGLE_CLASS);
            _.forEach(items, item => item.classList.remove('active'));
          }
        });

        document.querySelector('.nav').addEventListener('mouseenter', e => {
          if (!isPortrait()) {
            e.preventDefault();
            body.classList.add(TOGGLE_CLASS);
            app.classList.add(TOGGLE_CLASS);
          }
        });

        document.querySelector('.nav .nav').addEventListener('click', e => {
          if (isPortrait()) {
            e.preventDefault();
            body.classList.add(TOGGLE_CLASS);
            app.classList.add(TOGGLE_CLASS);
          }
        });

        document.querySelector('.nav').addEventListener('mouseleave', e => {
          if (!isPortrait()) {
            e.preventDefault();
            body.classList.remove(TOGGLE_CLASS);
            app.classList.remove(TOGGLE_CLASS);
            _.forEach(items, item => item.classList.remove('active'));
          }
        });

        setTimeout(() => {
          app.classList.add('nav-loaded');
          resolve({ loaded: true });
        }, 650);
      } catch (e) {
        reject(e);
      }
    })
  };
}

export function dismiss() {
  return {
    types: [DISMISS, DISMISS_SUCCESS, DISMISS_FAIL],
    promise: () => new Promise(resolve => {
      close();
      resolve();
    })
  };
}

export default (state = {}, action = {}) => {
  switch (action.type) {
    case LOAD_SUCCESS:
      return Object.assign(state, action.result);
    case LOAD_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        error: action.error
      } : state;
    default:
      return state;
  }
};
