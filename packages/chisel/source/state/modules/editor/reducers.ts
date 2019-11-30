import {
    ADD_CURSOR,

    EditorState,
    EditorActionsType,
} from './types';



const initialState: EditorState = {
    cursors: [],
}

const themesReducer = (
    state: EditorState = initialState,
    action: EditorActionsType,
): EditorState => {
    switch(action.type) {
        case ADD_CURSOR:
            return {
                ...state,
                cursors: [
                    ...state.cursors,
                    {...action.payload},
                ],
            };
        default:
            return state;
    }
}


export default themesReducer;
