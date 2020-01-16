import React, {
    useRef,
    useState,
    useEffect,
} from 'react';

import {
    PieceTable,
} from '@plurid/chisel';

import themes from '@plurid/plurid-themes';

import {
    StyledChisel,
    StyledCaret,
} from './styled';

import {
    ChiselProperties,
    ChiselValue,
    // ChiselMark,
} from '../../interfaces';

import {
    getSelectionCaretAndLine,
} from '../../utilities';




export interface TextLine {
    index: number;
    start: number;
    text: string;
}


const useForceUpdate = () => {
    const [_, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

const getPastedText = (
    event: React.ClipboardEvent<HTMLDivElement>,
) => {
    return event.clipboardData.getData('text');
}

const getCurrentWord = (
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


const computeLines = (
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

const getCurrentLine = (
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

const moveCursorRow = (
    text: string,
    cursor: number,
    type: 'up' | 'down',
): number => {
    console.log(text);
    const currentLine = getCurrentLine(text, cursor);
    if (!currentLine) {
        return cursor;
    }
    console.log(currentLine);
    console.log(currentLine.line);

    const {
        index,
        line,
        lines,
    } = currentLine;

    switch (type) {
        case 'up':
            {
                if (lines.length === 1) {
                    return cursor - 1;
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
                    return cursor + 1;
                }

                const nextLine = lines[line.index + 1];
                if (!nextLine) {
                    return line.start + line.text.length;
                }

                const updatedCursor = nextLine.start + (cursor - line.start) + 1;
                if (!nextLine.text[updatedCursor - nextLine.start]) {
                    return nextLine.start + nextLine.text.length;
                }

                return updatedCursor;
            }
    }
}


const Chisel: React.FC<ChiselProperties> = (properties) => {
    const editor = useRef<HTMLDivElement>(null);
    const pieceTable = useRef(new PieceTable(''));
    const cursor = useRef(0);
    const lines = useRef(1);

    const forceUpdate = useForceUpdate();

    const {
        value,
        atChange,
        configuration,
        // enhancers,
        style,
    } = properties;

    const {
        text: initialText,
        // marks,
    } = value;

    const [text, setText] = useState('');

    const [theme, seTheme] = useState(themes.plurid);


    const checkForUnpreventableKeys = (
        event: React.KeyboardEvent<HTMLDivElement>,
    ): boolean => {
        // Check for Cut.
        if (
            event.key === 'x' &&
            (event.ctrlKey || event.metaKey)
        ) {
            return true;
        }

        // Check for Copy.
        if (
            event.key === 'c' &&
            (event.ctrlKey || event.metaKey)
        ) {
            return true;
        }

        // Check for Paste.
        if (
            event.key === 'v' &&
            (event.ctrlKey || event.metaKey)
        ) {
            return true;
        }

        // Check for Refresh.
        if (
            event.key === 'r' &&
            (event.ctrlKey || event.metaKey)
        ) {
            return true;
        }

        // Check for Selection.
        if (
            event.key === 'a' &&
            (event.ctrlKey || event.metaKey)
        ) {
            return true;
        }

        // Check for Tab Close.
        if (
            event.key === 'w' &&
            (event.ctrlKey || event.metaKey)
        ) {
            return true;
        }

        return false;
    }

    const alterCursorAndSetText = (
        cursorStep: number,
    ) => {
        // console.log('cursor prev', cursor.current);
        cursor.current += cursorStep;
        // console.log('cursor now', cursor.current);
        setText(pieceTable.current.getSequence());
    }

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLDivElement>,
    ) => {
        if (checkForUnpreventableKeys(event)) {
            return;
        }

        event.preventDefault();

        const printableKey = event.key.length === 1;
        if (printableKey) {
            // console.log(cursor.current);
            pieceTable.current.insert(event.key, cursor.current);
            alterCursorAndSetText(1);
        }

        if (event.key === 'Backspace' && !event.shiftKey) {
            if (cursor.current > 0) {
                pieceTable.current.delete(cursor.current - 1, 1);

                alterCursorAndSetText(-1);
            }
        }

        if (event.key === 'Backspace' && event.shiftKey) {
            if (cursor.current > 0) {
                const currentWord = getCurrentWord(pieceTable.current.getSequence(), cursor.current);

                pieceTable.current.delete(currentWord.start, currentWord.length);

                cursor.current = currentWord.start;
                setText(pieceTable.current.getSequence());
            }
        }

        if (event.key === 'Delete') {
            const text = pieceTable.current.getSequence();

            if (text[cursor.current]) {
                pieceTable.current.delete(cursor.current, 1);

                alterCursorAndSetText(0);
            }
        }

        if (event.key === 'ArrowLeft') {
            const text = pieceTable.current.getSequence();

            if (text[cursor.current - 1]) {
                cursor.current -= 1;
                forceUpdate();
            }
        }

        if (event.key === 'ArrowRight') {
            const text = pieceTable.current.getSequence();

            if (text[cursor.current]) {
                cursor.current += 1;
                forceUpdate();
            }
        }

        if (event.key === 'ArrowUp') {
            const text = pieceTable.current.getSequence();
            const updatedCursor = moveCursorRow(text, cursor.current, 'up');
            cursor.current = updatedCursor;
            forceUpdate();
        }

        if (event.key === 'ArrowDown') {
            const text = pieceTable.current.getSequence();
            const updatedCursor = moveCursorRow(text, cursor.current, 'down');
            cursor.current = updatedCursor;
            forceUpdate();
        }

        if (event.key === 'Tab') {
            pieceTable.current.insert('    ', cursor.current);
            alterCursorAndSetText(4);
        }

        if (event.key === 'Enter') {
            pieceTable.current.insert('\n', cursor.current);

            alterCursorAndSetText(1);
        }
    }

    const handleKeyUp = (
        event: React.KeyboardEvent<HTMLDivElement>,
    ) => {
        const text = pieceTable.current.getSequence();
        const value: ChiselValue = {
            text,
            marks: [],
        };
        atChange(value, event);
    }

    const handleClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        const selection = getSelectionCaretAndLine(editor.current);

        if (selection) {
            // console.log('selection', selection);
            const text = pieceTable.current.getSequence();

            if (text[selection.caret]) {
                cursor.current = selection.caret;
            } else {
                cursor.current = text.length;
            }
            forceUpdate();
        }
    }

    const handlePaste = (
        event: React.ClipboardEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();
        const pastedText = getPastedText(event);
        const pastedTextLength = pastedText.length;
        pieceTable.current.insert(pastedText, cursor.current);
        cursor.current += pastedTextLength;
        setText(pieceTable.current.getSequence());
    }

    /** Handle Configuration */
    useEffect(() => {
        if (configuration) {
            if (
                typeof configuration.theme === 'string'
                && themes[configuration.theme]
            ) {
                seTheme(themes[configuration.theme]);
            }
        }
    }, [
        configuration,
    ]);

    /** Handle Initial Text */
    useEffect(() => {
        if (initialText) {
            pieceTable.current.insert(initialText, cursor.current);
            setText(pieceTable.current.getSequence());
        }
    }, [
        initialText,
    ]);

    /** Handle Lines */
    useEffect(() => {
        const text = pieceTable.current.getSequence();
        const newLines = text.split('\n').length;
        lines.current = newLines;
        forceUpdate();
    }, [
        text,
    ]);

    const renderText = () => {
        const editorFocused = editor.current === document.activeElement;

        if (editorFocused) {
            return (
                <>
                    {text.slice(0, cursor.current)}
                    <StyledCaret />
                    {text.slice(cursor.current, text.length)}
                </>
            );
        }

        return (
            <>{text}</>
        );
    }

    return (
        <StyledChisel
            theme={theme}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onPaste={handlePaste}
            onBlur={forceUpdate}
            tabIndex={0}
            contentEditable={true}
            suppressContentEditableWarning={true}
            autoCorrect="false"
            autoCapitalize="false"
            spellCheck={false}
            ref={editor}
            style={{
                // height: 40 + lines.current * 16 + 'px',
                ...style,
            }}
        >
            {renderText()}
        </StyledChisel>
    );
};


export default Chisel;
