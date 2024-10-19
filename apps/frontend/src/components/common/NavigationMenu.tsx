"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const links = [
  { name: "Films", href: "films" },
  { name: "People", href: "people" },
  { name: "Planets", href: "planets" },
  { name: "Species", href: "species" },
  { name: "Starships", href: "starships" },
  { name: "Vehicles", href: "vehicles" },
];

export default function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {links.map((link) => (
          <NavigationMenuItem key={link.href}>
            <Link href={`/${link.href}`} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>{link.name}</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
