import Link from "next/link";
import Navigation from "./NavigationMenu";
import { isAuthenticated } from "@/lib/features/auth/authActions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout from "./Logout";
import LanguageToggle from "./LanguageToggle";

export async function Navbar() {
  const isAuth = await isAuthenticated();
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <Link href="/" legacyBehavior passHref>
          <h1 className="font-bold cursor-pointer">SWAPI</h1>
        </Link>
        <Navigation />
      </div>
      <div className="flex items-center gap-6">
        <LanguageToggle />
        {isAuth ? (
          <DropdownAvatar />
        ) : (
          <Link href="/auth">
            <div>Login</div>
          </Link>
        )}
      </div>
    </div>
  );
}

const DropdownAvatar = async () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://assets.mycast.io/actor_images/actor-luke-skywalker-11928_large.jpg?1577813130" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
