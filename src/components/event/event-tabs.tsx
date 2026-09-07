import { parseAsStringEnum, useQueryState } from "nuqs";
import { Button } from "../ui/button";

export type TypeValue = "all" | "public" | "private";

const tabs: { label: string; value: TypeValue }[] = [
    { label: "All", value: "all" },
    { label: "Public", value: "public" },
    { label: "Private", value: "private" },
];

const EventTabs = () => {
    const [type, setType] = useQueryState(
        "type",
        parseAsStringEnum<TypeValue>(["all", "public", "private"]).withDefault(
            "all",
        ),
    );

    return (
        <div className="space-x-2">
            {tabs.map((t) => (
                <Button
                    key={t.value}
                    variant={t.value === type ? "default" : "outline"}
                    onClick={() => {
                        setType(t.value);
                    }}
                    size="lg"
                    className="w-20 rounded-full border-gray-300 cursor-pointer"
                >
                    {t.label}
                </Button>
            ))}
        </div>
    );
};

export default EventTabs;
