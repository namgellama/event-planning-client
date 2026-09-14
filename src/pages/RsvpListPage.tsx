import { RsvpListContent, RsvpListHeader } from "@/components/rsvp";

const RsvpListPage = () => {
    return (
        <div className="space-y-5 max-w-5xl mx-auto">
            <RsvpListHeader />
            <RsvpListContent />
        </div>
    );
};

export default RsvpListPage;
