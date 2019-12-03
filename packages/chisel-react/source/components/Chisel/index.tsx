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



const theme = themes.plurid;

const emptyEditorValue: ChiselValue = {
    nodes: [],
};

const Chisel: React.FC<ChiselProperties> = (properties) => {
    const editor = useRef<HTMLDivElement>(null);

    const {
        value,
        atChange,
        // configuration,
    } = properties;

    const {
        nodes,
    } = value;

    const [editorValue, setEditorValue] = useState<ChiselValue>({...emptyEditorValue});

    useEffect(() => {
        if (nodes) {
            setEditorValue({
                nodes,
            });
        }
    }, [
        nodes,
    ]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Tab') {
            event.preventDefault();
        }
    }

    const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const value = editor.current!.innerText;
        const splitValue = value.split(/\n/);

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

        if (atChange) {
            atChange(
                event,
                editorValue,
            );
        }
    }

    return (
        <StyledChisel
            theme={theme}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            tabIndex={0}
            contentEditable={true}
            suppressContentEditableWarning={true}
            autoCorrect="false"
            autoCapitalize="false"
            spellCheck={false}
            ref={editor}
        >
            {editorValue.nodes.map(node => {
                const {
                    text,
                } = node;

                return (
                    <div
                        key={Math.random() + ''}
                    >
                        {text}
                    </div>
                );
            })}
        </StyledChisel>
    );
};


export default Chisel;
