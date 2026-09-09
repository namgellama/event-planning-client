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
}

const SearchInput = ({ placeholder = "Search...", value, onChange }: Props) => {
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
        </InputGroup>
    );
};

export default SearchInput;
