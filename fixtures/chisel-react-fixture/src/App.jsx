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
