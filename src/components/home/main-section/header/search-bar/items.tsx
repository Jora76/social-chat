import styled from "styled-components";
import { borderColor, colorData} from "../../../../colorData";
import { FaSearch } from 'react-icons/fa';

interface SearchProps {
    $isFocused: boolean;
}

export const SearchIcon = styled(FaSearch)<SearchProps>`
    font-size: ${props => props.$isFocused ? '0' : '1vw'};
    color: white;
    transition: all ease-in-out .2s;
    margin: ${props => props.$isFocused ? '0' : '0px 10px 0px 10px'};
`;

export const SearchContainer = styled.div<SearchProps>`
    display: flex;
    flex-direction: row;
    align-items: center;

    width: 70%;
    height: 60%;

    border: 1px solid;
    border-color: ${props => props.$isFocused ? colorData.quinary : borderColor};
    border-radius: 5px;

    box-sizing: border-box;
    padding: 0.3vh;
`;

export const SearchInput = styled.input`
    background-color: transparent;
    border: none;
    border-radius: 3px;
    width: 100%;
    padding: 5px;
    color: white;

    font-size: 0.7vw;

    &:focus{
        outline: none;
    }

    &::placeholder {
        color: ${colorData.quaternary};
    }
`;