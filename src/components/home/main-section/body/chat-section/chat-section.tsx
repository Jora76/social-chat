import { Panel } from '../../../../items';
import { ChatBody, ChatFooter, MsgComponent, MessageType, ErrorBanner } from './items';
import InputEmoji from "react-input-emoji";
import { colorData } from '../../../../colorData';

import { useCurrentChat } from '../../../../../contexts/currentChatContext';
import { useUser } from '../../../../../contexts/userContext';

import { useEffect, useRef, useState } from 'react';

export function ChatSection(): JSX.Element {
    const [text, setText] = useState<string>("");
    const [colorFocus, setColorFocus] = useState<string>(`${colorData.quaternary}`);

    const chatBodyRef = useRef<HTMLDivElement | null>(null);

    const { messages, sendMsg } = useCurrentChat();
    const { user } = useUser();
    const { userTarget, isSocketOpen } = useCurrentChat();

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <Panel width="80%" height="100%">
            {!isSocketOpen && <ErrorBanner>⚠️ You are currently offline</ErrorBanner>}
            <ChatBody ref={chatBodyRef}>
                {
                    messages !== null && messages.map((msg: any, index: number) => {
                        if (msg.type != "msg" && msg.type != "") {
                            return;
                        }
                        const messageType = msg.sender_uuid === user.uuid ? MessageType.SENT : MessageType.RECEIVED;
                        return (
                            <MsgComponent $msgType={messageType} key={index}>{msg.message_content}</MsgComponent>
                        );
                    })
                }
            </ChatBody>
            {userTarget.email != '' &&
                <ChatFooter>
                    <InputEmoji
                        background={`${colorData.nonary}`}
                        borderRadius={10}
                        color={`${colorData.septenary}`}
                        onFocus={() => setColorFocus(`${colorData.quinary}`)}
                        onBlur={() => setColorFocus(`${colorData.quaternary}`)}
                        borderColor={colorFocus}
                        value={text}
                        onChange={(e) => {
                            setText(e);
                        }}
                        cleanOnEnter
                        onEnter={() => {
                            if (text !== undefined && text !== "") {
                                sendMsg(text);
                            }
                        }}
                        placeholder="Aa"
                        shouldReturn={true}
                        shouldConvertEmojiToImage={false}
                    />
                </ChatFooter>
            }
        </Panel>
    );
}