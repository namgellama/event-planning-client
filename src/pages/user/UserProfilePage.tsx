import { Calendar, Clock, Mail, ShieldCheck, ShieldOff } from "lucide-react";
import { useState } from "react";

import { Disable2FADialog, Enable2FADialog } from "@/components/profile";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { formatDate } from "@/utils/format-date";
import { getInitials } from "@/utils/get-initials";

const UserProfilePage = () => {
    const { user } = useAuth();
    const [isEnableOpen, setIsEnableOpen] = useState(false);
    const [isDisableOpen, setIsDisableOpen] = useState(false);

    const createdAtDate = formatDate(user?.createdAt ?? "");
    const updatedAtDate = formatDate(user?.updatedAt ?? "");

    return (
        <div className="min-h-screen px-6 py-12">
            <div className="mx-auto max-w-2xl">
                <p className="mb-6 text-sm font-medium tracking-tight">
                    Profile
                </p>

                <Card>
                    <CardHeader className="border-b pb-6">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-900 text-base font-medium text-white">
                                    {getInitials(user?.name)}
                                </div>
                                <h1 className="text-lg font-medium">
                                    {user?.name}
                                </h1>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6 pt-6">
                        {/* Contact section */}
                        <div>
                            <div className="mb-3 flex items-center justify-between">
                                <h2 className="text-sm font-medium">Contact</h2>
                            </div>

                            <div className="flex items-center gap-3 rounded-lg border px-4 py-3">
                                <Mail className="h-4 w-4 shrink-0" />

                                <span className="text-sm">{user?.email}</span>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h2 className="mb-3 text-sm font-medium">
                                Security
                            </h2>

                            <div className="flex items-center justify-between rounded-lg border px-4 py-3">
                                <div className="flex items-center gap-3">
                                    {user?.twoFactorEnabled ? (
                                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                                    ) : (
                                        <ShieldOff className="h-4 w-4" />
                                    )}
                                    <div>
                                        <p className="text-sm">
                                            Two-factor authentication
                                        </p>
                                        <p className="text-xs">
                                            {user?.twoFactorEnabled
                                                ? "Your account is protected with 2FA."
                                                : "Add an extra layer of security to your account."}
                                        </p>
                                    </div>
                                </div>
                                <Switch
                                    checked={user?.twoFactorEnabled}
                                    onCheckedChange={() => {
                                        user?.twoFactorEnabled
                                            ? setIsDisableOpen(true)
                                            : setIsEnableOpen(true);
                                    }}
                                />
                            </div>
                        </div>

                        <Separator className="bg-stone-100" />

                        <div>
                            <h2 className="mb-3 text-sm font-medium">
                                Activity
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-lg border px-4 py-3">
                                    <div className="mb-1 flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5" />
                                        <span className="text-xs">
                                            Member since
                                        </span>
                                    </div>
                                    <p className="text-sm">
                                        {createdAtDate.full}
                                    </p>
                                </div>
                                <div className="rounded-lg border px-4 py-3">
                                    <div className="mb-1 flex items-center gap-1.5">
                                        <Clock className="h-3.5 w-3.5" />
                                        <span className="text-xs">
                                            Last updated
                                        </span>
                                    </div>
                                    <p className="text-sm">
                                        {updatedAtDate.full}{" "}
                                        {updatedAtDate.time}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {isEnableOpen && (
                <Enable2FADialog
                    isOpen={isEnableOpen}
                    setIsOpen={setIsEnableOpen}
                />
            )}
            {isDisableOpen && (
                <Disable2FADialog
                    isOpen={isDisableOpen}
                    setIsOpen={setIsDisableOpen}
                />
            )}
        </div>
    );
};

export default UserProfilePage;
