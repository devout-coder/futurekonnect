"use client";

import { useState } from "react";
import { Typography, Box, Link } from "@mui/material";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import FormField from "@/app/components/FormField";
import SubmitButton from "@/app/components/SubmitButton";
import CustomCard from "@/app/components/CustomCard";
import FutureKonnectLogo from "@/app/components/Logo";
import { LOGIN_MUTATION } from "@/lib/graphql/auth";
import { useAuth } from "@/app/contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      login(data.login.token);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      await loginMutation({
        variables: { email, password },
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
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <FormField
            label="Email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <FormField
            label="Password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Box sx={{ textAlign: "right", mt: 1.5, mb: 6 }}>
            <Link
              href="/forgot-password"
              variant="body2"
              sx={{
                color: "white",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "13px",
                fontFamily: "inherit",
                "&:hover": {
                  color: "white",
                  textDecoration: "underline",
                },
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          <SubmitButton label="LOGIN" loading={loading} />
        </form>
      </CustomCard>
    </Box>
  );
}
