import styled from 'styled-components';
import { borderColor, colorData } from '../../colorData';

interface UserButtonProps {
    $id: number;
    $selectedId: number;
}

export const UserButton = styled.div<UserButtonProps>`
    display: flex;
    flex-direction: row;
    align-items: center;

    position: relative;

    border: 1px solid;
    border-color: ${props => props.$id === props.$selectedId ? colorData.senary : borderColor};
    border-radius: 5px;

    color: ${props => props.$id === props.$selectedId ? 'white' : colorData.quaternary};
    background-color: ${props => props.$id === props.$selectedId ? colorData.senary : 'none'};

    font-size: 1vw;
    font-weight: bold;

    width: 90%;
    min-height: 5%;

    margin-top: 1.1vh;

    cursor: pointer;

    & .user-icon {
        border-color: ${props => props.$id === props.$selectedId ? 'white' : colorData.quaternary} !important;
    }

    & .user-name {
        color: ${props => props.$id === props.$selectedId ? 'white' : colorData.quaternary} !important;
    }

    &:hover {
        background-color: ${colorData.nonary};
        color: white;
        border-color: ${colorData.quinary};

        & .user-icon {
            border-color: white !important;
        }

        & .user-name {
            color: white !important;
        }
    }
`;

export const MenuTitle = styled.h1`
    width: 100%;
    height: 5%;

    text-align: center;
    font-size: 1.5vw;

    margin-block-start: 1.4vh;
    color: white;

    cursor: pointer;

    &:hover {
        color: ${colorData.quinary};
    }
`;

export const UserStatus = styled.div`
    width: 100%;
    height: 8%;

    display: flex;
    flex-direction: row;
    align-items: center;

    color: ${colorData.quaternary};
    background-color: ${colorData.primary};

    font-size: 1vw;

    border-top: 1px solid ${borderColor};
`;

export const LogoutButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 25%;

    color: ${colorData.quaternary};

    cursor: pointer;

    &:hover {
        color: white;
    }
`;