export const getCurrentWord = (
    text: string,
    currentCursor: number,
) => {
    let start = currentCursor;
    let end = currentCursor;

    while (text[start - 1] && text[start] !== ' ') {
        start = start - 1;
    }

    while (text[end] && text[end] !== ' ') {
        end = end + 1;
    }

    return {
        start,
        end,
        length: end - start,
    };
}
