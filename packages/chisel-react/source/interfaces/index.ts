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

    style?: React.CSSProperties;

    atChange(
        event: React.KeyboardEvent<HTMLDivElement>,
        value: ChiselValue,
    ): void;
}


export interface ChiselConfiguration {
    theme: keyof typeof themes | ChiselConfigurationTheme;
}


export interface ChiselConfigurationTheme {
    general: keyof typeof themes;
    interaction: keyof typeof themes;
}
