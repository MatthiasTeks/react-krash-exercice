"use client";

import { useFormState } from "react-dom";
import { authenticate } from "@/lib/features/auth/authActions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Auth() {
  const [state, action] = useFormState(authenticate, { message: "" });

  return (
    <div className="w-full mt-12 flex flex-col items-center justify-center">
      <form action={action} className="flex flex-col w-60 gap-2">
        <Input type="text" placeholder="Username" id="username" name="username" required />
        <Input type="password" placeholder="Password" id="password" name="password" required />
        <Button type="submit">Login</Button>
        {state && <p className="text-destructive">{state.message}</p>}
      </form>
    </div>
  );
}
