import z from "zod";

export const sendOtpSchema = z.object({
    email: z.email().trim(),
});

export type SendOtpInput = z.infer<typeof sendOtpSchema>;

export const verifyEmailSchema = z.object({
    email: z.email().trim(),
    otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

export const registerUserSchema = z
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

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
    email: z.email().trim(),
    password: z.string().nonempty("Password is required"),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;

export const verify2FASetupSchema = z.object({
    code: z
        .string()
        .trim()
        .regex(/^\d{6}$/, "2FA code must be exactly 6 digits"),
});

export type Verify2FASetupInput = z.infer<typeof verify2FASetupSchema>;
