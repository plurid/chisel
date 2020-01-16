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
    getPastedText,
    getCurrentWord,
    moveCursorRow,
    getCurrentLine,
} from '../../logic';

import {
    useForceUpdate,
} from '../../utilities/hooks';

import {
    InternalCursor,
    ExternalCursor,
} from '../../interfaces/internal';



const Chisel: React.FC<ChiselProperties> = (properties) => {
    const editor = useRef<HTMLDivElement>(null);
    const pieceTable = useRef(new PieceTable(''));

    const externalCursorsRef = useRef<ExternalCursor[]>([]);
    const internalCursors = useRef<InternalCursor[]>([]);
    const cursor = useRef(0);

    const lines = useRef(1);

    const forceUpdate = useForceUpdate();

    const {
        value,

        configuration,
        externalCursors,
        enhancers,

        atChange,

        style,
        className,
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
        cursor.current += cursorStep;
        setText(pieceTable.current.getSequence());
    }

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLDivElement>,
    ) => {
        if (checkForUnpreventableKeys(event)) {
            return;
        }

        event.preventDefault();

        const currentLine = getCurrentLine(text, cursor.current);
        if (!currentLine) {
            return;
        }

        const noModifiers = !event.shiftKey
            && !event.altKey
            && !event.ctrlKey
            && !event.metaKey;
        const selecting = event.shiftKey;

        const printableKey = event.key.length === 1;
        if (printableKey) {
            // console.log(cursor.current);
            pieceTable.current.insert(event.key, cursor.current);
            alterCursorAndSetText(1);
            return;
        }

        if (event.key === 'Backspace'
            && !event.altKey
            && !(event.ctrlKey || event.metaKey)
        ) {
            if (cursor.current > 0) {
                pieceTable.current.delete(cursor.current - 1, 1);

                alterCursorAndSetText(-1);
            }
        }

        /**
         * Remove until the start of word.
         */
        if (event.key === 'Backspace'
            && event.altKey
            && !(event.ctrlKey || event.metaKey)
        ) {
            if (cursor.current > 0) {
                const currentWord = getCurrentWord(pieceTable.current.getSequence(), cursor.current);

                pieceTable.current.delete(
                    currentWord.start,
                    cursor.current - currentWord.start,
                );

                cursor.current = currentWord.start;
                setText(pieceTable.current.getSequence());
            }
        }

        /**
         * Remove until the start of line.
         */
        if (event.key === 'Backspace'
            && (event.ctrlKey || event.metaKey)
            && !event.altKey
        ) {
            if (cursor.current > 0) {
                const {
                    line,
                } = currentLine;
                pieceTable.current.delete(line.start, cursor.current);

                cursor.current = line.start;
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
            /**
             * Simple navigation
             */
            if (noModifiers) {
                const text = pieceTable.current.getSequence();

                if (text[cursor.current - 1]) {
                    cursor.current -= 1;
                    forceUpdate();
                }
            }

            /**
             * Navigation with jump to start of line
             */
            if (event.metaKey || event.ctrlKey) {
                // TODO

                /**
                 * Navigation while selecting
                 */
                if (selecting) {
                    // TODO
                }
            }

            /**
             * Navigation with jump to start of word
             */
            if (event.altKey) {
                // TODO

                /**
                 * Navigation while selecting
                 */
                if (selecting) {
                    // TODO
                }
            }
        }

        if (event.key === 'ArrowRight') {
            /**
             * Simple navigation
             */
            if (noModifiers) {
                const text = pieceTable.current.getSequence();

                if (text[cursor.current]) {
                    cursor.current += 1;
                    forceUpdate();
                }
            }

            /**
             * Navigation with jump to end of line
             */
            if (event.metaKey || event.ctrlKey) {
                // TODO

                /**
                 * Navigation while selecting
                 */
                if (selecting) {
                    // TODO
                }
            }

            /**
             * Navigation with jump to end of word
             */
            if (event.altKey) {
                // TODO

                /**
                 * Navigation while selecting
                 */
                if (selecting) {
                    // TODO
                }
            }
        }

        if (event.key === 'ArrowUp') {
            /**
             * Simple navigation
             */
            if (noModifiers) {
                const text = pieceTable.current.getSequence();
                const updatedCursor = moveCursorRow(text, cursor.current, 'up');
                cursor.current = updatedCursor;
                forceUpdate();
            }

            /**
             * Navigation with jump to start of editor
             */
            if (event.metaKey || event.ctrlKey) {
                // TODO

                /**
                 * Navigation while selecting
                 */
                if (selecting) {
                    // TODO
                }
            }

            /**
             * Move line up
             */
            if (event.altKey) {
                // TODO
            }

            /**
             * Copy line up
             */
            if (event.altKey && event.shiftKey) {
                // TODO
            }
        }

        if (event.key === 'ArrowDown') {
            /**
             * Simple navigation
             */
            if (noModifiers) {
                const text = pieceTable.current.getSequence();
                const updatedCursor = moveCursorRow(text, cursor.current, 'down');
                cursor.current = updatedCursor;
                forceUpdate();
            }

            /**
             * Navigation with jump to start of editor
             */
            if (event.metaKey || event.ctrlKey) {
                // TODO

                /**
                 * Navigation while selecting
                 */
                if (selecting) {
                    // TODO
                }
            }

            /**
             * Move line down
             */
            if (event.altKey) {
                // TODO
            }

            /**
             * Copy line down
             */
            if (event.altKey && event.shiftKey) {
                // TODO
            }
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

        /**
         * Adds cursor at location.
         */
        if (event.altKey) {
            // TODO
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

    /** Handle External Cursors */
    useEffect(() => {
        if (externalCursors) {
            externalCursorsRef.current = externalCursors;
        }
    }, [
        externalCursors,
    ]);

    /** Handle Enhancers */
    useEffect(() => {
    }, [
        enhancers,
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
                ...style,
            }}
            className={className}
        >
            {renderText()}
        </StyledChisel>
    );
};


export default Chisel;
