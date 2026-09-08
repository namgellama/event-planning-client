import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
    title: string;
    description: string;
    children: ReactNode;
}

const EventFormLayout = ({ title, description, children }: Props) => {
    return (
        <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
            <Card className="shadow-sm">
                <CardHeader className="border-b">
                    <div className="flex items-start gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <CalendarDays className="size-5 text-primary" />
                        </div>

                        <div className="space-y-1">
                            <h1 className="text-xl font-semibold tracking-tight">
                                {title}
                            </h1>

                            <p className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pt-6">{children}</CardContent>
            </Card>
        </div>
    );
};

export default EventFormLayout;
