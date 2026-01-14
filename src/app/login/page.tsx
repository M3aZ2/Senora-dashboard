
// import LoginVisuals from "@/components/login/LoginVisuals";
import LoginVisuals from "@/components/login/LoginVisuals";
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-gradient-to-br from-background via-accent to-background">
      <LoginVisuals />
      <LoginForm />
      {/* <h1 className="text-4xl text-center m-auto">Login Page Debug Mode</h1> */}
    </div>
  );
}