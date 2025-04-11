"use client";

import { useState } from "react";
import { Typography, Box } from "@mui/material";
import FormField from "@/app/components/FormField";
import SubmitButton from "@/app/components/SubmitButton";
import CustomCard from "@/app/components/CustomCard";
import FutureKonnectLogo from "@/app/components/Logo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Password reset requested for:", { email });
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <Box sx={{ mt: 5.5 }}>
            <SubmitButton label="RESET" />
          </Box>
        </form>
      </CustomCard>
    </Box>
  );
}
