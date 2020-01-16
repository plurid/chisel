import styled from 'styled-components';



export const StyledChisel = styled.div`
    background-color: ${props => props.theme.backgroundColorPrimary};
    color: ${props => props.theme.colorPrimary};

    width: 100%;
    height: 100%;
    padding: 20px;
    font-size: 17px;
    line-height: 25px;
    outline: none;
    font-family: 'Ubuntu', 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    white-space: pre-wrap;
    word-break: break-word;
    caret-color: transparent;
`;


export const StyledCaret = styled.span`
    display: inline-block;
    position: relative;

    ::after {
        content: '';
        position: absolute;
        top: -15px;
        height: 20px;
        width: 1px;
        background-color: white;
    }
`;
