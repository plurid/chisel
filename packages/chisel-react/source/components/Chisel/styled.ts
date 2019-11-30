import styled from 'styled-components';



export const StyledChisel = styled.div`
    background-color: ${props => props.theme.backgroundColorPrimary};
    color: ${props => props.theme.colorPrimary};

    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 0.9rem;
    padding: 1rem;

    outline: none;
    white-space: pre-wrap;
    word-wrap: break-word;
`;
