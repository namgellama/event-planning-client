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
import { EllipsisVertical } from "lucide-react";
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
                        <DropdownMenuItem>Update</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsDeleteOpen(true)}>
                            Delete
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
