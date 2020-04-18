const CREATE = '@fox-zero/gpb-web/Contact/CREATE';
const CREATE_SUCCESS = '@fox-zero/gpb-web/Contact/CREATE_SUCCESS';
const CREATE_FAIL = '@fox-zero/gpb-web/Contact/CREATE_FAIL';

const DESTROY = '@fox-zero/gpb-web/Contact/DESTROY';
const DESTROY_SUCCESS = '@fox-zero/gpb-web/Contact/DESTROY_SUCCESS';
const DESTROY_FAIL = '@fox-zero/gpb-web/Contact/DESTROY_FAIL';

const initialState = {
  current: null
};

export function create(contact) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: () => Promise.resolve(contact)
  };
}

export function destroy() {
  return {
    types: [DESTROY, DESTROY_SUCCESS, DESTROY_FAIL],
    promise: () => Promise.resolve()
  };
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_SUCCESS:
      return {
        current: action.result
      };
    case DESTROY_SUCCESS:
      return {
        ...state,
        current: null
      };
    default:
      return state;
  }
}