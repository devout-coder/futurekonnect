"use client";

import { Box } from "@mui/material";
import StatCard from "./StatCard";

const StatCards = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 2,
      }}
    >
      <Box>
        <StatCard
          iconSrc="/icons/data_exchanged.svg"
          label="TOTAL DATA EXCHANGED"
          value="80.4 TB"
          showArrow={false}
          iconWidth={50}
          iconHeight={50}
        />
      </Box>
      <Box>
        <StatCard
          iconSrc="/icons/hotspot_users.svg"
          label="HOTSPOT USERS"
          value="23K/24.2K"
          iconWidth={54}
          iconHeight={40}
        />
      </Box>
      <Box>
        <StatCard
          iconSrc="/icons/routers.svg"
          label="ONLINE ROUTERS"
          value="201/345"
          iconWidth={86}
          iconHeight={62}
        />
      </Box>
      <Box>
        <StatCard
          iconSrc="/icons/fleets.svg"
          label="FLEETS"
          value="45"
          iconWidth={59}
          iconHeight={45}
        />
      </Box>
      <Box>
        <StatCard
          iconSrc="/icons/tenants.svg"
          label="TENANTS"
          value="23"
          iconWidth={40}
          iconHeight={40}
        />
      </Box>
    </Box>
  );
};

export default StatCards; 