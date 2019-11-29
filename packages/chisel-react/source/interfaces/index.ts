export interface ChiselNode {
    text: string;
}

export interface ChiselValue {
    nodes: ChiselNode[]
}

export interface ChiselProperties {
    value: ChiselValue;
}
