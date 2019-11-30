import React from 'react';

import themes from '@plurid/plurid-themes';

import {
    StyledChisel,
} from './styled';

import {
    ChiselProperties,
} from '../../interfaces';



const theme = themes.plurid;

const Chisel: React.FC<ChiselProperties> = (properties) => {
    const {
        value,
        // atChange,
        // configuration,
    } = properties;

    const {
        nodes,
    } = value;

    return (
        <StyledChisel
            theme={theme}
        >
            {nodes.map(node => {
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
