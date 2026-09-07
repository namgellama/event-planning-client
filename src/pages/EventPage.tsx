import { useAuth } from "@/contexts/AuthContext";

const EventPage = () => {
    const { isAuthenticated, user } = useAuth();
    console.log("🚀 ~ EventPage ~ user:", user);
    console.log("🚀 ~ EventPage ~ isAuthenticated:", isAuthenticated);

    return <div>EventPage</div>;
};

export default EventPage;
