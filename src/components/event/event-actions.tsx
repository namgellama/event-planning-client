import { useDeleteEvent } from "@/apis/event.api";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Event } from "@/types/event";
import { Edit, EllipsisVertical, Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { DeleteAlertDialog } from "../shared";

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
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <Button
                            variant="ghost"
                            className="cursor-pointer rounded-full hover:bg-inherit"
                        />
                    }
                >
                    <EllipsisVertical className="size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            className="flex items-center cursor-pointer"
                            onClick={() => navigate(`/events/${event.id}/edit`)}
                        >
                            <Edit className="size-3 text-blue-500" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setIsDeleteOpen(true)}
                            className="flex items-center cursor-pointer"
                        >
                            <Trash className="size-3 text-destructive" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteAlertDialog
                isOpen={isDeleteOpen}
                setIsOpen={setIsDeleteOpen}
                isLoading={isLoading}
                onDelete={onDelete}
            />
        </>
    );
};

export default EventActions;
