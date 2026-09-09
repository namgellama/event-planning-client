import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay = 500): T => {
    const [debouncedvalue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedvalue;
};
