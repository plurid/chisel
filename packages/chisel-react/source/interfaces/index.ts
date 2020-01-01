import React from 'react';

import themes from '@plurid/plurid-themes';



export interface ChiselNode {
    type?: 'paragraph' | 'heading';
    text: string;
}


export interface ChiselValue {
    nodes: ChiselNode[];
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
}


export interface ChiselConfigurationTheme {
    general: keyof typeof themes;
    interaction: keyof typeof themes;
}


export interface ChiselEnhancer {
    Component: any;
}
