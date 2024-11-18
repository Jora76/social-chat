import React from 'react';
import { Container } from '../../../items';
import { ChatSection } from './chat-section/chat-section';
import { SearchSection } from './search-section/search-section';

export function Body(): JSX.Element {
    return (
        <Container width="100%" height="95%">
            <ChatSection />
            <SearchSection />
        </Container>
    );
}