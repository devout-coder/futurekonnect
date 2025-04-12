"use client";

import { Box } from "@mui/material";
import StatCard from "./StatCard";
import { useQuery } from "@apollo/client";
import { GET_TOTAL_TENANTS } from "../queries/tenantQueries";
import { GET_STATS } from "../queries/statsQueries";
import { hasuraClient } from "../../lib/apollo-client";

const StatCards = () => {
  const { data: tenantsData, loading: tenantsLoading } = useQuery(
    GET_TOTAL_TENANTS,
    {
      client: hasuraClient,
    }
  );

  const {
    data: statsData,
    loading: statsLoading,
    error,
  } = useQuery(GET_STATS, {
    client: hasuraClient,
    fetchPolicy: "network-only",
  });

  const uniqueTenants = new Set(
    tenantsData?.tenants?.map((tenant: any) => tenant.name) || []
  ).size;
  const totalData = statsData?.data_exchanged[0]?.total_data || 0;
  const totalFleets = statsData?.fleets_aggregate?.aggregate?.count || 0;
  const totalHotspotUsers =
    statsData?.total_hotspot_users?.aggregate?.count || 0;
  const activeHotspotUsers =
    statsData?.active_hotspot_users?.aggregate?.count || 0;
  const totalRouters = statsData?.total_routers?.aggregate?.count || 0;
  const onlineRouters = statsData?.online_routers?.aggregate?.count || 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 5,
        width: "100%",
        justifyContent: "flex-start",
      }}
    >
      <StatCard
        iconSrc="/icons/data_exchanged.svg"
        label="TOTAL DATA EXCHANGED"
        value={`${totalData} TB`}
        showArrow={false}
        iconWidth={50}
        iconHeight={50}
      />
      <StatCard
        iconSrc="/icons/hotspot_users.svg"
        label="HOTSPOT USERS"
        value={`${activeHotspotUsers}/${totalHotspotUsers}`}
        iconWidth={54}
        iconHeight={40}
        path="/hotspot_users"
      />
      <StatCard
        iconSrc="/icons/routers.svg"
        label="ONLINE ROUTERS"
        value={`${onlineRouters}/${totalRouters}`}
        iconWidth={86}
        iconHeight={62}
        path="/routers"
      />
      <StatCard
        iconSrc="/icons/fleets.svg"
        label="FLEETS"
        value={totalFleets.toString()}
        iconWidth={59}
        iconHeight={45}
        path="/fleets"
      />
      <StatCard
        iconSrc="/icons/tenants.svg"
        label="TENANTS"
        value={tenantsLoading ? "..." : uniqueTenants.toString()}
        iconWidth={40}
        iconHeight={40}
        path="/tenants"
      />
    </Box>
  );
};

export default StatCards;
