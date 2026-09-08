import { useDeleteEvent } from "@/apis/event.api";
import type { Event } from "@/types/event";
import { useState } from "react";
import { useNavigate } from "react-router";
import { DeleteAlertDialog } from "../shared";
import { Button } from "../ui/button";

const EventActions = ({ event }: { event: Event }) => {
    const navigate = useNavigate();
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const { deleteEventMutation, isLoading } = useDeleteEvent();

    const onDelete = async () => {
        await deleteEventMutation(event.id);
        setIsDeleteOpen(false);
        navigate("/events");
    };

    return (
        <div className="self-end space-x-2">
            <Button size="lg" className="bg-primary px-4 cursor-pointer">
                Update
            </Button>
            <Button
                size="lg"
                variant="destructive"
                className="px-4 cursor-pointer"
                onClick={() => setIsDeleteOpen(true)}
            >
                Delete
            </Button>

            <DeleteAlertDialog
                isOpen={isDeleteOpen}
                setIsOpen={setIsDeleteOpen}
                isLoading={isLoading}
                onDelete={onDelete}
            />
        </div>
    );
};

export default EventActions;
