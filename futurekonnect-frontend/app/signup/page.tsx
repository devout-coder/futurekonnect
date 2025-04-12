"use client";

import { useState } from "react";
import { Typography, Box, Link } from "@mui/material";
import { useMutation } from "@apollo/client";
import FormField from "@/app/components/FormField";
import SubmitButton from "@/app/components/SubmitButton";
import CustomCard from "@/app/components/CustomCard";
import FutureKonnectLogo from "@/app/components/Logo";
import { SIGNUP_MUTATION } from "../queries/authQueries";
import { useAuth } from "@/app/contexts/AuthContext";
import { authClient } from "@/lib/apollo-client";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const [signupMutation, { loading }] = useMutation(SIGNUP_MUTATION, {
    client: authClient,
    onCompleted: (data) => {
      console.log('Signup completed:', data);
      login(data.signup.token, data.signup.user);
    },
    onError: (error) => {
      console.error('Signup error:', error);
      setError(error.message);
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    const variables = {
      email,
      password,
      username: name,
      imageUrl: null
    };
    console.log('Attempting signup with:', variables);
    try {
      await signupMutation({
        variables,
      });
    } catch (err) {
      console.error('Signup error:', err);
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
            label="Name"
            type="text"
            name="name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            autoComplete="name"
          />
          <FormField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <FormField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <Box sx={{ textAlign: "right", mt: 1.5, mb: 6 }}>
            <Typography
              variant="body2"
              sx={{
                color: "white",
                cursor: "pointer",
                fontSize: "13px",
                fontFamily: "inherit",
              }}
            >
              Already have an account?{" "}
              <Link
                href="/login"
                style={{
                  color: "white",
                  textDecoration: "underline",
                }}
              >
                Login
              </Link>
            </Typography>
          </Box>

          <SubmitButton label="SIGN UP" loading={loading} />
        </form>
      </CustomCard>
    </Box>
  );
}
