import { zodResolver } from "@hookform/resolvers/zod";
import { EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

import { useFetchEvent } from "@/apis/event.api";
import { useCreateRsvp, useFetchMyRsvp, useUpdateRsvp } from "@/apis/rsvp.api";
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
import type { Rsvp } from "@/types/rsvp";
import {
    createRsvpSchema,
    type CreateRsvpInput,
} from "@/validations/rsvp.validation";

const data = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
    { label: "Maybe", value: "maybe" },
];

const EventRsvpActions = () => {
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
    const { createRsvpMutation, isLoading: isCreateLoading } = useCreateRsvp();
    const { updateRsvpMutation, isLoading: isUpdateLoading } = useUpdateRsvp();
    const isSubmitting = isCreateLoading || isUpdateLoading;

    useEffect(() => {
        if (!rsvp) return;

        form.reset({ status: rsvp.status });
    }, [rsvp, form]);

    const onSubmit = async (data: CreateRsvpInput) => {
        if (!event) return;

        if (rsvp) {
            await updateRsvpMutation({
                eventId: event.id,
                status: data.status,
            });
        } else {
            await createRsvpMutation({
                eventId: event.id,
                status: data.status,
            });
        }

        setIsOpen(false);
        form.reset();
    };

    return (
        <div className="flex">
            {isRsvpLoading ? (
                <Spinner />
            ) : rsvp ? (
                <div className="flex items-center gap-2">
                    <RsvpBadge rsvp={rsvp} />
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
                <Badge variant="destructive">Invitation Required</Badge>
            ) : (
                <Button className="px-4" onClick={() => setIsOpen(true)}>
                    Join
                </Button>
            )}

            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>RSVP to this event</AlertDialogTitle>
                        <AlertDialogDescription>
                            Let the organizer know whether you’re going, not
                            going, or maybe attending. You can change your RSVP
                            later.
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
                            disabled={isSubmitting}
                            onClick={() => form.reset()}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={isSubmitting}
                            type="submit"
                            form="form-rsvp"
                        >
                            {isSubmitting ? <Spinner /> : "Continue"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default EventRsvpActions;

const styles = {
    yes: "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
    no: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
    maybe: "border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
};

const RsvpBadge = ({ rsvp }: { rsvp: Rsvp }) => {
    return (
        <Badge className={styles[rsvp.status]}>
            {rsvp.status === "yes"
                ? "Going"
                : rsvp.status === "maybe"
                  ? "Maybe"
                  : "Not Going"}
        </Badge>
    );
};
