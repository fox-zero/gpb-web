const OPEN = '@fox-zero/gpb-web/Solution/OPEN';
const OPEN_SUCCESS = '@fox-zero/gpb-web/Solution/OPEN_SUCCESS';
const OPEN_FAIL = '@fox-zero/gpb-web/Solution/OPEN_FAIL';

const CLOSE = '@fox-zero/gpb-web/Solution/CLOSE';
const CLOSE_SUCCESS = '@fox-zero/gpb-web/Solution/CLOSE_SUCCESS';
const CLOSE_FAIL = '@fox-zero/gpb-web/Solution/CLOSE_FAIL';

const initialState = {
  current: null
};

export function open(solution) {
  return {
    types: [OPEN, OPEN_SUCCESS, OPEN_FAIL],
    promise: () => Promise.resolve(solution)
  };
}

export function close() {
  return {
    types: [CLOSE, CLOSE_SUCCESS, CLOSE_FAIL],
    promise: () => Promise.resolve()
  };
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case OPEN_SUCCESS:
      return {
        ...state,
        current: action.result
      };
    case CLOSE_SUCCESS:
      return {
        ...state,
        current: null
      };
    default:
      return state;
  }
}