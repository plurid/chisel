import React, {
    useRef,
    useState,
    useEffect,
} from 'react';

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

    const {
        value,
        atChange,
        configuration,
        style,
    } = properties;

    const {
        nodes,
    } = value;

    const [editorValue, setEditorValue] = useState<ChiselValue>({...emptyEditorValue});
    const [theme, seTheme] = useState(themes.plurid);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        // if (event.key === 'Tab') {
        //     event.preventDefault();
        // }
        if (event.key === 'Enter') {
            // event.preventDefault();
            window.document.execCommand('insertHTML', false, '\n');
        }
    }

    const handleKeyUp = (
        event: React.KeyboardEvent<HTMLDivElement>,
    ) => {
        const value = editor.current!.innerText;
        console.log(editor.current!.innerText);
        console.log('----');
        console.log(editor.current!.textContent);
        console.log('----');
        console.log(editor.current!.innerHTML);
        console.log('----');

        const splitValue = value
            .split(/\n/);

        const editorNodes = splitValue.map(nodeText => {
            const node: ChiselNode = {
                type: 'paragraph',
                text: nodeText,
            };
            return node;
        });
        const editorValue: ChiselValue = {
            nodes: editorNodes,
        };

        atChange(
            editorValue,
            event,
        );
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // const selection = getSelectionCaretAndLine(editor.current);
        // if (selection) {
        //     // console.log('selection', selection);
        // }
    }

    useEffect(() => {
        if (nodes) {
            setEditorValue({
                nodes,
            });
        }
    }, [
        nodes,
    ]);

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
            {editorValue.nodes.map(node => {
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
            })}
        </StyledChisel>
    );
};


export default Chisel;
