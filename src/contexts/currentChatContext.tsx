import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useUser } from './userContext';
import { log } from 'console';

interface CurrentChatContextProps {
    messages: Message[];
    setMessages: (messages: Message[]) => void;
    userTarget: UserTarget;
    setTargetUUID: (uuid: string) => void;
    sendMsg: (msg: string) => void;
    isSocketOpen: boolean;
}

interface Message {
    SenderName: string;
    TargetName: string;
    id: number;
    img_path: string;
    message_content: string;
    sender_uuid: string;
    target_uuid: string;
    type: string;
}

interface UserTarget {
    fName: string;
    lName: string;
    nName: string;
    email: string;
    birthdate: string;
    description: string;
    uuid: string;
    avatar: string;
}

const currentChatContext = createContext<CurrentChatContextProps>({
    messages: [],
    setMessages: (messages: Message[]) => { },
    userTarget: {
        fName: '',
        lName: '',
        nName: '',
        email: '',
        birthdate: '',
        description: '',
        uuid: '',
        avatar: '',
    },
    setTargetUUID: (uuid: string) => { },
    sendMsg: (msg: string) => { },
    isSocketOpen: false,
});

export function CurrentChatProvider({ children }: any) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userTarget, setUserTarget] = useState({
        fName: '',
        lName: '',
        nName: '',
        email: '',
        birthdate: '',
        description: '',
        uuid: '',
        avatar: '',
    });
    const [isSocketOpen, setIsSocketOpen] = useState(false); 

    const setSocketOpen = (isOpen: boolean) => {
        setIsSocketOpen(isOpen);
    };

    const [targetUUID, setTargetUUID] = useState('');
    const targetUUIDRef = useRef(targetUUID);
    
    
    useEffect(() => {
        targetUUIDRef.current = targetUUID;
    }, [targetUUID]);
    
    const electron = (window as any).electronAPI;
    const { user, token, logState} = useUser();
    
    const tokenRef = useRef(token);

    useEffect(() => {
        tokenRef.current = token;
    }, [token]);

    useEffect(() => {
        const setupWebSocket = async () => {
            await electron.setupWebSocket(updateMessages, setSocketOpen);
        };

        if (messages !== null) {
            setupWebSocket();
        }
    }, [messages]);

    useEffect(() => {
        let interval: any;
        console.log("isSocketOpen : ", interval);
        if (!isSocketOpen && interval === undefined) {
            interval = setInterval(() => {
                electron.getCookies("http://localhost:3000").then((cookies: any) => {
                    if (cookies.length > 0) {
                        electron.setupWebSocket(updateMessages, setSocketOpen);
                    }
                });
            }, 5000);
            return () => clearInterval(interval);
        } else {
            clearInterval(interval);
        }
    }, [isSocketOpen]);

    const sendMsg = (msg: string) => {
        const message = {
            type: "msg",
            sender_uuid: tokenRef.current,
            target_uuid: targetUUID,
            message_content: msg,
        }
        electron.sendMessage(message);
        message.sender_uuid = user.uuid;
    }

    const updateMessages = (newMessage: Message) => {
        if (newMessage.sender_uuid === targetUUIDRef.current || newMessage.target_uuid === targetUUIDRef.current){
            console.log("allez le foot : ", newMessage);
            setMessages((prevMessages) => {
                return [...prevMessages, newMessage];
            });
        }
    }

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await electron.sendToBackend(`api/user/messages/${targetUUID}`, 'GET').then((res: any) => {
                    return res.data;
                });
                setMessages(response);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchUserTarget = async () => {
            const electron = (window as any).electronAPI;
            try {
                const response = await electron.sendToBackend(`api/user/${targetUUID}`, 'GET').then((res: any) => {
                    return res.data;
                });
                setUserTarget(response);
            } catch (error) {
                console.error(error);
            }
        }
        if (targetUUID !== '') {
            setMessages([]);
            fetchMessages();
            fetchUserTarget();
        }
    }, [targetUUID]);

    return (
        <currentChatContext.Provider value={{ sendMsg, messages, setMessages, userTarget, setTargetUUID, isSocketOpen }}>
            {children}
        </currentChatContext.Provider>
    );
}

export const useCurrentChat = () => {
    return useContext(currentChatContext);
}