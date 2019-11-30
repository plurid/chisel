import {
    SET_CONFIGURATION,

    SET_CONFIGURATION_THEME_GENERAL,
    SET_CONFIGURATION_THEME_INTERACTION,

    ConfigurationState,
    ConfigurationActionsType,
} from './types';



const initialState: ConfigurationState = {
    theme: 'plurid',
}

const configurationReducer = (
    state: ConfigurationState = initialState,
    action: ConfigurationActionsType,
): ConfigurationState => {
    switch(action.type) {
        case SET_CONFIGURATION:
            return {
                ...state,
                ...action.payload,
            };
        case SET_CONFIGURATION_THEME_GENERAL:
            {
                const updatedTheme = {
                    general: action.payload,
                    interaction: typeof state.theme === 'object'
                        ? state.theme.interaction
                        : 'plurid',
                }

                return {
                    ...state,
                    theme: updatedTheme,
                };
            }
        case SET_CONFIGURATION_THEME_INTERACTION:
            {
                const updatedTheme = {
                    general: typeof state.theme === 'object'
                        ? state.theme.general
                        : 'plurid',
                    interaction: action.payload,
                }

                return {
                    ...state,
                    theme: updatedTheme,
                };
            }
        default:
            return {
                ...state,
            };
    }
}


export default configurationReducer;
