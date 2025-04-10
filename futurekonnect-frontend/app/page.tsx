"use client";

import Image from "next/image";
import { Box } from "@mui/material";
import Layout from "./components/Layout";
import StatCards from "./components/StatCards";
import TenantData from "./components/TenantData";

export default function Home() {
  return (
    <Layout>
      <StatCards />
      <TenantData />
    </Layout>
  );
}
