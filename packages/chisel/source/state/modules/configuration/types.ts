export const SET_CONFIGURATION = 'SET_CONFIGURATION';
export interface SetConfigurationAction {
    type: typeof SET_CONFIGURATION;
    payload: any;
}


export const SET_CONFIGURATION_THEME_GENERAL = 'SET_CONFIGURATION_THEME_GENERAL';
export interface SetConfigurationThemeGeneralAction {
    type: typeof SET_CONFIGURATION_THEME_GENERAL;
    payload: string;
}


export const SET_CONFIGURATION_THEME_INTERACTION = 'SET_CONFIGURATION_THEME_INTERACTION';
export interface SetConfigurationThemeInteractionAction {
    type: typeof SET_CONFIGURATION_THEME_INTERACTION;
    payload: string;
}



export interface ConfigurationState {
    theme: any;
}


export type ConfigurationActionsType = SetConfigurationAction
    | SetConfigurationThemeGeneralAction
    | SetConfigurationThemeInteractionAction;
