import { combineReducers } from 'redux';

import configuration from './modules/configuration/reducers';
import shortcuts from './modules/shortcuts/reducers';
import themes from './modules/themes/reducers';



const rootReducer = combineReducers({
    configuration,
    shortcuts,
    themes,
});


export default rootReducer;
