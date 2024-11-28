import { useEffect, useState } from 'react';

import { Panel, UserIcon } from '../../items';
import { colorData } from '../../colorData.js';
import { LogoutButton, MenuTitle, UserButton, UserStatus } from './items';

import { useUser } from '../../../contexts/userContext';
import { useCurrentChat } from '../../../contexts/currentChatContext';

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

interface Contact {
    uuid: string;
    Name: string;
    isConnected: boolean;
}

function Contacts(): JSX.Element {
    const [selectedUserId, setSelectedUserId] = useState(0);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { user, setUser } = useUser();
    const { setTargetUUID, messages, setMessages } = useCurrentChat();

    useEffect(() => {
        console.log("contacts : ", contacts);
        const updatedContacts = contacts.map((contact) => {
            if (messages.some((msg) => msg.type === 'newUser' && msg.target_uuid === contact.uuid)) {
                console.log("new user : ", contact.uuid);
                return { ...contact, isConnected: true };
            }
            if (messages.some((msg) => msg.type === 'disconnectedUser' && msg.target_uuid === contact.uuid)) {
                console.log("disconnected user : ", contact.uuid);
                return { ...contact, isConnected: false };
            }
            return contact;
        });
        setContacts(updatedContacts);

        const remainingMessages = messages.filter((msg) => msg.type !== 'newUser' && msg.type !== 'disconnectedUser');
        if (remainingMessages.length !== messages.length) {
            setMessages(remainingMessages);
        }
    }, [messages]);

    const handleLogout = () => {
        const electron = (window as any).electronAPI;
        try {
            const data = electron.getCookies("http://localhost:3000").then((cookies: any) => {
                const tokenCookie = cookies.find((cookie: any) => cookie.name === 'Token');
                console.log("cookies : ", cookies, "token : ", tokenCookie);
                const obj = {
                    token: tokenCookie.value
                }
                electron.sendToBackend('api/logout', 'POST', obj).then(() => {
                    electron.removeCookie("http://localhost:3000", "user").then(() => {
                        try {
                            electron.removeCookie("http://localhost:3000", "Token").then(() => {
                                setUser({});
                            });
                            console.log("Logged out");
                        } catch (error) {
                            console.error(error);
                        }
                    });
                });
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchContacts = async () => {
            const electron = (window as any).electronAPI;
            try {
                const response = await electron.sendToBackend(`api/follows/${user.uuid}`, 'GET').then((res: any) => {
                    return res.data;
                });
                console.log(response);
                setContacts(response);
            } catch (error) {
                console.error(error);
                setError(true);
            }
            setLoading(false);
        }
        fetchContacts();
    }, []);

    return (
        <Panel width="15%" height="100%" borderRight={`1px solid`} backgroundColor={colorData.tertiary}>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'space-between' }}>
                <div style={{ width: '100%', height: '93%', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box', paddingBottom: '1vh' }}>
                    <MenuTitle> Social Chat </MenuTitle>
                    <div style={{ width: '80%' }}>
                        <h3 style={{ color: colorData.quaternary, fontSize: '1vw' }}>CONTACTS</h3>
                    </div>
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', scrollbarWidth: 'none' }}>
                        {loading ? <h3 style={{ color: colorData.quaternary, fontSize: '1vw' }}>Loading...</h3> : error ? <h3 style={{ color: colorData.quaternary, fontSize: '1vw' }}>Error loading contacts</h3> : null}
                        {!loading && !error && contacts !== null && contacts.map((contact: any, id: number) => {
                            id++;
                            return (
                                <UserButton $id={id} $selectedId={selectedUserId} onClick={() => {
                                    setSelectedUserId(id);
                                    console.log("contact uuid : ", contact.uuid);
                                    setTargetUUID(contact.uuid);
                                }}>
                                    <UserIcon connectionState={contact.isConnected} />
                                    <p className='user-name' style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                        {contact.Name}
                                    </p>
                                </UserButton>
                            );
                        })}
                    </div>
                </div>
                <UserStatus>
                    <div style={{ width: '25%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <UserIcon size='1.5vw' />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '50%', height: '100%', justifyContent: 'space-evenly' }}>
                        <h2 style={{ color: colorData.quaternary, fontSize: '1vw', margin: '0', textTransform: 'capitalize' }}>{user.firstname + " " + user.lastname}</h2>
                        {user.nickname !== '' && <h3 style={{ color: colorData.quaternary, fontSize: '1vw', margin: '0', fontWeight: '300' }}>@{user.nickname}</h3>}
                    </div>
                    <LogoutButton onClick={handleLogout}>
                        <LogoutOutlinedIcon style={{ fontSize: '2vw' }} />
                    </LogoutButton>
                </UserStatus>
            </div>
        </Panel>
    );
}

export default Contacts;