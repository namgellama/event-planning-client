import { zodResolver } from "@hookform/resolvers/zod";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

import { useFetchEvent } from "@/apis/event.api";
import { useCreateRsvp, useFetchMyRsvp } from "@/apis/rsvp.api";
import { FormSelect } from "@/components/shared";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
    createRsvpSchema,
    type CreateRsvpInput,
} from "@/validations/rsvp.validation";

const data = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
    { label: "Maybe", value: "maybe" },
];

const RsvpActions = () => {
    const { id } = useParams();
    const { event } = useFetchEvent(id);

    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<CreateRsvpInput>({
        resolver: zodResolver(createRsvpSchema),
        defaultValues: {
            status: "yes",
        },
    });

    const { rsvp, isLoading: isRsvpLoading } = useFetchMyRsvp(event?.id);
    const { createRsvpMutation, isLoading } = useCreateRsvp();

    const onSubmit = async (data: CreateRsvpInput) => {
        if (event) {
            await createRsvpMutation({
                eventId: event.id,
                status: data.status,
            });
            setIsOpen(false);
            form.reset();
        }
    };

    return (
        <div className="flex">
            {isRsvpLoading ? (
                <Spinner />
            ) : rsvp ? (
                <div className="flex items-center gap-2">
                    <Badge
                        variant="outline"
                        className={
                            rsvp.status === "yes"
                                ? "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
                                : rsvp.status === "maybe"
                                  ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                                  : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
                        }
                    >
                        {rsvp.status === "yes"
                            ? "Going"
                            : rsvp.status === "maybe"
                              ? "Maybe"
                              : "Not Going"}
                    </Badge>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="px-4"
                        onClick={() => setIsOpen(true)}
                    >
                        <EllipsisVertical className="size-5" />
                    </Button>
                </div>
            ) : event?.type === "private" ? (
                <Badge>Need Invitation</Badge>
            ) : (
                <Button className="px-4" onClick={() => setIsOpen(true)}>
                    Join
                </Button>
            )}
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <form id="form-rsvp" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormSelect
                            data={data}
                            form={form}
                            label="Status"
                            name="status"
                        />
                    </form>

                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={isLoading}
                            onClick={() => form.reset()}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={isLoading}
                            type="submit"
                            form="form-rsvp"
                        >
                            {isLoading ? <Spinner /> : "Continue"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default RsvpActions;
