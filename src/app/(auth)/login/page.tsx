import AuthForm from "@/components/auth/form";
import { cookies } from "next/headers";

export default function Login() {
  const token = cookies().get("token");
  console.log(token, "INI TOKENNNNNN");

  return (
    <div>
      <AuthForm />
    </div>
  );
}
