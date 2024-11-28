import { colorData } from "../../../../colorData";
import { Panel, UserIcon } from "../../../../items";
import { Banner } from "./items";

import { useCurrentChat } from "../../../../../contexts/currentChatContext";
import { useSearch } from "../../../../../contexts/searchContext";
import { MessageType, MsgComponent } from "../chat-section/items";
import { useUser } from "../../../../../contexts/userContext";

export function SearchSection(): JSX.Element {
    const { userTarget } = useCurrentChat();
    const { search, results } = useSearch();
    const { user } = useUser();

    return (
        <Panel width="20%" height="100%" backgroundColor={`${colorData.tertiary}`} borderLeft="1px solid">
            {userTarget.email != '' && search === '' ?
                <>
                    <Banner>
                        <UserIcon size="3vw" margin={false} />
                        <div style={{ display: 'flex', flexDirection: 'column', width: '70%', height: '100%', justifyContent: 'space-around', marginLeft: '1vw' }}>
                            <h1 style={{ color: colorData.quaternary, fontSize: '1.5vw', margin: '0', textTransform: 'capitalize', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{userTarget.fName + " " + userTarget.lName}</h1>
                            {userTarget.nName !== null && userTarget.nName !== '' &&
                                <h3 style={{ color: colorData.quaternary, fontSize: '1vw', margin: '0', fontWeight: '300', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>@{userTarget.nName}</h3>
                            }
                        </div>
                    </Banner>
                    <Banner>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '80%', height: '100%' }}>
                            <h4 style={{ color: colorData.quaternary, fontSize: '1vw', margin: '0' }}>Email</h4>
                            <p style={{ color: colorData.quaternary, marginTop: '0.67em', fontSize: '1vw' }}>
                                {userTarget.email}
                            </p>
                            <h4 style={{ color: colorData.quaternary, fontSize: '1vw', marginBottom: '0' }}>Birth</h4>
                            <p style={{ color: colorData.quaternary, marginTop: '0.67em', fontSize: '1vw' }}>
                                {userTarget.birthdate}
                            </p>
                            {userTarget.description !== '' &&
                                <>
                                    <h4 style={{ color: colorData.quaternary, fontSize: '1vw', marginBottom: '0' }}>Description</h4>
                                    <p style={{ width: '100%', color: colorData.quaternary, marginBottom: '0.4vh', marginTop: '0.67em', fontSize: '1vw', overflowY: 'scroll', scrollbarWidth: 'none' }}>
                                        {userTarget.description}
                                    </p>
                                </>
                            }
                        </div>
                    </Banner>
                </>
                : results.length > 0 ?
                    <div style={{width: '100%', height: '100%', overflowY: 'scroll', boxSizing: 'border-box', padding: '15px', scrollbarWidth: 'none'}}>
                        {
                            results.map((result, index) => {
                                const messageType = result.sender_uuid === user.uuid ? MessageType.SENT : MessageType.RECEIVED;
                                return (
                                    <MsgComponent $msgType={messageType} key={index}>{result.message_content}</MsgComponent>
                                );
                            })
                        }
                    </div>
                    : userTarget.email && <p style={{color: `${colorData.quaternary}`, fontSize: '1vw', fontWeight: 'bold'}}>No result found.</p>
            }
        </Panel>
    );
}
