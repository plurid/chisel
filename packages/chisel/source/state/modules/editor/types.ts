export const ADD_CURSOR = 'ADD_CURSOR';
export interface AddCursorAction {
    type: typeof ADD_CURSOR;
    payload: any;
}



export interface EditorState {
    cursors: any[];
}


export type EditorActionsType = AddCursorAction;
