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

// import {
//     getSelectionCaretAndLine,
// } from '../../utilities';



const emptyEditorValue: ChiselValue = {
    nodes: [],
};

const Chisel: React.FC<ChiselProperties> = (properties) => {
    const editor = useRef<HTMLDivElement>(null);
    const pieceTable = useRef(new PieceTable(''));
    const cursor = useRef(0);

    const {
        value,
        atChange,
        configuration,
        style,
    } = properties;

    const {
        nodes,
    } = value;

    const [text, setText] = useState('');

    const [editorValue, setEditorValue] = useState<ChiselValue>({...emptyEditorValue});
    const [theme, seTheme] = useState(themes.plurid);

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();

        const printableKey = event.key.length === 1;

        if (printableKey) {
            pieceTable.current.insert(event.key, cursor.current);
            cursor.current += 1;
            setText(pieceTable.current.getSequence());
        }

        if (event.key === 'Backspace') {
            if (cursor.current > 0) {
                pieceTable.current.delete(cursor.current - 1, 1);
                cursor.current -= 1;
                setText(pieceTable.current.getSequence());
            }
        }

        if (event.key === 'Enter') {
            pieceTable.current.insert('\n', cursor.current);
            cursor.current += 1;
            setText(pieceTable.current.getSequence());
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
        // const selection = getSelectionCaretAndLine(editor.current);
        // if (selection) {
        //     // console.log('selection', selection);
        // }
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
