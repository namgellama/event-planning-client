import type { User } from "./user";

export type RSVPStatus = "yes" | "no" | "maybe";

export type RSVP = {
    eventId: string;
    userId: string;
    status: RSVPStatus;
    createdAt: string;
    updatedAt: string;
};

export type RSVPListItem = RSVP & {
    user: Pick<User, "id" | "name" | "email">;
};
