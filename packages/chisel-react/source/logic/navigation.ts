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
        index,
        line,
        lines,
    } = currentLine;

    // console.log('cursor', cursor);
    // console.log('currentLine', currentLine);
    // console.log('lines', lines);
    // console.log('-----');

    switch (type) {
        case 'up':
            {
                if (lines.length === 1) {
                    return 0;
                }

                const previousLine = lines[line.index - 1];
                // console.log('previousLine', previousLine);
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

                // console.log('line.index', line.index);
                const nextLine = lines[line.index + 1];
                // console.log('nextLine', nextLine);
                if (!nextLine) {
                    return line.start + line.text.length;
                }

                const updatedCursor = nextLine.start + (cursor - line.start);
                // console.log('nextLine.start', nextLine.start);
                // console.log('cursor', cursor);
                // console.log('line.start', line.start);
                // console.log('nextLine.start', nextLine.start);
                // console.log('updatedCursor', updatedCursor);
                if (!nextLine.text[updatedCursor - nextLine.start]) {
                    // console.log('fooo');
                    return nextLine.start + nextLine.text.length + 1;
                }

                if (text.length < updatedCursor) {
                    // console.log('aaaa');
                    return text.length;
                }

                return updatedCursor;
            }
    }
}
