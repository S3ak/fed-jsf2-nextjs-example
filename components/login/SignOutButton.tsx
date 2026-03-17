import { signOutAction } from "@/app/logout/actions";
import { Button } from "@/ui/button";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <Button type="submit" variant="outline" size="sm">
        Sign out
      </Button>
    </form>
  );
}
