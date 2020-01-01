import React from 'react';

import Chisel, {
    ChiselValue,
    ChiselEnhancerFormatBar,
} from '@plurid/chisel-react';



const value: ChiselValue = {
    text: '',
    // marks: [],
};

const App = () => {
    const atChange = (
        value: ChiselValue,
    ) => {
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
                enhancers={
                    [
                        ChiselEnhancerFormatBar,
                    ]
                }
            />
        </div>
    );
}


export default App;
