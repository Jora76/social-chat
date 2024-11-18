import { Header } from "./header/header";
import { Body } from "./body/body";
import { Panel } from "../../items";

function MainSection() {
    return (
        <Panel width="85%" height="100%">
            <Header />
            <Body />
        </Panel>
    );
}

export default MainSection;