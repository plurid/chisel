import React from 'react';

import {
    StyledChisel,
} from './styled';

import {
    ChiselProperties,
} from '../../interfaces';



const Chisel: React.FC<ChiselProperties> = (properties) => {
    const {
        value,
        // configuration,
    } = properties;

    const {
        nodes,
    } = value;

    return (
        <StyledChisel>
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
