
// import LoginVisuals from "@/components/login/LoginVisuals";
import LoginVisuals from "@/components/login/LoginVisuals";
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-gradient-to-br from-background via-accent to-background">
      <LoginVisuals />
      <LoginForm />
    </div>
  );
}