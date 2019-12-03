import React from 'react';

import Chisel, {
    ChiselValue,
} from '@plurid/chisel-react';



const value: ChiselValue = {
    nodes: [
        {
            text: 'one',
        },
        {
            text: 'two',
        },
    ],
};

const App = () => {
    return (
        <div>
            <Chisel
                value={value}
                atChange={(event, value) => console.log('value', value)}
            />
        </div>
    );
}


export default App;
