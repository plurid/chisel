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
    updateCursors,
    setSingleCursor,

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
        const ctrlOrMetaKey = event.ctrlKey || event.metaKey;

        // Check for Cut.
        if (
            event.key === 'x'
            && ctrlOrMetaKey
        ) {
            return true;
        }

        // Check for Copy.
        if (
            event.key === 'c'
            && ctrlOrMetaKey
        ) {
            return true;
        }

        // Check for Paste.
        if (
            event.key === 'v'
            && ctrlOrMetaKey
        ) {
            return true;
        }

        // Check for Refresh.
        if (
            event.key === 'r'
            && ctrlOrMetaKey
        ) {
            return true;
        }

        // Check for Selection.
        if (
            event.key === 'a'
            && ctrlOrMetaKey
        ) {
            return true;
        }

        // Check for Tab Close.
        if (
            event.key === 'w'
            && ctrlOrMetaKey
        ) {
            return true;
        }

        // Check for Mac Window Hide.
        if (
            event.key === 'h'
            && event.metaKey
        ) {
            return true;
        }

        return false;
    }

    const alterCursorAndSetText = (
        cursorStep: number,
    ) => {
        cursor.current += cursorStep;
        // console.log('cursor.current !', cursor.current);
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
        // console.log('currentLine', currentLine);
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
                    // console.log('cursor.current', cursor.current);

                    // const currentLine = getCurrentLine(text, cursor.current);
                    // console.log('currentLine! !!', currentLine);

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
                    // console.log('cursor.current', cursor.current);

                    // const currentLine = getCurrentLine(text, cursor.current);
                    // console.log('currentLine !!!', currentLine);

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

    const handleMouseUp = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        event.preventDefault();
        const selectionObj = (window.getSelection && window.getSelection());
        if (!selectionObj) {
            return;
        }

        const selection = selectionObj.toString();

        const anchorNode = selectionObj.anchorNode;
        if (!anchorNode) {
            return;
        }

        const focusNode = selectionObj.focusNode;
        if (!focusNode) {
            return;
        }

        const anchorOffset = selectionObj.anchorOffset;
        const focusOffset = selectionObj.focusOffset;

        const position = anchorNode.compareDocumentPosition(focusNode);
        let forward = false;

        if (position === anchorNode.DOCUMENT_POSITION_FOLLOWING) {
            forward = true;
        } else if (position === 0) {
            forward = (focusOffset - anchorOffset) > 0;
        }

        let selectionStart = forward ? anchorOffset : focusOffset;

        // if (forward) {
        //     if (anchorNode.parentNode.getAttribute('data-order')
        //         && anchorNode.parentNode.getAttribute('data-order') === 'middle') {
        //         selectionStart += this.state.selectionStart;
        //     }
        //     if (anchorNode.parentNode.getAttribute('data-order')
        //         && anchorNode.parentNode.getAttribute('data-order') === 'last') {
        //         selectionStart += this.state.selectionEnd;
        //     }
        // } else {
        //     if (focusNode.parentNode.getAttribute('data-order')
        //         && focusNode.parentNode.getAttribute('data-order') === 'middle') {
        //         selectionStart += this.state.selectionStart;
        //     }
        //     if (focusNode.parentNode.getAttribute('data-order')
        //         && focusNode.parentNode.getAttribute('data-order') === 'last') {
        //         selectionStart += this.state.selectionEnd;
        //     }
        // }

        const selectionEnd = selectionStart + selection.length;

        if (selectionStart === selectionEnd) {
            cursor.current = selectionStart;
            const cursors = setSingleCursor(selectionStart);
            internalCursors.current = cursors;
        }

        // console.log(selectionStart, selectionEnd);

        forceUpdate();

        // const first = this.state.text.slice(0, selectionStart);
        // const middle = this.state.text.slice(selectionStart, selectionEnd);
        // const last = this.state.text.slice(selectionEnd);

        // this.setState({
        //     selection,
        //     anchorNode,
        //     focusNode,
        //     selectionStart,
        //     selectionEnd,
        //     first,
        //     middle,
        //     last
        // });

        // if (this.props.selectionHandler) {
        //     this.props.selectionHandler({
        //         selection,
        //         selectionStart,
        //         selectionEnd
        //     });
        // }
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

            const cursors = setSingleCursor(selection.caret);
            internalCursors.current = cursors;

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

        // for (const [index, character] of text.split('').entries()) {
        //     console.log('index, character', index, character);
        // }

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


    // console.log(internalCursors.current);

    return (
        <StyledChisel
            theme={theme}
            // onClick={handleClick}
            onMouseUp={handleMouseUp}
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
