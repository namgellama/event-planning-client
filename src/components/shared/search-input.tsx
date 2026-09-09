import { cn } from "cn";
import { Search, Upload, X } from "lucide-react";
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
    onReset: () => void;
}

const SearchInput = ({
    placeholder = "Search...",
    value,
    onChange,
    className,
    onReset,
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
            {value && (
                <InputGroupAddon
                    align="inline-end"
                    onClick={onReset}
                    className="cursor-pointer"
                >
                    <X />
                </InputGroupAddon>
            )}
        </InputGroup>
    );
};

export default SearchInput;
