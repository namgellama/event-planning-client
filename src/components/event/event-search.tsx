import { useQueryStates } from "nuqs";

import { SearchInput } from "../shared";
import { queryState } from "./event-list";

const EventSearch = () => {
    const [{ search }, setQuery] = useQueryStates(queryState);

    return (
        <SearchInput
            value={search}
            onChange={(e) =>
                setQuery({
                    search: e.target.value,
                    page: 1,
                })
            }
            className="flex-1 w-full h-10"
            onReset={() => setQuery({ search: "" })}
        />
    );
};

export default EventSearch;
