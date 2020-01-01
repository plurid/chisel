import React from 'react';

import themes from '@plurid/plurid-themes';



export interface ChiselValue {
    text: string;
    marks?: ChiselMark[];
}


export interface ChiselMark {
    start: number;
    length: number;
    type: any;
}


export interface ChiselProperties {
    value: ChiselValue;
    configuration?: ChiselConfiguration;
    enhancers?: ChiselEnhancer[];

    style?: React.CSSProperties;

    atChange(
        value: ChiselValue,
        event: React.KeyboardEvent<HTMLDivElement>,
    ): void;
}


export interface ChiselConfiguration {
    theme: keyof typeof themes | ChiselConfigurationTheme;
    enhanced: 'none' | 'standard' | 'advanced';
}


export interface ChiselConfigurationTheme {
    general: keyof typeof themes;
    interaction: keyof typeof themes;
}


export interface ChiselEnhancer {
    Component: any;
}
