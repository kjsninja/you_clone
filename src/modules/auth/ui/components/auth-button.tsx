"use client";

import { Button } from "@/components/ui/button"
import { ClapperboardIcon, UserCircleIcon } from "lucide-react"
import { UserButton, SignInButton, SignedIn, SignOutButton, SignedOut } from "@clerk/nextjs"
export const AuthButton = () => {
    // TODO: Add different auth states
    return <>
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link label="Studio" href="/studio" labelIcon={<ClapperboardIcon className="size-4" />} />
          </UserButton.MenuItems>
        </UserButton>
        {/* TODO: User profile */}
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant={"outline"}
          className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none [&_svg]size-4">
              <UserCircleIcon />
              Sign-In
          </Button>
        </SignInButton>
      </SignedOut>
    </>
}