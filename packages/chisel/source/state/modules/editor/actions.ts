import {
    ADD_CURSOR,
    AddCursorAction,
} from './types';



export const addCursor = (payload: any): AddCursorAction => {
    return {
        type: ADD_CURSOR,
        payload,
    };
}
