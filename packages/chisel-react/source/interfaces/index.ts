import themes from '@plurid/plurid-themes';



export interface ChiselNode {
    type: 'paragraph' | 'heading';
    text: string;
}


export interface ChiselValue {
    nodes: ChiselNode[];
}


export interface ChiselProperties {
    value: ChiselValue;
    configuration?: ChiselConfiguration;
    atChange(event: React.KeyboardEvent<HTMLDivElement>, value: string): void;
}


export interface ChiselConfiguration {
    theme: keyof typeof themes | ChiselConfigurationTheme;
}


export interface ChiselConfigurationTheme {
    general: keyof typeof themes;
    interaction: keyof typeof themes;
}
