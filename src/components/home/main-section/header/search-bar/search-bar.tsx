import { useState } from "react";
import { SearchContainer, SearchIcon, SearchInput } from "./items";
import { useSearch } from "../../../../../contexts/searchContext";

export function SearchComponent(): JSX.Element {
    const [isFocused, setIsFocused] = useState(false);

    const {setSearch} = useSearch();

    return (
        <SearchContainer $isFocused={isFocused}>
            <SearchIcon $isFocused={isFocused} />
            <SearchInput
                type="text"
                placeholder="Search"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
        </SearchContainer>
    );
}
