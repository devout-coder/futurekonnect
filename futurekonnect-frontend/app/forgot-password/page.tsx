"use client";

import { useState } from "react";
import { Typography, Box } from "@mui/material";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import FormField from "@/app/components/FormField";
import SubmitButton from "@/app/components/SubmitButton";
import CustomCard from "@/app/components/CustomCard";
import FutureKonnectLogo from "@/app/components/Logo";
import { FORGOT_PASSWORD_MUTATION } from "../queries/authQueries";
import { authClient } from "@/lib/apollo-client";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD_MUTATION, {
    client: authClient,
    onCompleted: () => {
      toast.success("Password reset email sent successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await forgotPassword({
        variables: { email },
      });
    } catch (err) {
      console.error(err);
      // Error is handled by onError callback
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CustomCard>
        <FutureKonnectLogo />
        <form onSubmit={handleSubmit}>
          <FormField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <Box sx={{ mt: 5.5 }}>
            <SubmitButton label="RESET" loading={loading} />
          </Box>
        </form>
      </CustomCard>
    </Box>
  );
}
