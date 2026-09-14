import { Calendar, Clock, Mail, ShieldCheck, ShieldOff } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { formatDate } from "@/utils/format-date";
import { getInitials } from "@/utils/get-initials";

const UserProfilePage = () => {
    const { user } = useAuth();

    const createdAtDate = formatDate(user?.createdAt ?? "");
    const updatedAtDate = formatDate(user?.updatedAt ?? "");

    return (
        <div className="min-h-screen bg-stone-50 px-6 py-12">
            <div className="mx-auto max-w-2xl">
                <p className="mb-6 text-sm font-medium tracking-tight text-stone-400">
                    Profile
                </p>

                <Card className="border-stone-200 shadow-none">
                    <CardHeader className="border-b border-stone-100 pb-6">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-900 text-base font-medium text-white">
                                    {getInitials(user?.name)}
                                </div>
                                <h1 className="text-lg font-medium text-stone-900">
                                    {user?.name}
                                </h1>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6 pt-6">
                        {/* Contact section */}
                        <div>
                            <div className="mb-3 flex items-center justify-between">
                                <h2 className="text-sm font-medium text-stone-500">
                                    Contact
                                </h2>
                            </div>

                            <div className="flex items-center gap-3 rounded-lg border border-stone-100 bg-stone-50/60 px-4 py-3">
                                <Mail className="h-4 w-4 shrink-0 text-stone-400" />

                                <span className="text-sm text-stone-700">
                                    {user?.email}
                                </span>
                            </div>
                        </div>

                        <Separator className="bg-stone-100" />

                        {/* Security section */}
                        <div>
                            <h2 className="mb-3 text-sm font-medium text-stone-500">
                                Security
                            </h2>

                            <div className="flex items-center justify-between rounded-lg border border-stone-100 px-4 py-3">
                                <div className="flex items-center gap-3">
                                    {user?.twoFactorEnabled ? (
                                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                                    ) : (
                                        <ShieldOff className="h-4 w-4 text-stone-400" />
                                    )}
                                    <div>
                                        <p className="text-sm text-stone-800">
                                            Two-factor authentication
                                        </p>
                                        <p className="text-xs text-stone-400">
                                            {user?.twoFactorEnabled
                                                ? "Your account is protected with 2FA."
                                                : "Add an extra layer of security to your account."}
                                        </p>
                                    </div>
                                </div>
                                <Switch
                                    checked={user?.twoFactorEnabled}
                                    onCheckedChange={() => {}}
                                />
                            </div>
                        </div>

                        <Separator className="bg-stone-100" />

                        <div>
                            <h2 className="mb-3 text-sm font-medium text-stone-500">
                                Activity
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-lg border border-stone-100 px-4 py-3">
                                    <div className="mb-1 flex items-center gap-1.5 text-stone-400">
                                        <Calendar className="h-3.5 w-3.5" />
                                        <span className="text-xs">
                                            Member since
                                        </span>
                                    </div>
                                    <p className="text-sm text-stone-800">
                                        {createdAtDate.full}
                                    </p>
                                </div>
                                <div className="rounded-lg border border-stone-100 px-4 py-3">
                                    <div className="mb-1 flex items-center gap-1.5 text-stone-400">
                                        <Clock className="h-3.5 w-3.5" />
                                        <span className="text-xs">
                                            Last updated
                                        </span>
                                    </div>
                                    <p className="text-sm text-stone-800">
                                        {updatedAtDate.full}{" "}
                                        {updatedAtDate.time}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UserProfilePage;
