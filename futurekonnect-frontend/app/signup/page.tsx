"use client";

import { useState } from "react";
import { Typography, Box, Link } from "@mui/material";
import FormField from "@/components/FormField";
import SubmitButton from "@/components/SubmitButton";
import CustomCard from "@/components/CustomCard";
import FutureKonnectLogo from "@/components/Logo";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Signup attempt with:", { name, email, password });
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
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
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
            autoComplete="new-password"
          />
          <Box sx={{ textAlign: "right", mt: 1.5, mb: 6 }}>
            <Typography
              variant="body2"
              sx={{
                color: "white",
                // textDecoration: "underline",
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

          <SubmitButton label="SIGN UP" />
        </form>
      </CustomCard>
    </Box>
  );
}
