import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MapPin, Tag as TagIcon } from "lucide-react";
import { useNavigate } from "react-router";

const upcomingPreview = [
    {
        title: "Full-Stack Dev Conference",
        date: "Nov 20",
        location: "Convention Center",
        tag: "Conference",
    },
    {
        title: "Alice's 30th Birthday",
        date: "Oct 15",
        location: "Community Hall",
        tag: "Birthday",
    },
    {
        title: "Intro to PostgreSQL",
        date: "Aug 01",
        location: "Tech Hub, Rm 3",
        tag: "Workshop",
    },
];

const steps = [
    {
        number: "01",
        title: "Create the event",
        body: "Set a title, time, and place. Mark it public or keep it just for the people you invite.",
    },
    {
        number: "02",
        title: "Tag it",
        body: "Add tags so people browsing can find it — Birthday, Conference, Workshop, or your own.",
    },
    {
        number: "03",
        title: "Track who's coming",
        body: "Guests reply Yes, No, or Maybe. You see the full list update in real time.",
    },
];

function App() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F2F4F1] font-sans text-[#1B1D23] antialiased">
            {/* Nav */}
            <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
                <span className="font-display text-xl font-medium tracking-tight">
                    Gather
                </span>
                <nav className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        className="text-[#1B1D23] hover:bg-[#1B1D23]/5"
                        onClick={() => navigate("/sign-in")}
                    >
                        Sign in
                    </Button>
                    <Button
                        className="bg-[#1B1D23] text-[#F2F4F1] hover:bg-[#1B1D23]/90"
                        onClick={() => navigate("/sign-up")}
                    >
                        Create an event
                    </Button>
                </nav>
            </header>

            {/* Hero */}
            <section className="mx-auto grid max-w-6xl gap-16 px-6 pb-24 pt-8 md:grid-cols-2 md:items-center md:gap-8">
                <div>
                    <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-tight md:text-6xl">
                        Plan the night.
                        <br />
                        Invite the room.
                    </h1>
                    <p className="mt-6 max-w-md text-lg leading-relaxed text-[#1B1D23]/70">
                        Create an event, tag it so the right people find it, and
                        watch RSVPs come in — one clean list, no spreadsheets.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Button
                            size="lg"
                            className="bg-[#C0392B] text-white hover:bg-[#C0392B]/90"
                            onClick={() => navigate("/sign-up")}
                        >
                            Create an event
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-[#1B1D23]/20 text-[#1B1D23] hover:bg-[#1B1D23]/5"
                        >
                            Browse events
                        </Button>
                    </div>
                </div>

                {/* Ticket stub illustration */}
                <div className="flex justify-center md:justify-end">
                    <div className="relative w-full max-w-sm -rotate-2 rounded-sm bg-[#1B1D23] text-[#F2F4F1] shadow-[0_20px_50px_-15px_rgba(27,29,35,0.4)]">
                        {/* perforation notches */}
                        <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#F2F4F1]" />
                        <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#F2F4F1]" />

                        <div className="border-b border-dashed border-[#F2F4F1]/25 px-8 py-6">
                            <p className="text-xs uppercase tracking-wide text-[#F2F4F1]/50">
                                Admit one
                            </p>
                            <p className="mt-2 font-display text-2xl">
                                Full-Stack Dev Conference
                            </p>
                        </div>
                        <div className="flex items-center justify-between px-8 py-6">
                            <div>
                                <p className="text-xs text-[#F2F4F1]/50">
                                    Date
                                </p>
                                <p className="font-display text-lg">
                                    Nov 20, 2026
                                </p>
                            </div>
                            <Badge className="bg-[#C9A227] text-[#1B1D23] hover:bg-[#C9A227]">
                                Yes
                            </Badge>
                        </div>
                    </div>
                </div>
            </section>

            {/* Perforation divider */}
            <div className="mx-auto max-w-6xl px-6">
                <div className="border-t border-dashed border-[#1B1D23]/20" />
            </div>

            {/* Features as ticket stubs */}
            <section className="mx-auto max-w-6xl px-6 py-20">
                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        {
                            icon: CheckCircle2,
                            title: "Built for real events",
                            body: "Edit details up to the last minute. Only you can change or cancel what you created.",
                        },
                        {
                            icon: TagIcon,
                            title: "Find things by tag",
                            body: "Filter by Workshop, Conference, or any tag you set — public events surface to everyone browsing.",
                        },
                        {
                            icon: MapPin,
                            title: "One clear guest list",
                            body: "Every RSVP lands in one place: Yes, No, or Maybe, updated the moment someone replies.",
                        },
                    ].map((f) => (
                        <div
                            key={f.title}
                            className="rounded-sm border border-[#1B1D23]/10 bg-white/40 p-6"
                        >
                            <f.icon
                                className="h-5 w-5 text-[#1F4B4C]"
                                strokeWidth={1.75}
                            />
                            <h3 className="mt-4 font-display text-xl">
                                {f.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-[#1B1D23]/65">
                                {f.body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Upcoming events preview */}
            <section className="mx-auto max-w-6xl px-6 py-20">
                <h2 className="font-display text-3xl">Happening soon</h2>
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {upcomingPreview.map((e) => (
                        <div
                            key={e.title}
                            className="flex flex-col justify-between rounded-sm bg-white/50 p-5"
                        >
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="font-display text-lg leading-tight">
                                        {e.title}
                                    </span>
                                </div>
                                <p className="mt-2 flex items-center gap-1.5 text-sm text-[#1B1D23]/60">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {e.location}
                                </p>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <Badge
                                    variant="outline"
                                    className="border-[#1F4B4C]/30 text-[#1F4B4C]"
                                >
                                    {e.tag}
                                </Badge>
                                <span className="font-display text-sm text-[#1B1D23]/60">
                                    {e.date}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* How it works — genuinely sequential, so numbers earn their place */}
            <section className="mx-auto max-w-6xl px-6 py-20">
                <h2 className="font-display text-3xl">How it works</h2>
                <div className="mt-10 grid gap-10 md:grid-cols-3">
                    {steps.map((s) => (
                        <div key={s.number}>
                            <span className="font-display text-4xl text-[#1B1D23]/20">
                                {s.number}
                            </span>
                            <h3 className="mt-3 font-display text-xl">
                                {s.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-[#1B1D23]/65">
                                {s.body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA band */}
            <section className="bg-[#1B1D23] py-20 text-[#F2F4F1]">
                <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
                    <h2 className="font-display text-3xl md:text-4xl">
                        Your next event starts here.
                    </h2>
                    <Button
                        size="lg"
                        className="bg-[#F2F4F1] text-[#1B1D23] hover:bg-[#F2F4F1]/90"
                    >
                        Create an event
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-[#1B1D23]/50">
                <div className="flex items-center justify-between">
                    <span className="font-display text-base text-[#1B1D23]/80">
                        Gather
                    </span>
                    <span>© 2026 Gather</span>
                </div>
            </footer>
        </div>
    );
}

export default App;
