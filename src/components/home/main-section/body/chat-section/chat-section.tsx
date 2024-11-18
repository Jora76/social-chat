import { Panel } from '../../../../items';
import { ChatBody, ChatFooter, MsgComponent, MessageType } from './items';
import InputEmoji from "react-input-emoji";
import { colorData } from '../../../../colorData';

import { useCurrentChat } from '../../../../../contexts/currentChatContext';
import {useUser} from '../../../../../contexts/userContext';

import { useState } from 'react';

export function ChatSection(): JSX.Element {
    const [text, setText] = useState<string>("");
    const [colorFocus, setColorFocus] = useState<string>(`${colorData.quaternary}`);

    const { messages } = useCurrentChat();
    const { user } = useUser();

    return (
        <Panel width="80%" height="100%">
            <ChatBody>
                {
                    messages !== null && messages.map((msg: any, index: number) => {
                        const messageType = msg.sender_uuid === user.uuid ? MessageType.SENT : MessageType.RECEIVED;
                        return (
                            <MsgComponent $msgType={messageType} key={index}>{msg.message_content}</MsgComponent>
                        );
                    })
                }
            </ChatBody>
            <ChatFooter>
                <InputEmoji
                    background={`${colorData.nonary}`}
                    borderRadius={10}
                    color={`${colorData.septenary}`}
                    onFocus={() => setColorFocus(`${colorData.quinary}`)}
                    onBlur={() => setColorFocus(`${colorData.quaternary}`)}
                    borderColor={colorFocus}
                    // ref={inputRef}
                    value={text}
                    onChange={(e) => {
                        setText(e);
                    }}
                    cleanOnEnter
                    onEnter={() => {
                        // if (text !== undefined && text !== "") {
                        //     sendMsg();
                        // }
                    }}
                    placeholder="Aa"
                    shouldReturn={true}
                    shouldConvertEmojiToImage={false}
                    />
            </ChatFooter>
        </Panel>
    );
}