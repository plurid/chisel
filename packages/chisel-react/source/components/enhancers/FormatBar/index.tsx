import React from 'react';

import {
    StyledFormatBar,
} from './styled';



interface FormatBarOwnProperties {
}

type FormatBarProperties = FormatBarOwnProperties;

const FormatBar: React.FC<FormatBarProperties> = () => {
    return (
        <StyledFormatBar>
            FormatBar
        </StyledFormatBar>
    );
}


export default FormatBar;
