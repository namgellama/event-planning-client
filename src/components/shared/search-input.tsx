import { cn } from "cn";
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
    className?: string;
}

const SearchInput = ({
    placeholder = "Search...",
    value,
    onChange,
    className,
}: Props) => {
    return (
        <InputGroup className={cn("w-full", className)}>
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
