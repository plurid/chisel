import styled from 'styled-components';



export const StyledChisel = styled.div`
    background-color: ${props => props.theme.backgroundColorPrimary};
    color: ${props => props.theme.colorPrimary};

    width: 100%;
    height: 100%;
    padding: 1rem;
    outline: none;
    font-family: 'Ubuntu', 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 0.9rem;
    white-space: pre-wrap;
    word-break: break-word;
`;
