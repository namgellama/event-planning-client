import { Search } from "lucide-react";
import type { ChangeEvent } from "react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "../ui/input-group";

interface Props {
    placeholder?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    count?: number;
    showResults?: boolean;
}

const SearchInput = ({
    placeholder = "Search...",
    value,
    onChange,
    count,
    showResults = true,
}: Props) => {
    return (
        <InputGroup className="max-w-xs">
            <InputGroupInput
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
            {showResults && (
                <InputGroupAddon align="inline-end">
                    {count} results
                </InputGroupAddon>
            )}
        </InputGroup>
    );
};

export default SearchInput;
