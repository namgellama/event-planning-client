import type { User } from "./user";

export type RsvpStatus = "yes" | "no" | "maybe";

export type Rsvp = {
    eventId: string;
    userId: string;
    status: RsvpStatus;
    createdAt: string;
    updatedAt: string;
};

export type RsvpListItem = Rsvp & {
    user: Pick<User, "id" | "name" | "email">;
};
