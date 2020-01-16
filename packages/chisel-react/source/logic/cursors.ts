import {
    InternalCursor,
} from '../interfaces/internal';



export const updateCursors = (
    internalCursors: InternalCursor[],
    text: string,
    step: number,
): InternalCursor[] => {


    return [...internalCursors];
}


export const addNewCursor = (
    cursorLocation: number,
    internalCursors: InternalCursor[],
): InternalCursor[] => {
    const newCursor: InternalCursor = {
        index: cursorLocation,
        editor: true,
    };

    return [
        ...internalCursors,
        newCursor,
    ];
}


export const setSingleCursor = (
    cursorLocation: number,
): InternalCursor[] => {
    return addNewCursor(cursorLocation, []);
}
