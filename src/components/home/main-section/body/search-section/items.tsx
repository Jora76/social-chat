import styled from "styled-components";
import { borderColor, colorData } from "../../../../colorData";

export const Banner = styled.div`
    display: flex;
    flex-direction: row;

    width: 90%;
    height: auto;
    max-height: 78%;

    overflow: hidden;

    color: ${colorData.quaternary};
    background-color: ${colorData.tertiary};

    border: 1px solid ${borderColor};
    border-radius: 5px;
    
    margin-top: 4vh;

    box-sizing: border-box;
    padding: 1vh;
`;