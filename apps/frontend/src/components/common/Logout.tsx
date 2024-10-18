'use client';

import { LifeBuoy } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { logout } from "@/lib/features/auth/authActions";

export default function Logout() {
    const handleLogout = async () => {
        await logout();
    }

    return (
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            <LifeBuoy className='mr-2 h-4 w-4' />
            <span>Logout</span>
        </DropdownMenuItem>
    )
}