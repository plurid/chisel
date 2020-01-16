import {
    getCurrentLine,
} from './lines';



export const moveCursorRow = (
    text: string,
    cursor: number,
    type: 'up' | 'down',
): number => {
    const currentLine = getCurrentLine(text, cursor);
    if (!currentLine) {
        return cursor;
    }

    const {
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

                const updatedCursor = previousLine.start + (cursor - line.start);
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
                if (!nextLine) {
                    return line.start + line.text.length;
                }

                const updatedCursor = nextLine.start + (cursor - line.start);
                if (!nextLine.text[updatedCursor - nextLine.start]) {
                    return nextLine.start + nextLine.text.length;
                }

                if (text.length < updatedCursor) {
                    return text.length;
                }

                return updatedCursor;
            }
    }
}
