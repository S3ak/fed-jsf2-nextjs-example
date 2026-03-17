import LoginForm from "@/components/login/LoginForm";
import { loginAction } from "./actions";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <LoginForm loginAction={loginAction} />
    </main>
  );
}
