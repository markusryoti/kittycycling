import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

type Form = { name: string; email: string; password: string };

function RouteComponent() {
  const [userForm, setUserForm] = useState<Form>({} as Form);
  const formRef = useRef<HTMLFormElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({
      ...userForm,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await authClient.signUp.email({
        name: userForm.name,
        email: userForm.email,
        password: userForm.password,
        fetchOptions: {
          credentials: undefined,
        },
      });

      console.log(res);

      formRef.current?.reset();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Enter your email below to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} ref={formRef}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="string"
                      placeholder="Your Name"
                      required
                      onChange={onChange}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      onChange={onChange}
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      onChange={onChange}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="underline underline-offset-4">
                    Signup
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
