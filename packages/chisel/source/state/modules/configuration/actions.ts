import {
    SetConfigurationAction,
    SET_CONFIGURATION,

    SET_CONFIGURATION_THEME_GENERAL,
    SetConfigurationThemeGeneralAction,
    SET_CONFIGURATION_THEME_INTERACTION,
    SetConfigurationThemeInteractionAction,
} from './types';



export const setConfiguration = (payload: any): SetConfigurationAction => {
    return {
        type: SET_CONFIGURATION,
        payload,
    };
}


export const setConfigurationThemeGeneralAction = (
    payload: string,
): SetConfigurationThemeGeneralAction => {
    return {
        type: SET_CONFIGURATION_THEME_GENERAL,
        payload,
    };
}


export const setConfigurationThemeInteractionAction = (
    payload: string,
): SetConfigurationThemeInteractionAction => {
    return {
        type: SET_CONFIGURATION_THEME_INTERACTION,
        payload,
    };
}
