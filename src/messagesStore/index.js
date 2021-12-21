import { registerStore } from '@wordpress/data';
import reducer from './reducer';
import * as actions from './actions';
import * as controls from './controls';
import * as resolvers from './resolvers';
import * as selectors from './selectors';

registerStore('ig-messages', {
  actions,
  reducer,
  selectors,
  controls,
  resolvers,
});
