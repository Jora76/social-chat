import { Header } from "./header/header";
import { Body } from "./body/body";
import { Panel } from "../../items";
import { SearchProvider } from "../../../contexts/searchContext";

function MainSection() {
    return (
        <SearchProvider>
            <Panel width="85%" height="100%">
                <Header />
                <Body />
            </Panel>
        </SearchProvider>
    );
}

export default MainSection;