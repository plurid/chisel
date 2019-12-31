import React from 'react';

import Chisel, {
    ChiselValue,
} from '@plurid/chisel-react';



const value: ChiselValue = {
    nodes: [
        // {
        //     text: 'one',
        // },
        // {
        //     text: 'two',
        // },
    ],
};

const App = () => {
    const atChange = (value, event) => {
        console.log('value', value);
    }

    return (
        <div>
            <Chisel
                value={value}
                atChange={atChange}
                // configuration={
                //     {
                //         theme: 'denote',
                //     }
                // }
            />
        </div>
    );
}


export default App;
