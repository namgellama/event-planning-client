export type LoginRequiresTwoFactor = {
    requires2FA: true;
    twoFactorToken: string;
};

export type LoginSuccessful = {
    requires2FA: false;
    accessToken: string;
};

export type LoginResponse = LoginRequiresTwoFactor | LoginSuccessful;
