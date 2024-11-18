import styled from 'styled-components';
import { borderColor, colorData } from '../colorData';


export const Container = styled.div`
    width: 30vw;
    height: 70vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: ${colorData.tertiary};

    border: 1px solid ${borderColor};
    border-radius: 10px;
`;

// ================== HEADER ==================

export const Header = styled.div`
    width: 100%;
    height: 10%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

// ================== BODY ==================

export const Body = styled.div`
    width: 100%;
    height: 55%;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

export const DivInput = styled.div`
    display: flex;
    flex-direction: column;

    width: 70%;

`;

export const Label = styled.p`
    color: #afc5db;
    font-size: 1vw;
    font-weight: bold;
    font-family: Arial, sans-serif;

    position: relative;
    width: 100%;
`;

export const EmailInput = styled.input`
    border: 1px solid ${borderColor};
    border-radius: 5px;
    width: 100%;

    padding: 8px;
    box-sizing: border-box;

    color: white;
    background-color: ${colorData.primary};
    outline: none;

    font-size: 1vw;

    &::placeholder {
        color: ${colorData.quaternary};
        font-size: 1vw;
    }

    &:focus {
        border-color: ${colorData.quinary};
    }
`;


// ================== FOOTER ==================

export const Footer = styled.div`
    width: 100%;
    height: 35%;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

interface NextBtnProps {
    $nextable: boolean;
    $loading: boolean;
}

export const NextBtn = styled.button<NextBtnProps>`
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${props => props.$nextable ? 'green' : `${colorData.secondary}`};
    color: white;

    border: solid 1px ${colorData.secondary};
    border-radius: 10px;

    padding: ${props => props.$loading ? '10px' : '10px 20px'};
    margin: 20px 0;

    width: ${props => props.$loading ? '10%' : '40%'};

    font-size: 1vw;

    transition: padding 0.3s ease, margin 0.3s ease, width 0.3s ease;

    cursor: ${props => props.$nextable ? 'pointer' : 'default'};

    &:hover {
        border: ${props => props.$nextable ? 'solid 1px white' : `solid 1px ${colorData.secondary}`};
    }

    & > * {
        transition: ${props => props.$nextable ? 'transform 0.3s ease' : 'none'};
    }

    &:hover > * {
        transform: ${props => props.$nextable && !props.$loading ? 'translateX(10px)' : 'none'};
    }
`;

export const RegisterLink = styled.a`
    text-decoration: underline;
    color: ${colorData.quaternary};

    font-size: 1vw;
    cursor: pointer;
`;