export interface Cursor {
    index: number;
}


export interface InternalCursor extends Cursor {
    editor: boolean;
}


export interface ExternalCursor extends Cursor {
    owner: string;
}


export interface TextLine {
    index: number;
    start: number;
    text: string;
}
