export type UserRole = "user" | "admin";

export type User = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    twoFactorEnabled: boolean;
    createdAt: string;
    updatedAt: string;
};
