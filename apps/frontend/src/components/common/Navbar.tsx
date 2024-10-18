import * as React from "react"
import Link from "next/link"
import Navigation from "./NavigationMenu"

export function Navbar() {
  return (
    <div className="flex items-center cursor-pointer">
        <Link href="/" legacyBehavior passHref>
            <h1 className="font-bold">SWAPI</h1>
        </Link>
        <Navigation />
    </div>
  )
}
