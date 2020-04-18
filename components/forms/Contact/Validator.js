import memoize from 'lru-memoize';
import {createValidator, required, email} from '@boilerplatejs/core/lib/Validator';

export default memoize(10)(createValidator({
  firstName: [required],
  email: [required, value => email(value) && 'Invalid address']
}));
