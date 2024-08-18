import { checkAuth } from "@/components/login-form/action";
import { HomePage } from "@/components/user/home";
import { ProfileForm } from "@/components/user/user-profile";
import { check } from "prettier";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();

  React.useEffect(() => {
    checkAuth(navigate);
  });

  return (
    <HomePage>
      <section className="flex w-auto flex-col gap-2 rounded-md px-4 py-8 sm:items-start md:py-12 md:pb-8 lg:py-12 lg:pb-10">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter lg:text-4xl lg:leading-normal">
          Your Profile
        </h1>
        <p className="text-lg font-light text-foreground">
          Welcome to your profile page. Here you can view your profile details
          and make changes to your account.
        </p>
      </section>
      <section className="flex w-auto flex-col items-start rounded-md px-4 py-4 md:pb-8 lg:pb-10">
        <ProfileForm />
      </section>
    </HomePage>
  );
}
