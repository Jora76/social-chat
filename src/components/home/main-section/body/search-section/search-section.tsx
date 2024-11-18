import { colorData } from "../../../../colorData";
import { Panel, UserIcon } from "../../../../items";
import { Banner } from "./items";

import { useCurrentChat } from "../../../../../contexts/currentChatContext";

export function SearchSection(): JSX.Element {
    const { userTarget } = useCurrentChat();

    return (
        <Panel width="20%" height="100%" backgroundColor={`${colorData.tertiary}`} borderLeft="1px solid">
            <Banner>
                <UserIcon size="3vw" margin={false} />
                <div style={{ display: 'flex', flexDirection: 'column', width: '80%', height: '100%', justifyContent: 'space-between', marginLeft: '1vw' }}>
                    <h1 style={{ color: colorData.quaternary, fontSize: '1.5vw', margin: '0', textTransform: 'capitalize' }}>Username</h1>
                    <h3 style={{ color: colorData.quaternary, fontSize: '1vw', margin: '0', fontWeight: '300' }}>@alias</h3>
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
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </>
                    }
                </div>
            </Banner>
        </Panel>
    );
}
