import type { Tag } from "./tag";

export type Event = {
    id: string;
    title: string;
    date: string;
    location: string;
    type: "public" | "private";
    description: string | null;
    tags: Pick<Tag, "id" | "title">[];
    createdAt: Date;
    updatedAt: Date;
    userId: string;
};
