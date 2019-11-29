import React from 'react';

import {
    ChiselProperties,
} from '../../interfaces';



const Chisel: React.FC<ChiselProperties> = (properties) => {
    const {
        value,
    } = properties;

    const {
        nodes,
    } = value;

    return (
        <div>
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
        </div>
    );
};


export default Chisel;
