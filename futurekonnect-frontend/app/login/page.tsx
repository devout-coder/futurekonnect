"use client";

import { useState } from "react";
import { Typography, Box, Link } from "@mui/material";
import FormField from "@/components/FormField";
import SubmitButton from "@/components/SubmitButton";
import CustomCard from "@/components/CustomCard";
import FutureKonnectLogo from "@/components/Logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Login attempt with:", { email, password });
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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <FormField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

          <SubmitButton label="LOGIN" />
        </form>
      </CustomCard>
    </Box>
  );
}
