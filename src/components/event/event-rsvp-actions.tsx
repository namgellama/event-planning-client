import { zodResolver } from "@hookform/resolvers/zod";
import { EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

import { useFetchEvent } from "@/apis/event.api";
import { useCreateRSVP, useFetchMyRSVP, useUpdateRSVP } from "@/apis/rsvp.api";
import { FormSelect, RSVPBadge } from "@/components/shared";
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
    createRSVPSchema,
    type CreateRSVPInput,
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

    const form = useForm<CreateRSVPInput>({
        resolver: zodResolver(createRSVPSchema),
        defaultValues: {
            status: "yes",
        },
    });

    const { rsvp, isLoading: isRSVPLoading } = useFetchMyRSVP(event?.id);
    const { createRSVPMutation, isLoading: isCreateLoading } = useCreateRSVP();
    const { updateRSVPMutation, isLoading: isUpdateLoading } = useUpdateRSVP();
    const isSubmitting = isCreateLoading || isUpdateLoading;

    useEffect(() => {
        if (!rsvp) return;

        form.reset({ status: rsvp.status });
    }, [rsvp, form]);

    const onSubmit = async (data: CreateRSVPInput) => {
        if (!event) return;

        if (rsvp) {
            await updateRSVPMutation({
                eventId: event.id,
                status: data.status,
            });
        } else {
            await createRSVPMutation({
                eventId: event.id,
                status: data.status,
            });
        }

        setIsOpen(false);
        form.reset();
    };

    const badgeText =
        rsvp?.status === "yes"
            ? "Going"
            : rsvp?.status === "no"
              ? "Not Going"
              : "Maybe";

    const isUpcoming = event?.status === "upcoming";

    return (
        <>
            <div className="flex items-center gap-3">
                {isRSVPLoading ? (
                    <Spinner />
                ) : rsvp ? (
                    <div className="flex items-center gap-2">
                        <RSVPBadge status={rsvp.status}>{badgeText}</RSVPBadge>
                        {isUpcoming && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="px-4"
                                onClick={() => setIsOpen(true)}
                            >
                                <EllipsisVertical className="size-5" />
                            </Button>
                        )}
                    </div>
                ) : (
                    isUpcoming &&
                    (event?.type === "private" ? (
                        <Badge variant="destructive">Invitation Required</Badge>
                    ) : (
                        <Button
                            className="px-4"
                            onClick={() => setIsOpen(true)}
                        >
                            Join
                        </Button>
                    ))
                )}
            </div>

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
        </>
    );
};

export default EventRsvpActions;
