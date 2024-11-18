import Contacts from './contacts/contacts';
import MainSection from './main-section/main-section';

function Home(): JSX.Element {
    return (
        <>
            <Contacts />
            <MainSection />
        </>
    );
}

export default Home;