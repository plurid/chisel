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

    const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const value = editor.current!.innerText;

        if (atChange) {
            atChange(event, value);
        }
    }

    return (
        <StyledChisel
            theme={theme}
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
