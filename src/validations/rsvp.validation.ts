import z from "zod";

export const createRSVPSchema = z.object({
    status: z.enum(["yes", "no", "maybe"]),
});

export type CreateRSVPInput = z.infer<typeof createRSVPSchema>;
