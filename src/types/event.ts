import type { Tag } from "./tag";

export type Event = {
    id: string;
    title: string;
    description: string | null;
    location: string;
    date: string;
    type: "public" | "private";
    tags: Pick<Tag, "id" | "title">[];
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    popularity: number;
};
