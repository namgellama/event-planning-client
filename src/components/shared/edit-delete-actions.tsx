import { Edit, EllipsisVertical, Trash } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteAlertDialog } from ".";

interface Props {
    onEdit: () => void;
    onDelete: () => void;
    isLoading: boolean;
}

const EditDeleteActions = ({ onEdit, onDelete, isLoading }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

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
                            onClick={onEdit}
                        >
                            <Edit className="size-3 text-blue-500" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                setIsOpen(true);
                            }}
                            className="flex items-center cursor-pointer"
                        >
                            <Trash className="size-3 text-destructive" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteAlertDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                isLoading={isLoading}
                onDelete={onDelete}
            />
        </>
    );
};

export default EditDeleteActions;
