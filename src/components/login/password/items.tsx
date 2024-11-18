import styled from "styled-components";
import { borderColor, colorData } from "../../colorData";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

export const PasswordInput = styled.input`
    border: none;
    border-radius: 5px;

    width: 100%;

    padding: 5px;
    color: white;
    background-color: transparent;

    font-size: 1vw;
    
    outline: none;
    
    &::placeholder {
        color: ${colorData.quaternary};
        font-size: 1vw;
    }

    &:focus-within {
        font-weight: 300;
    }
`;

interface PasswordContainerProps {
    $isfocused: boolean;
}

export const PasswordContainer = styled.div<PasswordContainerProps>`
    display: flex;
    flex-direction: row;
    align-items: center;

    width: 100%;

    border-radius: 5px;
    border: 1px solid ${props => props.$isfocused ? `${colorData.quinary}` : `${borderColor}`};

    box-sizing: border-box;
    padding: 3px;

    background-color: ${colorData.primary};
    color: white;
`;


export const ShowPasswordIcon = styled(VisibilityOffOutlinedIcon)`
    cursor: pointer;

    color: white;

    height: 100%;
    font-size: 1.3vw;
`;

export const DontShowPasswordIcon = styled(VisibilityOutlinedIcon)``;