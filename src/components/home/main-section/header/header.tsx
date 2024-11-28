import { colorData } from '../../../colorData';
import { Container, UserIcon } from '../../../items';
import { SearchComponent } from './search-bar/search-bar';

import { useCurrentChat } from '../../../../contexts/currentChatContext';

export function Header() {
    const { userTarget } = useCurrentChat();


    return (
        <Container width="100%" height="5%" backgroundColor={colorData.primary} borderBottom="1px solid">
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: colorData.quaternary }}>
                    {userTarget.email !== '' &&
                        <>
                            <UserIcon size='1.3vw' />
                            <h2 style={{ fontSize: '1vw' }}>{userTarget.fName + " " + userTarget.lName}</h2>
                            {userTarget.nName !== null && userTarget.nName !== '' && <p style={{ fontSize: '1vw', marginLeft: '2vw' }}>{'@' + userTarget.nName}</p>}
                        </>
                    }
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: colorData.quaternary, width: '20%' }}>
                    <SearchComponent />
                </div>
            </div>
        </Container>
    );
}