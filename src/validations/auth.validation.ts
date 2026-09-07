import z from "zod";

export const registerSchema = z
    .object({
        name: z.string().trim().min(3, "Name must be at least 3 characters"),
        email: z.email().trim(),
        password: z.string().min(5, "Password must be at least 5 characters"),
        confirmPassword: z.string().min(1, "Confirm your password."),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match.",
        path: ["confirmPassword"],
    });

export type RegisterFormFields = z.infer<typeof registerSchema>;
