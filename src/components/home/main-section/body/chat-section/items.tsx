import React from 'react';
import styled from 'styled-components';

import { colorData } from '../../../../colorData';
import { UserIcon } from '../../../../items';

export enum MessageType {
    SENT = 0,
    RECEIVED = 1
}

export function MsgComponent({ $msgType, children }: MessageProps): JSX.Element {
    return (
        <Message $msgType={$msgType}>
            {$msgType === MessageType.RECEIVED &&
                <UserIcon margin={false} />
            }
            <MessageContainer $msgType={$msgType}>
                <MessageContent>{children}</MessageContent>
            </MessageContainer>
        </Message>
    )
}

// ============================== Body ==============================


interface MessageProps {
    $msgType: MessageType;
    children: React.ReactNode;
}

export const ChatBody = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    width: 100%;

    padding: 1vw;
    box-sizing: border-box;

    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
`;

export const Message = styled.div<MessageProps>`
    width: 100%;
    height: auto;

    color: ${colorData.quaternary};

    display: flex;
    flex-direction: row;
    justify-content: ${props => props.$msgType === MessageType.RECEIVED ? 'flex-start' : 'flex-end'};
    align-items: flex-start;

    margin-bottom: 3vh;
`;

export const MessageContent = styled.div`
    width: 100%;
    height: auto;

    font-size: 1vw;
    white-space: pre-wrap;
    word-wrap: break-word;
`;

export const MessageContainer = styled.div<MessageProps>`
    width: fit-content;
    max-width: 63%;
    min-height: 1vh;
    height: auto;

    background-color: ${colorData.nonary};

    border: ${props => props.$msgType === MessageType.RECEIVED ? `1px solid ${colorData.secondary}` : `1px solid ${colorData.quinary}`};
    border-radius: 5px;

    padding: 5px;
    margin-left: 1vw;
`;

export const ErrorBanner = styled.div`
    width: 100%;
    height: 3vh;

    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    color: whitesmoke;
    background-color: ${colorData.denary};
`;

// ============================== Footer ==============================

export const ChatFooter = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    padding-bottom: 1vh;

    width: 100%;
    height: auto;
    min-height: 8vh;
`;

