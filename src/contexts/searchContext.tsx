import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentChat } from "./currentChatContext";

interface SearchContextProps {
    search: string;
    setSearch: (search: string) => void;
    results: any[];
}

export const searchContext = createContext<SearchContextProps>({
    search: '',
    setSearch: () => { },
    results: [],
});

export function SearchProvider({children}: any) {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<any[]>([]);

    const {messages} = useCurrentChat();

    useEffect(() => {
        if (search !== '') {
            setResults([]);
            if (messages.length === 0) {
                setResults([]);
            } else {
                messages.forEach((msg) => {
                    if (msg.message_content.includes(search)) {
                        setResults((prev) => [...prev, msg]);
                    }
                });
            }
        }
    }, [search]);

    return (
        <searchContext.Provider value={{search, setSearch, results}}>
            {children}
        </searchContext.Provider>
    );

}

export const useSearch = () => {
    return useContext(searchContext);
};