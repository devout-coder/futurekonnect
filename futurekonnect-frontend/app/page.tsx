"use client";

import Layout from "./components/Layout";
import StatCards from "./components/StatCards";
import TenantData from "./components/TenantData";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Layout>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <StatCards />
        <TenantData />
      </Box>
    </Layout>
  );
}
