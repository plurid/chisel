import {
    TextLine
} from '../../interfaces/internal';



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

        if (line.length === 0) {
            count += 1;
        } else {
            count += line.length + 1;
        }
    }

    return textLines;
}


export const getCurrentLine = (
    text: string,
    cursor: number,
) => {
    const textLines = computeLines(text);
    let count = 0;

    for (const [index, line] of textLines.entries()) {
        const chars = line.text.length === 0
            ? 1 + count
            : line.text.length + count;

        if (chars >= cursor) {
            return {
                index,
                line,
                lines: textLines,
            };
        }
        count += line.text.length == 0
            ? 1
            : line.text.length + 1;
    }

    if (cursor > count) {
        return {
            index: textLines[textLines.length - 1].index,
            line: textLines[textLines.length - 1],
            lines: textLines,
        };
    }

    return;
}
