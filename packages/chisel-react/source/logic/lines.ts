export interface TextLine {
    index: number;
    start: number;
    text: string;
}



export const computeLines = (
    text: string,
): TextLine[] => {
    const lines = text.split('\n');
    const textLines: TextLine[] = [];
    let count = 0;

    for (const [index, line] of lines.entries()) {
        const textLine: TextLine = {
            index,
            start: count,
            text: line,
        };
        textLines.push(textLine);
        count += line.length;
    }

    return textLines;
}


export const getCurrentLine = (
    text: string,
    cursor: number,
) => {
    const textLines = computeLines(text);
    let count = 0;

    // console.log('cursor', cursor);

    for (const [index, line] of textLines.entries()) {
        // console.log(index, line);
        // console.log('-----');
        const chars = line.text.length + count;
        // console.log('chars', chars);
        if (chars + 1 >= cursor) {
            return {
                index,
                line,
                lines: textLines,
            };
        }
        count += line.text.length;
    }

    return;
}
