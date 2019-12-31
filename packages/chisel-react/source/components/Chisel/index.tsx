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
} from './styled';

import {
    ChiselProperties,
    ChiselValue,
    ChiselNode,
} from '../../interfaces';

import {
    getSelectionCaretAndLine,
} from '../../utilities';



const createRange = (
    node: any,
    chars: any,
    range?: any,
) =>{
    if (!range) {
        range = document.createRange()
        range.selectNode(node);
        range.setStart(node, 0);
    }

    if (chars.count === 0) {
        range.setEnd(node, chars.count);
    } else if (node && chars.count >0) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.length < chars.count) {
                chars.count -= node.textContent.length;
            } else {
                 range.setEnd(node, chars.count);
                 chars.count = 0;
            }
        } else {
            for (var lp = 0; lp < node.childNodes.length; lp++) {
                range = createRange(node.childNodes[lp], chars, range);

                if (chars.count === 0) {
                   break;
                }
            }
        }
   }

   return range;
};

const setCurrentCursorPosition = (
    chars: any,
    element: any
) => {
    if (chars >= 0) {
        const selection = window.getSelection();
        const range = createRange(element.parentNode, { count: chars });

        if (range && selection) {
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
};

function getCaretPosition(el: any){
    try {
        var caretOffset = 0, sel;
        if (typeof window.getSelection !== "undefined") {
          var range = window.getSelection()!.getRangeAt(0);
          var selected = range.toString().length;
          var preCaretRange = range.cloneRange();
          preCaretRange.selectNodeContents(el);
          preCaretRange.setEnd(range.endContainer, range.endOffset);
          caretOffset = preCaretRange.toString().length - selected;
        }
        return caretOffset;
    } catch (error) {
        return;
    }
}

function setCaretPosition(data: any) {
    try {
        const selection = window.getSelection();
        const range = document.createRange();
        console.log(range);

        range.setStart(data.node, data.position);
        range.collapse(true);

        selection?.removeAllRanges();
        selection?.addRange(range);
    } catch (error) {
        return;
    }
}


const getPastedText = (
    event: React.ClipboardEvent<HTMLDivElement>,
) => {
    return event.clipboardData.getData('text');
}

const emptyEditorValue: ChiselValue = {
    nodes: [],
};

const Chisel: React.FC<ChiselProperties> = (properties) => {
    const editor = useRef<HTMLDivElement>(null);
    const pieceTable = useRef(new PieceTable(''));
    const cursor = useRef(0);

    const {
        // value,
        atChange,
        configuration,
        style,
    } = properties;

    // const {
    //     nodes,
    // } = value;

    const [text, setText] = useState('');

    // const [editorValue, setEditorValue] = useState<ChiselValue>({...emptyEditorValue});
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

    const alterCursorAndSetText = (cursorStep: number) => {
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

        const printableKey = event.key.length === 1;

        if (printableKey) {
            pieceTable.current.insert(event.key, cursor.current);
            // cursor.current += 1;
            // setText(pieceTable.current.getSequence());
            console.log(cursor.current);

            alterCursorAndSetText(1);

            // if (editor.current) {
            //     console.log(editor.current.childNodes[0]);
            //     if (editor.current.childNodes[0]) {
            //         setCaretPosition(
            //             {
            //                 node: editor.current.childNodes[0],
            //                 position: cursor.current,
            //             }
            //         );
            //         // editor.current.childNodes[0].focus();
            //     }
            // }

            // editor.current?.focus();
            // setCurrentCursorPosition(cursor.current, editor.current);
            // if (editor.current && editor.current.childNodes) {
            //     const range = document.createRange();
            //     console.log(range);
            //     console.log(editor.current.childNodes);
            //     const textNode = editor.current.childNodes[0];
            //     console.log(textNode);
            //     // range.setStart(editor.current?.childNodes[0], 1);
            //     // range.collapse();
            // }

            // const selObj = window.getSelection();
            // console.log(selObj);
            // const selRange = selObj?.getRangeAt(0);
            // selRange?.collapse();
            // console.log(selRange);
        }

        if (event.key === 'Backspace' && !event.shiftKey) {
            if (cursor.current > 0) {
                pieceTable.current.delete(cursor.current - 1, 1);

                alterCursorAndSetText(-1);
                // cursor.current -= 1;
                // setText(pieceTable.current.getSequence());
            }
        }

        if (event.key === 'Backspace' && event.shiftKey) {
            if (cursor.current > 0) {
                // TODO remove current word
                pieceTable.current.delete(cursor.current - 1, 1);

                alterCursorAndSetText(-1);
                // cursor.current -= 1;
                // setText(pieceTable.current.getSequence());
            }
        }

        if (event.key === 'Enter') {
            pieceTable.current.insert('\n', cursor.current);

            alterCursorAndSetText(1);
            // cursor.current += 1;
            // setText(pieceTable.current.getSequence());
        }

        // console.log(cursor.current);
        // console.log(editor.current?.childNodes[0]);

        // const range = document.createRange();
        // const selection = window.getSelection();
        // range.setStart(editor.current!.childNodes[0], cursor.current);
        // range.collapse(true);
        // selection!.removeAllRanges();
        // selection!.addRange(range);


        // if (event.key === 'Tab') {
        //     event.preventDefault();
        // }
        // if (event.key === 'Enter') {
        //     // event.preventDefault();
        //     window.document.execCommand('insertHTML', false, '\n');
        // }
    }

    const handleKeyUp = (
        event: React.KeyboardEvent<HTMLDivElement>,
    ) => {
        // const value = editor.current!.innerText;
        // console.log(editor.current!.innerText);
        // console.log('----');
        // console.log(editor.current!.textContent);
        // console.log('----');
        // console.log(editor.current!.innerHTML);
        // console.log('----');

        // const splitValue = value
        //     .split(/\n/);

        // const editorNodes = splitValue.map(nodeText => {
        //     const node: ChiselNode = {
        //         type: 'paragraph',
        //         text: nodeText,
        //     };
        //     return node;
        // });
        // const editorValue: ChiselValue = {
        //     nodes: editorNodes,
        // };

        // atChange(
        //     editorValue,
        //     event,
        // );
    }

    const handleClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        const selection = getSelectionCaretAndLine(editor.current);
        // const sel = getCaretPosition(editor.current);
        // console.log('aaa', sel);

        if (selection) {
            cursor.current = selection.caret;
            console.log('selection', selection);
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

    // useEffect(() => {
    //     if (nodes) {
    //         setEditorValue({
    //             nodes,
    //         });
    //     }
    // }, [
    //     nodes,
    // ]);

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

    return (
        <StyledChisel
            theme={theme}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onPaste={handlePaste}
            tabIndex={0}
            contentEditable={true}
            suppressContentEditableWarning={true}
            autoCorrect="false"
            autoCapitalize="false"
            spellCheck={false}
            ref={editor}
            style={{...style}}
        >
            {text}
            {/* {editorValue.nodes.map(node => {
                const {
                    text,
                } = node;

                return (
                    <div
                        key={Math.random() + ''}
                        style={{
                            margin: 0,
                        }}
                    >
                        {text}
                    </div>
                );
            })} */}
        </StyledChisel>
    );
};


export default Chisel;
