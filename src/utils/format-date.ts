export function formatDate(iso: string) {
    const d = new Date(iso);

    if (Number.isNaN(d.getTime()))
        return { day: "--", month: "---", full: iso, time: "" };

    return {
        day: d.getDate().toString().padStart(2, "0"),
        month: d.toLocaleString("en-US", { month: "short" }),
        full: d.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        }),
        time: d.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        }),
    };
}
