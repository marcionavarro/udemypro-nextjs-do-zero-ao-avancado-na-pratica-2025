import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 500px;
`;

export const Header = styled.header`
    width: 100%;
    background-color: brown;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
`;

export const Titulo = styled.a`
    font-size: 2rem;
    color: white;
`;

export const BemVindo = styled.h1`
    font-size:  ${props => `${props.size}rem`};
    color: ${props => `#${props.color}`};
`;