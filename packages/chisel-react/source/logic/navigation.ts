import {
    getCurrentLine,
} from './lines';



export const moveCursorRow = (
    text: string,
    cursor: number,
    type: 'up' | 'down',
): number => {
    // console.log(text);
    const currentLine = getCurrentLine(text, cursor);
    if (!currentLine) {
        return cursor;
    }
    // console.log(currentLine);
    // console.log(currentLine.line);

    const {
        index,
        line,
        lines,
    } = currentLine;

    switch (type) {
        case 'up':
            {
                if (lines.length === 1) {
                    return 0;
                }

                const previousLine = lines[line.index - 1];
                if (!previousLine) {
                    return line.start;
                }

                const updatedCursor = previousLine.start + (cursor - line.start) - 1;
                if (!previousLine.text[updatedCursor - previousLine.start]) {
                    return previousLine.start + previousLine.text.length;
                }

                return updatedCursor;
            }
        case 'down':
            {
                if (lines.length === 1) {
                    return line.text.length;
                }

                const nextLine = lines[line.index + 1];
                console.log('nextLine', nextLine);
                if (!nextLine) {
                    return line.start + line.text.length;
                }

                const updatedCursor = nextLine.start + (cursor - line.start) + 1;
                console.log('updatedCursor', updatedCursor);
                if (!nextLine.text[updatedCursor - nextLine.start]) {
                    return nextLine.start + nextLine.text.length;
                }

                return updatedCursor;
            }
    }
}
