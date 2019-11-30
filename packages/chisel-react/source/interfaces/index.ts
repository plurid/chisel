import themes from '@plurid/plurid-themes';



export interface ChiselNode {
    text: string;
}


export interface ChiselValue {
    nodes: ChiselNode[]
}


export interface ChiselProperties {
    value: ChiselValue;
    atChange: any;
    configuration?: ChiselConfiguration;
}


export interface ChiselConfiguration {
    theme: keyof typeof themes | ChiselConfigurationTheme;
}


export interface ChiselConfigurationTheme {
    general: keyof typeof themes;
    interaction: keyof typeof themes;
}
