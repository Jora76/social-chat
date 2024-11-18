import { createContext, useContext, useEffect, useState } from 'react';

const currentChatContext = createContext({
    messages: [],
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
});

export function CurrentChatProvider({ children }: any) {
    const [messages, setMessages] = useState([]);
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
    const [targetUUID, setTargetUUID] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            const electron = (window as any).electronAPI;
            try {
                const response = await electron.sendToBackend(`api/user/messages/${targetUUID}`, 'GET').then((res: any) => {
                    return res.data;
                });
                setMessages(response);
                console.log("messages list : ", response);
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
                console.log("user target : ", response);
            } catch (error) {
                console.error(error);
            }
        }
        if (targetUUID !== '') {
            fetchMessages();
            fetchUserTarget();
        }
    }, [targetUUID]);

    return (
        <currentChatContext.Provider value={{ messages, userTarget, setTargetUUID }}>
            {children}
        </currentChatContext.Provider>
    );
}

export const useCurrentChat = () => { 
    return useContext(currentChatContext);
}