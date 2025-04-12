"use client";

import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import FormField from "@/app/components/FormField";
import SubmitButton from "@/app/components/SubmitButton";
import CustomCard from "@/app/components/CustomCard";
import FutureKonnectLogo from "@/app/components/Logo";
import { RESET_PASSWORD_MUTATION } from "@/lib/graphql/auth";
import { authClient } from "@/lib/apollo-client";
import { toast } from "react-toastify";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get("access_token");
      setToken(accessToken);
    }
  }, []);

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD_MUTATION, {
    client: authClient,
    onCompleted: () => {
      toast.success("Password reset successfully!");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token) {
      toast.error("Invalid reset link");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await resetPassword({
        variables: { token, newPassword: password },
      });
    } catch (err) {
      console.error(err);
      // Error is handled by onError callback
    }
  };

  if (!token) {
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
          <Typography color="error" sx={{ mt: 2 }}>
            Invalid reset link
          </Typography>
        </CustomCard>
      </Box>
    );
  }

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
            label="New Password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <FormField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
          <Box sx={{ mt: 5.5 }}>
            <SubmitButton label="RESET" loading={loading} />
          </Box>
        </form>
      </CustomCard>
    </Box>
  );
} 